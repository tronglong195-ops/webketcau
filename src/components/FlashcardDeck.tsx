import React, { useState } from 'react';

export interface Flashcard {
  front?: string;             // Câu hỏi hoặc thuật ngữ
  back?: string;              // Câu trả lời hoặc định nghĩa/công thức
  question?: string;
  answer?: string;
  category?: string;
}

export interface FlashcardDeckProps {
  cards: Flashcard[];
  title?: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  title = "Thẻ ghi nhớ trọng tâm (8 Flashcards)"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = cards[currentIndex] || {};
  const frontText = card.front || card.question || '';
  const backText = card.back || card.answer || '';

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="my-8 bg-surface border border-border rounded-custom p-6 shadow-soft">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
        <h3 className="font-serif font-bold text-xl text-text-main">{title}</h3>
        <span className="font-mono text-xs text-text-muted bg-bg px-2.5 py-1 rounded-full border border-border">
          Thẻ {currentIndex + 1} / {cards.length}
        </span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-56 cursor-pointer select-none perspective group"
      >
        <div
          className={`w-full h-full relative transition-transform duration-500 transform-style-3d rounded-xl border border-border p-6 flex flex-col justify-between shadow-card ${
            isFlipped ? 'bg-primary-light/50 border-primary/50' : 'bg-bg/60 hover:bg-bg'
          }`}
        >
          {/* Card Top Tag */}
          <div className="flex justify-between items-center text-xs font-mono text-text-muted">
            <span className="font-semibold text-primary">
              {card.category || 'KIẾN THỨC CỐT LÕI'}
            </span>
            <span className="text-[11px] text-text-muted/70">
              {isFlipped ? 'Mặt sau (Đáp án)' : 'Mặt trước (Bấm để lật)'}
            </span>
          </div>

          {/* Card Main Text */}
          <div className="my-auto text-center px-4">
            <p className="text-base sm:text-lg font-serif font-bold text-text-main leading-snug">
              {isFlipped ? backText : frontText}
            </p>
          </div>

          {/* Card Bottom Hint */}
          <div className="text-center text-[11px] text-text-muted font-sans">
            🔄 Bấm chuột vào thẻ để lật xem {isFlipped ? 'câu hỏi' : 'giải thích'}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-muted hover:text-text-main hover:bg-bg transition-colors"
        >
          ← Thẻ trước
        </button>
        <div className="flex gap-1.5">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentIndex === idx ? 'bg-primary' : 'bg-border hover:bg-text-muted/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="px-4 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-muted hover:text-text-main hover:bg-bg transition-colors"
        >
          Thẻ sau →
        </button>
      </div>
    </div>
  );
};
