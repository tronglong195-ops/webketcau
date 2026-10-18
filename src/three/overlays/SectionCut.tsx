import React from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export interface SectionCutProps {
  cutPositionX?: number;      // Position along member (-L/2 to L/2)
  beamHeightMm?: number;
  beamWidthMm?: number;
  showHatch?: boolean;
  scale?: number;
}

export const SectionCut: React.FC<SectionCutProps> = ({
  cutPositionX = 0,
  beamHeightMm = 400,
  beamWidthMm = 200,
  showHatch = true,
  scale = 0.001
}) => {
  const h = beamHeightMm * scale;
  const b = beamWidthMm * scale;

  return (
    <group position={[cutPositionX, 0, 0]}>
      {/* Cut Plane representation (Yellow/Cyan translucent sheet) */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[b + 0.1, h + 0.1]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Frame of cut plane */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[Math.min(b, h) * 0.45, Math.min(b, h) * 0.47, 4]} />
        <meshBasicMaterial color="#B45309" side={THREE.DoubleSide} />
      </mesh>

      <Text
        position={[0, h / 2 + 0.1, 0]}
        fontSize={0.06}
        color="#B45309"
        anchorX="center"
        outlineWidth={0.008}
        outlineColor="#FFFFFF"
      >
        Mặt cắt 1-1 (x = {(cutPositionX / scale).toFixed(0)} mm)
      </Text>
    </group>
  );
};
