/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../auth/authStore';
import { apiClient } from '../../api/axios.js';
import '../sessions/Forms.css';

const householdSchema = z.object({
  household_code: z.string().min(1, 'Household Code is required'),
  kitchen_id: z.string().min(1, 'Kitchen ID is required'),
  family_size: z.number().min(1),
  adults_count: z.number().min(0),
  children_count: z.number().min(0),
  baseline_fuel_type: z.string().optional(),
  baseline_monthly_fuel_cost: z.number().min(0).optional(),
  is_active: z.boolean().default(true)
}).refine(data => data.adults_count + data.children_count === data.family_size, {
  message: 'Adults + Children must equal Total Family Size',
  path: ['family_size']
});

export default function HouseholdForm() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const defaultKitchenId = String(user?.kitchen_id || '1');

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    resolver: zodResolver(householdSchema),
    defaultValues: {
      kitchen_id: defaultKitchenId,
      household_code: '',
      family_size: 4,
      adults_count: 2,
      children_count: 2,
      baseline_fuel_type: 'Wood',
      baseline_monthly_fuel_cost: 0,
      is_active: true
    }
  });

  const adults = watch('adults_count');
  const children = watch('children_count');

  // Auto-sync total family size with adults + children
  useEffect(() => {
    const a = Number(adults) || 0;
    const c = Number(children) || 0;
    setValue('family_size', a + c);
  }, [adults, children, setValue]);

  const onSubmit = async (data) => {
    try {
      let code = data.household_code.trim();
      if (!code.toUpperCase().startsWith('HH-')) {
        const num = code.replace(/\D/g, '');
        code = num ? `HH-${num.padStart(3, '0')}` : `HH-${code}`;
      } else {
        code = code.toUpperCase();
      }

      await apiClient.post('/households', {
        kitchen_id: parseInt(data.kitchen_id, 10),
        household_code: code,
        family_size: data.family_size,
        adults_count: data.adults_count,
        children_count: data.children_count,
        baseline_fuel_type: data.baseline_fuel_type || 'Wood',
        baseline_monthly_fuel_cost: data.baseline_monthly_fuel_cost || 0,
        status: data.is_active ? 'Active' : 'Inactive'
      });

      alert(`Household ${code} successfully enrolled!`);
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'households'] });
      reset({
        kitchen_id: defaultKitchenId,
        household_code: '',
        family_size: 4,
        adults_count: 2,
        children_count: 2,
        baseline_fuel_type: 'Wood',
        baseline_monthly_fuel_cost: 0,
        is_active: true
      });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || err.response?.data?.message || err.message;
      alert(`Error enrolling household: ${msg}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Enroll New Household</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="spcki-form">
        
        <div className="form-row">
          <div className="form-group">
            <label>Household Code / Number</label>
            <div className="prefix-input-group">
              <span className="prefix">HH - </span>
              <input type="text" placeholder="051" {...register('household_code')} />
            </div>
            {errors.household_code && <span className="error">{errors.household_code.message}</span>}
          </div>
          <div className="form-group">
            <label>Kitchen Station ID</label>
            <input 
              type="number" 
              {...register('kitchen_id')} 
              readOnly={user?.role === 'Field'} 
              style={user?.role === 'Field' ? { backgroundColor: 'var(--color-bg)', cursor: 'not-allowed' } : {}}
            />
            {errors.kitchen_id && <span className="error">{errors.kitchen_id.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Adults</label>
            <input type="number" min="0" {...register('adults_count', { valueAsNumber: true })} />
          </div>
          <div className="form-group">
            <label>Children</label>
            <input type="number" min="0" {...register('children_count', { valueAsNumber: true })} />
          </div>
          <div className="form-group">
            <label>Total Family Size (Auto-calculated)</label>
            <input type="number" min="1" {...register('family_size', { valueAsNumber: true })} readOnly style={{ backgroundColor: 'var(--color-bg)' }} />
          </div>
        </div>
        {errors.family_size && <span className="error" style={{ display: 'block', marginBottom: '1rem' }}>{errors.family_size.message}</span>}

        <div className="form-row">
          <div className="form-group">
            <label>Previous Baseline Fuel</label>
            <select {...register('baseline_fuel_type')}>
              <option value="Wood">Wood</option>
              <option value="Charcoal">Charcoal</option>
              <option value="Kerosene">Kerosene</option>
              <option value="LPG">LPG</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Est. Monthly Fuel Cost (BDT)</label>
            <input type="number" min="0" step="10" {...register('baseline_monthly_fuel_cost', { valueAsNumber: true })} />
          </div>
        </div>

        <div className="form-group bordered-group">
          <label className="switch-label">
            <input type="checkbox" {...register('is_active')} />
            Enroll as Active Household
          </label>
        </div>

        <button type="submit" className="btn-primary">Complete Enrollment</button>
      </form>
    </div>
  );
}
