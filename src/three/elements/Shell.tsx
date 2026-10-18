import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, COLORS } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export type ShellType = 'dome' | 'cylindrical' | 'hypar';

export interface ShellProps {
  type?: ShellType;
  spanXMm?: number;           // Span Lx (mm)
  spanYMm?: number;           // Span Ly (mm)
  riseMm?: number;            // Rise f (chiều cao cong f1, f2) (mm)
  thicknessMm?: number;       // Chiều dày vỏ delta (mm)
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  scale?: number;
}

export const Shell: React.FC<ShellProps> = ({
  type = 'dome',
  spanXMm = 6000,
  spanYMm = 6000,
  riseMm = 1200,
  thicknessMm = 60,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  scale = 0.001
}) => {
  const Lx = spanXMm * scale;
  const Ly = spanYMm * scale;
  const f = riseMm * scale;
  const t = thicknessMm * scale;

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray, 0.55);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  // Curved Parametric Surface
  const shellGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const nx = 30;
    const ny = 30;
    const positions: number[] = [];
    const indices: number[] = [];

    for (let j = 0; j <= ny; j++) {
      const v = j / ny;
      const yCoord = (v - 0.5) * Ly;
      for (let i = 0; i <= nx; i++) {
        const u = i / nx;
        const xCoord = (u - 0.5) * Lx;

        let zCoord = 0;
        if (type === 'dome') {
          // Double curved positive curvature: z = f * (1 - 4*x^2/Lx^2) * (1 - 4*y^2/Ly^2)
          zCoord = f * (1 - (4 * xCoord * xCoord) / (Lx * Lx)) * (1 - (4 * yCoord * yCoord) / (Ly * Ly));
        } else if (type === 'cylindrical') {
          // Cylindrical vault
          zCoord = f * (1 - (4 * xCoord * xCoord) / (Lx * Lx));
        } else {
          // Hypar (hyperbolic paraboloid): z = f * (4 * x * y) / (Lx * Ly)
          zCoord = (f * 4 * xCoord * yCoord) / (Lx * Ly);
        }

        // We place zCoord as vertical Y
        positions.push(xCoord, zCoord, yCoord);
      }
    }

    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const a = j * (nx + 1) + i;
        const b = a + 1;
        const c = (j + 1) * (nx + 1) + i;
        const d = c + 1;

        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [type, Lx, Ly, f]);

  return (
    <group>
      {/* Shell surface */}
      <mesh geometry={shellGeometry} material={concreteMat} />

      {/* Edge Beams (Dầm biên) */}
      <mesh position={[0, -0.05, Ly / 2]} material={concreteMat}>
        <boxGeometry args={[Lx, 0.25, 0.15]} />
      </mesh>
      <mesh position={[0, -0.05, -Ly / 2]} material={concreteMat}>
        <boxGeometry args={[Lx, 0.25, 0.15]} />
      </mesh>
      <mesh position={[Lx / 2, -0.05, 0]} material={concreteMat}>
        <boxGeometry args={[0.15, 0.25, Ly]} />
      </mesh>
      <mesh position={[-Lx / 2, -0.05, 0]} material={concreteMat}>
        <boxGeometry args={[0.15, 0.25, Ly]} />
      </mesh>

      {/* Dimensions */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[-Lx / 2, -0.2, Ly / 2 + 0.2]}
            end={[Lx / 2, -0.2, Ly / 2 + 0.2]}
            valueMm={spanXMm}
            label={`L_x = ${spanXMm} mm`}
          />
          <DimensionLine
            start={[Lx / 2 + 0.2, -0.2, -Ly / 2]}
            end={[Lx / 2 + 0.2, -0.2, Ly / 2]}
            valueMm={spanYMm}
            label={`L_y = ${spanYMm} mm`}
          />
          <DimensionLine
            start={[0, 0, 0]}
            end={[0, f, 0]}
            valueMm={riseMm}
            label={`f = ${riseMm} mm`}
          />
        </group>
      )}
    </group>
  );
};
