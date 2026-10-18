import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Text, Line } from '@react-three/drei';
import { getConcreteMaterial } from '../common/materials';

export interface LoadPathProps {
  activeStep?: number;        // 0: All, 1: Slab, 2: Secondary Beam, 3: Main Beam, 4: Column, 5: Footing
  autoPlay?: boolean;
}

export const LoadPath: React.FC<LoadPathProps> = ({
  activeStep: propStep,
  autoPlay = true
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (propStep !== undefined) {
      setCurrentStep(propStep);
      return;
    }
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev % 5) + 1);
    }, 1800);
    return () => clearInterval(timer);
  }, [propStep, autoPlay]);

  // Member highlight colors
  const getColor = (stepNum: number) => {
    if (currentStep === 0 || currentStep === stepNum) {
      return '#3B82F6'; // Highlight vibrant blue
    }
    return '#CBD5E1'; // Inactive light gray
  };

  const getOpacity = (stepNum: number) => {
    if (currentStep === 0 || currentStep === stepNum) return 0.9;
    return 0.25;
  };

  const stepNames = [
    '',
    '1. Tải trọng tác dụng lên BẢN SÀN',
    '2. Bản sàn truyền tải vào DẦM PHỤ',
    '3. Dầm phụ truyền phản lực vào DẦM CHÍNH',
    '4. Dầm chính truyền lực tập trung vào CỘT',
    '5. Cột truyền toàn bộ tải trọng xuống MÓNG'
  ];

  return (
    <group position={[0, -0.4, 0]}>
      {/* 1. Slabs */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3.2, 0.08, 2.2]} />
        <meshStandardMaterial
          color={getColor(1)}
          transparent
          opacity={getOpacity(1)}
          roughness={0.4}
        />
      </mesh>

      {/* 2. Secondary Beams (Dầm phụ along Z) */}
      {[-0.8, 0.8].map((x, idx) => (
        <mesh key={`sec-beam-${idx}`} position={[x, 1.05, 0]}>
          <boxGeometry args={[0.15, 0.22, 2.2]} />
          <meshStandardMaterial
            color={getColor(2)}
            transparent
            opacity={getOpacity(2)}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* 3. Primary Beams (Dầm chính along X) */}
      {[-1.0, 1.0].map((z, idx) => (
        <mesh key={`main-beam-${idx}`} position={[0, 0.95, z]}>
          <boxGeometry args={[3.2, 0.35, 0.25]} />
          <meshStandardMaterial
            color={getColor(3)}
            transparent
            opacity={getOpacity(3)}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* 4. Columns (Cột) */}
      {[
        [-1.4, -1.0],
        [1.4, -1.0],
        [-1.4, 1.0],
        [1.4, 1.0]
      ].map(([x, z], idx) => (
        <mesh key={`col-${idx}`} position={[x, 0.35, z]}>
          <boxGeometry args={[0.22, 1.2, 0.22]} />
          <meshStandardMaterial
            color={getColor(4)}
            transparent
            opacity={getOpacity(4)}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* 5. Footings (Móng) */}
      {[
        [-1.4, -1.0],
        [1.4, -1.0],
        [-1.4, 1.0],
        [1.4, 1.0]
      ].map(([x, z], idx) => (
        <mesh key={`footing-${idx}`} position={[x, -0.35, z]}>
          <boxGeometry args={[0.6, 0.2, 0.6]} />
          <meshStandardMaterial
            color={getColor(5)}
            transparent
            opacity={getOpacity(5)}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Animated Flow Arrow or Marker */}
      <Text
        position={[0, 1.6, 0]}
        fontSize={0.11}
        color="#1E4FD8"
        anchorX="center"
        outlineWidth={0.01}
        outlineColor="#FFFFFF"
      >
        {stepNames[currentStep]}
      </Text>
    </group>
  );
};
