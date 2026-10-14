/* eslint-disable no-console, security/detect-object-injection */
import { Router } from 'express';
import { z } from 'zod';
import { withTransaction } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

// Basic structure of a sync payload from the offline-first tablet
const syncPayloadSchema = z.object({
  cooking_sessions: z.array(z.any()).max(100).optional(),
  daily_technical_logs: z.array(z.any()).max(100).optional(),
  generator_logs: z.array(z.any()).max(100).optional(),
  monthly_feedback: z.array(z.any()).max(100).optional(),
  slots: z.array(z.any()).max(100).optional(), // for status updates (e.g. Attended)
});

router.post('/', async (req, res, next) => {
  try {
    const payload = syncPayloadSchema.parse(req.body);
    const failedUuids = {};
    const results = {
      sessions: { inserted: 0, conflicts: 0 },
      tech_logs: { inserted: 0, conflicts: 0 },
      gen_logs: { inserted: 0, conflicts: 0 },
      feedback: { inserted: 0, conflicts: 0 },
      slots: { updated: 0, conflicts: 0 },
    };

    await withTransaction(async (client) => {
      // 1. Process Cooking Sessions
      if (payload.cooking_sessions?.length > 0) {
        for (const session of payload.cooking_sessions) {
          await client.query('SAVEPOINT session_sp');
          try {
            const kitchenId = req.user.kitchen_id || 1;
            const sessionDate = session.start_at ? session.start_at.slice(0, 10) : new Date().toISOString().slice(0, 10);
            const slotNo = parseInt(session.slot_id, 10) || 1;

            // Resolve or ensure slot_id
            let actualSlotId;
            const slotMatch = await client.query(
              'SELECT id FROM slots WHERE kitchen_id = $1 AND slot_date = $2 AND slot_no = $3 LIMIT 1',
              [kitchenId, sessionDate, slotNo]
            );

            if (slotMatch.rows.length > 0) {
              actualSlotId = slotMatch.rows[0].id;
            } else {
              const directCheck = await client.query('SELECT id FROM slots WHERE id = $1 LIMIT 1', [session.slot_id]);
              if (directCheck.rows.length > 0) {
                actualSlotId = directCheck.rows[0].id;
              } else {
                const slotTimes = {
                  1: { start: '08:00:00', end: '10:00:00' },
                  2: { start: '10:00:00', end: '12:00:00' },
                  3: { start: '12:00:00', end: '14:00:00' },
                  4: { start: '14:00:00', end: '16:00:00' },
                  5: { start: '16:00:00', end: '18:00:00' },
                  6: { start: '18:00:00', end: '20:00:00' },
                  7: { start: '20:00:00', end: '22:00:00' },
                };
                const t = slotTimes[slotNo] || { start: '08:00:00', end: '10:00:00' };
                const createdSlot = await client.query(
                  `INSERT INTO slots (kitchen_id, slot_date, slot_no, start_time, end_time, power_source, household_id, status, created_by)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, 'Attended', $8) RETURNING id`,
                  [kitchenId, sessionDate, slotNo, t.start, t.end, session.power_source || 'Solar', session.household_id || null, req.user.id]
                );
                actualSlotId = createdSlot.rows[0].id;
              }
            }

            // Ensure household_id exists
            let actualHouseholdId = parseInt(session.household_id, 10);
            const hhCheck = await client.query('SELECT id FROM households WHERE id = $1 LIMIT 1', [actualHouseholdId]);
            if (hhCheck.rows.length === 0) {
              const fallbackHh = await client.query('SELECT id FROM households WHERE kitchen_id = $1 ORDER BY id ASC LIMIT 1', [kitchenId]);
              if (fallbackHh.rows.length > 0) {
                actualHouseholdId = fallbackHh.rows[0].id;
              }
            }

            // Clean dependent fields
            const waitingIssue = Boolean(session.waiting_issue);
            let waitingReasonId = waitingIssue && session.waiting_reason_id ? parseInt(session.waiting_reason_id, 10) : null;
            if (waitingIssue && !waitingReasonId) waitingReasonId = 1;

            const techProblem = Boolean(session.technical_problem);
            let problemTypeId = techProblem && session.problem_type_id ? parseInt(session.problem_type_id, 10) : null;
            if (techProblem && !problemTypeId) problemTypeId = 7;

            const { rows } = await client.query(
              `INSERT INTO cooking_sessions (
                 client_uuid, slot_id, household_id, persons_cooked_for, start_at, end_at, 
                 appliance_id, power_source, cooking_completed, cleaning_completed, 
                 waiting_issue, waiting_reason_id, technical_problem, problem_type_id, remarks, created_by, device_time
               ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
               ON CONFLICT (client_uuid) DO NOTHING RETURNING id`,
              [
                session.client_uuid, actualSlotId, actualHouseholdId, session.persons_cooked_for || 4,
                session.start_at || new Date().toISOString(), session.end_at || new Date().toISOString(),
                session.appliance_id || 1, session.power_source || 'Solar',
                session.cooking_completed ?? true, session.cleaning_completed ?? true,
                waitingIssue, waitingReasonId, techProblem, problemTypeId,
                session.remarks || null, req.user.id, session.device_time || new Date().toISOString()
              ]
            );
            
            if (rows.length > 0) {
              const sessionId = rows[0].id;
              results.sessions.inserted++;
              
              if (session.dishes && Array.isArray(session.dishes)) {
                for (const dishId of session.dishes) {
                  await client.query(
                    `INSERT INTO session_dishes (session_id, dish_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
                    [sessionId, parseInt(dishId, 10)]
                  );
                }
              }
            }
            await client.query('RELEASE SAVEPOINT session_sp');
          } catch (err) {
            await client.query('ROLLBACK TO SAVEPOINT session_sp');
            console.error('Session sync error:', err.message);
            failedUuids[session.client_uuid] = err.message;
            await logConflict(client, session.client_uuid, 'cooking_sessions', session, err.message, req.user.id);
            results.sessions.conflicts++;
          }
        }
      }

      // 2. Process Daily Technical Logs
      if (payload.daily_technical_logs?.length > 0) {
        for (const log of payload.daily_technical_logs) {
          await client.query('SAVEPOINT tech_sp');
          try {
            const morningSoc = log.morning_soc ?? log.morning_battery_soc ?? 50;
            const eveningSoc = log.evening_soc ?? log.evening_battery_soc ?? 50;
            let severity = log.safety_severity;
            if (log.safety_incident) {
              if (severity === 'Low') severity = 'Minor';
              if (severity === 'Medium' || severity === 'High') severity = 'Major';
              if (!['Minor', 'Major', 'Critical'].includes(severity)) severity = 'Minor';
            } else {
              severity = null;
            }

            await client.query(
              `INSERT INTO daily_technical_logs (
                 client_uuid, kitchen_id, log_date, solar_kwh, morning_soc, evening_soc, 
                 system_operational, fault_count, downtime_hours, safety_incident, safety_severity, 
                 safety_note, weather, energy_consumed_kwh, remarks, created_by, device_time
               ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
               ON CONFLICT (client_uuid) DO NOTHING`,
              [
                log.client_uuid, log.kitchen_id || req.user.kitchen_id || 1, log.log_date, log.solar_kwh || 0, morningSoc, eveningSoc,
                log.system_operational ?? true, log.fault_count || 0, log.downtime_hours || 0, Boolean(log.safety_incident),
                severity, log.safety_note || null, log.weather || 'Sunny', log.energy_consumed_kwh || 0,
                log.remarks || null, req.user.id, log.device_time || new Date().toISOString()
              ]
            );
            results.tech_logs.inserted++;
            await client.query('RELEASE SAVEPOINT tech_sp');
          } catch (err) {
            await client.query('ROLLBACK TO SAVEPOINT tech_sp');
            console.error('Tech log sync error:', err.message);
            failedUuids[log.client_uuid] = err.message;
            await logConflict(client, log.client_uuid, 'daily_technical_logs', log, err.message, req.user.id);
            results.tech_logs.conflicts++;
          }
        }
      }

      // 3. Process Generator Logs
      if (payload.generator_logs?.length > 0) {
        for (const log of payload.generator_logs) {
          await client.query('SAVEPOINT gen_sp');
          try {
            const fuelStart = log.fuel_start_l ?? log.fuel_at_start ?? 0;
            const refuel = log.refuel_l ?? log.fuel_added ?? 0;
            const fuelEnd = log.fuel_end_l ?? log.fuel_at_end ?? 0;

            await client.query(
              `INSERT INTO generator_logs (
                 client_uuid, kitchen_id, log_date, fuel_start_l, refuel_l, fuel_end_l, 
                 running_hours, maintenance_required, maintenance_type, remarks, created_by, device_time
               ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
               ON CONFLICT (client_uuid) DO NOTHING`,
              [
                log.client_uuid, log.kitchen_id || req.user.kitchen_id || 1, log.log_date, fuelStart, refuel, fuelEnd,
                log.running_hours || 0, Boolean(log.maintenance_required), log.maintenance_type || null, log.remarks || null, req.user.id, log.device_time || new Date().toISOString()
              ]
            );
            results.gen_logs.inserted++;
            await client.query('RELEASE SAVEPOINT gen_sp');
          } catch (err) {
            await client.query('ROLLBACK TO SAVEPOINT gen_sp');
            console.error('Gen log sync error:', err.message);
            failedUuids[log.client_uuid] = err.message;
            await logConflict(client, log.client_uuid, 'generator_logs', log, err.message, req.user.id);
            results.gen_logs.conflicts++;
          }
        }
      }

      // 4. Process Monthly Feedback
      if (payload.monthly_feedback?.length > 0) {
        for (const fb of payload.monthly_feedback) {
          await client.query('SAVEPOINT fb_sp');
          try {
            const rawMonth = fb.survey_month || fb.feedback_date || new Date().toISOString().slice(0, 10);
            const surveyMonth = `${rawMonth.slice(0, 7)}-01`;
            let targetHouseholdId = parseInt(fb.household_id, 10);
            const hhCheck = await client.query('SELECT id FROM households WHERE id = $1 LIMIT 1', [targetHouseholdId]);
            if (hhCheck.rows.length === 0) {
              const fallbackHh = await client.query('SELECT id FROM households WHERE kitchen_id = $1 ORDER BY id ASC LIMIT 1', [req.user.kitchen_id || 1]);
              if (fallbackHh.rows.length > 0) targetHouseholdId = fallbackHh.rows[0].id;
            }

            const fuelReduction = fb.fuel_reduction_rating ?? fb.rating_fuel_reduction ?? 3;
            const safety = fb.safety_rating ?? fb.rating_safety ?? 3;
            const privacy = fb.privacy_rating ?? fb.rating_privacy ?? 3;
            const waiting = fb.waiting_rating ?? fb.rating_waiting ?? 3;
            const overall = fb.overall_rating ?? fb.rating_overall ?? 3;
            const cleanliness = fb.cleanliness_rating ?? fb.rating_cleanliness ?? 3;
            const ease = fb.ease_rating ?? fb.rating_ease ?? 3;
            const slotSuitability = fb.slot_suitability ?? fb.rating_slot_suitability ?? 3;
            const familyMembers = fb.family_members_now ?? fb.current_family_members ?? 4;
            const timeEnough = ['Too short', 'About right', 'Too long'].includes(fb.time_enough) ? fb.time_enough : 'About right';
            const backupFuelBool = typeof fb.backup_fuel_used === 'boolean' 
              ? fb.backup_fuel_used 
              : (Boolean(fb.backup_fuel_used) && fb.backup_fuel_used !== 'None' && fb.backup_fuel_used !== 'false');

            await client.query(
              `INSERT INTO monthly_feedback (
                 client_uuid, household_id, survey_month, backup_fuel_used, backup_fuel_spend, 
                 fuel_reduction_rating, safety_rating, privacy_rating, waiting_rating, overall_rating, 
                 cleanliness_rating, ease_rating, slot_suitability, time_enough, family_members_now, 
                 willing_to_continue, remarks, created_by, device_time
               ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
               ON CONFLICT (client_uuid) DO NOTHING`,
              [
                fb.client_uuid, targetHouseholdId, surveyMonth, backupFuelBool, fb.backup_fuel_spend || 0,
                fuelReduction, safety, privacy, waiting, overall,
                cleanliness, ease, slotSuitability, timeEnough, familyMembers,
                fb.willing_to_continue ?? true, fb.remarks || null, req.user.id, fb.device_time || new Date().toISOString()
              ]
            );
            results.feedback.inserted++;
            await client.query('RELEASE SAVEPOINT fb_sp');
          } catch (err) {
            await client.query('ROLLBACK TO SAVEPOINT fb_sp');
            console.error('Feedback sync error:', err.message);
            failedUuids[fb.client_uuid] = err.message;
            await logConflict(client, fb.client_uuid, 'monthly_feedback', fb, err.message, req.user.id);
            results.feedback.conflicts++;
          }
        }
      }

      // 5. Process Slots (Updates only)
      if (payload.slots?.length > 0) {
        for (const slot of payload.slots) {
          await client.query('SAVEPOINT slot_sp');
          try {
            const { rowCount } = await client.query(
              `UPDATE slots SET status = $1, note = $2 WHERE id = $3 AND status != $1`,
              [slot.status, slot.note, slot.id]
            );
            if (rowCount > 0) results.slots.updated++;
            await client.query('RELEASE SAVEPOINT slot_sp');
          } catch (err) {
            await client.query('ROLLBACK TO SAVEPOINT slot_sp');
            failedUuids[`slot-${slot.id}`] = err.message;
            await logConflict(client, `slot-${slot.id}`, 'slots', slot, err.message, req.user.id);
            results.slots.conflicts++;
          }
        }
      }
    });

    res.json({ message: 'Sync complete', results, failed_uuids: failedUuids });
  } catch (err) {
    next(err);
  }
});

/**
 * Helper to log rejected records into the sync_conflicts table for admin review
 */
async function logConflict(client, client_uuid, table_name, payload, reason, user_id) {
  try {
    await client.query(
      `INSERT INTO sync_conflicts (client_uuid, table_name, payload, reason, submitted_by)
       VALUES ($1, $2, $3, $4, $5)`,
      [client_uuid || 'unknown', table_name, JSON.stringify(payload), reason, user_id]
    );
  } catch (logErr) {
    // If conflict logging fails, just print to console to avoid crashing the whole transaction
    console.error('Failed to log sync conflict:', logErr.message);
  }
}

export default router;
