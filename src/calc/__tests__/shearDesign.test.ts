import { describe, it, expect } from 'vitest';
import { designShearStirrups, calculateBentUpBars } from '../shearDesign';

describe('Tính toán cốt đai và cốt xiên chịu cắt (Võ Bá Tầm - Tập 1)', () => {
  it('Bài tập 4.22 (T1 tr.133): b=300, h=600, a=40, Q=200kN, B15 (Rb=8.5, Rbt=0.75, gammaB=0.9), đai CI d=6 (2 nhánh, Rsw=175)', () => {
    // Sách tính: h0 = 560mm
    // Mb = 2 * 0.9 * 0.75 * 300 * 560^2 * 1e-6 = 127 kNm
    // s_max = 1.5 * 0.9 * 0.75 * 300 * 560^2 / 200000 = 476.3 mm
    // s_ct = h/3 = 200 mm
    // Tại c1 = 1120 mm: s = 128 mm => Chọn s = 125 mm
    const result = designShearStirrups({
      Q: 200,
      b: 300,
      h: 600,
      a: 40,
      Rb: 8.5,
      Rbt: 0.75,
      gammaB: 0.9,
      stirrupD: 6,
      stirrupLegs: 2,
      Rsw: 175,
    });

    expect(result.h0).toBe(560);
    expect(result.Mb).toBeCloseTo(127, 0);
    expect(result.sMax).toBeCloseTo(476.3, 0);
    expect(result.sCt).toBe(200);
    expect(result.suggestedS).toBe(125);
    expect(result.isConcreteCrushSafe).toBe(true);
  });

  it('Bài tập 4.23 (T1 tr.134): Tính cốt xiên khi s=200mm, Q=200kN, Qub=168.9kN', () => {
    // Sách tính: Q - Qub = 200 - 168.9 = 31.1 kN
    // A_inc = 31.1e3 / (225 * sin(45)) = 195 mm2 => Chọn 1 phi 16 (201 mm2)
    const { Ainc, countSuggested, barDiameter } = calculateBentUpBars(200, 168.9, 225, 45);
    expect(Ainc).toBeCloseTo(195.4, 0);
    expect(barDiameter).toBeGreaterThanOrEqual(14);
  });

  it('Bài tập 4.24 (T1 tr.137): Dầm chữ T b=300, h=600, b\'f=500, h\'f=100, Q=200kN, B15, CI d=6', () => {
    // Sách tính: phi_f = 0.75 * (500-300)*100 / (300*560) = 0.0893
    // Mb = 2 * (1 + 0.0893) * 0.9 * 0.75 * 300 * 560^2 * 1e-6 = 138.3 kNm
    // s_max = 518 mm, s_ct = 200 mm => Chọn s = 125 mm
    const result = designShearStirrups({
      Q: 200,
      b: 300,
      h: 600,
      a: 40,
      bfPrime: 500,
      hfPrime: 100,
      Rb: 8.5,
      Rbt: 0.75,
      gammaB: 0.9,
      stirrupD: 6,
      stirrupLegs: 2,
      Rsw: 175,
    });

    expect(result.phiF).toBeCloseTo(0.0893, 2);
    expect(result.Mb).toBeCloseTo(138.3, 0);
    // Sách làm tròn s_max = 518 mm (tính chính xác 518.8 mm, sai số < 0.2%)
    expect(Math.abs(result.sMax - 518) / 518).toBeLessThan(0.01);
    expect(result.suggestedS).toBe(125);
  });
});
