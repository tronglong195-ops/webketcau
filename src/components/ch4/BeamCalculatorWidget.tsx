import React, { useState } from 'react';
import { CONCRETE_TABLE, REBAR_TABLE } from '../../calc/materials';
import { designRectBeam } from '../../calc/rectBeam';
import { designTBeam } from '../../calc/tBeam';
import { designShearStirrups } from '../../calc/shearDesign';

export const BeamCalculatorWidget: React.FC = () => {
  const [sectionShape, setSectionShape] = useState<'rect' | 'T'>('rect');
  const [b, setB] = useState<number>(300);
  const [h, setH] = useState<number>(500);
  const [a, setA] = useState<number>(60);
  const [bfPrime, setBfPrime] = useState<number>(800);
  const [hfPrime, setHfPrime] = useState<number>(100);
  const [M, setM] = useState<number>(190);
  const [Q, setQ] = useState<number>(160);
  const [concreteGrade, setConcreteGrade] = useState<string>('B15');
  const [rebarGrade, setRebarGrade] = useState<string>('CII');
  const [stirrupD, setStirrupD] = useState<number>(6);

  const concrete = CONCRETE_TABLE[concreteGrade] || CONCRETE_TABLE['B15'];
  const rebar = REBAR_TABLE[rebarGrade] || REBAR_TABLE['CII'];

  // Tính uốn
  let flexureResult;
  if (sectionShape === 'rect') {
    flexureResult = designRectBeam({
      M,
      b,
      h,
      a,
      Rb: concrete.Rb,
      gammaB: 0.9,
      Rs: rebar.Rs,
      Rsc: rebar.Rsc,
    });
  } else {
    flexureResult = designTBeam({
      M,
      b,
      h,
      bfPrime,
      hfPrime,
      a,
      Rb: concrete.Rb,
      gammaB: 0.9,
      Rs: rebar.Rs,
      Rsc: rebar.Rsc,
    });
  }

  // Tính cắt
  const shearResult = designShearStirrups({
    Q,
    b,
    h,
    a,
    bfPrime: sectionShape === 'T' ? bfPrime : undefined,
    hfPrime: sectionShape === 'T' ? hfPrime : undefined,
    Rb: concrete.Rb,
    Rbt: concrete.Rbt,
    gammaB: 0.9,
    stirrupD,
    stirrupLegs: 2,
    Rsw: rebar.Rsw,
  });

  // Gợi ý chọn cốt thép dọc
  const candidateDiameters = [20, 22, 25];
  const barSuggestions = candidateDiameters.map((d) => {
    const area1 = (Math.PI * d * d) / 4;
    const count = Math.ceil(flexureResult.As / area1);
    const totalArea = count * area1;
    return { diameter: d, count, totalArea: Math.round(totalArea) };
  });

  return (
    <div className="bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-md my-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 mb-6">
        <div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded mb-1">
            Công cụ tính toán tương tác
          </span>
          <h3 className="font-serif font-bold text-xl text-text-main">
            Tính toán cốt thép dầm chịu uốn &amp; chịu cắt (Chương 4)
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Áp dụng quy phạm TCXDVN 356:2005 (Đối chiếu TCVN 5574:2018). Tính toán tự động theo đúng trình tự giáo trình.
          </p>
        </div>

        {/* Toggle Hình dạng tiết diện */}
        <div className="flex bg-bg p-1 rounded-lg border border-border">
          <button
            onClick={() => setSectionShape('rect')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              sectionShape === 'rect' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-main'
            }`}
          >
            Tiết diện chữ nhật
          </button>
          <button
            onClick={() => setSectionShape('T')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              sectionShape === 'T' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-main'
            }`}
          >
            Tiết diện chữ T
          </button>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Cột 1: Vật liệu */}
        <div className="space-y-3 bg-bg/60 p-3.5 rounded-xl border border-border">
          <h5 className="font-semibold text-xs text-text-muted uppercase tracking-wider">1. Vật liệu</h5>
          <div>
            <label className="block text-xs font-medium text-text-main mb-1">Cấp độ bền bê tông:</label>
            <select
              value={concreteGrade}
              onChange={(e) => setConcreteGrade(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs font-mono"
            >
              <option value="B15">B15 (Rb=8.5, Rbt=0.75 MPa)</option>
              <option value="B20">B20 (Rb=11.5, Rbt=0.90 MPa)</option>
              <option value="B25">B25 (Rb=14.5, Rbt=1.05 MPa)</option>
              <option value="B30">B30 (Rb=17.0, Rbt=1.20 MPa)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-main mb-1">Nhóm cốt thép dọc:</label>
            <select
              value={rebarGrade}
              onChange={(e) => setRebarGrade(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs font-mono"
            >
              <option value="CI">CI / A-I (Rs=225 MPa)</option>
              <option value="CII">CII / A-II (Rs=280 MPa)</option>
              <option value="CIII">CIII / A-III (Rs=365 MPa)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-main mb-1">Đường kính cốt đai:</label>
            <select
              value={stirrupD}
              onChange={(e) => setStirrupD(Number(e.target.value))}
              className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs font-mono"
            >
              <option value="6">Phi 6 (fsw = 28.3 mm²)</option>
              <option value="8">Phi 8 (fsw = 50.3 mm²)</option>
              <option value="10">Phi 10 (fsw = 78.5 mm²)</option>
            </select>
          </div>
        </div>

        {/* Cột 2: Kích thước hình học */}
        <div className="space-y-3 bg-bg/60 p-3.5 rounded-xl border border-border">
          <h5 className="font-semibold text-xs text-text-muted uppercase tracking-wider">2. Kích thước (mm)</h5>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-text-muted mb-0.5">Bề rộng b:</label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full bg-surface border border-border rounded-lg px-2 py-1.5 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-text-muted mb-0.5">Chiều cao h:</label>
              <input
                type="number"
                value={h}
                onChange={(e) => setH(Number(e.target.value))}
                className="w-full bg-surface border border-border rounded-lg px-2 py-1.5 text-xs font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-text-muted mb-0.5">Lớp đệm a (mm):</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full bg-surface border border-border rounded-lg px-2 py-1.5 text-xs font-mono"
            />
          </div>
          {sectionShape === 'T' && (
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border">
              <div>
                <label className="block text-[11px] font-medium text-text-muted mb-0.5">Cánh b'f:</label>
                <input
                  type="number"
                  value={bfPrime}
                  onChange={(e) => setBfPrime(Number(e.target.value))}
                  className="w-full bg-surface border border-border rounded-lg px-2 py-1.5 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-text-muted mb-0.5">Dày h'f:</label>
                <input
                  type="number"
                  value={hfPrime}
                  onChange={(e) => setHfPrime(Number(e.target.value))}
                  className="w-full bg-surface border border-border rounded-lg px-2 py-1.5 text-xs font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* Cột 3: Tải trọng tính toán */}
        <div className="space-y-3 bg-bg/60 p-3.5 rounded-xl border border-border">
          <h5 className="font-semibold text-xs text-text-muted uppercase tracking-wider">3. Tải trọng</h5>
          <div>
            <label className="block text-xs font-medium text-text-main mb-1">Momen uốn M (kNm):</label>
            <input
              type="number"
              value={M}
              onChange={(e) => setM(Number(e.target.value))}
              className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-main mb-1">Lực cắt Q (kN):</label>
            <input
              type="number"
              value={Q}
              onChange={(e) => setQ(Number(e.target.value))}
              className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-amber-600"
            />
          </div>
          <div className="text-[11px] text-text-muted pt-2 border-t border-border">
            Chiều cao làm việc $h_0 = {h - a}$ mm
          </div>
        </div>

        {/* Cột 4: Kết quả cốt thép tóm tắt */}
        <div className="bg-primary/5 border border-primary/20 p-3.5 rounded-xl space-y-2 flex flex-col justify-between">
          <div>
            <h5 className="font-semibold text-xs text-primary uppercase tracking-wider mb-2">4. Cốt thép yêu cầu</h5>
            <div className="font-mono text-2xl font-bold text-text-main">
              As = {flexureResult.As} <span className="text-sm font-normal text-text-muted">mm²</span>
            </div>
            {flexureResult.AsPrime > 0 && (
              <div className="font-mono text-sm font-semibold text-amber-700 mt-1">
                A's (cốt nén) = {flexureResult.AsPrime} mm²
              </div>
            )}
            <div className="text-xs text-text-muted mt-2 space-y-0.5">
              <div>Hàm lượng $\mu = {flexureResult.mu}\%$</div>
              <div>$\alpha_m = {flexureResult.alphaM} {flexureResult.alphaM <= flexureResult.alphaR ? '<=' : '>'} \alpha_R = {flexureResult.alphaR}$</div>
            </div>
          </div>

          <div className="pt-2 border-t border-primary/20">
            <span className="text-xs font-semibold text-text-main block mb-1">Đề xuất bố trí đai:</span>
            <div className="font-mono text-xs font-bold text-text-main">
              2ϕ{stirrupD} a{shearResult.suggestedS} (gần gối) / a{Math.min(250, shearResult.suggestedS * 2)} (giữa nhịp)
            </div>
          </div>
        </div>
      </div>

      {/* Gợi ý chọn thanh chi tiết */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <h5 className="font-serif font-bold text-sm text-text-main mb-3">
          Phương án chọn thép chịu kéo (As = {flexureResult.As} mm²):
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {barSuggestions.map((sug) => (
            <div
              key={sug.diameter}
              className="p-3 bg-bg rounded-lg border border-border/80 flex items-center justify-between"
            >
              <div>
                <span className="font-mono font-bold text-sm text-primary">
                  {sug.count} ϕ{sug.diameter}
                </span>
                <div className="text-[11px] text-text-muted mt-0.5">
                  Diện tích thực: {sug.totalArea} mm²
                </div>
              </div>
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                  sug.totalArea >= flexureResult.As
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {((sug.totalArea / flexureResult.As - 1) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

        {/* Thông báo an toàn & Ghi chú */}
        {flexureResult.notes.length > 0 && (
          <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            {flexureResult.notes.map((n, i) => (
              <div key={i}>⚠️ {n}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
