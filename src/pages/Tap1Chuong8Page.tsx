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
import { RCBeam } from '../three/elements/RCBeam';

export const Tap1Chuong8Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 8: Cấu kiện chịu uốn – xoắn</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 8: Cấu Kiện Chịu Uốn – Xoắn Đồng Thời
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán độ bền tiết diện không gian chịu mômen uốn M, mômen xoắn Mt và lực cắt Q theo TCXDVN 356:2005.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-8-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">8.1 Khái niệm</a>
        <a href="#sec-8-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">8.2 Cấu tạo</a>
        <a href="#sec-8-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">8.3 Tiết diện không gian</a>
        <a href="#sec-8-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">8.4 Tính sơ bộ thép</a>
        <a href="#sec-8-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">8.5 Kiểm tra chịu lực</a>
        <a href="#sec-8-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">8.6 Bài tập ví dụ</a>
      </div>

      {/* 8.1 KHÁI NIỆM CHUNG */}
      <section id="sec-8-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">8.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm chung</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Hiện tượng xoắn thuần túy rất hiếm gặp, cấu kiện thường chịu xoắn đồng thời với mômen uốn M và lực cắt Q. Các cấu kiện chịu xoắn điển hình gồm: dầm biên chịu tải trọng sàn truyền vào từ một phía, dầm ban công đỡ bản công xôn vươn ra ngoài, dầm cầu trục đỡ ray có lực hãm ngang, và dầm cong trên mặt bằng (T1 tr.281).
        </p>
      </section>

      {/* 3D VIEWER: TORSION BEAM */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Dầm Chịu Mômen Xoắn</h3>
            <p className="text-xs text-text-sub">Quan sát hệ đai kín khép chặt và cốt thép dọc phân bố đều chu vi</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
        </div>
        <div className="h-80 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
          <ViewerCanvas cameraPosition={[2.2, 1.2, 2.0]}>
            {({ isXray, wireframe }) => (
              <RCBeam lengthMm={2400} bMm={250} hMm={450} isXray={isXray} wireframe={wireframe} />
            )}
          </ViewerCanvas>
        </div>
      </div>

      {/* 8.2 ĐẶC ĐIỂM CẤU TẠO */}
      <section id="sec-8-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">8.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cấu tạo cốt thép chịu xoắn</h2>
        </div>
        <ConstructionNote title="Yêu cầu cấu tạo bắt buộc cho dầm chịu xoắn (T1 tr.284)">
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li><strong>Cốt đai kín:</strong> Phải là đai kín 100%, hai đầu móc uốn gập góc 135° và neo sâu vào trong lõi bê tông ít nhất 10d hoặc hàn chồng. Tuyệt đối không dùng đai hở hoặc đai chữ U ngàm hờ.</li>
            <li><strong>Khoảng cách cốt đai sw:</strong> <InlineMath math="s_w \\le h/2" /> và <InlineMath math="s_w \\le 200\\text{ mm}" /> (nhỏ hơn dầm uốn thông thường).</li>
            <li><strong>Cốt thép dọc cấu tạo:</strong> Phải phân bố đều dọc theo toàn bộ chu vi tiết diện (kể cả trên các mặt bên của dầm), khoảng cách giữa các thanh cốt dọc không quá 200 mm. Phải luôn có thanh thép dọc đặt tại 4 góc của cốt đai.</li>
          </ul>
        </ConstructionNote>
      </section>

      {/* 8.3 ĐỘ BỀN TIẾT DIỆN KHÔNG GIAN */}
      <section id="sec-8-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">8.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Độ bền tiết diện không gian</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Dưới tác dụng của xoắn và uốn, vết nứt phá hoại là một mặt xoắn ốc không gian nghiêng góc khoảng 45° chạy quanh 3 hoặc 4 mặt của dầm. Mô hình giàn ảo không gian (Space Truss Model) chia tiết diện thành các thanh chịu nén xiên bằng bê tông và các thanh giằng chịu kéo gồm cốt đai ngang và cốt thép dọc (T1 tr.286).
        </p>

        <FormulaBlock
          number="(8.1)"
          source="T1 tr.288"
          latex={'M_t \\le 2 A_k \\sqrt{\\frac{R_{sw} A_{sw}}{s_w} \\cdot \\frac{R_s A_{sl}}{u_k}}'}
          description="Ak: diện tích bao quanh bởi đường trục cốt đai; uk: chu vi cốt đai; Asl: tổng diện tích cốt thép dọc chịu xoắn; Asw: diện tích một nhánh đai."
          compare5574={true}
        />
      </section>

      {/* 8.4 TÍNH SƠ BỘ CỐT THÉP */}
      <section id="sec-8-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">8.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tính sơ bộ cốt thép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khi tính toán thực hành theo TCXDVN 356:2005 (T1 tr.290), tải trọng xoắn được phân chia cho cốt đai và cốt dọc theo tỷ số diện tích:
        </p>
        <FormulaBlock
          number="(8.2)"
          source="T1 tr.290"
          latex={'\\frac{A_{sw}}{s_w} = \\frac{M_t}{2 A_k R_{sw}} \\quad ; \\quad A_{sl} = \\frac{M_t \\cdot u_k}{2 A_k R_s}'}
          description="Diện tích cốt đai và cốt thép dọc được cộng thêm vào lượng cốt thép do uốn M và cắt Q tính riêng rẽ."
        />
      </section>

      {/* 8.5 KIỂM TRA KHẢ NĂNG CHỊU LỰC */}
      <section id="sec-8-5" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">8.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Kiểm tra khả năng chịu lực tương tác (M + Mt + Q)</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Điều kiện khống chế khả năng chịu nén của thanh chống bê tông xiên trên mặt bên (tránh nát bê tông thành dầm trước khi thép chảy dẻo):
        </p>
        <FormulaBlock
          number="(8.3)"
          source="T1 tr.293"
          latex={'\\frac{M_t}{0.1 R_b b^2 h} + \\frac{Q}{0.3 R_b b h_0} \\le 1.0'}
          description="Điều kiện không bị phá hoại giòn nén xiên do ứng suất tiếp tổng hợp sinh ra."
          compare5574={true}
        />
      </section>

      {/* 8.6 BÀI TẬP VÍ DỤ */}
      <section id="sec-8-6" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">8.6</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Bài tập ví dụ</h2>
        </div>

        <ExampleBlock
          number="Ví dụ 8.1"
          title="Thiết kế cốt thép dầm biên chịu uốn, cắt và xoắn đồng thời"
          bookRef="T1 tr.296"
          given="Dầm biên tiết diện b = 250 mm, h = 500 mm. Bê tông B20 (Rb = 11.5 MPa, Rbt = 0.9 MPa), Thép CII (Rs = 280 MPa, Rsw = 225 MPa). Lớp bảo vệ c = 25 mm. Nội lực tính toán tại tiết diện nguy hiểm: M = 75 kNm, Q = 90 kN, Mt = 18 kNm."
          solution={[
            '1. Kích thước lõi đai: b_k = 250 - 2*(25 + 4) = 192 mm; h_k = 500 - 2*(25 + 4) = 442 mm. Diện tích Ak = 192 * 442 = 84864 mm² = 0.0849 m². Chu vi uk = 2 * (192 + 442) = 1268 mm.',
            '2. Kiểm tra bê tông thanh xiên: Mt / (0.1 * Rb * b^2 * h) + Q / (0.3 * Rb * b * h0) = 18e6 / (0.1 * 11.5 * 250^2 * 500) + 90e3 / (0.3 * 11.5 * 250 * 465) = 0.50 + 0.22 = 0.72 <= 1.0 => Bê tông đủ khả năng chịu lực nén xiên!',
            '3. Tính cốt đai do xoắn: (Asw / sw)_t = Mt / (2 * Ak * Rsw) = 18e6 / (2 * 84864 * 225) = 0.471 mm²/mm.',
            '4. Tính cốt đai do lực cắt Q: Cần (Asw / sw)_q ≈ 0.35 mm²/mm. Tổng yêu cầu (Asw / sw)_tot = 0.471 + 0.35 = 0.821 mm²/mm.',
            '5. Chọn cốt đai: Đai phi 8 (As1 = 50.3 mm², 2 nhánh Asw = 100.6 mm²). Khoảng cách đai: sw = 100.6 / 0.821 = 122 mm. Chọn đai phi 8a100 mm khép kín, góc móc 135°.',
            '6. Tính cốt thép dọc do xoắn: Asl = (Mt * uk) / (2 * Ak * Rs) = (18e6 * 1268) / (2 * 84864 * 280) = 480 mm².',
            '7. Phân bố thép dọc: Bố trí đều chu vi: 1/3 cho đáy (cùng As do uốn), 1/3 cho đỉnh, 1/3 chia cho 2 mặt bên. Thêm 2 phi 14 ở 2 sườn bên dầm.'
          ]}
        />
      </section>

      {/* COMMON MISTAKES */}
      <CommonMistakes
        mistakes={[
          {
            mistake: 'Sử dụng đai hở (chữ U) không có móc neo 135 độ cho cấu kiện chịu xoắn.',
            consequence: 'Dưới ứng suất xoay vặn, các góc đai bị bung ra khiến dầm nứt vỡ dọc góc đột ngột.',
            correction: 'Bắt buộc dùng đai kín 100% với móc uốn 135° cắm sâu vào lõi bê tông.',
            bookRef: 'T1 tr.284'
          },
          {
            mistake: 'Chỉ bố trí cốt thép dọc ở mép trên và mép dưới mà quên đặt thép ở hai mặt bên.',
            consequence: 'Hai mặt sườn bê tông bị nứt chéo nghiêm trọng do không có cốt thép khống chế vết nứt xoắn.',
            correction: 'Luôn bố trí cốt thép dọc sườn cách nhau không quá 200 mm trên các mặt bên.',
            bookRef: 'T1 tr.285'
          }
        ]}
      />

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 8"
        cards={[
          { front: 'Cốt đai trong cấu kiện chịu xoắn bắt buộc phải có cấu tạo gì?', back: 'Đai kín khép góc 135° neo sâu vào lõi bê tông ít nhất 10d để không bị bung khi vặn xoắn.' },
          { front: 'Khoảng cách cốt đai sw trong dầm chịu xoắn được khống chế ra sao?', back: 'sw <= h/2 và sw <= 200 mm (dày hơn so với dầm chỉ chịu uốn cắt).' },
          { front: 'Cốt thép dọc chịu xoắn được bố trí ở đâu?', back: 'Phân bố đều quanh chu vi tiết diện (kể cả 2 mặt bên) với khoảng cách thanh không quá 200 mm.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 8"
        questions={[
          {
            question: 'Tại sao cốt đai cho dầm chịu xoắn bắt buộc phải là đai kín móc 135°?',
            options: ['Để dễ gia công uốn thép', 'Vì mômen xoắn làm phát sinh lực kéo trên cả 4 mặt thành dầm, móc 135° giúp đai không bị bung toác', 'Để giảm lượng thép', 'Để bê tông dễ chảy'],
            correctIndex: 1,
            explanation: 'Ứng suất tiếp do xoắn chạy vòng khép kín quanh 4 mặt dầm, tạo lực bung tại tất cả các góc nên đai phải khép kín hoàn toàn.'
          },
          {
            question: 'Khoảng cách tối đa giữa các thanh cốt thép dọc theo chu vi dầm chịu xoắn là bao nhiêu?',
            options: ['100 mm', '200 mm', '400 mm', '500 mm'],
            correctIndex: 1,
            explanation: 'Theo TCXDVN 356:2005, khoảng cách giữa các thanh cốt dọc đặt theo chu vi dầm chịu xoắn không được vượt quá 200 mm.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/chuong-8" />
    </div>
  );
};
