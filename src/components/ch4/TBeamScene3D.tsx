import React, { useState } from 'react';
import { ViewerCanvas } from '../../three/common/ViewerCanvas';
import { RCBeam } from '../../three/elements/RCBeam';
import { SectionCut } from '../../three/overlays/SectionCut';

export const TBeamScene3D: React.FC = () => {
  const [b] = useState<number>(300);
  const [h] = useState<number>(600);
  const [bfPrime] = useState<number>(800);
  const [hfPrime] = useState<number>(100);
  const [caseType, setCaseType] = useState<'flange' | 'web'>('flange');

  // Mf = gamma_b * Rb * b'f * h'f * (h0 - 0.5 * h'f)
  // With B15 (Rb*gamma_b = 7.65 MPa), h0 = 540mm:
  // Mf = 7.65 * 800 * 100 * (540 - 50) * 1e-6 = 299.9 kNm
  const Mf = 299.9;
  const currentM = caseType === 'flange' ? 220 : 450;
  const x = caseType === 'flange' ? 65 : 185; // mm (65mm < 100mm, 185mm > 100mm)

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm my-6">
      <div className="p-4 border-b border-border bg-bg/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-serif font-bold text-base text-text-main">
            Mô hình 3D: Dầm tiết diện chữ T &amp; Vị trí trục trung hòa
          </h4>
          <p className="text-xs text-text-muted">
            Khảo sát 2 trường hợp cốt lõi: Trục trung hòa đi qua cánh (M &le; Mf) so với đi qua sườn (M &gt; Mf).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCaseType('flange')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              caseType === 'flange' ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted hover:text-text-main'
            }`}
          >
            Trường hợp 1: Qua cánh (M = 220 &le; 299.9 kNm)
          </button>
          <button
            onClick={() => setCaseType('web')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              caseType === 'web' ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted hover:text-text-main'
            }`}
          >
            Trường hợp 2: Qua sườn (M = 450 &gt; 299.9 kNm)
          </button>
        </div>
      </div>

      <div className="h-[380px] w-full relative bg-[#151922]">
        <ViewerCanvas cameraPosition={[1.9, 1.5, 2.1]}>
          {({ isXray, wireframe }) => (
            <group position={[0, 0, 0]}>
              <RCBeam
                type="T"
                lengthMm={2600}
                bMm={b}
                hMm={h}
                bfMm={bfPrime}
                hfMm={hfPrime}
                isXray={isXray}
                wireframe={wireframe}
                rebarProps={{
                  bottomCount: caseType === 'flange' ? 4 : 6,
                  bottomDiamMm: 25,
                  topCount: 2,
                  topDiamMm: 12,
                  stirrupSpacingMidspan: 150,
                  stirrupSpacingSupport: 100,
                }}
              />

              {/* Trục trung hòa / Vùng nén */}
              <SectionCut
                cutPositionX={0.3}
                beamHeightMm={h}
                beamWidthMm={bfPrime}
              />
            </group>
          )}
        </ViewerCanvas>

        {/* Floating status card */}
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-3 py-2 rounded-lg border border-border text-xs space-y-1 max-w-xs shadow">
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Kích thước:</span>
            <span className="font-semibold">b'f = {bfPrime}, h'f = {hfPrime}, b = {b}, h = {h}</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Giới hạn cánh Mf:</span>
            <span className="font-semibold text-primary">{Mf} kNm</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Momen tác dụng M:</span>
            <span className="font-semibold">{currentM} kNm</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Chiều cao vùng nén x:</span>
            <span className="font-semibold text-amber-600">{x} mm {x <= hfPrime ? '(<= h\'f)' : '(> h\'f)'}</span>
          </div>
          <div className="pt-1 border-t border-border/60 text-[11px] font-medium text-text-main">
            {caseType === 'flange'
              ? "➡️ Trục trung hòa nằm trong cánh. Toàn bộ phần sườn kéo không tham gia, tính như dầm chữ nhật rộng b'f."
              : '➡️ Trục trung hòa cắt qua sườn dầm. Cánh nhô gánh M_flange = 187.4 kNm, sườn gánh Mw = 262.6 kNm.'}
          </div>
        </div>
      </div>

      <div className="p-3 bg-surface border-t border-border flex flex-wrap items-center justify-between text-xs text-text-muted">
        <div>💡 <em>Xoay góc 3D để quan sát mặt cắt chữ T và vị trí tấm phẳng trục trung hòa.</em></div>
        <div className="text-primary font-medium">TCXDVN 356:2005 Mục 4.4 (T1 tr.88-114)</div>
      </div>
    </div>
  );
};
