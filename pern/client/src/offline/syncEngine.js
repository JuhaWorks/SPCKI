/* eslint-disable no-console */
import { db } from './db.js';
import { apiClient } from '../api/axios.js';

export class SyncEngine {
  static async syncOutbox() {
    if (!navigator.onLine) return;

    try {
      const pendingItems = await db.outbox.where('status').equals('pending').toArray();
      if (pendingItems.length === 0) return;

      const payload = {
        cooking_sessions: [],
        daily_technical_logs: [],
        generator_logs: [],
        monthly_feedback: [],
        slots: []
      };

      // Map local Dexie outbox types to backend arrays
      const typeMap = {
        'cooking_session': 'cooking_sessions',
        'daily_log': 'daily_technical_logs',
        'generator_log': 'generator_logs',
        'feedback': 'monthly_feedback',
        'slot_update': 'slots'
      };

      pendingItems.forEach(item => {
        const targetArray = typeMap[item.type];
        if (targetArray) {
          payload[targetArray].push({
            client_uuid: item.client_uuid,
            device_time: item.created_at,
            ...item.payload
          });
        }
      });

      const res = await apiClient.post('/sync', payload);
      const failedMap = res.data?.failed_uuids || {};
      
      for (const item of pendingItems) {
        if (failedMap[item.client_uuid]) {
          await db.outbox.update(item.client_uuid, { status: 'failed', error: failedMap[item.client_uuid] });
        } else {
          await db.outbox.update(item.client_uuid, { status: 'synced', error: null });
        }
      }
      return res.data;
    } catch (err) {
      console.error('Sync failed', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Sync failed';
      try {
        const pendingItems = await db.outbox.where('status').equals('pending').toArray();
        for (const item of pendingItems) {
          await db.outbox.update(item.client_uuid, { error: errorMsg });
        }
      } catch (dbErr) {
        console.error('Failed to update outbox error', dbErr);
      }
      throw err;
    }
  }

  static async addToOutbox(type, payload) {
    const client_uuid = crypto.randomUUID();
    await db.outbox.add({
      client_uuid,
      type,
      status: 'pending',
      created_at: new Date().toISOString(),
      payload,
      error: null
    });
    
    // Attempt immediate sync if online
    if (navigator.onLine) {
      try {
        await this.syncOutbox();
      } catch (e) {
        console.warn('Initial sync failed, saved in outbox for retry:', e.message);
      }
    }
    
    return client_uuid;
  }

  static async deleteOutboxItem(client_uuid) {
    await db.outbox.delete(client_uuid);
  }

  static async clearSynced() {
    await db.outbox.where('status').equals('synced').delete();
  }
}

