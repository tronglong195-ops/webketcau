import React from 'react';
import * as THREE from 'three';
import { Line, Text } from '@react-three/drei';

export interface StrainProfileProps {
  beamHeightMm?: number;
  hMm?: number;               // Alias for beamHeightMm
  xMm?: number;               // Neutral axis height x (mm)
  aMm?: number;               // Distance to rebar a (mm)
  epsB?: number;              // Concrete strain at edge (default 0.0035)
  epsS?: number;              // Steel strain at rebar level (default 0.005)
  position?: [number, number, number] | number[];
  scale?: number;
}

export const StrainProfile: React.FC<StrainProfileProps> = ({
  beamHeightMm,
  hMm,
  xMm = 120,
  aMm = 35,
  epsB = 0.0035,
  epsS = 0.0050,
  position = [0.6, 0, 0],
  scale = 0.001
}) => {
  const finalH = beamHeightMm ?? hMm ?? 400;
  const h = finalH * scale;
  const x = xMm * scale;
  const a = aMm * scale;
  const h0 = h - a;

  // Visual width scale for strain diagram
  const strainVisScale = 60;
  const wComp = epsB * strainVisScale;
  const wTens = epsS * strainVisScale;

  const yTop = h / 2;
  const yNA = h / 2 - x;
  const yTensRebar = -h / 2 + a;

  return (
    <group position={position as any}>
      {/* Vertical Reference Axis (zero strain line) */}
      <Line
        points={[new THREE.Vector3(0, yTop, 0), new THREE.Vector3(0, -h / 2, 0)]}
        color="#64748B"
        lineWidth={2}
      />

      {/* Compressive strain triangle: from (0, yNA) to (-wComp, yTop) */}
      <Line
        points={[
          new THREE.Vector3(0, yNA, 0),
          new THREE.Vector3(-wComp, yTop, 0),
          new THREE.Vector3(0, yTop, 0)
        ]}
        color="#2563EB"
        lineWidth={2.5}
      />

      {/* Tensile strain triangle: from (0, yNA) to (wTens, yTensRebar) */}
      <Line
        points={[
          new THREE.Vector3(0, yNA, 0),
          new THREE.Vector3(wTens, yTensRebar, 0),
          new THREE.Vector3(0, yTensRebar, 0)
        ]}
        color="#DC2626"
        lineWidth={2.5}
      />

      {/* Labels */}
      <Text
        position={[-wComp - 0.08, yTop, 0]}
        fontSize={0.055}
        color="#2563EB"
        anchorX="right"
      >
        ε_b = {(epsB * 1000).toFixed(2)}‰ (≤ 3.5‰)
      </Text>

      <Text
        position={[wTens + 0.08, yTensRebar, 0]}
        fontSize={0.055}
        color="#DC2626"
        anchorX="left"
      >
        ε_s = {(epsS * 1000).toFixed(2)}‰ (≥ ε_s,el)
      </Text>

      <Text
        position={[0.1, yNA, 0]}
        fontSize={0.05}
        color="#D97706"
        anchorX="left"
      >
        Trục trung hòa (x = {Math.round(xMm)} mm)
      </Text>
    </group>
  );
};
