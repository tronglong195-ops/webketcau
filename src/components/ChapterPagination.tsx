import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdjacentChapters, TAP1_CHAPTERS, TAP2_CHAPTERS, TAP3_CHAPTERS } from '../data/chaptersData';

interface ChapterPaginationProps {
  currentPath: string;
}

export const ChapterPagination: React.FC<ChapterPaginationProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [showToc, setShowToc] = useState(false);
  const { prev, current, next, volumeChapters } = getAdjacentChapters(currentPath);

  if (!current) {
    return null;
  }

  return (
    <div className="pt-10 pb-6 border-t border-border space-y-6">
      {/* Main Prev / Next Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Prev Button */}
        <div className="sm:col-span-5">
          {prev ? (
            <Link
              to={prev.path}
              className="group flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface hover:bg-bg hover:border-primary/40 transition-all text-left shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-bg group-hover:bg-primary/10 text-text-muted group-hover:text-primary flex items-center justify-center font-bold text-sm shrink-0 transition-colors">
                &larr;
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Bài trước
                </div>
                <div className="text-sm font-semibold text-text-main group-hover:text-primary truncate transition-colors">
                  {prev.num}: {prev.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-3.5 rounded-xl border border-dashed border-border/60 text-text-muted/60 text-xs text-center sm:text-left">
              Đầu tập
            </div>
          )}
        </div>

        {/* Quick Chapter Selector & TOC button */}
        <div className="sm:col-span-2 flex flex-col items-center justify-center gap-1">
          <button
            onClick={() => setShowToc(!showToc)}
            className="px-3 py-2 rounded-lg bg-bg hover:bg-primary/10 border border-border text-xs font-semibold text-text-sub hover:text-primary transition-colors flex items-center gap-1.5 shadow-xs"
            title="Xem mục lục tập này"
          >
            <span>📚</span>
            <span>Mục lục tập</span>
            <span className="text-[10px] text-text-muted">({volumeChapters.length})</span>
          </button>
        </div>

        {/* Next Button */}
        <div className="sm:col-span-5">
          {next ? (
            <Link
              to={next.path}
              className="group flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-surface hover:bg-bg hover:border-primary/40 transition-all text-right shadow-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Bài tiếp theo
                </div>
                <div className="text-sm font-semibold text-text-main group-hover:text-primary truncate transition-colors">
                  {next.num}: {next.title}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                &rarr;
              </div>
            </Link>
          ) : (
            <div className="p-3.5 rounded-xl border border-dashed border-border/60 text-text-muted/60 text-xs text-center sm:text-right">
              Cuối tập
            </div>
          )}
        </div>
      </div>

      {/* Expandable Table of Contents for Current Volume */}
      {showToc && (
        <div className="p-4 bg-surface rounded-2xl border border-border shadow-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-border/80 pb-2">
            <h4 className="text-sm font-serif font-bold text-text-main flex items-center gap-2">
              <span>📖</span>
              <span>{current.volumeName} — Danh sách toàn bộ các chương</span>
            </h4>
            <button
              onClick={() => setShowToc(false)}
              className="text-xs text-text-muted hover:text-text-main px-2 py-0.5 rounded hover:bg-bg"
            >
              Đóng ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {volumeChapters.map((ch) => {
              const isActive = ch.path === current.path;
              return (
                <Link
                  key={ch.id}
                  to={ch.path}
                  onClick={() => setShowToc(false)}
                  className={`p-2.5 rounded-xl border transition-all flex items-start gap-2 ${
                    isActive
                      ? 'bg-primary/10 border-primary text-primary font-semibold shadow-xs'
                      : 'bg-bg border-border/80 hover:border-primary/50 text-text-main hover:bg-surface'
                  }`}
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                      isActive ? 'bg-primary text-white font-bold' : 'bg-surface text-text-muted'
                    }`}
                  >
                    {ch.num}
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{ch.title}</div>
                    <div className="text-[11px] text-text-muted line-clamp-1">{ch.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Jump across all 3 volumes */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-bg/80 p-3 rounded-xl border border-border/70 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-text-main">Chuyển nhanh chương:</span>
          <select
            value={current.path}
            onChange={(e) => navigate(e.target.value)}
            className="bg-surface border border-border rounded-lg px-2.5 py-1 text-xs text-text-main focus:outline-none focus:border-primary cursor-pointer font-medium"
          >
            <optgroup label="Tập 1: Cấu kiện cơ bản">
              {TAP1_CHAPTERS.map((c) => (
                <option key={c.path} value={c.path}>
                  {c.num}: {c.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Tập 2: Cấu kiện nhà cửa">
              {TAP2_CHAPTERS.map((c) => (
                <option key={c.path} value={c.path}>
                  {c.num}: {c.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Tập 3: Các cấu kiện đặc biệt">
              {TAP3_CHAPTERS.map((c) => (
                <option key={c.path} value={c.path}>
                  {c.num}: {c.title}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <Link to="/" className="text-text-sub hover:text-primary transition-colors flex items-center gap-1 font-medium">
          <span>🏠</span>
          <span>Về trang chủ</span>
        </Link>
      </div>
    </div>
  );
};
