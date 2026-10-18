import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, getSteelMaterial } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export interface StairProps {
  flightWidthMm?: number;     // Chiều rộng vế thang b (mm)
  widthMm?: number;           // Alias for flightWidthMm
  stepCount?: number;         // Số bậc mỗi vế (ví dụ 9)
  steps?: number;             // Alias for stepCount
  stepRiseMm?: number;        // Chiều cao bậc h (mm)
  stepHeightMm?: number;      // Alias for stepRiseMm
  stepRunMm?: number;         // Chiều rộng bậc b_b (mm)
  stepDepthMm?: number;       // Alias for stepRunMm
  slabThickMm?: number;       // Chiều dày bản thang (mm)
  landingLenMm?: number;      // Chiều dài chiếu nghỉ (mm)
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  showHandrail?: boolean;     // Hiển thị lan can tay vịn
  showRebars?: boolean;       // Hiển thị chi tiết uốn cốt thép
  scale?: number;
}

export const Stair: React.FC<StairProps> = ({
  flightWidthMm,
  widthMm,
  stepCount,
  steps,
  stepRiseMm,
  stepHeightMm,
  stepRunMm,
  stepDepthMm,
  slabThickMm = 120,
  landingLenMm = 1200,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  showHandrail = true,
  showRebars = true,
  scale = 0.001
}) => {
  const finalW = flightWidthMm ?? widthMm ?? 1100;
  const finalCount = stepCount ?? steps ?? 8;
  const finalRise = stepRiseMm ?? stepHeightMm ?? 160;
  const finalRun = stepRunMm ?? stepDepthMm ?? 280;
  const W = finalW * scale;
  const r = finalRise * scale;
  const g = finalRun * scale;
  const hs = slabThickMm * scale;
  const Lland = landingLenMm * scale;

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray, isXray ? 0.15 : 0.85);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const topMat = useMemo(() => getSteelMaterial('compression'), []);
  const stirrupMat = useMemo(() => getSteelMaterial('stirrup'), []);

  const handrailMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#334155', // Dark slate steel / wood
        metalness: 0.8,
        roughness: 0.25
      }),
    []
  );

  const balusterMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#CBD5E1', // Stainless steel balusters
        metalness: 0.9,
        roughness: 0.2
      }),
    []
  );

  // Total run and total rise of one flight
  const flightRun = finalCount * g;
  const flightRise = finalCount * r;
  const angle = Math.atan2(flightRise, flightRun);
  const flightLen = Math.hypot(flightRun, flightRise);

  // Number of rebar lines across flight width
  const nBarsAcross = 5;

  return (
    <group>
      {/* ================= VẾ 1 (FLIGHT 1) ================= */}
      <group position={[0, 0, -W / 2 - 0.05]}>
        {/* Bản nghiêng chịu lực (Slanted waist slab) */}
        <mesh
          position={[flightRun / 2, flightRise / 2 - hs / 2, 0]}
          rotation={[0, 0, angle]}
          material={concreteMat}
        >
          <boxGeometry args={[flightLen, hs, W]} />
        </mesh>

        {/* Các bậc thang bê tông */}
        {Array.from({ length: finalCount }).map((_, i) => (
          <mesh
            key={`flight1-step-${i}`}
            position={[(i + 0.5) * g, (i + 0.5) * r, 0]}
            material={concreteMat}
          >
            <boxGeometry args={[g, r, W]} />
          </mesh>
        ))}

        {/* Cốt thép vế 1 (Tensile & Node reinforcement) */}
        {(showRebars || isXray) && (
          <group>
            {Array.from({ length: nBarsAcross }).map((_, i) => {
              const z = -W / 2 + 0.06 + (i * (W - 0.12)) / (nBarsAcross - 1);
              return (
                <group key={`stair1-bar-${i}`}>
                  {/* Thép dọc chịu kéo đáy bản nghiêng */}
                  <mesh
                    position={[flightRun / 2, flightRise / 2 - hs + 0.02, z]}
                    rotation={[0, 0, angle]}
                    material={tensionMat}
                  >
                    <cylinderGeometry args={[0.005, 0.005, flightLen, 8]} />
                  </mesh>

                  {/* Chi tiết uốn vát chéo qua nút gãy khúc chiếu nghỉ (Chống bung mép bê tông trong) */}
                  <mesh
                    position={[flightRun + 0.2, flightRise - 0.02, z]}
                    rotation={[0, 0, Math.PI / 2]}
                    material={tensionMat}
                  >
                    <cylinderGeometry args={[0.005, 0.005, 0.4, 8]} />
                  </mesh>

                  {/* Thép mũ gối đầu chân thang */}
                  <mesh
                    position={[0.2, 0.02, z]}
                    rotation={[0, 0, Math.PI / 2]}
                    material={topMat}
                  >
                    <cylinderGeometry args={[0.004, 0.004, 0.4, 8]} />
                  </mesh>
                </group>
              );
            })}

            {/* Thép phân bố ngang đặt vuông góc */}
            {Array.from({ length: finalCount }).map((_, i) => {
              const x = (i + 0.5) * g;
              const y = (i + 0.5) * r - hs + 0.025;
              return (
                <mesh key={`trans-bar-${i}`} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={stirrupMat}>
                  <cylinderGeometry args={[0.003, 0.003, W - 0.06, 6]} />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Lan can tay vịn vế 1 */}
        {showHandrail && (
          <group position={[0, 0, -W / 2 + 0.05]}>
            {/* Tay vịn nghiêng */}
            <mesh
              position={[flightRun / 2, flightRise / 2 + 0.85, 0]}
              rotation={[0, 0, angle]}
              material={handrailMat}
            >
              <cylinderGeometry args={[0.025, 0.025, flightLen + 0.2, 12]} />
            </mesh>
            {/* Các con tiện đứng (Balusters) */}
            {Array.from({ length: Math.ceil(finalCount / 2) }).map((_, i) => {
              const idx = i * 2;
              const x = (idx + 0.5) * g;
              const y = (idx + 1) * r;
              return (
                <mesh key={`baluster-${i}`} position={[x, y + 0.4, 0]} material={balusterMat}>
                  <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
                </mesh>
              );
            })}
          </group>
        )}
      </group>

      {/* ================= CHIẾU NGHỈ (MID-LANDING SLAB & BEAM) ================= */}
      <group position={[flightRun + Lland / 2, flightRise, 0]}>
        {/* Bản chiếu nghỉ */}
        <mesh material={concreteMat}>
          <boxGeometry args={[Lland, hs, W * 2 + 0.1]} />
        </mesh>

        {/* Dầm chiếu nghỉ đỡ mép ngoài chiếu nghỉ (Landing Beam 200x300mm) */}
        <mesh position={[Lland / 2 - 0.1, -0.15 - hs / 2, 0]} material={concreteMat}>
          <boxGeometry args={[0.2, 0.3, W * 2 + 0.1]} />
        </mesh>

        {/* Lưới thép chiếu nghỉ */}
        {(showRebars || isXray) && (
          <group position={[0, -hs / 2 + 0.02, 0]}>
            {Array.from({ length: 5 }).map((_, i) => {
              const z = -W + 0.1 + (i * (2 * W - 0.2)) / 4;
              return (
                <mesh key={`land-bar-${i}`} position={[0, 0, z]} rotation={[0, 0, Math.PI / 2]} material={tensionMat}>
                  <cylinderGeometry args={[0.005, 0.005, Lland - 0.06, 8]} />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Lan can chiếu nghỉ */}
        {showHandrail && (
          <group position={[Lland / 2 - 0.05, 0.85, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={handrailMat}>
              <cylinderGeometry args={[0.025, 0.025, W * 2 + 0.1, 12]} />
            </mesh>
            <mesh position={[0, -0.4, -W + 0.1]} material={balusterMat}>
              <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            </mesh>
            <mesh position={[0, -0.4, 0]} material={balusterMat}>
              <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            </mesh>
            <mesh position={[0, -0.4, W - 0.1]} material={balusterMat}>
              <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            </mesh>
          </group>
        )}
      </group>

      {/* ================= VẾ 2 (FLIGHT 2 - VẾ LÊN TIẾP THEO) ================= */}
      <group position={[0, flightRise, W / 2 + 0.05]}>
        {/* Bản nghiêng */}
        <mesh
          position={[flightRun / 2, flightRise / 2 - hs / 2, 0]}
          rotation={[0, 0, -angle]}
          material={concreteMat}
        >
          <boxGeometry args={[flightLen, hs, W]} />
        </mesh>

        {/* Các bậc thang quay ngược lại */}
        {Array.from({ length: finalCount }).map((_, i) => (
          <mesh
            key={`flight2-step-${i}`}
            position={[(finalCount - 1 - i + 0.5) * g, (i + 0.5) * r, 0]}
            material={concreteMat}
          >
            <boxGeometry args={[g, r, W]} />
          </mesh>
        ))}

        {/* Lan can tay vịn vế 2 */}
        {showHandrail && (
          <group position={[0, 0, W / 2 - 0.05]}>
            <mesh
              position={[flightRun / 2, flightRise / 2 + 0.85, 0]}
              rotation={[0, 0, -angle]}
              material={handrailMat}
            >
              <cylinderGeometry args={[0.025, 0.025, flightLen + 0.2, 12]} />
            </mesh>
            {Array.from({ length: Math.ceil(finalCount / 2) }).map((_, i) => {
              const idx = i * 2;
              const x = (finalCount - 1 - idx + 0.5) * g;
              const y = (idx + 1) * r;
              return (
                <mesh key={`baluster2-${i}`} position={[x, y + 0.4, 0]} material={balusterMat}>
                  <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
                </mesh>
              );
            })}
          </group>
        )}
      </group>

      {/* ================= ĐƯỜNG KÍCH THƯỚC (DIMENSIONS) ================= */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[0, -0.2, -W - 0.2]}
            end={[flightRun + Lland, -0.2, -W - 0.2]}
            valueMm={Math.round(finalCount * finalRun + landingLenMm)}
            label={`L = ${Math.round(finalCount * finalRun + landingLenMm)} mm`}
          />
          <DimensionLine
            start={[-0.2, 0, -W / 2]}
            end={[-0.2, flightRise * 2, -W / 2]}
            valueMm={Math.round(finalCount * finalRise * 2)}
            label={`H_tầng = ${Math.round(finalCount * finalRise * 2)} mm`}
          />
        </group>
      )}
    </group>
  );
};
