import Dexie from 'dexie';

export const db = new Dexie('spcki_offline_db');

db.version(1).stores({
  // Outbox for form submissions waiting to be synced
  outbox: 'client_uuid, type, status, created_at, payload, error',
  
  // Reference data cached for offline use
  households: 'id, name, family_size',
  slots: 'id, date, start_time, end_time, household_id',
  lookups: 'category, value', // generic key-value
});
