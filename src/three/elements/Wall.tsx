import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, getSteelMaterial } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export interface WallProps {
  heightMm?: number;          // Total wall height H (mm)
  stemThickTopMm?: number;    // Stem thickness at top (mm)
  stemThickBotMm?: number;    // Stem thickness at bottom (mm)
  thicknessMm?: number;       // Alias for stemThickBotMm
  baseWidthMm?: number;       // Base slab width B (mm)
  baseThickMm?: number;       // Base slab thickness (mm)
  toeWidthMm?: number;        // Toe width (mm)
  lengthMm?: number;          // Length along wall (mm)
  hasButtress?: boolean;      // Có sườn tăng cứng (thành chống)
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  scale?: number;
}

export const Wall: React.FC<WallProps> = ({
  heightMm = 3500,
  stemThickTopMm,
  stemThickBotMm,
  thicknessMm,
  baseWidthMm = 2200,
  baseThickMm = 400,
  toeWidthMm = 600,
  lengthMm = 3000,
  hasButtress = false,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  scale = 0.001
}) => {
  const H = heightMm * scale;
  const finalBot = stemThickBotMm ?? thicknessMm ?? 400;
  const finalTop = stemThickTopMm ?? thicknessMm ?? 200;
  const tTop = finalTop * scale;
  const tBot = finalBot * scale;
  const B = baseWidthMm * scale;
  const tBase = baseThickMm * scale;
  const toe = toeWidthMm * scale;
  const L = lengthMm * scale;
  const Hstem = H - tBase;

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const compMat = useMemo(() => getSteelMaterial('compression'), []);

  // Stem cross-section shape (in Y-Z plane, extruded along X)
  const wallShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Base slab: from z = -toe to z = B - toe, y from 0 to tBase
    shape.moveTo(-toe, 0);
    shape.lineTo(B - toe, 0);
    shape.lineTo(B - toe, tBase);
    shape.lineTo(tBot, tBase);
    // Vertical stem: inner face slopes from tBot to tTop
    shape.lineTo(tTop, H);
    // Top of stem
    shape.lineTo(0, H);
    // Outer front face (vertical)
    shape.lineTo(0, tBase);
    shape.lineTo(-toe, tBase);
    shape.closePath();
    return shape;
  }, [H, tTop, tBot, B, tBase, toe]);

  const geom = useMemo(() => {
    const extrudeSettings = { steps: 1, depth: L, bevelEnabled: false };
    const g = new THREE.ExtrudeGeometry(wallShape, extrudeSettings);
    g.rotateY(Math.PI / 2);
    g.translate(-L / 2, -H / 2, 0);
    return g;
  }, [wallShape, L, H]);

  return (
    <group>
      {/* Wall Concrete Shell */}
      <mesh geometry={geom} material={concreteMat} />

      {/* Main Tensile Vertical Rebar inside Stem (back face where earth pressure acts) */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = -L / 2 + 0.15 + (i * (L - 0.3)) / 8;
        return (
          <mesh
            key={`wall-vert-bar-${i}`}
            position={[x, 0, tBot - 0.05]}
            material={tensionMat}
          >
            <cylinderGeometry args={[0.008, 0.008, Hstem - 0.1, 8]} />
          </mesh>
        );
      })}

      {/* Buttress ribs if specified */}
      {hasButtress && (
        <group>
          {[-L / 3, L / 3].map((bx, idx) => (
            <mesh key={`buttress-${idx}`} position={[bx, 0, (B - toe) / 2]} material={concreteMat}>
              <boxGeometry args={[0.25, Hstem, (B - toe) - tBot]} />
            </mesh>
          ))}
        </group>
      )}

      {/* Dimensions */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[-L / 2 - 0.15, -H / 2, 0]}
            end={[-L / 2 - 0.15, H / 2, 0]}
            valueMm={heightMm}
            label={`H = ${heightMm} mm`}
          />
          <DimensionLine
            start={[0, -H / 2 - 0.15, -toe]}
            end={[0, -H / 2 - 0.15, B - toe]}
            valueMm={baseWidthMm}
            label={`B = ${baseWidthMm} mm`}
          />
        </group>
      )}
    </group>
  );
};
