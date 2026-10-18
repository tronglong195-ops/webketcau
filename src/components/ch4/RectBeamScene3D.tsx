import React, { useState } from 'react';
import { ViewerCanvas } from '../../three/common/ViewerCanvas';
import { RCBeam } from '../../three/elements/RCBeam';
import { StressBlock } from '../../three/overlays/StressBlock';
import { SectionCut } from '../../three/overlays/SectionCut';
import { StrainProfile } from '../../three/overlays/StrainProfile';

export const RectBeamScene3D: React.FC = () => {
  const [b] = useState<number>(300);
  const [h] = useState<number>(500);
  const [mode, setMode] = useState<'single' | 'double' | 'brittle'>('single');
  const [showStress, setShowStress] = useState<boolean>(true);
  const [showStrain, setShowStrain] = useState<boolean>(false);
  const [showCut, setShowCut] = useState<boolean>(true);

  // Tính chiều cao vùng nén x tương ứng
  const h0 = h - 60;
  let xi = 0.5; // Dẻo hợp lý
  let bottomCount = 4;
  let topCount = 2; // Thép giá

  if (mode === 'double') {
    xi = 0.65;
    bottomCount = 5;
    topCount = 3; // Cốt nén chịu lực
  } else if (mode === 'brittle') {
    xi = 0.85; // Quá nhiều thép kéo -> x > xi_R * h0
    bottomCount = 7;
    topCount = 2;
  }
  const x = xi * h0;

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm my-6">
      <div className="p-4 border-b border-border bg-bg/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-serif font-bold text-base text-text-main">
            Mô hình 3D: Dầm tiết diện chữ nhật &amp; Biểu đồ ứng suất vùng nén
          </h4>
          <p className="text-xs text-text-muted">
            Trực quan hóa vùng bê tông nén tương đương x, cốt kéo As, cốt nén A's và mặt cắt tiết diện.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('single')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              mode === 'single' ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted hover:text-text-main'
            }`}
          >
            Cốt đơn (ξ = 0.50 &lt; ξR)
          </button>
          <button
            onClick={() => setMode('double')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              mode === 'double' ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted hover:text-text-main'
            }`}
          >
            Cốt kép (A's chịu nén)
          </button>
          <button
            onClick={() => setMode('brittle')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              mode === 'brittle' ? 'bg-tension text-white' : 'bg-surface border border-border text-text-muted hover:text-text-main'
            }`}
          >
            Phá hoại giòn (ξ &gt; ξR)
          </button>
        </div>
      </div>

      <div className="h-[380px] w-full relative bg-[#151922]">
        <ViewerCanvas cameraPosition={[1.8, 1.4, 2.2]}>
          {({ isXray, wireframe }) => (
            <group position={[0, 0, 0]}>
              <RCBeam
                type="rect"
                lengthMm={2600}
                bMm={b}
                hMm={h}
                isXray={isXray}
                wireframe={wireframe}
                rebarProps={{
                  bottomCount,
                  bottomDiamMm: 25,
                  topCount,
                  topDiamMm: mode === 'double' ? 20 : 12,
                  stirrupSpacingMidspan: 150,
                  stirrupSpacingSupport: 100,
                }}
              />

              {showCut && (
                <SectionCut
                  cutPositionX={0.2}
                  beamHeightMm={h}
                  beamWidthMm={b}
                />
              )}

              {showStress && (
                <group position={[0.25, 0, 0]}>
                  <StressBlock
                    bMm={b}
                    hMm={h}
                    xMm={x}
                    aMm={60}
                    RbMpa={7.65}
                    RsMpa={280}
                  />
                </group>
              )}

              {showStrain && (
                <group position={[-0.4, 0, 0]}>
                  <StrainProfile
                    beamHeightMm={h}
                    xMm={x}
                    aMm={60}
                    epsB={0.0035}
                    epsS={0.002}
                  />
                </group>
              )}
            </group>
          )}
        </ViewerCanvas>

        {/* Floating status badge */}
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-3 py-2 rounded-lg border border-border text-xs space-y-1 max-w-xs shadow">
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Tiết diện:</span>
            <span className="font-semibold">{b} x {h} mm</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Chiều cao vùng nén x:</span>
            <span className="font-semibold text-primary">{x.toFixed(0)} mm (ξ = {xi.toFixed(2)})</span>
          </div>
          <div className="flex justify-between gap-4 font-mono">
            <span className="text-text-muted">Trạng thái:</span>
            <span className={`font-semibold ${mode === 'brittle' ? 'text-tension' : 'text-emerald-600'}`}>
              {mode === 'brittle' ? 'Phá hoại giòn (Nguy hiểm)' : mode === 'double' ? 'Cốt kép an toàn' : 'Phá hoại dẻo đạt chuẩn'}
            </span>
          </div>
        </div>

        {/* View toggles */}
        <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur px-2 py-1.5 rounded-lg border border-border text-xs flex gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-text-muted hover:text-text-main">
            <input
              type="checkbox"
              checked={showStress}
              onChange={(e) => setShowStress(e.target.checked)}
              className="rounded text-primary"
            />
            Khối ứng suất nén
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-text-muted hover:text-text-main">
            <input
              type="checkbox"
              checked={showStrain}
              onChange={(e) => setShowStrain(e.target.checked)}
              className="rounded text-primary"
            />
            Biến dạng ε
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-text-muted hover:text-text-main">
            <input
              type="checkbox"
              checked={showCut}
              onChange={(e) => setShowCut(e.target.checked)}
              className="rounded text-primary"
            />
            Mặt cắt tiết diện
          </label>
        </div>
      </div>

      <div className="p-3 bg-surface border-t border-border flex flex-wrap items-center justify-between text-xs text-text-muted">
        <div>💡 <em>Xoay chuột trái để xoay góc 3D, chuột phải để pan, con lăn để phóng to / thu nhỏ.</em></div>
        <div className="text-primary font-medium">TCXDVN 356:2005 Mục 4.2 &amp; 4.3 (T1 tr.61-75)</div>
      </div>
    </div>
  );
};
