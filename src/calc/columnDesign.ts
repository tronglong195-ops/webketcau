/**
 * columnDesign.ts
 * Tính toán cấu kiện chịu nén theo TCXDVN 356:2005 (Võ Bá Tầm - Tập 1 Chương 5)
 */

import { ConcreteGrade, RebarGrade, getConcreteProps, getRebarProps, getLimitCompressionRatio } from './materials';

export interface EccentricColumnInput {
  concrete: string | ConcreteGrade;
  rebar: string | RebarGrade;
  bMm: number;        // Bề rộng tiết diện (mm)
  hMm: number;        // Chiều cao tiết diện (mm)
  cMm: number;        // Lớp bê tông bảo vệ a = a' (mm)
  l0Mm: number;       // Chiều dài tính toán uốn dọc (mm)
  NMm: number;        // Lực nén tính toán N (kN)
  MMm: number;        // Mômen uốn tính toán M (kNm)
  symmetric: boolean; // Bố trí cốt thép đối xứng (As = As')
}

export interface EccentricColumnResult {
  N_kN: number;
  M_kNm: number;
  e0_mm: number;
  ea_mm: number;
  e_mm: number;
  eta: number;        // Hệ số uốn dọc
  e_calc_mm: number;  // e = eta * e0 + ea
  x_mm: number;       // Chiều cao vùng nén
  xi: number;
  xi_R: number;
  isLargeEccentric: boolean; // Lệch tâm lớn (true) hay lệch tâm bé (false)
  As_mm2: number;     // Diện tích cốt thép chịu kéo/nén ít As
  As_prime_mm2: number; // Diện tích cốt thép chịu nén As'
  totalAs_mm2: number;
  mu_pct: number;     // Hàm lượng cốt thép (%)
  formulaNotes: string[];
}

/**
 * Tính toán nén đúng tâm theo TCXDVN 356:2005 mục 6.2.2.5
 * N <= phi * (Rb * A + Rsc * Ast)
 */
export function calcAxialColumn(
  concrete: string | ConcreteGrade,
  rebar: string | RebarGrade,
  bMm: number,
  hMm: number,
  l0Mm: number,
  N_kN: number,
  phi: number = 0.9
): {
  Ast_required_mm2: number;
  mu_pct: number;
  N_capacity_kN: number;
  isSafe: boolean;
} {
  const conc = getConcreteProps(concrete);
  const reb = getRebarProps(rebar);
  const A = bMm * hMm;

  // N / phi <= Rb * A + Rsc * Ast
  // => Ast = (N*1000 / phi - Rb * A) / Rsc
  const Rb_MPa = conc.Rb;
  const Rsc_MPa = reb.Rsc;

  const Ast_calc = (N_kN * 1000 / phi - Rb_MPa * A) / Rsc_MPa;
  const Ast_required_mm2 = Math.max(0, Math.round(Ast_calc));
  const mu_pct = Number(((Ast_required_mm2 / A) * 100).toFixed(2));
  const N_capacity_kN = Number(((phi * (Rb_MPa * A + Rsc_MPa * Ast_required_mm2)) / 1000).toFixed(1));

  return {
    Ast_required_mm2,
    mu_pct,
    N_capacity_kN,
    isSafe: N_capacity_kN >= N_kN
  };
}

/**
 * Tính toán cấu kiện chịu nén lệch tâm phẳng theo TCXDVN 356:2005
 * Áp dụng phương pháp kinh điển (trang 190-230 Tập 1)
 */
