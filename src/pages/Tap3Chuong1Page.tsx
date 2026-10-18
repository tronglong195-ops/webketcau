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
import { Stair } from '../three/elements/Stair';

export const Tap3Chuong1Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 3: Các cấu kiện đặc biệt</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 1: Cầu thang</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 1: Cầu Thang Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán và cấu tạo cầu thang bản hai vế, cầu thang có dầm cốn limon, thang xương cá, thang răng cưa và thang xoắn ốc không gian theo TCVN 5574-1991.
        </p>
      </div>

      <StandardBanner volume="tap3" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-1-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.1 Khái niệm</a>
        <a href="#sec-1-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.2 Cấu tạo bậc</a>
        <a href="#sec-1-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.3 Tải trọng bản thang</a>
        <a href="#sec-1-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.4 Thang bản hai vế</a>
        <a href="#sec-1-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.5 - 1.6 Limon</a>
        <a href="#sec-1-7" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.7 - 1.9 Xương cá</a>
        <a href="#sec-1-10" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.10 Răng cưa</a>
        <a href="#sec-1-11" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.11 - 1.12 Thang xoắn</a>
        <a href="#sec-1-13" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.13 Bài tập</a>
      </div>

      {/* 1.1 KHÁI NIỆM & 1.2 BẬC THANG */}
      <section id="sec-1-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm &amp; Cấu tạo bậc thang</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Cầu thang là bộ phận giao thông theo phương đứng kết nối các tầng nhà và là lối thoát hiểm khẩn cấp khi hỏa hoạn. Bậc thang tiêu chuẩn thỏa mãn công thức nhân trắc học: <InlineMath math="2h + b = 600 \\div 640\\text{ mm}" /> (chiều cao bậc h = 150 - 180 mm, bề rộng mặt bậc b = 250 - 300 mm, góc nghiêng <InlineMath math="\\alpha = 25^\\circ \\div 35^\\circ" />) (T3 tr.7).
        </p>
      </section>

      {/* 3D VIEWER: RC STAIR */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Cầu Thang Bản BTCT Hai Vế</h3>
            <p className="text-xs text-text-sub">Quan sát bản nghiêng chịu lực, các bậc thang và bản chiếu nghỉ</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
        </div>
        <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
          <ViewerCanvas cameraPosition={[2.4, 2.2, 2.8]}>
            {({ isXray, wireframe }) => (
              <Stair steps={10} widthMm={1200} stepHeightMm={160} stepDepthMm={280} isXray={isXray} wireframe={wireframe} />
            )}
          </ViewerCanvas>
        </div>
      </div>

      {/* 1.3 TẢI TRỌNG LÊN BẢN THANG */}
      <section id="sec-1-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tải trọng tác dụng lên bản thang</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Tải trọng phân bố trên mét vuông mặt phẳng nghiêng phải được quy đổi về mặt bằng nằm ngang theo góc dốc alpha (T3 tr.14):
        </p>

        <FormulaBlock
          number="(3.1)"
          source="T3 tr.15"
          latex={'q_x = \\frac{g_{ban}}{\\cos \\alpha} + g_{bac} + p'}
          description="g_ban: trọng lượng bản bê tông cốt thép dày h_b; g_bac = 0.5 * h_bac * gamma_gach (trọng lượng bậc xây gạch); p: hoạt tải sử dụng (3 - 4 kN/m2)."
        />
      </section>

      {/* 1.4 THANG BẢN HAI VẾ */}
      <section id="sec-1-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cầu thang dạng bản hai vế</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Bản nghiêng tựa vào dầm chiếu tới (dầm tầng) và dầm chiếu nghỉ. Sơ đồ tính là dầm gãy khúc hoặc xem gần đúng là dầm đơn giản có nhịp tính toán L0 bằng hình chiếu bằng khoảng cách giữa hai dầm gối (T3 tr.20):
        </p>
        <FormulaBlock
          number="(3.2)"
          source="T3 tr.22"
          latex={'M_{max} = \\frac{q_x L_0^2}{8} \\quad ; \\quad Q_{max} = \\frac{q_x L_0}{2}'}
          description="Thép chịu lực chính đặt theo phương nghiêng dọc theo chiều dốc của vế thang."
        />
      </section>

      {/* 1.5 - 1.10 CÁC DẠNG CẦU THANG KHÁC */}
      <section id="sec-1-5" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Thang có dầm cốn Limon, Xương cá &amp; Răng cưa</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-primary text-sm">Cầu thang dầm cốn Limon (1.5 - 1.6)</h4>
            <p>Bản thang mỏng kê ngang lên 2 dầm cốn nghiêng ở hai mép biên. Bản thang uốn theo phương ngang, dầm cốn chịu uốn nghiêng chịu toàn bộ tải trọng.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-accent text-sm">Cầu thang xương cá (1.7 - 1.9)</h4>
            <p>Chỉ có 1 dầm cốn ở chính giữa vế thang, các bậc thang nhô ra hai bên dạng công xôn. Cần kiểm tra chịu xoắn khi người đi lệch về một phía.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-emerald-600 text-sm">Cầu thang răng cưa gấp nếp (1.10)</h4>
            <p>Bản bê tông đổ gãy khúc theo hình bậc thang không có dầm cốn. Bản chịu lực phức tạp, tại các góc gập âm dương cần uốn nép cốt thép cẩn thận.</p>
          </div>
        </div>
      </section>

      {/* 1.11 - 1.12 THANG XOẮN ỐC & 1.13 BÀI TẬP */}
      <section id="sec-1-11" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.11</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cầu thang xoắn ốc không gian &amp; Bài tập</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Cầu thang xoắn ốc có trục là đường xoắn ốc trụ (Helicoid). Cấu kiện chịu đồng thời uốn theo hai phương, xoắn không gian Mt và lực cắt (T3 tr.60).
        </p>

        <ExampleBlock
          number="Ví dụ 1.1"
          title="Tính toán bản thang hai vế nhà dân dụng"
          bookRef="T3 tr.35"
          given="Vế thang nhịp hình chiếu bằng L0 = 2.8 m, bề rộng bản b = 1.1 m. Bậc cao 160 mm, rộng 280 mm (góc alpha = 29.7°). Chiều dày bản btct hb = 100 mm. Bê tông B20, thép CII (Rs = 280 MPa). Hoạt tải sử dụng pc = 3.0 kN/m2."
          solution={[
            '1. Tải trọng bản thang: g_bt = (0.10 * 25) / cos(29.7°) = 2.88 kN/m2. g_bac = 0.5 * 0.16 * 18 = 1.44 kN/m2. Lớp vữa lát g_lat = 0.5 kN/m2. Tĩnh tải tính toán g = 1.1 * (2.88 + 1.44 + 0.5) = 5.30 kN/m2.',
            '2. Hoạt tải tính toán: p = 1.2 * 3.0 = 3.6 kN/m2.',
            '3. Tổng tải trọng phân bố: q = g + p = 5.30 + 3.60 = 8.90 kN/m2. Trên dải bản b = 1m: q = 8.9 kN/m.',
            '4. Mômen uốn cực đại: Mmax = q * L0^2 / 8 = 8.9 * 2.8^2 / 8 = 8.72 kNm.',
            '5. Chiều cao làm việc h0 = 100 - 20 = 80 mm. alpha_m = 8.72e6 / (11.5 * 1000 * 80^2) = 0.118 => zeta = 0.937.',
            '6. Diện tích cốt thép yêu cầu: As = 8.72e6 / (280 * 0.937 * 80) = 416 mm²/m.',
            '7. Chọn cốt thép: Chọn phi 10a180 (As = 436 mm²/m). Thép phân bố đặt phi 6a200.'
          ]}
        />
      </section>

      {/* COMMON MISTAKES & FLASHCARDS */}
      <CommonMistakes
        mistakes={[
          {
            mistake: 'Bẻ thanh thép dọc liên tục qua góc gập của bản thang răng cưa mà không lồng chéo.',
            consequence: 'Lực căng kéo làm bung toác góc bê tông bảo vệ khiến cầu thang bị gãy gập tại góc.',
            correction: 'Tại góc lõm (góc gập hướng vào trong), cốt thép phải kéo thẳng qua góc rồi neo sâu vào vùng đối diện (lồng chéo hình chữ X).',
            bookRef: 'T3 tr.28'
          }
        ]}
      />

      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 1 - Tập 3"
        cards={[
          { front: 'Quy đổi tải trọng bản nghiêng về mặt bằng nằm ngang như thế nào?', back: 'Chia cho cos(alpha) của góc nghiêng vế thang.' },
          { front: 'Cốt thép chịu lực chính của bản thang hai vế được đặt ở đâu?', back: 'Đặt ở đáy bản thang chạy dọc theo phương nghiêng chịu mômen uốn dương.' },
          { front: 'Tại sao tại góc gập của bản thang không được uốn thanh thép đi men theo góc lõm?', back: 'Vì hợp lực kéo ở góc lõm hướng ra ngoài sẽ đẩy toác lớp bê tông bảo vệ.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 1 - Tập 3"
        questions={[
          {
            question: 'Khi tính toán bản thang hai vế theo sơ đồ dầm đơn giản, nhịp tính toán L0 được lấy bằng kích thước nào?',
            options: ['Chiều dài thực trên mặt nghiêng', 'Khoảng cách hình chiếu bằng giữa hai gối tựa dầm', 'Chiều cao tầng', 'Bề rộng bản thang'],
            correctIndex: 1,
            explanation: 'Khi tải trọng phân bố đã được quy đổi về mặt bằng nằm ngang qx, nhịp tính toán lấy theo chiều dài hình chiếu bằng L0.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-3/chuong-1" />
    </div>
  );
};
