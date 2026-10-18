import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ViewerCanvas } from '../three/common/ViewerCanvas';
import { RCBeam } from '../three/elements/RCBeam';
import { StressBlock } from '../three/overlays/StressBlock';
import { LoadArrows } from '../three/overlays/LoadArrows';
import { InlineMath } from '../components/InlineMath';
import { TAP1_CHAPTERS, TAP2_CHAPTERS, TAP3_CHAPTERS, ALL_CHAPTERS } from '../data/chaptersData';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVolumeTab, setSelectedVolumeTab] = useState<'all' | 'tap1' | 'tap2' | 'tap3'>('all');

  const filteredChapters = useMemo(() => {
    return ALL_CHAPTERS.filter((ch) => {
      const matchVolume = selectedVolumeTab === 'all' || ch.volumeId === selectedVolumeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        ch.num.toLowerCase().includes(q) ||
        ch.title.toLowerCase().includes(q) ||
        ch.desc.toLowerCase().includes(q);
      return matchVolume && matchQuery;
    });
  }, [searchQuery, selectedVolumeTab]);

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            <span>✨ Sổ tay trực quan tương tác 3D</span>
            <span>&bull;</span>
            <span>TCXDVN 356:2005 / TCVN 5574:2018</span>
          </div>

          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-text-main leading-tight">
            Kết Cấu Bê Tông Cốt Thép
          </h1>
          <p className="text-sm font-medium text-text-muted">
            Theo bộ giáo trình 3 tập của <strong className="text-text-main">PGS. TS. Võ Bá Tầm</strong> — NXB Đại học Quốc gia TP.HCM.
          </p>

          <p className="text-text-main text-base leading-relaxed">
            Nền tảng học tập số hóa tĩnh, trực quan hóa toàn bộ nguyên lý tính toán, sơ đồ ứng suất và bố trí cốt thép bằng mô hình <strong>Three.js 3D thời gian thực</strong>. Giúp sinh viên và kỹ sư nắm vững bản chất vật lý của kết cấu bê tông.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/tap-1/chuong-3"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <span>Vào học Chương 3: Nguyên lý tính toán</span>
              <span>&rarr;</span>
            </Link>
            <Link
              to="/demo-3d"
              className="px-5 py-2.5 bg-surface border border-border text-text-main text-sm font-semibold rounded-xl hover:bg-bg transition-colors"
            >
              Xem phòng thí nghiệm 3D
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/80 text-xs">
            <div>
              <div className="font-mono text-xl font-bold text-primary">100%</div>
              <div className="text-text-muted mt-0.5">Mô hình 3D tương tác</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-text-main">3 Tập</div>
              <div className="text-text-muted mt-0.5">Toàn bộ 22 Chương &amp; 3 Phụ lục</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-emerald-600">0% Scan</div>
              <div className="text-text-muted mt-0.5">Hình vẽ chuẩn SVG / 3D</div>
            </div>
          </div>
        </div>

        {/* Hero 3D Card */}
        <div className="lg:col-span-5 h-[420px] bg-[#151922] rounded-2xl overflow-hidden border border-border shadow-xl relative">
          <ViewerCanvas cameraPosition={[1.7, 1.4, 2.1]}>
            {({ isXray, wireframe }) => (
              <group position={[0, 0, 0]}>
                <RCBeam
                  type="rect"
                  lengthMm={2600}
                  bMm={300}
                  hMm={500}
                  isXray={isXray}
                  wireframe={wireframe}
                  rebarProps={{
                    bottomCount: 4,
                    bottomDiamMm: 25,
                    topCount: 2,
                    topDiamMm: 12,
                    stirrupSpacingSupport: 100,
                    stirrupSpacingMidspan: 150,
                  }}
                />
                <group position={[0.2, 0, 0]}>
                  <StressBlock
                    bMm={300}
                    hMm={500}
                    xMm={220}
                    RbMpa={7.65}
                    RsMpa={280}
                  />
                </group>
                <LoadArrows
                  beamLengthMm={2600}
                  beamHeightMm={500}
                  qKnM={35}
                />
              </group>
            )}
          </ViewerCanvas>

          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border text-[11px] font-mono shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse"></span>
            <span>Three.js Real-time Interactive Viewer</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 bg-surface/90 backdrop-blur p-2.5 rounded-lg border border-border text-xs text-text-muted flex items-center justify-between">
            <span>Dầm BTCT 300x500mm &bull; Cốt đơn <InlineMath math="4\phi 25" /></span>
            <Link to="/tap-1/chuong-4" className="text-primary font-semibold hover:underline">
              Khám phá &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Case Study Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <span>🏗️ BÀI TẬP & DỰ ÁN MẪU THỰC TẾ</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold">
              Thiết Kế Kết Cấu Tòa Nhà Văn Phòng 5 Tầng Toàn Diện
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Bài tập nghiên cứu tổng hợp toàn bộ 3 tập sách Võ Bá Tầm: Tính toán liên hoàn từ Bản sàn, Dầm phụ, Dầm chính, Cột nén lệch tâm, Móng đơn, đến Cầu thang & Bể nước mái kèm mô hình 3D tương tác.
            </p>
          </div>
          <Link
            to="/du-an-thuc-te"
            className="px-6 py-3 bg-white text-stone-900 font-bold rounded-2xl shadow-md hover:bg-stone-100 transition-all text-sm whitespace-nowrap"
          >
            Khám phá Dự án ngay &rarr;
          </Link>
        </div>
      </section>

      {/* 3 Volumes Roadmap with Full Chapter Lists */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif font-bold text-3xl text-text-main">Hệ thống giáo trình 3 Tập</h2>
          <p className="text-text-muted text-sm">
            Trình bày hệ thống, bám sát từng mục lục, bài tập ví dụ và bảng tra cứu của tác giả PGS. TS. Võ Bá Tầm. Bấm vào bất kỳ chương nào để vào học ngay.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tập 1 */}
          <div className="bg-surface rounded-2xl border-2 border-primary/30 p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md uppercase">
                  Tập 1
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  9 Chương + ĐA + Phụ lục
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-text-main">Cấu kiện cơ bản</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Khái niệm chung, tính chất cơ lý vật liệu, nguyên lý tính toán theo THGH, cấu kiện chịu uốn, nén, kéo, nứt và biến dạng võng, chịu uốn xoắn đồng thời, và đồ án sàn dầm.
              </p>
              <div className="text-xs text-text-muted pt-2 border-t border-border">
                <div>• Tiêu chuẩn: <strong>TCXDVN 356:2005</strong> • 391 trang sách</div>
              </div>

              {/* Danh sách chương Tập 1 */}
              <div className="pt-2 space-y-1.5 border-t border-border">
                <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  Mục lục các chương:
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  {TAP1_CHAPTERS.map((ch) => (
                    <Link
                      key={ch.id}
                      to={ch.path}
                      className={`block p-2 rounded-lg text-xs transition-colors ${
                        ch.highlight
                          ? 'bg-amber-50 hover:bg-amber-100 border border-amber-300 font-semibold text-amber-950'
                          : 'bg-bg hover:bg-primary/5 text-text-main hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-primary mr-1">
                          {ch.num}:
                        </span>
                        {ch.highlight && (
                          <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.2 rounded font-sans uppercase">
                            Cốt lõi
                          </span>
                        )}
                      </div>
                      <div className="truncate text-text-main font-medium">{ch.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/tap-1/chuong-1"
              className="w-full text-center py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors block mt-4"
            >
              Vào học Tập 1 từ đầu &rarr;
            </Link>
          </div>

          {/* Tập 2 */}
          <div className="bg-surface rounded-2xl border-2 border-accent/30 p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-md uppercase">
                  Tập 2
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  5 Chương + Phụ lục
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-text-main">Cấu kiện nhà cửa</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Kết cấu sàn nhiều tầng (sàn nấm, sàn ô cờ, dầm trực giao), khung bê tông cốt thép toàn khối và lắp ghép, khe biến dạng, móng đơn, móng băng, móng bè, nhà công nghiệp một tầng, và dầm - dàn mái.
              </p>
              <div className="text-xs text-text-muted pt-2 border-t border-border">
                <div>• Tiêu chuẩn: <strong>TCXDVN 356:2005</strong> • 469 trang sách</div>
              </div>

              {/* Danh sách chương Tập 2 */}
              <div className="pt-2 space-y-1.5 border-t border-border">
                <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  Mục lục các chương:
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  {TAP2_CHAPTERS.map((ch) => (
                    <Link
                      key={ch.id}
                      to={ch.path}
                      className="block p-2 rounded-lg text-xs bg-bg hover:bg-accent/5 text-text-main hover:text-accent transition-colors"
                    >
                      <span className="font-mono font-bold text-accent mr-1">
                        {ch.num}:
                      </span>
                      <div className="truncate text-text-main font-medium">{ch.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/tap-2/chuong-1"
              className="w-full text-center py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors block mt-4"
            >
              Vào học Tập 2 từ đầu &rarr;
            </Link>
          </div>

          {/* Tập 3 */}
          <div className="bg-surface rounded-2xl border-2 border-purple-500/30 p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-600 text-xs font-bold rounded-md uppercase">
                  Tập 3
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  6 Chương + Phụ lục
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-text-main">Các cấu kiện đặc biệt</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Cầu thang bản và răng cưa xương cá, bể chứa chất lỏng tròn và ngầm, tường chắn đất góc có hoặc không sườn, silô và bunke lý thuyết Janssen, mái vỏ mỏng không gian, và cấu kiện chịu uốn - cắt - xoắn.
              </p>
              <div className="text-xs text-text-muted pt-2 border-t border-border">
                <div>• Tiêu chuẩn: <strong>TCVN 5574-1991 / 356:2005</strong> • 333 trang sách</div>
              </div>

              {/* Danh sách chương Tập 3 */}
              <div className="pt-2 space-y-1.5 border-t border-border">
                <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  Mục lục các chương:
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  {TAP3_CHAPTERS.map((ch) => (
                    <Link
                      key={ch.id}
                      to={ch.path}
                      className="block p-2 rounded-lg text-xs bg-bg hover:bg-purple-50 text-text-main hover:text-purple-600 transition-colors"
                    >
                      <span className="font-mono font-bold text-purple-600 mr-1">
                        {ch.num}:
                      </span>
                      <div className="truncate text-text-main font-medium">{ch.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/tap-3/chuong-1"
              className="w-full text-center py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition-colors block mt-4"
            >
              Vào học Tập 3 từ đầu &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Master Table of Contents Search & Filter */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="p-6 bg-surface rounded-2xl border border-border shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-2xl text-text-main flex items-center gap-2">
                <span>📚</span>
                <span>Mục Lục Toàn Thư 3 Tập (22 Chương &amp; 3 Phụ lục)</span>
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Tra cứu nhanh chóng, bấm vào tiêu đề để nhảy trực tiếp tới nội dung chi tiết và mô hình 3D.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-bg p-1.5 rounded-xl border border-border text-xs font-medium">
              <button
                onClick={() => setSelectedVolumeTab('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedVolumeTab === 'all'
                    ? 'bg-primary text-white font-bold'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                Tất cả ({ALL_CHAPTERS.length})
              </button>
              <button
                onClick={() => setSelectedVolumeTab('tap1')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedVolumeTab === 'tap1'
                    ? 'bg-primary text-white font-bold'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                Tập 1 ({TAP1_CHAPTERS.length})
              </button>
              <button
                onClick={() => setSelectedVolumeTab('tap2')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedVolumeTab === 'tap2'
                    ? 'bg-primary text-white font-bold'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                Tập 2 ({TAP2_CHAPTERS.length})
              </button>
              <button
                onClick={() => setSelectedVolumeTab('tap3')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedVolumeTab === 'tap3'
                    ? 'bg-primary text-white font-bold'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                Tập 3 ({TAP3_CHAPTERS.length})
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Tìm nhanh theo tên chương, chủ đề (ví dụ: Chương 3, tính chất vật liệu, uốn, nén, sàn, móng, cầu thang...)"
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-bg border border-border text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-text-muted hover:text-text-main"
              >
                Xóa ✕
              </button>
            )}
          </div>

          {/* Filtered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredChapters.map((ch) => (
              <Link
                key={ch.id}
                to={ch.path}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between group ${
                  ch.highlight
                    ? 'bg-amber-50/50 hover:bg-amber-50 border-amber-300 shadow-xs'
                    : 'bg-bg hover:bg-surface border-border hover:border-primary/50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        ch.volumeId === 'tap1'
                          ? 'bg-primary/10 text-primary'
                          : ch.volumeId === 'tap2'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {ch.volumeName.split(':')[0]} • {ch.num}
                    </span>
                    {ch.highlight && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                        Quan trọng
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-text-main group-hover:text-primary transition-colors">
                    {ch.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {ch.desc}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-primary pt-2 flex items-center justify-end gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Khám phá</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredChapters.length === 0 && (
            <div className="p-8 text-center text-text-muted text-sm border border-dashed border-border rounded-xl">
              Không tìm thấy chương nào phù hợp với từ khóa &quot;{searchQuery}&quot;. Hãy thử từ khóa khác.
            </div>
          )}
        </div>
      </section>

      {/* Tra cứu nhanh tiện ích */}
      <section className="max-w-6xl mx-auto px-4 bg-surface rounded-2xl border border-border p-8">
        <h2 className="font-serif font-bold text-2xl text-text-main mb-6 text-center">
          Kho tài nguyên tra cứu kỹ thuật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/cong-thuc"
            className="p-4 rounded-xl bg-bg hover:bg-primary/5 hover:border-primary/30 border border-border transition-all space-y-2 block"
          >
            <div className="text-2xl">📐</div>
            <h4 className="font-serif font-semibold text-sm text-text-main">Bảng tra công thức</h4>
            <p className="text-xs text-text-muted">Tổng hợp công thức uốn, nén, kéo, cắt, nứt võng chuẩn KaTeX.</p>
          </Link>

          <Link
            to="/ky-hieu"
            className="p-4 rounded-xl bg-bg hover:bg-primary/5 hover:border-primary/30 border border-border transition-all space-y-2 block"
          >
            <div className="text-2xl">🔤</div>
            <h4 className="font-serif font-semibold text-sm text-text-main">Bảng ký hiệu</h4>
            <p className="text-xs text-text-muted">Tra cứu định nghĩa các biến số, đơn vị đo và quy ước quốc gia.</p>
          </Link>

          <Link
            to="/phu-luc"
            className="p-4 rounded-xl bg-bg hover:bg-primary/5 hover:border-primary/30 border border-border transition-all space-y-2 block"
          >
            <div className="text-2xl">📊</div>
            <h4 className="font-serif font-semibold text-sm text-text-main">Phụ lục vật liệu</h4>
            <p className="text-xs text-text-muted">Bảng cường độ bê tông B15-B40, thép CI-CIV và diện tích cốt thép.</p>
          </Link>

          <Link
            to="/demo-3d"
            className="p-4 rounded-xl bg-bg hover:bg-primary/5 hover:border-primary/30 border border-border transition-all space-y-2 block"
          >
            <div className="text-2xl">🧊</div>
            <h4 className="font-serif font-semibold text-sm text-text-main">Phòng lab 3D</h4>
            <p className="text-xs text-text-muted">Khảo sát dầm, cột, sàn, móng, vách và vỏ mỏng với thanh trượt tham số.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};