export function calcEccentricColumn(input: EccentricColumnInput): EccentricColumnResult {
  const { concrete, rebar, bMm, hMm, cMm, l0Mm, NMm, MMm, symmetric } = input;
  const conc = getConcreteProps(concrete);
  const reb = getRebarProps(rebar);
  const xi_R = getLimitCompressionRatio(concrete, rebar);

  const a = cMm;
  const a_prime = cMm;
  const h0 = hMm - a;
  const N_N = NMm * 1000;
  const M_Nmm = MMm * 1e6;

  // 1. Độ lệch tâm tĩnh học e0
  const e0 = NMm > 0 ? M_Nmm / N_N : 0;

  // 2. Độ lệch tâm ngẫu nhiên ea (TCXDVN 356:2005 mục 6.2.2.1)
  // ea >= max(h/30, l0/600, 10mm)
  const ea = Math.max(hMm / 30, l0Mm / 600, 10);

  // 3. Hệ số uốn dọc eta
  // Giả thiết gần đúng theo công thức thực hành TCXDVN 356:2005
  const lambda = l0Mm / (0.288 * hMm); // Độ mảnh l0 / i với i = h / sqrt(12)
  let eta = 1.0;
  if (lambda > 14) {
    // Tải trọng tới hạn uốn Euler N_cr = pi^2 * D / l0^2
    // Đơn giản hóa kỹ thuật: eta = 1 / (1 - N / Ncr)
    const Ib = (bMm * Math.pow(hMm, 3)) / 12;
    const Eb = conc.Eb;
    const D = 0.2 * Eb * Ib; // Độ cứng danh định
    const Ncr = (Math.PI * Math.PI * D) / (l0Mm * l0Mm);
    if (N_N < Ncr) {
      eta = Math.max(1.0, Number((1 / (1 - N_N / Ncr)).toFixed(3)));
      if (eta > 2.0) eta = 2.0; // Giới hạn thực hành
    } else {
      eta = 2.0;
    }
  }

  const e = eta * e0 + ea;
  // Khoảng cách từ điểm đặt lực đến trọng tâm cốt thép As:
  // e_s = e + h0/2 - a/2 (hoặc e + h/2 - a)
  const es = e + hMm / 2 - a;

  // 4. Kiểm tra điều kiện lệch tâm lớn hay lệch tâm bé:
  // Giới hạn x = xi_R * h0
  // Với bài toán thiết kế đối xứng (As = As'):
  // Phân giới lệch tâm lớn khi xi <= xi_R (tức là khi N <= alpha_R * Rb * b * h0...)
  const Rb = conc.Rb;
  const Rs = reb.Rs;
  const Rsc = reb.Rsc;

  // Chiều cao vùng nén x lý thuyết với As = As':
  // N = Rb * b * x  =>  x = N / (Rb * b)
  let x = N_N / (Rb * bMm);
  const xi = x / h0;

  let isLargeEccentric = xi <= xi_R;
  let As = 0;
  let As_prime = 0;
  const formulaNotes: string[] = [];

  if (isLargeEccentric) {
    formulaNotes.push('Trường hợp lệch tâm lớn: xi <= xi_R (' + xi.toFixed(3) + ' <= ' + xi_R.toFixed(3) + ')');
    if (x < 2 * a_prime) {
      // Trường hợp x < 2a': lấy x = 2a' hoặc tính toán mômen lấy đối với trọng tâm As'
      x = 2 * a_prime;
      formulaNotes.push('x < 2a\': vùng nén rất nhỏ, cốt thép đặt theo cấu tạo hoặc lấy đối với As\'');
    }

    if (symmetric) {
      // Thiết kế đối xứng As = As':
      // Lấy mômen đối với trọng tâm As':
      // N * es_prime = Rb * b * x * (h0 - x/2) + ...
      // Với x = N / (Rb * b):
      const es_prime = es - (h0 - a_prime);
      // As = As' = (N * es - Rb * b * x * (h0 - 0.5 * x)) / (Rsc * (h0 - a_prime))
      const numerator = N_N * es - Rb * bMm * x * (h0 - 0.5 * x);
      const denominator = Rs * (h0 - a_prime);
      As = Math.max(0, numerator / denominator);
      As_prime = As;
    } else {
      // Không đối xứng: chọn As' theo cấu tạo hoặc giả thiết x = xi_R * h0
      As_prime = Math.round((0.002 * bMm * hMm)); // Min cấu tạo 0.2%
      const numerator = N_N * es - Rb * bMm * x * (h0 - 0.5 * x) - Rsc * As_prime * (h0 - a_prime);
      As = Math.max(0, numerator / (Rs * (h0 - a_prime)));
    }
  } else {
    // Trường hợp lệch tâm bé: xi > xi_R
    formulaNotes.push('Trường hợp lệch tâm bé: xi > xi_R (' + xi.toFixed(3) + ' > ' + xi_R.toFixed(3) + ')');
    // Theo công thức kinh điển Võ Bá Tầm (T1 tr.205):
    // Sử dụng hệ số hiệu chỉnh xi_prime hoặc giải hệ phương trình giới hạn
    const alpha_R = xi_R * (1 - 0.5 * xi_R);
    if (symmetric) {
      // Công thức gần đúng thực hành thiết kế đối xứng lệch tâm bé:
      // As = As' = [N * es - alpha_R * Rb * b * h0^2] / [Rsc * (h0 - a_prime) * (1 - xi_R / (1 - 0.5*xi_R))]
      // Hệ số lệch tâm bé phi_e hoặc giải pháp tuyến tính:
      const M_equiv = N_N * es;
      const As_approx = (M_equiv - alpha_R * Rb * bMm * h0 * h0) / (Rsc * (h0 - a_prime));
      As = Math.max(0.004 * bMm * hMm, As_approx * 0.8);
      As_prime = As;
    } else {
      As_prime = Math.round(0.004 * bMm * hMm);
      As = As_prime;
    }
  }

  // Khống chế hàm lượng cốt thép tối thiểu theo TCXDVN 356:2005 mục 5.2.2 (mu_min = 0.4% toàn tiết diện, 0.2% mỗi phía)
  const As_min_side = Math.round(0.002 * bMm * h0);
  As = Math.max(As, As_min_side);
  As_prime = Math.max(As_prime, As_min_side);

  const As_mm2 = Math.round(As);
  const As_prime_mm2 = Math.round(As_prime);
  const totalAs_mm2 = As_mm2 + As_prime_mm2;
  const mu_pct = Number(((totalAs_mm2 / (bMm * hMm)) * 100).toFixed(2));

  return {
    N_kN: NMm,
    M_kNm: MMm,
    e0_mm: Math.round(e0),
    ea_mm: Math.round(ea),
    e_mm: Math.round(e),
    eta,
    e_calc_mm: Math.round(e),
    x_mm: Math.round(x),
    xi: Number(xi.toFixed(3)),
    xi_R: Number(xi_R.toFixed(3)),
    isLargeEccentric,
    As_mm2,
    As_prime_mm2,
    totalAs_mm2,
    mu_pct,
    formulaNotes
  };
}
