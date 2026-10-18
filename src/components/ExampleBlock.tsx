import React, { useState } from 'react';

export interface ExampleStep {
  title: string;
  content: React.ReactNode;
}

export type SolutionItem =
  | string
  | ExampleStep
  | { step: string; detail: React.ReactNode };

export interface ExampleBlockProps {
  number?: string;
  title: string;
  source?: string;
  bookRef?: string;
  problem?: React.ReactNode;
  given?: React.ReactNode;
  steps?: ExampleStep[];
  solution?: SolutionItem[];
  initialOpen?: boolean;
}

export const ExampleBlock: React.FC<ExampleBlockProps> = ({
  number,
  title,
  source,
  bookRef,
  problem,
  given,
  steps,
  solution,
  initialOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const displayNum = number ?? 'Ví dụ';
  const displaySrc = source ?? bookRef;
  const displayProblem = problem ?? given;

  // Normalize steps
  const normalizedSteps: ExampleStep[] = [];
  if (steps && steps.length > 0) {
    normalizedSteps.push(...steps);
  } else if (solution && solution.length > 0) {
    solution.forEach((item, idx) => {
      if (typeof item === 'string') {
        normalizedSteps.push({
          title: `Bước ${idx + 1}`,
          content: <p className="whitespace-pre-line">{item}</p>
        });
      } else if ('title' in item && 'content' in item) {
        normalizedSteps.push(item as ExampleStep);
      } else if ('step' in item && 'detail' in item) {
        normalizedSteps.push({
          title: item.step,
          content: typeof item.detail === 'string' ? (
            <p className="whitespace-pre-line font-mono text-xs">{item.detail}</p>
          ) : (
            item.detail
          )
        });
      }
    });
  }

  return (
    <div className="my-6 border border-border rounded-custom bg-surface shadow-soft overflow-hidden">
      {/* Header clickable to expand/collapse */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-bg/60 hover:bg-bg border-b border-border transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-primary text-white rounded text-xs font-mono font-bold">
            {displayNum}
          </span>
          <h4 className="font-serif font-bold text-text-main text-base">{title}</h4>
          {displaySrc && (
            <span className="text-xs font-mono text-text-muted bg-surface px-2 py-0.5 rounded border border-border">
              {displaySrc}
            </span>
          )}
        </div>
        <span className="text-text-muted text-sm font-mono">{isOpen ? '▲ Thu gọn' : '▼ Chi tiết lời giải'}</span>
      </button>

      {/* Problem Statement */}
      {displayProblem && (
        <div className="p-5 border-b border-border/60 bg-surface text-sm leading-relaxed text-text-main">
          <strong className="text-primary font-semibold block mb-1">Đề bài:</strong>
          {typeof displayProblem === 'string' ? (
            <p className="whitespace-pre-line">{displayProblem}</p>
          ) : (
            displayProblem
          )}
        </div>
      )}

      {/* Steps (Collapsible) */}
      {isOpen && normalizedSteps.length > 0 && (
        <div className="p-5 space-y-4 bg-bg/30">
          <strong className="text-xs uppercase tracking-wider text-text-muted font-bold block mb-2">
            Lời giải chi tiết từng bước:
          </strong>
          {normalizedSteps.map((step, idx) => (
            <div key={idx} className="bg-surface p-4 rounded-lg border border-border/80 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-primary-light text-primary text-xs font-bold flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-text-main">{step.title}</span>
              </div>
              <div className="text-sm leading-relaxed text-text-main pl-7 space-y-2">
                {step.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
