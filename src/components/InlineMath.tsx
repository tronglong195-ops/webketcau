import React from 'react';
import katex from 'katex';

interface InlineMathProps {
  math: string;
  className?: string;
}

/**
 * Inline KaTeX math renderer.
 * Automatically cleans leading/trailing $, $$, \(, \) delimiters.
 * Falls back gracefully to raw text if syntax is irregular.
 */
export const InlineMath: React.FC<InlineMathProps> = ({ math, className = '' }) => {
  if (!math) return null;

  let clean = math.trim();

  // Strip common delimiters
  if (clean.startsWith('\\(') && clean.endsWith('\\)')) {
    clean = clean.slice(2, -2).trim();
  } else if (clean.startsWith('$$') && clean.endsWith('$$')) {
    clean = clean.slice(2, -2).trim();
  } else if (clean.startsWith('$') && clean.endsWith('$')) {
    clean = clean.slice(1, -1).trim();
  }

  let html = '';
  try {
    html = katex.renderToString(clean, {
      throwOnError: false,
      displayMode: false,
      strict: 'ignore',
    });
  } catch {
    html = `<span class="text-primary font-mono">${clean}</span>`;
  }

  return (
    <span
      className={`inline-math font-sans text-text-main inline-block align-baseline mx-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
