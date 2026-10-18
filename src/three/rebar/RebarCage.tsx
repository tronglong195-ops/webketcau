import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getSteelMaterial, COLORS } from '../common/materials';

export interface RebarCageProps {
  bMm: number;               // Width in mm
  hMm: number;               // Height in mm
  lengthMm: number;          // Length in mm
  coverMm?: number;          // Clear cover in mm (default 25)
  bottomCount?: number;      // Số thanh thép dọc dưới (chịu kéo)
  bottomDiamMm?: number;     // Đường kính thép dọc dưới (mm)
  topCount?: number;         // Số thanh thép dọc trên (chịu nén / giá)
  topDiamMm?: number;        // Đường kính thép dọc trên (mm)
  stirrupDiamMm?: number;    // Đường kính cốt đai (mm)
  stirrupSpacingSupport?: number; // Bước đai vùng gối s1 (mm)
  stirrupSpacingMidspan?: number; // Bước đai giữa nhịp s2 (mm)
  hasBentBars?: boolean;     // Có cốt xiên không
  hasAnchorage?: boolean;    // Có móc neo / đoạn neo ở gối
  scale?: number;            // Scale to 3D units (default 0.001 -> 1m = 1 unit)
}

export const RebarCage: React.FC<RebarCageProps> = ({
  bMm,
  hMm,
  lengthMm,
  coverMm = 25,
  bottomCount = 3,
  bottomDiamMm = 20,
  topCount = 2,
  topDiamMm = 14,
  stirrupDiamMm = 8,
  stirrupSpacingSupport = 100,
  stirrupSpacingMidspan = 200,
  hasBentBars = false,
  hasAnchorage = true,
  scale = 0.001
}) => {
  // Convert mm to 3D units
  const b = bMm * scale;
  const h = hMm * scale;
  const L = lengthMm * scale;
  const c = coverMm * scale;
  const dBot = bottomDiamMm * scale;
  const dTop = topDiamMm * scale;
  const dStir = stirrupDiamMm * scale;

  // Materials
  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const compMat = useMemo(() => getSteelMaterial('compression'), []);
  const stirrupMat = useMemo(() => getSteelMaterial('stirrup'), []);
  const bentMat = useMemo(() => getSteelMaterial('bent'), []);

  // Longitudinal Rebars geometry
  // Bottom bars: along X axis from -L/2 + c to L/2 - c
  // Z span: -b/2 + c + dStir + dBot/2 to b/2 - c - dStir - dBot/2
  // Y: -h/2 + c + dStir + dBot/2
  const bottomBarZPositions = useMemo(() => {
    if (bottomCount <= 1) return [0];
    const zMin = -b / 2 + c + dStir + dBot / 2;
    const zMax = b / 2 - c - dStir - dBot / 2;
    const step = (zMax - zMin) / (bottomCount - 1);
    return Array.from({ length: bottomCount }, (_, i) => zMin + i * step);
  }, [b, c, dStir, dBot, bottomCount]);

  const topBarZPositions = useMemo(() => {
    if (topCount <= 1) return [0];
    const zMin = -b / 2 + c + dStir + dTop / 2;
    const zMax = b / 2 - c - dStir - dTop / 2;
    const step = (zMax - zMin) / (topCount - 1);
    return Array.from({ length: topCount }, (_, i) => zMin + i * step);
  }, [b, c, dStir, dTop, topCount]);

  const yBottom = -h / 2 + c + dStir + dBot / 2;
  const yTop = h / 2 - c - dStir - dTop / 2;
  const barLength = L - 2 * c;

  // Stirrup X positions
  const stirrupXPositions = useMemo(() => {
    const positions: number[] = [];
    const supportZone = lengthMm / 4; // 1/4 span on each side
    const xStart = -lengthMm / 2 + 50;
    const xEnd = lengthMm / 2 - 50;

    let cur = xStart;
    while (cur <= xEnd) {
      positions.push(cur * scale);
      const distFromEnd = Math.min(cur - (-lengthMm / 2), lengthMm / 2 - cur);
      const spacing = distFromEnd <= supportZone ? stirrupSpacingSupport : stirrupSpacingMidspan;
      cur += spacing;
    }
    return positions;
  }, [lengthMm, stirrupSpacingSupport, stirrupSpacingMidspan, scale]);

  // Create closed rectangular stirrup curve
  const stirrupCurve = useMemo(() => {
    const sw = b - 2 * c - dStir;
    const sh = h - 2 * c - dStir;
    const hw = sw / 2;
    const hh = sh / 2;

    const points = [
      new THREE.Vector3(0, hh, -hw),
      new THREE.Vector3(0, hh, hw),
      new THREE.Vector3(0, -hh, hw),
      new THREE.Vector3(0, -hh, -hw),
      new THREE.Vector3(0, hh, -hw),
      // 135 deg standard seismic hook
      new THREE.Vector3(0, hh - 0.04, -hw + 0.04)
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.05);
  }, [b, h, c, dStir]);

  return (
    <group>
      {/* Bottom Tension Bars */}
      {bottomBarZPositions.map((z, idx) => (
        <group key={`bot-${idx}`}>
          <mesh
            position={[0, yBottom, z]}
            rotation={[0, 0, Math.PI / 2]}
            material={tensionMat}
          >
            <cylinderGeometry args={[dBot / 2, dBot / 2, barLength, 16]} />
          </mesh>
          {/* 90-degree end anchorage hooks */}
          {hasAnchorage && (
            <>
              {/* Left hook */}
              <mesh
                position={[-barLength / 2, yBottom + 0.04, z]}
                material={tensionMat}
              >
                <cylinderGeometry args={[dBot / 2, dBot / 2, 0.08, 12]} />
              </mesh>
              {/* Right hook */}
              <mesh
                position={[barLength / 2, yBottom + 0.04, z]}
                material={tensionMat}
              >
                <cylinderGeometry args={[dBot / 2, dBot / 2, 0.08, 12]} />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Top Compression / Hanger Bars */}
      {topBarZPositions.map((z, idx) => (
        <group key={`top-${idx}`}>
          <mesh
            position={[0, yTop, z]}
            rotation={[0, 0, Math.PI / 2]}
            material={compMat}
          >
            <cylinderGeometry args={[dTop / 2, dTop / 2, barLength, 16]} />
          </mesh>
          {hasAnchorage && (
            <>
              <mesh
                position={[-barLength / 2, yTop - 0.03, z]}
                material={compMat}
              >
                <cylinderGeometry args={[dTop / 2, dTop / 2, 0.06, 12]} />
              </mesh>
              <mesh
                position={[barLength / 2, yTop - 0.03, z]}
                material={compMat}
              >
                <cylinderGeometry args={[dTop / 2, dTop / 2, 0.06, 12]} />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Stirrups (Cốt đai) */}
      {stirrupXPositions.map((x, idx) => {
        const sw = b - 2 * c - dStir;
        const sh = h - 2 * c - dStir;
        return (
          <group key={`stirrup-${idx}`} position={[x, 0, 0]}>
            {/* Top leg */}
            <mesh position={[0, sh / 2, 0]} rotation={[Math.PI / 2, 0, 0]} material={stirrupMat}>
              <cylinderGeometry args={[dStir / 2, dStir / 2, sw, 8]} />
            </mesh>
            {/* Bottom leg */}
            <mesh position={[0, -sh / 2, 0]} rotation={[Math.PI / 2, 0, 0]} material={stirrupMat}>
              <cylinderGeometry args={[dStir / 2, dStir / 2, sw, 8]} />
            </mesh>
            {/* Left leg */}
            <mesh position={[0, 0, -sw / 2]} material={stirrupMat}>
              <cylinderGeometry args={[dStir / 2, dStir / 2, sh, 8]} />
            </mesh>
            {/* Right leg */}
            <mesh position={[0, 0, sw / 2]} material={stirrupMat}>
              <cylinderGeometry args={[dStir / 2, dStir / 2, sh, 8]} />
            </mesh>
          </group>
        );
      })}

      {/* Bent-up bars (Cốt xiên 45 độ gần gối) */}
      {hasBentBars && (
        <group>
          {/* Left bent bar */}
          <mesh
            position={[-L / 3, 0, 0]}
            rotation={[0, 0, Math.PI / 4]}
            material={bentMat}
          >
            <cylinderGeometry args={[dBot / 2, dBot / 2, (yTop - yBottom) * 1.414, 12]} />
          </mesh>
          {/* Right bent bar */}
          <mesh
            position={[L / 3, 0, 0]}
            rotation={[0, 0, -Math.PI / 4]}
            material={bentMat}
          >
            <cylinderGeometry args={[dBot / 2, dBot / 2, (yTop - yBottom) * 1.414, 12]} />
          </mesh>
        </group>
      )}
    </group>
  );
};
