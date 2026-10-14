/* eslint-disable no-console */
import { fileURLToPath } from 'url';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  console.log('Starting realistic data seed (No Transaction Mode)...');

  try {
    console.log('Clearing old data...');
    await pool.query(`
      TRUNCATE monthly_feedback, generator_logs, daily_technical_logs, 
               session_dishes, cooking_sessions, slots, households, dishes, appliances RESTART IDENTITY CASCADE;
    `);

    // We assume kitchen ID 1 exists because it was inserted during setup.
    const kitchenId = 1;

    console.log('Generating Appliances...');
    const applianceNames = ['Induction Cooker - Station 1', 'Induction Cooker - Station 2', 'Infrared Cooker - Station 3', 'Rice Cooker Large'];
    const applianceIds = [];
    for (const name of applianceNames) {
      const { rows } = await pool.query(
        `INSERT INTO appliances (name, power_kw, active) VALUES ($1, $2, true) RETURNING id`,
        [name, 1.50]
      );
      applianceIds.push(rows[0].id);
    }

    console.log('Generating Authentic Dishes...');
    const dishNames = ['Rice', 'Dal (Lentils)', 'Fish Curry', 'Chicken Curry', 'Mixed Vegetables', 'Beef Curry', 'Roti', 'Tehari'];
    const dishIds = [];
    for (const name of dishNames) {
      const { rows } = await pool.query(
        `INSERT INTO dishes (name, active) VALUES ($1, true) RETURNING id`,
        [name]
      );
      dishIds.push(rows[0].id);
    }

    console.log('Generating Households...');
    const households = [];
    for (let i = 0; i < 50; i++) {
      const adults = faker.number.int({ min: 1, max: 4 });
      const children = faker.number.int({ min: 0, max: 4 });
      const familySize = adults + children;
      
      const { rows } = await pool.query(
        `INSERT INTO households (kitchen_id, household_code, family_size, children_count, adults_count, baseline_fuel_type, baseline_monthly_fuel_cost, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [
          kitchenId,
          `HH-${(i+1).toString().padStart(3, '0')}`,
          familySize,
          children,
          adults,
          faker.helpers.arrayElement(['Wood', 'Charcoal', 'LPG']),
          faker.number.int({ min: 300, max: 1500 }),
          'Active'
        ]
      );
      households.push(rows[0].id);
    }

    console.log('Generating Slots and Sessions for last 30 days...');
    const today = new Date();
    
    // Process days sequentially to avoid overwhelming connection pool
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // 6 slots per day
      for (let j = 1; j <= 6; j++) {
        const startHour = 7 + (j * 2); // 9am, 11am, 1pm, 3pm, 5pm, 7pm
        const startStr = `${startHour.toString().padStart(2, '0')}:00:00`;
        const endStr = `${(startHour + 1).toString().padStart(2, '0')}:30:00`;

        const hhId = faker.helpers.arrayElement(households);
        const status = faker.helpers.arrayElement(['Attended', 'Attended', 'Attended', 'Missed', 'Scheduled']);

        const { rows: slotRows } = await pool.query(
          `INSERT INTO slots (kitchen_id, slot_date, slot_no, start_time, end_time, power_source, household_id, status, created_by) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1) RETURNING id`,
          [kitchenId, dateStr, j, startStr, endStr, 'Solar', hhId, status]
        );
        const slotId = slotRows[0].id;

        if (status === 'Attended') {
          const isCompleted = faker.number.int({ min: 1, max: 100 }) <= 95;
          const startDt = new Date(`${dateStr}T${startStr}`);
          const endDt = new Date(startDt.getTime() + faker.number.int({ min: 30, max: 85 }) * 60000);

          const { rows: sessionRows } = await pool.query(
            `INSERT INTO cooking_sessions 
             (client_uuid, slot_id, household_id, persons_cooked_for, start_at, end_at, 
              appliance_id, power_source, cooking_completed, cleaning_completed, created_by) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 1) RETURNING id`,
            [
              faker.string.uuid(),
              slotId,
              hhId,
              faker.number.int({ min: 2, max: 6 }),
              startDt,
              endDt,
              faker.helpers.arrayElement(applianceIds),
              'Solar',
              isCompleted,
              true
            ]
          );

          // Add 1-2 dishes
          const sessionId = sessionRows[0].id;
          const numDishes = faker.number.int({ min: 1, max: 2 });
          const selectedDishes = faker.helpers.arrayElements(dishIds, numDishes);
          for (const dId of selectedDishes) {
            await pool.query(
              `INSERT INTO session_dishes (session_id, dish_id) VALUES ($1, $2)`,
              [sessionId, dId]
            );
          }
        }
      }

      // Generate Daily Technical Log
      const sysOp = faker.number.int({ min: 1, max: 100 }) <= 95;
      await pool.query(
        `INSERT INTO daily_technical_logs 
         (client_uuid, kitchen_id, log_date, solar_kwh, morning_soc, evening_soc, system_operational, 
          fault_count, downtime_hours, safety_incident, weather, energy_consumed_kwh, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 1)`,
        [
          faker.string.uuid(),
          kitchenId,
          dateStr,
          faker.number.float({ min: 10, max: 40, fractionDigits: 1 }),
          faker.number.int({ min: 40, max: 90 }),
          faker.number.int({ min: 20, max: 60 }),
          sysOp,
          sysOp ? 0 : 1,
          sysOp ? 0 : 2.5,
          false,
          faker.helpers.arrayElement(['Sunny', 'Sunny', 'Cloudy', 'Rainy']),
          faker.number.float({ min: 8, max: 35, fractionDigits: 1 })
        ]
      );

      // Generate Generator Log
      if (faker.number.int({ min: 1, max: 4 }) === 1) {
        await pool.query(
          `INSERT INTO generator_logs 
           (client_uuid, kitchen_id, log_date, fuel_start_l, refuel_l, fuel_end_l, running_hours, maintenance_required, created_by)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1)`,
          [
            faker.string.uuid(),
            kitchenId,
            dateStr,
            faker.number.int({ min: 20, max: 50 }),
            0,
            faker.number.int({ min: 10, max: 19 }),
            faker.number.float({ min: 1, max: 4, fractionDigits: 1 }),
            false
          ]
        );
      }
    }

    console.log('Generating Feedback...');
    for (const hhId of households) {
      if (faker.number.int({ min: 1, max: 100 }) <= 60) {
        await pool.query(
          `INSERT INTO monthly_feedback 
           (client_uuid, household_id, survey_month, backup_fuel_used, backup_fuel_spend, 
            overall_rating, fuel_reduction_rating, safety_rating, privacy_rating, waiting_rating,
            cleanliness_rating, ease_rating, slot_suitability, time_enough, 
            family_members_now, willing_to_continue, created_by)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 1)`,
          [
            faker.string.uuid(),
            hhId,
            `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`,
            faker.helpers.arrayElement([true, false]),
            faker.number.int({ min: 0, max: 300 }),
            faker.number.int({ min: 3, max: 5 }),
            faker.number.int({ min: 3, max: 5 }),
            faker.number.int({ min: 4, max: 5 }),
            faker.number.int({ min: 3, max: 5 }),
            faker.number.int({ min: 2, max: 5 }),
            faker.number.int({ min: 4, max: 5 }),
            faker.number.int({ min: 4, max: 5 }),
            faker.number.int({ min: 3, max: 5 }),
            faker.helpers.arrayElement(['About right', 'Too short']),
            4,
            true
          ]
        );
      }
    }

    console.log('Seed completed successfully!');
    process.exit(0);

  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
