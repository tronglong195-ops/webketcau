import React from 'react';
import * as THREE from 'three';
import { Line, Text } from '@react-three/drei';
import { COLORS } from './materials';

interface DimensionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  offset?: [number, number, number];
  label?: string;
  valueMm?: number;
  color?: string;
}

export const DimensionLine: React.FC<DimensionLineProps> = ({
  start,
  end,
  offset = [0, 0, 0],
  label,
  valueMm,
  color = COLORS.dimension
}) => {
  const p1 = new THREE.Vector3(...start).add(new THREE.Vector3(...offset));
  const p2 = new THREE.Vector3(...end).add(new THREE.Vector3(...offset));
  
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const textLabel = label || (valueMm !== undefined ? `${Math.round(valueMm)} mm` : '');

  // Direction vector
  const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const tickDir = new THREE.Vector3().crossVectors(dir, up).normalize();
  if (tickDir.lengthSq() < 0.01) {
    tickDir.set(1, 0, 0);
  }
  const tickLen = 0.05;

  const t1_a = p1.clone().addScaledVector(tickDir, tickLen);
  const t1_b = p1.clone().addScaledVector(tickDir, -tickLen);
  const t2_a = p2.clone().addScaledVector(tickDir, tickLen);
  const t2_b = p2.clone().addScaledVector(tickDir, -tickLen);

  return (
    <group>
      {/* Main dimension line */}
      <Line
        points={[p1, p2]}
        color={color}
        lineWidth={1.5}
      />
      {/* Tick 1 */}
      <Line
        points={[t1_a, t1_b]}
        color={color}
        lineWidth={1.5}
      />
      {/* Tick 2 */}
      <Line
        points={[t2_a, t2_b]}
        color={color}
        lineWidth={1.5}
      />
      {/* Extension lines if offset is non-zero */}
      {(offset[0] !== 0 || offset[1] !== 0 || offset[2] !== 0) && (
        <>
          <Line
            points={[new THREE.Vector3(...start), p1]}
            color="#94A3B8"
            lineWidth={0.8}
            dashed
            dashScale={50}
          />
          <Line
            points={[new THREE.Vector3(...end), p2]}
            color="#94A3B8"
            lineWidth={0.8}
            dashed
            dashScale={50}
          />
        </>
      )}
      {/* Dimension Label */}
      {textLabel && (
        <Text
          position={[mid.x, mid.y + 0.06, mid.z]}
          fontSize={0.07}
          color={COLORS.dimensionText}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#FFFFFF"
        >
          {textLabel}
        </Text>
      )}
    </group>
  );
};
