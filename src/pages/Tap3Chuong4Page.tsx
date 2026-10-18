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
import { Tank } from '../three/elements/Tank';

export const Tap3Chuong4Page: React.FC = () => {
  // Silo Interactive Calculator State
  const [D_m, setD] = useState<number>(6.0);
  const [H_m, setH] = useState<number>(18.0);
  const [gamma_kN, setGamma] = useState<number>(15.0);
  const [phi_deg, setPhi] = useState<number>(30);
  const [f_friction, setF] = useState<number>(0.35);

  // Janssen calculations
  const phi_rad = (phi_deg * Math.PI) / 180;
  const k_ratio = (1 - Math.sin(phi_rad)) / (1 + Math.sin(phi_rad));
  const rho_m = D_m / 4.0;
  const p_h_max = (gamma_kN * rho_m) / f_friction;
  const exponent = (f_friction * k_ratio * H_m) / rho_m;
  const p_h_bottom = p_h_max * (1 - Math.exp(-exponent));
  const p_v_bottom = p_h_bottom / k_ratio;
  const R_radius = D_m / 2.0;
  const N_hoop_kN_m = p_h_bottom * R_radius;
  const n_load = 1.3;
  const N_u_kN_m = N_hoop_kN_m * n_load;
  const Rs_MPa = 280; // CII
  const As_req_mm2 = (N_u_kN_m * 1000) / Rs_MPa;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 3: Các cấu kiện đặc biệt</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 4: Silô – Bunke</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 4: Silô và Bunke Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Lý thuyết áp lực vật liệu rời Janssen, áp lực trên thành phễu nghiêng, tính toán nội lực và bố trí cốt thép bể chứa dạng đứng.
        </p>
      </div>

      <StandardBanner volume="tap3" />

      {/* 3D VIEWER INTERACTIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-surface rounded-2xl p-4 shadow-card border border-border">
          <h2 className="text-lg font-bold text-text-main mb-3 flex items-center justify-between">
            <span>Mô hình 3D Silô Tròn Chứa Vật Liệu Rời</span>
            <span className="text-xs bg-primary/10 text-primary font-mono px-2 py-1 rounded">
              D = {D_m}m | H = {H_m}m
            </span>
          </h2>
          <div className="h-[420px] rounded-xl overflow-hidden bg-bg-dark border border-border">
            <ViewerCanvas cameraPosition={[8, 12, 10]}>
              <Tank
                type="circular"
                diameterMm={D_m * 1000}
                heightMm={H_m * 1000}
                wallThickMm={200}
                waterLevelPct={85}
                isXray={true}
                showDimensions={true}
              />
            </ViewerCanvas>
          </div>
          <p className="text-xs text-text-sub mt-3 italic text-center">
            Mô hình trực quan: thành silô chịu lực kéo vòng tròn tiệm cận theo chiều sâu. Dùng chuột kéo để xoay, lăn chuột phóng to/thu nhỏ.
          </p>
        </div>

        {/* INTERACTIVE CALCULATOR */}
        <div className="bg-surface rounded-2xl p-6 shadow-card border border-border space-y-4">
          <h2 className="text-lg font-bold text-text-main border-b border-border pb-2">
            Tính áp lực Janssen & cốt thép đai
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-text-sub block text-xs mb-1">Đường kính silô D (m):</label>
              <input
                type="number"
                step="0.5"
                min="3"
                max="15"
                value={D_m}
                onChange={(e) => setD(parseFloat(e.target.value) || 3)}
                className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
              />
            </div>
            <div>
              <label className="text-text-sub block text-xs mb-1">Chiều cao chứa H (m):</label>
              <input
                type="number"
                step="1"
                min="6"
                max="40"
                value={H_m}
                onChange={(e) => setH(parseFloat(e.target.value) || 6)}
                className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-text-sub block text-xs mb-1">Dung trọng \(\gamma\) (kN/m³):</label>
                <input
                  type="number"
                  step="1"
                  min="5"
                  max="25"
                  value={gamma_kN}
                  onChange={(e) => setGamma(parseFloat(e.target.value) || 10)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
              <div>
                <label className="text-text-sub block text-xs mb-1">Góc ma sát \(\varphi\) (°):</label>
                <input
                  type="number"
                  step="1"
                  min="15"
                  max="45"
                  value={phi_deg}
                  onChange={(e) => setPhi(parseFloat(e.target.value) || 20)}
                  className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-text-sub block text-xs mb-1">Hệ số ma sát thành \(f = \tan\varphi_1\):</label>
              <input
                type="number"
                step="0.05"
                min="0.2"
                max="0.6"
                value={f_friction}
                onChange={(e) => setF(parseFloat(e.target.value) || 0.3)}
                className="w-full bg-bg border border-border rounded px-3 py-1.5 text-text-main font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-sub">Hệ số áp lực bên k:</span>
              <span className="font-mono font-semibold text-text-main">{k_ratio.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Bán kính thủy lực \(\rho = D/4\):</span>
              <span className="font-mono font-semibold text-text-main">{rho_m.toFixed(2)} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Áp lực ngang đáy \(p_h\):</span>
              <span className="font-mono font-bold text-primary">{p_h_bottom.toFixed(2)} kN/m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Áp lực đứng đáy \(p_v\):</span>
              <span className="font-mono font-bold text-text-main">{p_v_bottom.toFixed(2)} kN/m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-sub">Lực căng vòng \(N_u = n \cdot p_h R\):</span>
              <span className="font-mono font-bold text-red-500">{N_u_kN_m.toFixed(1)} kN/m</span>
            </div>
            <div className="flex justify-between bg-primary/10 p-2 rounded">
              <span className="font-semibold text-text-main">Thép đai yêu cầu \(A_s\):</span>
              <span className="font-mono font-bold text-primary">{As_req_mm2.toFixed(0)} mm²/m</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4.1 */}
      <section id="section-4-1" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          4.1 Khái niệm chung về Silô và Bunke
        </h2>
        <p className="text-text-sub leading-relaxed">
          Silô và bunke là các công trình chứa vật liệu rời (than đá, cát, xi măng, thóc, ngô, quặng...) được sử dụng rộng rãi trong nhà máy nhiệt điện, xi măng, chế biến nông sản và luyện kim.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-surface p-5 rounded-xl border border-border">
            <h3 className="text-lg font-bold text-primary mb-2">Bunke (Kho nông)</h3>
            <p className="text-sm text-text-sub leading-relaxed">
              Là kho chứa dạng hở hoặc kín có tỉ số giữa chiều cao phần chứa vật liệu \(h\) và kích thước mặt cắt ngang \(d\) nhỏ (\(h/d &lt; 1.5\)). Mặt phẳng trượt của vật liệu rời cắt mặt thoáng tự do trước khi gặp thành đối diện. Lực ma sát thành nhỏ, áp lực tác dụng lên thành tăng gần như tuyến tính theo chiều sâu giống chất lỏng.
            </p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border">
            <h3 className="text-lg font-bold text-primary mb-2">Silô (Kho sâu)</h3>
            <p className="text-sm text-text-sub leading-relaxed">
              Là kho chứa dạng đứng cao, có tỉ số \(h/d \ge 1.5\). Mặt phẳng trượt tiềm năng cắt thành đối diện bên kia trước khi lên tới mặt thoáng tự do. Ma sát giữa vật liệu và thành silô giữ lại một phần lớn trọng lượng khối hạt, do đó áp lực ngang không tăng tuyến tính vô hạn mà tiệm cận giá trị bão hòa.
            </p>
          </div>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border">
          <h4 className="font-bold text-text-main text-sm mb-2">Các thông số cơ bản của vật liệu rời:</h4>
          <ul className="list-disc pl-5 text-sm text-text-sub space-y-1">
            <li><strong>Dung trọng tiêu chuẩn \(\gamma\) (kN/m³):</strong> Than đá 8–10, Cát khô 16–18, Xi măng rời 14–16, Lúa mì 7.5–8.5.</li>
            <li><strong>Góc ma sát trong \(\varphi\):</strong> Góc nghiêng tự nhiên của khối hạt khi đổ tự do (thường 25°–35°).</li>
            <li><strong>Góc ma sát giữa vật liệu và thành kho \(\varphi_1\):</strong> Phụ thuộc độ nhám bề mặt bê tông (thường lấy \(\varphi_1 = (0.6..0.8)\varphi\)).</li>
          </ul>
        </div>
      </section>

      {/* SECTION 4.2 */}
      <section id="section-4-2" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          4.2 Bunke
        </h2>
        <p className="text-text-sub leading-relaxed">
          Bunke thường bao gồm ba bộ phận kết cấu chính: phần thành đứng hình chữ nhật hoặc tròn, phần đáy phễu dốc hình chóp cụt hoặc nón cụt, và hệ dầm - cột đỡ truyền lực xuống móng.
        </p>
        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <h3 className="font-bold text-text-main text-base">Yêu cầu góc nghiêng thành phễu (\(\alpha\)):</h3>
          <p className="text-sm text-text-sub leading-relaxed">
            Để đảm bảo vật liệu rời tự tháo kiệt nhờ trọng lực mà không bị đọng lại ở góc phễu, góc nghiêng của thành phễu so với phương ngang \(\alpha\) phải thỏa mãn:
          </p>
          <FormulaBlock
            number="4.1"
            source="T3 tr.145"
            latex="\alpha \ge \varphi_1 + (5^\circ \div 10^\circ)"
            description="Điều kiện tự tháo kiệt vật liệu rời trên thành phễu nghiêng bunke"
          />
          <p className="text-sm text-text-sub">
            Với cát ẩm và xi măng, góc nghiêng phễu thường chọn từ \(50^\circ\) đến \(60^\circ\). Tại các góc giao nhau của phễu chóp tứ giác, đường sinh góc có góc dốc nhỏ hơn thành bên nên cần lượn tròn bán kính cong hoặc đệm vát góc bằng vữa xi măng mác cao.
          </p>
        </div>
      </section>

      {/* SECTION 4.3 */}
      <section id="section-4-3" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          4.3 Tính toán Bunke
        </h2>
        <p className="text-text-sub leading-relaxed">
          Trên thành đứng và phễu nghiêng của bunke, tải trọng tác dụng bao gồm trọng lượng bản thân bê tông, áp lực pháp tuyến và áp lực ma sát tiếp tuyến do vật liệu rời sinh ra.
        </p>
        <FormulaBlock
          number="4.2"
          source="T3 tr.148"
          latex="p_h(y) = \gamma \cdot y \cdot \tan^2\left(45^\circ - \frac{\varphi}{2}\right) = \gamma \cdot y \cdot k"
          description="Áp lực ngang của vật liệu rời lên thành đứng của bunke ở độ sâu y"
        />
        <div className="space-y-3">
          <h4 className="font-bold text-text-main text-base">Áp lực trên bản phễu nghiêng góc \(\alpha\) so với phương ngang:</h4>
          <p className="text-sm text-text-sub">
            Tại điểm có độ sâu \(y\) từ mặt thoáng vật liệu, áp lực thẳng đứng \(p_v = \gamma y\) và áp lực ngang \(p_h = k \gamma y\). Chiếu lên hệ tọa độ pháp tuyến và tiếp tuyến của bản đáy:
          </p>
          <FormulaBlock
            number="4.3"
            source="T3 tr.150"
            latex="p_n = p_v \cos^2\alpha + p_h \sin^2\alpha"
            description="Áp lực vuông góc (pháp tuyến) tác dụng lên mặt nghiêng phễu bunke"
          />
          <FormulaBlock
            number="4.4"
            source="T3 tr.151"
            latex="p_t = (p_v - p_h) \sin\alpha \cos\alpha"
            description="Áp lực tiếp tuyến gây lực ma sát trượt dọc theo mặt nghiêng phễu"
          />
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm">
            <p className="font-semibold text-amber-700 dark:text-amber-400">Hệ số động lực khi xả liệu (\(k_d\)):</p>
            <p className="text-text-sub mt-1">
              Khi mở cửa tháo liệu ở đáy bunke, vật liệu dịch chuyển đột ngột gây áp lực va đập động lực. Tiêu chuẩn quy định nhân áp lực tính toán với hệ số xung lực \(k_d = 1.2 \div 1.5\) khi thiết kế bản phễu và cửa xả.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4.4 */}
      <section id="section-4-4" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          4.4 Mômen uốn trong tường Bunke
        </h2>
        <p className="text-text-sub leading-relaxed">
          Tường bunke hình chữ nhật làm việc đồng thời như bản chịu uốn hai phương do áp lực vật liệu đẩy ra ngoài, và dầm thành cao chịu lực kéo dọc treo trọng lượng đáy phễu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-primary text-base">Uốn ngang bản thành:</h4>
            <p className="text-sm text-text-sub leading-relaxed">
              Khi chiều cao tường lớn hơn bề rộng (\(h/b &gt; 2\)), coi tường như bản dầm nằm ngang kê lên hai vách biên vuông góc. Ở góc tường xuất hiện mômen âm lớn \(M_g = -p_h b^2 / 12\), ở giữa nhịp xuất hiện mômen dương \(M_n = p_h b^2 / 24\).
            </p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-primary text-base">Lực kéo treo dọc:</h4>
            <p className="text-sm text-text-sub leading-relaxed">
              Trọng lượng toàn bộ phễu nghiêng cộng với vật liệu chứa bên trong được treo vào chân thành đứng. Lực kéo đơn vị dọc tường:
            </p>
            <FormulaBlock
              number="4.5"
              source="T3 tr.155"
              latex="T_y = \frac{G_{ph\hat{e}u} + G_{v\hat{a}t\_li\hat{e}u}}{2(a + b)}"
              description="Lực kéo đơn vị treo dọc chân tường bunke hình chữ nhật (a x b)"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4.5 */}
      <section id="section-4-5" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          4.5 Silô & Lý thuyết Janssen
        </h2>
        <p className="text-text-sub leading-relaxed">
          Trong kho sâu (Silô), lý thuyết áp lực thủy tĩnh không còn đúng do ma sát thành. Năm 1895, kỹ sư H.A. Janssen đã thiết lập phương trình vi phân cân bằng cho phân tố vật liệu rời và giải ra công thức kinh điển mang tên ông.
        </p>

        <FormulaBlock
          number="4.6"
          source="T3 tr.160"
          latex="p_h(y) = \frac{\gamma \rho}{f} \left[ 1 - \exp\left(-\frac{f k y}{\rho}\right) \right]"
          description="Công thức Janssen tính áp lực ngang của khối hạt lên thành silô ở độ sâu y"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
          <div className="bg-surface p-4 rounded-xl border border-border">
            <p className="font-bold text-text-main">Bán kính thủy lực <InlineMath math="\\rho" />:</p>
            <p className="text-text-sub mt-1">
              <InlineMath math="\\rho = A / U" />. Với silô tròn đường kính <InlineMath math="D" />:
              <br />
              <InlineMath math="\\rho = \\frac{\\pi D^2/4}{\\pi D} = \\frac{D}{4}" />.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border">
            <p className="font-bold text-text-main">Áp lực thẳng đứng <InlineMath math="p_v" />:</p>
            <p className="text-text-sub mt-1">
              <InlineMath math="p_v(y) = p_h(y) / k" />. Áp lực đứng cũng tiệm cận giá trị bão hòa <InlineMath math="\\frac{\\gamma \\rho}{f k}" />.
            </p>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border">
            <p className="font-bold text-text-main">Lực kéo vòng trong thành:</p>
            <p className="text-text-sub mt-1">
              Thành silô tròn chịu kéo đúng tâm theo phương chu vi:
              <br />
              <InlineMath math="N_h(y) = p_h(y) \\cdot R = p_h(y) \\cdot \\frac{D}{2}" />.
            </p>
          </div>
        </div>

        <FormulaBlock
          number="4.7"
          source="T3 tr.163"
          latex="A_{s} = \frac{n \cdot N_h}{R_s} = \frac{n \cdot p_h \cdot R}{R_s}"
          description="Diện tích cốt thép đai chịu kéo vòng trên 1m chiều cao thành silô tròn"
          compare5574={true}
        />
      </section>

      {/* SECTION 4.6 */}
      <section id="section-4-6" className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border pb-2">
          4.6 Bài tập ví dụ tính toán Silô tròn
        </h2>
        <ExampleBlock
          title="Ví dụ 4.1 (T3 tr.168): Thiết kế thành silô bê tông cốt thép chứa xi măng"
          problem={`Một silô đơn bằng BTCT hình trụ tròn, đường kính trong D = 6.0 m, chiều cao thân trụ H = 18 m.
Chứa xi măng rời có dung trọng gamma = 15 kN/m3, góc ma sát trong phi = 30 độ, hệ số ma sát giữa xi măng và thành bê tông f = 0.35.
Hệ số vượt tải n = 1.3. Bê tông B20 (Rb = 11.5 MPa), cốt thép CII (Rs = 280 MPa).
Yêu cầu:
1. Tính áp lực ngang cực đại theo lý thuyết Janssen tại đáy thân silô (y = 18 m).
2. Xác định lực kéo vòng tính toán và diện tích cốt thép đai yêu cầu trên 1m chiều cao.`}
          solution={[
            {
              step: 'Bước 1: Xác định các thông số hình học và hệ số vật liệu',
              detail: `Bán kính silô: R = D / 2 = 3.0 m.
Bán kính thủy lực: rho = D / 4 = 6.0 / 4 = 1.5 m.
Hệ số áp lực bên của xi măng rời:
k = tan^2(45° - phi/2) = tan^2(30°) = (1 - sin 30°) / (1 + sin 30°) = 0.333.
Áp lực ngang giới hạn tiệm cận:
p_{h,max} = (gamma * rho) / f = (15 * 1.5) / 0.35 = 64.29 kN/m2.`
            },
            {
              step: 'Bước 2: Tính áp lực ngang Janssen tại độ sâu y = 18 m',
              detail: `Số mũ giảm chấn Janssen:
exponent = (f * k * y) / rho = (0.35 * 0.333 * 18) / 1.5 = 1.40.
Hệ số điều chỉnh áp lực:
1 - exp(-1.40) = 1 - 0.2466 = 0.7534.
Áp lực ngang tiêu chuẩn tại chân thành silô:
p_h(18) = 64.29 * 0.7534 = 48.44 kN/m2.`
            },
            {
              step: 'Bước 3: Xác định lực kéo vòng tính toán Nu',
              detail: `Lực kéo vòng tiêu chuẩn trên 1m chiều cao thành:
N_h = p_h * R = 48.44 * 3.0 = 145.32 kN/m.
Lực kéo vòng tính toán (có hệ số vượt tải n = 1.3):
N_u = n * N_h = 1.3 * 145.32 = 188.92 kN/m.`
            },
            {
              step: 'Bước 4: Tính toán và chọn cốt thép đai chịu kéo vòng',
              detail: `Diện tích cốt thép đai yêu cầu trên 1m dải thành:
A_s = N_u / R_s = (188.92 * 10^3) / 280 = 674.7 mm2/m.
Vì thành silô dày t = 180 mm, bố trí cốt thép đai ở cả 2 mặt trong và ngoài để chống nứt và chịu mômen cục bộ do biến dạng elip.
Chọn cốt đai phi 10 a = 150 mm ở cả 2 lớp (2 x 524 = 1048 mm2/m > 675 mm2/m) thỏa mãn an toàn chịu lực.`
            }
          ]}
        />
      </section>

      {/* CONSTRUCTION NOTES & COMMON MISTAKES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ConstructionNote title="Lưu ý cấu tạo thi công Silô và Bunke">
          <ul className="list-disc pl-5 space-y-2 text-sm text-text-sub">
            <li>
              <strong>Đoạn nối chồng cốt thép đai vòng:</strong> Thép đai tròn chịu kéo lớn, tuyệt đối không nối trên cùng một tiết diện thẳng đứng. Mối nối phải sole nhau cách nhau tối thiểu 50d và hàn nối hoặc uốn móc neo chắc chắn.
            </li>
            <li>
              <strong>Cốp pha trượt (Slipform):</strong> Thành silô cao thường được thi công bằng công nghệ ván khuôn trượt liên tục cả ngày đêm để tránh mạch ngừng thi công ngang dễ gây thấm nước và nứt vỡ.
            </li>
            <li>
              <strong>Góc phễu xả:</strong> Cần đặt thêm các tấm thép chịu mài mòn (wear liners) hoặc gạch bazan đúc tại các vị trí phễu xả than và clinker chịu cọ xát mạnh.
            </li>
          </ul>
        </ConstructionNote>

        <CommonMistakes
          mistakes={[
            {
              mistake: 'Dùng công thức áp lực thủy tĩnh tuyến tính p = gamma * y để tính thành silô sâu',
              consequence: 'Dẫn đến áp lực ở đáy bị phóng đại quá mức vô lý, tốn thép lãng phí; trong khi áp lực ở phần trên lại bị tính thiếu.',
              correction: 'Phải dùng công thức Janssen tính đến ma sát thành giúp giảm áp lực đáy và truyền tải trọng nén dọc xuống chân thành silô.',
              bookRef: 'T3 tr.159'
            },
            {
              mistake: 'Bỏ qua hệ số động lực xung áp khi xả liệu qua phễu',
              consequence: 'Khi tháo van đột ngột, hiện tượng vòm tắc cục bộ bị sập tạo xung áp lớn làm phồng vỡ hoặc nứt toác phễu xả.',
              correction: 'Nhân hệ số động kd = 1.2 - 1.5 vào tải trọng áp lực trên bản phễu và dầm biên treo đáy.',
              bookRef: 'T3 tr.151'
            }
          ]}
        />
      </div>

      {/* FLASHCARD DECK & QUIZ */}
      <FlashcardDeck
        cards={[
          {
            question: 'Khi nào một công trình chứa vật liệu rời được phân loại là Silô thay vì Bunke?',
            answer: 'Khi tỉ số giữa chiều cao chứa vật liệu và đường kính (hoặc cạnh nhỏ nhất) thỏa mãn h / d >= 1.5, tạo nên hiệu ứng vòm ma sát thành theo lý thuyết Janssen.'
          },
          {
            question: 'Tại sao góc nghiêng phễu bunke phải thỏa mãn alpha >= phi_1 + (5° đến 10°)?',
            answer: 'Để thành phần trọng lực dọc theo mặt phẳng nghiêng lớn hơn lực ma sát nghỉ giữa vật liệu và thành, đảm bảo vật liệu tự tháo kiệt hoàn toàn.'
          },
          {
            question: 'Tại sao thành silô hình tròn làm việc hiệu quả và kinh tế hơn silô hình chữ nhật?',
            answer: 'Vì tiết diện tròn chỉ chịu lực kéo đúng tâm (kéo vòng) không có mômen uốn, tận dụng tối đa 100% diện tích làm việc của cốt thép đai.'
          }
        ]}
      />

      <QuizBlock
        questions={[
          {
            question: 'Bán kính thủy lực rho của một silô hình tròn có đường kính D bằng bao nhiêu?',
            options: ['D / 2', 'D / 4', 'D / 8', 'pi * D / 4'],
            correctIndex: 1,
            explanation: 'Bán kính thủy lực rho = Diện tích tiết diện ngang A / Chu vi U = (pi * D^2 / 4) / (pi * D) = D / 4.'
          },
          {
            question: 'Theo lý thuyết Janssen, khi độ sâu y tiến đến vô cùng rất lớn, áp lực ngang p_h sẽ tiến đến giá trị nào?',
            options: ['Tiến đến vô cùng tuyến tính', 'Bằng 0', 'Tiệm cận giá trị cực đại (gamma * rho) / f', 'Bằng áp lực thủy tĩnh'],
            correctIndex: 2,
            explanation: 'Vì exp(-f*k*y/rho) tiến dần về 0 khi y rất lớn, nên p_h tiến dần đến giới hạn cực đại bão hòa (gamma * rho) / f.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-3/chuong-4" />
    </div>
  );
};
