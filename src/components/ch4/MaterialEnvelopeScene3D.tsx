import React, { useState } from 'react';
import { ViewerCanvas } from '../../three/common/ViewerCanvas';
import { RCBeam } from '../../three/elements/RCBeam';
import { DiagramOverlay } from '../../three/overlays/DiagramOverlay';

export const MaterialEnvelopeScene3D: React.FC = () => {
  const [showTheoreticalCut] = useState<boolean>(true);
  const [showActualCut] = useState<boolean>(true);

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm my-6">
      <div className="p-4 border-b border-border bg-bg/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-serif font-bold text-base text-text-main">
            Mô hình 3D: Biểu đồ vật liệu &amp; Điểm cắt cốt thép dầm
          </h4>
          <p className="text-xs text-text-muted">
            Trực quan hóa sự bao phủ của biểu đồ khả năng chịu lực Mr lên biểu đồ bao momen M, cùng quy tắc kéo dài đoạn neo w.
          </p>
        </div>
      </div>

      <div className="h-[380px] w-full relative bg-[#151922]">
        <ViewerCanvas cameraPosition={[0, 1.6, 2.4]}>
          {({ isXray, wireframe }) => (
            <group position={[0, 0, 0]}>
              {/* Dầm chính */}
              <RCBeam
                type="rect"
                lengthMm={3200}
                bMm={300}
                hMm={500}
                isXray={isXray}
                wireframe={wireframe}
                rebarProps={{
                  bottomCount: 4,
                  bottomDiamMm: 25,
                  topCount: 2,
                  topDiamMm: 12,
                  stirrupSpacingMidspan: 150,
                  stirrupSpacingSupport: 100,
                }}
              />

              {/* Biểu đồ bao moment */}
              <group position={[0, 0.45, 0]}>
                <DiagramOverlay
                  beamLengthMm={3200}
                  beamHeightMm={500}
                  qKnM={30}
                  showMoment={true}
                  showShear={false}
                />
              </group>
            </group>
          )}
        </ViewerCanvas>

        {/* Legend / Overlay notes */}
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-3 py-2.5 rounded-lg border border-border text-xs space-y-1.5 max-w-sm shadow">
          <div className="font-semibold text-text-main border-b border-border/60 pb-1">
            Quy tắc dựng biểu đồ vật liệu (T1 tr.155)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#38BDF8] inline-block"></span>
            <span>Biểu đồ bao momen ngoại lực M(x)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span>Biểu đồ khả năng chịu lực Mr (bậc thang)</span>
          </div>
          {showTheoreticalCut && (
            <div className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
              📍 <strong>Tiết diện cắt lý thuyết:</strong> Giao điểm giữa đường M và bậc thang Mr của 2 thanh cắt.
            </div>
          )}
          {showActualCut && (
            <div className="text-[11px] text-blue-800 bg-blue-50 p-1.5 rounded border border-blue-200">
              📏 <strong>Tiết diện cắt thực tế:</strong> Kéo dài thêm một đoạn w &ge; 20d (với phi 25 &rarr; w &ge; 500 mm) để đảm bảo neo chắc chắn trong vùng bê tông chịu kéo.
            </div>
          )}
        </div>
      </div>

      <div className="p-3 bg-surface border-t border-border flex flex-wrap items-center justify-between text-xs text-text-muted">
        <div>💡 <em>Biểu đồ vật liệu phải luôn BAO BỌC hoàn toàn biểu đồ bao moment: Mr(x) &ge; M(x).</em></div>
        <div className="text-primary font-medium">TCXDVN 356:2005 Mục 4.7 (T1 tr.155)</div>
      </div>
    </div>
  );
};
