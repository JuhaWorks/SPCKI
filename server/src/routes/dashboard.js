import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Allow all authenticated users to view dashboards, but limit data based on their kitchen_id
router.use(requireAuth);

const querySchema = z.object({
  kitchen_id: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  household_id: z.string().optional(),
  appliance_id: z.string().optional(),
  size_band: z.string().optional(),
});

function getKitchenFilter(reqUser, queryKitchenId) {
  // If user is Admin/Project, they can specify a kitchen_id, or see all
  // If user is Field/Technical/Viewer assigned to a kitchen, force their kitchen_id
  if (['Admin', 'Project'].includes(reqUser.role)) {
    return queryKitchenId ? parseInt(queryKitchenId, 10) : null;
  }
  return reqUser.kitchen_id;
}

// 1. Session Details (Aggregated metrics + list)
router.get('/sessions', async (req, res, next) => {
  try {
    const { kitchen_id, start_date, end_date, household_id, appliance_id, size_band } = querySchema.parse(req.query);
    const targetKitchen = getKitchenFilter(req.user, kitchen_id);
    
    let sql = 'SELECT v.*, s.slot_id, sl.slot_no, s.start_at, s.appliance_id FROM v_session_details v JOIN cooking_sessions s ON v.id = s.id JOIN slots sl ON sl.id = s.slot_id WHERE 1=1';
    const params = [];
    let idx = 1;

    if (targetKitchen) {
      sql += ` AND v.kitchen_id = $${idx++}`;
      params.push(targetKitchen);
    }
    if (start_date) {
      sql += ` AND session_date >= $${idx++}`;
      params.push(start_date);
    }
    if (end_date) {
      sql += ` AND session_date <= $${idx++}`;
      params.push(end_date);
    }
    if (household_id) {
      sql += ` AND household_id = $${idx++}`;
      params.push(parseInt(household_id, 10));
    }
    if (appliance_id) {
      sql += ` AND appliance = (SELECT name FROM appliances WHERE id = $${idx++})`;
      params.push(parseInt(appliance_id, 10));
    }
    if (size_band) {
      sql += ` AND size_band = $${idx++}`;
      params.push(size_band);
    }

    sql += ' ORDER BY session_date DESC, id DESC LIMIT 500';

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 2. Daily Solar Performance
router.get('/solar', async (req, res, next) => {
  try {
    const { kitchen_id, start_date, end_date } = querySchema.parse(req.query);
    const targetKitchen = getKitchenFilter(req.user, kitchen_id);

    let sql = 'SELECT * FROM v_daily_solar WHERE 1=1';
    const params = [];
    let idx = 1;

    if (targetKitchen) {
      sql += ` AND kitchen_id = $${idx++}`;
      params.push(targetKitchen);
    }
    if (start_date) {
      sql += ` AND log_date >= $${idx++}`;
      params.push(start_date);
    }
    if (end_date) {
      sql += ` AND log_date <= $${idx++}`;
      params.push(end_date);
    }

    sql += ' ORDER BY log_date DESC LIMIT 100';

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 3. Slot Utilisation
router.get('/utilisation', async (req, res, next) => {
  try {
    const { kitchen_id, start_date, end_date } = querySchema.parse(req.query);
    const targetKitchen = getKitchenFilter(req.user, kitchen_id);

    let sql = 'SELECT * FROM v_slot_utilisation WHERE 1=1';
    const params = [];
    let idx = 1;

    if (targetKitchen) {
      sql += ` AND kitchen_id = $${idx++}`;
      params.push(targetKitchen);
    }
    if (start_date) {
      sql += ` AND slot_date >= $${idx++}`;
      params.push(start_date);
    }
    if (end_date) {
      sql += ` AND slot_date <= $${idx++}`;
      params.push(end_date);
    }

    sql += ' ORDER BY slot_date DESC LIMIT 100';

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 4. Household Activity
router.get('/households', async (req, res, next) => {
  try {
    const { kitchen_id } = querySchema.parse(req.query);
    const targetKitchen = getKitchenFilter(req.user, kitchen_id);

    // This view doesn't have a date filter natively, it aggregates all time.
    let sql = 'SELECT h.*, a.sessions_attended, a.slots_assigned FROM households h LEFT JOIN v_household_activity a ON a.household_id = h.id WHERE 1=1';
    const params = [];
    let idx = 1;

    if (targetKitchen) {
      sql += ` AND h.kitchen_id = $${idx++}`;
      params.push(targetKitchen);
    }

    sql += ' ORDER BY h.household_code';

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 5. Daily Technical Logs (for Faults, Uptime, Safety)
router.get('/technical', async (req, res, next) => {
  try {
    const { kitchen_id, start_date, end_date } = querySchema.parse(req.query);
    const targetKitchen = getKitchenFilter(req.user, kitchen_id);

    let sql = 'SELECT * FROM daily_technical_logs WHERE 1=1';
    const params = [];
    let idx = 1;

    if (targetKitchen) {
      sql += ` AND kitchen_id = $${idx++}`;
      params.push(targetKitchen);
    }
    if (start_date) {
      sql += ` AND log_date >= $${idx++}`;
      params.push(start_date);
    }
    if (end_date) {
      sql += ` AND log_date <= $${idx++}`;
      params.push(end_date);
    }

    sql += ' ORDER BY log_date DESC LIMIT 100';

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 6. Monthly Feedback (for Satisfaction, Backup fuel)
router.get('/feedback', async (req, res, next) => {
  try {
    const { kitchen_id } = querySchema.parse(req.query);
    const targetKitchen = getKitchenFilter(req.user, kitchen_id);

    let sql = `
      SELECT f.*, h.kitchen_id 
      FROM monthly_feedback f
      JOIN households h ON h.id = f.household_id
      WHERE 1=1
    `;
    const params = [];
    let idx = 1;

    if (targetKitchen) {
      sql += ` AND h.kitchen_id = $${idx++}`;
      params.push(targetKitchen);
    }

    sql += ' ORDER BY f.survey_month DESC LIMIT 500';

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
