/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SyncEngine } from '../../offline/syncEngine.js';
import '../sessions/Forms.css'; // Reuse form styles

const dailyTechnicalSchema = z.object({
  log_date: z.string(),
  solar_kwh: z.number().min(0),
  morning_soc: z.number().min(0).max(100),
  evening_soc: z.number().min(0).max(100),
  system_operational: z.boolean(),
  fault_count: z.number().min(0).default(0),
  downtime_hours: z.number().min(0).max(24).default(0),
  safety_incident: z.boolean(),
  safety_severity: z.string().optional(),
  safety_note: z.string().optional(),
  weather: z.string().min(1, 'Weather is required'),
  energy_consumed_kwh: z.number().min(0),
  remarks: z.string().optional()
});

export default function DailyTechnicalForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(dailyTechnicalSchema),
    defaultValues: {
      log_date: new Date().toISOString().split('T')[0],
      system_operational: true,
      fault_count: 0,
      downtime_hours: 0,
      safety_incident: false,
      safety_severity: '',
      weather: 'Sunny',
      solar_kwh: 0,
      energy_consumed_kwh: 0,
      morning_soc: 50,
      evening_soc: 50
    }
  });

  const safety_incident = watch('safety_incident');
  const system_operational = watch('system_operational');

  const onSubmit = async (data) => {
    try {
      if (safety_incident && !data.safety_severity) {
        alert('Safety severity is required if there was an incident');
        return;
      }
      
      const payload = {
        ...data,
        safety_severity: safety_incident ? data.safety_severity : null,
        safety_note: safety_incident ? data.safety_note : null,
        fault_count: system_operational ? 0 : data.fault_count,
        downtime_hours: system_operational ? 0 : data.downtime_hours,
      };

      await SyncEngine.addToOutbox('daily_log', payload);
      alert('Technical Log saved and synced!');
      reset();
    } catch (err) {
      console.error(err);
      alert('Error saving log');
    }
  };

  return (
    <div className="form-container">
      <h2>Daily Technical Log</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="spcki-form">
        
        <div className="form-group">
          <label>Log Date</label>
          <input type="date" {...register('log_date')} />
          {errors.log_date && <span className="error">{errors.log_date.message}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Solar Generation (kWh)</label>
            <input type="number" step="0.1" {...register('solar_kwh', { valueAsNumber: true })} />
          </div>
          <div className="form-group">
            <label>Energy Consumed (kWh)</label>
            <input type="number" step="0.1" {...register('energy_consumed_kwh', { valueAsNumber: true })} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Morning Battery SOC (%)</label>
            <input type="number" min="0" max="100" {...register('morning_soc', { valueAsNumber: true })} />
          </div>
          <div className="form-group">
            <label>Evening Battery SOC (%)</label>
            <input type="number" min="0" max="100" {...register('evening_soc', { valueAsNumber: true })} />
          </div>
        </div>

        <div className="form-group">
          <label>Weather Condition</label>
          <select {...register('weather')}>
            <option value="Sunny">Sunny</option>
            <option value="Partly cloudy">Partly cloudy</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Rainy">Rainy</option>
            <option value="Stormy">Stormy</option>
          </select>
        </div>

        <div className="form-group bordered-group">
          <label className="switch-label">
            <input type="checkbox" {...register('system_operational')} />
            System was operational all day
          </label>
          
          {!system_operational && (
            <div className="form-row" style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label>Number of Faults</label>
                <input type="number" min="0" {...register('fault_count', { valueAsNumber: true })} />
              </div>
              <div className="form-group">
                <label>Downtime (Hours)</label>
                <input type="number" min="0" max="24" step="0.1" {...register('downtime_hours', { valueAsNumber: true })} />
              </div>
            </div>
          )}
        </div>

        <div className="form-group bordered-group">
          <label className="switch-label">
            <input type="checkbox" {...register('safety_incident')} />
            Was there a safety incident?
          </label>
          
          {safety_incident && (
            <div style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label>Severity</label>
                <select {...register('safety_severity')}>
                  <option value="">Select severity...</option>
                  <option value="Minor">Minor</option>
                  <option value="Major">Major</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label>Incident Details</label>
                <textarea {...register('safety_note')}></textarea>
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <textarea {...register('remarks')}></textarea>
        </div>

        <button type="submit" className="btn-primary">Save Technical Log</button>
      </form>
    </div>
  );
}
