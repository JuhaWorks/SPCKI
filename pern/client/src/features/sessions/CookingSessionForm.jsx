/* eslint-disable no-console */
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { SyncEngine } from '../../offline/syncEngine.js';
import { dashboardService } from '../../api/dashboardService.js';
import './Forms.css';

const sessionSchema = z.object({
  slot_id: z.string().min(1, 'Slot is required'),
  household_id: z.string().min(1, 'Household is required'),
  persons_cooked_for: z.number().min(1).max(20),
  start_at: z.string(),
  end_at: z.string(),
  appliance_id: z.string().min(1),
  dishes: z.array(z.string()).optional(),
  power_source: z.enum(['Solar', 'Battery', 'Generator']),
  cooking_completed: z.boolean(),
  cleaning_completed: z.boolean(),
  waiting_issue: z.boolean(),
  waiting_reason_id: z.string().optional(),
  technical_problem: z.boolean(),
  problem_type_id: z.string().optional(),
  remarks: z.string().optional()
});

export default function CookingSessionForm() {
  const { data: sessionsData } = useQuery({
    queryKey: ['dashboard', 'sessions'],
    queryFn: () => dashboardService.getSessions(),
  });

  const { data: households, isLoading: loadingHouseholds } = useQuery({
    queryKey: ['dashboard', 'households'],
    queryFn: () => dashboardService.getHouseholds(),
  });

  // Compute booked data for today
  const { bookedSlots, bookedAppliancesBySlot } = useMemo(() => {
    const defaultRes = { bookedSlots: [], bookedAppliancesBySlot: {} };
    if (!sessionsData) return defaultRes;
    
    const today = new Date().toISOString().split('T')[0];
    const localDate = new Date().toLocaleDateString('en-CA');
    const todaysSessions = sessionsData.filter(s => 
      s.session_date === today || 
      s.session_date === localDate || 
      (s.start_at && (s.start_at.startsWith(today) || s.start_at.startsWith(localDate)))
    );
    
    const bySlot = {};
    todaysSessions.forEach(s => {
      const slot = String(s.slot_no || s.slot_id);
      const appliance = String(s.appliance_id);
      if (!bySlot[slot]) bySlot[slot] = [];
      bySlot[slot].push(appliance);
    });

    const totallyBookedSlots = [];
    const TOTAL_APPLIANCES = 4; // Induction 1, Induction 2, Infrared 3, Rice Cooker 4

    Object.keys(bySlot).forEach(slot => {
      if (bySlot[slot].length >= TOTAL_APPLIANCES) {
        totallyBookedSlots.push(slot);
      }
    });

    return {
      bookedSlots: totallyBookedSlots,
      bookedAppliancesBySlot: bySlot
    };
  }, [sessionsData]);

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      slot_id: '1',
      household_id: '',
      persons_cooked_for: 4,
      cooking_completed: true,
      cleaning_completed: true,
      waiting_issue: false,
      technical_problem: false,
      start_at: new Date().toISOString().slice(0, 16),
      end_at: new Date(Date.now() + 60*60*1000).toISOString().slice(0, 16),
      power_source: 'Solar',
      appliance_id: '1',
      dishes: []
    }
  });

  const waiting_issue = watch('waiting_issue');
  const technical_problem = watch('technical_problem');
  const selectedSlot = watch('slot_id');
  const selectedHousehold = watch('household_id');

  // Auto-set persons_cooked_for when a household is selected
  useEffect(() => {
    if (selectedHousehold && households) {
      const hh = households.find(h => String(h.id) === String(selectedHousehold));
      if (hh && hh.family_size) {
        setValue('persons_cooked_for', hh.family_size);
      }
    }
  }, [selectedHousehold, households, setValue]);

  // Auto-fill times based on selected slot
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const slotTimes = {
      '1': { start: '08:00', end: '10:00' },
      '2': { start: '10:00', end: '12:00' },
      '3': { start: '12:00', end: '14:00' },
      '4': { start: '14:00', end: '16:00' },
      '5': { start: '16:00', end: '18:00' },
      '6': { start: '18:00', end: '20:00' },
      '7': { start: '20:00', end: '22:00' },
    };

    if (slotTimes[selectedSlot]) {
      setValue('start_at', `${today}T${slotTimes[selectedSlot].start}`);
      setValue('end_at', `${today}T${slotTimes[selectedSlot].end}`);
    }
  }, [selectedSlot, setValue]);

  const onSubmit = async (data) => {
    try {
      if (waiting_issue && !data.waiting_reason_id) {
        alert('Waiting reason is required');
        return;
      }
      if (technical_problem && !data.problem_type_id) {
        alert('Problem type is required');
        return;
      }
      
      const payload = {
        ...data,
        slot_id: parseInt(data.slot_id, 10) || 1,
        household_id: parseInt(data.household_id, 10),
        appliance_id: parseInt(data.appliance_id, 10) || 1,
        persons_cooked_for: Number(data.persons_cooked_for) || 1,
        dishes: data.dishes ? data.dishes.map(d => parseInt(d, 10)).filter(Boolean) : [],
        start_at: new Date(data.start_at).toISOString(),
        end_at: new Date(data.end_at).toISOString(),
        waiting_issue: Boolean(data.waiting_issue),
        waiting_reason_id: data.waiting_issue && data.waiting_reason_id ? parseInt(data.waiting_reason_id, 10) : null,
        technical_problem: Boolean(data.technical_problem),
        problem_type_id: data.technical_problem && data.problem_type_id ? parseInt(data.problem_type_id, 10) : null,
        remarks: data.remarks || ''
      };

      // Save to Dexie outbox and immediately trigger sync
      await SyncEngine.addToOutbox('cooking_session', payload);
      
      alert('Session saved successfully!');
      reset();
    } catch (err) {
      console.error(err);
      alert('Error saving session');
    }
  };

  return (
    <div className="form-container">
      <h2>Log Cooking Session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="spcki-form">
        
        <div className="form-group">
          <label>Slot</label>
          <select {...register('slot_id')} defaultValue="1">
            <option value="1" disabled={bookedSlots.includes('1')}>Slot 1 (Morning 08:00 - 10:00) {bookedSlots.includes('1') ? '(Booked)' : ''}</option>
            <option value="2" disabled={bookedSlots.includes('2')}>Slot 2 (Morning 10:00 - 12:00) {bookedSlots.includes('2') ? '(Booked)' : ''}</option>
            <option value="3" disabled={bookedSlots.includes('3')}>Slot 3 (Afternoon 12:00 - 14:00) {bookedSlots.includes('3') ? '(Booked)' : ''}</option>
            <option value="4" disabled={bookedSlots.includes('4')}>Slot 4 (Afternoon 14:00 - 16:00) {bookedSlots.includes('4') ? '(Booked)' : ''}</option>
            <option value="5" disabled={bookedSlots.includes('5')}>Slot 5 (Evening 16:00 - 18:00) {bookedSlots.includes('5') ? '(Booked)' : ''}</option>
            <option value="6" disabled={bookedSlots.includes('6')}>Slot 6 (Evening 18:00 - 20:00) {bookedSlots.includes('6') ? '(Booked)' : ''}</option>
            <option value="7" disabled={bookedSlots.includes('7')}>Slot 7 (Night 20:00 - 22:00) {bookedSlots.includes('7') ? '(Booked)' : ''}</option>
          </select>
          {errors.slot_id && <span className="error">{errors.slot_id.message}</span>}
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

        <div className="form-row">
          <div className="form-group">
            <label>Start Time</label>
            <input type="datetime-local" {...register('start_at')} />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input type="datetime-local" {...register('end_at')} />
          </div>
        </div>

        <div className="form-group">
          <label>Persons Cooked For</label>
          <input type="number" {...register('persons_cooked_for', { valueAsNumber: true })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Appliance Utilized</label>
            <select {...register('appliance_id')}>
              <option value="1" disabled={bookedAppliancesBySlot[selectedSlot]?.includes('1')}>Induction Cooker - Station 1 {bookedAppliancesBySlot[selectedSlot]?.includes('1') ? '(Booked)' : ''}</option>
              <option value="2" disabled={bookedAppliancesBySlot[selectedSlot]?.includes('2')}>Induction Cooker - Station 2 {bookedAppliancesBySlot[selectedSlot]?.includes('2') ? '(Booked)' : ''}</option>
              <option value="3" disabled={bookedAppliancesBySlot[selectedSlot]?.includes('3')}>Infrared Cooker - Station 3 {bookedAppliancesBySlot[selectedSlot]?.includes('3') ? '(Booked)' : ''}</option>
              <option value="4" disabled={bookedAppliancesBySlot[selectedSlot]?.includes('4')}>Rice Cooker Large {bookedAppliancesBySlot[selectedSlot]?.includes('4') ? '(Booked)' : ''}</option>
            </select>
          </div>
          <div className="form-group">
            <label>Power Source</label>
            <select {...register('power_source')}>
              <option value="Solar">Solar</option>
              <option value="Battery">Battery</option>
              <option value="Generator">Generator</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Dishes Cooked (Select all that apply)</label>
          <div className="checkbox-grid">
            <label><input type="checkbox" value="1" {...register('dishes')} /> Rice</label>
            <label><input type="checkbox" value="2" {...register('dishes')} /> Dal (Lentils)</label>
            <label><input type="checkbox" value="3" {...register('dishes')} /> Fish Curry</label>
            <label><input type="checkbox" value="4" {...register('dishes')} /> Chicken Curry</label>
            <label><input type="checkbox" value="5" {...register('dishes')} /> Mixed Vegetables</label>
            <label><input type="checkbox" value="6" {...register('dishes')} /> Beef Curry</label>
            <label><input type="checkbox" value="7" {...register('dishes')} /> Roti</label>
            <label><input type="checkbox" value="8" {...register('dishes')} /> Tehari</label>
          </div>
        </div>

        <div className="form-row switches">
          <label>
            <input type="checkbox" {...register('cooking_completed')} />
            Cooking Completed
          </label>
          <label>
            <input type="checkbox" {...register('cleaning_completed')} />
            Cleaning Completed
          </label>
        </div>

        <div className="form-group bordered-group">
          <label className="switch-label">
            <input type="checkbox" {...register('waiting_issue')} />
            Was there a waiting issue?
          </label>
          {waiting_issue && (
            <select {...register('waiting_reason_id')} style={{ marginTop: '0.75rem' }}>
              <option value="">-- Select Waiting Reason --</option>
              <option value="1">No free slot</option>
              <option value="2">Appliance busy</option>
              <option value="3">Late start</option>
            </select>
          )}
        </div>

        <div className="form-group bordered-group">
          <label className="switch-label">
            <input type="checkbox" {...register('technical_problem')} />
            Was there a technical problem?
          </label>
          {technical_problem && (
            <select {...register('problem_type_id')} style={{ marginTop: '0.75rem' }}>
              <option value="">-- Select Problem Type --</option>
              <option value="4">Power cut</option>
              <option value="5">Appliance fault</option>
              <option value="6">Low battery</option>
              <option value="7">Other</option>
            </select>
          )}
        </div>
        
        <div className="form-group">
          <label>Remarks</label>
          <textarea {...register('remarks')}></textarea>
        </div>

        <button type="submit" className="btn-primary">Save Session</button>
      </form>
    </div>
  );
}
