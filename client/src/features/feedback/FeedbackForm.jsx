/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { SyncEngine } from '../../offline/syncEngine.js';
import { dashboardService } from '../../api/dashboardService.js';
import '../sessions/Forms.css';

const feedbackSchema = z.object({
  survey_month: z.string(),
  household_id: z.string().min(1, 'Household is required'),
  backup_fuel_used: z.string().default('Wood'),
  backup_fuel_spend: z.number().min(0).default(0),
  fuel_reduction_rating: z.number().min(1).max(5),
  safety_rating: z.number().min(1).max(5),
  privacy_rating: z.number().min(1).max(5),
  waiting_rating: z.number().min(1).max(5),
  overall_rating: z.number().min(1).max(5),
  cleanliness_rating: z.number().min(1).max(5),
  ease_rating: z.number().min(1).max(5),
  slot_suitability: z.number().min(1).max(5),
  time_enough: z.enum(['Too short', 'About right', 'Too long']),
  family_members_now: z.number().min(1).max(20),
  willing_to_continue: z.boolean(),
  remarks: z.string().optional()
});

export default function FeedbackForm() {
  const { data: households, isLoading: loadingHouseholds } = useQuery({
    queryKey: ['dashboard', 'households'],
    queryFn: () => dashboardService.getHouseholds(),
  });

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      survey_month: new Date().toISOString().split('T')[0],
      household_id: '',
      backup_fuel_spend: 0,
      fuel_reduction_rating: 3,
      safety_rating: 3,
      privacy_rating: 3,
      waiting_rating: 3,
      overall_rating: 3,
      cleanliness_rating: 3,
      ease_rating: 3,
      slot_suitability: 3,
      time_enough: 'About right',
      family_members_now: 4,
      willing_to_continue: true,
      backup_fuel_used: 'Wood',
      remarks: ''
    }
  });

  const selectedHousehold = watch('household_id');

  useEffect(() => {
    if (selectedHousehold && households) {
      const hh = households.find(h => String(h.id) === String(selectedHousehold));
      if (hh && hh.family_size) {
        setValue('family_members_now', hh.family_size);
      }
    }
  }, [selectedHousehold, households, setValue]);

  const onSubmit = async (data) => {
    try {
      const rawMonth = data.survey_month || new Date().toISOString().slice(0, 10);
      const surveyMonth = `${rawMonth.slice(0, 7)}-01`;

      const payload = {
        ...data,
        survey_month: surveyMonth,
        household_id: parseInt(data.household_id, 10),
        backup_fuel_spend: data.backup_fuel_used === 'None' ? 0 : (Number(data.backup_fuel_spend) || 0),
        remarks: data.remarks || ''
      };

      await SyncEngine.addToOutbox('feedback', payload);
      alert('Feedback saved and synced successfully!');
      reset();
    } catch (err) {
      console.error(err);
      alert('Error saving feedback');
    }
  };

  const renderRatingSelect = (name, label) => {
    const val = watch(name);
    return (
      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{label}</span>
          <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{val} / 5</span>
        </label>
        <input 
          type="range" 
          min="1" 
          max="5" 
          step="1" 
          style={{ width: '100%', cursor: 'pointer' }}
          {...register(name, { valueAsNumber: true })} 
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
          <span>1 (Poor)</span>
          <span>5 (Excellent)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="form-container">
      <h2>Monthly Household Feedback</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="spcki-form">
        
        <div className="form-row">
          <div className="form-group">
            <label>Survey Month / Date</label>
            <input type="date" {...register('survey_month')} />
            {errors.survey_month && <span className="error">{errors.survey_month.message}</span>}
          </div>
          <div className="form-group">
            <label>Household</label>
            <select {...register('household_id')} defaultValue="">
              <option value="" disabled>-- Select Household --</option>
              {loadingHouseholds && <option disabled>Loading households...</option>}
              {households?.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.household_code} (Family of {h.family_size || (h.adults_count + h.children_count)})
                </option>
              ))}
            </select>
            {errors.household_id && <span className="error">{errors.household_id.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Backup Fuel Used</label>
            <select {...register('backup_fuel_used')}>
              <option value="Wood">Wood</option>
              <option value="Charcoal">Charcoal</option>
              <option value="Kerosene">Kerosene</option>
              <option value="LPG">LPG</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Backup Fuel Spend (BDT)</label>
            <input type="number" min="0" step="10" {...register('backup_fuel_spend', { valueAsNumber: true })} />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Current Family Members</label>
            <input type="number" min="1" max="20" {...register('family_members_now', { valueAsNumber: true })} />
          </div>
          <div className="form-group">
            <label>Was Cooking Time Enough?</label>
            <select {...register('time_enough')}>
              <option value="Too short">Too short</option>
              <option value="About right">About right</option>
              <option value="Too long">Too long</option>
            </select>
          </div>
        </div>

        <div className="bordered-group">
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Satisfaction Ratings (1 - 5)</h3>
          <div className="form-row">
            {renderRatingSelect('overall_rating', 'Overall Experience')}
            {renderRatingSelect('fuel_reduction_rating', 'Fuel Reduction')}
          </div>
          <div className="form-row">
            {renderRatingSelect('safety_rating', 'Safety')}
            {renderRatingSelect('privacy_rating', 'Privacy')}
          </div>
          <div className="form-row">
            {renderRatingSelect('waiting_rating', 'Waiting Time')}
            {renderRatingSelect('cleanliness_rating', 'Cleanliness')}
          </div>
          <div className="form-row">
            {renderRatingSelect('ease_rating', 'Ease of Use')}
            {renderRatingSelect('slot_suitability', 'Slot Suitability')}
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="switch-label">
            <input type="checkbox" {...register('willing_to_continue')} />
            Willing to continue using the community kitchen?
          </label>
        </div>

        <div className="form-group">
          <label>Remarks & Observations</label>
          <textarea {...register('remarks')} placeholder="Any comments or feedback from the household..."></textarea>
        </div>

        <button type="submit" className="btn-primary">Submit Monthly Feedback</button>
      </form>
    </div>
  );
}
