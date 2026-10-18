import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line, Text } from '@react-three/drei';
import { COLORS } from '../common/materials';

export interface DiagramOverlayProps {
  beamLengthMm?: number;
  beamHeightMm?: number;
  qKnM?: number;              // Tải phân bố (kN/m)
  showMoment?: boolean;       // Hiển thị biểu đồ mômen M
  showShear?: boolean;        // Hiển thị biểu đồ lực cắt Q
  diagramScale?: number;      // Tỷ lệ phóng to biểu đồ
  scale?: number;
}

export const DiagramOverlay: React.FC<DiagramOverlayProps> = ({
  beamLengthMm = 3000,
  beamHeightMm = 400,
  qKnM = 25,
  showMoment = true,
  showShear = false,
  diagramScale = 0.015,
  scale = 0.001
}) => {
  const L = beamLengthMm * scale;
  const h = beamHeightMm * scale;
  const L_m = beamLengthMm / 1000;

  // Max values
  const Mmax = (qKnM * L_m * L_m) / 8; // kNm
  const Qmax = (qKnM * L_m) / 2;       // kN

  // Bending Moment Curve: M is plotted downwards (tension bottom)
  // y(x) = -h/2 - 0.1 - M(x) * diagramScale
  const momentPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = 40;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const x = -L / 2 + u * L;
      const xm = u * L_m;
      const M = (qKnM * xm * (L_m - xm)) / 2;
      const y = -h / 2 - 0.08 - M * diagramScale;
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return pts;
  }, [L, h, L_m, qKnM, diagramScale]);

  // Shear Force Curve
  const shearPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    // Q starts at +Qmax on left, drops linearly to -Qmax on right
    pts.push(new THREE.Vector3(-L / 2, -h / 2 - 0.1, 0));
    pts.push(new THREE.Vector3(-L / 2, -h / 2 - 0.1 + Qmax * diagramScale * 0.5, 0));
    pts.push(new THREE.Vector3(L / 2, -h / 2 - 0.1 - Qmax * diagramScale * 0.5, 0));
    pts.push(new THREE.Vector3(L / 2, -h / 2 - 0.1, 0));
    return pts;
  }, [L, h, Qmax, diagramScale]);

  return (
    <group>
      {/* Moment Diagram */}
      {showMoment && (
        <group>
          {/* Baseline */}
          <Line
            points={[
              new THREE.Vector3(-L / 2, -h / 2 - 0.08, 0),
              new THREE.Vector3(L / 2, -h / 2 - 0.08, 0)
            ]}
            color="#64748B"
            lineWidth={1.5}
          />
          {/* Parabolic Curve */}
          <Line points={momentPoints} color="#7C3AED" lineWidth={3} />

          {/* Hatch lines */}
          {Array.from({ length: 15 }).map((_, i) => {
            const u = (i + 1) / 16;
            const x = -L / 2 + u * L;
            const xm = u * L_m;
            const M = (qKnM * xm * (L_m - xm)) / 2;
            const yCurve = -h / 2 - 0.08 - M * diagramScale;
            return (
              <Line
                key={`m-hatch-${i}`}
                points={[new THREE.Vector3(x, -h / 2 - 0.08, 0), new THREE.Vector3(x, yCurve, 0)]}
                color="#C4B5FD"
                lineWidth={1}
              />
            );
          })}

          {/* Label at midspan */}
          <Text
            position={[0, -h / 2 - 0.12 - Mmax * diagramScale, 0]}
            fontSize={0.07}
            color="#6D28D9"
            anchorX="center"
            anchorY="top"
            outlineWidth={0.008}
            outlineColor="#FFFFFF"
          >
            M_max = {Mmax.toFixed(1)} kN·m
          </Text>
        </group>
      )}

      {/* Shear Diagram */}
      {showShear && (
        <group position={[0, -h / 2 - 0.6, 0]}>
          <Line
            points={[
              new THREE.Vector3(-L / 2, 0, 0),
              new THREE.Vector3(L / 2, 0, 0)
            ]}
            color="#64748B"
            lineWidth={1.5}
          />
          <Line points={shearPoints} color="#0284C7" lineWidth={3} />
          <Text
            position={[-L / 2 + 0.3, Qmax * diagramScale * 0.5 + 0.05, 0]}
            fontSize={0.065}
            color="#0284C7"
          >
            +Q = {Qmax.toFixed(1)} kN
          </Text>
          <Text
            position={[L / 2 - 0.3, -Qmax * diagramScale * 0.5 - 0.05, 0]}
            fontSize={0.065}
            color="#0284C7"
          >
            -Q = -{Qmax.toFixed(1)} kN
          </Text>
        </group>
      )}
    </group>
  );
};
