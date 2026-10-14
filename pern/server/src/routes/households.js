import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

const householdSchema = z.object({
  kitchen_id: z.number().int().positive(),
  household_code: z.string().min(1),
  family_size: z.number().int().positive(),
  children_count: z.number().int().nonnegative(),
  adults_count: z.number().int().nonnegative(),
  baseline_fuel_type: z.string().optional(),
  baseline_monthly_fuel_cost: z.number().nonnegative().optional(),
  status: z.enum(['Active', 'Inactive']),
}).refine(data => data.children_count + data.adults_count === data.family_size, {
  message: "Children and adults count must equal family size",
  path: ["family_size"]
});

function canManageKitchen(reqUser, targetKitchenId) {
  if (['Admin', 'Project'].includes(reqUser.role)) return true;
  return reqUser.kitchen_id === targetKitchenId;
}

import { logAuditEvent } from '../utils/audit.js';

// List households
router.get('/', async (req, res, next) => {
  try {
    const kitchen_id = req.query.kitchen_id ? parseInt(req.query.kitchen_id, 10) : null;
    
    let sql = 'SELECT * FROM households WHERE 1=1';
    const params = [];
    let idx = 1;

    // Field staff can only see their own kitchen
    const targetKitchen = ['Admin', 'Project'].includes(req.user.role) 
      ? kitchen_id 
      : req.user.kitchen_id;

    if (targetKitchen) {
      sql += ` AND kitchen_id = $${idx++}`;
      params.push(targetKitchen);
    }
    
    sql += ' ORDER BY household_code';

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Create household
router.post('/', requireRole(['Admin', 'Project', 'Field']), async (req, res, next) => {
  try {
    const data = householdSchema.parse(req.body);
    
    if (!canManageKitchen(req.user, data.kitchen_id)) {
      return res.status(403).json({ error: 'Cannot add household to this kitchen' });
    }

    const { rows } = await query(
      `INSERT INTO households (kitchen_id, household_code, family_size, children_count, adults_count, baseline_fuel_type, baseline_monthly_fuel_cost, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [data.kitchen_id, data.household_code, data.family_size, data.children_count, data.adults_count, data.baseline_fuel_type, data.baseline_monthly_fuel_cost, data.status]
    );

    await logAuditEvent({
      userId: req.user.id,
      action: 'CREATE',
      tableName: 'households',
      recordId: rows[0].id,
      newValues: rows[0],
      reason: 'Enrolled new household',
    });

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Update household
router.put('/:id', requireRole(['Admin', 'Project', 'Field']), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid household ID' });
    const data = householdSchema.parse(req.body);

    // Object-level authorization check: Verify household belongs to user's assigned kitchen
    const existing = await query('SELECT * FROM households WHERE id = $1', [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: 'Household not found' });

    if (!canManageKitchen(req.user, existing.rows[0].kitchen_id)) {
      return res.status(403).json({ error: 'Cannot modify household belonging to another kitchen' });
    }

    if (!canManageKitchen(req.user, data.kitchen_id)) {
      return res.status(403).json({ error: 'Cannot transfer household to another kitchen' });
    }

    const { rows } = await query(
      `UPDATE households 
       SET kitchen_id = $1, household_code = $2, family_size = $3, children_count = $4, adults_count = $5, 
           baseline_fuel_type = $6, baseline_monthly_fuel_cost = $7, status = $8
       WHERE id = $9 RETURNING *`,
      [data.kitchen_id, data.household_code, data.family_size, data.children_count, data.adults_count, 
       data.baseline_fuel_type, data.baseline_monthly_fuel_cost, data.status, id]
    );
    
    await logAuditEvent({
      userId: req.user.id,
      action: 'UPDATE',
      tableName: 'households',
      recordId: id,
      oldValues: existing.rows[0],
      newValues: rows[0],
      reason: 'Updated household record',
    });

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
