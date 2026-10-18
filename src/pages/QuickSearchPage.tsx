import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import coverageData from '../../coverage.json';

interface SearchItem {
  id: string;
  title: string;
  chapterTitle: string;
  volumeTitle: string;
  volumeId: string;
  chapterId: string;
  status: string;
  path: string;
}

export const QuickSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');

  // Làm phẳng toàn bộ mục lục 160 đề mục để tìm kiếm
  const allItems: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [];
    for (const vol of coverageData.volumes) {
      for (const ch of vol.chapters) {
        for (const sec of ch.sections) {
          list.push({
            id: sec.id,
            title: sec.title,
            chapterTitle: ch.title,
            volumeTitle: vol.title,
            volumeId: vol.id,
            chapterId: ch.id,
            status: sec.status,
            path: ch.id === 'c4' && vol.id === 'tap-1' ? '/tap-1/chuong-4' : '#',
          });
        }
      }
    }
    return list;
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: ['title', 'chapterTitle', 'volumeTitle', 'id'],
      threshold: 0.35,
    });
  }, [allItems]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 20);
    }
    return fuse.search(query).map((res) => res.item);
  }, [query, fuse, allItems]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-serif font-bold text-3xl text-text-main mb-2">Tra cứu nhanh toàn bộ giáo trình</h1>
        <p className="text-sm text-text-muted">
          Tìm kiếm tức thời trên 160 đề mục thuộc 3 tập sách Kết cấu Bê tông Cốt thép — Võ Bá Tầm.
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Nhập từ khóa (ví dụ: chữ T, cốt kép, biểu đồ vật liệu, lực cắt, nén đúng tâm...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full bg-surface border-2 border-border focus:border-primary rounded-2xl px-5 py-3.5 text-base focus:outline-none shadow-sm transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-main"
          >
            Xóa
          </button>
        )}
      </div>

      <div className="text-xs text-text-muted flex justify-between items-center px-1">
        <span>Tìm thấy <strong>{searchResults.length}</strong> kết quả</span>
        <span>Phím tắt: Esc để xóa</span>
      </div>

      <div className="space-y-3">
        {searchResults.map((item) => (
          <div
            key={`${item.volumeId}-${item.chapterId}-${item.id}`}
            className="p-4 bg-surface rounded-xl border border-border hover:border-primary/40 transition-all flex flex-wrap items-center justify-between gap-3 shadow-sm"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-text-muted font-medium">
                <span className="font-mono text-primary font-bold">{item.volumeTitle.split('—')[0]}</span>
                <span>&bull;</span>
                <span>{item.chapterTitle}</span>
              </div>
              <h4 className="font-serif font-semibold text-sm text-text-main">
                Mục {item.id}: {item.title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                  item.status === 'done'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.status === 'in_progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-bg text-text-muted'
                }`}
              >
                {item.status === 'done' ? 'Đã hoàn thành' : item.status === 'in_progress' ? 'Đang soạn' : 'Chờ biên soạn'}
              </span>

              {item.path !== '#' ? (
                <Link
                  to={item.path}
                  className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Xem bài &rarr;
                </Link>
              ) : (
                <span className="text-xs text-text-muted px-2 py-1 italic">Đang cập nhật</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
