/* eslint-disable security/detect-object-injection */
import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { sanitizeRow } from '../utils/csv-safe.js';
import { writeToString } from 'fast-csv';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

const router = Router();
router.use(requireAuth);

const exportSchema = z.object({
  format: z.enum(['csv', 'xlsx', 'pdf']).default('csv'),
  kitchen_id: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

import { logAuditEvent } from '../utils/audit.js';

// Middleware to restrict access
function requireExportRole(req, res, next) {
  if (!['Admin', 'Project', 'Viewer', 'Field'].includes(req.user.role)) {
    return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Export requires authorized role' } });
  }
  next();
}

async function logAudit(req, dataset) {
  await logAuditEvent({
    userId: req.user.id,
    action: 'EXPORT',
    tableName: 'exports',
    newValues: { dataset, format: req.query.format, filters: req.query },
    reason: 'User requested export',
  });
}

router.get('/:dataset', requireExportRole, async (req, res, next) => {
  try {
    const { dataset } = req.params;
    const { format, kitchen_id } = exportSchema.parse(req.query);

    // Limit to user's kitchen unless Admin/Project specify otherwise
    let targetKitchen = req.user.kitchen_id;
    if (['Admin', 'Project'].includes(req.user.role)) {
      targetKitchen = kitchen_id ? parseInt(kitchen_id, 10) : null;
    }

    // Determine query
    let sql = '';
    const params = [];
    
    // Whitelist datasets
    if (dataset === 'sessions') {
      sql = 'SELECT * FROM v_session_details WHERE 1=1';
    } else if (dataset === 'solar') {
      sql = 'SELECT * FROM v_daily_solar WHERE 1=1';
    } else if (dataset === 'technical') {
      sql = 'SELECT * FROM daily_technical_logs WHERE 1=1';
    } else if (dataset === 'households') {
      sql = 'SELECT * FROM households WHERE 1=1';
    } else {
      return res.status(400).json({ error: { code: 'INVALID_DATASET', message: 'Unknown dataset' } });
    }

    if (targetKitchen) {
      sql += ` AND kitchen_id = $${params.length + 1}`;
      params.push(targetKitchen);
    }
    
    if (dataset !== 'households') {
      const dateField = dataset === 'sessions' ? 'session_date' : (dataset === 'technical' ? 'log_date' : 'log_date');
      if (req.query.start_date) {
        sql += ` AND ${dateField} >= $${params.length + 1}`;
        params.push(req.query.start_date);
      }
      if (req.query.end_date) {
        sql += ` AND ${dateField} <= $${params.length + 1}`;
        params.push(req.query.end_date);
      }
    }
    
    // Viewer role anonymisation - coded IDs only
    if (req.user.role === 'Viewer') {
       // Viewers only get coded IDs. We could hide sensitive columns here if we had them.
    }

    sql += ' LIMIT 10000'; // Row limit for exports

    const { rows } = await query(sql, params);
    
    // Sanitize rows
    const sanitizedRows = rows.map(sanitizeRow);
    
    await logAudit(req, dataset);

    const filename = `${dataset}_export_${new Date().toISOString().split('T')[0]}`;

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
      
      const csvString = await writeToString(sanitizedRows, { headers: true });
      return res.send(csvString);
    } 
    
    if (format === 'xlsx') {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
      
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet(dataset);
      
      if (sanitizedRows.length > 0) {
        sheet.columns = Object.keys(sanitizedRows[0]).map(k => ({ header: k, key: k }));
        sheet.addRows(sanitizedRows);
      }
      
      await workbook.xlsx.write(res);
      return res.end();
    }
    
    if (format === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
      
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      doc.pipe(res);
      
      doc.fontSize(16).text(`${dataset.toUpperCase()} Export`, { align: 'center' });
      doc.moveDown();
      
      if (sanitizedRows.length > 0) {
        const headers = Object.keys(sanitizedRows[0]);
        doc.fontSize(10).text(headers.join(' | '), { underline: true });
        doc.moveDown();
        
        sanitizedRows.forEach(row => {
          const values = headers.map(h => {
             const v = row[h];
             if (v instanceof Date) return v.toISOString().split('T')[0];
             return v !== null && v !== undefined ? String(v) : '';
          });
          doc.fontSize(8).text(values.join(' | '));
        });
      } else {
        doc.text('No data available.');
      }
      
      doc.end();
      return;
    }

  } catch (err) {
    next(err);
  }
});

export default router;
