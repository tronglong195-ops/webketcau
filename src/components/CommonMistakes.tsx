import React from 'react';

export interface MistakeItem {
  mistake: string;
  consequence: string;
  correction: string;
  bookRef?: string;
}

export interface CommonMistakesProps {
  mistakes: MistakeItem[];
  title?: string;
}

export const CommonMistakes: React.FC<CommonMistakesProps> = ({
  mistakes,
  title = "Lỗi thường gặp khi tính toán (Theo sách Võ Bá Tầm)"
}) => {
  return (
    <div className="my-8 bg-rose-50/50 border border-rose-200 rounded-custom p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-4 border-b border-rose-200/80 pb-3">
        <span className="text-xl">⚠️</span>
        <h3 className="font-serif font-bold text-lg text-rose-950">{title}</h3>
      </div>

      <div className="space-y-4">
        {mistakes.map((item, idx) => (
          <div key={idx} className="bg-surface p-4 rounded-lg border border-rose-200/60 shadow-xs">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="font-semibold text-sm text-rose-900">
                ❌ {item.mistake}
              </span>
              {item.bookRef && (
                <span className="text-[11px] font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 shrink-0">
                  {item.bookRef}
                </span>
              )}
            </div>
            <p className="text-xs text-text-muted mb-2">
              <strong className="text-rose-800">Hậu quả: </strong>{item.consequence}
            </p>
            <p className="text-xs text-green-900 bg-green-50/80 p-2 rounded border border-green-200">
              <strong className="text-green-800">Khắc phục chuẩn xác: </strong>{item.correction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
