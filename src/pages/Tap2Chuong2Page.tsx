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

export const Tap2Chuong2Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 2: Cấu kiện nhà cửa</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 2: Khung bê tông cốt thép</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 2: Khung Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán và thiết kế hệ khung toàn khối, khung lắp ghép, khe biến dạng (khe lún, khe co giãn nhiệt độ, khe kháng chấn) và khung không gian nhà nhiều tầng.
        </p>
      </div>

      <StandardBanner volume="tap2" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-2-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.1 Khái niệm</a>
        <a href="#sec-2-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.2 Khung toàn khối</a>
        <a href="#sec-2-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.3 Khung lắp ghép</a>
        <a href="#sec-2-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.4 Khe biến dạng</a>
        <a href="#sec-2-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.5 Khung không gian</a>
      </div>

      {/* 2.1 KHÁI NIỆM & 2.2 KHUNG TOÀN KHỐI */}
      <section id="sec-2-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm chung &amp; Sơ đồ tính khung toàn khối</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Khung bê tông cốt thép là hệ kết cấu thanh gồm cột và dầm liên kết cứng với nhau tại các nút khung. Khung toàn khối có độ cứng không gian lớn, khả năng chống động đất và gió bão rất tốt, là hệ kết cấu phổ biến nhất trong xây dựng dân dụng nhiều tầng (T2 tr.135).
        </p>

        {/* 3D VIEWER: FRAME COLUMN & BEAM JOINT */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Nút Khung Bê Tông Cốt Thép</h3>
              <p className="text-xs text-text-sub">Quan sát sự giao thoa cốt thép tại nút dầm - cột chịu lực</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
          </div>
          <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[2.2, 1.8, 2.2]}>
              {({ isXray, wireframe }) => (
                <RCColumn heightMm={3200} bMm={350} hMm={350} isXray={isXray} wireframe={wireframe} />
              )}
            </ViewerCanvas>
          </div>
        </div>
      </section>

      {/* 2.2 TÍNH TOÁN NỘI LỰC VÀ TỔ HỢP */}
      <section id="sec-2-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khung toàn khối: Tải trọng &amp; Tổ hợp nội lực</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Các trường hợp tải trọng tác dụng lên khung phẳng: Tĩnh tải sàn tường g, Hoạt tải đứng bố trí lệch tầng lệch nhịp p, và Tải trọng gió ngang trái/phải W theo TCVN 2737 (T2 tr.148):
        </p>

        <FormulaBlock
          number="(2.4)"
          source="T2 tr.152"
          latex="\text{TH1:} \quad S = S_g + S_{p1} \quad ; \quad \text{TH2:} \quad S = S_g + 0.9 \sum S_{pi}"
          description="Tổ hợp cơ bản 1 & 2: Cặp nội lực nguy hiểm để thiết kế cột: (Mmax, Ntu); (Mmin, Ntu); (Nmax, Mtu)."
          compare5574={true}
        />

        <ConstructionNote title="Cấu tạo nút khung dầm - cột (T2 tr.160)">
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Nút khung là vùng chịu ứng suất cắt và nén cực lớn. Bắt buộc phải đặt cốt đai cột liên tục xuyên qua nút khung với khoảng cách dày đặc s &le; 100 mm.</li>
            <li>Cốt thép lớp trên của dầm phải được neo vào cột với chiều dài bẻ neo góc 90° tối thiểu <InlineMath math="L_{an} \\ge 35d" />.</li>
            <li>Đường kính cốt thép dầm không được vượt quá 1/20 chiều dày cột để tránh tuột neo khi chịu tải trọng chu kỳ đổi chiều.</li>
          </ul>
        </ConstructionNote>
      </section>

      {/* 2.3 KHUNG LẮP GHÉP */}
      <section id="sec-2-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khung lắp ghép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khung lắp ghép cấu tạo từ các thanh cột và dầm đúc sẵn. Khâu then chốt là cấu tạo mối nối nút khung (mối nối cứng hoặc khớp): mối nối hàn bản mã thép, mối nối luồn cáp ứng lực trước, hoặc chừa thép chờ đổ bù bê tông chèn không co ngót (T2 tr.175).
        </p>
      </section>

      {/* 2.4 KHE BIẾN DẠNG */}
      <section id="sec-2-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khe biến dạng (Khe lún, Khe nhiệt độ, Khe kháng chấn)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-primary text-sm">1. Khe nhiệt độ - co ngót</h4>
            <p>Bố trí khi chiều dài nhà vượt quá khoảng cách cho phép (35 - 50m). Khe nhiệt độ cắt rời thân kết cấu bên trên nhưng <strong>không cắt móng</strong>.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-amber-600 text-sm">2. Khe lún</h4>
            <p>Bố trí khi công trình có khối nhà cao thấp chênh lệch lớn (ví dụ tháp cao 25 tầng cạnh khối đế 3 tầng) hoặc nền đất không đồng nhất. Khe lún <strong>cắt rời toàn bộ kể cả móng</strong>.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-rose-600 text-sm">3. Khe kháng chấn</h4>
            <p>Chia công trình phức tạp thành các khối hình học đối xứng đơn giản để tránh hiệu ứng xoắn động đất. Bề rộng khe kháng chấn thường 50 - 150 mm.</p>
          </div>
        </div>
      </section>

      {/* 2.5 KHUNG KHÔNG GIAN */}
      <section id="sec-2-5" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khung không gian</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Trong công trình thực tế, các khung phẳng theo phương ngang và dọc kết hợp với bản sàn tạo thành một hệ khung không gian 3D. Cột khung ở góc nhà chịu nén uốn xiên hai trục đồng thời (Mx, My, N) và chịu ảnh hưởng mômen xoắn từ các dầm trực giao (T2 tr.195).
        </p>

        <FormulaBlock
          number="(2.5)"
          source="T2 tr.198"
          latex="\left( \frac{M_x}{M_{ux}} \right)^{\alpha} + \left( \frac{M_y}{M_{uy}} \right)^{\alpha} \le 1.0"
          description="Công thức kiểm tra khả năng chịu nén uốn xiên hai trục của cột góc nhà."
          compare5574={true}
        />
      </section>

      {/* COMMON MISTAKES & FLASHCARDS */}
      <CommonMistakes
        mistakes={[
          {
            mistake: 'Cắt móng tại vị trí khe nhiệt độ co ngót.',
            consequence: 'Gây lún lệch cục bộ không đáng có giữa hai khối móng gần nhau.',
            correction: 'Khe nhiệt độ chỉ cắt phần thân bên trên, giữ nguyên móng liên tục.',
            bookRef: 'T2 tr.180'
          },
          {
            mistake: 'Bỏ qua cốt đai cột xuyên qua nút khung dầm - cột.',
            consequence: 'Bê tông nút khung bị phá hoại vỡ giòn do ứng suất cắt lớn khi có tải trọng ngang.',
            correction: 'Luôn kéo dài cốt đai cột qua toàn bộ chiều cao dầm tại nút khung.',
            bookRef: 'T2 tr.160'
          }
        ]}
      />

      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 2 - Tập 2"
        cards={[
          { front: 'Khe lún khác khe nhiệt độ ở đặc điểm cấu tạo quan trọng nào?', back: 'Khe lún cắt đứt toàn bộ công trình kể cả móng; Khe nhiệt độ chỉ cắt phần thân bên trên.' },
          { front: 'Cặp nội lực nào dùng để thiết kế cốt thép cột khung?', back: '(Mmax, Ntu), (Mmin, Ntu) và (Nmax, Mtu) từ tổ hợp tải trọng bất lợi nhất.' },
          { front: 'Cột góc nhà chịu tác động của nội lực phức tạp nào?', back: 'Chịu nén uốn xiên hai trục (N, Mx, My) và mômen xoắn Mt.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 2 - Tập 2"
        questions={[
          {
            question: 'Tại sao tại nút khung dầm - cột bắt buộc phải bố trí cốt đai cột dày đặc?',
            options: ['Để tăng giá thành', 'Vì vùng nút khung chịu ứng suất cắt tiếp và nén đa trục rất lớn, cốt đai ngăn bê tông nút bị nát vụn', 'Để giữ ván khuôn', 'Không bắt buộc'],
            correctIndex: 1,
            explanation: 'Nút khung là điểm tập trung ứng suất lớn nhất khi có tải trọng gió và động đất, cốt đai dày kiềm chế nở hông bảo vệ an toàn nút.'
          },
          {
            question: 'Khi công trình có tháp cao 20 tầng liền kề khối đế 2 tầng, loại khe biến dạng nào bắt buộc phải dùng?',
            options: ['Khe nhiệt độ', 'Khe lún (cắt rời cả móng)', 'Chỉ cần đóng trần', 'Không cần khe'],
            correctIndex: 1,
            explanation: 'Sự chênh lệch tải trọng rất lớn giữa tháp cao tầng và khối đế thấp gây lún không đều, bắt buộc phải dùng khe lún cắt rời toàn bộ móng.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-2/chuong-2" />
    </div>
  );
};
