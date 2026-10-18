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
import { Shell, ShellType } from '../three/elements/Shell';

export const Tap3Chuong5Page: React.FC = () => {
  // Shell 3D & Calculator State
  const [shellType, setShellType] = useState<ShellType>('dome');
  const [R_m, setR] = useState<number>(20.0);
  const [alpha_deg, setAlpha] = useState<number>(45);
  const [thick_mm, setThick] = useState<number>(60);
  const [liveLoad_kPa, setLiveLoad] = useState<number>(0.75);

  // Dome calculations
  const deadLoad_kPa = (thick_mm / 1000) * 25 + 0.5; // DL + finishes
  const totalLoad_q = deadLoad_kPa + liveLoad_kPa;
  const alpha_rad = (alpha_deg * Math.PI) / 180;
  const cos_alpha = Math.cos(alpha_rad);
  const sin_alpha = Math.sin(alpha_rad);

  // Peak stress (phi = 0)
  const N_peak = -(totalLoad_q * R_m) / 2.0;

  // Base stress (phi = alpha)
  const N_base_meridian = -(totalLoad_q * R_m) / (1 + cos_alpha);
  const N_base_hoop = totalLoad_q * R_m * (1 / (1 + cos_alpha) - cos_alpha);

  // Ring beam tension
  const r_base = R_m * sin_alpha;
  const H_thrust = Math.abs(N_base_meridian) * cos_alpha;
  const T_ring_kN = H_thrust * r_base;
  const As_ring_mm2 = (T_ring_kN * 1.2 * 1000) / 280; // CII steel

  // Compressive stress check at base: sigma = N / A
  const sigma_base_MPa = (Math.abs(N_base_meridian) * 1000) / (thick_mm * 1000);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 3: Các cấu kiện đặc biệt</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 5: Kết cấu mái vỏ</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 5: Kết Cấu Mái Vỏ Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Lý thuyết màng phi mômen, vỏ cong hai chiều Gauss dương và âm (Hypa), vỏ cầu tròn xoay, nguyên tắc cấu tạo và vành tựa biên.
        </p>
      </div>

      <StandardBanner volume="tap3" />

      {/* 3D VIEWER & INTERACTIVE CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-surface rounded-2xl p-4 shadow-card border border-border">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-lg font-bold text-text-main">
              Mô hình 3D Kết cấu vỏ mỏng cong
            </h2>
            <div className="flex items-center gap-1 bg-bg p-1 rounded-lg border border-border text-xs">
              <button
                onClick={() => setShellType('dome')}
                className={`px-3 py-1 rounded transition-colors ${
                  shellType === 'dome' ? 'bg-primary text-white font-bold' : 'text-text-sub hover:text-text-main'
                }`}
              >
                Vỏ cầu (Gauss +)
              </button>
              <button
                onClick={() => setShellType('hypar')}
                className={`px-3 py-1 rounded transition-colors ${
                  shellType === 'hypar' ? 'bg-primary text-white font-bold' : 'text-text-sub hover:text-text-main'
                }`}
              >
                Vỏ Hypa (Gauss -)
              </button>
              <button
                onClick={() => setShellType('cylindrical')}
                className={`px-3 py-1 rounded transition-colors ${
                  shellType === 'cylindrical' ? 'bg-primary text-white font-bold' : 'text-text-sub hover:text-text-main'
                }`}
              >
                Vỏ trụ (Gauss 0)
              </button>
            </div>
          </div>

          <div className="h-[420px] rounded-xl overflow-hidden bg-bg-dark border border-border">
            <ViewerCanvas cameraPosition={[8, 7, 10]}>
              <Shell
                type={shellType}
                spanXMm={12000}
                spanYMm={12000}
                riseMm={2500}
                thicknessMm={thick_mm}
                isXray={false}
                showDimensions={true}
              />
            </ViewerCanvas>
          </div>
          <p className="text-xs text-text-sub mt-3 italic text-center">
            Dạng mặt cong: {shellType === 'dome' ? 'Chỏm cầu cong hai chiều dương' : shellType === 'hypar' ? 'Mặt cong yên ngựa Paraboloid Hyperbolic (đường sinh thẳng)' : 'Vỏ trụ tròn cong 1 chiều'}. Kéo chuột để xoay xem cấu trúc không gian 3D.
          </p>
        </div>

        {/* INTERACTIVE CALCULATOR */}
        <div className="bg-surface rounded-2xl p-6 shadow-card border border-border space-y-4">
          <h2 className="text-lg font-bold text-text-main border-b border-border pb-2">
            Tính nội lực vỏ cầu tròn xoay
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-text-sub block text-xs mb-1">Bán kính mặt cầu R (m):</label>
              <input
                type="number"
                step="1"
                min="10"
                max="50"
                value={R_m}
                onChange={(e) => setR(parseFloat(e.target.value) || 10)}
                className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
              />
            </div>
            <div>
              <label className="text-text-sub block text-xs mb-1">Góc nửa vòm \(\alpha\) (°):</label>
              <input
                type="number"
                step="1"
                min="20"
                max="85"
                value={alpha_deg}
                onChange={(e) => setAlpha(parseFloat(e.target.value) || 30)}
                className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-text-sub block text-xs mb-1">Dày vỏ t (mm):</label>
                <input
                  type="number"
                  step="5"
                  min="40"
                  max="150"
                  value={thick_mm}
                  onChange={(e) => setThick(parseFloat(e.target.value) || 50)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
              <div>
                <label className="text-text-sub block text-xs mb-1">Hoạt tải q_h (kN/m²):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.3"
                  max="3"
                  value={liveLoad_kPa}
                  onChange={(e) => setLiveLoad(parseFloat(e.target.value) || 0.5)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-sub">Tổng tải trọng phân bố q:</span>
              <span className="font-mono font-semibold text-text-main">{totalLoad_q.toFixed(2)} kN/m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Lực nén kinh tuyến đỉnh \(N_\varphi(0)\):</span>
              <span className="font-mono font-semibold text-primary">{N_peak.toFixed(1)} kN/m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Lực nén kinh tuyến chân \(N_\varphi(\alpha)\):</span>
              <span className="font-mono font-bold text-primary">{N_base_meridian.toFixed(1)} kN/m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Lực vòng vĩ tuyến chân \(N_\theta\):</span>
              <span className={`font-mono font-bold ${N_base_hoop > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                {N_base_hoop.toFixed(1)} kN/m ({N_base_hoop > 0 ? 'Kéo vòng' : 'Nén vòng'})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Lực căng vành đáy T:</span>
              <span className="font-mono font-bold text-red-500">{T_ring_kN.toFixed(1)} kN</span>
            </div>
            <div className="flex justify-between bg-primary/10 p-2 rounded">
              <span className="font-semibold text-text-main">Thép vành căng đáy \(A_s\):</span>
              <span className="font-mono font-bold text-primary">{As_ring_mm2.toFixed(0)} mm²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Ứng suất nén bê tông vỏ:</span>
              <span className="font-mono text-text-main">{sigma_base_MPa.toFixed(2)} MPa &lt; 14.5 MPa</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5.1 */}
      <section id="section-5-1" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.1 Khái niệm chung về Kết cấu mái vỏ
        </h2>
        <p className="text-text-sub leading-relaxed">
          Kết cấu vỏ mỏng (Thin Shell Structures) là các cấu kiện không gian có chiều dày rất nhỏ so với các kích thước mặt bằng bao phủ. Khác với dầm và bản sàn chịu uốn phẳng, vỏ chịu lực chủ yếu bằng lực dọc trong mặt phẳng tiếp diện (trạng thái kéo, nén, trượt màng), giúp tận dụng tối đa cường độ của bê tông trên toàn bộ tiết diện dày 5 – 8 cm.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-surface p-5 rounded-xl border border-border">
            <h3 className="font-bold text-primary text-base mb-2">Ưu điểm nổi bật:</h3>
            <ul className="list-disc pl-5 text-sm text-text-sub space-y-1">
              <li>Tiết kiệm 30% đến 50% khối lượng bê tông và cốt thép so với sàn phẳng cùng khẩu độ.</li>
              <li>Khả năng vượt nhịp không gian cực lớn (từ 30m đến hơn 100m) không cần cột chống giữa.</li>
              <li>Hình thức kiến trúc thanh thoát, hiện đại (nhà thi đấu, nhà triển lãm, mái sân vận động).</li>
            </ul>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border">
            <h3 className="font-bold text-primary text-base mb-2">Nhược điểm kỹ thuật:</h3>
            <ul className="list-disc pl-5 text-sm text-text-sub space-y-1">
              <li>Gia công ván khuôn mặt cong phức tạp và tốn công lắp dựng giáo đỡ.</li>
              <li>Chiều dày vỏ mỏng nên đòi hỏi kiểm tra nghiêm ngặt về độ ổn định chống oằn tổng thể và nứt cục bộ.</li>
              <li>Rất nhạy cảm với hiện tượng lún lệch gối tựa và dao động nhiệt độ ngoài trời.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5.2 */}
      <section id="section-5-2" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.2 Lý thuyết phi mômen (Trạng thái màng)
        </h2>
        <p className="text-text-sub leading-relaxed">
          Trạng thái phi mômen là trạng thái ứng suất lý tưởng trong đó mômen uốn <InlineMath math="M_x, M_y" />, mômen xoắn <InlineMath math="M_{xy}" /> và lực cắt pháp tuyến <InlineMath math="Q_x, Q_y" /> đều bằng 0 hoặc không đáng kể. Toàn bộ ngoại tải được cân bằng bởi các nội lực màng nằm trong mặt phẳng tiếp diện: lực pháp tuyến <InlineMath math="N_x, N_y" /> và lực trượt tiếp tuyến <InlineMath math="S" />.
        </p>
        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <h4 className="font-bold text-text-main text-base">Bốn điều kiện tồn tại trạng thái phi mômen:</h4>
          <ol className="list-decimal pl-5 text-sm text-text-sub space-y-2">
            <li><strong>Mặt trung hòa trơn liên tục:</strong> Không có nếp gấp đột ngột hoặc góc nhọn làm gián đoạn đạo hàm bán kính cong.</li>
            <li><strong>Chiều dày vỏ biến thiên êm dịu:</strong> Không thay đổi tiết diện giật cấp.</li>
            <li><strong>Ngoại tải tác dụng êm:</strong> Tải trọng phân bố đều hoặc biến thiên liên tục, không có tải trọng tập trung cục bộ lớn.</li>
            <li><strong>Điều kiện biên tự do tiếp tuyến:</strong> Gối tựa cho phép xoay tự do và chuyển vị pháp tuyến, đồng thời tiếp nhận đầy đủ lực trượt màng tiếp tuyến từ vỏ truyền xuống.</li>
          </ol>
        </div>
      </section>

      {/* SECTION 5.3 */}
      <section id="section-5-3" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.3 Phương trình cân bằng màng mỏng
        </h2>
        <p className="text-text-sub leading-relaxed">
          Xét phân tố vỏ cong hai chiều có các bán kính cong chính \(R_1\) và \(R_2\). Phương trình cân bằng hình chiếu các lực màng lên phương pháp tuyến với mặt trung hòa:
        </p>
        <FormulaBlock
          number="5.1"
          source="T3 tr.182"
          latex="\frac{N_1}{R_1} + \frac{N_2}{R_2} = Z"
          description="Phương trình cân bằng cơ bản của lý thuyết màng mỏng (Z là tải trọng pháp tuyến)"
        />
        <p className="text-sm text-text-sub">
          Phương trình trên cho thấy: nếu bán kính cong \(R_1, R_2\) càng nhỏ (độ cong càng lớn), nội lực màng \(N_1, N_2\) sinh ra để triệt tiêu tải trọng pháp tuyến \(Z\) càng bé, giúp kết cấu chịu lực cực kỳ hiệu quả.
        </p>
      </section>

      {/* SECTION 5.4 */}
      <section id="section-5-4" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.4 Phân loại vỏ theo độ cong Gauss
        </h2>
        <p className="text-text-sub leading-relaxed">
          Độ cong toàn phần Gauss <InlineMath math="K = k_1 \\cdot k_2 = \\frac{1}{R_1 R_2}" /> là đại lượng hình học đặc trưng quyết định bản chất ứng xử cơ học của vỏ:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-surface p-4 rounded-xl border border-border space-y-2">
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">K &gt; 0: Gauss Dương</span>
            <h4 className="font-bold text-text-main">Vỏ Elipxoit / Vỏ Cầu</h4>
            <p className="text-text-sub text-xs leading-relaxed">
              Hai tâm cong chính nằm cùng một phía của mặt vỏ. Có độ cứng không gian lớn nhất, ổn định chống oằn tốt nhất.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border space-y-2">
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-bold">K = 0: Gauss Không</span>
            <h4 className="font-bold text-text-main">Vỏ Trụ / Vỏ Nón</h4>
            <p className="text-text-sub text-xs leading-relaxed">
              Một trong hai bán kính cong bằng vô cùng (\(R_1 = \infty\)). Có thể trải phẳng trên mặt phẳng mà không bị rách hay biến dạng góc.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border space-y-2">
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold">K &lt; 0: Gauss Âm</span>
            <h4 className="font-bold text-text-main">Vỏ Hypa (Yên ngựa)</h4>
            <p className="text-text-sub text-xs leading-relaxed">
              Hai tâm cong chính nằm ở hai phía đối diện. Đặc biệt được tạo thành từ họ các đường sinh thẳng, ván khuôn làm bằng gỗ thanh thẳng rất dễ dàng.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5.5 */}
      <section id="section-5-5" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.5 Vỏ thoải cong hai chiều độ cong dương
        </h2>
        <p className="text-text-sub leading-relaxed">
          Vỏ thoải là vỏ có tỉ số độ vươn vòm \(f\) trên kích thước mặt bằng \(l\) nhỏ (\(f/l \le 1/5\)). Trong vỏ thoải độ cong dương tựa trên 4 dầm biên, tải trọng truyền về các góc thông qua lực trượt tiếp tuyến \(S\).
        </p>
        <FormulaBlock
          number="5.2"
          source="T3 tr.194"
          latex="S_{xy} = \frac{q \cdot L_x L_y}{8 f}"
          description="Lực trượt cực đại tại góc vỏ thoải hình chữ nhật kích thước Lx x Ly"
        />
        <p className="text-sm text-text-sub">
          Lực trượt \(S\) dồn về góc vỏ tạo thành lực đẩy xiên lớn đẩy chân cột ra ngoài. Do đó, dưới các dầm biên cần bố trí thanh giằng thép kéo căng dự ứng lực hoặc hệ móng cọc xiên để triệt tiêu lực xô ngang.
        </p>
      </section>

      {/* SECTION 5.6 */}
      <section id="section-5-6" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.6 Nguyên tắc thiết kế cấu tạo vỏ
        </h2>
        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <ul className="list-disc pl-5 space-y-2 text-sm text-text-sub">
            <li>
              <strong>Chiều dày vỏ mỏng:</strong> Với bê tông đổ tại chỗ, chọn <InlineMath math="h_v = 50 \\div 80\\text{ mm}" />. Tại vùng sát dầm biên trong phạm vi <InlineMath math="(0.1 \\div 0.15)L" />, tăng dần chiều dày lên <InlineMath math="1.5 \\div 2.0 h_v" /> để tăng độ cứng chống mômen uốn biên.
            </li>
            <li>
              <strong>Bố trí cốt thép mặt vỏ:</strong> Đặt lưới thép hàn hoặc buộc <InlineMath math="\\phi 6 \\div \\phi 8" /> khoảng cách <InlineMath math="s = 150 \\div 200\\text{ mm}" />. Hàm lượng cốt thép tối thiểu <InlineMath math="\\mu_{\\min} = 0.2\\%" /> theo mỗi phương để chống nứt co ngót và chênh lệch nhiệt độ.
            </li>
            <li>
              <strong>Gia cường vùng góc:</strong> Tại 4 góc của vỏ thoải chữ nhật, ứng suất kéo và trượt rất lớn, bố trí thêm lưới thép xiên góc <InlineMath math="45^\\circ" /> hoặc thép 2 lớp trên dưới.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 5.7 */}
      <section id="section-5-7" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.7 Vỏ thoải cong hai chiều độ cong âm (Hypa)
        </h2>
        <p className="text-text-sub leading-relaxed">
          Vỏ Hypa (Paraboloid Hyperbolic) có phương trình mặt cong dạng yên ngựa: <InlineMath math="z = \\frac{x y}{c}" />.
        </p>
        <FormulaBlock
          number="5.3"
          source="T3 tr.210"
          latex="S = \frac{q \cdot a \cdot b}{2 f}"
          description="Ứng suất trượt màng thuần túy trong vỏ Hypa chịu tải trọng phân bố đều q"
        />
        <div className="bg-surface p-4 rounded-xl border border-border text-sm text-text-sub">
          <p>
            Trạng thái ứng suất trong vỏ Hypa là <strong>trạng thái trượt thuần túy</strong>. Chiếu theo góc nghiêng \(45^\circ\) so với các trục tọa độ đường sinh, lực trượt chuyển thành:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Một phương chịu <strong>kéo chính (\(\sigma_1 = S\))</strong> dọc theo parabol ngửa (làm việc như dây võng).</li>
            <li>Một phương chịu <strong>nén chính (\(\sigma_2 = -S\))</strong> dọc theo parabol úp (làm việc như vòm cong).</li>
          </ul>
        </div>
      </section>

      {/* SECTION 5.8 */}
      <section id="section-5-8" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.8 Vỏ cầu (Mái vòm tròn xoay)
        </h2>
        <p className="text-text-sub leading-relaxed">
          Mái vòm chỏm cầu bán kính \(R\) chịu tải trọng bản thân phân bố đều \(g\) trên diện tích mặt cầu. Nội lực màng tại góc vị trí \(\varphi\) đo từ đỉnh:
        </p>
        <FormulaBlock
          number="5.4"
          source="T3 tr.220"
          latex="N_\varphi = -\frac{g R}{1 + \cos\varphi}"
          description="Lực dọc kinh tuyến trong vỏ cầu (luôn là lực nén)"
        />
        <FormulaBlock
          number="5.5"
          source="T3 tr.221"
          latex="N_\theta = g R \left( \frac{1}{1 + \cos\varphi} - \cos\varphi \right)"
          description="Lực vòng vĩ tuyến trong vỏ cầu (đổi dấu tại góc tới hạn)"
        />
        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm space-y-2">
          <p className="font-semibold text-amber-700 dark:text-amber-400">
            Góc tới hạn đổi dấu lực vòng (\(\varphi_0 \approx 51^\circ 49'\)):
          </p>
          <p className="text-text-sub">
            Giải phương trình <InlineMath math="N_\\theta = 0 \\Leftrightarrow \\cos^2\\varphi + \\cos\\varphi - 1 = 0 \\Rightarrow \\cos\\varphi_0 = \\frac{\\sqrt{5}-1}{2} \\approx 0.618 \\Rightarrow \\varphi_0 = 51^\\circ 49\'" />.
          </p>
          <ul className="list-disc pl-5 text-text-sub space-y-1">
            <li>Khi \(\varphi &lt; 51^\circ 49'\): \(N_\theta &lt; 0\) (vùng đỉnh vòm chịu nén vòng).</li>
            <li>Khi \(\varphi &gt; 51^\circ 49'\): \(N_\theta &gt; 0\) (vùng chân vòm chịu kéo vòng, bê tông có nguy cơ nứt xé dọc theo phương kinh tuyến nếu không có đủ cốt đai vĩ tuyến).</li>
          </ul>
        </div>
      </section>

      {/* SECTION 5.9 */}
      <section id="section-5-9" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.9 Mái vỏ tổ hợp
        </h2>
        <p className="text-text-sub leading-relaxed">
          Để bao che các công trình mặt bằng đa giác hoặc tự do, người ta ghép nhiều mảnh vỏ đơn lại với nhau:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-surface p-4 rounded-xl border border-border">
            <h4 className="font-bold text-primary mb-1">Mái vỏ Hypa tổ hợp 4 cánh (Mái ô):</h4>
            <p className="text-text-sub">
              Bốn mảnh Hypa ghép lại tựa trên một cột trung tâm tạo thành hình chiếc ô ngược thoát nước về giữa, hoặc tựa trên 4 cột biên tạo thành mái nhà công nghiệp khẩu độ lớn.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border">
            <h4 className="font-bold text-primary mb-1">Vỏ gấp nếp (Folded plates):</h4>
            <p className="text-text-sub">
              Tổ hợp các bản phẳng hình chữ nhật hoặc hình thang đặt nghiêng góc hình chữ V hoặc chữ Z, hoạt động đồng thời như hệ bản chịu uốn ngang và dầm thành cao chịu uốn dọc.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5.10 */}
      <section id="section-5-10" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          5.10 Bài tập ví dụ tính toán Mái vòm cầu
        </h2>
        <ExampleBlock
          title="Ví dụ 5.1 (T3 tr.228): Thiết kế vòm cầu bê tông cốt thép đường kính 28m"
          problem={`Một mái vòm chỏm cầu BTCT bao che nhà thi đấu, bán kính mặt cong R = 20 m, góc nửa đỉnh alpha = 45 độ (đường kính chân vòm D = 2 * R * sin 45° = 28.28 m).
Chiều dày vỏ t = 60 mm, bê tông B25 (Rb = 14.5 MPa), cốt thép CII (Rs = 280 MPa).
Tải trọng bản thân vỏ và hoàn thiện: g = 2.0 kN/m2. Hoạt tải sửa chữa: ph = 0.75 kN/m2.
Hệ số vượt tải n = 1.2.
Yêu cầu:
1. Tính lực nén kinh tuyến và lực vòng vĩ tuyến tại đỉnh vòm (phi = 0) và tại chân vòm (phi = 45 độ).
2. Kiểm tra khả năng chịu nén của bê tông vỏ tại chân vòm.
3. Tính lực căng ngang T và diện tích cốt thép vành đai căng chân vòm.`}
          solution={[
            {
              step: 'Bước 1: Tính toán tải trọng phân bố tính toán q',
              detail: `Tải trọng phân bố tính toán tổng cộng:
q = n * (g + ph) = 1.2 * (2.0 + 0.75) = 3.30 kN/m2.`
            },
            {
              step: 'Bước 2: Xác định nội lực tại đỉnh vòm (phi = 0°)',
              detail: `Tại phi = 0°, cos 0° = 1.
Lực kinh tuyến:
N_phi(0) = - (q * R) / (1 + cos 0°) = - (3.30 * 20) / 2 = - 33.0 kN/m (nén).
Lực vòng vĩ tuyến:
N_theta(0) = - 33.0 kN/m (nén đồng đều 2 phương).`
            },
            {
              step: 'Bước 3: Xác định nội lực tại chân vòm (phi = 45°)',
              detail: `Tại phi = 45°, cos 45° = 0.7071.
Lực kinh tuyến tại chân:
N_phi(45°) = - (3.30 * 20) / (1 + 0.7071) = - 66.0 / 1.7071 = - 38.66 kN/m (nén).
Lực vòng vĩ tuyến tại chân:
N_theta(45°) = 3.30 * 20 * [ (1 / 1.7071) - 0.7071 ] = 66.0 * (0.5858 - 0.7071) = - 8.01 kN/m (vẫn là nén vì 45° < 51°49').`
            },
            {
              step: 'Bước 4: Kiểm tra ứng suất nén bê tông vỏ',
              detail: `Tiết diện dải vỏ rộng b = 1m = 1000 mm, dày t = 60 mm:
A = b * t = 1000 * 60 = 60000 mm2.
Ứng suất nén lớn nhất tại chân vòm:
sigma = |N_phi| / A = (38.66 * 10^3) / 60000 = 0.64 MPa << R_b = 14.5 MPa.
Bê tông thừa khả năng chịu nén, chiều dày t = 60 mm được quyết định chủ yếu bởi yêu cầu bao bọc cốt thép và độ cứng chống oằn.`
            },
            {
              step: 'Bước 5: Tính toán cốt thép vành căng chân vòm (Ring beam)',
              detail: `Bán kính chân vòm: r = R * sin 45° = 20 * 0.7071 = 14.14 m.
Lực xô ngang trên 1m chu vi:
H = |N_phi(45°)| * cos 45° = 38.66 * 0.7071 = 27.34 kN/m.
Lực kéo căng đứt trong vành tròn chân vòm:
T = H * r = 27.34 * 14.14 = 386.6 kN.
Diện tích cốt thép vành căng yêu cầu (thép CII, Rs = 280 MPa):
A_s = T / R_s = (386.6 * 10^3) / 280 = 1380.7 mm2.
Chọn bố trí 4 phi 22 (As = 1520 mm2) đặt trong dầm vành chân vòm kích thước 300x500 mm.`
            }
          ]}
        />
      </section>

      {/* CONSTRUCTION & COMMON MISTAKES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ConstructionNote title="Kỹ thuật thi công Mái vỏ mỏng">
          <ul className="list-disc pl-5 space-y-2 text-sm text-text-sub">
            <li>
              <strong>Trình tự tháo dỡ cốp pha vỏ:</strong> Phải hạ giàn giáo đều đặn đồng thời từ đỉnh vòm xuống dần các biên để tránh hiện tượng dồn nội lực cục bộ làm vỡ vỏ.
            </li>
            <li>
              <strong>Độ võng và chống oằn:</strong> Với vỏ siêu mỏng (t = 50-60mm), cần đặc biệt lưu ý kiểm tra biến dạng võng dài hạn do từ biến của bê tông và kiểm toán hệ số an toàn chống mất ổn định oằn vỏ <InlineMath math="k_{od} \\ge 2.5" />.
            </li>
            <li>
              <strong>Căng kéo vành đáy:</strong> Dầm vành căng chân vòm chịu lực kéo rất lớn; trong các công trình hiện đại thường dùng cáp dự ứng lực căng sau để triệt tiêu hoàn toàn vết nứt ở dầm biên.
            </li>
          </ul>
        </ConstructionNote>

        <CommonMistakes
          mistakes={[
            {
              mistake: 'Bỏ qua lực xô ngang chân vòm đẩy đầu cột',
              consequence: 'Nếu không có vành đai căng hoặc thanh giằng ngầm đủ khỏe, lực xô ngang sẽ đẩy các cột biên nghiêng ra ngoài làm sập toàn bộ mái vòm.',
              correction: 'Bắt buộc thiết kế dầm vành căng (ring beam) khép kín chịu lực kéo T = H * r hoặc dùng móng cọc xiên neo giằng.',
              bookRef: 'T3 tr.225'
            },
            {
              mistake: 'Quên kiểm tra nứt kéo vòng khi góc mở đỉnh vòm lớn hơn 51°49\'',
              consequence: 'Vùng chân vòm xuất hiện lực kéo vòng N_theta > 0 gây nứt xé dọc kinh tuyến.',
              correction: 'Phải đặt cốt thép đai vĩ tuyến đủ chịu lực kéo vòng ở toàn bộ đới vỏ có góc phi > 51°49\'.',
              bookRef: 'T3 tr.222'
            }
          ]}
        />
      </div>

      {/* FLASHCARD DECK & QUIZ */}
      <FlashcardDeck
        cards={[
          {
            question: 'Thế nào là trạng thái phi mômen trong kết cấu vỏ mỏng?',
            answer: 'Là trạng thái ứng suất mà mômen uốn, mômen xoắn và lực cắt vuông góc đều xấp xỉ bằng không, ngoại tải được cân bằng hoàn toàn bằng lực màng nằm trong mặt phẳng tiếp diện.'
          },
          {
            question: 'Tại sao vỏ Paraboloid Hyperbolic (Hypa) lại rất kinh tế khi thi công cốp pha?',
            answer: 'Vì mặt cong Hypa có độ cong Gauss âm và được tạo thành từ 2 họ đường sinh thẳng, cho phép ghép ván khuôn hoàn toàn bằng các thanh gỗ hoặc thép thẳng không cần uốn cong.'
          },
          {
            question: 'Góc tới hạn nào trong vòm cầu phân chia giữa vùng nén vòng và vùng kéo vòng?',
            answer: 'Góc phi_0 = 51°49\'. Khi phi < 51°49\' lực vòng là nén; khi phi > 51°49\' lực vòng chuyển sang kéo.'
          }
        ]}
      />

      <QuizBlock
        questions={[
          {
            question: 'Độ cong toàn phần Gauss K của mặt vỏ elipxoit và vỏ cầu có đặc điểm gì?',
            options: ['K < 0 (Gauss âm)', 'K = 0 (Gauss bằng không)', 'K > 0 (Gauss dương)', 'K thay đổi dấu liên tục'],
            correctIndex: 2,
            explanation: 'Vỏ elipxoit và vỏ cầu có hai tâm cong chính nằm về cùng một phía của mặt vỏ, do đó tích 1/(R1*R2) > 0 (Gauss dương).'
          },
          {
            question: 'Lực nào giữ vai trò triệt tiêu lực đẩy ngang tại chân mái vòm cầu để không truyền lực xô ra cột đỡ?',
            options: ['Lực cắt của bản vỏ', 'Lực kéo trong dầm vành căng đáy (Ring beam)', 'Trọng lượng của dầm biên', 'Cốt thép dọc kinh tuyến'],
            correctIndex: 1,
            explanation: 'Dầm vành căng đáy (Ring beam) chịu lực kéo tròn T = H * r để giữ chân vòm không bị xòe nở ra ngoài.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-3/chuong-5" />
    </div>
  );
};
