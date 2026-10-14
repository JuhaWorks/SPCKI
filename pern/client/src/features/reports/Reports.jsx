import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../auth/authStore';
import { apiClient } from '../../api/axios.js';
import { dashboardService } from '../../api/dashboardService.js';
import './Reports.css';

export default function Reports() {
  const { user } = useAuthStore();
  const [format, setFormat] = useState('csv');
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('sessions');

  const canExport = Boolean(user && ['Admin', 'Project', 'Viewer', 'Field'].includes(user.role));

  // Fetch preview data unconditionally before any returns
  const { data: sessions } = useQuery({ 
    queryKey: ['reports', 'sessions'], 
    queryFn: () => dashboardService.getSessions(),
    enabled: canExport 
  });
  const { data: households } = useQuery({ 
    queryKey: ['reports', 'households'], 
    queryFn: () => dashboardService.getHouseholds(),
    enabled: canExport 
  });
  const { data: technical } = useQuery({ 
    queryKey: ['reports', 'technical'], 
    queryFn: () => dashboardService.getTechnical(),
    enabled: canExport 
  });

  if (!canExport) {
    return (
      <div className="reports-container">
        <h2>Reports & Export</h2>
        <p>You do not have permission to export data. Please contact an Administrator.</p>
      </div>
    );
  }

  const handleExport = async (dataset) => {
    try {
      setDownloading(true);
      
      const response = await apiClient.get(`/export/${dataset}?format=${format}`, {
        responseType: 'blob'
      });
      
      // Convert to blob and download
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dataset}_export_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Error exporting data: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const renderTable = (dataset, columns) => {
    if (!dataset || dataset.length === 0) return <p>No data available to preview.</p>;
    return (
      <div className="table-responsive">
        <table className="premium-table">
          <thead>
            <tr>
              {columns.map(c => <th key={c.key}>{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataset.slice(0, 50).map((row, i) => (
              <tr key={i}>
                {columns.map(c => <td key={c.key}>{String(row[c.key] || '')}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {dataset.length > 50 && <div className="table-footer">Showing first 50 rows. Download to view all {dataset.length} records.</div>}
      </div>
    );
  };

  return (
    <div className="reports-container">
      <h2>Data Explorer & Export</h2>
      <p>View tabular data and download reports in your preferred format.</p>

      <div className="export-controls">
        <label>Format: </label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="csv">CSV</option>
          <option value="xlsx">Excel (XLSX)</option>
          <option value="pdf">PDF</option>
        </select>
        <button className="btn-primary" onClick={() => handleExport(activeTab)} disabled={downloading}>
          {downloading ? 'Exporting...' : `Download ${activeTab.toUpperCase()}`}
        </button>
      </div>

      <div className="dataset-tabs">
        {['sessions', 'households', 'technical'].map(tab => (
          <button 
            key={tab} 
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="dataset-view">
        {activeTab === 'sessions' && renderTable(sessions, [
          { key: 'session_date', label: 'Date' },
          { key: 'household_code', label: 'HH Code' },
          { key: 'start_at', label: 'Start Time' },
          { key: 'appliance', label: 'Appliance' },
          { key: 'duration_min', label: 'Duration (m)' },
          { key: 'persons_cooked_for', label: 'Persons' },
          { key: 'power_source', label: 'Power' }
        ])}
        
        {activeTab === 'households' && renderTable(households, [
          { key: 'id', label: 'ID' },
          { key: 'household_code', label: 'Code' },
          { key: 'family_size', label: 'Family Size' },
          { key: 'baseline_fuel_type', label: 'Prev Fuel' },
          { key: 'sessions_attended', label: 'Sessions' }
        ])}

        {activeTab === 'technical' && renderTable(technical, [
          { key: 'log_date', label: 'Date' },
          { key: 'solar_kwh', label: 'Solar kWh' },
          { key: 'energy_consumed_kwh', label: 'Consumed kWh' },
          { key: 'fault_count', label: 'Faults' },
          { key: 'system_operational', label: 'Operational?' }
        ])}
      </div>
    </div>
  );
}
