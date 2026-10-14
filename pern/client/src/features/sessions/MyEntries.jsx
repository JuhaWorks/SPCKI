/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { db } from '../../offline/db.js';
import { SyncEngine } from '../../offline/syncEngine.js';

export default function MyEntries() {
  const [entries, setEntries] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const loadEntries = async () => {
    try {
      const data = await db.outbox.orderBy('created_at').reverse().toArray();
      setEntries(data);
    } catch (err) {
      console.error('Failed to load outbox entries:', err);
    }
  };

  useEffect(() => {
    loadEntries();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(loadEntries, 2000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleForceSync = async () => {
    setIsSyncing(true);
    try {
      await SyncEngine.syncOutbox();
    } catch (e) {
      console.error(e);
    } finally {
      await loadEntries();
      setIsSyncing(false);
    }
  };

  const handleDeleteItem = async (client_uuid) => {
    if (window.confirm('Remove this entry from the local outbox?')) {
      await SyncEngine.deleteOutboxItem(client_uuid);
      await loadEntries();
    }
  };

  const handleClearSynced = async () => {
    await SyncEngine.clearSynced();
    await loadEntries();
  };

  const pendingCount = entries.filter(e => e.status === 'pending').length;
  const syncedCount = entries.filter(e => e.status === 'synced').length;

  return (
    <div className="reports-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            My Offline Entries & Sync Outbox
            <span style={{
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: isOnline ? '#ecfdf5' : '#fef2f2',
              color: isOnline ? '#059669' : '#dc2626',
              border: `1px solid ${isOnline ? '#a7f3d0' : '#fecaca'}`
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isOnline ? '#10b981' : '#ef4444' }} />
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </h2>
          <p style={{ margin: '0.35rem 0 0 0', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
            Total: {entries.length} | Pending: <strong style={{ color: pendingCount > 0 ? '#d97706' : 'inherit' }}>{pendingCount}</strong> | Synced: <strong style={{ color: '#059669' }}>{syncedCount}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {syncedCount > 0 && (
            <button 
              className="btn-outline" 
              style={{ width: 'auto', margin: 0, padding: '0.5rem 0.9rem', fontSize: '0.85rem' }} 
              onClick={handleClearSynced}
            >
              Clear Synced
            </button>
          )}
          <button 
            className="btn-primary" 
            style={{ width: 'auto', margin: 0, padding: '0.5rem 1.1rem', fontSize: '0.85rem' }} 
            onClick={handleForceSync}
            disabled={isSyncing || !isOnline}
          >
            {isSyncing ? 'Syncing...' : 'Sync Outbox Now'}
          </button>
        </div>
      </div>
      
      {entries.length === 0 ? (
        <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
          <p style={{ margin: 0, color: 'var(--color-text-light)' }}>No entries in the local outbox. All sessions are up to date.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
          <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Type</th>
                <th style={{ padding: '0.75rem 1rem' }}>Recorded Time</th>
                <th style={{ padding: '0.75rem 1rem' }}>Household / Details</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Error / Note</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => {
                const isSynced = entry.status === 'synced';
                const isFailed = entry.status === 'failed' || Boolean(entry.error);
                return (
                  <tr key={entry.client_uuid} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>
                      {entry.type.replace('_', ' ').toUpperCase()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                      {entry.payload?.household_id ? `Household ID: ${entry.payload.household_id} (Slot: ${entry.payload.slot_id || '-'})` : (entry.payload?.remarks || '-')}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        padding: '4px 10px', 
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.04em',
                        border: '1px solid',
                        borderColor: isSynced ? '#a7f3d0' : isFailed ? '#fecaca' : '#fde68a',
                        backgroundColor: isSynced ? '#ecfdf5' : isFailed ? '#fef2f2' : '#fffbeb',
                        color: isSynced ? '#059669' : isFailed ? '#dc2626' : '#d97706'
                      }}>
                        {entry.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.82rem', color: entry.error ? '#dc2626' : 'var(--color-text-light)' }}>
                      {entry.error || (isSynced ? 'Synced to server' : 'Queued for sync')}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDeleteItem(entry.client_uuid)}
                        title="Delete from outbox"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
