/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SyncEngine } from '../../offline/syncEngine.js';
import '../sessions/Forms.css';

const generatorSchema = z.object({
  log_date: z.string(),
  fuel_start_l: z.number().min(0),
  refuel_l: z.number().min(0).default(0),
  fuel_end_l: z.number().min(0),
  running_hours: z.number().min(0).max(24),
  maintenance_required: z.boolean(),
  maintenance_type: z.string().optional(),
  remarks: z.string().optional()
}).refine(data => data.fuel_end_l <= (data.fuel_start_l + data.refuel_l), {
  message: 'Fuel at end cannot exceed starting fuel + refueled amount',
  path: ['fuel_end_l']
});

export default function GeneratorLogForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      log_date: new Date().toISOString().split('T')[0],
      fuel_start_l: 0,
      refuel_l: 0,
      fuel_end_l: 0,
      running_hours: 0,
      maintenance_required: false,
      maintenance_type: '',
      remarks: ''
    }
  });

  const maintenance_required = watch('maintenance_required');

  const onSubmit = async (data) => {
    try {
      if (maintenance_required && !data.maintenance_type) {
        alert('Maintenance type is required if maintenance was needed');
        return;
      }
      
      const payload = {
        ...data,
        maintenance_type: maintenance_required ? data.maintenance_type : null,
      };

      await SyncEngine.addToOutbox('generator_log', payload);
      alert('Generator Log saved and synced!');
      reset();
    } catch (err) {
      console.error(err);
      alert('Error saving log');
    }
  };

  return (
    <div className="form-container">
      <h2>Generator Log</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="spcki-form">
        
        <div className="form-group">
          <label>Log Date</label>
          <input type="date" {...register('log_date')} />
          {errors.log_date && <span className="error">{errors.log_date.message}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fuel at Start (Liters)</label>
            <input type="number" step="0.1" min="0" {...register('fuel_start_l', { valueAsNumber: true })} />
          </div>
          <div className="form-group">
            <label>Fuel Added (Liters)</label>
            <input type="number" step="0.1" min="0" {...register('refuel_l', { valueAsNumber: true })} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fuel at End (Liters)</label>
            <input type="number" step="0.1" min="0" {...register('fuel_end_l', { valueAsNumber: true })} />
            {errors.fuel_end_l && <span className="error">{errors.fuel_end_l.message}</span>}
          </div>
          <div className="form-group">
            <label>Running Hours</label>
            <input type="number" step="0.1" min="0" max="24" {...register('running_hours', { valueAsNumber: true })} />
            {errors.running_hours && <span className="error">{errors.running_hours.message}</span>}
          </div>
        </div>

        <div className="form-group bordered-group">
          <label className="switch-label">
            <input type="checkbox" {...register('maintenance_required')} />
            Maintenance Required?
          </label>
          
          {maintenance_required && (
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Maintenance Type</label>
              <input type="text" placeholder="e.g. Oil change, filter replacement" {...register('maintenance_type')} />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <textarea {...register('remarks')}></textarea>
        </div>

        <button type="submit" className="btn-primary">Save Generator Log</button>
      </form>
    </div>
  );
}
