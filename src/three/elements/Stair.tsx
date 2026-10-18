import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, getSteelMaterial } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export interface StairProps {
  flightWidthMm?: number;     // Chiều rộng vế thang b (mm)
  widthMm?: number;           // Alias for flightWidthMm
  stepCount?: number;         // Số bậc mỗi vế (ví dụ 10)
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
  scale = 0.001
}) => {
  const finalW = flightWidthMm ?? widthMm ?? 1200;
  const finalCount = stepCount ?? steps ?? 9;
  const finalRise = stepRiseMm ?? stepHeightMm ?? 170;
  const finalRun = stepRunMm ?? stepDepthMm ?? 280;
  const W = finalW * scale;
  const r = finalRise * scale;
  const g = finalRun * scale;
  const hs = slabThickMm * scale;
  const Lland = landingLenMm * scale;

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const compMat = useMemo(() => getSteelMaterial('compression'), []);

  // Total run and total rise of one flight
  const flightRun = finalCount * g;
  const flightRise = finalCount * r;
  const angle = Math.atan2(flightRise, flightRun);

  return (
    <group>
      {/* Flight 1: steps and inclined waist slab */}
      <group position={[0, 0, -W / 2 - 0.05]}>
        {/* Slanted waist slab */}
        <mesh
          position={[flightRun / 2, flightRise / 2 - hs / 2, 0]}
          rotation={[0, 0, angle]}
          material={concreteMat}
        >
          <boxGeometry args={[Math.hypot(flightRun, flightRise), hs, W]} />
        </mesh>

        {/* Steps */}
        {Array.from({ length: finalCount }).map((_, i) => (
          <mesh
            key={`step-${i}`}
            position={[(i + 0.5) * g, (i + 0.5) * r, 0]}
            material={concreteMat}
          >
            <boxGeometry args={[g, r, W]} />
          </mesh>
        ))}

        {/* Tensile rebars along inclined slab */}
        {[-W / 3, 0, W / 3].map((z, idx) => (
          <mesh
            key={`stair-rebar-${idx}`}
            position={[flightRun / 2, flightRise / 2 - hs + 0.02, z]}
            rotation={[0, 0, angle]}
            material={tensionMat}
          >
            <cylinderGeometry args={[0.006, 0.006, Math.hypot(flightRun, flightRise) + 0.4, 8]} />
          </mesh>
        ))}
      </group>

      {/* Mid Landing (Chiếu nghỉ) */}
      <mesh
        position={[flightRun + Lland / 2, flightRise, 0]}
        material={concreteMat}
      >
        <boxGeometry args={[Lland, hs, W * 2 + 0.1]} />
      </mesh>

      {/* Flight 2: return flight */}
      <group position={[0, flightRise, W / 2 + 0.05]}>
        {/* Slanted waist slab going up or down */}
        <mesh
          position={[flightRun / 2, flightRise / 2 - hs / 2, 0]}
          rotation={[0, 0, angle]}
          material={concreteMat}
        >
          <boxGeometry args={[Math.hypot(flightRun, flightRise), hs, W]} />
        </mesh>
        {/* Steps */}
        {Array.from({ length: finalCount }).map((_, i) => (
          <mesh
            key={`step2-${i}`}
            position={[(i + 0.5) * g, (i + 0.5) * r, 0]}
            material={concreteMat}
          >
            <boxGeometry args={[g, r, W]} />
          </mesh>
        ))}
      </group>

      {/* Dimensions */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[0, 0, -W - 0.2]}
            end={[flightRun + Lland, 0, -W - 0.2]}
            valueMm={(finalCount * finalRun + landingLenMm)}
            label={`L = ${(finalCount * finalRun + landingLenMm)} mm`}
          />
          <DimensionLine
            start={[-0.2, 0, -W / 2]}
            end={[-0.2, flightRise * 2, -W / 2]}
            valueMm={finalCount * finalRise * 2}
            label={`H_t = ${finalCount * finalRise * 2} mm`}
          />
        </group>
      )}
    </group>
  );
};
