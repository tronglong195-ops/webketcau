import React, { useState } from 'react';
import katex from 'katex';
import { Compare5574Tag } from './StandardBanner';

export interface FormulaBlockProps {
  id?: string;
  number: string;            // Ví dụ "(4.12)"
  source: string;            // Ví dụ "T1 tr.65"
  latex: string;             // LaTeX math string
  description?: string;      // Mô tả giải thích ý nghĩa công thức
  compare5574?: boolean;     // Gắn nhãn [đối chiếu 5574:2018]
}

export const FormulaBlock: React.FC<FormulaBlockProps> = ({
  id,
  number,
  source,
  latex,
  description,
  compare5574 = false
}) => {
  const [copied, setCopied] = useState(false);

  let html = '';
  try {
    html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
      strict: 'ignore',
    });
  } catch {
    html = `<div class="p-2 text-rose-600 font-mono text-xs">${latex}</div>`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id={id} className="group relative my-4 sm:my-5 bg-surface border border-border rounded-2xl p-3.5 sm:p-4 shadow-soft hover:border-primary/40 transition-colors">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted mb-2 border-b border-border/60 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono font-bold text-primary text-xs sm:text-sm">{number}</span>
          <span className="text-[11px] bg-bg px-2 py-0.5 rounded-md border border-border text-text-muted font-mono font-medium">
            {source}
          </span>
          {compare5574 && <Compare5574Tag />}
        </div>
        <button
          onClick={handleCopy}
          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-bg hover:bg-primary-light hover:text-primary transition-colors flex items-center gap-1 border border-border/70 active:scale-95"
          title="Sao chép mã LaTeX"
        >
          {copied ? '✓ Đã chép' : '📋 Sao chép'}
        </button>
      </div>

      {/* KaTeX Math Equation with mobile-responsive horizontal scrolling */}
      <div className="overflow-x-auto py-2 sm:py-3 text-text-main text-sm sm:text-base text-center scrollbar-thin">
        <div dangerouslySetInnerHTML={{ __html: html }} className="inline-block min-w-full text-center" />
      </div>

      {/* Description if provided */}
      {description && (
        <p className="mt-2 text-xs text-text-muted italic border-t border-border/40 pt-2 font-sans leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
