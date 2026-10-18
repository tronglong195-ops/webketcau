/**
 * retainingWall.ts
 * Tính toán tường chắn đất bê tông cốt thép (Võ Bá Tầm - Tập 3 Chương 3)
 */

import { ConcreteGrade, RebarGrade, getConcreteProps, getRebarProps } from './materials';

export interface RetainingWallInput {
  concrete: string | ConcreteGrade;
  rebar: string | RebarGrade;
  H_m: number;        // Chiều cao tổng thể tường H (m)
  B_m: number;        // Bề rộng bản đáy B (m)
  b_stem_top_m: number; // Chiều dày đỉnh tường (m)
  b_stem_bot_m: number; // Chiều dày chân tường (m)
  h_base_m: number;   // Chiều dày bản đáy (m)
  b_toe_m: number;    // Chiều dài mũi tường (m)
  gamma_soil: number; // Trọng lượng riêng của đất đắp (kN/m3)
  phi_deg: number;    // Góc nội ma sát của đất (độ)
  q_surcharge: number;// Hoạt tải trên mặt đất q (kN/m2)
  mu_friction: number;// Hệ số ma sát đáy móng với đất nền (thường 0.4 - 0.5)
}

export interface RetainingWallResult {
  Ka: number;             // Hệ số áp lực đất chủ động
  Ea_soil_kN: number;     // Hợp lực áp lực đất (kN/m dài)
  Ea_surch_kN: number;    // Hợp lực do hoạt tải (kN/m)
  Ea_total_kN: number;    // Tổng áp lực ngang Ea (kN/m)
  M_overturning_kNm: number; // Mômen gây lật đối với mũi tường
  M_resisting_kNm: number;   // Mômen chống lật
  K_overturning: number;  // Hệ số an toàn chống lật
  K_sliding: number;      // Hệ số an toàn chống trượt
  isOverturningSafe: boolean;
  isSlidingSafe: boolean;
  M_stem_bot_kNm: number; // Mômen ngàm tại chân bản thẳng đứng
  As_stem_cm2: number;    // Cốt thép chịu lực bản đứng (cm2/m)
}

export function calcRetainingWall(input: RetainingWallInput): RetainingWallResult {
  const {
    concrete,
    rebar,
    H_m,
    B_m,
    b_stem_bot_m,
    h_base_m,
    gamma_soil,
    phi_deg,
    q_surcharge,
    mu_friction
  } = input;

  const reb = getRebarProps(rebar);

  // 1. Hệ số áp lực đất chủ động Rankine:
  // Ka = tan^2(45 - phi / 2)
  const phi_rad = (phi_deg * Math.PI) / 180;
  const Ka = Number(Math.pow(Math.tan(Math.PI / 4 - phi_rad / 2), 2).toFixed(3));

  // 2. Áp lực đất tác dụng lên lưng tường:
  // Ea_soil = 0.5 * gamma * H^2 * Ka
  const Ea_soil = 0.5 * gamma_soil * Math.pow(H_m, 2) * Ka;
  // Ea_surch = q * H * Ka
  const Ea_surch = q_surcharge * H_m * Ka;
  const Ea_total = Ea_soil + Ea_surch;

  // Mômen lật đối với mũi móng O:
  // Cánh tay đòn Ea_soil là H/3, của Ea_surch là H/2
  const Mo = Ea_soil * (H_m / 3) + Ea_surch * (H_m / 2);

  // 3. Trọng lượng các bộ phận và mômen chống lật:
  // Bê tông gamma_c = 25 kN/m3
  const gamma_c = 25;
  const stem_h = H_m - h_base_m;

  // W1: Bản đứng (xấp xỉ chữ nhật dày b_stem_bot)
  const W_stem = b_stem_bot_m * stem_h * gamma_c;
  // W2: Bản đáy
  const W_base = B_m * h_base_m * gamma_c;
  // W3: Khối đất đắp trên bản gót (heel):
  const b_heel = B_m - input.b_toe_m - b_stem_bot_m;
  const W_soil = Math.max(0, b_heel * stem_h * gamma_soil);

  const W_total = W_stem + W_base + W_soil;

  // Cánh tay đòn trọng lực lấy đối với mũi O:
  // stem: xấp xỉ b_toe + b_stem_bot / 2
  const x_stem = input.b_toe_m + b_stem_bot_m / 2;
  const x_base = B_m / 2;
  const x_soil = input.b_toe_m + b_stem_bot_m + b_heel / 2;

  const Mr = W_stem * x_stem + W_base * x_base + W_soil * x_soil;

  // 4. Hệ số an toàn chống lật và trượt:
  const K_overturning = Number((Mr / Mo).toFixed(2));
  const isOverturningSafe = K_overturning >= 1.5;

  // Lực cản trượt T = mu * W_total
  const T_resisting = mu_friction * W_total;
  const K_sliding = Number((T_resisting / Ea_total).toFixed(2));
  const isSlidingSafe = K_sliding >= 1.3;

  // 5. Tính toán mômen ngàm tại chân bản đứng (để tính thép As):
  // H_stem = H - h_base
  const Ea_stem_soil = 0.5 * gamma_soil * Math.pow(stem_h, 2) * Ka;
  const Ea_stem_surch = q_surcharge * stem_h * Ka;
  const M_stem_bot = Ea_stem_soil * (stem_h / 3) + Ea_stem_surch * (stem_h / 2);

  // Tính cốt thép chân tường (cho 1 mét dài b = 1000mm):
  const h0_stem = b_stem_bot_m * 1000 - 40; // mm
  const As_stem_m2 = (M_stem_bot * 1000) / (reb.Rs * 1e6 * 0.9 * (h0_stem / 1000));
  const As_stem_cm2 = Number((As_stem_m2 * 10000).toFixed(2));

  return {
    Ka,
    Ea_soil_kN: Number(Ea_soil.toFixed(1)),
    Ea_surch_kN: Number(Ea_surch.toFixed(1)),
    Ea_total_kN: Number(Ea_total.toFixed(1)),
    M_overturning_kNm: Number(Mo.toFixed(1)),
    M_resisting_kNm: Number(Mr.toFixed(1)),
    K_overturning,
    K_sliding,
    isOverturningSafe,
    isSlidingSafe,
    M_stem_bot_kNm: Number(M_stem_bot.toFixed(1)),
    As_stem_cm2
  };
}
