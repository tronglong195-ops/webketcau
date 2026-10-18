import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getConcreteMaterial,
  getSteelMaterial,
  getLeanConcreteMaterial,
  getPunchingConeMaterial
} from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export type FootingType = 'isolated' | 'strip' | 'raft';

export interface FootingProps {
  type?: FootingType;
  bMm?: number;               // Bề rộng móng B (mm)
  lMm?: number;               // Chiều dài móng L (mm)
  lxMm?: number;              // Alias for lMm
  lyMm?: number;              // Alias for bMm
  hMm?: number;               // Tổng chiều cao móng H (mm)
  hStepMm?: number;           // Chiều cao bậc dưới h1 (mm)
  colBMm?: number;            // Chiều rộng cổ cột b_c (mm)
  colHMm?: number;            // Chiều cao cổ cột h_c (mm)
  colX?: number;              // Alias for colBMm
  colY?: number;              // Alias for colHMm
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  showPunchingCone?: boolean; // Hiển thị tháp đâm thủng 45 độ (Punching Shear Cone)
  showLeanConcrete?: boolean; // Hiển thị lớp bê tông lót móng 100mm
  scale?: number;
}

export const Footing: React.FC<FootingProps> = ({
  type = 'isolated',
  bMm,
  lMm,
  lxMm,
  lyMm,
  hMm = 700,
  hStepMm = 350,
  colBMm,
  colHMm,
  colX,
  colY,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  showPunchingCone = false,
  showLeanConcrete = true,
  scale = 0.001
}) => {
  const finalB = bMm ?? lyMm ?? 1800;
  const finalL = lMm ?? lxMm ?? 2400;
  const finalColB = colBMm ?? colX ?? 300;
  const finalColH = colHMm ?? colY ?? 400;
  const B = finalB * scale;
  const L = finalL * scale;
  const H = hMm * scale;
  const h1 = hStepMm * scale;
  const h2 = H - h1;
  const colB = finalColB * scale;
  const colH = finalColH * scale;
  const c = 0.05; // 50mm lớp bê tông bảo vệ móng

  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray, isXray ? 0.15 : 0.85);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const leanMat = useMemo(() => getLeanConcreteMaterial(), []);
  const punchingMat = useMemo(() => getPunchingConeMaterial(), []);
  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const compMat = useMemo(() => getSteelMaterial('compression'), []);
  const stirrupMat = useMemo(() => getSteelMaterial('stirrup'), []);

  // Lưới thép đáy móng
  const xRebarCount = 10;
  const yRebarCount = 12;
  const dBar = 0.014; // d14
  const hookLen = 0.12; // Móc bẻ mỏ 120mm

  // Kích thước bậc trên móng
  const topStepL = colH * 1.8;
  const topStepB = colB * 1.8;

  return (
    <group>
      {/* 1. Lớp bê tông lót móng 100mm (Lean Concrete Bedding) */}
      {showLeanConcrete && (
        <mesh position={[0, -H / 2 - 0.05, 0]} material={leanMat}>
          <boxGeometry args={[L + 0.2, 0.1, B + 0.2]} />
        </mesh>
      )}

      {/* 2. Bậc dưới móng (Base slab) */}
      <mesh position={[0, -H / 2 + h1 / 2, 0]} material={concreteMat}>
        <boxGeometry args={[L, h1, B]} />
      </mesh>

      {/* 3. Bậc trên móng (Pedestal / Top Step) */}
      {type === 'isolated' && (
        <mesh position={[0, -H / 2 + h1 + h2 / 2, 0]} material={concreteMat}>
          <boxGeometry args={[topStepL, h2, topStepB]} />
        </mesh>
      )}

      {type === 'strip' && (
        <mesh position={[0, -H / 2 + h1 + h2 / 2, 0]} material={concreteMat}>
          <boxGeometry args={[L, h2, colH * 1.5]} />
        </mesh>
      )}

      {/* 4. Cổ cột bê tông nhô lên chờ nối */}
      <mesh position={[0, H / 2 + 0.3, 0]} material={concreteMat}>
        <boxGeometry args={[colH, 0.6, colB]} />
      </mesh>

      {/* 5. Tháp đâm thủng 45 độ (Punching Shear Cone) */}
      {showPunchingCone && (
        <group position={[0, -H / 2 + h1 / 2, 0]}>
          <mesh material={punchingMat}>
            <cylinderGeometry
              args={[Math.min(colH, colB) * 1.2, Math.min(L, B) * 0.85, H, 4, 1, false, Math.PI / 4]}
            />
          </mesh>
        </group>
      )}

      {/* 6. Lưới cốt thép đáy móng (Phương X & Phương Y có bẻ mỏ góc 90 độ) */}
      {/* Thanh theo phương L (X) */}
      {Array.from({ length: xRebarCount }).map((_, i) => {
        const z = -B / 2 + c + (i * (B - 2 * c)) / (xRebarCount - 1);
        return (
          <group key={`ftg-rx-${i}`} position={[0, -H / 2 + c, z]}>
            {/* Thân thanh thép nằm ngang */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={tensionMat}>
              <cylinderGeometry args={[dBar / 2, dBar / 2, L - 2 * c, 8]} />
            </mesh>
            {/* Móc bẻ mỏ 90 độ ở 2 đầu */}
            <mesh position={[-L / 2 + c, hookLen / 2, 0]} material={tensionMat}>
              <cylinderGeometry args={[dBar / 2, dBar / 2, hookLen, 8]} />
            </mesh>
            <mesh position={[L / 2 - c, hookLen / 2, 0]} material={tensionMat}>
              <cylinderGeometry args={[dBar / 2, dBar / 2, hookLen, 8]} />
            </mesh>
          </group>
        );
      })}

      {/* Thanh theo phương B (Z) */}
      {Array.from({ length: yRebarCount }).map((_, i) => {
        const x = -L / 2 + c + (i * (L - 2 * c)) / (yRebarCount - 1);
        return (
          <group key={`ftg-ry-${i}`} position={[x, -H / 2 + c + dBar, 0]}>
            {/* Thân thanh thép nằm ngang */}
            <mesh rotation={[Math.PI / 2, 0, 0]} material={tensionMat}>
              <cylinderGeometry args={[dBar / 2, dBar / 2, B - 2 * c, 8]} />
            </mesh>
            {/* Móc bẻ mỏ 90 độ ở 2 đầu */}
            <mesh position={[0, hookLen / 2, -B / 2 + c]} material={tensionMat}>
              <cylinderGeometry args={[dBar / 2, dBar / 2, hookLen, 8]} />
            </mesh>
            <mesh position={[0, hookLen / 2, B / 2 - c]} material={tensionMat}>
              <cylinderGeometry args={[dBar / 2, dBar / 2, hookLen, 8]} />
            </mesh>
          </group>
        );
      })}

      {/* 7. Cốt thép chờ cổ cột (Column Starter Dowels) với chân quỳ 90 độ */}
      {[
        [-colH / 2 + 0.04, -colB / 2 + 0.04, -Math.PI / 4],
        [colH / 2 - 0.04, -colB / 2 + 0.04, Math.PI / 4],
        [colH / 2 - 0.04, colB / 2 - 0.04, (3 * Math.PI) / 4],
        [-colH / 2 + 0.04, colB / 2 - 0.04, (-3 * Math.PI) / 4],
        [0, -colB / 2 + 0.04, 0],
        [0, colB / 2 - 0.04, Math.PI]
      ].map(([sx, sz, rotAngle], i) => (
        <group key={`starter-${i}`} position={[sx, 0, sz]}>
          {/* Thanh đứng từ đáy móng vươn lên qua cổ cột */}
          <mesh position={[0, 0.15, 0]} material={compMat}>
            <cylinderGeometry args={[0.01, 0.01, H + 0.8, 8]} />
          </mesh>
          {/* Chân vịt bẻ quỳ 90 độ neo vào lưới thép đáy móng */}
          <group position={[0, -H / 2 + c + 0.02, 0]} rotation={[0, Number(rotAngle), 0]}>
            <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={compMat}>
              <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* 8. Đai cổ cột móng (Ties / Stirrups in pedestal) */}
      {[-H / 2 + h1 + 0.05, 0, H / 2 + 0.1, H / 2 + 0.3, H / 2 + 0.5].map((y, idx) => (
        <group key={`pedestal-tie-${idx}`} position={[0, y, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, -colB / 2 + 0.04]} material={stirrupMat}>
            <cylinderGeometry args={[0.004, 0.004, colH - 0.06, 6]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, colB / 2 - 0.04]} material={stirrupMat}>
            <cylinderGeometry args={[0.004, 0.004, colH - 0.06, 6]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-colH / 2 + 0.04, 0, 0]} material={stirrupMat}>
            <cylinderGeometry args={[0.004, 0.004, colB - 0.06, 6]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[colH / 2 - 0.04, 0, 0]} material={stirrupMat}>
            <cylinderGeometry args={[0.004, 0.004, colB - 0.06, 6]} />
          </mesh>
        </group>
      ))}

      {/* 9. Đường kích thước (Dimensions) */}
      {showDimensions && (
        <group>
          <DimensionLine
            start={[-L / 2, -H / 2, B / 2 + 0.2]}
            end={[L / 2, -H / 2, B / 2 + 0.2]}
            valueMm={finalL}
            label={`L = ${finalL} mm`}
          />
          <DimensionLine
            start={[L / 2 + 0.2, -H / 2, -B / 2]}
            end={[L / 2 + 0.2, -H / 2, B / 2]}
            valueMm={finalB}
            label={`B = ${finalB} mm`}
          />
          <DimensionLine
            start={[L / 2 + 0.2, -H / 2, B / 2 + 0.2]}
            end={[L / 2 + 0.2, H / 2, B / 2 + 0.2]}
            valueMm={hMm}
            label={`H_m = ${hMm} mm`}
          />
        </group>
      )}
    </group>
  );
};
