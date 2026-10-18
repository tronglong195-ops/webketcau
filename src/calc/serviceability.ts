/**
 * serviceability.ts
 * Tính toán trạng thái giới hạn thứ hai (TTGH2): Khe nứt và độ võng
 * Theo TCXDVN 356:2005 Chương 6 và 7 (Võ Bá Tầm - Tập 1 Chương 7)
 */

import { ConcreteGrade, RebarGrade, getConcreteProps, getRebarProps } from './materials';

export interface CrackCheckInput {
  concrete: string | ConcreteGrade;
  rebar: string | RebarGrade;
  bMm: number;
  hMm: number;
  aMm: number;
  AsMm2: number;
  barDiaMm: number;
  M_ser_kNm: number; // Mômen tiêu chuẩn (hoặc dài hạn) kNm
  isLongTerm: boolean; // Tác dụng dài hạn hay ngắn hạn
}

export interface CrackCheckResult {
  sigma_s_MPa: number;
  mu_pct: number;
  a_crc_mm: number;
  a_crc_limit_mm: number;
  isSafe: boolean;
  notes: string[];
}

export interface DeflectionCheckInput {
  concrete: string | ConcreteGrade;
  bMm: number;
  hMm: number;
  spanMm: number;    // Nhịp dầm l (mm)
  q_ser_kNm: number; // Tải trọng phân bố đều tiêu chuẩn (kN/m)
  AsMm2: number;
}

export interface DeflectionCheckResult {
  f_mm: number;
  f_limit_mm: number;
  ratio: string;
  isSafe: boolean;
}

/**
 * Tính toán bề rộng khe nứt thẳng góc a_crc theo TCXDVN 356:2005 mục 6.2.2.22
 * a_crc = delta * phi_l * eta * (sigma_s / Es) * 20 * (3.5 - 100*mu) * cbrt(d)
 */
export function calcCrackWidth(input: CrackCheckInput): CrackCheckResult {
  const { concrete, rebar, bMm, hMm, aMm, AsMm2, barDiaMm, M_ser_kNm, isLongTerm } = input;
  const conc = getConcreteProps(concrete);
  const reb = getRebarProps(rebar);

  const h0 = hMm - aMm;
  const Es = reb.Es; // MPa

  // 1. Cánh tay đòn nội lực z xấp xỉ 0.85 - 0.9 h0
  const z = 0.87 * h0;
  // Ứng suất trong cốt thép chịu kéo sigma_s = M_ser / (As * z)
  const M_Nmm = M_ser_kNm * 1e6;
  const sigma_s = AsMm2 > 0 ? M_Nmm / (AsMm2 * z) : 0;

  // 2. Hệ số hàm lượng cốt thép mu = As / (b * h0)
  const mu = Math.min(0.02, Math.max(0.002, AsMm2 / (bMm * h0)));
  const mu_pct = Number((mu * 100).toFixed(2));

  // 3. Hệ số xét đến loại cốt thép eta:
  // Thép thanh có gờ (CB300, CB400, AII, AIII): eta = 1.0
  // Thép thanh tròn trơn (CI, AI): eta = 1.4
  const eta = (reb.grade.includes('I') && !reb.grade.includes('II') && !reb.grade.includes('III')) ? 1.4 : 1.0;

  // 4. Hệ số thời hạn tác dụng của tải trọng phi_l:
  // Tải ngắn hạn: phi_l = 1.0; Dài hạn: phi_l = 1.2
  const phi_l = isLongTerm ? 1.2 : 1.0;

  // 5. Hệ số cấu kiện chịu uốn delta = 1.0
  const delta = 1.0;

  // 6. Bề rộng khe nứt cơ bản:
  // acrc = delta * phi_l * eta * (sigma_s / Es) * 20 * (3.5 - 100 * mu) * d^(1/3)
  // Với d tính bằng mm
  const term1 = delta * phi_l * eta * (sigma_s / Es);
  const term2 = 20 * Math.max(0.5, 3.5 - 100 * mu);
  const term3 = Math.cbrt(barDiaMm);

  const a_crc = Number((term1 * term2 * term3).toFixed(3));
  // Giới hạn theo TCXDVN 356:2005: 0.3 mm (dài hạn), 0.4 mm (ngắn hạn) trong điều kiện bình thường
  const a_crc_limit = isLongTerm ? 0.3 : 0.4;

  return {
    sigma_s_MPa: Number(sigma_s.toFixed(1)),
    mu_pct,
    a_crc_mm: a_crc,
    a_crc_limit_mm: a_crc_limit,
    isSafe: a_crc <= a_crc_limit,
    notes: [
      `Ứng suất kéo cốt thép: sigma_s = ${sigma_s.toFixed(1)} MPa`,
      `Hệ số xét loại cốt thép: eta = ${eta}`,
      `Hệ số thời hạn tải trọng: phi_l = ${phi_l}`,
      `Bề rộng giới hạn [a_crc] = ${a_crc_limit} mm`
    ]
  };
}

/**
 * Tính toán độ võng dầm đơn giản f theo TCXDVN 356:2005
 * f = (5 / 48) * (M_ser * l^2) / B
 */
export function calcBeamDeflection(input: DeflectionCheckInput): DeflectionCheckResult {
  const { concrete, bMm, hMm, spanMm, q_ser_kNm, AsMm2 } = input;
  const conc = getConcreteProps(concrete);

  // Mômen tiêu chuẩn ở giữa nhịp: M = q * l^2 / 8
  const l_m = spanMm / 1000;
  const M_ser_kNm = (q_ser_kNm * l_m * l_m) / 8;
  const M_ser_Nmm = M_ser_kNm * 1e6;

  // Độ cứng kháng uốn danh định B của dầm có vết nứt (mục 6.2.3.1):
  // Gần đúng B = 0.15 * Eb * I_b (với I_b = b*h^3 / 12)
  const Eb = conc.Eb; // MPa
  const Ib = (bMm * Math.pow(hMm, 3)) / 12; // mm4
  const B = 0.2 * Eb * Ib; // N.mm2

  // Độ võng f = (5/48) * (M * l^2) / B
  const f = (5 / 48) * (M_ser_Nmm * spanMm * spanMm) / B;
  const f_mm = Number(f.toFixed(2));

  // Giới hạn độ võng [f] = l / 250 (dầm sàn thông thường)
  const f_limit = spanMm / 250;
  const f_limit_mm = Number(f_limit.toFixed(2));

  return {
    f_mm,
    f_limit_mm,
    ratio: `1/${Math.round(spanMm / Math.max(0.1, f))}`,
    isSafe: f_mm <= f_limit_mm
  };
}
