/**
 * footingDesign.ts
 * Tính toán móng đơn bê tông cốt thép (Võ Bá Tầm - Tập 2 Chương 3)
 */

import { ConcreteGrade, RebarGrade, getConcreteProps, getRebarProps } from './materials';

export interface FootingInput {
  concrete: string | ConcreteGrade;
  rebar: string | RebarGrade;
  bColMm: number;    // Bề rộng cột b_c (mm)
  hColMm: number;    // Chiều dài cột h_c (mm)
  bFootingM: number; // Bề rộng móng B (m)
  lFootingM: number; // Chiều dài móng L (m)
  hFootingMm: number;// Chiều cao móng H (mm)
  aMm: number;       // Lớp bảo vệ (mm)
  N_kN: number;      // Lực dọc tính toán chân cột N (kN)
  M_kNm: number;     // Mômen uốn tính toán M (kNm)
  gamma_soil: number;// Trọng lượng riêng trung bình của đất và móng (kN/m3) ~ 20 kN/m3
  depthM: number;    // Chiều sâu chôn móng h_m (m)
}

export interface FootingResult {
  p_avg_kPa: number;
  p_max_kPa: number;
  p_min_kPa: number;
  isEccentric: boolean;
  e0_m: number;
  punchingForce_kN: number;
  punchingCapacity_kN: number;
  isPunchingSafe: boolean;
  As_x_cm2: number;
  As_y_cm2: number;
  notes: string[];
}

export function calcIsolatedFooting(input: FootingInput): FootingResult {
  const {
    concrete,
    rebar,
    bColMm,
    hColMm,
    bFootingM,
    lFootingM,
    hFootingMm,
    aMm,
    N_kN,
    M_kNm,
    gamma_soil,
    depthM
  } = input;

  const conc = getConcreteProps(concrete);
  const reb = getRebarProps(rebar);

  // 1. Áp lực tiếp xúc đáy móng
  const A_footing = bFootingM * lFootingM; // m2
  const W_footing = (bFootingM * Math.pow(lFootingM, 2)) / 6; // m3
  const G_footing = gamma_soil * A_footing * depthM; // Trọng lượng đất + móng (kN)

  const N_total = N_kN + G_footing;
  const p_avg = N_total / A_footing; // kPa (kN/m2)
  const delta_p = M_kNm / W_footing;
  const p_max = Number((p_avg + delta_p).toFixed(1));
  const p_min = Number((p_avg - delta_p).toFixed(1));

  const e0 = N_kN > 0 ? M_kNm / N_kN : 0;

  // 2. Kiểm tra đâm thủng (chọc thủng) chân cột:
  // Tháp đâm thủng góc 45 độ: h0 = H - a
  const h0 = (hFootingMm - aMm) / 1000; // m
  // Đáy trên: hCol, bCol. Đáy dưới: hCol + 2*h0, bCol + 2*h0
  const b_c_m = bColMm / 1000;
  const h_c_m = hColMm / 1000;

  // Diện tích đáy tháp đâm thủng
  const A_punch = (h_c_m + 2 * h0) * (b_c_m + 2 * h0);
  // Lực đâm thủng tính toán: P_dt = N - p_avg * A_punch
  const punchingForce_kN = Math.max(0, Number((N_kN - p_avg * A_punch).toFixed(1)));

  // Khả năng chống đâm thủng của bê tông:
  // Theo TCXDVN 356:2005: P_ct = 0.75 * Rbt * b_tb * h0
  // b_tb = chu vi trung bình tháp đâm thủng = 2 * (h_c + b_c + 2*h0)
  const u_tb = 2 * (h_c_m + b_c_m + 2 * h0); // m
  const Rbt_kPa = conc.Rbt * 1000; // kN/m2
  const punchingCapacity_kN = Number((0.75 * Rbt_kPa * u_tb * h0).toFixed(1));
  const isPunchingSafe = punchingForce_kN <= punchingCapacity_kN;

  // 3. Tính toán cốt thép theo 2 phương đáy móng
  // Cắt công xôn tại mép cột:
  // Phương L (dọc): cánh tay đòn c = (L - h_c) / 2
  const c_L = (lFootingM - h_c_m) / 2; // m
  // Áp lực thực tế không kể tải trọng đất móng p_tt
  const p_tt_avg = N_kN / A_footing;
  const M_I_kNm = (p_tt_avg * bFootingM * c_L * c_L) / 2;
  const As_x_m2 = (M_I_kNm * 1000) / (reb.Rs * 1e6 * 0.9 * h0);
  const As_x_cm2 = Number((As_x_m2 * 10000).toFixed(2));

  // Phương B (ngang): cánh tay đòn c = (B - b_c) / 2
  const c_B = (bFootingM - b_c_m) / 2; // m
  const M_II_kNm = (p_tt_avg * lFootingM * c_B * c_B) / 2;
  const As_y_m2 = (M_II_kNm * 1000) / (reb.Rs * 1e6 * 0.9 * h0);
  const As_y_cm2 = Number((As_y_m2 * 10000).toFixed(2));

  return {
    p_avg_kPa: Number(p_avg.toFixed(1)),
    p_max_kPa: p_max,
    p_min_kPa: p_min,
    isEccentric: M_kNm > 0,
    e0_m: Number(e0.toFixed(3)),
    punchingForce_kN,
    punchingCapacity_kN,
    isPunchingSafe,
    As_x_cm2,
    As_y_cm2,
    notes: [
      `Áp lực đáy móng: p_max = ${p_max} kPa, p_min = ${p_min} kPa`,
      `Lực đâm thủng P_dt = ${punchingForce_kN} kN <= Khả năng chống đâm P_ct = ${punchingCapacity_kN} kN (${isPunchingSafe ? 'ĐẠT' : 'KHÔNG ĐẠT'})`,
      `Cốt thép phương L: As_x = ${As_x_cm2} cm2`,
      `Cốt thép phương B: As_y = ${As_y_cm2} cm2`
    ]
  };
}
