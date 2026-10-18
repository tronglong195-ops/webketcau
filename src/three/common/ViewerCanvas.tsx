import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, GizmoHelper, GizmoViewport } from '@react-three/drei';

interface ViewerCanvasProps {
  children: React.ReactNode | ((props: { isXray: boolean; wireframe: boolean }) => React.ReactNode);
  title?: string;
  cameraPosition?: [number, number, number];
  aspectRatio?: string;
  showControls?: boolean;
  className?: string;
}

export const ViewerCanvas: React.FC<ViewerCanvasProps> = ({
  children,
  title,
  cameraPosition = [2.5, 2.0, 3.0],
  showControls = true,
  className = "h-[320px] sm:h-[390px] md:h-[420px] w-full"
}) => {
  const [isXray, setIsXray] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative bg-[#F4F3EE] rounded-2xl border border-border overflow-hidden shadow-soft ${className}`}>
      {/* Top Overlay Bar */}
      <div className="absolute top-2 left-2 sm:left-3 right-2 sm:right-3 z-10 flex items-center justify-between pointer-events-none gap-1">
        {title && (
          <div className="pointer-events-auto bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-border/80 text-[11px] sm:text-xs font-semibold text-text-main shadow-xs truncate max-w-[50%]">
            {title}
          </div>
        )}
        {showControls && (
          <div className="pointer-events-auto ml-auto flex items-center gap-1 bg-surface/90 backdrop-blur-sm p-1 rounded-lg border border-border/80 shadow-xs">
            {/* X-ray toggle button */}
            <button
              onClick={() => setIsXray(!isXray)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all active:scale-95 ${
                isXray ? 'bg-primary text-white shadow-xs' : 'text-text-muted hover:bg-bg hover:text-text-main'
              }`}
              title="Bật/Tắt chế độ X-ray xuyên thấu bê tông nhìn cốt thép"
            >
              {isXray ? '👁️ X-ray: BẬT' : '👁️ X-ray'}
            </button>

            {/* Wireframe toggle button */}
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all active:scale-95 ${
                wireframe ? 'bg-primary text-white shadow-xs' : 'text-text-muted hover:bg-bg hover:text-text-main'
              }`}
              title="Bật/tắt lưới khung dây"
            >
              Lưới
            </button>

            {/* Reset Camera */}
            <button
              onClick={handleResetCamera}
              className="px-2 py-1 text-xs font-medium text-text-muted hover:bg-bg hover:text-text-main rounded-md transition-all active:scale-95"
              title="Đặt lại góc nhìn mặc định"
            >
              {isMobile ? '↺' : 'Góc ban đầu'}
            </button>
          </div>
        )}
      </div>

      {/* Canvas */}
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />

        <Suspense fallback={null}>
          <Center top>
            {typeof children === 'function' ? children({ isXray, wireframe }) : children}
          </Center>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          autoRotate={autoRotate}
          autoRotateSpeed={1.0}
          enableDamping
          dampingFactor={0.08}
          minDistance={0.5}
          maxDistance={15}
          touches={{
            ONE: 1, // ROTATE
            TWO: 2, // DOLLY_PAN
          }}
        />

        {!isMobile && (
          <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
            <GizmoViewport axisColors={['#EF4444', '#10B981', '#3B82F6']} labelColor="#000000" />
          </GizmoHelper>
        )}
      </Canvas>

      {/* Helper hint for desktop and touch mobile */}
      <div className="absolute bottom-2 left-2 sm:left-3 pointer-events-none text-[10px] sm:text-[11px] text-text-muted/80 bg-surface/90 px-2 py-0.5 rounded-md border border-border/50 backdrop-blur-xs">
        {isMobile ? '👆 1 ngón: Xoay | 2 ngón: Phóng to / Thu nhỏ' : '🖱️ Chuột trái: Xoay | Chuột phải: Di chuyển | Cuộn: Thu phóng'}
      </div>
    </div>
  );
};
