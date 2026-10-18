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

export const Tap2Chuong1Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 2: Cấu kiện nhà cửa</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 1: Sàn bê tông cốt thép</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 1: Các Loại Sàn Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán và cấu tạo sàn bản kê bốn cạnh (bản hai phương), sàn có hệ dầm trực giao, sàn ô cờ, sàn gạch bọng, sàn nấm (không dầm) và sàn panen lắp ghép theo TCXDVN 356:2005.
        </p>
      </div>

      <StandardBanner volume="tap2" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-1-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.1 Khái niệm</a>
        <a href="#sec-1-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.2 Bản dầm</a>
        <a href="#sec-1-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.3 Sàn sườn</a>
        <a href="#sec-1-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.4 Bản kê 4 cạnh</a>
        <a href="#sec-1-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.5 Dầm dọc trục B</a>
        <a href="#sec-1-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.6 Dầm trực giao</a>
        <a href="#sec-1-7" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.7 Sàn ô cờ</a>
        <a href="#sec-1-8" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.8 Sàn gạch bọng</a>
        <a href="#sec-1-9" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.9 Sàn nấm</a>
        <a href="#sec-1-10" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">1.10 Sàn panen</a>
      </div>

      {/* 1.1 KHÁI NIỆM & 1.2 BẢN DẦM & 1.3 SÀN SƯỜN */}
      <section id="sec-1-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm &amp; Phân loại kết cấu sàn</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Sàn bê tông cốt thép là kết cấu mặt phẳng nằm ngang vừa chịu tải trọng thẳng đứng (trọng lượng người, thiết bị, tường ngăn) truyền về cột vách, vừa đóng vai trò như một màng cứng ngang (diaphragm) phân phối tải trọng gió và động đất cho toàn bộ hệ kết cấu chịu lực của tòa nhà (T2 tr.7).
        </p>

        {/* 3D VIEWER: FLAT SLAB / TWO-WAY SLAB */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Ô Bản Sàn Kê Bốn Cạnh</h3>
              <p className="text-xs text-text-sub">Quan sát sự phân bố mômen hai phương Mx và My trên mặt sàn</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
          </div>
          <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[3, 2, 3]}>
              {({ isXray, wireframe }) => (
                <RCSlab lxMm={4000} lyMm={5000} hMm={120} isXray={isXray} wireframe={wireframe} />
              )}
            </ViewerCanvas>
          </div>
        </div>
      </section>

      {/* 1.4 BẢN KÊ BỐN CẠNH (BẢN HAI PHƯƠNG) */}
      <section id="sec-1-4" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Sàn bản kê bốn cạnh (L2 / L1 &lt; 2)</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khi tỷ số cạnh dài trên cạnh ngắn <InlineMath math="L_2 / L_1 < 2" />, bản uốn cong theo cả hai phương. Tính toán nội lực theo hai phương pháp chủ yếu (T2 tr.22):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <h4 className="font-bold text-sm text-primary">1. Phương pháp tra bảng đàn hồi (P.M. Marcus)</h4>
            <p className="text-xs text-text-sub">
              Dựa trên lý thuyết bản mỏng đàn hồi Kirchhoff. Tùy thuộc điều kiện liên kết của 4 cạnh biên (ngàm hay khớp), tra bảng các hệ số k1, k2:
            </p>
            <FormulaBlock
              number="(2.1)"
              source="T2 tr.25"
              latex={'M_1 = k_1 \\cdot q \\cdot L_1^2 \\quad ; \\quad M_2 = k_2 \\cdot q \\cdot L_1^2'}
              description="M1 là mômen theo phương cạnh ngắn L1; M2 là mômen theo phương cạnh dài L2 (M1 luôn lớn hơn M2)."
            />
          </div>

          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <h4 className="font-bold text-sm text-accent">2. Phương pháp đường khớp dẻo (Yield-Line Theory)</h4>
            <p className="text-xs text-text-sub">
              Xác định sơ đồ phá hoại nứt dẻo (dạng hình phong bì hoặc hình chóp), tính công ngoại lực bằng công biến dạng nội lực để tìm mômen giới hạn:
            </p>
            <FormulaBlock
              number="(2.2)"
              source="T2 tr.35"
              latex={'\\sum P_i \\delta_i = \\sum m_i \\theta_i L_i'}
              description="Cho phép thiết kế tiết kiệm cốt thép và tận dụng tối đa khả năng biến dạng dẻo của bê tông cốt thép."
            />
          </div>
        </div>
      </section>

      {/* 1.5, 1.6, 1.7 SÀN TRỰC GIAO & SÀN Ô CỜ */}
      <section id="sec-1-6" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.6</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Sàn có hệ dầm trực giao &amp; Sàn ô cờ</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Áp dụng cho các phòng có nhịp lớn (8 - 15m) như hội trường, phòng triển lãm, sảnh lớn. Hệ dầm gồm hai hệ dầm trực giao giao nhau có cùng chiều cao hoặc dầm phụ đan chéo chia mặt sàn thành các ô vuông nhỏ 1.5 - 2.5m (T2 tr.55):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-primary">Sàn dầm trực giao đối xứng</h4>
            <p className="text-text-sub">
              Khi mặt bằng hình vuông, hai hệ dầm có độ cứng uốn bằng nhau, tải trọng chia đều 50% cho mỗi phương. Chiều cao dầm chọn <InlineMath math="h_d \\approx (1/20 \\div 1/25) L" />.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-accent">Sàn ô cờ (Waffle Slab)</h4>
            <p className="text-text-sub">
              Hệ sườn dày đặc tạo bởi các khối hộp rỗng (copha nhựa hoặc khối xốp EPS). Vừa giảm tải trọng bản thân vừa tạo hiệu quả thẩm mỹ kiến trúc không cần đóng trần thạch cao.
            </p>
          </div>
        </div>
      </section>

      {/* 1.8 SÀN GẠCH BỌNG & 1.9 SÀN NẤM */}
      <section id="sec-1-9" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.9</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Sàn nấm (Sàn không dầm có mũ cột)</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Sàn nấm tựa trực tiếp lên cột mà không có dầm đỡ. Tại đỉnh cột có phần mở rộng hình nón hoặc hình chóp cụt gọi là <strong>mũ cột (Capital)</strong> và bản tăng dày gọi là <strong>tấm đỉnh cột (Drop panel)</strong> (T2 tr.82):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-sm text-text-main">Ưu điểm nổi bật:</h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-text-sub">
              <li>Chiều cao thông thủy tầng tăng lên, tiết kiệm chiều cao xây dựng (giảm 0.3 - 0.5m mỗi tầng).</li>
              <li>Mặt trần phẳng thuận lợi bố trí đường ống cơ điện (MEP) và phòng cháy chữa cháy.</li>
              <li>Thi công ván khuôn cốp pha nhanh, phẳng, dễ đổ bê tông.</li>
            </ul>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-sm text-rose-700">Nguy cơ chọc thủng (Punching Shear):</h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Nguy cơ phá hoại nguy hiểm nhất là cột chọc thủng xuyên qua bản sàn dọc theo tháp đâm thủng nghiêng góc 45°. Bắt buộc phải kiểm tra điều kiện chống đâm thủng:
            </p>
            <FormulaBlock
              number="(2.3)"
              source="T2 tr.95"
              latex={'P_{ct} \\le 0.75 R_{bt} b_{tb} h_0'}
              description="P_ct: lực chọc thủng tính toán; b_tb: chu vi trung bình của tiết diện tháp đâm thủng; h0: chiều cao làm việc của bản sàn."
              compare5574={true}
            />
          </div>
        </div>

        {/* PHÂN CHIA DẢI TRÊN CỘT VÀ DẢI GIỮA NHỊP */}
        <div className="p-5 bg-surface rounded-xl border border-border space-y-3 text-xs text-text-sub">
          <h4 className="font-semibold text-text-main text-sm">Phân bố mômen trong sàn nấm (Phương pháp dải bản tương đương):</h4>
          <p>
            Mỗi ô sàn được chia thành <strong>Dải trên cột (Column strip)</strong> rộng L/2 và <strong>Dải giữa nhịp (Middle strip)</strong> rộng L/2:
          </p>
          <div className="grid grid-cols-2 gap-3 text-center font-mono">
            <div className="p-3 bg-bg rounded-lg border border-border">
              <span className="font-bold text-primary">Mômen âm tại gối đỉnh cột:</span>
              <p className="mt-1">Dải trên cột gánh 75% | Dải giữa nhịp gánh 25%</p>
            </div>
            <div className="p-3 bg-bg rounded-lg border border-border">
              <span className="font-bold text-accent">Mômen dương ở giữa nhịp:</span>
              <p className="mt-1">Dải trên cột gánh 55% | Dải giữa nhịp gánh 45%</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1.10 SÀN PANEN LẮP GHÉP */}
      <section id="sec-1-10" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">1.10</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Sàn panen lắp ghép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Tấm panen hộp rỗng đúc sẵn trong nhà máy được vận chuyển đến công trường cẩu lắp lên các gối tường và dầm. Các khe tiếp giáp giữa các tấm panen được chèn vữa xi măng mác cao tạo sự cộng tác chịu lực chung cho toàn bộ mặt sàn (T2 tr.120).
        </p>
      </section>

      {/* COMMON MISTAKES & FLASHCARDS */}
      <CommonMistakes
        mistakes={[
          {
            mistake: 'Quên kiểm tra chọc thủng quanh mũ cột sàn không dầm.',
            consequence: 'Bản sàn bị cột chọc thủng đột ngột gây sụp đổ dây chuyền (pancake collapse).',
            correction: 'Bắt buộc kiểm tra theo công thức P_ct <= 0.75 Rbt b_tb h0, nếu thiếu phải tăng chiều dày mũ cột hoặc đặt cốt thép chống chọc thủng (stud rail, cốt đai neo chéo).',
            bookRef: 'T2 tr.95'
          },
          {
            mistake: 'Áp dụng tỷ số chia mômen của bản loại dầm cho bản kê bốn cạnh.',
            consequence: 'Bố trí sai hướng chịu lực khiến bản nứt chéo từ 4 góc về tâm ô bản.',
            correction: 'Bản kê bốn cạnh (L2/L1 < 2) phải tính mômen và đặt thép chịu lực cả hai phương cạnh L1 và L2.',
            bookRef: 'T2 tr.24'
          }
        ]}
      />

      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 1 - Tập 2"
        cards={[
          { front: 'Khi nào ô bản làm việc như bản kê bốn cạnh (hai phương)?', back: 'Khi tỷ số cạnh dài trên cạnh ngắn L2 / L1 < 2. Bản uốn cong theo cả hai phương.' },
          { front: 'Phương pháp nào phân tích mômen sàn nấm hiệu quả nhất?', back: 'Phương pháp khung tương đương (Equivalent Frame Method) chia thành dải trên cột và dải giữa nhịp.' },
          { front: 'Nguy cơ phá hoại lớn nhất của sàn nấm không dầm là gì?', back: 'Phá hoại chọc thủng (Punching Shear) do tập trung ứng suất cắt cực lớn quanh chu vi cột.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 1 - Tập 2"
        questions={[
          {
            question: 'Trong sàn nấm không dầm, dải trên cột chịu bao nhiêu phần trăm mômen âm tại gối?',
            options: ['25%', '50%', 'Khoảng 75%', '100%'],
            correctIndex: 2,
            explanation: 'Độ cứng tập trung tại vùng cột rất lớn, nên dải trên cột gánh khoảng 70 - 75% tổng mômen âm tại gối.'
          },
          {
            question: 'Biện pháp nào sau đây giúp chống chọc thủng hiệu quả nhất cho sàn phẳng?',
            options: ['Tăng lớp vữa trát', 'Bố trí mũ cột, tấm đỉnh cột (drop panel) hoặc cốt thép chống chọc thủng', 'Dùng thép trơn', 'Giảm chiều dày sàn'],
            correctIndex: 1,
            explanation: 'Mũ cột và drop panel làm tăng chu vi tính toán b_tb và tăng chiều cao làm việc h0, giúp tăng khả năng chống đâm thủng vượt bậc.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-2/chuong-1" />
    </div>
  );
};
