/* eslint-disable no-console */
import { query } from '../db/pool.js';

/**
 * Standard audit logger matching audit_logs schema:
 * user_id, action, table_name, record_id, old_values, new_values, reason
 */
export async function logAuditEvent({
  userId,
  action,
  tableName,
  recordId = null,
  oldValues = null,
  newValues = null,
  reason = null,
}) {
  try {
    await query(
      `INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values, reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId || null,
        action,
        tableName,
        recordId ? String(recordId) : null,
        oldValues ? JSON.stringify(oldValues) : null,
        newValues ? JSON.stringify(newValues) : null,
        reason || null,
      ]
    );
  } catch (err) {
    console.error('Audit log write failed:', err.message);
  }
}
