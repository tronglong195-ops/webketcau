import React from 'react';
import * as THREE from 'three';
import { getConcreteMaterial } from '../common/materials';
import { RebarCage } from '../rebar/RebarCage';

export interface ExplodedViewProps {
  explodeDistance?: number;   // Khoảng cách nổ (0.0: bình thường, 0.5: nổ rộng)
  bMm?: number;
  hMm?: number;
  lengthMm?: number;
  scale?: number;
}

export const ExplodedView: React.FC<ExplodedViewProps> = ({
  explodeDistance = 0.25,
  bMm = 200,
  hMm = 400,
  lengthMm = 2500,
  scale = 0.001
}) => {
  const b = bMm * scale;
  const h = hMm * scale;
  const L = lengthMm * scale;
  const d = explodeDistance;

  const concreteMat = getConcreteMaterial(false, 0.6);

  return (
    <group>
      {/* Central Rebar Cage stays intact in the middle */}
      <RebarCage
        bMm={bMm}
        hMm={hMm}
        lengthMm={lengthMm}
        scale={scale}
      />

      {/* Concrete Shell Top Half moved up */}
      <mesh position={[0, h / 4 + d, 0]} material={concreteMat}>
        <boxGeometry args={[L, h / 2, b]} />
      </mesh>

      {/* Concrete Shell Bottom Half moved down */}
      <mesh position={[0, -h / 4 - d, 0]} material={concreteMat}>
        <boxGeometry args={[L, h / 2, b]} />
      </mesh>

      {/* Side covers moved sideways */}
      <mesh position={[0, 0, b / 2 + d]} material={concreteMat}>
        <boxGeometry args={[L, h, 0.02]} />
      </mesh>
      <mesh position={[0, 0, -b / 2 - d]} material={concreteMat}>
        <boxGeometry args={[L, h, 0.02]} />
      </mesh>
    </group>
  );
};
