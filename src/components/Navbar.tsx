import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TAP1_CHAPTERS, TAP2_CHAPTERS, TAP3_CHAPTERS, ChapterItem } from '../data/chaptersData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'tap1' | 'tap2' | 'tap3' | null>(null);
  const [mobileExpandedVolume, setMobileExpandedVolume] = useState<'tap1' | 'tap2' | 'tap3' | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isTap1 = location.pathname.startsWith('/tap-1');
  const isTap2 = location.pathname.startsWith('/tap-2');
  const isTap3 = location.pathname.startsWith('/tap-3');

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const renderDropdownContent = (chapters: ChapterItem[], volumeTitle: string, volumePath: string) => (
    <div
      className="absolute top-full left-0 mt-1 w-80 md:w-96 bg-surface rounded-2xl border border-border shadow-xl p-3 z-50 animate-fadeIn"
      onMouseEnter={() => {}}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/80 px-2">
        <span className="font-serif font-bold text-xs uppercase tracking-wider text-text-muted">
          {volumeTitle}
        </span>
        <Link
          to={volumePath}
          onClick={() => setActiveDropdown(null)}
          className="text-[11px] font-semibold text-primary hover:underline"
        >
          Xem từ đầu &rarr;
        </Link>
      </div>

      <div className="max-h-[380px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
        {chapters.map((ch) => {
          const isActive = location.pathname === ch.path;
          return (
            <Link
              key={ch.id}
              to={ch.path}
              onClick={() => setActiveDropdown(null)}
              className={`flex items-start gap-2.5 p-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'hover:bg-bg text-text-main hover:text-primary'
              }`}
            >
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                  isActive
                    ? 'bg-primary text-white font-bold'
                    : ch.highlight
                    ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                    : 'bg-bg text-text-muted border border-border/60'
                }`}
              >
                {ch.num}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-medium leading-tight truncate">
                  {ch.title}
                </div>
                <div className="text-[11px] text-text-muted truncate mt-0.5 font-normal">
                  {ch.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" ref={dropdownRef}>
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            BT
          </div>
          <div>
            <div className="font-serif font-bold text-base sm:text-lg text-text-main leading-none">
              Kết Cấu BTCT
            </div>
            <div className="text-[11px] font-mono text-text-muted mt-0.5">
              Võ Bá Tầm • 3D Interactive
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/'
                ? 'bg-primary-light text-primary font-semibold'
                : 'text-text-muted hover:text-text-main hover:bg-bg'
            }`}
          >
            Trang chủ
          </Link>

          {/* Tập 1 Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('tap1')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center">
              <Link
                to="/tap-1/chuong-1"
                className={`px-3 py-1.5 rounded-l-lg transition-colors flex items-center gap-1 ${
                  isTap1
                    ? 'bg-primary-light text-primary font-semibold'
                    : 'text-text-muted hover:text-text-main hover:bg-bg'
                }`}
              >
                <span>Tập 1: Cơ bản</span>
              </Link>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'tap1' ? null : 'tap1')}
                className={`px-1.5 py-1.5 rounded-r-lg transition-colors text-xs ${
                  isTap1
                    ? 'bg-primary-light text-primary'
                    : 'text-text-muted hover:text-text-main hover:bg-bg'
                }`}
                aria-label="Xem mục lục Tập 1"
              >
                ▾
              </button>
            </div>
            {activeDropdown === 'tap1' &&
              renderDropdownContent(TAP1_CHAPTERS, 'Tập 1: Cấu kiện cơ bản (9 Chương + Đồ án)', '/tap-1/chuong-1')}
          </div>

          {/* Tập 2 Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('tap2')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center">
              <Link
                to="/tap-2/chuong-1"
                className={`px-3 py-1.5 rounded-l-lg transition-colors flex items-center gap-1 ${
                  isTap2
                    ? 'bg-primary-light text-primary font-semibold'
                    : 'text-text-muted hover:text-text-main hover:bg-bg'
                }`}
              >
                <span>Tập 2: Nhà cửa</span>
              </Link>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'tap2' ? null : 'tap2')}
                className={`px-1.5 py-1.5 rounded-r-lg transition-colors text-xs ${
                  isTap2
                    ? 'bg-primary-light text-primary'
                    : 'text-text-muted hover:text-text-main hover:bg-bg'
                }`}
                aria-label="Xem mục lục Tập 2"
              >
                ▾
              </button>
            </div>
            {activeDropdown === 'tap2' &&
              renderDropdownContent(TAP2_CHAPTERS, 'Tập 2: Cấu kiện nhà cửa (5 Chương + Phụ lục)', '/tap-2/chuong-1')}
          </div>

          {/* Tập 3 Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('tap3')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center">
              <Link
                to="/tap-3/chuong-1"
                className={`px-3 py-1.5 rounded-l-lg transition-colors flex items-center gap-1 ${
                  isTap3
                    ? 'bg-primary-light text-primary font-semibold'
                    : 'text-text-muted hover:text-text-main hover:bg-bg'
                }`}
              >
                <span>Tập 3: Đặc biệt</span>
              </Link>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'tap3' ? null : 'tap3')}
                className={`px-1.5 py-1.5 rounded-r-lg transition-colors text-xs ${
                  isTap3
                    ? 'bg-primary-light text-primary'
                    : 'text-text-muted hover:text-text-main hover:bg-bg'
                }`}
                aria-label="Xem mục lục Tập 3"
              >
                ▾
              </button>
            </div>
            {activeDropdown === 'tap3' &&
              renderDropdownContent(TAP3_CHAPTERS, 'Tập 3: Cấu kiện đặc biệt (6 Chương + Phụ lục)', '/tap-3/chuong-1')}
          </div>

          <div className="h-4 w-px bg-border mx-1" />

          <Link
            to="/du-an-thuc-te"
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              location.pathname === '/du-an-thuc-te'
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/30'
                : 'text-text-muted hover:text-text-main hover:bg-bg'
            }`}
          >
            <span>🏗️</span>
            <span>Dự án mẫu</span>
          </Link>

          <Link
            to="/demo-3d"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/demo-3d'
                ? 'bg-primary-light text-primary font-semibold'
                : 'text-text-muted hover:text-text-main hover:bg-bg'
            }`}
          >
            Phòng 3D
          </Link>
          <Link
            to="/cong-thuc"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/cong-thuc'
                ? 'bg-primary-light text-primary font-semibold'
                : 'text-text-muted hover:text-text-main hover:bg-bg'
            }`}
          >
            Công thức
          </Link>
          <Link
            to="/tra-cuu"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/tra-cuu' || location.pathname === '/ky-hieu' || location.pathname === '/phu-luc'
                ? 'bg-primary-light text-primary font-semibold'
                : 'text-text-muted hover:text-text-main hover:bg-bg'
            }`}
          >
            Tra cứu
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-bg border border-border"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-surface px-4 pt-2 pb-6 space-y-2 shadow-card max-h-[85vh] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-medium ${
              location.pathname === '/' ? 'bg-primary/10 text-primary font-semibold' : 'text-text-main hover:bg-bg'
            }`}
          >
            🏠 Trang chủ
          </Link>

          {/* Mobile Tập 1 Accordion */}
          <div className="border border-border/70 rounded-xl overflow-hidden">
            <button
              onClick={() => setMobileExpandedVolume(mobileExpandedVolume === 'tap1' ? null : 'tap1')}
              className={`w-full flex items-center justify-between p-3 text-sm font-semibold text-left transition-colors ${
                isTap1 ? 'bg-primary/10 text-primary' : 'bg-bg text-text-main'
              }`}
            >
              <span>📘 Tập 1: Cấu kiện cơ bản (9 Chương + ĐA)</span>
              <span>{mobileExpandedVolume === 'tap1' ? '▲' : '▼'}</span>
            </button>
            {mobileExpandedVolume === 'tap1' && (
              <div className="p-2 bg-surface space-y-1">
                {TAP1_CHAPTERS.map((ch) => (
                  <Link
                    key={ch.id}
                    to={ch.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-2.5 py-1.5 rounded-lg text-xs ${
                      location.pathname === ch.path
                        ? 'bg-primary text-white font-semibold'
                        : 'text-text-main hover:bg-bg'
                    }`}
                  >
                    <span className="font-mono font-bold mr-1.5">[{ch.num}]</span>
                    <span>{ch.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Tập 2 Accordion */}
          <div className="border border-border/70 rounded-xl overflow-hidden">
            <button
              onClick={() => setMobileExpandedVolume(mobileExpandedVolume === 'tap2' ? null : 'tap2')}
              className={`w-full flex items-center justify-between p-3 text-sm font-semibold text-left transition-colors ${
                isTap2 ? 'bg-primary/10 text-primary' : 'bg-bg text-text-main'
              }`}
            >
              <span>📙 Tập 2: Cấu kiện nhà cửa (5 Chương)</span>
              <span>{mobileExpandedVolume === 'tap2' ? '▲' : '▼'}</span>
            </button>
            {mobileExpandedVolume === 'tap2' && (
              <div className="p-2 bg-surface space-y-1">
                {TAP2_CHAPTERS.map((ch) => (
                  <Link
                    key={ch.id}
                    to={ch.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-2.5 py-1.5 rounded-lg text-xs ${
                      location.pathname === ch.path
                        ? 'bg-primary text-white font-semibold'
                        : 'text-text-main hover:bg-bg'
                    }`}
                  >
                    <span className="font-mono font-bold mr-1.5">[{ch.num}]</span>
                    <span>{ch.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Tập 3 Accordion */}
          <div className="border border-border/70 rounded-xl overflow-hidden">
            <button
              onClick={() => setMobileExpandedVolume(mobileExpandedVolume === 'tap3' ? null : 'tap3')}
              className={`w-full flex items-center justify-between p-3 text-sm font-semibold text-left transition-colors ${
                isTap3 ? 'bg-primary/10 text-primary' : 'bg-bg text-text-main'
              }`}
            >
              <span>📕 Tập 3: Cấu kiện đặc biệt (6 Chương)</span>
              <span>{mobileExpandedVolume === 'tap3' ? '▲' : '▼'}</span>
            </button>
            {mobileExpandedVolume === 'tap3' && (
              <div className="p-2 bg-surface space-y-1">
                {TAP3_CHAPTERS.map((ch) => (
                  <Link
                    key={ch.id}
                    to={ch.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-2.5 py-1.5 rounded-lg text-xs ${
                      location.pathname === ch.path
                        ? 'bg-primary text-white font-semibold'
                        : 'text-text-main hover:bg-bg'
                    }`}
                  >
                    <span className="font-mono font-bold mr-1.5">[{ch.num}]</span>
                    <span>{ch.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/du-an-thuc-te"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold text-xs border border-amber-500/30"
          >
            <span>🏗️</span>
            <span>Dự án mẫu thực tế (Tổng hợp 3 tập)</span>
          </Link>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border text-xs">
            <Link
              to="/demo-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-center rounded-lg bg-bg text-text-sub hover:text-text-main font-medium"
            >
              Phòng 3D
            </Link>
            <Link
              to="/cong-thuc"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-center rounded-lg bg-bg text-text-sub hover:text-text-main font-medium"
            >
              Công thức
            </Link>
            <Link
              to="/tra-cuu"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-center rounded-lg bg-bg text-text-sub hover:text-text-main font-medium"
            >
              Tra cứu
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
