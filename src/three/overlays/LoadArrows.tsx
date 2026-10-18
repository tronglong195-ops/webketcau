import React from 'react';
import * as THREE from 'three';
import { Line, Text } from '@react-three/drei';
import { COLORS } from '../common/materials';

export interface LoadArrowsProps {
  beamLengthMm?: number;
  beamHeightMm?: number;
  qKnM?: number;              // Tải phân bố q (kN/m)
  pKn?: number;               // Tải tập trung P (kN)
  arrowCount?: number;        // Số lượng mũi tên phân bố
  type?: string;
  positions?: number[][];
  direction?: string;
  label?: string;
  scale?: number;
}

export const LoadArrows: React.FC<LoadArrowsProps> = ({
  beamLengthMm = 3000,
  beamHeightMm = 400,
  qKnM = 25,
  pKn = 0,
  arrowCount = 11,
  type,
  positions,
  direction,
  label,
  scale = 0.001
}) => {
  const L = beamLengthMm * scale;
  const h = beamHeightMm * scale;
  const arrowLen = 0.35;
  const yTopBeam = h / 2;
  const yLoadBar = yTopBeam + arrowLen;

  const arrowXs = Array.from({ length: arrowCount }, (_, i) => {
    return -L / 2 + 0.1 + (i * (L - 0.2)) / (arrowCount - 1);
  });

  return (
    <group>
      {/* Distributed load q */}
      {qKnM > 0 && (
        <group>
          {/* Top connecting load bar */}
          <Line
            points={[
              new THREE.Vector3(-L / 2 + 0.1, yLoadBar, 0),
              new THREE.Vector3(L / 2 - 0.1, yLoadBar, 0)
            ]}
            color={COLORS.arrowForce}
            lineWidth={3}
          />
          {/* Array of downward arrows */}
          {arrowXs.map((x, idx) => (
            <group key={`q-arrow-${idx}`} position={[x, yTopBeam + arrowLen / 2, 0]}>
              {/* Arrow shaft */}
              <mesh>
                <cylinderGeometry args={[0.006, 0.006, arrowLen, 8]} />
                <meshBasicMaterial color={COLORS.arrowForce} />
              </mesh>
              {/* Downward cone tip */}
              <mesh position={[0, -arrowLen / 2 + 0.03, 0]} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.02, 0.06, 8]} />
                <meshBasicMaterial color={COLORS.arrowForce} />
              </mesh>
            </group>
          ))}
          {/* Label */}
          <Text
            position={[0, yLoadBar + 0.08, 0]}
            fontSize={0.07}
            color={COLORS.arrowForce}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.008}
            outlineColor="#FFFFFF"
          >
            q = {qKnM} kN/m
          </Text>
        </group>
      )}

      {/* Concentrated Load P */}
      {pKn > 0 && (
        <group position={[0, yTopBeam + 0.3, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.4, 12]} />
            <meshBasicMaterial color="#B91C1C" />
          </mesh>
          <mesh position={[0, 0.03, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.045, 0.1, 12]} />
            <meshBasicMaterial color="#B91C1C" />
          </mesh>
          <Text
            position={[0, 0.45, 0]}
            fontSize={0.08}
            color="#B91C1C"
            anchorX="center"
          >
            P = {pKn} kN
          </Text>
        </group>
      )}
    </group>
  );
};
