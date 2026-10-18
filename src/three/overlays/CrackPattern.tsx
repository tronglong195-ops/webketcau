import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export interface CrackPatternProps {
  beamLengthMm?: number;
  lengthMm?: number;          // Alias for beamLengthMm
  beamHeightMm?: number;
  hMm?: number;               // Alias for beamHeightMm
  beamWidthMm?: number;
  bMm?: number;               // Alias for beamWidthMm
  crackType?: string;         // 'flexure' | 'shear' | 'torsion' | 'all'
  showFlexural?: boolean;     // Nứt thẳng góc giữa nhịp do uốn M
  showShear?: boolean;        // Nứt nghiêng gần gối do lực cắt Q
  showTorsion?: boolean;      // Nứt xoắn ốc do xoắn T
  crackScale?: number;        // Mức độ phát triển khe nứt
  scale?: number;
}

export const CrackPattern: React.FC<CrackPatternProps> = ({
  beamLengthMm,
  lengthMm,
  beamHeightMm,
  hMm,
  beamWidthMm,
  bMm,
  crackType,
  showFlexural,
  showShear,
  showTorsion,
  crackScale = 1.0,
  scale = 0.001
}) => {
  const finalL = beamLengthMm ?? lengthMm ?? 3000;
  const finalH = beamHeightMm ?? hMm ?? 400;
  const finalB = beamWidthMm ?? bMm ?? 200;

  const isFlex = showFlexural ?? (crackType ? crackType === 'flexure' || crackType === 'all' : true);
  const isShear = showShear ?? (crackType ? crackType === 'shear' || crackType === 'all' : true);
  const isTorsion = showTorsion ?? (crackType ? crackType === 'torsion' || crackType === 'all' : false);

  const L = finalL * scale;
  const h = finalH * scale;
  const b = finalB * scale;

  // Flexural Cracks: vertical lines from bottom face upward at midspan
  const flexuralCracks = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    const midX = 0;
    const crackHeights = [0.65, 0.75, 0.85, 0.75, 0.65]; // relative to h
    const xOffsets = [-0.3, -0.15, 0, 0.15, 0.3];

    xOffsets.forEach((xOff, i) => {
      const crackH = h * crackHeights[i] * crackScale;
      // Front face
      lines.push([
        new THREE.Vector3(midX + xOff, -h / 2, b / 2 + 0.002),
        new THREE.Vector3(midX + xOff, -h / 2 + crackH, b / 2 + 0.002)
      ]);
      // Back face
      lines.push([
        new THREE.Vector3(midX + xOff, -h / 2, -b / 2 - 0.002),
        new THREE.Vector3(midX + xOff, -h / 2 + crackH, -b / 2 - 0.002)
      ]);
      // Bottom face
      lines.push([
        new THREE.Vector3(midX + xOff, -h / 2 - 0.002, -b / 2),
        new THREE.Vector3(midX + xOff, -h / 2 - 0.002, b / 2)
      ]);
    });
    return lines;
  }, [h, b, crackScale]);

  // Shear Cracks: inclined lines (~45 degrees) near supports
  const shearCracks = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    // Left support inclined cracks (oriented /)
    [-L / 2 + 0.25, -L / 2 + 0.55].forEach((xStart) => {
      const dx = h * 0.9 * crackScale;
      const dy = h * 0.75 * crackScale;
      lines.push([
        new THREE.Vector3(xStart, -h / 2, b / 2 + 0.002),
        new THREE.Vector3(xStart + dx, -h / 2 + dy, b / 2 + 0.002)
      ]);
    });

    // Right support inclined cracks (oriented \)
    [L / 2 - 0.25, L / 2 - 0.55].forEach((xStart) => {
      const dx = h * 0.9 * crackScale;
      const dy = h * 0.75 * crackScale;
      lines.push([
        new THREE.Vector3(xStart, -h / 2, b / 2 + 0.002),
        new THREE.Vector3(xStart - dx, -h / 2 + dy, b / 2 + 0.002)
      ]);
    });

    return lines;
  }, [L, h, b, crackScale]);

  // Torsional Cracks: 45-degree spirals continuous across faces
  const torsionalCracks = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    [-0.5, 0.2].forEach((x) => {
      // Front
      lines.push([
        new THREE.Vector3(x, -h / 2, b / 2 + 0.002),
        new THREE.Vector3(x + 0.35, h / 2, b / 2 + 0.002)
      ]);
      // Top
      lines.push([
        new THREE.Vector3(x + 0.35, h / 2 + 0.002, b / 2),
        new THREE.Vector3(x + 0.35 + b, h / 2 + 0.002, -b / 2)
      ]);
    });
    return lines;
  }, [h, b]);

  return (
    <group>
      {/* Flexural Cracks (Đỏ/Đen) */}
      {isFlex &&
        flexuralCracks.map(([p1, p2], idx) => (
          <Line key={`crack-flex-${idx}`} points={[p1, p2]} color="#B91C1C" lineWidth={2.5} />
        ))}

      {/* Shear Cracks */}
      {isShear &&
        shearCracks.map(([p1, p2], idx) => (
          <Line key={`crack-shear-${idx}`} points={[p1, p2]} color="#C2410C" lineWidth={3.0} />
        ))}

      {/* Torsional Cracks */}
      {isTorsion &&
        torsionalCracks.map(([p1, p2], idx) => (
          <Line key={`crack-tor-${idx}`} points={[p1, p2]} color="#7C2D12" lineWidth={2.5} />
        ))}
    </group>
  );
};
