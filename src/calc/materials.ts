/**
 * Module tra cứu và tính toán đặc trưng vật liệu bê tông và cốt thép
 * Tiêu chuẩn: TCXDVN 356:2005 (Đối chiếu TCVN 5574:2018)
 * Nguồn: Giáo trình Võ Bá Tầm - Tập 1 (Chương 2 & Chương 4)
 */

export interface ConcreteGrade {
  grade: string; // ví dụ "B15", "B20", "B25", "B30"
  Rb: number;    // MPa - Cường độ tính toán chịu nén
  Rbt: number;   // MPa - Cường độ tính toán chịu kéo
  Eb: number;    // MPa - Môđun đàn hồi ban đầu
}

export interface RebarGrade {
  grade: string; // ví dụ "CI", "CII", "CIII", "CIV"
  symbol: string;// ví dụ "A-I", "A-II", "A-III", "A-IV"
  Rs: number;    // MPa - Cường độ tính toán chịu kéo
  Rsc: number;   // MPa - Cường độ tính toán chịu nén
  Rsw: number;   // MPa - Cường độ tính toán cốt đai chịu cắt
  Es: number;    // MPa - Môđun đàn hồi
}

export const CONCRETE_TABLE: Record<string, ConcreteGrade> = {
  B15: { grade: 'B15', Rb: 8.5, Rbt: 0.75, Eb: 23000 },
  B20: { grade: 'B20', Rb: 11.5, Rbt: 0.90, Eb: 27000 },
  B25: { grade: 'B25', Rb: 14.5, Rbt: 1.05, Eb: 30000 },
  B30: { grade: 'B30', Rb: 17.0, Rbt: 1.20, Eb: 32500 },
  B35: { grade: 'B35', Rb: 19.5, Rbt: 1.30, Eb: 34500 },
  B40: { grade: 'B40', Rb: 22.0, Rbt: 1.40, Eb: 36000 },
};

export const REBAR_TABLE: Record<string, RebarGrade> = {
  CI: { grade: 'CI', symbol: 'A-I', Rs: 225, Rsc: 225, Rsw: 175, Es: 210000 },
  CII: { grade: 'CII', symbol: 'A-II', Rs: 280, Rsc: 280, Rsw: 225, Es: 210000 },
  CIII: { grade: 'CIII', symbol: 'A-III', Rs: 365, Rsc: 365, Rsw: 290, Es: 200000 },
  CIV: { grade: 'CIV', symbol: 'A-IV', Rs: 510, Rsc: 400, Rsw: 290, Es: 190000 },
};

/**
 * Tính đặc trưng vùng bê tông chịu nén omega:
 * omega = alpha - beta * (gamma_b * Rb)
 * Đối với bê tông nặng: alpha = 0.85, beta = 0.008 (T1 tr.62)
 */
export function getOmega(RbEffective: number): number {
  return 0.85 - 0.008 * RbEffective;
}

/**
 * Tính chiều cao vùng nén giới hạn tương đối xi_R:
 * xi_R = omega / [ 1 + (Rs / sigma_sc_u) * (1 - omega / 1.1) ]
 * Đối với bê tông nặng: sigma_sc_u = 500 MPa (T1 tr.62, CT 4.16)
 */
export function getXiR(omega: number, Rs: number, sigmaScU = 500): number {
  const denom = 1 + (Rs / sigmaScU) * (1 - omega / 1.1);
  return Number((omega / denom).toFixed(3));
}

/**
 * Tính hệ số moment giới hạn alpha_R = xi_R * (1 - 0.5 * xi_R)
 * (T1 tr.65, CT 4.23)
 */
export function getAlphaR(xiR: number): number {
  return Number((xiR * (1 - 0.5 * xiR)).toFixed(3));
}

/**
 * Tính toán đầy đủ cặp thông số giới hạn (xi_R, alpha_R, omega)
 */
export function getLimitParameters(Rb: number, gammaB: number, Rs: number) {
  const RbEff = Rb * gammaB;
  const omega = Number(getOmega(RbEff).toFixed(3));
  const xiR = getXiR(omega, Rs);
  const alphaR = getAlphaR(xiR);
  return { RbEff, omega, xiR, alphaR };
}

export function getConcreteProps(grade: string | ConcreteGrade): ConcreteGrade {
  if (typeof grade === 'object' && grade.Rb) return grade;
  const key = (grade as string).toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (CONCRETE_TABLE[key]) return CONCRETE_TABLE[key];
  if (key.includes('20')) return CONCRETE_TABLE.B20;
  if (key.includes('25')) return CONCRETE_TABLE.B25;
  if (key.includes('30')) return CONCRETE_TABLE.B30;
  if (key.includes('15')) return CONCRETE_TABLE.B15;
  return CONCRETE_TABLE.B20;
}

export function getRebarProps(grade: string | RebarGrade): RebarGrade {
  if (typeof grade === 'object' && grade.Rs) return grade;
  const key = (grade as string).toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (REBAR_TABLE[key]) return REBAR_TABLE[key];
  if (key.includes('300') || key.includes('CII') || key.includes('AII')) return REBAR_TABLE.CII;
  if (key.includes('400') || key.includes('CIII') || key.includes('AIII')) return REBAR_TABLE.CIII;
  if (key.includes('500') || key.includes('CIV') || key.includes('AIV')) return REBAR_TABLE.CIV;
  if (key.includes('240') || key.includes('CI') || key.includes('AI')) return REBAR_TABLE.CI;
  return REBAR_TABLE.CII;
}

export function getLimitCompressionRatio(concrete: string | ConcreteGrade, rebar: string | RebarGrade): number {
  const conc = getConcreteProps(concrete);
  const reb = getRebarProps(rebar);
  const { xiR } = getLimitParameters(conc.Rb, 1.0, reb.Rs);
  return xiR;
}

