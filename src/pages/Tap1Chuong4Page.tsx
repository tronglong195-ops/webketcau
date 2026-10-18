import React from 'react';
import { StandardBanner } from '../components/StandardBanner';
import { FormulaBlock } from '../components/FormulaBlock';
import { ExampleBlock } from '../components/ExampleBlock';
import { ConstructionNote } from '../components/ConstructionNote';
import { CommonMistakes } from '../components/CommonMistakes';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { QuizBlock } from '../components/QuizBlock';
import { ChapterPagination } from '../components/ChapterPagination';

import { RectBeamScene3D } from '../components/ch4/RectBeamScene3D';
import { TBeamScene3D } from '../components/ch4/TBeamScene3D';
import { ShearCrackScene3D } from '../components/ch4/ShearCrackScene3D';
import { MaterialEnvelopeScene3D } from '../components/ch4/MaterialEnvelopeScene3D';
import { BeamCalculatorWidget } from '../components/ch4/BeamCalculatorWidget';

export const Tap1Chuong4Page: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* 1. Header & Tiêu đề chương */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>&bull;</span>
          <span>Chương 4</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-text-main mb-4 leading-tight">
          Chương 4: Cấu kiện chịu uốn
        </h1>
        <p className="text-text-muted text-base leading-relaxed">
          Nội dung toàn diện về lý thuyết tính toán, sự làm việc của bê tông và cốt thép trên tiết diện thẳng góc (Momen uốn M) và tiết diện nghiêng (Lực cắt Q). Kèm các mô hình tương tác 3D và bài toán thực tế theo giáo trình Võ Bá Tầm.
        </p>
      </div>

      {/* Banner Tiêu chuẩn */}
      <StandardBanner />

      {/* Mục lục nhanh trong trang */}
      <nav className="p-4 bg-surface border border-border rounded-xl">
        <h3 className="font-serif font-semibold text-sm text-text-main mb-2">Mục lục Chương 4</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <a href="#sec-4-1" className="text-primary hover:underline">4.1 Khái niệm chung</a>
          <a href="#sec-4-2" className="text-primary hover:underline">4.2 Tiết diện thẳng góc (THGH1)</a>
          <a href="#sec-4-3" className="text-primary hover:underline">4.3 Tiết diện chữ nhật &amp; Bài tập</a>
          <a href="#sec-4-4" className="text-primary hover:underline">4.4 Tiết diện chữ I, T &amp; Bài tập</a>
          <a href="#sec-4-5" className="text-primary hover:underline">4.5 Tiết diện nghiêng tổng quát</a>
          <a href="#sec-4-6" className="text-primary hover:underline">4.6 Tính theo lực cắt &amp; Bài tập</a>
          <a href="#sec-4-7" className="text-primary hover:underline">4.7 Biểu đồ vật liệu &amp; Neo uốn</a>
          <a href="#sec-calculator" className="text-amber-700 font-semibold hover:underline">🛠️ Bộ máy tính tương tác</a>
          <a href="#sec-quiz" className="text-emerald-700 font-semibold hover:underline">📝 Trắc nghiệm &amp; Flashcards</a>
        </div>
      </nav>

      {/* =========================================================================
          MỤC 4.1: KHÁI NIỆM CHUNG
      ========================================================================= */}
      <section id="sec-4-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            4.1
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">Khái niệm chung</h2>
        </div>

        <p className="text-text-main leading-relaxed">
          Cấu kiện chịu uốn là loại cấu kiện rất phổ biến trong các công trình dân dụng và công nghiệp (như bản sàn, dầm phụ, dầm chính, lanh tô, bản móng...). Nội lực xuất hiện chủ yếu trên tiết diện là <strong>momen uốn M</strong> và <strong>lực cắt Q</strong>. Trong một số trường hợp đặc biệt còn có momen xoắn Mx.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-serif font-semibold text-sm text-text-main">Đặc điểm hình học &amp; Kết cấu</h4>
            <ul className="text-xs text-text-muted space-y-1.5 list-disc list-inside">
              <li><strong>Bản (Slab):</strong> Chiều dày h rất nhỏ so với bề rộng b và nhịp l. Thường tính toán theo dải bản rộng b = 1 m = 1000 mm.</li>
              <li><strong>Dầm (Beam):</strong> Chiều dài l lớn hơn nhiều so với kích thước tiết diện ngang (b x h). Tiết diện thường gặp là hình chữ nhật, hình chữ T, hình chữ I, hoặc hình hộp.</li>
              <li>Tỷ lệ kinh tế thông thường của dầm: h/b = 1.5 - 3.0; chiều cao dầm h = (1/8 - 1/12)l (dầm chính) hoặc (1/12 - 1/16)l (dầm phụ).</li>
            </ul>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-serif font-semibold text-sm text-text-main">Các dạng phá hoại điển hình</h4>
            <ul className="text-xs text-text-muted space-y-1.5 list-disc list-inside">
              <li><strong>Phá hoại trên tiết diện thẳng góc:</strong> Do momen uốn M vượt quá khả năng chịu uốn Mu. Vết nứt mở vuông góc với trục cấu kiện.</li>
              <li><strong>Phá hoại trên tiết diện nghiêng:</strong> Do sự kết hợp giữa ứng suất kéo chính sigma_max do lực cắt Q và momen M. Vết nứt xuất hiện nghiêng xấp xỉ 45° gần gối tựa.</li>
              <li><strong>Phá hoại do vỡ bê tông trên dải nghiêng:</strong> Khi ứng suất nén chính sigma_min quá lớn gây nghiền nát bê tông giữa các vết nứt xiên.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MỤC 4.2: TÍNH CƯỜNG ĐỘ TIẾT DIỆN THẲNG GÓC (THGH1)
      ========================================================================= */}
      <section id="sec-4-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            4.2
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">
            Tính toán cường độ trên tiết diện thẳng góc (THGH 1)
          </h2>
        </div>

        <p className="text-text-main leading-relaxed">
          Tính toán theo trạng thái giới hạn thứ nhất (về khả năng chịu lực) nhằm đảm bảo cấu kiện không bị gãy hoặc phá hoại dưới tác dụng của tải trọng tính toán. Cơ sở tính toán dựa trên các giả thiết thực nghiệm:
        </p>

        <div className="bg-bg p-4 rounded-xl border border-border text-xs space-y-2">
          <div className="font-semibold text-text-main">Các giả thiết cơ bản (T1 tr.61):</div>
          <ol className="list-decimal list-inside space-y-1 text-text-muted">
            <li><strong>Giả thiết tiết diện phẳng (Bernoulli):</strong> Tiết diện phẳng và vuông góc với trục dầm trước khi uốn vẫn phẳng sau khi biến dạng.</li>
            <li><strong>Bỏ qua sự chịu lực của bê tông vùng kéo:</strong> Bê tông chịu kéo bị nứt hoàn toàn, toàn bộ lực kéo Zs do cốt thép dọc chịu kéo đảm nhận (Zs = Rs * As).</li>
            <li><strong>Quy ước khối ứng suất bê tông vùng nén:</strong> Thay biểu đồ ứng suất nén cong thực tế bằng khối ứng suất chữ nhật tương đương có cường độ gamma_b * Rb và chiều cao x.</li>
          </ol>
        </div>

        {/* Công thức omega và xiR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBlock
            number="(4.15)"
            source="T1 tr.62"
            latex="\omega = \alpha - \beta \cdot (\gamma_b R_b) = 0.85 - 0.008 \cdot (\gamma_b R_b)"
            description="Đặc trưng vùng biến dạng nén của bê tông nặng (với Rb tính bằng MPa)"
            compare5574={true}
          />
          <FormulaBlock
            number="(4.16)"
            source="T1 tr.62"
            latex="\xi_R = \frac{\omega}{1 + \frac{R_s}{\sigma_{sc,u}} \left(1 - \frac{\omega}{1.1}\right)}"
            description="Chiều cao giới hạn tương đối của vùng nén (với sigma_{sc,u} = 500 MPa cho bê tông nặng)"
            compare5574={true}
          />
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong>Ý nghĩa của điều kiện xi &le; xi_R (Phá hoại dẻo vs Phá hoại giòn):</strong>
          <ul className="list-disc list-inside mt-1.5 space-y-1">
            <li><strong>Khi xi &le; xi_R:</strong> Cốt thép chịu kéo đạt giới hạn chảy trước khi bê tông vùng nén bị nghiền nát. Dầm võng nhiều, khe nứt mở rộng cảnh báo trước khi sụp đổ &rarr; <em>Phá hoại dẻo an toàn</em>.</li>
            <li><strong>Khi xi &gt; xi_R:</strong> Cốt kéo chưa kịp chảy nhưng bê tông vùng nén đã bị vỡ nát đột ngột &rarr; <em>Phá hoại giòn rất nguy hiểm</em>. Tuyệt đối không được thiết kế dầm rơi vào trường hợp này.</li>
          </ul>
        </div>
      </section>

      {/* =========================================================================
          MỤC 4.3: TIẾT DIỆN CHỮ NHẬT + BÀI TẬP
      ========================================================================= */}
      <section id="sec-4-3" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            4.3
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">
            Cấu kiện tiết diện chữ nhật &amp; Bài tập thực hành
          </h2>
        </div>

        {/* 3D Scene 1: Dầm chữ nhật */}
        <RectBeamScene3D />

        <div className="space-y-4">
          <h3 className="font-serif font-semibold text-lg text-text-main">A. Cấu kiện đặt cốt đơn (Chỉ có cốt chịu kéo As)</h3>
          <p className="text-text-main text-sm leading-relaxed">
            Phương trình cân bằng hình chiếu lên trục dầm và phương trình cân bằng momen đối với trọng tâm cốt thép chịu kéo:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaBlock
              number="(4.20)"
              source="T1 tr.65"
              latex="M \le M_u = \gamma_b R_b \cdot b \cdot x \left(h_0 - \frac{x}{2}\right) = \alpha_m \gamma_b R_b b h_0^2"
              description="Phương trình cân bằng momen ngoại lực và nội lực giới hạn tiết diện"
            />
            <FormulaBlock
              number="(4.23)"
              source="T1 tr.65"
              latex="\alpha_m = \frac{M}{\gamma_b R_b b h_0^2} \le \alpha_R = \xi_R (1 - 0.5 \xi_R)"
              description="Hệ số momen giới hạn. Điều kiện cần để cấu kiện phá hoại dẻo."
              compare5574={true}
            />
          </div>

          <div className="p-4 bg-bg rounded-xl border border-border text-xs space-y-2">
            <div className="font-semibold text-text-main">Hệ số cánh tay đòn nội lực zeta và diện tích cốt thép As:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
              <div className="p-2 bg-surface rounded border border-border">{'xi = 1 - sqrt(1 - 2*alpha_m)'}</div>
              <div className="p-2 bg-surface rounded border border-border">{'zeta = 1 - 0.5*xi = 0.5*(1 + sqrt(1 - 2*alpha_m))'}</div>
              <div className="p-2 bg-surface rounded border border-border text-primary font-bold">{'As = M / (Rs * zeta * h0) = (xi * gamma_b * Rb * b * h0) / Rs'}</div>
            </div>
            <div className="text-text-muted text-[11px] pt-1">
              Kiểm tra hàm lượng cốt thép: {'mu_min <= mu = (As / (b * h0)) * 100% <= mu_max = xi_R * (gamma_b * Rb / Rs) * 100%'}. Với dầm thông thường mu_min = 0.05%.
            </div>
          </div>
        </div>

        {/* Bài tập 4.1, 4.3, 4.4 */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-base text-text-main">Các bài tập mẫu tiết diện chữ nhật (Sách T1 tr.70-72)</h4>

          <ExampleBlock
            number="Bài tập 4.1"
            title="Xác định kích thước chiều cao dầm và cốt thép As"
            source="T1 tr.70"
            problem={
              <p>
                Cho dầm chịu uốn có b = 300 mm, M = 200 kNm. Bê tông B15 có Rb = 8.5 MPa, gamma_b = 0.9. Cốt thép nhóm AII có Rs = 280 MPa. Xác định chiều cao dầm h và diện tích cốt thép As.
              </p>
            }
            steps={[
              {
                title: 'Tra bảng và xác định các hệ số giới hạn',
                content: (
                  <p>
                    Bê tông B15 (gamma_b * Rb = 7.65 MPa), Thép AII (Rs = 280 MPa). Ta tính được: omega = 0.85 - 0.008*(7.65) = 0.789. Suy ra xi_R = 0.681, alpha_R = 0.449.
                  </p>
                ),
              },
              {
                title: 'Xác định chiều cao làm việc h0 tối thiểu',
                content: (
                  <p>
                    Để dầm làm việc tối ưu và tiết kiệm cốt thép nhất (cốt đơn), lấy alpha_m = alpha_R = 0.449. Ta có h0 = sqrt(M / (alpha_R * gamma_b * Rb * b)) = sqrt(200*1e6 / (0.449 * 7.65 * 300)) = 440.4 mm.
                  </p>
                ),
              },
              {
                title: 'Chọn chiều cao toàn phần h và kiểm tra lại',
                content: (
                  <p>
                    Giả thiết lớp bảo vệ trọng tâm a = 60 mm (đặt thép 2 lớp) =&gt; h = h0 + a = 440 + 60 = 500 mm. Chọn dầm 300 x 500 mm.
                  </p>
                ),
              },
            ]}
          />

          <ExampleBlock
            number="Bài tập 4.3"
            title="Tính toán cốt thép dầm chữ nhật đặt cốt đơn"
            source="T1 tr.71"
            problem={
              <p>
                Cho dầm có b = 300 mm, h = 500 mm, a = 60 mm (h0 = 440 mm). Momen tính toán M = 190 kNm. Bê tông B15 (Rb = 8.5 MPa, gamma_b = 0.9), Cốt thép AII (Rs = 280 MPa). Tính diện tích cốt thép As.
              </p>
            }
            steps={[
              {
                title: 'Tính hệ số alpha_m',
                content: (
                  <p>
                    alpha_m = M / (gamma_b * Rb * b * h0^2) = 190*1e6 / (7.65 * 300 * 440^2) = 0.428. So sánh: alpha_m = 0.428 &lt; alpha_R = 0.449 =&gt; Dầm đặt cốt đơn, phá hoại dẻo.
                  </p>
                ),
              },
              {
                title: 'Tính hệ số chiều cao vùng nén xi',
                content: (
                  <p>
                    xi = 1 - sqrt(1 - 2*alpha_m) = 1 - sqrt(1 - 2*0.428) = 0.62.
                  </p>
                ),
              },
              {
                title: 'Tính diện tích cốt thép As và chọn thanh',
                content: (
                  <p>
                    As = (xi * gamma_b * Rb * b * h0) / Rs = (0.62 * 7.65 * 300 * 440) / 280 = 2234 mm². Chọn 5 phi 25 (As = 2454.5 mm²), bố trí 2 lớp (lớp dưới 3 thanh, lớp trên 2 thanh).
                  </p>
                ),
              },
              {
                title: 'Kiểm tra hàm lượng cốt thép',
                content: (
                  <p>
                    mu = As / (b * h0) = 2454.5 / (300 * 440) * 100% = 1.86% = mu_max. Đạt yêu cầu.
                  </p>
                ),
              },
            ]}
          />

          <ExampleBlock
            number="Bài tập 4.4"
            title="Kiểm tra khả năng chịu lực dầm đã có cốt thép"
            source="T1 tr.72"
            problem={
              <p>
                Kiểm tra khả năng chịu lực của tiết diện dầm b = 300 mm, h = 500 mm, cốt thép 5 phi 25 (As = 2454.5 mm²), a = 60 mm, B15 (gamma_b = 0.9), AII (Rs = 280 MPa).
              </p>
            }
            steps={[
              {
                title: 'Tính chiều cao vùng nén x từ phương trình cân bằng lực',
                content: (
                  <p>
                    Rs * As = gamma_b * Rb * b * x =&gt; x = (280 * 2454.5) / (7.65 * 300) = 299.4 mm.
                  </p>
                ),
              },
              {
                title: 'So sánh x với x_R',
                content: (
                  <p>
                    x_R = xi_R * h0 = 0.681 * 440 = 299.64 mm. Ta có x = 299.4 mm &le; x_R =&gt; Cốt thép kéo chảy, dẻo.
                  </p>
                ),
              },
              {
                title: 'Tính momen giới hạn Mu',
                content: (
                  <p>
                    Mu = gamma_b * Rb * b * x * (h0 - 0.5*x) = 7.65 * 300 * 299.4 * (440 - 0.5*299.4) * 1e-6 = 200.2 kNm &gt; M = 190 kNm =&gt; Tiết diện đủ khả năng chịu lực.
                  </p>
                ),
              },
            ]}
          />
        </div>

        {/* Cốt kép */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="font-serif font-semibold text-lg text-text-main">B. Cấu kiện đặt cốt kép (Có cả As và A's)</h3>
          <p className="text-text-main text-sm leading-relaxed">
            Khi kích thước tiết diện dầm b x h bị khống chế bởi kiến trúc hoặc tải trọng quá lớn dẫn đến alpha_m &gt; alpha_R, bê tông vùng nén một mình không đủ sức chịu nén. Ta bắt buộc phải đặt thêm <strong>cốt thép chịu nén A's</strong> để cùng bê tông gánh phần momen thừa:
          </p>

          <FormulaBlock
            number="(4.27)"
            source="T1 tr.73"
            latex="A'_s = \frac{M - \alpha_R \gamma_b R_b b h_0^2}{R_{sc} (h_0 - a')} \quad ; \quad A_s = \frac{\xi_R \gamma_b R_b b h_0 + R_{sc} A'_s}{R_s}"
            description="Công thức xác định diện tích cốt thép nén A's và cốt kéo As trong dầm đặt cốt kép"
          />

          <ConstructionNote title="Quy định cấu tạo đối với cốt nén A's">
            <p>
              Khi trong tính toán có kể đến sự làm việc của cốt nén A's, cốt đai bắt buộc phải bao quanh toàn bộ cốt nén và khoảng cách cốt đai không được vượt quá 15d (với d là đường kính nhỏ nhất của cốt nén) và không quá 400 mm để ngăn ngừa cốt nén bị uốn dọc văng ra ngoài lớp bê tông bảo vệ.
            </p>
          </ConstructionNote>
        </div>
      </section>

      {/* =========================================================================
          MỤC 4.4: TIẾT DIỆN CHỮ I, T + BÀI TẬP
      ========================================================================= */}
      <section id="sec-4-4" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            4.4
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">
            Cấu kiện tiết diện chữ I, T &amp; Bài tập thực hành
          </h2>
        </div>

        <p className="text-text-main text-sm leading-relaxed">
          Trong hệ kết cấu sàn sườn toàn khối, dầm liên kết chặt chẽ với bản sàn tạo thành tiết diện chữ T. Bản sàn đóng vai trò là cánh chịu nén (b'f, h'f) giúp tăng đáng kể khả năng chịu uốn và độ cứng của dầm.
        </p>

        {/* 3D Scene 2: Dầm chữ T */}
        <TBeamScene3D />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBlock
            number="(4.36)"
            source="T1 tr.89"
            latex="M_f = \gamma_b R_b \cdot b'_f \cdot h'_f \left(h_0 - \frac{h'_f}{2}\right)"
            description="Khả năng chịu momen uốn của toàn bộ bản cánh nén dầm chữ T"
          />
          <div className="p-4 bg-surface rounded-xl border border-border text-xs space-y-2">
            <div className="font-semibold text-text-main">Quy tắc phân loại trục trung hòa:</div>
            <ul className="space-y-1.5 text-text-muted">
              <li><strong>Trường hợp 1: M &le; Mf (Trục trung hòa qua cánh):</strong> Chiều cao vùng nén x &le; h'f. Bê tông vùng sườn chịu kéo nứt hoàn toàn, tính toán như tiết diện chữ nhật kích thước b'f x h.</li>
              <li><strong>Trường hợp 2: M &gt; Mf (Trục trung hòa qua sườn):</strong> Chiều cao vùng nén x &gt; h'f. Phân tích thành 2 phần: cánh nhô gánh M_flange và sườn gánh Mw = M - M_flange.</li>
            </ul>
          </div>
        </div>

        {/* Bài tập 4.14 & 4.15 */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-base text-text-main">Bài tập mẫu dầm chữ T (Sách T1 tr.101-104)</h4>

          <ExampleBlock
            number="Bài tập 4.14"
            title="Trục trung hòa qua sườn dầm (M > Mf)"
            source="T1 tr.101"
            problem={
              <p>
                Dầm chữ T có b'f = 800 mm, b = 300 mm, h'f = 100 mm, h = 600 mm, a = 60 mm (h0 = 540 mm). Chịu momen uốn M = 450 kNm. Bê tông B15 (gamma_b = 0.9, Rb = 8.5 MPa), Thép AII (Rs = 280 MPa). Tính cốt thép As.
              </p>
            }
            steps={[
              {
                title: 'Xác định vị trí trục trung hòa',
                content: (
                  <p>
                    Mf = gamma_b * Rb * b'f * h'f * (h0 - 0.5*h'f) = 7.65 * 800 * 100 * (540 - 50) * 1e-6 = 299.9 kNm. Vì M = 450 kNm &gt; Mf = 299.9 kNm =&gt; Trục trung hòa đi qua sườn dầm.
                  </p>
                ),
              },
              {
                title: 'Phân tích momen tác dụng lên phần sườn dầm Mw',
                content: (
                  <p>
                    M_flange = gamma_b * Rb * (b'f - b) * h'f * (h0 - 0.5*h'f) = 7.65 * (800 - 300) * 100 * 490 * 1e-6 = 187.4 kNm. Do đó Mw = M - M_flange = 450 - 187.4 = 262.6 kNm.
                  </p>
                ),
              },
              {
                title: 'Tính hệ số alpha_m cho phần sườn và tính As',
                content: (
                  <p>
                    alpha_m = Mw / (gamma_b * Rb * b * h0^2) = 262.6*1e6 / (7.65 * 300 * 540^2) = 0.392 &lt; alpha_R = 0.449. Suy ra xi = 1 - sqrt(1 - 2*0.392) = 0.536. Diện tích cốt thép: As = (xi * gamma_b * Rb * b * h0 + gamma_b * Rb * (b'f - b) * h'f) / Rs = 3738.5 mm².
                  </p>
                ),
              },
              {
                title: 'Kiểm tra hàm lượng cốt thép và điều chỉnh kích thước',
                content: (
                  <p>
                    mu = As / (b * h0) = 3738.5 / (300 * 540) * 100% = 2.3% &gt; mu_max = 1.86%. Hàm lượng thép quá lớn, cần tăng chiều cao dầm lên h = 700 mm (h0 = 635 mm) như sách đã giải để mu giảm xuống 1.5% &lt; 1.86% đạt yêu cầu.
                  </p>
                ),
              },
            ]}
          />

          <ExampleBlock
            number="Bài tập 4.15"
            title="Trục trung hòa qua cánh dầm (M <= Mf)"
            source="T1 tr.103"
            problem={
              <p>
                Dầm chữ T có b'f = 1100 mm, b = 400 mm, h'f = 100 mm, h = 700 mm, a = 65 mm (h0 = 635 mm). M = 450 kNm, B15 (gamma_b = 0.9), Thép AII (Rs = 280 MPa). Tính cốt thép As.
              </p>
            }
            steps={[
              {
                title: 'Xác định vị trí trục trung hòa',
                content: (
                  <p>
                    Mf = 7.65 * 1100 * 100 * (635 - 50) * 1e-6 = 492.3 kNm. Vì M = 450 kNm &lt; Mf = 492.3 kNm =&gt; Trục trung hòa nằm trong cánh. Tính như dầm chữ nhật rộng 1100 mm.
                  </p>
                ),
              },
              {
                title: 'Tính alpha_m và diện tích cốt thép As',
                content: (
                  <p>
                    alpha_m = 450*1e6 / (7.65 * 1100 * 635^2) = 0.133 &lt; alpha_R = 0.449. xi = 1 - sqrt(1 - 2*0.133) = 0.143. Chiều cao vùng nén x = 0.143 * 635 = 90.8 mm &lt; h'f = 100 mm (đúng giả thiết).
                  </p>
                ),
              },
              {
                title: 'Chọn cốt thép',
                content: (
                  <p>
                    As = (0.143 * 7.65 * 1100 * 635) / 280 = 2725.6 mm². Chọn 4 phi 25 + 4 phi 20 (As = 2777.2 mm²). Bố trí 2 lớp đạt yêu cầu.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* =========================================================================
          MỤC 4.5 & 4.6: TIẾT DIỆN NGHIÊNG THEO LỰC CẮT + BÀI TẬP
      ========================================================================= */}
      <section id="sec-4-5" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            4.5-4.6
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">
            Tính toán trên tiết diện nghiêng theo lực cắt &amp; Bài tập
          </h2>
        </div>

        <p className="text-text-main text-sm leading-relaxed">
          Gần gối tựa, ứng suất tiếp tau lớn kết hợp với ứng suất pháp sigma sinh ra ứng suất kéo chính sigma_max. Khi sigma_max &gt; R_bt, vết nứt xiên xuất hiện. Để dầm không bị gãy theo tiết diện nghiêng, cần tính toán bố trí <strong>cốt đai (stirrups)</strong> và <strong>cốt xiên (bent-up bars)</strong>.
        </p>

        {/* 3D Scene 3: Tiết diện nghiêng và vết nứt */}
        <ShearCrackScene3D />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBlock
            number="(4.56)"
            source="T1 tr.120"
            latex="Q \le 0.3 \cdot \phi_{w1} \cdot \phi_{b1} \cdot \gamma_b R_b \cdot b \cdot h_0"
            description="Điều kiện kiểm tra bê tông không bị ép vỡ theo dải nghiêng giữa các vết nứt xiên"
            compare5574={true}
          />
          <FormulaBlock
            number="(4.59)"
            source="T1 tr.124"
            latex="Q \le Q_b + Q_{sw} + Q_{inc} = \frac{M_b}{c_0} + q_{sw} c_0 + R_{s,inc} A_{inc} \sin\alpha"
            description="Điều kiện cân bằng cường độ chịu cắt trên tiết diện nghiêng nguy hiểm nhất (chiều dài c0)"
          />
        </div>

        <div className="p-4 bg-bg rounded-xl border border-border text-xs space-y-2">
          <div className="font-semibold text-text-main">Các bước tính khoảng cách cốt đai s:</div>
          <ol className="list-decimal list-inside space-y-1 text-text-muted">
            <li>Tính khả năng chịu cắt của bê tông: {'Mb = 2.0 * (1 + phi_f) * gamma_b * Rbt * b * h0^2'}.</li>
            <li>Khoảng cách đai lớn nhất theo tính toán: {'s_max = (1.5 * (1 + phi_f) * gamma_b * Rbt * b * h0^2) / Q'}.</li>
            <li>Khoảng cách đai theo cấu tạo: s_ct = h/3 (với h &gt; 450 mm, tối đa 200 mm trong đoạn l/4 gần gối).</li>
            <li>Tính s theo tiết diện nghiêng bất kỳ c1 trong [h0, 2h0]: {'s = (n * Asw1 * Rsw * c1) / (Q - Mb / c1)'}. Chọn giá trị nhỏ nhất của các điều kiện trên.</li>
          </ol>
        </div>

        {/* Bài tập 4.22 & 4.23 */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-base text-text-main">Bài tập mẫu tính cốt đai &amp; cốt xiên (Sách T1 tr.133-136)</h4>

          <ExampleBlock
            number="Bài tập 4.22"
            title="Tính cốt đai dầm chịu lực cắt Q = 200 kN"
            source="T1 tr.133"
            problem={
              <p>
                Dầm chữ nhật b = 300 mm, h = 600 mm, a = 40 mm (h0 = 560 mm), chịu tải trọng tập trung P = 200 kN (Q = 200 kN). Bê tông B15 (Rb = 8.5 MPa, Rbt = 0.75 MPa, gamma_b = 0.9). Cốt đai 2 nhánh nhóm CI d = 6 mm (Rsw = 175 MPa, Asw = 56.6 mm²). Tính cốt đai.
              </p>
            }
            steps={[
              {
                title: 'Kiểm tra dầm không vỡ bê tông trên dải nghiêng',
                content: (
                  <p>
                    phi_b1 = 1 - 0.01*(7.65) = 0.923. Q_max = 0.3 * phi_w1 * phi_b1 * gamma_b * Rb * b * h0 = 380.6 kN &gt; Q = 200 kN =&gt; Bê tông an toàn không bị vỡ.
                  </p>
                ),
              },
              {
                title: 'Tính momen chống cắt của bê tông Mb và s_max',
                content: (
                  <p>
                    Mb = 2 * 0.9 * 0.75 * 300 * 560^2 * 1e-6 = 127 kNm. s_max = 1.5 * 0.9 * 0.75 * 300 * 560^2 / (200 * 1e3) = 476.3 mm.
                  </p>
                ),
              },
              {
                title: 'Khảo sát bước đai s theo các hình chiếu c1',
                content: (
                  <p>
                    Tại c1 = h0 = 560 mm =&gt; s = 207 mm. Tại c1 = 800 mm =&gt; s = 172 mm. Tại c1 = 1000 mm =&gt; s = 135 mm. Tại c1 = 2*h0 = 1120 mm =&gt; s = 128 mm.
                  </p>
                ),
              },
              {
                title: 'Chọn bước đai thi công',
                content: (
                  <p>
                    Khoảng cách cấu tạo s_ct = h/3 = 200 mm. Bước đai nhỏ nhất tính toán là 128 mm. Để thuận tiện thi công, chọn cốt đai 2 nhánh phi 6 khoảng cách s = 125 mm bố trí trong đoạn 2m đầu dầm gần gối. Giữa nhịp Q = 0 đặt đai cấu tạo s = 250 mm.
                  </p>
                ),
              },
            ]}
          />

          <ExampleBlock
            number="Bài tập 4.23"
            title="Tính cốt xiên khi bước đai lớn hơn yêu cầu"
            source="T1 tr.134"
            problem={
              <p>
                Cũng số liệu như bài 4.22 nhưng bước đai chọn s = 200 mm. Dùng cốt xiên nhóm CII (R_s,inc = 225 MPa). Tính diện tích cốt xiên cần thiết.
              </p>
            }
            steps={[
              {
                title: 'Tính khả năng chịu cắt của cốt đai và bê tông',
                content: (
                  <p>
                    qsw = (2 * 28.3 * 175) / 200 = 49.525 N/mm. Chiều dài hình chiếu nguy hiểm: c = sqrt(Mb / qsw) = sqrt(127*1e6 / 49.525) = 1601 mm &gt; 2*h0 = 1120 mm =&gt; Lấy c0 = 1120 mm. Khả năng chịu cắt: Qub = Mb/c0 + qsw*c0 = 127*1e6/1120 + 49.525*1120 = 168.9 kN.
                  </p>
                ),
              },
              {
                title: 'Tính diện tích cốt xiên A_inc',
                content: (
                  <p>
                    Vì Q = 200 kN &gt; Qub = 168.9 kN nên cần cốt xiên gánh phần lực thừa: Delta_Q = 200 - 168.9 = 31.1 kN. A_inc = Delta_Q / (R_s,inc * sin(45°)) = 31.1*1e3 / (225 * 0.707) = 195 mm².
                  </p>
                ),
              },
              {
                title: 'Chọn thanh cốt xiên',
                content: (
                  <p>
                    Chọn 1 phi 16 uốn xiên 45° (diện tích 201 mm² &gt; 195 mm²) hoặc 2 phi 14 uốn xiên đạt yêu cầu.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* =========================================================================
          MỤC 4.7: BIỂU ĐỒ VẬT LIỆU
      ========================================================================= */}
      <section id="sec-4-7" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            4.7
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">
            Biểu đồ vật liệu &amp; Neo uốn cốt thép
          </h2>
        </div>

        <p className="text-text-main text-sm leading-relaxed">
          Biểu đồ vật liệu là đường biểu diễn <strong>khả năng chịu lực thực tế Mr(x)</strong> của các tiết diện dọc theo chiều dài dầm tương ứng với số lượng thanh cốt thép được bố trí tại từng vị trí.
        </p>

        {/* 3D Scene 4: Biểu đồ vật liệu */}
        <MaterialEnvelopeScene3D />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-serif font-semibold text-sm text-text-main">Mục đích xây dựng biểu đồ vật liệu</h4>
            <ul className="text-text-muted space-y-1.5 list-disc list-inside">
              <li>Kiểm tra xem cốt thép đã bố trí có đảm bảo an toàn tại mọi tiết diện không (Mr(x) &ge; M(x)).</li>
              <li>Xác định chính xác vị trí cắt bớt hoặc uốn chuyển tầng cốt thép để tiết kiệm vật liệu nhưng vẫn tuyệt đối an toàn.</li>
              <li>Tránh lãng phí việc kéo tất cả các thanh thép chạy suốt chiều dài dầm khi momen giảm dần về phía gối tựa.</li>
            </ul>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-serif font-semibold text-sm text-text-main">Quy tắc kéo dài đoạn neo w (T1 tr.155)</h4>
            <ul className="text-text-muted space-y-1.5 list-disc list-inside">
              <li>Điểm cắt lý thuyết là giao điểm giữa đường cong momen M(x) và bậc thang khả năng chịu lực Mr.</li>
              <li>Thực tế, cốt thép <strong>không được cắt ngay tại điểm cắt lý thuyết</strong> mà phải kéo dài thêm một đoạn w:
                <div className="font-mono text-primary font-bold my-1">{'w >= 20d'} và {'w >= 0.5*h0'}</div>
              </li>
              <li>Nếu tại tiết diện cắt có lực cắt Q &gt; Qb, đoạn kéo dài w phải tăng lên để đảm bảo neo chắc chắn trước khi xuất hiện vết nứt xiên.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BỘ CÔNG CỤ TÍNH TOÁN TƯƠNG TÁC
      ========================================================================= */}
      <section id="sec-calculator" className="pt-6 border-t border-border">
        <BeamCalculatorWidget />
      </section>

      {/* =========================================================================
          CÁC LỖI THƯỜNG GẶP
      ========================================================================= */}
      <section className="pt-6 border-t border-border">
        <CommonMistakes
          title="Lỗi thường gặp khi tính toán cấu kiện chịu uốn (Chương 4)"
          mistakes={[
            {
              mistake: 'Quên kiểm tra điều kiện dẻo xi <= xi_R (hoặc alpha_m <= alpha_R)',
              consequence: 'Dầm có nguy cơ rơi vào trạng thái phá hoại giòn đột ngột, bê tông nén vỡ nát trước khi cốt kéo kịp chảy.',
              correction: 'Luôn tính alpha_m trước. Nếu alpha_m > alpha_R, phải tăng kích thước dầm b x h hoặc chuyển sang bài toán dầm đặt cốt kép.',
              bookRef: 'T1 tr.65',
            },
            {
              mistake: 'Nhầm lẫn bề rộng dầm chữ T khi trục trung hòa qua sườn',
              consequence: 'Tính thừa khả năng chịu uốn và thiếu cốt thép chịu kéo nguy hiểm.',
              correction: 'Khi M > Mf, phần cánh nhô gánh M_flange = gamma_b * Rb * (b\'f - b) * h\'f * (h0 - 0.5*h\'f). Phần còn lại Mw = M - M_flange do sườn gánh với bề rộng tính toán là b (không phải b\'f).',
              bookRef: 'T1 tr.89',
            },
            {
              mistake: 'Cắt thanh cốt thép ngay tại vị trí cắt lý thuyết',
              consequence: 'Dầm bị nứt toác và tuột neo khi chịu tải trọng chu kỳ hoặc lệch tâm.',
              correction: 'Bắt buộc kéo dài thêm đoạn neo an toàn w >= 20d (với phi 25 là kéo dài ít nhất 500 mm) qua khỏi tiết diện cắt lý thuyết.',
              bookRef: 'T1 tr.155',
            },
            {
              mistake: 'Quên kiểm tra vỡ bê tông trên dải nghiêng Q <= Q_max',
              consequence: 'Dầm bị nén nát bê tông trên dải nghiêng dù đã bố trí rất nhiều cốt đai.',
              correction: 'Luôn kiểm tra điều kiện Q <= 0.3 * phi_w1 * phi_b1 * gamma_b * Rb * b * h0 trước tiên. Nếu không thỏa, phải tăng tiết diện hoặc tăng cấp độ bền bê tông.',
              bookRef: 'T1 tr.120',
            },
          ]}
        />
      </section>

      {/* =========================================================================
          FLASHCARDS ÔN TẬP
      ========================================================================= */}
      <section className="pt-6 border-t border-border">
        <FlashcardDeck
          title="Flashcards ôn tập nhanh Chương 4"
          cards={[
            {
              front: 'Ý nghĩa của hệ số xi_R trong tính toán cấu kiện chịu uốn là gì?',
              back: 'xi_R là chiều cao giới hạn tương đối của vùng bê tông nén. Phân chia ranh giới giữa phá hoại dẻo (xi <= xi_R, cốt thép chảy trước, an toàn) và phá hoại giòn (xi > xi_R, bê tông nén vỡ đột ngột, nguy hiểm).',
              category: 'LÝ THUYẾT',
            },
            {
              front: 'Công thức tính chiều cao vùng nén x cho dầm chữ nhật cốt đơn?',
              back: 'x = (Rs * As) / (gamma_b * Rb * b), hoặc x = xi * h0 với xi = 1 - sqrt(1 - 2*alpha_m).',
              category: 'CÔNG THỨC',
            },
            {
              front: 'Khi nào cần thiết kế dầm đặt cốt kép A\'s?',
              back: 'Khi kích thước dầm b x h bị khống chế kiến trúc dẫn đến alpha_m > alpha_R, hoặc khi cấu kiện chịu tải trọng đổi dấu (gió, động đất), hoặc để hạn chế biến dạng võng dài hạn.',
              category: 'THIẾT KẾ',
            },
            {
              front: 'Dấu hiệu phân biệt trục trung hòa qua cánh hay qua sườn dầm chữ T?',
              back: 'So sánh momen tính toán M với khả năng chịu lực của cánh Mf = gamma_b * Rb * b\'f * h\'f * (h0 - 0.5*h\'f). Nếu M <= Mf: qua cánh; nếu M > Mf: qua sườn.',
              category: 'DẦM CHỮ T',
            },
            {
              front: 'Tại sao lại có vết nứt nghiêng 45 độ gần gối tựa dầm?',
              back: 'Vì gần gối tựa lực cắt Q đạt cực đại, sinh ra ứng suất tiếp tau lớn. Kết hợp ứng suất pháp tạo ra ứng suất kéo chính sigma_max xiên góc xấp xỉ 45 độ vượt quá cường độ kéo Rbt của bê tông.',
              category: 'TIẾT DIỆN NGHIÊNG',
            },
            {
              front: 'Đoạn kéo dài neo w trong biểu đồ vật liệu có giá trị tối thiểu bao nhiêu?',
              back: 'w >= 20d (với d là đường kính thanh cắt) và w >= 0.5*h0. Đảm bảo thanh cốt thép neo đủ chắc chắn trong vùng bê tông chịu kéo.',
              category: 'CẤU TẠO',
            },
            {
              front: 'Bước cốt đai theo cấu tạo s_ct gần gối tựa quy định như thế nào khi h > 450 mm?',
              back: 's_ct <= h/3 và s_ct <= 200 mm trong phạm vi đoạn 1/4 nhịp dầm gần gối tựa (vùng có lực cắt lớn).',
              category: 'CỐT ĐAI',
            },
            {
              front: 'Đặc trưng vùng nén omega của bê tông nặng theo TCXDVN 356:2005 tính bằng công thức nào?',
              back: 'omega = 0.85 - 0.008 * (gamma_b * Rb) với Rb tính bằng MPa.',
              category: 'VẬT LIỆU',
            },
          ]}
        />
      </section>

      {/* =========================================================================
          TRẮC NGHIỆM KIỂM TRA KIẾN THỨC (QUIZ)
      ========================================================================= */}
      <section id="sec-quiz" className="pt-6 border-t border-border">
        <QuizBlock
          title="Trắc nghiệm củng cố Chương 4: Cấu kiện chịu uốn"
          questions={[
            {
              question: 'Điều kiện nào sau đây đảm bảo cấu kiện chịu uốn tiết diện chữ nhật phá hoại dẻo?',
              options: [
                'xi <= xi_R (hoặc alpha_m <= alpha_R)',
                'xi > xi_R (hoặc alpha_m > alpha_R)',
                'x = h0',
                'mu < mu_min',
              ],
              correctIndex: 0,
              explanation: 'Khi xi <= xi_R, cốt kéo đạt giới hạn chảy trước khi bê tông vùng nén bị ép vỡ, tạo ra phá hoại dẻo cảnh báo trước.',
            },
            {
              question: 'Khi tính toán dầm chữ T có M <= Mf, tiết diện được tính toán tương đương với dầm chữ nhật có kích thước nào?',
              options: [
                'b x h (bề rộng sườn)',
                'b\'f x h (bề rộng cánh)',
                '(b\'f - b) x h',
                'b\'f x h\'f',
              ],
              correctIndex: 1,
              explanation: 'Toàn bộ vùng nén nằm trọn trong cánh, phần sườn chịu kéo nứt bỏ qua, nên tính như dầm chữ nhật rộng b\'f và cao h.',
            },
            {
              question: 'Khoảng cách lớn nhất giữa các cốt đai s_max trong dầm chịu uốn theo TCXDVN 356:2005 là:',
              options: [
                's_max = (1.5 * gamma_b * Rbt * b * h0^2) / Q',
                's_max = h / 2',
                's_max = 200 mm',
                's_max = (2.0 * gamma_b * Rb * b * h0) / Q',
              ],
              correctIndex: 0,
              explanation: 'Theo CT 4.63 (T1 tr.124), s_max = (1.5 * (1 + phi_f) * gamma_b * Rbt * b * h0^2) / Q.',
            },
            {
              question: 'Tác dụng chủ yếu của cốt thép chịu nén A\'s trong dầm chữ nhật đặt cốt kép là gì?',
              options: [
                'Giảm lượng xi măng khi đổ bê tông',
                'Cùng bê tông gánh phần momen vượt quá khả năng chịu nén của bê tông đơn',
                'Tăng khả năng chống cháy cho dầm',
                'Làm đẹp cốt pha khi tháo dỡ',
              ],
              correctIndex: 1,
              explanation: 'Khi alpha_m > alpha_R, bê tông vùng nén không chịu nổi phần momen thừa. Đặt cốt nén A\'s để gánh phần momen dôi dư M2.',
            },
            {
              question: 'Đoạn kéo dài neo w từ tiết diện cắt lý thuyết đến tiết diện cắt thực tế của cốt thép dọc phải thỏa mãn:',
              options: [
                'w >= 5d',
                'w >= 10d',
                'w >= 20d và w >= 0.5*h0',
                'w = 0 (cắt ngay tại điểm cắt lý thuyết)',
              ],
              correctIndex: 2,
              explanation: 'Theo quy định cấu tạo (T1 tr.155), cốt thép phải kéo dài thêm tối thiểu 20d và không nhỏ hơn 0.5*h0.',
            },
            {
              question: 'Khi tính toán dầm theo trạng thái giới hạn thứ nhất, sự tham gia chịu lực của bê tông vùng kéo được quy ước như thế nào?',
              options: [
                'Chịu toàn bộ lực kéo',
                'Bỏ qua hoàn toàn, giả thiết bê tông vùng kéo đã nứt',
                'Kể đến 50% cường độ Rbt',
                'Kể đến nếu dầm có lớp sơn chống nứt',
              ],
              correctIndex: 1,
              explanation: 'Giả thiết số 2 trong phương pháp nội lực giới hạn: Bỏ qua hoàn toàn sự làm việc của bê tông vùng kéo sau khi nứt.',
            },
            {
              question: 'Trong dầm chịu uốn, vết nứt xiên trên tiết diện nghiêng hình thành chủ yếu do:',
              options: [
                'Ứng suất nén cục bộ',
                'Ứng suất kéo chính sigma_max vượt quá cường độ chịu kéo Rbt của bê tông',
                'Bê tông bị khô nhanh do thời tiết',
                'Cốt đai bị gỉ sét bên trong',
              ],
              correctIndex: 1,
              explanation: 'Sự kết hợp giữa ứng suất tiếp tau và ứng suất uốn sinh ra ứng suất kéo chính sigma_max vượt qua Rbt gây nứt xiên.',
            },
            {
              question: 'Hàm lượng cốt thép tối thiểu mu_min cho dầm bê tông cốt thép thông thường là:',
              options: [
                '0.05%',
                '0.5%',
                '1.5%',
                '3.0%',
              ],
              correctIndex: 0,
              explanation: 'Theo TCXDVN 356:2005 mục 4.3, hàm lượng cốt thép dọc tối thiểu của cấu kiện chịu uốn là mu_min = 0.05%.',
            },
          ]}
        />
      </section>

      {/* Điều hướng chân trang chương */}
      <ChapterPagination currentPath="/tap-1/chuong-4" />
    </div>
  );
};
