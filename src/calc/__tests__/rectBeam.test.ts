import { describe, it, expect } from 'vitest';
import { designRectBeam, checkRectBeamCapacity } from '../rectBeam';

describe('Tính toán cấu kiện chịu uốn tiết diện chữ nhật (Võ Bá Tầm - Tập 1)', () => {
  it('Bài tập 4.1 (T1 tr.70): b=300mm, M=200kNm, B15 (gammaB=0.9), Thép AII (Rs=280MPa)', () => {
    // Sách tính: h0 = 440mm, h = 500mm, alpha_R = 0.449, xi_R = 0.681
    // Kiểm tra tính toán kích thước chiều cao dầm tối thiểu theo alpha_R:
    const RbEff = 8.5 * 0.9;
    const h0_min = Math.sqrt((200 * 1e6) / (0.449 * RbEff * 300));
    expect(h0_min).toBeCloseTo(440.4, 0); // Sách lấy h0 = 440mm, h = 500mm

    const result = designRectBeam({
      M: 200,
      b: 300,
      h: 500,
      a: 60,
      Rb: 8.5,
      gammaB: 0.9,
      Rs: 280,
    });

    expect(result.h0).toBe(440);
    expect(result.alphaR).toBeCloseTo(0.449, 3);
    expect(result.xiR).toBeCloseTo(0.681, 3);
    // alpha_m = 200e6 / (7.65 * 300 * 440^2) = 0.450 (xấp xỉ alpha_R)
    expect(result.alphaM).toBeCloseTo(0.45, 1);
  });

  it('Bài tập 4.2 (T1 tr.71): b=200mm, h=300mm, a=40mm, h0=260mm, B15, AII -> [M]_max & As_max', () => {
    // Sách tính: [M]_max = alpha_R * RbEff * b * h0^2 = 0.449 * 7.65 * 200 * 260^2 * 1e-6 = 46.44 kNm
    // xi_R = 0.681, mu_max = 1.86%, As_max = 970 mm2
    const RbEff = 8.5 * 0.9;
    const M_max_expected = 0.449 * RbEff * 200 * Math.pow(260, 2) * 1e-6;
    expect(M_max_expected).toBeCloseTo(46.44, 1);

    const result = designRectBeam({
      M: 46.44,
      b: 200,
      h: 300,
      a: 40,
      Rb: 8.5,
      gammaB: 0.9,
      Rs: 280,
    });

    expect(result.isDoublyReinforced).toBe(false);
    expect(result.alphaM).toBeCloseTo(0.449, 2);
    expect(result.muMax).toBeCloseTo(1.86, 1);
    // Sách tính As = 970 mm2
    expect(result.As).toBeGreaterThanOrEqual(960);
    expect(result.As).toBeLessThanOrEqual(980);
  });

  it('Bài tập 4.3 (T1 tr.71): b=300mm, h=500mm, M=190kNm, a=60mm, h0=440mm, B15, AII', () => {
    // Sách tính: alpha_m = 0.428, xi = 0.62, As = 2234 mm2
    const result = designRectBeam({
      M: 190,
      b: 300,
      h: 500,
      a: 60,
      Rb: 8.5,
      gammaB: 0.9,
      Rs: 280,
    });

    expect(result.isDoublyReinforced).toBe(false);
    expect(result.alphaM).toBeCloseTo(0.428, 2);
    expect(result.xi).toBeCloseTo(0.62, 2);
    // Sách ra As = 2234 mm2 (sai số < 1%)
    expect(Math.abs(result.As - 2234) / 2234).toBeLessThan(0.01);
  });

  it('Bài tập 4.4 (T1 tr.72): Kiểm tra khả năng chịu lực dầm b=300, h=500, h0=440, As=2454.5 mm2 (5 phi 25)', () => {
    // Sách tính: x = (280 * 2454.5) / (7.65 * 300) = 299.4 mm
    // xi = 299.4 / 440 = 0.6805 ~= xi_R = 0.681
    // Mu = 7.65 * 300 * 299.4 * (440 - 0.5 * 299.4) * 1e-6 = 200.2 kNm > M = 190 kNm
    const capCheck = checkRectBeamCapacity({
      b: 300,
      h: 500,
      a: 60,
      As: 2454.5,
      Rb: 8.5,
      gammaB: 0.9,
      Rs: 280,
    });

    expect(capCheck.x).toBeCloseTo(299.4, 0);
    expect(capCheck.xi).toBeCloseTo(0.681, 2);
    // Sách tính Mu = 200.2 kNm (sai số < 1%)
    expect(Math.abs(capCheck.Mu - 200.2) / 200.2).toBeLessThan(0.01);
    expect(capCheck.Mu).toBeGreaterThan(190);
  });
});
