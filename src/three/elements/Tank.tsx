import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getConcreteMaterial,
  getSteelMaterial,
  getWaterMaterial,
  getPipeMaterial,
  getWaterstopMaterial
} from '../common/materials';
import { DimensionLine } from '../common/Dimensions3D';

export type TankType = 'rectangular' | 'circular';

export interface TankProps {
  type?: TankType;
  diameterMm?: number;        // Bể tròn: Đường kính trong D (mm)
  radiusMm?: number;          // Alias for diameterMm / 2
  widthMm?: number;           // Bể chữ nhật: B (mm)
  lengthMm?: number;          // Bể chữ nhật: L (mm)
  heightMm?: number;          // Chiều cao H (mm)
  wallThickMm?: number;       // Chiều dày thành (mm)
  wallThicknessMm?: number;   // Alias for wallThickMm
  baseThickMm?: number;       // Chiều dày bản đáy (mm)
  waterLevelPct?: number;     // Mực nước trong bể (%)
  isXray?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
  showRebars?: boolean;       // Hiển thị lồng thép 2 lớp thành và đáy
  showPipes?: boolean;        // Hiển thị ống cấp, ống tràn, ống xả cặn, ống thông hơi
  showRoof?: boolean;         // Hiển thị nắp bể và cổ thăm manhole
  cutaway?: boolean;          // Cắt một góc 90 độ (quarter cutaway) để nhìn nội thất bên trong
  scale?: number;
}

