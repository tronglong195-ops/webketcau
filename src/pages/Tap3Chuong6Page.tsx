import { InlineMath } from '../components/InlineMath';
import React, { useState } from 'react';
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

export const Tap3Chuong6Page: React.FC = () => {
  // Interactive Torsion Calculator State
  const [b_mm, setB] = useState<number>(250);
  const [h_mm, setH] = useState<number>(500);
  const [Mt_kNm, setMt] = useState<number>(18);
  const [Q_kN, setQ] = useState<number>(70);
  const [M_kNm, setM] = useState<number>(60);
  const [stirrupSpacing, setSpacing] = useState<number>(120);

  // Material: B20 (Rb = 11.5, Rbt = 0.9), CII (Rs = 280, Rsw = 225)
  const Rb_MPa = 11.5;
  const Rbt_MPa = 0.9;
  const Rs_MPa = 280;
  const Rsw_MPa = 225;

  // Geometry
  const a_cover = 35;
  const b0 = Math.max(b_mm - 2 * a_cover, 50);
  const h0 = Math.max(h_mm - 2 * a_cover, 50);
  const Ak = b0 * h0;
  const uk = 2 * (b0 + h0);

  // Cracking torsion moment Mt_crc
  const Wt = 0.24 * b_mm * b_mm * h_mm;
  const Mt_crc_kNm = (0.8 * Rbt_MPa * Wt) / 1e6;

  // Crushing limit Mt_max
  const Mt_max_kNm = (0.1 * Rb_MPa * b_mm * b_mm * h_mm) / 1e6;
  const isCrushSafe = Mt_kNm <= Mt_max_kNm;

  // Required 1-leg stirrup for torsion
  const Asw1_T_mm2 = (Mt_kNm * 1e6 * stirrupSpacing) / (2 * Rsw_MPa * Ak);

  // Total longitudinal rebar for torsion
  const Asl_T_total_mm2 = (Mt_kNm * 1e6 * uk) / (2 * Rs_MPa * Ak);

  // Flexure steel at bottom
  const h0_flex = h_mm - a_cover;
  const As_flex_mm2 = (M_kNm * 1e6) / (0.9 * h0_flex * Rs_MPa);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 3: Các cấu kiện đặc biệt</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 6: Cấu kiện chịu uốn xoắn</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 6: Cấu Kiện Chịu Uốn – Cắt – Xoắn Đồng Thời
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Mô hình giàn không gian tiết diện rỗng thành mỏng (Space Truss Model), điều kiện nén vỡ bê tông, tính toán thép đai kín và thép dọc chu vi.
        </p>
      </div>

      <StandardBanner volume="tap3" />

      {/* 3D VIEWER INTERACTIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-surface rounded-2xl p-4 shadow-card border border-border">
          <h2 className="text-lg font-bold text-text-main mb-3 flex items-center justify-between">
            <span>Mô hình 3D Dầm BTCT Chịu Uốn – Xoắn</span>
            <span className="text-xs bg-primary/10 text-primary font-mono px-2 py-1 rounded">
              {b_mm}x{h_mm} mm | Mt = {Mt_kNm} kNm
            </span>
          </h2>
          <div className="h-[420px] rounded-xl overflow-hidden bg-bg-dark border border-border">
            <ViewerCanvas cameraPosition={[3, 2.5, 3]}>
              <RCBeam
                lengthMm={3500}
                widthMm={b_mm}
                heightMm={h_mm}
                stirrupSpacingMm={stirrupSpacing}
                isXray={true}
                showDimensions={true}
              />
            </ViewerCanvas>
          </div>
          <p className="text-xs text-text-sub mt-3 italic text-center">
            Mô hình trực quan: Cốt đai kín bao quanh chu vi dầm và cốt thép dọc đặt đều ở 4 góc và 2 thành bên để chịu mômen xoắn. Kéo chuột để xoay và kiểm tra bố trí cốt thép.
          </p>
        </div>

        {/* INTERACTIVE CALCULATOR */}
        <div className="bg-surface rounded-2xl p-6 shadow-card border border-border space-y-4">
          <h2 className="text-lg font-bold text-text-main border-b border-border pb-2">
            Tính toán cốt thép chịu xoắn
          </h2>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-text-sub block text-xs mb-1">Bề rộng b (mm):</label>
                <input
                  type="number"
                  step="20"
                  min="150"
                  max="600"
                  value={b_mm}
                  onChange={(e) => setB(parseFloat(e.target.value) || 200)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
              <div>
                <label className="text-text-sub block text-xs mb-1">Chiều cao h (mm):</label>
                <input
                  type="number"
                  step="50"
                  min="250"
                  max="1200"
                  value={h_mm}
                  onChange={(e) => setH(parseFloat(e.target.value) || 300)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-text-sub block text-xs mb-1">Mômen xoắn Mt (kNm):</label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="100"
                  value={Mt_kNm}
                  onChange={(e) => setMt(parseFloat(e.target.value) || 5)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
              <div>
                <label className="text-text-sub block text-xs mb-1">Bước đai s (mm):</label>
                <input
                  type="number"
                  step="10"
                  min="50"
                  max="300"
                  value={stirrupSpacing}
                  onChange={(e) => setSpacing(parseFloat(e.target.value) || 100)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-text-sub block text-xs mb-1">Mômen uốn M (kNm):</label>
                <input
                  type="number"
                  step="5"
                  min="0"
                  max="300"
                  value={M_kNm}
                  onChange={(e) => setM(parseFloat(e.target.value) || 0)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
              <div>
                <label className="text-text-sub block text-xs mb-1">Lực cắt Q (kN):</label>
                <input
                  type="number"
                  step="5"
                  min="0"
                  max="300"
                  value={Q_kN}
                  onChange={(e) => setQ(parseFloat(e.target.value) || 0)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-sub">Mômen gây nứt xoắn <InlineMath math="M_{t,crc}" />:</span>
              <span className="font-mono font-semibold text-text-main">{Mt_crc_kNm.toFixed(1)} kNm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Giới hạn nén vỡ bê tông <InlineMath math="M_{t,\\max}" />:</span>
              <span className={`font-mono font-bold ${isCrushSafe ? 'text-emerald-600' : 'text-red-500'}`}>
                {Mt_max_kNm.toFixed(1)} kNm ({isCrushSafe ? 'Đạt' : 'Vỡ bê tông!'})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Thép đai xoắn 1 nhánh <InlineMath math="A_{sw1,T}" />:</span>
              <span className="font-mono font-bold text-primary">{Asw1_T_mm2.toFixed(1)} mm²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Tổng thép dọc chịu xoắn <InlineMath math="A_{sl,T}" />:</span>
              <span className="font-mono font-bold text-primary">{Asl_T_total_mm2.toFixed(0)} mm²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Thép uốn đáy dầm <InlineMath math="A_{s,M}" />:</span>
              <span className="font-mono text-text-main">{As_flex_mm2.toFixed(0)} mm²</span>
            </div>
            <div className="flex justify-between bg-primary/10 p-2 rounded">
              <span className="font-semibold text-text-main">Tổng thép dọc đáy <InlineMath math="(A_{s,M} + A_{sl}/4)" />:</span>
              <span className="font-mono font-bold text-primary">{(As_flex_mm2 + Asl_T_total_mm2 / 4).toFixed(0)} mm²</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6.1 */}
      <section id="section-6-1" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          6.1 Khái niệm chung về Uốn – Xoắn
        </h2>
        <p className="text-text-sub leading-relaxed">
          Trong kết cấu công trình, xoắn thuần túy hầu như không bao giờ tồn tại đơn độc. Thông thường, cấu kiện chịu tác dụng đồng thời của ba thành phần nội lực: <strong>Mômen xoắn (\(M_t\))</strong>, <strong>Lực cắt (\(Q\))</strong> và <strong>Mômen uốn (\(M\))</strong>.
        </p>
        <div className="bg-surface p-5 rounded-xl border border-border">
          <h4 className="font-bold text-text-main mb-2">Các cấu kiện chịu xoắn điển hình trong công trình:</h4>
          <ul className="list-disc pl-5 text-sm text-text-sub space-y-1">
            <li><strong>Dầm biên nhà (Spandrel beams):</strong> Đỡ bản sàn hoặc ô văng công son một phía truyền tải trọng lệch tâm lớn vào trục dầm.</li>
            <li><strong>Dầm cong trên mặt bằng:</strong> Dầm ban công tròn, cầu vượt cong đường bộ, luôn chịu uốn kèm theo xoắn phân bố đều do bán kính cong.</li>
            <li><strong>Dầm đỡ cầu trục:</strong> Chịu lực hãm ngang xe con lệch tâm so với trục tim dầm.</li>
            <li><strong>Dầm cốn cầu thang:</strong> Chịu tải trọng bậc thang truyền vào mép dầm gây mômen xoắn lớn tại gối tựa.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 6.2 */}
      <section id="section-6-2" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          6.2 Yêu cầu cấu tạo cốt thép chịu xoắn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-primary text-base">Cốt đai chịu xoắn:</h4>
            <ul className="list-disc pl-5 text-sm text-text-sub space-y-1">
              <li><strong>Bắt buộc dùng cốt đai kín 100%:</strong> Tuyệt đối không dùng đai hở chữ U vì ứng suất cắt do xoắn chạy vòng khép kín quanh 4 mặt dầm.</li>
              <li><strong>Móc neo <InlineMath math="135^\\circ" />:</strong> Hai đầu móc đai phải bẻ góc <InlineMath math="135^\\circ" /> với đoạn neo thẳng dài tối thiểu <InlineMath math="10d" /> cắm sâu vào lõi bê tông, hoặc hàn đối đầu kín.</li>
              <li><strong>Khoảng cách đai:</strong> <InlineMath math="s \\le b/2" /> và <InlineMath math="s \\le 200\\text{ mm}" /> trong vùng chịu xoắn.</li>
            </ul>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-primary text-base">Cốt thép dọc chịu xoắn:</h4>
            <ul className="list-disc pl-5 text-sm text-text-sub space-y-1">
              <li><strong>Phân bố đều quanh chu vi:</strong> Đặt ở 4 góc và phân bố đều dọc theo chiều cao hai thành bên dầm.</li>
              <li><strong>Khoảng cách giữa các thanh dọc:</strong> Không lớn hơn <InlineMath math="300\\text{ mm}" /> (hoặc <InlineMath math="200\\text{ mm}" /> khi dầm cao <InlineMath math="h > 500\\text{ mm}" />).</li>
              <li><strong>Đường kính tối thiểu:</strong> <InlineMath math="\\phi \\ge 12\\text{ mm}" />. Cốt thép dọc phải được neo chắc chắn vào cột hoặc dầm ngang ở hai đầu dầm.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6.3 */}
      <section id="section-6-3" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          6.3 Kết quả nghiên cứu và Sự hình thành vết nứt
        </h2>
        <p className="text-text-sub leading-relaxed">
          Thực nghiệm cho thấy dầm bê tông cốt thép chịu xoắn trải qua 3 giai đoạn làm việc rõ rệt:
        </p>
        <div className="space-y-3">
          <div className="bg-surface p-4 rounded-xl border border-border text-sm">
            <p className="font-bold text-text-main">1. Giai đoạn trước nứt (<InlineMath math="M_t < M_{t,crc}" />):</p>
            <p className="text-text-sub mt-1">
              Dầm làm việc đàn hồi gần như cấu kiện đồng nhất theo lý thuyết màng xà phòng Saint-Venant. Biến dạng góc xoắn tăng tuyến tính, cốt thép chịu ứng suất rất nhỏ.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border text-sm">
            <p className="font-bold text-text-main">2. Giai đoạn nứt (<InlineMath math="M_{t,crc} \\le M_t < M_{tu}" />):</p>
            <p className="text-text-sub mt-1">
              Khi ứng suất kéo chính vượt quá cường độ chịu kéo của bê tông <InlineMath math="R_{bt}" />, xuất hiện các vết nứt xoắn ốc nghiêng góc xấp xỉ <InlineMath math="45^\\circ" /> chạy vòng quanh 3 hoặc 4 mặt dầm. Độ cứng xoắn sụt giảm nghiêm trọng (chỉ còn khoảng 10% – 20% so với ban đầu). Lõi bê tông ở tâm bị giải tỏa ứng suất, toàn bộ lực xoắn được chuyển giao cho cốt thép đai, cốt dọc và các dải bê tông xiên ngoài vỏ.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border text-sm">
            <p className="font-bold text-text-main">3. Giai đoạn phá hoại (<InlineMath math="M_t = M_{tu}" />):</p>
            <p className="text-text-sub mt-1">
              Nếu dầm được đặt cốt thép hợp lý, phá hoại dẻo xảy ra khi cả cốt đai và cốt dọc cùng đạt tới giới hạn chảy dẻo. Nếu quá nhiều thép, dầm bị phá hoại dòn nổ do bê tông giữa các dải nứt nghiêng bị nén vỡ.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6.4 */}
      <section id="section-6-4" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          6.4 Mô hình giàn không gian (Space Truss Model)
        </h2>
        <p className="text-text-sub leading-relaxed">
          Sau khi nứt xoắn hình thành, dầm BTCT đặc hoạt động tương đương như một <strong>ống thành mỏng rỗng</strong> bao quanh diện tích hữu hiệu \(A_k\):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
          <div className="bg-surface p-4 rounded-xl border border-border">
            <h4 className="font-bold text-primary mb-1">Thanh chống xiên bê tông:</h4>
            <p className="text-text-sub text-xs">
              Các dải bê tông nghiêng góc \(\theta \approx 45^\circ\) giữa các khe nứt chịu lực nén xiên truyền tải xoắn.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border">
            <h4 className="font-bold text-primary mb-1">Thanh giằng đai căng đứng:</h4>
            <p className="text-text-sub text-xs">
              Các nhánh cốt đai kín đóng vai trò các thanh căng thẳng đứng và ngang cân bằng lực kéo của giàn.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border">
            <h4 className="font-bold text-primary mb-1">Thanh giằng căng dọc:</h4>
            <p className="text-text-sub text-xs">
              Cốt thép dọc ở các góc và thành bên chịu lực kéo dọc do thành phần phân rã từ các thanh chống nén xiên.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6.5 */}
      <section id="section-6-5" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          6.5 Tính toán xoắn tiết diện chữ nhật
        </h2>
        <div className="space-y-3">
          <h4 className="font-bold text-text-main text-base">1. Điều kiện chống nén vỡ dải bê tông nghiêng:</h4>
          <FormulaBlock
            number="6.1"
            source="T3 tr.265"
            latex="M_t \le 0.1 \cdot R_b \cdot b^2 \cdot h"
            description="Điều kiện giới hạn chống nén vỡ bê tông giữa các vết nứt nghiêng do mômen xoắn"
            compare5574={true}
          />

          <h4 className="font-bold text-text-main text-base mt-4">2. Tính toán diện tích cốt thép đai chịu xoắn:</h4>
          <FormulaBlock
            number="6.2"
            source="T3 tr.268"
            latex="A_{sw1,T} = \frac{M_t \cdot s}{2 \cdot R_{sw} \cdot A_k \cdot \cot\theta}"
            description="Diện tích một nhánh cốt đai chịu xoắn với góc nghiêng bê tông theta = 45 độ (cot theta = 1)"
          />

          <h4 className="font-bold text-text-main text-base mt-4">3. Tính toán tổng diện tích cốt thép dọc chịu xoắn:</h4>
          <FormulaBlock
            number="6.3"
            source="T3 tr.270"
            latex="A_{sl,T} = \frac{M_t \cdot u_k \cdot \cot\theta}{2 \cdot R_s \cdot A_k}"
            description="Tổng diện tích cốt thép dọc chịu xoắn phân bố đều trên toàn bộ chu vi u_k"
          />
        </div>
      </section>

      {/* SECTION 6.6 */}
      <section id="section-6-6" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          6.6 Thực hành tính toán Uốn – Cắt – Xoắn phối hợp
        </h2>
        <p className="text-text-sub leading-relaxed">
          Khi dầm chịu đồng thời \(M, Q, M_t\), cốt thép được tổng hợp theo các nguyên tắc tương tác:
        </p>
        <div className="bg-surface p-5 rounded-xl border border-border space-y-4">
          <div>
            <h4 className="font-bold text-primary text-sm mb-1">Cốt đai tổng cộng (<InlineMath math="A_{sw1}" />):</h4>
            <p className="text-xs text-text-sub">
              Trên một nhánh đai bên ngoài, cộng trực tiếp diện tích đai chịu cắt và đai chịu xoắn:
            </p>
            <FormulaBlock
              number="6.4"
              source="T3 tr.274"
              latex="A_{sw1,total} = A_{sw1,Q} + A_{sw1,T}"
              description="Diện tích một nhánh cốt đai thành bên chịu đồng thời lực cắt và mômen xoắn"
            />
          </div>
          <div>
            <h4 className="font-bold text-primary text-sm mb-1">Cốt thép dọc ở vùng kéo (đáy dầm):</h4>
            <p className="text-xs text-text-sub">
              Tại thớ đáy chịu kéo, cốt thép dọc phải chịu cả mômen uốn \(M\) và một phần lực kéo do xoắn \(M_t\):
            </p>
            <FormulaBlock
              number="6.5"
              source="T3 tr.276"
              latex="A_{s,bot} = A_{s,M} + \frac{A_{sl,T}}{4}"
              description="Cốt thép dọc chịu uốn cộng một phần tư lượng cốt thép dọc chịu xoắn"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6.7 */}
      <section id="section-6-7" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          6.7 Bài tập ví dụ tính toán Uốn – Cắt – Xoắn
        </h2>
        <ExampleBlock
          title="Ví dụ 6.1 (T3 tr.280): Thiết kế dầm biên bê tông cốt thép chịu uốn cắt xoắn"
          problem={`Một dầm biên khung nhà BTCT có tiết diện b x h = 250 x 500 mm.
Bê tông B20 (Rb = 11.5 MPa, Rbt = 0.9 MPa).
Cốt thép đai CII (Rsw = 225 MPa). Cốt thép dọc CII (Rs = 280 MPa).
Lớp bê tông bảo vệ a = 35 mm.
Nội lực tính toán tại tiết diện gối:
Mômen uốn M = 55 kNm, Lực cắt Q = 75 kN, Mômen xoắn Mt = 16 kNm.
Yêu cầu:
1. Kiểm tra điều kiện nứt xoắn và điều kiện nén vỡ dải bê tông nghiêng.
2. Tính toán và chọn cốt đai kín chịu cắt và xoắn (bước đai s = 120 mm).
3. Tính toán và bố trí cốt thép dọc chịu uốn và xoắn.`}
          solution={[
            {
              step: 'Bước 1: Xác định các kích thước hình học tiết diện lõi',
              detail: `Bề rộng lõi: b0 = b - 2*a = 250 - 2*35 = 180 mm.
Chiều cao lõi: h0 = h - 2*a = 500 - 2*35 = 430 mm.
Diện tích bao bởi đường trung bình cốt đai:
Ak = b0 * h0 = 180 * 430 = 77400 mm2.
Chu vi đường trung bình cốt đai:
uk = 2*(b0 + h0) = 2*(180 + 430) = 1220 mm.`
            },
            {
              step: 'Bước 2: Kiểm tra nứt và khả năng chịu nén vỡ bê tông',
              detail: `Mômen kháng xoắn đàn hồi tiết diện:
Wt = 0.24 * b^2 * h = 0.24 * 250^2 * 500 = 7.5 * 10^6 mm3.
Mômen gây nứt xoắn:
Mt,crc = 0.8 * Rbt * Wt = 0.8 * 0.9 * 7.5 * 10^6 * 10^-6 = 5.4 kNm < Mt = 16 kNm (dầm bị nứt xoắn, bắt buộc tính cốt thép).
Giới hạn nén vỡ bê tông nghiêng:
Mt,max = 0.1 * Rb * b^2 * h = 0.1 * 11.5 * 250^2 * 500 * 10^-6 = 35.9 kNm > Mt = 16 kNm.
Tiết diện bê tông đủ khả năng chống nén vỡ dòn.`
            },
            {
              step: 'Bước 3: Tính toán cốt đai chịu xoắn và cắt (chọn bước s = 120 mm)',
              detail: `Diện tích 1 nhánh đai chịu xoắn:
Asw1,T = (Mt * s) / (2 * Rsw * Ak) = (16 * 10^6 * 120) / (2 * 225 * 77400) = 55.1 mm2.
Lực cắt bê tông chịu được:
Qb = 0.6 * Rbt * b * h0_flex = 0.6 * 0.9 * 250 * 465 * 10^-3 = 62.78 kN.
Lực cắt do cốt đai chịu: Qsw = Q - Qb = 75 - 62.78 = 12.22 kN.
Diện tích 1 nhánh đai chịu cắt:
Asw1,Q = (Qsw * s) / (2 * Rsw * h0_flex) = (12.22 * 10^3 * 120) / (2 * 225 * 465) = 7.0 mm2.
Tổng diện tích 1 nhánh đai yêu cầu:
Asw1 = Asw1,T + Asw1,Q = 55.1 + 7.0 = 62.1 mm2.
Chọn đai phi 10 (1 nhánh diện tích 78.5 mm2 > 62.1 mm2) đai kín khép góc 135°, bước đai s = 120 mm.`
            },
            {
              step: 'Bước 4: Tính toán cốt thép dọc chịu xoắn và uốn',
              detail: `Tổng cốt thép dọc chịu xoắn phân bố đều 4 mặt:
Asl,T = (Mt * uk) / (2 * Rs * Ak) = (16 * 10^6 * 1220) / (2 * 280 * 77400) = 450.2 mm2.
Cốt thép dọc chịu mômen uốn M = 55 kNm tại thớ đáy:
As,M = M / (0.9 * h0 * Rs) = (55 * 10^6) / (0.9 * 465 * 280) = 469.3 mm2.
Tổng cốt thép dọc yêu cầu tại thớ đáy:
As,bot = As,M + Asl,T / 4 = 469.3 + 450.2 / 4 = 581.9 mm2.
Chọn bố trí 3 phi 16 ở đáy dầm (As = 603 mm2).
Cốt thép ở đỉnh dầm: 2 phi 14 (As = 308 mm2 > Asl,T / 4 = 113 mm2).
Cốt thép thành bên: bố trí 2 bên sườn mỗi bên 1 phi 12 (2 x 113 = 226 mm2 = Asl,T / 2).
Tổng số thép dọc chu vi: 3 phi 16 (đáy) + 2 phi 14 (đỉnh) + 2 phi 12 (sườn), hoàn toàn khép kín chu vi.`
            }
          ]}
        />
      </section>

      {/* CONSTRUCTION & COMMON MISTAKES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ConstructionNote title="Cấu tạo thi công cốt thép chịu xoắn">
          <ul className="list-disc pl-5 space-y-2 text-sm text-text-sub">
            <li>
              <strong>Đai kín và mối nối đai:</strong> Bắt buộc dùng đai kín. Các móc neo \(135^\circ\) phải đặt so le nhau ở các góc dầm khác nhau theo chiều dài, tránh đặt tất cả mối nối móc đai trên cùng một đường mép dầm.
            </li>
            <li>
              <strong>Cốt giá thành bên (Side face rebar):</strong> Với dầm cao <InlineMath math="h \\ge 450\\text{ mm}" />, tuyệt đối không được bỏ qua cốt thép sườn hai bên. Các thanh thép sườn này phải được buộc chặt vào các nhánh đai đứng để tạo thành lồng thép không gian vững chắc.
            </li>
            <li>
              <strong>Neo vào gối tựa:</strong> Cả cốt thép đai xoắn và cốt thép dọc chu vi phải được kéo vào và neo sâu vào trong cột vượt qua mép gối tựa một đoạn \(\ge 35d\).
            </li>
          </ul>
        </ConstructionNote>

        <CommonMistakes
          mistakes={[
            {
              mistake: 'Sử dụng cốt đai chữ U hở miệng trong dầm chịu xoắn',
              consequence: 'Dòng ứng suất cắt chạy vòng quanh chu vi bị ngắt quãng ở đỉnh dầm, dầm bị xé toạc miệng ở phụ tải rất thấp gây sụp đổ bất ngờ.',
              correction: 'Bắt buộc dùng cốt đai kín khép kín 100% có móc bẻ 135 độ ăn sâu vào lõi bê tông.',
              bookRef: 'T3 tr.260'
            },
            {
              mistake: 'Chỉ bố trí thép dọc ở đỉnh và đáy dầm, bỏ trống thành bên',
              consequence: 'Bê tông hai thành bên dầm bị nứt toác theo phương xoắn ốc 45 độ vì không có thanh giằng dọc nào giữ các dải bê tông nén xiên.',
              correction: 'Phải bố trí cốt thép dọc sườn phân bố đều với khoảng cách không quá 200 - 300 mm dọc theo chiều cao dầm.',
              bookRef: 'T3 tr.262'
            }
          ]}
        />
      </div>

      {/* FLASHCARD DECK & QUIZ */}
      <FlashcardDeck
        cards={[
          {
            question: 'Tại sao cốt đai trong dầm chịu xoắn bắt buộc phải là đai kín 100%?',
            answer: 'Vì mômen xoắn tạo ra dòng ứng suất cắt chạy vòng khép kín quanh cả 4 mặt của tiết diện dầm. Đai hở chữ U sẽ không tiếp thu được lực cắt ở mặt trên, làm dầm vỡ toạc.'
          },
          {
            question: 'Mô hình giàn không gian (Space Truss Model) mô tả sự làm việc của dầm chịu xoắn như thế nào?',
            answer: 'Dầm sau khi nứt được coi như một ống thành mỏng rỗng, trong đó các dải bê tông nghiêng 45° chịu nén xiên, cốt đai đóng vai trò thanh căng vòng và cốt thép dọc chu vi chịu lực kéo dọc.'
          },
          {
            question: 'Cốt thép dọc chịu xoắn được phân bố như thế nào trong tiết diện chữ nhật?',
            answer: 'Phải được phân bố đều khắp chu vi tiết diện (ở 4 góc và dọc theo hai thành bên với khoảng cách không quá 200 - 300 mm).'
          }
        ]}
      />

      <QuizBlock
        questions={[
          {
            question: 'Điều kiện chống nén vỡ bê tông giữa các dải nứt nghiêng do mômen xoắn quy định thế nào?',
            options: [
              'Mt <= 0.1 * Rb * b^2 * h',
              'Mt <= 0.5 * Rbt * b * h',
              'Mt <= Rb * b * h^2',
              'Mt <= 0.25 * Rb * b^3'
            ],
            correctIndex: 0,
            explanation: 'Theo TCXDVN 356:2005 (T3 tr.265), điều kiện hạn chế chống nén vỡ bê tông do xoắn là Mt <= 0.1 * Rb * b^2 * h.'
          },
          {
            question: 'Góc nghiêng của vết nứt xoắn trên bề mặt dầm bê tông cốt thép thường xấp xỉ bằng bao nhiêu?',
            options: ['30°', '45°', '60°', '90°'],
            correctIndex: 1,
            explanation: 'Trong trạng thái xoắn thuần túy hoặc xoắn chiếm ưu thế, hướng ứng suất kéo chính nghiêng góc xấp xỉ 45° so với trục dầm, tạo ra vết nứt xoắn ốc 45°.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-3/chuong-6" />
    </div>
  );
};
