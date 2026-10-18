/**
 * Module tính toán cấu kiện chịu uốn tiết diện chữ nhật
 * Tiêu chuẩn: TCXDVN 356:2005 (Đối chiếu TCVN 5574:2018)
 * Nguồn: Giáo trình Võ Bá Tầm - Tập 1 (Mục 4.3, tr. 61-87)
 */

import { getLimitParameters } from './materials';

export interface RectBeamDesignInput {
  M: number;       // kNm - Moment uốn tính toán
  b: number;       // mm - Chiều rộng tiết diện
  h: number;       // mm - Chiều cao tiết diện
  a: number;       // mm - Khoảng cách trọng tâm cốt kéo đến mép chịu kéo
  aPrime?: number; // mm - Khoảng cách trọng tâm cốt nén đến mép chịu nén (mặc định 35mm)
  Rb: number;      // MPa - Cường độ tính toán gốc của bê tông
  gammaB?: number; // Hệ số điều kiện làm việc bê tông (thường 0.9 hoặc 1.0)
  Rs: number;      // MPa - Cường độ tính toán chịu kéo cốt thép
  Rsc?: number;    // MPa - Cường độ tính toán chịu nén cốt thép (mặc định bằng Rs)
  muMin?: number;  // % - Hàm lượng cốt thép tối thiểu (mặc định 0.05%)
}

export interface RectBeamDesignResult {
  isDoublyReinforced: boolean;
  h0: number;          // mm
  alphaM: number;
  alphaR: number;
  xiR: number;
  xi: number;
  zeta: number;
  x: number;           // mm - Chiều cao vùng nén
  As: number;          // mm2 - Diện tích cốt kéo
  AsPrime: number;     // mm2 - Diện tích cốt nén
  mu: number;          // % - Hàm lượng cốt kéo
  muMax: number;       // % - Hàm lượng cốt kéo cực đại
  muMin: number;       // %
  isSafe: boolean;
  notes: string[];
}

export function designRectBeam(input: RectBeamDesignInput): RectBeamDesignResult {
  const gammaB = input.gammaB ?? 0.9;
  const Rsc = input.Rsc ?? input.Rs;
  const aPrime = input.aPrime ?? 35;
  const muMin = input.muMin ?? 0.05;

  const h0 = input.h - input.a;
  const { RbEff, xiR, alphaR } = getLimitParameters(input.Rb, gammaB, input.Rs);

  // M tính bằng N.mm = M (kNm) * 1e6
  const M_Nmm = input.M * 1e6;
  const alphaM = Number((M_Nmm / (RbEff * input.b * h0 * h0)).toFixed(3));
  const muMax = Number(((xiR * RbEff / input.Rs) * 100).toFixed(2));

  const notes: string[] = [];

  if (alphaM <= alphaR) {
    // Cốt đơn
    const zeta = Number((0.5 * (1 + Math.sqrt(Math.max(0, 1 - 2 * alphaM)))).toFixed(3));
    const xi = Number((1 - Math.sqrt(Math.max(0, 1 - 2 * alphaM))).toFixed(3));
    const x = Number((xi * h0).toFixed(1));
    const As = Number(((RbEff * input.b * x) / input.Rs).toFixed(1));
    const mu = Number(((As / (input.b * h0)) * 100).toFixed(2));

    const isSafe = mu >= muMin && mu <= muMax;
    if (mu < muMin) {
      notes.push(`Hàm lượng thép mu (${mu}%) nhỏ hơn mu_min (${muMin}%). Cần bố trí theo cấu tạo.`);
    }
    if (mu > muMax) {
      notes.push(`Hàm lượng thép mu (${mu}%) vượt quá mu_max (${muMax}%).`);
    }

    return {
      isDoublyReinforced: false,
      h0,
      alphaM,
      alphaR,
      xiR,
      xi,
      zeta,
      x,
      As,
      AsPrime: 0,
      mu,
      muMax,
      muMin,
      isSafe,
      notes,
    };
  } else {
    // Cốt kép (alphaM > alphaR)
    notes.push(`alpha_m = ${alphaM} > alpha_R = ${alphaR}: Cần bố trí cốt thép kép A's.`);
    const M1 = alphaR * RbEff * input.b * h0 * h0; // N.mm
    const M2 = M_Nmm - M1;

    const AsPrime = Number((M2 / (Rsc * (h0 - aPrime))).toFixed(1));
    const As = Number(((xiR * RbEff * input.b * h0 + Rsc * AsPrime) / input.Rs).toFixed(1));
    const x = Number((xiR * h0).toFixed(1));
    const mu = Number(((As / (input.b * h0)) * 100).toFixed(2));

    return {
      isDoublyReinforced: true,
      h0,
      alphaM,
      alphaR,
      xiR,
      xi: xiR,
      zeta: 1 - 0.5 * xiR,
      x,
      As,
      AsPrime,
      mu,
      muMax,
      muMin,
      isSafe: true,
      notes,
    };
  }
}

export interface RectBeamCapacityCheckInput {
  b: number;
  h: number;
  a: number;
  aPrime?: number;
  As: number;
  AsPrime?: number;
  Rb: number;
  gammaB?: number;
  Rs: number;
  Rsc?: number;
}

export interface RectBeamCapacityCheckResult {
  h0: number;
  x: number;
  xi: number;
  xiR: number;
  Mu: number; // kNm
  isOverReinforced: boolean;
  notes: string[];
}

export function checkRectBeamCapacity(input: RectBeamCapacityCheckInput): RectBeamCapacityCheckResult {
  const gammaB = input.gammaB ?? 0.9;
  const aPrime = input.aPrime ?? 35;
  const AsPrime = input.AsPrime ?? 0;
  const Rsc = input.Rsc ?? input.Rs;
  const h0 = input.h - input.a;
  const { RbEff, xiR, alphaR } = getLimitParameters(input.Rb, gammaB, input.Rs);

  // Chiều cao vùng nén x từ phương trình cân bằng hình chiếu
  let x = (input.Rs * input.As - Rsc * AsPrime) / (RbEff * input.b);
  const notes: string[] = [];
  let isOverReinforced = false;
  let Mu_Nmm = 0;

  if (x < 2 * aPrime && AsPrime > 0) {
    notes.push(`x (${x.toFixed(1)}mm) < 2a' (${2 * aPrime}mm): Vùng nén quá nông, cốt nén không phát huy hết cường độ.`);
    Mu_Nmm = input.Rs * input.As * (h0 - aPrime);
  } else if (x <= xiR * h0) {
    // Trường hợp phá hoại dẻo bình thường
    Mu_Nmm = RbEff * input.b * x * (h0 - 0.5 * x) + Rsc * AsPrime * (h0 - aPrime);
  } else {
    // Phá hoại giòn (quá nhiều cốt thép chịu kéo)
    isOverReinforced = true;
    notes.push(`x (${x.toFixed(1)}mm) > xi_R * h0 (${(xiR * h0).toFixed(1)}mm): Phá hoại giòn, lấy x = xi_R * h0.`);
    x = xiR * h0;
    Mu_Nmm = alphaR * RbEff * input.b * h0 * h0 + Rsc * AsPrime * (h0 - aPrime);
  }

  const Mu = Number((Mu_Nmm * 1e-6).toFixed(2));
  const xi = Number((x / h0).toFixed(3));

  return {
    h0,
    x: Number(x.toFixed(1)),
    xi,
    xiR,
    Mu,
    isOverReinforced,
    notes,
  };
}
