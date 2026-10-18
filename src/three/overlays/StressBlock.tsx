import React from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { COLORS } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export interface StressBlockProps {
  bMm?: number;               // Width b (mm)
  hMm?: number;               // Height h (mm)
  aMm?: number;               // Distance a to rebar centroid (mm)
  xMm?: number;               // Compressive zone depth x (mm)
  xiR?: number;               // Boundary relative depth xi_R
  lengthMm?: number;          // Section length slice (mm)
  RbMpa?: number;             // Concrete design strength Rb (MPa)
  RsMpa?: number;             // Steel design strength Rs (MPa)
  position?: [number, number, number] | number[];
  scale?: number;
}

export const StressBlock: React.FC<StressBlockProps> = ({
  bMm = 200,
  hMm = 400,
  aMm = 35,
  xMm = 120,
  xiR = 0.58,
  lengthMm = 600,
  RbMpa = 14.5,
  RsMpa = 280,
  position,
  scale = 0.001
}) => {
  const b = bMm * scale;
  const h = hMm * scale;
  const a = aMm * scale;
  const h0 = h - a;
  const x = Math.min(xMm * scale, h0);
  const L = lengthMm * scale;
  const xi = h0 > 0 ? (xMm * scale) / h0 : 0;
  const isOverReinforced = xi > xiR;

  // Lever arm zb = h0 - 0.5*x
  const zb = h0 - 0.5 * x;

  // Top of beam is at y = h/2
  // Compressive stress block goes from y = h/2 down to y = h/2 - x
  const yBlockCenter = h / 2 - x / 2;
  const yTensionCentroid = -h / 2 + a;

  return (
    <group position={position as any}>
      {/* Ghost Beam Section Outline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[L, h, b]} />
        <meshStandardMaterial
          color="#94A3B8"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Compressive Stress Block (Khối ứng suất vùng nén Rb) */}
      <mesh position={[0, yBlockCenter, 0]}>
        <boxGeometry args={[L, x, b]} />
        <meshStandardMaterial
          color={isOverReinforced ? '#EF4444' : '#38BDF8'}
          transparent
          opacity={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Neutral Axis Plane (Trục trung hòa) */}
      <mesh position={[0, h / 2 - x, 0]}>
        <planeGeometry args={[L + 0.1, b + 0.1]} />
        <meshBasicMaterial color="#EAB308" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      <Text
        position={[L / 2 + 0.15, h / 2 - x, 0]}
        fontSize={0.06}
        color="#B45309"
        anchorX="left"
      >
        Trục trung hòa (x = {Math.round(xMm)} mm)
      </Text>

      {/* Resultant Compressive Force Arrow: Nb = Rb * b * x */}
      <group position={[0, yBlockCenter, 0]}>
        {/* Blue compressive force vector */}
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 12]} />
          <meshBasicMaterial color="#1E4FD8" />
        </mesh>
        <mesh position={[0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.03, 0.08, 12]} />
          <meshBasicMaterial color="#1E4FD8" />
        </mesh>
        <Text
          position={[0.22, 0.06, 0]}
          fontSize={0.055}
          color="#1E4FD8"
          anchorX="center"
        >
          Nb = Rb·b·x
        </Text>
      </group>

      {/* Resultant Tensile Force Arrow: Ns = Rs * As */}
      <group position={[0, yTensionCentroid, 0]}>
        {/* Red tensile force vector */}
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 12]} />
          <meshBasicMaterial color="#DC2626" />
        </mesh>
        <mesh position={[0.38, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.03, 0.08, 12]} />
          <meshBasicMaterial color="#DC2626" />
        </mesh>
        <Text
          position={[0.2, -0.06, 0]}
          fontSize={0.055}
          color="#DC2626"
          anchorX="center"
        >
          Ns = Rs·As
        </Text>
      </group>

      {/* Internal Lever Arm zb line */}
      <DimensionLine
        start={[L / 2 + 0.05, yTensionCentroid, b / 2 + 0.05]}
        end={[L / 2 + 0.05, yBlockCenter, b / 2 + 0.05]}
        label={`zb = ${(h0 - 0.5 * x) / scale} mm`}
        color="#7C3AED"
      />

      {/* Status banner / indicator text */}
      <Text
        position={[0, h / 2 + 0.15, 0]}
        fontSize={0.065}
        color={isOverReinforced ? '#DC2626' : '#15803D'}
        anchorX="center"
        outlineWidth={0.008}
        outlineColor="#FFFFFF"
      >
        {isOverReinforced
          ? `⚠️ ξ = ${xi.toFixed(3)} > ξR = ${xiR} (Phá hoại giòn dòn - Quá nhiều cốt thép!)`
          : `✅ ξ = ${xi.toFixed(3)} ≤ ξR = ${xiR} (Phá hoại dẻo - Đạt điều kiện hạn chế)`}
      </Text>
    </group>
  );
};
