import { describe, it, expect } from 'vitest';
import { calcAxialColumn, calcEccentricColumn } from '../columnDesign';
import { calcCrackWidth, calcBeamDeflection } from '../serviceability';
import { calcIsolatedFooting } from '../footingDesign';
import { calcRetainingWall } from '../retainingWall';

describe('Column Design Unit Tests (Tập 1 Chương 5)', () => {
  it('calculates axial column capacity correctly', () => {
    const res = calcAxialColumn('B20', 'CB300_V', 250, 250, 3000, 600, 0.9);
    expect(res.Ast_required_mm2).toBeGreaterThanOrEqual(0);
    expect(res.N_capacity_kN).toBeGreaterThanOrEqual(600);
    expect(res.isSafe).toBe(true);
  });

  it('calculates eccentric compression column correctly', () => {
    const res = calcEccentricColumn({
      concrete: 'B25',
      rebar: 'CB400_V',
      bMm: 300,
      hMm: 500,
      cMm: 40,
      l0Mm: 3600,
      NMm: 800,
      MMm: 120,
      symmetric: true
    });
    expect(res.e0_mm).toBe(150);
    expect(res.ea_mm).toBeGreaterThanOrEqual(10);
    expect(res.totalAs_mm2).toBeGreaterThan(0);
    expect(res.mu_pct).toBeGreaterThan(0.2);
  });
});

describe('Serviceability Tests (Tập 1 Chương 7)', () => {
  it('calculates crack width within realistic bounds', () => {
    const res = calcCrackWidth({
      concrete: 'B20',
      rebar: 'CB300_V',
      bMm: 200,
      hMm: 400,
      aMm: 35,
      AsMm2: 600,
      barDiaMm: 16,
      M_ser_kNm: 35,
      isLongTerm: true
    });
    expect(res.a_crc_mm).toBeGreaterThan(0.05);
    expect(res.a_crc_mm).toBeLessThan(0.4);
    expect(res.a_crc_limit_mm).toBe(0.3);
  });

  it('calculates beam deflection within span limit bounds', () => {
    const res = calcBeamDeflection({
      concrete: 'B20',
      bMm: 200,
      hMm: 400,
      spanMm: 6000,
      q_ser_kNm: 15,
      AsMm2: 900
    });
    expect(res.f_mm).toBeGreaterThan(0);
    expect(res.f_limit_mm).toBe(24); // 6000 / 250
  });
});

describe('Footing Design Tests (Tập 2 Chương 3)', () => {
  it('verifies isolated footing pressure and punching shear', () => {
    const res = calcIsolatedFooting({
      concrete: 'B20',
      rebar: 'CB300_V',
      bColMm: 300,
      hColMm: 300,
      bFootingM: 2.0,
      lFootingM: 2.0,
      hFootingMm: 600,
      aMm: 50,
      N_kN: 800,
      M_kNm: 40,
      gamma_soil: 20,
      depthM: 1.5
    });
    expect(res.p_max_kPa).toBeGreaterThan(res.p_min_kPa);
    expect(res.punchingCapacity_kN).toBeGreaterThan(0);
    expect(res.As_x_cm2).toBeGreaterThan(0);
    expect(res.As_y_cm2).toBeGreaterThan(0);
  });
});

describe('Retaining Wall Tests (Tập 3 Chương 3)', () => {
  it('verifies earth pressure and stability safety factors', () => {
    const res = calcRetainingWall({
      concrete: 'B20',
      rebar: 'CB300_V',
      H_m: 4.5,
      B_m: 2.8,
      b_stem_top_m: 0.25,
      b_stem_bot_m: 0.45,
      h_base_m: 0.45,
      b_toe_m: 0.8,
      gamma_soil: 18,
      phi_deg: 30,
      q_surcharge: 10,
      mu_friction: 0.45
    });
    expect(res.Ka).toBeCloseTo(0.333, 2);
    expect(res.K_overturning).toBeGreaterThan(1.5);
    expect(res.isOverturningSafe).toBe(true);
    expect(res.As_stem_cm2).toBeGreaterThan(5);
  });
});
