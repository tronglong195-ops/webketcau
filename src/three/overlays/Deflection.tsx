import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line, Text } from '@react-three/drei';

export interface DeflectionProps {
  beamLengthMm?: number;
  beamHeightMm?: number;
  qKnM?: number;              // Tải phân bố (kN/m)
  stiffnessB?: number;        // Độ cứng chống uốn B (kNm2)
  exaggeration?: number;      // Hệ số phóng đại (ví dụ 50x)
  scale?: number;
}

export const Deflection: React.FC<DeflectionProps> = ({
  beamLengthMm = 3000,
  beamHeightMm = 400,
  qKnM = 20,
  stiffnessB = 12000,
  exaggeration = 50,
  scale = 0.001
}) => {
  const L = beamLengthMm * scale;
  const h = beamHeightMm * scale;
  const L_m = beamLengthMm / 1000;

  // Real max deflection f = 5 * q * L^4 / (384 * B) in meters
  // q in kN/m, L in m, B in kN.m^2 -> f in meters
  const realDeflectionM = (5 * qKnM * Math.pow(L_m, 4)) / (384 * stiffnessB);
  const realDeflectionMm = realDeflectionM * 1000;
  const allowableDeflectionMm = beamLengthMm / 200; // L/200

  // Deflected centerline points
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = 40;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const x = -L / 2 + u * L;
      const xm = u * L_m;
      // y(x) = q*x/(24*B) * (L^3 - 2*L*x^2 + x^3)
      const yDefM = (qKnM * xm / (24 * stiffnessB)) * (Math.pow(L_m, 3) - 2 * L_m * xm * xm + Math.pow(xm, 3));
      const yVis = -yDefM * exaggeration;
      pts.push(new THREE.Vector3(x, yVis, 0));
    }
    return pts;
  }, [L, L_m, qKnM, stiffnessB, exaggeration]);

  return (
    <group position={[0, -h / 2 - 0.2, 0]}>
      {/* Undeflected Axis */}
      <Line
        points={[new THREE.Vector3(-L / 2, 0, 0), new THREE.Vector3(L / 2, 0, 0)]}
        color="#94A3B8"
        lineWidth={1.5}
        dashed
        dashScale={40}
      />

      {/* Deflected Curve (Phóng đại) */}
      <Line points={points} color="#2563EB" lineWidth={3} />

      {/* Max Deflection Indicator at Midspan */}
      <Line
        points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -realDeflectionM * exaggeration, 0)]}
        color="#DC2626"
        lineWidth={2}
      />

      <Text
        position={[0, -realDeflectionM * exaggeration - 0.08, 0]}
        fontSize={0.065}
        color={realDeflectionMm <= allowableDeflectionMm ? '#16A34A' : '#DC2626'}
        anchorX="center"
        anchorY="top"
        outlineWidth={0.008}
        outlineColor="#FFFFFF"
      >
        f_max = {realDeflectionMm.toFixed(2)} mm {realDeflectionMm <= allowableDeflectionMm ? '≤' : '>'} [f] = {allowableDeflectionMm.toFixed(1)} mm (x{exaggeration})
      </Text>
    </group>
  );
};
