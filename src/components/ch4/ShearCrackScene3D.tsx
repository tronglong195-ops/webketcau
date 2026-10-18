import React, { useState } from 'react';
import { ViewerCanvas } from '../../three/common/ViewerCanvas';
import { RCBeam } from '../../three/elements/RCBeam';
import { CrackPattern } from '../../three/overlays/CrackPattern';
import { LoadArrows } from '../../three/overlays/LoadArrows';

export const ShearCrackScene3D: React.FC = () => {
  const [Q, setQ] = useState<number>(200); // kN
  const [s, setS] = useState<number>(125); // mm
  const [hasBentBars, setHasBentBars] = useState<boolean>(false);

  // Dầm b=300, h=600, h0=560, B15 (Rb=8.5, Rbt=0.75, gamma_b=0.9)
  // Mb = 2 * 0.9 * 0.75 * 300 * 560^2 * 1e-6 = 127 kNm
  // Asw = 2 * 28.3 = 56.6 mm2 (đai 2 nhánh fi 6)
  // qsw = 56.6 * 175 / s
  const Mb = 127;
  const qsw = (56.6 * 175) / s; // N/mm
  const cCritical = Math.sqrt((127 * 1e6) / qsw);
  const c0 = Math.min(1120, Math.max(560, cCritical));
  const Qb = (127 * 1e6) / c0 * 1e-3; // kN
  const Qsw = (qsw * c0) * 1e-3; // kN
  const Qinc = hasBentBars ? 40 : 0; // kN (1 thanh fi 16 xiên 45 độ ~ 42 kN)
  const Qub = Qb + Qsw + Qinc;
  const isSafe = Q <= Qub;

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm my-6">
      <div className="p-4 border-b border-border bg-bg/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-serif font-bold text-base text-text-main">
            Mô hình 3D: Tiết diện nghiêng &amp; Vết nứt chịu cắt
          </h4>
          <p className="text-xs text-text-muted">
            Mô phỏng vết nứt xiên 45°, ứng suất cắt trong cốt đai băng qua vết nứt và cốt xiên tăng cường.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main cursor-pointer">
            <input
              type="checkbox"
              checked={hasBentBars}
              onChange={(e) => setHasBentBars(e.target.checked)}
              className="rounded text-primary"
            />
            Bố trí cốt xiên (Bent-up bars 45°)
          </label>
        </div>
      </div>

      <div className="h-[380px] w-full relative bg-[#151922]">
        <ViewerCanvas cameraPosition={[1.8, 1.2, 2.0]}>
          {({ isXray, wireframe }) => (
            <group position={[0, 0, 0]}>
              <RCBeam
                type="rect"
                lengthMm={2800}
                bMm={300}
                hMm={600}
                isXray={isXray}
                wireframe={wireframe}
                rebarProps={{
                  bottomCount: 4,
                  bottomDiamMm: 25,
                  topCount: 2,
                  topDiamMm: 12,
                  stirrupSpacingSupport: s,
                  stirrupSpacingMidspan: Math.min(250, s * 2),
                  hasBentBars,
                }}
              />

              {/* Vết nứt xiên */}
              <CrackPattern
                beamLengthMm={2800}
                beamHeightMm={600}
                beamWidthMm={300}
                showShear={true}
                showFlexural={false}
              />

              {/* Tải trọng tập trung gần gối */}
              <LoadArrows
                beamLengthMm={2800}
                beamHeightMm={600}
                pKn={Q}
                qKnM={0}
              />
            </group>
          )}
        </ViewerCanvas>

        {/* Floating status display */}
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-3 py-2 rounded-lg border border-border text-xs space-y-1.5 max-w-xs shadow">
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Lực cắt Q:</span>
            <span className="font-semibold text-amber-600">{Q} kN</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Bước cốt đai s:</span>
            <span className="font-semibold">{s} mm</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Bê tông chịu cắt Qb:</span>
            <span className="font-semibold">{Qb.toFixed(1)} kN</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Cốt đai chịu cắt Qsw:</span>
            <span className="font-semibold">{Qsw.toFixed(1)} kN</span>
          </div>
          {hasBentBars && (
            <div className="flex justify-between gap-4 font-mono">
              <span className="text-text-muted">Cốt xiên Qinc:</span>
              <span className="font-semibold text-primary">{Qinc.toFixed(1)} kN</span>
            </div>
          )}
          <div className="pt-1 border-t border-border/60 flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Khả năng chịu cắt Qub:</span>
            <span className="font-semibold text-text-main">{Qub.toFixed(1)} kN</span>
          </div>
          <div className={`text-xs font-semibold ${isSafe ? 'text-emerald-600' : 'text-tension'}`}>
            {isSafe ? '✅ ĐẠT: Q <= Qub (An toàn chịu cắt)' : '❌ KHÔNG ĐẠT: Q > Qub (Cần giảm s hoặc thêm cốt xiên)'}
          </div>
        </div>

        {/* Sliders overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-surface/90 backdrop-blur p-3 rounded-lg border border-border flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-medium text-text-muted">Lực cắt Q:</span>
            <input
              type="range"
              min="100"
              max="280"
              step="10"
              value={Q}
              onChange={(e) => setQ(Number(e.target.value))}
              className="w-28 accent-primary"
            />
            <span className="font-mono font-semibold w-12">{Q} kN</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-text-muted">Bước đai s:</span>
            <input
              type="range"
              min="75"
              max="250"
              step="25"
              value={s}
              onChange={(e) => setS(Number(e.target.value))}
              className="w-28 accent-primary"
            />
            <span className="font-mono font-semibold w-14">{s} mm</span>
          </div>

          <div className="text-[11px] text-text-muted hidden sm:block">
            Điều kiện TCXDVN 356: <code>Q &le; Qb + Qsw + Qinc</code>
          </div>
        </div>
      </div>

      <div className="p-3 bg-surface border-t border-border flex flex-wrap items-center justify-between text-xs text-text-muted">
        <div>💡 <em>Kéo thanh trượt bước đai s để xem lực cắt cho phép Qub thay đổi theo thời gian thực.</em></div>
        <div className="text-primary font-medium">TCXDVN 356:2005 Mục 4.5 &amp; 4.6 (T1 tr.115-154)</div>
      </div>
    </div>
  );
};
