import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, getSteelMaterial } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export interface RCColumnProps {
  bMm?: number;               // Column width b (mm)
  hMm?: number;               // Column depth h (mm)
  heightMm?: number;          // Column height H (mm)
  rebarCount?: number;        // Total longitudinal bars (4, 6, 8)
  rebarDiamMm?: number;       // Longitudinal rebar diameter (mm)
  tieDiamMm?: number;         // Tie diameter (mm)
  tieSpacingEnd?: number;     // Spacing at ends (mm)
  tieSpacingMid?: number;     // Spacing at mid (mm)
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  scale?: number;
}

export const RCColumn: React.FC<RCColumnProps> = ({
  bMm = 300,
  hMm = 300,
  heightMm = 3200,
  rebarCount = 8,
  rebarDiamMm = 20,
  tieDiamMm = 8,
  tieSpacingEnd = 100,
  tieSpacingMid = 200,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  scale = 0.001
}) => {
  const b = bMm * scale;
  const h = hMm * scale;
  const H = heightMm * scale;
  const c = 0.025; // 25mm cover
  const dBar = rebarDiamMm * scale;
  const dTie = tieDiamMm * scale;

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const barMat = useMemo(() => getSteelMaterial('compression'), []);
  const tieMat = useMemo(() => getSteelMaterial('stirrup'), []);

  // Compute positions of longitudinal bars
  const rebarPositions = useMemo(() => {
    const xMin = -b / 2 + c + dTie + dBar / 2;
    const xMax = b / 2 - c - dTie - dBar / 2;
    const zMin = -h / 2 + c + dTie + dBar / 2;
    const zMax = h / 2 - c - dTie - dBar / 2;

    const coords: [number, number][] = [
      [xMin, zMin],
      [xMax, zMin],
      [xMax, zMax],
      [xMin, zMax]
    ];

    if (rebarCount >= 6) {
      // Add mid-face bars
      coords.push([(xMin + xMax) / 2, zMin]);
      coords.push([(xMin + xMax) / 2, zMax]);
    }
    if (rebarCount >= 8) {
      coords.push([xMin, (zMin + zMax) / 2]);
      coords.push([xMax, (zMin + zMax) / 2]);
    }
    return coords;
  }, [b, h, c, dTie, dBar, rebarCount]);

  // Compute tie elevations along Y
  const tieElevations = useMemo(() => {
    const yArr: number[] = [];
    const endZone = heightMm / 6;
    let y = 50;
    while (y < heightMm - 50) {
      yArr.push((y - heightMm / 2) * scale);
      const isEnd = y <= endZone || y >= heightMm - endZone;
      y += isEnd ? tieSpacingEnd : tieSpacingMid;
    }
    return yArr;
  }, [heightMm, tieSpacingEnd, tieSpacingMid, scale]);

  return (
    <group>
      {/* Concrete body */}
      <mesh material={concreteMat}>
        <boxGeometry args={[b, H, h]} />
      </mesh>

      {/* Longitudinal Rebars */}
      {rebarPositions.map(([x, z], idx) => (
        <mesh key={`col-bar-${idx}`} position={[x, 0, z]} material={barMat}>
          <cylinderGeometry args={[dBar / 2, dBar / 2, H - 2 * c, 16]} />
        </mesh>
      ))}

      {/* Ties */}
      {tieElevations.map((y, idx) => {
        const tw = b - 2 * c - dTie;
        const th = h - 2 * c - dTie;
        return (
          <group key={`col-tie-${idx}`} position={[0, y, 0]}>
            {/* Front & Back */}
            <mesh position={[0, 0, th / 2]} rotation={[0, 0, Math.PI / 2]} material={tieMat}>
              <cylinderGeometry args={[dTie / 2, dTie / 2, tw, 8]} />
            </mesh>
            <mesh position={[0, 0, -th / 2]} rotation={[0, 0, Math.PI / 2]} material={tieMat}>
              <cylinderGeometry args={[dTie / 2, dTie / 2, tw, 8]} />
            </mesh>
            {/* Left & Right */}
            <mesh position={[-tw / 2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={tieMat}>
              <cylinderGeometry args={[dTie / 2, dTie / 2, th, 8]} />
            </mesh>
            <mesh position={[tw / 2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={tieMat}>
              <cylinderGeometry args={[dTie / 2, dTie / 2, th, 8]} />
            </mesh>
          </group>
        );
      })}

      {/* Dimensions */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[b / 2 + 0.1, -H / 2, 0]}
            end={[b / 2 + 0.1, H / 2, 0]}
            valueMm={heightMm}
            label={`H = ${heightMm} mm`}
          />
          <DimensionLine
            start={[-b / 2, -H / 2 - 0.1, h / 2 + 0.05]}
            end={[b / 2, -H / 2 - 0.1, h / 2 + 0.05]}
            valueMm={bMm}
            label={`b = ${bMm} mm`}
          />
        </group>
      )}
    </group>
  );
};
