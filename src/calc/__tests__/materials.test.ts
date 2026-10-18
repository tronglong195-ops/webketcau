import { describe, it, expect } from 'vitest';
import { getLimitParameters, getOmega, getXiR, getAlphaR } from '../materials';

describe('Đặc trưng vật liệu bê tông và cốt thép (TCXDVN 356:2005)', () => {
  it('Tính đúng omega, xi_R, alpha_R cho bê tông B15 và cốt thép AII theo Bài tập 4.1 (T1 tr.70)', () => {
    // B15: Rb = 8.5 MPa, gammaB = 0.9 => RbEff = 7.65 MPa
    // AII: Rs = 280 MPa
    const { RbEff, omega, xiR, alphaR } = getLimitParameters(8.5, 0.9, 280);

    expect(RbEff).toBeCloseTo(7.65, 2);
    // Sách Võ Bá Tầm ghi: omega = 0.789
    expect(omega).toBeCloseTo(0.789, 2);
    // Sách ghi: xi_R = 0.681
    expect(xiR).toBeCloseTo(0.681, 2);
    // Sách ghi: alpha_R = 0.449
    expect(alphaR).toBeCloseTo(0.449, 2);
  });
});
