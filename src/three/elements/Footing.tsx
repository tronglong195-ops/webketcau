import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, getSteelMaterial } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export type FootingType = 'isolated' | 'strip' | 'raft';

export interface FootingProps {
  type?: FootingType;
  bMm?: number;               // Width B (mm)
  lMm?: number;               // Length L (mm)
  lxMm?: number;              // Alias for lMm
  lyMm?: number;              // Alias for bMm
  hMm?: number;               // Total footing depth H (mm)
  hStepMm?: number;           // Step height (mm)
  colBMm?: number;            // Column stub width (mm)
  colHMm?: number;            // Column stub depth (mm)
  colX?: number;              // Alias for colBMm
  colY?: number;              // Alias for colHMm
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  scale?: number;
}

export const Footing: React.FC<FootingProps> = ({
  type = 'isolated',
  bMm,
  lMm,
  lxMm,
  lyMm,
  hMm = 600,
  hStepMm = 300,
  colBMm,
  colHMm,
  colX,
  colY,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  scale = 0.001
}) => {
  const finalB = bMm ?? lyMm ?? 1600;
  const finalL = lMm ?? lxMm ?? 2000;
  const finalColB = colBMm ?? colX ?? 400;
  const finalColH = colHMm ?? colY ?? 400;
  const B = finalB * scale;
  const L = finalL * scale;
  const H = hMm * scale;
  const h1 = hStepMm * scale;
  const h2 = H - h1;
  const colB = finalColB * scale;
  const colH = finalColH * scale;
  const c = 0.05; // 50mm cover for footing

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const compMat = useMemo(() => getSteelMaterial('compression'), []);

  // Bottom mesh
  const xRebarCount = 8;
  const yRebarCount = 10;
  const dBar = 0.016; // d16

  return (
    <group>
      {/* Bottom base slab */}
      <mesh position={[0, -H / 2 + h1 / 2, 0]} material={concreteMat}>
        <boxGeometry args={[L, h1, B]} />
      </mesh>

      {/* Top stepped pedestal or strip */}
      {type === 'isolated' && (
        <mesh position={[0, -H / 2 + h1 + h2 / 2, 0]} material={concreteMat}>
          <boxGeometry args={[colB * 1.8, h2, colH * 1.8]} />
        </mesh>
      )}

      {type === 'strip' && (
        <mesh position={[0, -H / 2 + h1 + h2 / 2, 0]} material={concreteMat}>
          <boxGeometry args={[L, h2, colH * 1.5]} />
        </mesh>
      )}

      {/* Column stub rising above footing */}
      <mesh position={[0, H / 2 + 0.25, 0]} material={concreteMat}>
        <boxGeometry args={[colB, 0.5, colH]} />
      </mesh>

      {/* Bottom Rebar Mesh (Thép đáy móng) */}
      {Array.from({ length: xRebarCount }).map((_, i) => {
        const z = -B / 2 + c + (i * (B - 2 * c)) / (xRebarCount - 1);
        return (
          <mesh
            key={`ftg-rx-${i}`}
            position={[0, -H / 2 + c, z]}
            rotation={[0, 0, Math.PI / 2]}
            material={tensionMat}
          >
            <cylinderGeometry args={[dBar / 2, dBar / 2, L - 2 * c, 8]} />
          </mesh>
        );
      })}

      {Array.from({ length: yRebarCount }).map((_, i) => {
        const x = -L / 2 + c + (i * (L - 2 * c)) / (yRebarCount - 1);
        return (
          <mesh
            key={`ftg-ry-${i}`}
            position={[x, -H / 2 + c + dBar, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={tensionMat}
          >
            <cylinderGeometry args={[dBar / 2, dBar / 2, B - 2 * c, 8]} />
          </mesh>
        );
      })}

      {/* Starter bars (Chờ cột) */}
      {[
        [-colB / 2 + 0.05, -colH / 2 + 0.05],
        [colB / 2 - 0.05, -colH / 2 + 0.05],
        [colB / 2 - 0.05, colH / 2 - 0.05],
        [-colB / 2 + 0.05, colH / 2 - 0.05]
      ].map(([sx, sz], i) => (
        <group key={`starter-${i}`}>
          {/* Vertical leg */}
          <mesh position={[sx, 0.1, sz]} material={compMat}>
            <cylinderGeometry args={[0.01, 0.01, H + 0.6, 8]} />
          </mesh>
          {/* 90-degree foot anchor */}
          <mesh
            position={[sx + (sx < 0 ? -0.1 : 0.1), -H / 2 + c + 0.03, sz]}
            rotation={[0, 0, Math.PI / 2]}
            material={compMat}
          >
            <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
          </mesh>
        </group>
      ))}

      {/* Dimensions */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[-L / 2, -H / 2, B / 2 + 0.15]}
            end={[L / 2, -H / 2, B / 2 + 0.15]}
            valueMm={lMm}
            label={`L = ${lMm} mm`}
          />
          <DimensionLine
            start={[L / 2 + 0.15, -H / 2, -B / 2]}
            end={[L / 2 + 0.15, -H / 2, B / 2]}
            valueMm={bMm}
            label={`B = ${bMm} mm`}
          />
          <DimensionLine
            start={[L / 2 + 0.15, -H / 2, B / 2 + 0.15]}
            end={[L / 2 + 0.15, H / 2, B / 2 + 0.15]}
            valueMm={hMm}
            label={`H = ${hMm} mm`}
          />
        </group>
      )}
    </group>
  );
};
