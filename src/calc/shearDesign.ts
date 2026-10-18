/**
 * Module tính toán cấu kiện chịu uốn trên tiết diện nghiêng theo lực cắt
 * Tiêu chuẩn: TCXDVN 356:2005 (Đối chiếu TCVN 5574:2018)
 * Nguồn: Giáo trình Võ Bá Tầm - Tập 1 (Mục 4.5 & 4.6, tr. 115-154)
 */

export interface ShearDesignInput {
  Q: number;         // kN - Lực cắt tính toán lớn nhất
  b: number;         // mm - Bề rộng sườn
  h: number;         // mm - Chiều cao dầm
  a: number;         // mm - Lớp đệm trọng tâm cốt kéo
  bfPrime?: number;  // mm - Bề rộng cánh (nếu có dầm T)
  hfPrime?: number;  // mm - Chiều dày cánh (nếu có dầm T)
  Rb: number;        // MPa - Cường độ nén gốc bê tông
  Rbt: number;       // MPa - Cường độ kéo gốc bê tông
  gammaB?: number;   // Hệ số điều kiện làm việc bê tông (mặc định 0.9)
  Eb?: number;       // MPa - Môđun đàn hồi bê tông
  // Cốt đai
  stirrupD: number;  // mm - Đường kính cốt đai (ví dụ 6 hoặc 8)
  stirrupLegs?: number; // Số nhánh cốt đai (mặc định 2)
  Rsw: number;       // MPa - Cường độ tính toán cốt đai (ví dụ 175 cho CI)
  Es?: number;       // MPa - Môđun đàn hồi cốt thép
}

export interface ShearDesignResult {
  h0: number;        // mm
  phiB1: number;
  phiW1: number;
  Qmax_concrete: number; // kN - Khả năng chịu nén trên dải nghiêng
  isConcreteCrushSafe: boolean;
  phiF: number;
  Mb: number;        // kNm - Khả năng chống cắt của bê tông (thông số Mb)
  sMax: number;      // mm - Khoảng cách đai lớn nhất theo tính toán
  sCt: number;       // mm - Khoảng cách đai theo cấu tạo gần gối tựa
  sReqMin: number;   // mm - Khoảng cách đai tính toán nhỏ nhất trong khoảng [h0, 2h0]
  suggestedS: number;// mm - Khoảng cách đề xuất thực tế (làm tròn bội số 25/50)
  qsw: number;       // N/mm ứng với s đề xuất
  c0: number;        // mm - Chiều dài hình chiếu vết nứt nguy hiểm
  Qub: number;       // kN - Khả năng chịu cắt của bê tông + cốt đai
  needsBentBars: boolean;
  notes: string[];
}

