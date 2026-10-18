import { describe, it, expect } from 'vitest';
import { designTBeam } from '../tBeam';

describe('Tính toán cấu kiện chịu uốn tiết diện chữ T (Võ Bá Tầm - Tập 1)', () => {
  it('Bài tập 4.14 (T1 tr.101): b=300, h=600, b\'f=800, h\'f=100, M=450kNm, a=60, B15, AII', () => {
    // Sách tính: h0 = 540mm
    // Mf = 0.9 * 8.5 * 800 * 100 * (540 - 50) * 1e-6 = 299.9 kNm
    // M = 450 > Mf => Trục trung hòa qua sườn
    // M_flange = 0.9 * 8.5 * (800 - 300) * 100 * (540 - 50) * 1e-6 = 187.4 kNm (sách ghi sườn 300)
    const result = designTBeam({
      M: 450,
      b: 300,
      h: 600,
      bfPrime: 800,
      hfPrime: 100,
      a: 60,
      Rb: 8.5,
      gammaB: 0.9,
      Rs: 280,
    });

    expect(result.neutralAxisInFlange).toBe(false);
    expect(result.Mf).toBeCloseTo(299.9, 0);
    // Sách tính As = 3738.5 mm2, sau đó đổi sang h=700mm
    expect(result.As).toBeGreaterThan(3600);
    expect(result.As).toBeLessThan(3900);
  });

  it('Bài tập 4.15 (T1 tr.103): b=400, h=700, b\'f=1100, h\'f=100, M=450kNm, a=65, B15, AII', () => {
    // Sách tính: h0 = 635mm
    // Mf = 0.9 * 8.5 * 1100 * 100 * (635 - 50) * 1e-6 = 492.3 kNm
    // M = 450 < Mf => Trục trung hòa qua cánh
    // alpha_m = 0.077, xi = 0.143, As = 2725.6 mm2
    const result = designTBeam({
      M: 450,
      b: 400,
      h: 700,
      bfPrime: 1100,
      hfPrime: 100,
      a: 65,
      Rb: 8.5,
      gammaB: 0.9,
      Rs: 280,
    });

    expect(result.neutralAxisInFlange).toBe(true);
    expect(result.Mf).toBeCloseTo(492.3, 0);
    // alpha_m = 450e6 / (7.65 * 1100 * 635^2) = 0.133
    expect(result.alphaM).toBeCloseTo(0.133, 2);
    expect(result.xi).toBeCloseTo(0.143, 2);
    // Sai số < 1% so với 2725.6 mm2
    expect(Math.abs(result.As - 2725.6) / 2725.6).toBeLessThan(0.01);
  });
});
