import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, getSteelMaterial } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export interface RCSlabProps {
  lengthXMm?: number;         // Span Lx (mm)
  lengthYMm?: number;         // Span Ly (mm)
  thicknessMm?: number;       // Thickness hs (mm)
  lxMm?: number;              // Alias for lengthXMm
  lyMm?: number;              // Alias for lengthYMm
  hMm?: number;               // Alias for thicknessMm
  isTwoWay?: boolean;         // Bản 2 phương hay bản dầm 1 phương
  barSpacingMm?: number;      // Bước thép bản (mm)
  barDiamMm?: number;         // Đường kính thép bản (mm)
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  showSupportBeams?: boolean;
  scale?: number;
}

export const RCSlab: React.FC<RCSlabProps> = ({
  lengthXMm,
  lengthYMm,
  thicknessMm,
  lxMm,
  lyMm,
  hMm,
  isTwoWay = true,
  barSpacingMm = 150,
  barDiamMm = 10,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  showSupportBeams = true,
  scale = 0.001
}) => {
  const finalLx = lengthXMm ?? lxMm ?? 3000;
  const finalLy = lengthYMm ?? lyMm ?? 2000;
  const finalHs = thicknessMm ?? hMm ?? 100;
  const Lx = finalLx * scale;
  const Ly = finalLy * scale;
  const hs = finalHs * scale;
  const dBar = barDiamMm * scale;
  const spacing = barSpacingMm * scale;
  const c = 0.015; // 15mm cover for slab

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const topMat = useMemo(() => getSteelMaterial('compression'), []);

  // X bars (along X)
  const xBarCoords = useMemo(() => {
    const coords: number[] = [];
    const count = Math.floor((Ly - 2 * c) / spacing);
    const start = -Ly / 2 + c;
    for (let i = 0; i <= count; i++) {
      coords.push(start + i * spacing);
    }
    return coords;
  }, [Ly, spacing, c]);

  // Y bars (along Y)
  const yBarCoords = useMemo(() => {
    const coords: number[] = [];
    const count = Math.floor((Lx - 2 * c) / spacing);
    const start = -Lx / 2 + c;
    for (let i = 0; i <= count; i++) {
      coords.push(start + i * spacing);
    }
    return coords;
  }, [Lx, spacing, c]);

  return (
    <group>
      {/* Slab concrete plate */}
      <mesh material={concreteMat} position={[0, 0, 0]}>
        <boxGeometry args={[Lx, hs, Ly]} />
      </mesh>

      {/* Supporting beams underneath */}
      {showSupportBeams && (
        <group position={[0, -hs / 2 - 0.15, 0]}>
          {/* Edge beam X-positive */}
          <mesh position={[0, 0, Ly / 2 - 0.1]} material={concreteMat}>
            <boxGeometry args={[Lx, 0.3, 0.2]} />
          </mesh>
          {/* Edge beam X-negative */}
          <mesh position={[0, 0, -Ly / 2 + 0.1]} material={concreteMat}>
            <boxGeometry args={[Lx, 0.3, 0.2]} />
          </mesh>
          {/* Edge beam Y-left */}
          <mesh position={[-Lx / 2 + 0.1, 0, 0]} material={concreteMat}>
            <boxGeometry args={[0.2, 0.3, Ly]} />
          </mesh>
          {/* Edge beam Y-right */}
          <mesh position={[Lx / 2 - 0.1, 0, 0]} material={concreteMat}>
            <boxGeometry args={[0.2, 0.3, Ly]} />
          </mesh>
        </group>
      )}

      {/* Bottom reinforcement layer */}
      {/* Primary bottom bars along X */}
      {xBarCoords.map((z, idx) => (
        <mesh
          key={`slab-bx-${idx}`}
          position={[0, -hs / 2 + c + dBar / 2, z]}
          rotation={[0, 0, Math.PI / 2]}
          material={tensionMat}
        >
          <cylinderGeometry args={[dBar / 2, dBar / 2, Lx - 2 * c, 8]} />
        </mesh>
      ))}

      {/* Secondary / Distribution bottom bars along Y */}
      {yBarCoords.map((x, idx) => (
        <mesh
          key={`slab-by-${idx}`}
          position={[x, -hs / 2 + c + dBar * 1.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={isTwoWay ? tensionMat : topMat}
        >
          <cylinderGeometry args={[dBar / 2, dBar / 2, Ly - 2 * c, 8]} />
        </mesh>
      ))}

      {/* Top support negative moment bars (thép mũ gối) */}
      {[-Lx / 2 + 0.25, Lx / 2 - 0.25].map((xSupp, sIdx) => (
        <group key={`supp-top-${sIdx}`}>
          {xBarCoords.map((z, idx) => (
            <mesh
              key={`slab-tx-${sIdx}-${idx}`}
              position={[xSupp, hs / 2 - c - dBar / 2, z]}
              rotation={[0, 0, Math.PI / 2]}
              material={topMat}
            >
              <cylinderGeometry args={[dBar / 2, dBar / 2, 0.6, 8]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Dimensions */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[-Lx / 2, hs / 2 + 0.05, Ly / 2 + 0.1]}
            end={[Lx / 2, hs / 2 + 0.05, Ly / 2 + 0.1]}
            valueMm={lengthXMm}
            label={`Lx = ${lengthXMm} mm`}
          />
          <DimensionLine
            start={[Lx / 2 + 0.1, hs / 2 + 0.05, -Ly / 2]}
            end={[Lx / 2 + 0.1, hs / 2 + 0.05, Ly / 2]}
            valueMm={lengthYMm}
            label={`Ly = ${lengthYMm} mm`}
          />
          <DimensionLine
            start={[Lx / 2 + 0.1, -hs / 2, Ly / 2 + 0.1]}
            end={[Lx / 2 + 0.1, hs / 2, Ly / 2 + 0.1]}
            valueMm={thicknessMm}
            label={`h_s = ${thicknessMm} mm`}
          />
        </group>
      )}
    </group>
  );
};
