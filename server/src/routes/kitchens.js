import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

const kitchenSchema = z.object({
  name: z.string().min(1),
  location: z.string().optional(),
  max_households: z.number().int().positive(),
  slots_per_day: z.number().int().positive(),
  scheduled_hours: z.number().positive(),
  status: z.enum(['Active', 'Inactive']),
});

// List kitchens
router.get('/', async (req, res, next) => {
  try {
    // Admins and Project managers see all, others see their own
    let sql = 'SELECT * FROM kitchens ORDER BY name';
    const params = [];
    
    if (!['Admin', 'Project'].includes(req.user.role)) {
      sql = 'SELECT * FROM kitchens WHERE id = $1 ORDER BY name';
      params.push(req.user.kitchen_id);
    }
    
    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Create kitchen (Admin/Project only)
router.post('/', requireRole(['Admin', 'Project']), async (req, res, next) => {
  try {
    const data = kitchenSchema.parse(req.body);
    const { rows } = await query(
      `INSERT INTO kitchens (name, location, max_households, slots_per_day, scheduled_hours, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [data.name, data.location, data.max_households, data.slots_per_day, data.scheduled_hours, data.status]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Update kitchen
router.put('/:id', requireRole(['Admin', 'Project']), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = kitchenSchema.parse(req.body);
    const { rows } = await query(
      `UPDATE kitchens 
       SET name = $1, location = $2, max_households = $3, slots_per_day = $4, scheduled_hours = $5, status = $6
       WHERE id = $7 RETURNING *`,
      [data.name, data.location, data.max_households, data.slots_per_day, data.scheduled_hours, data.status, id]
    );
    
    if (rows.length === 0) return res.status(404).json({ error: 'Kitchen not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
