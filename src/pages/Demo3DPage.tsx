import React, { useState } from 'react';
import {
  ViewerCanvas,
  RCBeam,
  RCColumn,
  RCSlab,
  Footing,
  Wall,
  Stair,
  Tank,
  Shell,
  StressBlock,
  CrackPattern,
  LoadArrows,
  DiagramOverlay,
  Deflection,
  LoadPath,
  ExplodedView,
  SectionCut
} from '../three';

type TabKey = 'beam' | 'column' | 'slab' | 'footing' | 'wall' | 'stair' | 'tank' | 'shell' | 'analysis' | 'loadpath';

export const Demo3DPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('beam');

  // Beam state
  const [beamType, setBeamType] = useState<'rect' | 'T' | 'I'>('rect');
  const [bMm, setBMm] = useState(200);
  const [hMm, setHMm] = useState(400);
  const [lengthMm, setLengthMm] = useState(3000);
  const [bottomBars, setBottomBars] = useState(3);
  const [stirrupSpacing, setStirrupSpacing] = useState(100);

  // Overlays in Beam
  const [showStressBlock, setShowStressBlock] = useState(false);
  const [showCracks, setShowCracks] = useState(false);
  const [showLoads, setShowLoads] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [showDeflection, setShowDeflection] = useState(false);
  const [showSectionCut, setShowSectionCut] = useState(false);
  const [showExploded, setShowExploded] = useState(false);

  // Column state
  const [colBars, setColBars] = useState(8);

  // Footing state
  const [footingType, setFootingType] = useState<'isolated' | 'strip' | 'raft'>('isolated');

  // Tank state
  const [tankType, setTankType] = useState<'circular' | 'rectangular'>('circular');
  const [waterLevel, setWaterLevel] = useState(75);

  // Shell state
  const [shellType, setShellType] = useState<'dome' | 'cylindrical' | 'hypar'>('dome');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-primary-light text-primary font-mono text-xs font-semibold rounded-full mb-2">
          THƯ VIỆN 3D DÙNG CHUNG (src/three/)
        </div>
        <h1 className="text-3xl font-serif font-bold text-text-main">
          Phòng Trưng Bày & Kiểm Thử Cấu Kiện BTCT 3D
        </h1>
        <p className="text-text-muted mt-1 text-base">
          Mô hình 3D tương tác theo kích thước mm thực tế, hỗ trợ X-ray nhìn xuyên cốt thép, tải trọng, vết nứt, và phân tích ứng suất.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3 mb-6">
        {[
          { key: 'beam', label: 'Dầm (RCBeam)' },
          { key: 'column', label: 'Cột (RCColumn)' },
          { key: 'slab', label: 'Sàn (RCSlab)' },
          { key: 'footing', label: 'Móng (Footing)' },
          { key: 'wall', label: 'Tường chắn (Wall)' },
          { key: 'stair', label: 'Cầu thang (Stair)' },
          { key: 'tank', label: 'Bể chứa (Tank)' },
          { key: 'shell', label: 'Mái vỏ (Shell)' },
          { key: 'analysis', label: 'Lớp phân tích (Overlays)' },
          { key: 'loadpath', label: 'Luồng truyền tải (LoadPath)' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabKey)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-text-muted hover:text-text-main border border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Viewport Column */}
        <div className="lg:col-span-8">
          <ViewerCanvas
            title={`Mô hình 3D: ${activeTab.toUpperCase()}`}
            className="h-[520px] w-full"
          >
            {({ isXray, wireframe }) => (
              <group>
                {activeTab === 'beam' && (
                  <>
                    {!showExploded ? (
                      <RCBeam
                        type={beamType}
                        bMm={bMm}
                        hMm={hMm}
                        lengthMm={lengthMm}
                        bfMm={600}
                        hfMm={80}
                        isXray={isXray}
                        wireframe={wireframe}
                        rebarProps={{
                          bottomCount: bottomBars,
                          stirrupSpacingSupport: stirrupSpacing
                        }}
                      />
                    ) : (
                      <ExplodedView
                        bMm={bMm}
                        hMm={hMm}
                        lengthMm={lengthMm}
                        explodeDistance={0.15}
                      />
                    )}

                    {showStressBlock && (
                      <StressBlock
                        bMm={bMm}
                        hMm={hMm}
                        xMm={110}
                        xiR={0.58}
                      />
                    )}

                    {showCracks && (
                      <CrackPattern
                        beamLengthMm={lengthMm}
                        beamHeightMm={hMm}
                        beamWidthMm={bMm}
                        showFlexural
                        showShear
                      />
                    )}

                    {showLoads && (
                      <LoadArrows
                        beamLengthMm={lengthMm}
                        beamHeightMm={hMm}
                        qKnM={30}
                      />
                    )}

                    {showDiagram && (
                      <DiagramOverlay
                        beamLengthMm={lengthMm}
                        beamHeightMm={hMm}
                        qKnM={30}
                        showMoment
                        showShear
                      />
                    )}

                    {showDeflection && (
                      <Deflection
                        beamLengthMm={lengthMm}
                        beamHeightMm={hMm}
                        qKnM={30}
                        exaggeration={60}
                      />
                    )}

                    {showSectionCut && (
                      <SectionCut
                        cutPositionX={0}
                        beamHeightMm={hMm}
                        beamWidthMm={bMm}
                      />
                    )}
                  </>
                )}

                {activeTab === 'column' && (
                  <RCColumn
                    bMm={350}
                    hMm={350}
                    heightMm={3200}
                    rebarCount={colBars}
                    isXray={isXray}
                    wireframe={wireframe}
                  />
                )}

                {activeTab === 'slab' && (
                  <RCSlab
                    lengthXMm={3200}
                    lengthYMm={2200}
                    thicknessMm={120}
                    isTwoWay={true}
                    isXray={isXray}
                    wireframe={wireframe}
                  />
                )}

                {activeTab === 'footing' && (
                  <Footing
                    type={footingType}
                    bMm={1800}
                    lMm={2200}
                    hMm={700}
                    isXray={isXray}
                    wireframe={wireframe}
                  />
                )}

                {activeTab === 'wall' && (
                  <Wall
                    heightMm={3600}
                    baseWidthMm={2400}
                    hasButtress={true}
                    isXray={isXray}
                    wireframe={wireframe}
                  />
                )}

                {activeTab === 'stair' && (
                  <Stair
                    stepCount={8}
                    stepRiseMm={165}
                    stepRunMm={280}
                    isXray={isXray}
                    wireframe={wireframe}
                  />
                )}

                {activeTab === 'tank' && (
                  <Tank
                    type={tankType}
                    diameterMm={3200}
                    heightMm={2600}
                    waterLevelPct={waterLevel}
                    isXray={isXray}
                    wireframe={wireframe}
                  />
                )}

                {activeTab === 'shell' && (
                  <Shell
                    type={shellType}
                    spanXMm={6000}
                    spanYMm={6000}
                    riseMm={1200}
                    isXray={isXray}
                    wireframe={wireframe}
                  />
                )}

                {activeTab === 'analysis' && (
                  <group>
                    <StressBlock
                      bMm={250}
                      hMm={500}
                      xMm={140}
                      xiR={0.58}
                    />
                    <CrackPattern
                      beamLengthMm={3000}
                      beamHeightMm={500}
                      beamWidthMm={250}
                    />
                    <LoadArrows
                      beamLengthMm={3000}
                      beamHeightMm={500}
                      qKnM={35}
                    />
                  </group>
                )}

                {activeTab === 'loadpath' && (
                  <LoadPath autoPlay />
                )}
              </group>
            )}
          </ViewerCanvas>
        </div>

        {/* Controls Column */}
        <div className="lg:col-span-4 bg-surface p-5 rounded-custom border border-border shadow-soft space-y-5">
          <h2 className="text-lg font-serif font-bold text-text-main border-b border-border pb-2">
            Bảng Điều Khiển Tham Số (mm)
          </h2>

          {activeTab === 'beam' && (
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-text-muted mb-1">Loại tiết diện:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['rect', 'T', 'I'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setBeamType(t)}
                      className={`py-1.5 rounded border text-xs font-semibold ${
                        beamType === t
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border text-text-muted hover:bg-bg'
                      }`}
                    >
                      {t === 'rect' ? 'Chữ nhật' : t === 'T' ? 'Chữ T' : 'Chữ I'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Bề rộng sườn b:</span>
                  <span className="font-mono font-bold text-text-main">{bMm} mm</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="400"
                  step="20"
                  value={bMm}
                  onChange={(e) => setBMm(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Chiều cao dầm h:</span>
                  <span className="font-mono font-bold text-text-main">{hMm} mm</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="800"
                  step="50"
                  value={hMm}
                  onChange={(e) => setHMm(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Chiều dài nhịp L:</span>
                  <span className="font-mono font-bold text-text-main">{lengthMm} mm</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="6000"
                  step="500"
                  value={lengthMm}
                  onChange={(e) => setLengthMm(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Số thanh thép chịu kéo dưới:</span>
                  <span className="font-mono font-bold text-text-main">{bottomBars} thanh</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="1"
                  value={bottomBars}
                  onChange={(e) => setBottomBars(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Bước đai vùng gối s1:</span>
                  <span className="font-mono font-bold text-text-main">{stirrupSpacing} mm</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="25"
                  value={stirrupSpacing}
                  onChange={(e) => setStirrupSpacing(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="border-t border-border pt-3">
                <span className="block font-medium text-xs text-text-muted mb-2">Bật các lớp phân tích:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showStressBlock}
                      onChange={(e) => setShowStressBlock(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    Khối ứng suất Rb
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCracks}
                      onChange={(e) => setShowCracks(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    Vết nứt (Uốn & Cắt)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showLoads}
                      onChange={(e) => setShowLoads(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    Tải trọng q
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showDiagram}
                      onChange={(e) => setShowDiagram(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    Biểu đồ M, Q
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showDeflection}
                      onChange={(e) => setShowDeflection(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    Độ võng f
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSectionCut}
                      onChange={(e) => setShowSectionCut(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    Mặt cắt động
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showExploded}
                      onChange={(e) => setShowExploded(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    Chế độ nổ (Exploded)
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'column' && (
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-text-muted mb-1">Số thanh thép dọc:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[4, 6, 8].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColBars(c)}
                      className={`py-1.5 rounded border text-xs font-semibold ${
                        colBars === c
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border text-text-muted hover:bg-bg'
                      }`}
                    >
                      {c} thanh
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'footing' && (
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-text-muted mb-1">Loại móng:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['isolated', 'strip', 'raft'] as const).map((ft) => (
                    <button
                      key={ft}
                      onClick={() => setFootingType(ft)}
                      className={`py-1.5 rounded border text-xs font-semibold ${
                        footingType === ft
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border text-text-muted hover:bg-bg'
                      }`}
                    >
                      {ft === 'isolated' ? 'Móng đơn' : ft === 'strip' ? 'Móng băng' : 'Móng bè'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tank' && (
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-text-muted mb-1">Loại bể:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['circular', 'rectangular'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTankType(t)}
                      className={`py-1.5 rounded border text-xs font-semibold ${
                        tankType === t
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border text-text-muted hover:bg-bg'
                      }`}
                    >
                      {t === 'circular' ? 'Bể tròn' : 'Bể chữ nhật'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Mực nước:</span>
                  <span className="font-mono font-bold text-text-main">{waterLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={waterLevel}
                  onChange={(e) => setWaterLevel(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          )}

          {activeTab === 'shell' && (
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-text-muted mb-1">Dạng mặt cong mái vỏ:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['dome', 'cylindrical', 'hypar'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setShellType(s)}
                      className={`py-1.5 rounded border text-xs font-semibold ${
                        shellType === s
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border text-text-muted hover:bg-bg'
                      }`}
                    >
                      {s === 'dome' ? 'Vòm cầu' : s === 'cylindrical' ? 'Vỏ trụ' : 'Hypar'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loadpath' && (
            <div className="text-sm text-text-muted leading-relaxed">
              <p>Mô hình trình diễn chu trình truyền lực của hệ kết cấu chịu lực toàn khối:</p>
              <ol className="list-decimal list-inside space-y-1.5 mt-2 font-medium text-text-main text-xs">
                <li><strong className="text-primary">Bản sàn:</strong> Chịu hoạt tải phân bố đều trên mặt phẳng.</li>
                <li><strong className="text-primary">Dầm phụ:</strong> Tiếp nhận tải trọng từ bản sàn truyền vào theo diện truyền tải.</li>
                <li><strong className="text-primary">Dầm chính:</strong> Chịu lực tập trung do dầm phụ gối lên.</li>
                <li><strong className="text-primary">Cột:</strong> Chịu lực dọc nén và mômen từ dầm chính truyền xuống.</li>
                <li><strong className="text-primary">Móng:</strong> Phân phối toàn bộ tải trọng công trình vào nền đất an toàn.</li>
              </ol>
            </div>
          )}

          {/* Quick Info Badge */}
          <div className="bg-bg p-3 rounded-lg border border-border text-xs text-text-muted">
            <span className="font-semibold text-text-main">💡 Hướng dẫn:</span> Bấm nút <strong className="text-primary">X-ray</strong> ở góc trên bên phải khung 3D để nhìn thấu cốt thép bên trong lòng bê tông!
          </div>
        </div>
      </div>
    </div>
  );
};
