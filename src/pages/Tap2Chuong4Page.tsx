import { InlineMath } from '../components/InlineMath';
import React from 'react';
import { Link } from 'react-router-dom';
import { StandardBanner } from '../components/StandardBanner';
import { FormulaBlock } from '../components/FormulaBlock';
import { ConstructionNote } from '../components/ConstructionNote';
import { CommonMistakes } from '../components/CommonMistakes';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { QuizBlock } from '../components/QuizBlock';
import { ExampleBlock } from '../components/ExampleBlock';
import { ChapterPagination } from '../components/ChapterPagination';
import { ViewerCanvas } from '../three/common/ViewerCanvas';
import { RCColumn } from '../three/elements/RCColumn';

export const Tap2Chuong4Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 2: Cấu kiện nhà cửa</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 4: Nhà công nghiệp một tầng lắp ghép</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 4: Nhà Công Nghiệp Một Tầng Lắp Ghép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Thiết kế khung ngang chịu lực, xác định tải trọng cầu trục, cột đặc chữ nhật, cột chữ I, cột hai nhánh, vai cột (corbel), kiểm tra cẩu lắp vận chuyển và cấu tạo hệ giằng.
        </p>
      </div>

      <StandardBanner volume="tap2" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-4-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.1 Khái niệm</a>
        <a href="#sec-4-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.2 Khung ngang</a>
        <a href="#sec-4-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.3 Tải trọng &amp; Cầu trục</a>
        <a href="#sec-4-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.4 Nội lực cột</a>
        <a href="#sec-4-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.5 Tổ hợp nội lực</a>
        <a href="#sec-4-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.6 Tính thép &amp; Vai cột</a>
        <a href="#sec-4-7" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.7 Yêu cầu cấu tạo</a>
        <a href="#sec-4-8" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.8 Cột hai nhánh</a>
        <a href="#sec-4-9" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.9 Khung lệch nhịp</a>
        <a href="#sec-4-10" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.10 Ngoài mặt phẳng</a>
        <a href="#sec-4-11" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.11 Vận chuyển &amp; Cẩu lắp</a>
        <a href="#sec-4-12" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">4.12 Hệ giằng</a>
      </div>

      {/* 4.1 KHÁI NIỆM & 4.2 KHUNG NGANG */}
      <section id="sec-4-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">4.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm &amp; Thiết kế khung ngang nhà công nghiệp</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Nhà công nghiệp một tầng thường có nhịp lớn (18m, 24m, 30m, 36m), chiều cao lớn (8m - 18m) và được trang bị cầu trục nâng chuyển tải trọng nặng từ 5 tấn đến 50 tấn. Khung ngang gồm cột bê tông cốt thép ngàm vào móng cốc và dàn mái (hoặc dầm mái) liên kết khớp hoặc ngàm ở đỉnh cột (T2 tr.275).
        </p>

        {/* 3D VIEWER: INDUSTRIAL COLUMN WITH CORBEL */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Cột Nhà Công Nghiệp Có Vai Cột</h3>
              <p className="text-xs text-text-sub">Quan sát phần cột trên, cột dưới, và vai cột đỡ dầm cầu trục</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
          </div>
          <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[2.4, 2.0, 2.4]}>
              {({ isXray, wireframe }) => (
                <RCColumn heightMm={3800} bMm={400} hMm={600} isXray={isXray} wireframe={wireframe} />
              )}
            </ViewerCanvas>
          </div>
        </div>
      </section>

      {/* 4.3 TẢI TRỌNG CẦU TRỤC & NỘI LỰC */}
      <section id="sec-4-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">4.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tải trọng tác dụng &amp; Cầu trục (Dmax, Dmin, T)</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Tải trọng cầu trục là tải trọng đặc biệt gây bất lợi lớn nhất cho cột nhà xưởng:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-primary">1. Áp lực đứng Dmax / Dmin</h4>
            <p>Khi xe con mang tải trọng nâng Q chạy sát về một bên cột, bánh xe cầu trục truyền áp lực thẳng đứng lớn nhất Dmax vào vai cột bên đó, và Dmin vào cột đối diện.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-accent">2. Lực hãm ngang T</h4>
            <p>Sinh ra do quán tính khi hãm xe con mang vật nặng chạy ngang nhà xưởng: <InlineMath math="T = 0.1 (Q + G_{xc}) g" />. Lực T tác dụng ngang vuông góc với ray cầu trục.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-text-main">3. Tải trọng gió W</h4>
            <p>Gió thổi vào tường và mái đón gió (áp lực đẩy c = +0.8) và hút ở mặt sau (c = -0.6) theo TCVN 2737.</p>
          </div>
        </div>

        <FormulaBlock
          number="(2.7)"
          source="T2 tr.290"
          latex="D_{max} = \gamma_p \sum P_i y_i \quad ; \quad D_{min} = \gamma_p \sum P'_i y_i"
          description="Tính theo đường ảnh hưởng phản lực tựa của dầm cầu trục hai nhịp kề nhau."
        />
      </section>

      {/* 4.5 TÍNH VAI CỘT (CORBEL) */}
      <section id="sec-4-6" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">4.6</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tính toán và cấu tạo vai cột (Corbel)</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Vai cột là cấu kiện công xôn ngắn có cánh tay đòn <InlineMath math="c \\le 0.9 h_0" />. Phá hoại chủ yếu do vết nứt chéo từ điểm đặt tải trọng đến chân vai cột (phá hoại nén trượt) (T2 tr.320):
        </p>

        <FormulaBlock
          number="(2.8)"
          source="T2 tr.322"
          latex={'Q \\le 0.8 R_{bt} b h_0 \\quad ; \\quad A_s = \\frac{1.25 M}{R_s h_0} + \\frac{N_h}{R_s}'}
          description="Nh: lực xô ngang do ray cầu trục co giãn; Cốt đai vai cột phải đặt nằm ngang hoặc xiên."
          compare5574={true}
        />
      </section>

      {/* 4.8 CỘT HAI NHÁNH */}
      <section id="sec-4-8" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">4.8</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cột hai nhánh (Cột rỗng)</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khi sức trục lớn (<InlineMath math="Q \\ge 30\\text{ tấn}" />) và chiều cao cột dưới lớn (<InlineMath math="H_d \\ge 8\\text{ m}" />), cột dưới được thiết kế dạng hai nhánh liên kết bằng các thanh giằng ngang để tiết kiệm vật liệu bê tông và giảm trọng lượng cẩu lắp (T2 tr.335).
        </p>
      </section>

      {/* 4.10, 4.11 CẨU LẮP & 4.12 HỆ GIẰNG */}
      <section id="sec-4-11" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">4.11</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Kiểm tra cẩu lắp, vận chuyển &amp; Hệ giằng</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-sm text-text-main">Kiểm tra khi cẩu lắp</h4>
            <p>
              Khi móc cáp cẩu cột từ bãi đúc lên xe hoặc dựng cột vào móng cốc, tải trọng bản thân cột tác dụng theo phương ngang vuông góc với phương chịu lực bình thường. Bắt buộc nhân thêm hệ số động cẩu lắp <InlineMath math="k_d = 1.4 \\div 1.6" />.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-sm text-text-main">Cấu tạo hệ giằng nhà xưởng</h4>
            <p>
              Hệ giằng cột và giằng mái chữ thập bằng thép hình hoặc bê tông cốt thép liên kết các khung ngang rời rạc thành một khối không gian cứng vững, đảm bảo ổn định dọc nhà khi cầu trục hãm phanh.
            </p>
          </div>
        </div>
      </section>

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 4 - Tập 2"
        cards={[
          { front: 'Vai cột (Corbel) được phân loại là công xôn ngắn khi nào?', back: 'Khi khoảng cách từ điểm đặt lực đến mép cột c <= 0.9 h0.' },
          { front: 'Tại sao cốt đai trong vai cột lại đặt nằm ngang thay vì thẳng đứng?', back: 'Vì vết nứt nghiêng chạy chéo từ điểm đặt tải về góc chân vai, đai ngang cắt vuông góc với vết nứt phát huy hiệu quả chống cắt cao nhất.' },
          { front: 'Hệ số động khi kiểm tra cẩu lắp cấu kiện đúc sẵn là bao nhiêu?', back: 'kd = 1.4 đến 1.6 xét đến rung lắc và giật cáp khi cẩu.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 4 - Tập 2"
        questions={[
          {
            question: 'Trong vai cột nhà công nghiệp, loại cốt thép nào chịu lực cắt tiếp chính qua vết nứt xiên?',
            options: ['Cốt thép dọc thẳng đứng', 'Cốt đai ngang và cốt thép xiên', 'Chỉ có bê tông', 'Cốt thép phân bố mỏng'],
            correctIndex: 1,
            explanation: 'Vết nứt xiên góc dốc trong vai cột được khâu kín hiệu quả nhất bởi các vòng cốt đai đặt nằm ngang và các thanh cốt xiên góc.'
          },
          {
            question: 'Khi kiểm tra cột đúc sẵn trong giai đoạn cẩu lắp và vận chuyển, ta phải nhân tải trọng tự trọng với hệ số nào?',
            options: ['Hệ số an toàn gamma = 1.0', 'Hệ số động lực cẩu lắp kd = 1.4 - 1.6', 'Hệ số giảm tải kd = 0.8', 'Không cần nhân'],
            correctIndex: 1,
            explanation: 'Quá trình nâng cẩu lắc lư gây ra tải trọng động giật đột ngột, tiêu chuẩn quy định nhân hệ số động kd = 1.4 - 1.6.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-2/chuong-4" />
    </div>
  );
};
