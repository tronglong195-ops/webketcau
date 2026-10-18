import React from 'react';
import { Link } from 'react-router-dom';
import { StandardBanner } from '../components/StandardBanner';
import { FormulaBlock } from '../components/FormulaBlock';
import { ConstructionNote } from '../components/ConstructionNote';
import { CommonMistakes } from '../components/CommonMistakes';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { QuizBlock } from '../components/QuizBlock';
import { ChapterPagination } from '../components/ChapterPagination';
import { ViewerCanvas } from '../three/common/ViewerCanvas';
import { RCBeam } from '../three/elements/RCBeam';

export const Tap2Chuong5Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 2: Cấu kiện nhà cửa</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 5: Kết cấu mái</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 5: Kết Cấu Mái Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Thiết kế dầm mái khẩu độ lớn (dầm chữ I, dầm vát hai mái) và dàn mái bê tông cốt thép (dàn tam giác, dàn hình thang, dàn cánh song song) theo TCXDVN 356:2005.
        </p>
      </div>

      <StandardBanner volume="tap2" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-5-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.1 Dầm mái</a>
        <a href="#sec-5-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.2 Dàn mái</a>
      </div>

      {/* 5.1 DẦM MÁI */}
      <section id="sec-5-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Dầm mái bê tông cốt thép</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Dầm mái thường dùng cho nhà xưởng nhịp L = 12m, 18m. Để giảm trọng lượng bản thân dầm mái, người ta thường dùng tiết diện chữ T, chữ I có bản bụng mỏng (b = 80 - 120 mm) và mở rộng cánh trên để đỡ panen mái, hoặc dầm mái có độ dốc i = 1:12 thoát nước (T2 tr.380).
        </p>

        {/* 3D VIEWER: ROOF BEAM */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Dầm Mái Chữ I Nhịp Lớn</h3>
              <p className="text-xs text-text-sub">Quan sát cánh chữ T trên, cánh dưới và các sườn gia cường bản bụng mỏng</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
          </div>
          <div className="h-80 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[2.4, 1.2, 2.0]}>
              {({ isXray, wireframe }) => (
                <RCBeam lengthMm={2800} bMm={250} hMm={500} isXray={isXray} wireframe={wireframe} />
              )}
            </ViewerCanvas>
          </div>
        </div>

        <FormulaBlock
          number="(2.9)"
          source="T2 tr.385"
          latex={'h_{giua} = \\left( \\frac{1}{10} \\div \\frac{1}{12} \\right) L \\quad ; \\quad h_{dau} = 800 \\div 900\\text{ mm}'}
          description="Chiều cao dầm mái dốc hai phía để thoát nước mưa tự nhiên."
        />
      </section>

      {/* 5.2 DÀN MÁI */}
      <section id="sec-5-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Dàn mái bê tông cốt thép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khi nhịp mái lớn L = 24m, 30m, 36m, dùng dầm đặc sẽ quá nặng và võng lớn. Dàn mái BTCT gồm các thanh cánh trên (chịu nén), cánh hạ (chịu kéo căng) và hệ thanh bụng (thanh đứng và xiên) liên kết tại các mắt dàn (T2 tr.395):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-primary text-sm">Thanh cánh hạ chịu kéo:</h4>
            <p>Nội lực kéo cực lớn. Thường dùng giải pháp bê tông cốt thép ứng lực trước (căng trước trên bệ hoặc căng sau trong ống ghen) để khống chế vết nứt triệt để.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-accent text-sm">Mắt dàn mái:</h4>
            <p>Nơi giao thoa của 3 - 5 thanh. Cần gia cố lưới thép hàn chống chẻ toác và kiểm tra ứng suất nén cục bộ dưới tấm đệm panen mái.</p>
          </div>
        </div>
      </section>

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 5 - Tập 2"
        cards={[
          { front: 'Tại sao khi nhịp L >= 24m người ta dùng dàn mái thay cho dầm mái?', back: 'Vì dàn mái có kết cấu thanh rỗng, giảm trọng lượng bản thân rất lớn và tăng độ cứng chống võng.' },
          { front: 'Thanh cánh hạ của dàn mái chịu loại lực gì chủ yếu?', back: 'Chịu lực kéo đúng tâm hoặc kéo lệch tâm rất lớn, thường dùng kết cấu dự ứng lực.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 5 - Tập 2"
        questions={[
          {
            question: 'Dầm mái bê tông cốt thép nhịp lớn thường có tiết diện hình gì để giảm trọng lượng?',
            options: ['Hình chữ nhật đặc', 'Hình tròn', 'Hình chữ I hoặc chữ T bản bụng mỏng', 'Hình tam giác'],
            correctIndex: 2,
            explanation: 'Tiết diện chữ I và chữ T khoét rỗng vùng bê tông chịu kéo ở bản bụng, tập trung vật liệu ở hai cánh giúp chịu uốn tốt nhất với trọng lượng nhẹ nhất.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-2/chuong-5" />
    </div>
  );
};
