/**
 * kpi-formulas.test.js
 * Unit tests for KPI calculation formulas (pure JS, no DB required)
 * These mirror the SQL views — any logic change must be reflected in both.
 */

import { describe, it, expect } from 'vitest';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Participation rate: active households / registered × 100 */
function participationRate(active, registered) {
  if (registered === 0) return 0;
  return Math.round((active / registered) * 100 * 10) / 10;
}

/** Session completion rate */
function completionRate(completed, total) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100 * 10) / 10;
}

/** Minutes per person */
function minutesPerPerson(durationMin, persons) {
  if (persons === 0) return 0;
  return Math.round((durationMin / persons) * 10) / 10;
}

/** Slot utilisation */
function slotUtilisation(attended, scheduled) {
  if (scheduled === 0) return 0;
  return Math.round((attended / scheduled) * 100 * 10) / 10;
}

/** System uptime % */
function systemUptime(scheduledHours, days, downtimeHours) {
  const total = scheduledHours * days;
  if (total === 0) return 0;
  return Math.round(((total - downtimeHours) / total) * 100 * 10) / 10;
}

/** Expected solar (kWh) */
function expectedSolar(pvKwp, peakSunHours, weatherFactor, performanceRatio) {
  return Math.round(pvKwp * peakSunHours * weatherFactor * performanceRatio * 100) / 100;
}

/** Solar efficiency */
function solarEfficiency(actualKwh, expectedKwh) {
  if (expectedKwh === 0) return 0;
  return Math.round((actualKwh / expectedKwh) * 1000) / 1000;
}

/** Generator fuel used */
function fuelUsed(start, refuel, end) {
  return Math.round((start + refuel - end) * 10) / 10;
}

/** Wasted energy (kWh) */
function wastedEnergy(solarKwh, consumedKwh, eveningSoc, morningSoc, batteryKwh) {
  const batteryChange = ((eveningSoc - morningSoc) / 100) * batteryKwh;
  return Math.round((solarKwh - consumedKwh - batteryChange) * 100) / 100;
}

/** Size band classification */
function sizeBand(persons) {
  if (persons <= 3) return '1-3';
  if (persons <= 5) return '4-5';
  if (persons <= 7) return '6-7';
  return '8+';
}

/** Backup-fuel reduction */
function backupFuelReduction(baselineCost, currentSpend) {
  if (baselineCost === 0) return 0;
  return Math.round(((baselineCost - currentSpend) / baselineCost) * 100 * 10) / 10;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('KPI: Participation rate', () => {
  it('calculates correctly', () => {
    expect(participationRate(14, 16)).toBe(87.5);
  });
  it('returns 0 when no households', () => {
    expect(participationRate(0, 0)).toBe(0);
  });
  it('returns 100 when all active', () => {
    expect(participationRate(16, 16)).toBe(100);
  });
});

describe('KPI: Session completion rate', () => {
  it('calculates correctly', () => {
    expect(completionRate(80, 84)).toBeCloseTo(95.2, 1);
  });
  it('handles zero sessions', () => {
    expect(completionRate(0, 0)).toBe(0);
  });
});

describe('KPI: Minutes per person', () => {
  it('divides duration by persons', () => {
    expect(minutesPerPerson(90, 4)).toBe(22.5);
  });
  it('handles zero persons safely', () => {
    expect(minutesPerPerson(90, 0)).toBe(0);
  });
});

describe('KPI: Slot utilisation', () => {
  it('calculates attended/scheduled ratio', () => {
    expect(slotUtilisation(78, 84)).toBeCloseTo(92.9, 1);
  });
  it('handles zero scheduled', () => {
    expect(slotUtilisation(0, 0)).toBe(0);
  });
});

describe('KPI: System uptime', () => {
  it('uptime with some downtime', () => {
    // 13h/day × 14 days = 182h total, 4h downtime
    expect(systemUptime(13, 14, 4)).toBeCloseTo(97.8, 1);
  });
  it('full uptime is 100', () => {
    expect(systemUptime(13, 14, 0)).toBe(100);
  });
});

describe('KPI: Expected solar', () => {
  // 4 kWp × 4.5 PSH × 1.0 (Sunny) × 0.75 PR = 13.5 kWh
  it('sunny day', () => {
    expect(expectedSolar(4, 4.5, 1.0, 0.75)).toBe(13.5);
  });
  // 4 × 4.5 × 0.65 × 0.75 = 8.775
  it('partly cloudy day', () => {
    expect(expectedSolar(4, 4.5, 0.65, 0.75)).toBe(8.78);
  });
});

describe('KPI: Solar efficiency', () => {
  it('100% when actual = expected', () => {
    expect(solarEfficiency(13.5, 13.5)).toBe(1);
  });
  it('below 1 when underproducing', () => {
    expect(solarEfficiency(10.7, 13.5)).toBeCloseTo(0.793, 2);
  });
  it('handles zero expected', () => {
    expect(solarEfficiency(5, 0)).toBe(0);
  });
});

describe('KPI: Generator fuel used', () => {
  it('start + refuel - end', () => {
    expect(fuelUsed(20, 5, 8)).toBe(17);
  });
  it('no refuel', () => {
    expect(fuelUsed(15, 0, 6)).toBe(9);
  });
});

describe('KPI: Wasted energy', () => {
  // solar=16.5, consumed=14.2, eve=65, morn=30, battery=10
  // batteryChange = (65-30)/100 * 10 = 3.5
  // wasted = 16.5 - 14.2 - 3.5 = -1.2 (negative = deficit, no waste)
  it('calculates correctly for sunny day (demo data)', () => {
    expect(wastedEnergy(16.5, 14.2, 65, 30, 10)).toBeCloseTo(-1.2, 1);
  });
});

describe('KPI: Size band', () => {
  it.each([
    [1, '1-3'],
    [3, '1-3'],
    [4, '4-5'],
    [5, '4-5'],
    [6, '6-7'],
    [7, '6-7'],
    [8, '8+'],
    [12, '8+'],
  ])('family of %i → %s', (size, expected) => {
    expect(sizeBand(size)).toBe(expected);
  });
});

describe('KPI: Backup-fuel reduction', () => {
  it('full reduction (zero current spend)', () => {
    expect(backupFuelReduction(2000, 0)).toBe(100);
  });
  it('partial reduction', () => {
    // (2000 - 500) / 2000 = 75%
    expect(backupFuelReduction(2000, 500)).toBe(75);
  });
  it('handles zero baseline', () => {
    expect(backupFuelReduction(0, 0)).toBe(0);
  });
});
