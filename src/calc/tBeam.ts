/**
 * Module tính toán cấu kiện chịu uốn tiết diện chữ T
 * Tiêu chuẩn: TCXDVN 356:2005 (Đối chiếu TCVN 5574:2018)
 * Nguồn: Giáo trình Võ Bá Tầm - Tập 1 (Mục 4.4, tr. 88-114)
 */

import { getLimitParameters } from './materials';

export interface TBeamDesignInput {
  M: number;       // kNm - Moment uốn tính toán
  b: number;       // mm - Bề rộng sườn dầm
  h: number;       // mm - Chiều cao toàn bộ tiết diện
  bfPrime: number; // mm - Bề rộng cánh chịu nén b'f
  hfPrime: number; // mm - Chiều dày cánh chịu nén h'f
  a: number;       // mm - Khoảng cách trọng tâm cốt kéo đến mép
  aPrime?: number; // mm - Khoảng cách cốt nén đến mép
  Rb: number;      // MPa - Cường độ tính toán gốc bê tông
  gammaB?: number; // Hệ số điều kiện làm việc bê tông (mặc định 0.9)
  Rs: number;      // MPa - Cường độ cốt kéo
  Rsc?: number;    // MPa - Cường độ cốt nén
}

export interface TBeamDesignResult {
  neutralAxisInFlange: boolean;
  h0: number;          // mm
  Mf: number;          // kNm - Khả năng chịu moment của toàn bộ cánh
  alphaM: number;
  alphaR: number;
  xi: number;
  xiR: number;
  x: number;           // mm
  As: number;          // mm2 - Cốt thép kéo
  AsPrime: number;     // mm2 - Cốt thép nén
  mu: number;          // % - Hàm lượng cốt thép sườn
  muMax: number;       // %
  isSafe: boolean;
  notes: string[];
}

export function designTBeam(input: TBeamDesignInput): TBeamDesignResult {
  const gammaB = input.gammaB ?? 0.9;
  const aPrime = input.aPrime ?? 35;
  const Rsc = input.Rsc ?? input.Rs;
  const h0 = input.h - input.a;
  const { RbEff, xiR, alphaR } = getLimitParameters(input.Rb, gammaB, input.Rs);
  const muMax = Number(((xiR * RbEff / input.Rs) * 100).toFixed(2));

  // 1. Tính moment giới hạn của cánh: Mf = gamma_b * Rb * b'f * h'f * (h0 - 0.5 * h'f)
  const Mf_Nmm = RbEff * input.bfPrime * input.hfPrime * (h0 - 0.5 * input.hfPrime);
  const Mf = Number((Mf_Nmm * 1e-6).toFixed(2));
  const M_Nmm = input.M * 1e6;

  const notes: string[] = [];

  if (input.M <= Mf) {
    // Trường hợp 1: Trục trung hòa qua cánh (tính như tiết diện chữ nhật b'f x h)
    notes.push(`M (${input.M} kNm) <= Mf (${Mf} kNm): Trục trung hòa qua cánh. Tính như dầm chữ nhật rộng b'f.`);
    const alphaM = Number((M_Nmm / (RbEff * input.bfPrime * h0 * h0)).toFixed(3));
    const xi = Number((1 - Math.sqrt(Math.max(0, 1 - 2 * alphaM))).toFixed(3));
    const x = Number((xi * h0).toFixed(1));
    const As = Number(((RbEff * input.bfPrime * x) / input.Rs).toFixed(1));
    const mu = Number(((As / (input.b * h0)) * 100).toFixed(2));

    return {
      neutralAxisInFlange: true,
      h0,
      Mf,
      alphaM,
      alphaR,
      xi,
      xiR,
      x,
      As,
      AsPrime: 0,
      mu,
      muMax,
      isSafe: mu <= muMax,
      notes,
    };
  } else {
    // Trường hợp 2: Trục trung hòa qua sườn (M > Mf)
    notes.push(`M (${input.M} kNm) > Mf (${Mf} kNm): Trục trung hòa qua sườn. Phân tách phần cánh nhô và sườn dầm.`);
    const M_flange_Nmm = RbEff * (input.bfPrime - input.b) * input.hfPrime * (h0 - 0.5 * input.hfPrime);
    const Mw_Nmm = M_Nmm - M_flange_Nmm;

    const alphaM = Number((Mw_Nmm / (RbEff * input.b * h0 * h0)).toFixed(3));

    if (alphaM <= alphaR) {
      // Cốt đơn
      const xi = Number((1 - Math.sqrt(Math.max(0, 1 - 2 * alphaM))).toFixed(3));
      const x = Number((xi * h0).toFixed(1));
      const As = Number((((xi * RbEff * input.b * h0) + RbEff * (input.bfPrime - input.b) * input.hfPrime) / input.Rs).toFixed(1));
      const mu = Number(((As / (input.b * h0)) * 100).toFixed(2));

      return {
        neutralAxisInFlange: false,
        h0,
        Mf,
        alphaM,
        alphaR,
        xi,
        xiR,
        x,
        As,
        AsPrime: 0,
        mu,
        muMax,
        isSafe: mu <= muMax,
        notes,
      };
    } else {
      // Cốt kép
      notes.push(`alpha_m,w (${alphaM}) > alpha_R (${alphaR}): Cần bố trí thêm cốt nén A's.`);
      const Mw1 = alphaR * RbEff * input.b * h0 * h0;
      const Mw2 = Mw_Nmm - Mw1;
      const AsPrime = Number((Mw2 / (Rsc * (h0 - aPrime))).toFixed(1));
      const As = Number((((xiR * RbEff * input.b * h0) + RbEff * (input.bfPrime - input.b) * input.hfPrime + Rsc * AsPrime) / input.Rs).toFixed(1));
      const x = Number((xiR * h0).toFixed(1));
      const mu = Number(((As / (input.b * h0)) * 100).toFixed(2));

      return {
        neutralAxisInFlange: false,
        h0,
        Mf,
        alphaM,
        alphaR,
        xi: xiR,
        xiR,
        x,
        As,
        AsPrime,
        mu,
        muMax,
        isSafe: true,
        notes,
      };
    }
  }
}