export function designShearStirrups(input: ShearDesignInput): ShearDesignResult {
  const gammaB = input.gammaB ?? 0.9;
  const stirrupLegs = input.stirrupLegs ?? 2;
  const Eb = input.Eb ?? 23000;
  const Es = input.Es ?? 210000;
  const h0 = input.h - input.a;
  const RbEff = input.Rb * gammaB;
  const RbtEff = input.Rbt * gammaB;

  const notes: string[] = [];

  // Diện tích 1 nhánh cốt đai
  const Asw1 = (Math.PI * Math.pow(input.stirrupD, 2)) / 4;
  const Asw = stirrupLegs * Asw1; // Tổng diện tích cốt đai trên một tiết diện

  // 1. Kiểm tra bê tông không bị ép vỡ theo dải nghiêng:
  // phi_b1 = 1 - 0.01 * gamma_b * Rb
  const phiB1 = Number((1 - 0.01 * RbEff).toFixed(3));
  // Giả thiết sơ bộ s = 150mm để tính phi_w1
  const phiW1 = Number((1 + 5 * (Es / Eb) * (Asw / (input.b * 150))).toFixed(3));
  const Qmax_N = 0.3 * phiW1 * phiB1 * RbEff * input.b * h0;
  const Qmax_concrete = Number((Qmax_N * 1e-3).toFixed(1));
  const isConcreteCrushSafe = input.Q <= Qmax_concrete;

  if (!isConcreteCrushSafe) {
    notes.push(`CẢNH BÁO: Q = ${input.Q} kN > Q_max = ${Qmax_concrete} kN: Bê tông bị nén vỡ trên dải nghiêng. Cần tăng kích thước b x h hoặc tăng mác bê tông!`);
  }

  // 2. Ảnh hưởng của cánh nén (nếu là tiết diện chữ T)
  let phiF = 0;
  if (input.bfPrime && input.hfPrime && input.bfPrime > input.b) {
    phiF = Number(Math.min(0.5, (0.75 * (input.bfPrime - input.b) * input.hfPrime) / (input.b * h0)).toFixed(4));
  }

  // 3. Khả năng chống cắt của bê tông Mb (CT 4.60, T1 tr.124)
  // Mb = phi_b2 * (1 + phi_f) * gamma_b * Rbt * b * h0^2 với phi_b2 = 2.0
  const Mb_Nmm = 2.0 * (1 + phiF) * RbtEff * input.b * h0 * h0;
  const Mb = Number((Mb_Nmm * 1e-6).toFixed(1));

  // 4. Khoảng cách lớn nhất giữa các cốt đai s_max (CT 4.63)
  // s_max = phi_b4 * (1 + phi_f) * gamma_b * Rbt * b * h0^2 / Q với phi_b4 = 1.5
  const sMax_val = (1.5 * (1 + phiF) * RbtEff * input.b * h0 * h0) / (input.Q * 1e3);
  const sMax = Number(sMax_val.toFixed(1));

  // 5. Khoảng cách theo cấu tạo s_ct (gần gối tựa trong đoạn 1/4 nhịp)
  let sCt = 200;
  if (input.h <= 450) {
    sCt = Math.min(150, Math.floor(input.h / 2));
  } else {
    sCt = Math.min(500, Math.floor(input.h / 3));
  }

  // 6. Tính toán bước đai s_req tại các vị trí c1 trong khoảng [h0, 2*h0]
  const testC1 = [h0, 1.25 * h0, 1.5 * h0, 1.75 * h0, 2 * h0];
  let sReqMin = 9999;
  for (const c1 of testC1) {
    const denom = input.Q * 1e3 - Mb_Nmm / c1;
    if (denom > 0) {
      const sVal = (Asw * input.Rsw * c1) / denom;
      if (sVal > 0 && sVal < sReqMin) {
        sReqMin = sVal;
      }
    }
  }
  sReqMin = Number(sReqMin.toFixed(1));

  // Chọn s thực tế: min(sReqMin, sMax, sCt) làm tròn xuống bội số của 25mm (tối thiểu 50mm, tối đa 300mm)
  const candidateS = Math.min(sReqMin, sMax, sCt);
  const suggestedS = Math.max(50, Math.floor(candidateS / 25) * 25);

  // 7. Kiểm tra lại khả năng chịu cắt với bước đai đề xuất:
  const qsw = Number(((Asw * input.Rsw) / suggestedS).toFixed(3));
  const cCritical = Math.sqrt(Mb_Nmm / qsw);
  let c0 = cCritical;
  if (c0 > 2 * h0) c0 = 2 * h0;
  if (c0 < h0) c0 = h0;
  c0 = Number(c0.toFixed(1));

  const Qub_N = Mb_Nmm / c0 + qsw * c0;
  const Qub = Number((Qub_N * 1e-3).toFixed(1));
  const needsBentBars = input.Q > Qub;

  if (needsBentBars) {
    notes.push(`Q (${input.Q} kN) > Qub (${Qub} kN): Cốt đai không đủ gánh toàn bộ lực cắt, cần tính thêm cốt xiên (bent-up bars).`);
  } else {
    notes.push(`Q (${input.Q} kN) <= Qub (${Qub} kN): Cốt đai s = ${suggestedS}mm và bê tông hoàn toàn đủ khả năng chịu cắt.`);
  }

  return {
    h0,
    phiB1,
    phiW1,
    Qmax_concrete,
    isConcreteCrushSafe,
    phiF,
    Mb,
    sMax,
    sCt,
    sReqMin,
    suggestedS,
    qsw,
    c0,
    Qub,
    needsBentBars,
    notes,
  };
}

/**
 * Tính diện tích cốt xiên A_inc khi cốt đai không đủ chịu cắt
 * A_inc = (Q - Q_ub) / (R_s,inc * sin(alpha))
 */
export function calculateBentUpBars(
  Q: number,      // kN
  Qub: number,    // kN
  RsInc: number,  // MPa (ví dụ 225)
  alphaDeg = 45   // độ (thường 45 độ, hoặc 60 độ cho dầm cao h > 800)
): { Ainc: number; countSuggested: number; barDiameter: number } {
  const alphaRad = (alphaDeg * Math.PI) / 180;
  const deltaQ_N = (Q - Qub) * 1e3;
  if (deltaQ_N <= 0) {
    return { Ainc: 0, countSuggested: 0, barDiameter: 0 };
  }

  const Ainc = Number((deltaQ_N / (RsInc * Math.sin(alphaRad))).toFixed(1));
  // Gợi ý chọn thanh fi 14, 16, 18, 20 hoặc 22
  const candidateDiameters = [14, 16, 18, 20, 22, 25];
  let barDiameter = 16;
  let countSuggested = 2;

  for (const d of candidateDiameters) {
    const area1 = (Math.PI * d * d) / 4;
    if (2 * area1 >= Ainc) {
      barDiameter = d;
      countSuggested = 2;
      break;
    }
  }

  return { Ainc, countSuggested, barDiameter };
}
