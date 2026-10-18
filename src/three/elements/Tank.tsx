import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteMaterial, getSteelMaterial } from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export type TankType = 'circular' | 'rectangular';

export interface TankProps {
  type?: TankType;
  diameterMm?: number;        // Bể tròn: Đường kính D (mm)
  radiusMm?: number;          // Alias for diameterMm / 2
  widthMm?: number;           // Bể chữ nhật: B (mm)
  lengthMm?: number;          // Bể chữ nhật: L (mm)
  heightMm?: number;          // Chiều cao H (mm)
  wallThickMm?: number;       // Chiều dày thành (mm)
  wallThicknessMm?: number;   // Alias for wallThickMm
  waterLevelPct?: number;     // Mực nước trong bể (%)
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  scale?: number;
}

export const Tank: React.FC<TankProps> = ({
  type = 'circular',
  diameterMm,
  radiusMm,
  widthMm = 3000,
  lengthMm = 4000,
  heightMm = 2500,
  wallThickMm,
  wallThicknessMm,
  waterLevelPct = 80,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  scale = 0.001
}) => {
  const finalDiam = diameterMm ?? (radiusMm ? radiusMm * 2 : 3000);
  const finalWall = wallThickMm ?? wallThicknessMm ?? 200;
  const D = finalDiam * scale;
  const R = D / 2;
  const B = widthMm * scale;
  const L = lengthMm * scale;
  const H = heightMm * scale;
  const t = finalWall * scale;
  const tBase = t * 1.25;

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray, 0.5);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const waterMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0284C7',
        transparent: true,
        opacity: 0.35,
        roughness: 0.1
      }),
    []
  );

  return (
    <group>
      {type === 'circular' ? (
        <group>
          {/* Base slab */}
          <mesh position={[0, -H / 2 - tBase / 2, 0]} material={concreteMat}>
            <cylinderGeometry args={[R + t * 1.5, R + t * 1.5, tBase, 32]} />
          </mesh>

          {/* Cylindrical Wall (outer & inner) */}
          <mesh position={[0, 0, 0]} material={concreteMat}>
            <cylinderGeometry args={[R + t / 2, R + t / 2, H, 32, 1, true]} />
          </mesh>

          {/* Water Volume */}
          <mesh
            position={[0, -H / 2 + (H * (waterLevelPct / 100)) / 2, 0]}
            material={waterMat}
          >
            <cylinderGeometry args={[R - 0.01, R - 0.01, H * (waterLevelPct / 100), 32]} />
          </mesh>

          {/* Hoop Tension Rebars (Thép vòng chịu kéo) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = -H / 2 + 0.15 + (i * (H - 0.3)) / 7;
            return (
              <mesh key={`tank-hoop-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={tensionMat}>
                <torusGeometry args={[R, 0.007, 8, 32]} />
              </mesh>
            );
          })}

          {/* Dimensions */}
          {showDimensions && (
            <group>
              <DimensionLine
                start={[-R - t, -H / 2 - tBase - 0.15, 0]}
                end={[R + t, -H / 2 - tBase - 0.15, 0]}
                valueMm={finalDiam + 2 * finalWall}
                label={`D_ngoài = ${finalDiam + 2 * finalWall} mm`}
              />
              <DimensionLine
                start={[R + t + 0.2, -H / 2, 0]}
                end={[R + t + 0.2, H / 2, 0]}
                valueMm={heightMm}
                label={`H = ${heightMm} mm`}
              />
            </group>
          )}
        </group>
      ) : (
        <group>
          {/* Rectangular Tank */}
          {/* Bottom slab */}
          <mesh position={[0, -H / 2 - tBase / 2, 0]} material={concreteMat}>
            <boxGeometry args={[L + 2 * t, tBase, B + 2 * t]} />
          </mesh>

          {/* Walls */}
          {/* Long walls */}
          <mesh position={[0, 0, B / 2 + t / 2]} material={concreteMat}>
            <boxGeometry args={[L + 2 * t, H, t]} />
          </mesh>
          <mesh position={[0, 0, -B / 2 - t / 2]} material={concreteMat}>
            <boxGeometry args={[L + 2 * t, H, t]} />
          </mesh>
          {/* Short walls */}
          <mesh position={[L / 2 + t / 2, 0, 0]} material={concreteMat}>
            <boxGeometry args={[t, H, B]} />
          </mesh>
          <mesh position={[-L / 2 - t / 2, 0, 0]} material={concreteMat}>
            <boxGeometry args={[t, H, B]} />
          </mesh>

          {/* Water */}
          <mesh
            position={[0, -H / 2 + (H * (waterLevelPct / 100)) / 2, 0]}
            material={waterMat}
          >
            <boxGeometry args={[L, H * (waterLevelPct / 100), B]} />
          </mesh>

          {/* Dimensions */}
          {showDimensions && (
            <group>
              <DimensionLine
                start={[-L / 2, -H / 2, B / 2 + t + 0.2]}
                end={[L / 2, -H / 2, B / 2 + t + 0.2]}
                valueMm={lengthMm}
                label={`L = ${lengthMm} mm`}
              />
              <DimensionLine
                start={[L / 2 + t + 0.2, -H / 2, -B / 2]}
                end={[L / 2 + t + 0.2, -H / 2, B / 2]}
                valueMm={widthMm}
                label={`B = ${widthMm} mm`}
              />
            </group>
          )}
        </group>
      )}
    </group>
  );
};
