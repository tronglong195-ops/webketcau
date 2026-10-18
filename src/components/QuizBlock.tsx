import React, { useState } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizBlockProps {
  questions: QuizQuestion[];
  title?: string;
}

export const QuizBlock: React.FC<QuizBlockProps> = ({
  questions,
  title = "Trắc nghiệm ôn tập (8 câu hỏi)"
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, ans]) => {
    return acc + (questions[Number(qIdx)].correctIndex === ans ? 1 : 0);
  }, 0);

  return (
    <div className="my-8 bg-surface border border-border rounded-custom p-6 shadow-soft">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
        <div>
          <h3 className="font-serif font-bold text-xl text-text-main">{title}</h3>
          <p className="text-xs text-text-muted mt-0.5">Kiểm tra khả năng nắm vững lý thuyết và tính toán</p>
        </div>
        {showResults && (
          <div className="px-3 py-1 bg-primary-light text-primary font-mono font-bold text-sm rounded-lg">
            Kết quả: {score}/{questions.length} câu đúng
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const userAns = selectedAnswers[qIdx];
          const isAnswered = userAns !== undefined;

          return (
            <div key={qIdx} className="border border-border/80 rounded-lg p-4 bg-bg/30">
              <p className="font-semibold text-sm text-text-main mb-3">
                <span className="font-mono text-primary mr-1">Câu {qIdx + 1}:</span> {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  let optStyle = "border-border hover:bg-bg text-text-main";
                  if (userAns === optIdx) {
                    optStyle = "border-primary bg-primary-light text-primary font-medium";
                  }
                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      optStyle = "border-green-500 bg-green-50 text-green-800 font-semibold";
                    } else if (userAns === optIdx && userAns !== q.correctIndex) {
                      optStyle = "border-red-500 bg-red-50 text-red-800 line-through";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2 ${optStyle}`}
                    >
                      <span className="font-mono font-bold uppercase shrink-0">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 pt-2 border-t border-border/60 text-xs text-text-muted bg-surface p-2 rounded">
                  <strong className="text-text-main">Giải thích: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Chấm điểm ({Object.keys(selectedAnswers).length}/{questions.length} câu)
          </button>
        ) : (
          <button
            onClick={() => {
              setSelectedAnswers({});
              setShowResults(false);
            }}
            className="px-5 py-2.5 bg-surface hover:bg-bg border border-border text-text-main rounded-lg text-sm font-medium transition-colors"
          >
            Làm lại bài trắc nghiệm
          </button>
        )}
      </div>
    </div>
  );
};