export const Tank: React.FC<TankProps> = ({
  type = 'rectangular',
  diameterMm,
  radiusMm,
  widthMm = 2000,
  lengthMm = 3000,
  heightMm = 2000,
  wallThickMm,
  wallThicknessMm,
  baseThickMm = 200,
  waterLevelPct = 80,
  isXray = false,
  wireframe = false,
  showDimensions = true,
  showRebars = true,
  showPipes = true,
  showRoof = true,
  cutaway = false,
  scale = 0.001
}) => {
  const finalDiam = diameterMm ?? (radiusMm ? radiusMm * 2 : 2500);
  const finalWall = wallThickMm ?? wallThicknessMm ?? 150;
  const D = finalDiam * scale;
  const R = D / 2;
  const B = widthMm * scale;
  const L = lengthMm * scale;
  const H = heightMm * scale;
  const t = finalWall * scale;
  const tBase = baseThickMm * scale;
  const toe = 0.15; // Mép móng bản đáy chìa ra 150mm

  // Materials
  const concreteMat = useMemo(() => {
    const mat = getConcreteMaterial(isXray, isXray ? 0.15 : 0.85);
    mat.wireframe = wireframe;
    return mat;
  }, [isXray, wireframe]);

  const tensionMat = useMemo(() => getSteelMaterial('tension'), []);
  const stirrupMat = useMemo(() => getSteelMaterial('stirrup'), []);
  const waterMat = useMemo(() => getWaterMaterial(0.4), []);
  const steelPipeMat = useMemo(() => getPipeMaterial('steel'), []);
  const waterstopMat = useMemo(() => getWaterstopMaterial(), []);

  // Stainless steel / metal for ladder and manhole cover
  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        metalness: 0.9,
        roughness: 0.2
      }),
    []
  );

  const valveMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#DC2626', // Red valve handle
        roughness: 0.4
      }),
    []
  );

  const floatBallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F59E0B', // Orange brass float ball
        metalness: 0.8,
        roughness: 0.2
      }),
    []
  );

  const rebarDiam = 0.01; // 10mm rebar

  // Calculations for rebars count
  const nBarsL = Math.max(3, Math.floor(lengthMm / 150));
  const nBarsB = Math.max(3, Math.floor(widthMm / 150));
  const nBarsH = Math.max(3, Math.floor(heightMm / 150));

  return (
    <group>
      {type === 'rectangular' ? (
        <group>
          {/* ================= 1. BẢN ĐÁY BỂ (BASE SLAB) ================= */}
          <mesh position={[0, -H / 2 - tBase / 2, 0]} material={concreteMat}>
            <boxGeometry args={[L + 2 * t + 2 * toe, tBase, B + 2 * t + 2 * toe]} />
          </mesh>

          {/* ================= 2. CÁC THÀNH BỂ (WALLS) ================= */}
          {/* Thành sau (Back wall -Z) */}
          <mesh position={[0, 0, -B / 2 - t / 2]} material={concreteMat}>
            <boxGeometry args={[L + 2 * t, H, t]} />
          </mesh>

          {/* Thành trái (Left wall -X) */}
          <mesh position={[-L / 2 - t / 2, 0, 0]} material={concreteMat}>
            <boxGeometry args={[t, H, B]} />
          </mesh>

          {/* Thành phải (Right wall +X) */}
          {(!cutaway || false) && (
            <mesh position={[L / 2 + t / 2, 0, 0]} material={concreteMat}>
              <boxGeometry args={[t, H, B]} />
            </mesh>
          )}

          {/* Thành trước (Front wall +Z) - nếu cutaway thì hạ thấp hoặc ẩn để nhìn bên trong */}
          {!cutaway ? (
            <mesh position={[0, 0, B / 2 + t / 2]} material={concreteMat}>
              <boxGeometry args={[L + 2 * t, H, t]} />
            </mesh>
          ) : (
            <mesh position={[0, -H / 4, B / 2 + t / 2]} material={concreteMat}>
              <boxGeometry args={[L + 2 * t, H / 2, t]} />
            </mesh>
          )}

          {/* ================= 3. GỜ VÁT GÓC CHÂN TƯỜNG (45 DEGREE CHAMFERS) ================= */}
          {/* Vát mòi 45 độ góc đáy giúp chống nứt ngàm và chống thấm */}
          <group position={[0, -H / 2 + 0.05, 0]}>
            {/* Vát cạnh sau */}
            <mesh position={[0, 0, -B / 2 + 0.04]} rotation={[Math.PI / 4, 0, 0]} material={concreteMat}>
              <boxGeometry args={[L, 0.1, 0.1]} />
            </mesh>
            {/* Vát cạnh trước */}
            <mesh position={[0, 0, B / 2 - 0.04]} rotation={[Math.PI / 4, 0, 0]} material={concreteMat}>
              <boxGeometry args={[L, 0.1, 0.1]} />
            </mesh>
            {/* Vát cạnh trái */}
            <mesh position={[-L / 2 + 0.04, 0, 0]} rotation={[0, 0, Math.PI / 4]} material={concreteMat}>
              <boxGeometry args={[0.1, 0.1, B]} />
            </mesh>
            {/* Vát cạnh phải */}
            <mesh position={[L / 2 - 0.04, 0, 0]} rotation={[0, 0, Math.PI / 4]} material={concreteMat}>
              <boxGeometry args={[0.1, 0.1, B]} />
            </mesh>
          </group>

          {/* ================= 4. BĂNG CẢN NƯỚC PVC (WATERSTOP) ================= */}
          {/* Vị trí mạch ngừng thi công giữa đáy và thành bể (+200mm từ mặt đáy) */}
          <mesh position={[0, -H / 2 + 0.2, 0]} material={waterstopMat}>
            <boxGeometry args={[L + 2 * t + 0.005, 0.06, B + 2 * t + 0.005]} />
          </mesh>

          {/* ================= 5. NẮP BỂ & CỔ THĂM MANHOLE (ROOF SLAB) ================= */}
          {showRoof && (
            <group position={[0, H / 2 + 0.05, 0]}>
              {/* Bản nắp */}
              <mesh material={concreteMat}>
                <boxGeometry args={[L + 2 * t, 0.1, B + 2 * t]} />
              </mesh>

              {/* Cổ thăm manhole (Raised concrete curb 600x600mm) */}
              <group position={[-L / 4, 0.1, -B / 4]}>
                <mesh position={[0, 0.08, 0]} material={concreteMat}>
                  <boxGeometry args={[0.7, 0.16, 0.7]} />
                </mesh>
                {/* Lỗ mở thăm */}
                <mesh position={[0, 0.09, 0]}>
                  <boxGeometry args={[0.55, 0.18, 0.55]} />
                  <meshBasicMaterial color="#0F172A" />
                </mesh>
                {/* Nắp đậy kim loại dập gân có tay cầm */}
                <mesh position={[0, 0.17, 0]} material={metalMat}>
                  <boxGeometry args={[0.65, 0.02, 0.65]} />
                </mesh>
                {/* Tay cầm nắp thăm */}
                <mesh position={[0, 0.19, 0]} material={metalMat}>
                  <torusGeometry args={[0.06, 0.008, 8, 16, Math.PI]} />
                </mesh>
              </group>

              {/* Ống thông hơi cổ ngỗng (Gooseneck Air Vent) */}
              {showPipes && (
                <group position={[L / 4, 0.05, -B / 4]}>
                  {/* Trụ đứng */}
                  <mesh position={[0, 0.2, 0]} material={steelPipeMat}>
                    <cylinderGeometry args={[0.035, 0.035, 0.4, 16]} />
                  </mesh>
                  {/* Cổ ngỗng uốn 180 độ */}
                  <mesh position={[0.06, 0.4, 0]} rotation={[0, 0, Math.PI / 2]} material={steelPipeMat}>
                    <torusGeometry args={[0.06, 0.035, 12, 24, Math.PI]} />
                  </mesh>
                  {/* Đoạn quay chúc xuống kèm lưới chắn côn trùng */}
                  <mesh position={[0.12, 0.32, 0]} material={steelPipeMat}>
                    <cylinderGeometry args={[0.035, 0.035, 0.15, 16]} />
                  </mesh>
                </group>
              )}
            </group>
          )}

          {/* ================= 6. HỆ THỐNG ĐƯỜNG ỐNG KỸ THUẬT (PIPING) ================= */}
          {showPipes && (
            <group>
              {/* a) Ống cấp nước vào (Inlet Pipe) ở góc cao thành bể */}
              <group position={[-L / 2 + 0.3, H / 2 - 0.25, -B / 2]}>
                {/* Ống xuyên thành */}
                <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]} material={steelPipeMat}>
                  <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
                </mesh>
                {/* Van phao đồng nổi */}
                <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 6]} material={metalMat}>
                  <cylinderGeometry args={[0.008, 0.008, 0.3, 8]} />
                </mesh>
                <mesh position={[0.15, -0.1, 0.3]} material={floatBallMat}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                </mesh>
              </group>

              {/* b) Ống tràn nước (Overflow Pipe) ở cao độ 88% thành bể */}
              <group position={[L / 2, H / 2 - 0.2, B / 4]}>
                <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={steelPipeMat}>
                  <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
                </mesh>
                {/* Phễu loe thu nước tràn */}
                <mesh position={[-0.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={steelPipeMat}>
                  <coneGeometry args={[0.08, 0.1, 16, 1, true]} />
                </mesh>
              </group>

              {/* c) Ống xả đáy / xả cặn (Drain / Washout Pipe) */}
              <group position={[L / 2 - 0.3, -H / 2 - tBase / 2, B / 4]}>
                <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} material={steelPipeMat}>
                  <cylinderGeometry args={[0.035, 0.035, 0.6, 16]} />
                </mesh>
                {/* Van bi khóa tay đỏ (Ball Valve) */}
                <mesh position={[0, 0, 0.6]} material={metalMat}>
                  <boxGeometry args={[0.1, 0.1, 0.1]} />
                </mesh>
                <mesh position={[0, 0.08, 0.6]} material={valveMat}>
                  <boxGeometry args={[0.03, 0.05, 0.18]} />
                </mesh>
              </group>

              {/* d) Ống cấp nước sinh hoạt ra (Outlet/Supply Pipe) nhô cao 150mm tránh cặn */}
              <group position={[-L / 2, -H / 2 + 0.15, 0]}>
                <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={steelPipeMat}>
                  <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
                </mesh>
                {/* Lưới lọc đầu hút */}
                <mesh position={[0.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={metalMat}>
                  <cylinderGeometry args={[0.05, 0.05, 0.1, 12]} />
                </mesh>
              </group>
            </group>
          )}

          {/* ================= 7. THANG LEO INOX KIỂM TRA (ACCESS LADDER) ================= */}
          <group position={[-L / 4, 0, -B / 2 + 0.08]}>
            {/* Hai cột trụ thang */}
            <mesh position={[-0.18, 0, 0]} material={metalMat}>
              <cylinderGeometry args={[0.015, 0.015, H - 0.2, 12]} />
            </mesh>
            <mesh position={[0.18, 0, 0]} material={metalMat}>
              <cylinderGeometry args={[0.015, 0.015, H - 0.2, 12]} />
            </mesh>
            {/* Các bậc thang cách nhau 300mm */}
            {Array.from({ length: 6 }).map((_, i) => {
              const y = -H / 2 + 0.25 + i * 0.3;
              return (
                <mesh key={`tank-ladder-step-${i}`} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]} material={metalMat}>
                  <cylinderGeometry args={[0.01, 0.01, 0.36, 8]} />
                </mesh>
              );
            })}
          </group>

          {/* ================= 8. KHỐI NƯỚC (REALISTIC WATER VOLUME) ================= */}
          {waterLevelPct > 0 && (
            <mesh
              position={[0, -H / 2 + (H * (waterLevelPct / 100)) / 2, 0]}
              material={waterMat}
            >
              <boxGeometry args={[L - 0.02, H * (waterLevelPct / 100), B - 0.02]} />
            </mesh>
          )}

          {/* ================= 9. LỒNG CỐT THÉP BỂ 2 LỚP (REINFORCEMENT CAGE) ================= */}
          {(showRebars || isXray) && (
            <group>
              {/* a) Lưới thép thành bể 2 lớp (Lớp ngoài + Lớp trong) */}
              {/* Thép đứng thành dài (Front & Back) */}
              {Array.from({ length: nBarsL }).map((_, i) => {
                const x = -L / 2 + (i * L) / (nBarsL - 1);
                return (
                  <React.Fragment key={`v-bar-long-${i}`}>
                    {/* Thành sau - Lớp trong */}
                    <mesh position={[x, 0, -B / 2 - 0.03]} material={tensionMat}>
                      <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                    </mesh>
                    {/* Thành sau - Lớp ngoài */}
                    <mesh position={[x, 0, -B / 2 - t + 0.03]} material={tensionMat}>
                      <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                    </mesh>
                    {/* Thành trước - Lớp trong */}
                    {!cutaway && (
                      <mesh position={[x, 0, B / 2 + 0.03]} material={tensionMat}>
                        <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                      </mesh>
                    )}
                    {/* Thành trước - Lớp ngoài */}
                    {!cutaway && (
                      <mesh position={[x, 0, B / 2 + t - 0.03]} material={tensionMat}>
                        <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                      </mesh>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Thép đứng thành ngắn (Left & Right) */}
              {Array.from({ length: nBarsB }).map((_, i) => {
                const z = -B / 2 + (i * B) / (nBarsB - 1);
                return (
                  <React.Fragment key={`v-bar-short-${i}`}>
                    {/* Thành trái - Lớp trong */}
                    <mesh position={[-L / 2 - 0.03, 0, z]} material={tensionMat}>
                      <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                    </mesh>
                    {/* Thành trái - Lớp ngoài */}
                    <mesh position={[-L / 2 - t + 0.03, 0, z]} material={tensionMat}>
                      <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                    </mesh>
                    {/* Thành phải - Lớp trong */}
                    <mesh position={[L / 2 + 0.03, 0, z]} material={tensionMat}>
                      <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                    </mesh>
                    {/* Thành phải - Lớp ngoài */}
                    <mesh position={[L / 2 + t - 0.03, 0, z]} material={tensionMat}>
                      <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                    </mesh>
                  </React.Fragment>
                );
              })}

              {/* Thép đai ngang thành bể chịu áp lực nước nở hông */}
              {Array.from({ length: nBarsH }).map((_, i) => {
                const y = -H / 2 + 0.1 + (i * (H - 0.2)) / (nBarsH - 1);
                return (
                  <group key={`h-hoop-${i}`} position={[0, y, 0]}>
                    {/* Vòng thép đai quanh 4 mặt thành */}
                    <mesh position={[0, 0, -B / 2 - t / 2]} rotation={[0, 0, Math.PI / 2]} material={stirrupMat}>
                      <cylinderGeometry args={[0.004, 0.004, L + 2 * t - 0.04, 6]} />
                    </mesh>
                    {!cutaway && (
                      <mesh position={[0, 0, B / 2 + t / 2]} rotation={[0, 0, Math.PI / 2]} material={stirrupMat}>
                        <cylinderGeometry args={[0.004, 0.004, L + 2 * t - 0.04, 6]} />
                      </mesh>
                    )}
                    <mesh position={[-L / 2 - t / 2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={stirrupMat}>
                      <cylinderGeometry args={[0.004, 0.004, B + 2 * t - 0.04, 6]} />
                    </mesh>
                    <mesh position={[L / 2 + t / 2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={stirrupMat}>
                      <cylinderGeometry args={[0.004, 0.004, B + 2 * t - 0.04, 6]} />
                    </mesh>
                  </group>
                );
              })}

              {/* b) Lưới thép đáy bể 2 lớp (Lưới dưới + Lưới trên) */}
              {/* Lưới dưới */}
              {Array.from({ length: 7 }).map((_, i) => {
                const z = -B / 2 + (i * B) / 6;
                return (
                  <mesh key={`base-bot-x-${i}`} position={[0, -H / 2 - tBase + 0.04, z]} rotation={[0, 0, Math.PI / 2]} material={tensionMat}>
                    <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, L + 2 * t, 6]} />
                  </mesh>
                );
              })}
              {Array.from({ length: 9 }).map((_, i) => {
                const x = -L / 2 + (i * L) / 8;
                return (
                  <mesh key={`base-bot-z-${i}`} position={[x, -H / 2 - tBase + 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={tensionMat}>
                    <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, B + 2 * t, 6]} />
                  </mesh>
                );
              })}
            </group>
          )}

          {/* ================= 10. ĐƯỜNG KÍCH THƯỚC (DIMENSIONS) ================= */}
          {showDimensions && (
            <group>
              <DimensionLine
                start={[-L / 2, -H / 2 - tBase - 0.2, B / 2 + t + toe]}
                end={[L / 2, -H / 2 - tBase - 0.2, B / 2 + t + toe]}
                valueMm={lengthMm}
                label={`L = ${lengthMm} mm`}
              />
              <DimensionLine
                start={[L / 2 + t + toe + 0.2, -H / 2 - tBase - 0.2, -B / 2]}
                end={[L / 2 + t + toe + 0.2, -H / 2 - tBase - 0.2, B / 2]}
                valueMm={widthMm}
                label={`B = ${widthMm} mm`}
              />
              <DimensionLine
                start={[L / 2 + t + toe + 0.2, -H / 2, B / 2]}
                end={[L / 2 + t + toe + 0.2, H / 2, B / 2]}
                valueMm={heightMm}
                label={`H = ${heightMm} mm`}
              />
            </group>
          )}
        </group>
      ) : (
        /* ================= BỂ TRÒN (CIRCULAR TANK) ================= */
        <group>
          {/* Bản đáy tròn */}
          <mesh position={[0, -H / 2 - tBase / 2, 0]} material={concreteMat}>
            <cylinderGeometry args={[R + t + toe, R + t + toe, tBase, 36]} />
          </mesh>

          {/* Thành bể hình trụ */}
          <mesh position={[0, 0, 0]} material={concreteMat}>
            <cylinderGeometry args={[R + t / 2, R + t / 2, H, 36, 1, true]} />
          </mesh>

          {/* Vát mòi đáy tròn */}
          <mesh position={[0, -H / 2 + 0.05, 0]} material={concreteMat}>
            <torusGeometry args={[R, 0.06, 8, 36]} />
          </mesh>

          {/* Băng cản nước PVC vòng tròn */}
          <mesh position={[0, -H / 2 + 0.2, 0]} material={waterstopMat}>
            <torusGeometry args={[R + t / 2, 0.015, 8, 36]} />
          </mesh>

          {/* Nắp vòm hoặc nắp phẳng tròn */}
          {showRoof && (
            <group position={[0, H / 2 + 0.05, 0]}>
              <mesh material={concreteMat}>
                <cylinderGeometry args={[R + t, R + t, 0.1, 36]} />
              </mesh>
              {/* Cổ thăm */}
              <mesh position={[0, 0.1, R / 2]} material={concreteMat}>
                <cylinderGeometry args={[0.35, 0.35, 0.16, 24]} />
              </mesh>
              <mesh position={[0, 0.19, R / 2]} material={metalMat}>
                <cylinderGeometry args={[0.36, 0.36, 0.02, 24]} />
              </mesh>
            </group>
          )}

          {/* Khối nước */}
          {waterLevelPct > 0 && (
            <mesh
              position={[0, -H / 2 + (H * (waterLevelPct / 100)) / 2, 0]}
              material={waterMat}
            >
              <cylinderGeometry args={[R - 0.01, R - 0.01, H * (waterLevelPct / 100), 32]} />
            </mesh>
          )}

          {/* Cốt thép bể tròn: Thanh đứng + Thép vòng hoop bars */}
          {(showRebars || isXray) && (
            <group>
              {/* Thép đứng phân bố tròn */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 24;
                const x = (R + t / 2) * Math.cos(angle);
                const z = (R + t / 2) * Math.sin(angle);
                return (
                  <mesh key={`circ-v-bar-${i}`} position={[x, 0, z]} material={tensionMat}>
                    <cylinderGeometry args={[rebarDiam / 2, rebarDiam / 2, H, 6]} />
                  </mesh>
                );
              })}

              {/* Thép vòng chịu kéo (Hoop Bars) dày dần về đáy theo biểu đồ áp lực nước tam giác */}
              {Array.from({ length: 12 }).map((_, i) => {
                // Phân bố phi tuyến tính: dày hơn ở đáy
                const factor = Math.pow(i / 11, 1.4);
                const y = H / 2 - 0.1 - factor * (H - 0.2);
                return (
                  <mesh key={`circ-hoop-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={stirrupMat}>
                    <torusGeometry args={[R + t / 2, 0.007, 8, 36]} />
                  </mesh>
                );
              })}
            </group>
          )}

          {/* Kích thước */}
          {showDimensions && (
            <group>
              <DimensionLine
                start={[-R - t, -H / 2 - tBase - 0.2, 0]}
                end={[R + t, -H / 2 - tBase - 0.2, 0]}
                valueMm={finalDiam + 2 * finalWall}
                label={`D_ngoài = ${finalDiam + 2 * finalWall} mm`}
              />
              <DimensionLine
                start={[R + t + 0.3, -H / 2, 0]}
                end={[R + t + 0.3, H / 2, 0]}
                valueMm={heightMm}
                label={`H = ${heightMm} mm`}
              />
            </group>
          )}
        </group>
      )}
    </group>
  );
};
