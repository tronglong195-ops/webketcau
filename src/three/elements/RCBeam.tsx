import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, COLORS } from '../common/materials';
import { RebarCage, RebarCageProps } from '../rebar/RebarCage';
import { DimensionLine } from '../common/Dimensions3D';

export type BeamCrossSection = 'rect' | 'T' | 'I';

export interface RCBeamProps {
  type?: BeamCrossSection;
  bMm?: number;               // Web width b (mm)
  widthMm?: number;           // Alias for bMm
  hMm?: number;               // Total height h (mm)
  heightMm?: number;          // Alias for hMm
  lengthMm?: number;          // Span length L (mm)
  bfMm?: number;              // Top flange width b'f (mm) for T or I beam
  hfMm?: number;              // Top flange thickness h'f (mm) for T or I beam
  bfBottomMm?: number;        // Bottom flange width for I beam
  hfBottomMm?: number;        // Bottom flange thickness for I beam
  stirrupSpacingMm?: number;  // Alias for stirrup spacing
  isXray?: boolean;           // Show transparent concrete
  wireframe?: boolean;
  showRebars?: boolean;
  showDimensions?: boolean;
  rebarProps?: Partial<RebarCageProps>;
  scale?: number;
}

export const RCBeam: React.FC<RCBeamProps> = ({
  type = 'rect',
  bMm,
  widthMm,
  hMm,
  heightMm,
  lengthMm = 3000,
  bfMm = 600,
  hfMm = 80,
  bfBottomMm = 400,
  hfBottomMm = 80,
  stirrupSpacingMm,
  isXray = false,
  wireframe = false,
  showRebars = true,
  showDimensions = true,
  rebarProps = {},
  scale = 0.001
}) => {
  const finalB = bMm ?? widthMm ?? 200;
  const finalH = hMm ?? heightMm ?? 400;
  const b = finalB * scale;
  const h = finalH * scale;
  const L = lengthMm * scale;
  const bf = bfMm * scale;
  const hf = hfMm * scale;
  const bfBot = bfBottomMm * scale;
  const hfBot = hfBottomMm * scale;

  const mergedRebarProps: Partial<RebarCageProps> = {
    ...rebarProps,
    stirrupSpacingMidspan: stirrupSpacingMm ?? rebarProps.stirrupSpacingMidspan ?? 200,
    stirrupSpacingSupport: stirrupSpacingMm ?? rebarProps.stirrupSpacingSupport ?? 100
  };

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  // Generate Extruded Shape for cross section along X
  const beamGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    if (type === 'rect') {
      // Y from -h/2 to h/2, Z from -b/2 to b/2
      shape.moveTo(-b / 2, -h / 2);
      shape.lineTo(b / 2, -h / 2);
      shape.lineTo(b / 2, h / 2);
      shape.lineTo(-b / 2, h / 2);
      shape.closePath();
    } else if (type === 'T') {
      // T-beam: web is b wide, top flange is bf wide and hf thick
      // Bottom face of web
      shape.moveTo(-b / 2, -h / 2);
      shape.lineTo(b / 2, -h / 2);
      // Up to flange bottom
      shape.lineTo(b / 2, h / 2 - hf);
      // Right out to flange tip
      shape.lineTo(bf / 2, h / 2 - hf);
      // Up to flange top
      shape.lineTo(bf / 2, h / 2);
      // Left along flange top
      shape.lineTo(-bf / 2, h / 2);
      // Down to flange bottom
      shape.lineTo(-bf / 2, h / 2 - hf);
      // In to web
      shape.lineTo(-b / 2, h / 2 - hf);
      shape.closePath();
    } else {
      // I-beam
      shape.moveTo(-bfBot / 2, -h / 2);
      shape.lineTo(bfBot / 2, -h / 2);
      shape.lineTo(bfBot / 2, -h / 2 + hfBot);
      shape.lineTo(b / 2, -h / 2 + hfBot);
      shape.lineTo(b / 2, h / 2 - hf);
      shape.lineTo(bf / 2, h / 2 - hf);
      shape.lineTo(bf / 2, h / 2);
      shape.lineTo(-bf / 2, h / 2);
      shape.lineTo(-bf / 2, h / 2 - hf);
      shape.lineTo(-b / 2, h / 2 - hf);
      shape.lineTo(-b / 2, -h / 2 + hfBot);
      shape.lineTo(-bfBot / 2, -h / 2 + hfBot);
      shape.closePath();
    }

    const extrudeSettings = {
      steps: 1,
      depth: L,
      bevelEnabled: false
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center along X
    geom.rotateY(Math.PI / 2);
    geom.translate(-L / 2, 0, 0);
    return geom;
  }, [type, b, h, L, bf, hf, bfBot, hfBot]);

  return (
    <group>
      {/* Concrete Body */}
      <mesh geometry={beamGeometry} material={concreteMat} />

      {/* Internal Rebar Cage */}
      {showRebars && (
        <RebarCage
          bMm={finalB}
          hMm={finalH}
          lengthMm={lengthMm}
          scale={scale}
          {...mergedRebarProps}
        />
      )}

      {/* 3D Dimensions */}
      {showDimensions && (
        <group>
          {/* Length L along X */}
          <DimensionLine
            start={[-L / 2, -h / 2, b / 2 + 0.1]}
            end={[L / 2, -h / 2, b / 2 + 0.1]}
            valueMm={lengthMm}
            label={`L = ${lengthMm} mm`}
          />
          {/* Height h along Y */}
          <DimensionLine
            start={[L / 2 + 0.1, -h / 2, 0]}
            end={[L / 2 + 0.1, h / 2, 0]}
            valueMm={hMm}
            label={`h = ${hMm} mm`}
          />
          {/* Width b along Z */}
          <DimensionLine
            start={[L / 2 + 0.1, -h / 2, -b / 2]}
            end={[L / 2 + 0.1, -h / 2, b / 2]}
            valueMm={bMm}
            label={`b = ${bMm} mm`}
          />
          {/* Flange width for T-beam */}
          {type === 'T' && (
            <DimensionLine
              start={[L / 2 + 0.1, h / 2 + 0.05, -bf / 2]}
              end={[L / 2 + 0.1, h / 2 + 0.05, bf / 2]}
              valueMm={bfMm}
              label={`b'f = ${bfMm} mm`}
            />
          )}
        </group>
      )}
    </group>
  );
};
