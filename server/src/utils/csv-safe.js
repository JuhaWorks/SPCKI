/* eslint-disable security/detect-object-injection */
/**
 * Sanitizes strings to prevent CSV/Excel injection.
 * If a cell starts with =, +, -, or @, we prepend an apostrophe to force text evaluation.
 */
export function sanitizeCell(value) {
  if (typeof value !== 'string') return value;
  
  if (/^[=+\-@\t\r]/.test(value)) {
    return "'" + value;
  }
  return value;
}

export function sanitizeRow(row) {
  if (!row) return row;
  const sanitized = {};
  for (const [key, val] of Object.entries(row)) {
    sanitized[key] = sanitizeCell(val);
  }
  return sanitized;
}
