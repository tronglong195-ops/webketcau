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
import { RCSlab } from '../three/elements/RCSlab';

export const Tap1Chuong9Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 9: Sàn bê tông cốt thép</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 9: Sàn Sườn Toàn Khối Loại Bản Dầm
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Nguyên lý tính toán và cấu tạo hệ sàn sườn toàn khối có bản loại dầm: Bản sàn, dầm phụ, dầm chính, sơ đồ khớp dẻo, biểu đồ bao vật liệu và mô hình hóa SAP2000.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-9-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.1 Khái niệm</a>
        <a href="#sec-9-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.2 Bản dầm 1 phương</a>
        <a href="#sec-9-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.3 Đồ án BT1</a>
        <a href="#sec-9-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.4 Bản sàn</a>
        <a href="#sec-9-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.5 Dầm phụ</a>
        <a href="#sec-9-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.6 Dầm chính</a>
        <a href="#sec-9-7" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.7 Cấu tạo thép dầm</a>
        <a href="#sec-9-8" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.8 Biểu đồ vật liệu</a>
        <a href="#sec-9-9" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.9 Ví dụ</a>
        <a href="#sec-9-10" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.10 Thống kê thép</a>
        <a href="#sec-9-11" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">9.11 SAP2000</a>
      </div>

      {/* 9.1 KHÁI NIỆM & 9.2 BẢN DẦM */}
      <section id="sec-9-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">9.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm về hệ sàn sườn toàn khối</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Sàn sườn toàn khối là hệ kết cấu gồm bản sàn, dầm phụ và dầm chính được đổ bê tông liền khối cùng một lúc. Tùy thuộc tỷ số kích thước ô bản <InlineMath math="L_2 / L_1" /> (với L2 là cạnh dài, L1 là cạnh ngắn), sự làm việc của bản sàn được phân loại thành:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
            <h4 className="font-bold text-primary text-sm">1. Bản loại dầm (Bản làm việc 1 phương): <InlineMath math="L_2 / L_1 \\ge 2" /></h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Hơn 85-90% tải trọng truyền theo phương cạnh ngắn L1 về dầm phụ. Ta xem dải bản có bề rộng b = 1m như một dầm liên tục nhiều nhịp kê lên các dầm phụ. Cốt thép chịu lực chính chỉ cần bố trí theo phương cạnh ngắn.
            </p>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
            <h4 className="font-bold text-amber-700 text-sm">2. Bản kê 4 cạnh (Bản làm việc 2 phương): <InlineMath math="L_2 / L_1 < 2" /></h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Tải trọng truyền về cả 4 dầm bao quanh theo cả 2 phương. Bắt buộc phải tính toán và bố trí cốt thép chịu lực theo cả hai phương cạnh L1 và L2 (chi tiết học ở Tập 2 Chương 1).
            </p>
          </div>
        </div>
      </section>

      {/* 3D VIEWER: RC SLAB WITH BEAMS */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Ô Sàn Sườn Toàn Khối</h3>
            <p className="text-xs text-text-sub">Quan sát sự phối hợp giữa bản sàn mỏng, dầm phụ nhịp bé và dầm chính nhịp lớn</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
        </div>
        <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
          <ViewerCanvas cameraPosition={[2.8, 1.8, 2.8]}>
            {({ isXray, wireframe }) => (
              <RCSlab lxMm={3000} lyMm={6000} hMm={100} isXray={isXray} wireframe={wireframe} />
            )}
          </ViewerCanvas>
        </div>
      </div>

      {/* 9.3 GIỚI THIỆU ĐỒ ÁN & 9.4 BẢN SÀN */}
      <section id="sec-9-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">9.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tính toán bản sàn theo sơ đồ khớp dẻo</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Bản sàn là cấu kiện siêu tĩnh liên tục có khả năng phân phối lại nội lực rất lớn. Sách Võ Bá Tầm áp dụng phương pháp khớp dẻo của GS. Nguyễn Đình Cống / TCXDVN 356:2005 (T1 tr.308):
        </p>

        <FormulaBlock
          number="(9.1)"
          source="T1 tr.310"
          latex={'M = \\beta \\cdot q \\cdot L_0^2'}
          description="Nhịp biên và gối thứ hai: beta = 1/11 (hoặc 1/14 với bản có sườn bao quanh); Nhịp giữa và các gối trong: beta = 1/16."
          compare5574={true}
        />

        <div className="p-4 bg-surface rounded-xl border border-border space-y-2 text-xs">
          <span className="font-bold text-primary">Chiều dày bản sàn hb:</span>
          <p className="text-text-sub">
            Khống chế độ võng theo kinh nghiệm: <InlineMath math="h_b = \\frac{D}{m} L_1" /> với D = 0.8 - 1.4 tùy tải trọng, m = 30 - 35 (bản dầm). Trong nhà dân dụng thường chọn hb = 80 - 100 mm (nhà xưởng hb = 100 - 120 mm).
          </p>
        </div>
      </section>

      {/* 9.5 DẦM PHỤ & 9.6 DẦM CHÍNH */}
      <section id="sec-9-5" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">9.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tính toán dầm phụ và dầm chính</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DẦM PHỤ */}
          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <h4 className="font-bold text-sm text-primary">Dầm phụ (Secondary Beam)</h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Kê lên các dầm chính và tường bao. Chịu tải phân bố đều truyền từ bản sàn: <InlineMath math="q_{dp} = q_b \\cdot L_{dp}" />. Tính theo sơ đồ dầm liên tục có khớp dẻo:
            </p>
            <FormulaBlock
              number="(9.2)"
              source="T1 tr.315"
              latex={'M_{max} = \\frac{q L_0^2}{11} \\quad ; \\quad M_{goi} = -\\frac{q L_0^2}{11} \\quad ; \\quad Q_{max} = 0.6 q L_0'}
              description="Hệ số thực hành cho dầm liên tục có xét đến khả năng hình thành khớp dẻo làm cân bằng mômen nhịp và gối."
            />
          </div>

          {/* DẦM CHÍNH */}
          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <h4 className="font-bold text-sm text-accent">Dầm chính (Main Girder)</h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Kê lên các cột chịu lực. Chịu các lực tập trung lớn truyền từ dầm phụ vào các nút gác: <InlineMath math="P = Q_{dp,trai} + Q_{dp,phai}" />. Thường tính theo sơ đồ đàn hồi và lập biểu đồ bao mômen.
            </p>
            <FormulaBlock
              number="(9.3)"
              source="T1 tr.322"
              latex={'M_{dc} = k_1 \\cdot P \\cdot L + k_2 \\cdot g_{dc} \\cdot L^2'}
              description="Tra bảng hệ số k1, k2 cho các trường hợp xếp hoạt tải cách nhịp và liền nhịp bất lợi nhất."
            />
          </div>
        </div>
      </section>

      {/* 9.7 CẤU TẠO CỐT THÉP & CỐT TREO */}
      <section id="sec-9-7" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">9.7</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cấu tạo cốt thép dầm &amp; Cốt treo gia cường</h2>
        </div>
        <ConstructionNote title="Cốt treo (Cốt đai gia cường tại nút dầm phụ gác lên dầm chính) (T1 tr.328)">
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Lực tập trung P từ dầm phụ truyền vào thớ đáy dầm chính gây ứng suất kéo cục bộ làm xé toác đáy dầm chính nếu không có cốt đai treo.</li>
            <li>Diện tích cốt treo: <InlineMath math="A_{sw,treo} = \\frac{P (1 - h_s / h_c)}{R_{sw}}" />, bố trí trong vùng <InlineMath math="s = b_{dp} + 2 h_s" /> ở hai bên mép dầm phụ.</li>
            <li>Có thể dùng cốt đai nhiều nhánh hoặc thanh cốt xiên chữ V để treo tải trọng lên vùng nén đỉnh dầm chính.</li>
          </ul>
        </ConstructionNote>
      </section>

      {/* 9.8 BIỂU ĐỒ BAO VẬT LIỆU */}
      <section id="sec-9-8" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">9.8</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Biểu đồ bao vật liệu dầm</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Biểu đồ bao vật liệu (biểu đồ khả năng chịu lực) là đường bậc thang biểu diễn mômen kháng uốn [M] của từng nhóm cốt thép bố trí tại mỗi mặt cắt. Nguyên tắc: Đường bao vật liệu phải luôn <strong>bao trùm toàn bộ</strong> đường bao mômen ngoại lực Mmax (T1 tr.332).
        </p>

        <FormulaBlock
          number="(9.4)"
          source="T1 tr.335"
          latex={'[M] = R_s A_s \\left( h_0 - 0.5 x \\right)'}
          description="Đoạn kéo dài neo thanh cắt uốn: w >= 20d và w >= h/3 để tránh phá hoại theo tiết diện nghiêng."
        />
      </section>

      {/* 9.9 VÍ DỤ TỔNG HỢP & 9.10 THỐNG KÊ THÉP */}
      <section id="sec-9-9" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">9.9</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Ví dụ tính toán và thống kê thép</h2>
        </div>

        <ExampleBlock
          number="Ví dụ 9.1"
          title="Tính toán bản sàn sườn một phương L1 = 2.4 m, L2 = 6.0 m"
          bookRef="T1 tr.340"
          given="Ô bản L1 = 2.4 m, L2 = 6.0 m (L2/L1 = 2.5 > 2 => bản loại dầm). Hoạt tải tính toán p = 4.8 kN/m2. Tĩnh tải lớp hoàn thiện g_ht = 1.2 kN/m2. Bê tông B20 (Rb = 11.5 MPa), Thép CI (Rs = 225 MPa)."
          solution={[
            '1. Chọn chiều dày bản sàn: hb = (D/m)*L1 = (1.0/30)*2400 = 80 mm. Trọng lượng bản thân bản sàn: g_bt = 0.08 * 25 * 1.1 = 2.2 kN/m2.',
            '2. Tổng tải trọng tính toán: q = g_ht + g_bt + p = 1.2 + 2.2 + 4.8 = 8.2 kN/m2.',
            '3. Nhịp tính toán: L0 = L1 - b_dp = 2.4 - 0.20 = 2.2 m.',
            '4. Mômen nhịp biên và gối 2: M = q * L0^2 / 11 = 8.2 * 2.2^2 / 11 = 3.61 kNm.',
            '5. Mômen nhịp giữa và gối trong: M = q * L0^2 / 16 = 8.2 * 2.2^2 / 16 = 2.48 kNm.',
            '6. Tính thép nhịp biên (h0 = 80 - 15 = 65 mm): alpha_m = M / (Rb * b * h0^2) = 3.61e6 / (11.5 * 1000 * 65^2) = 0.074 => zeta = 0.962 => As = 3.61e6 / (225 * 0.962 * 65) = 257 mm²/m. Chọn thép phi 8a180 (As = 279 mm²/m).',
            '7. Tính thép nhịp giữa: As = 175 mm²/m. Chọn thép phi 6a150 (As = 188 mm²/m).'
          ]}
        />
      </section>

      {/* 9.11 HƯỚNG DẪN SAP2000 */}
      <section id="sec-9-11" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">9.11</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Mô hình hóa SAP2000 cho dầm liên tục</h2>
        </div>
        <div className="p-5 bg-surface rounded-xl border border-border space-y-3 text-xs text-text-sub">
          <h4 className="font-bold text-sm text-text-main">Quy trình lập mô hình và tổ hợp tải trọng SAP2000:</h4>
          <ol className="list-decimal list-inside space-y-1.5">
            <li><strong>Định nghĩa vật liệu:</strong> Concrete B20 với môđun đàn hồi <InlineMath math="E = 2.7 \\times 10^7\\text{ kN/m}^2" />, hệ số Poisson <InlineMath math="\\nu = 0.2" />.</li>
            <li><strong>Khai báo Frame Section:</strong> Tiết diện chữ nhật Dầm phụ (200x400) và Dầm chính (300x700).</li>
            <li><strong>Gán trường hợp tải (Load Patterns):</strong> DEAD (tĩnh tải tự trọng), LIVE1 (hoạt tải nhịp 1, 3, 5), LIVE2 (hoạt tải nhịp 2, 4), LIVE_ALL (hoạt tải toàn bộ).</li>
            <li><strong>Tạo tổ hợp bao (Load Combinations - Type: Envelope):</strong> COMB_ENV = DEAD + max(LIVE1, LIVE2, LIVE_ALL). Đường bao này cho ra cặp mômen cực trị <InlineMath math="M_{max}, M_{min}" /> để thiết kế cốt thép.</li>
          </ol>
        </div>
      </section>

      {/* COMMON MISTAKES & FLASHCARDS */}
      <CommonMistakes
        mistakes={[
          {
            mistake: 'Quên bố trí cốt treo tại vị trí dầm phụ gác lên dầm chính.',
            consequence: 'Bê tông đáy dầm chính bị xé toác dạng nêm nứt do lực tập trung kéo xuống.',
            correction: 'Bố trí đai dày hoặc cốt xiên chữ V trong phạm vi (b_dp + 2*h_s) theo công thức T1 tr.328.',
            bookRef: 'T1 tr.328'
          },
          {
            mistake: 'Bố trí cốt thép chịu lực của bản dầm theo phương cạnh dài L2.',
            consequence: 'Phương chịu lực chính cạnh ngắn L1 bị thiếu thép trầm trọng gây sập bản sàn.',
            correction: 'Bản loại dầm (L2/L1 >= 2) luôn bố trí cốt thép chịu lực chính theo phương cạnh ngắn L1.',
            bookRef: 'T1 tr.305'
          }
        ]}
      />

      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 9"
        cards={[
          { front: 'Tỷ số L2/L1 bao nhiêu thì ô bản được xem là bản loại dầm?', back: 'L2 / L1 >= 2. Tải trọng truyền chủ yếu theo phương cạnh ngắn L1.' },
          { front: 'Mômen ở nhịp giữa và gối trong của bản sàn theo sơ đồ dẻo là bao nhiêu?', back: 'M = q * L0^2 / 16.' },
          { front: 'Cốt treo trong dầm chính có tác dụng gì?', back: 'Treo tải trọng tập trung từ đáy dầm phụ lên vùng nén đỉnh dầm chính, chống nứt xé toác đáy.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 9"
        questions={[
          {
            question: 'Trong bản sàn loại dầm (L2 / L1 >= 2), cốt thép chịu lực chính được bố trí theo phương nào?',
            options: ['Phương cạnh dài L2', 'Phương cạnh ngắn L1', 'Bố trí ngẫu nhiên', 'Chỉ đặt ở 4 góc'],
            correctIndex: 1,
            explanation: 'Độ cứng uốn theo phương ngắn L1 lớn hơn rất nhiều (tỷ lệ nghịch với L^4), nên gần như toàn bộ tải trọng truyền theo phương cạnh ngắn.'
          },
          {
            question: 'Vị trí nào trong dầm liên tục có mômen âm lớn nhất?',
            options: ['Tại giữa nhịp biên', 'Tại gối thứ hai kể từ biên vào', 'Tại gối giữa', 'Tại mép tường'],
            correctIndex: 1,
            explanation: 'Gối thứ hai kể từ biên vào là gối chịu mômen uốn âm lớn nhất trong dầm liên tục (M ≈ q * L^2 / 11).'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/chuong-9" />
    </div>
  );
};
