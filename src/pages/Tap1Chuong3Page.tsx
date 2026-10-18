import { InlineMath } from '../components/InlineMath';
import React from 'react';
import { Link } from 'react-router-dom';
import { StandardBanner } from '../components/StandardBanner';
import { FormulaBlock } from '../components/FormulaBlock';
import { ConstructionNote } from '../components/ConstructionNote';
import { CommonMistakes } from '../components/CommonMistakes';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { QuizBlock } from '../components/QuizBlock';
import { ChapterPagination } from '../components/ChapterPagination';
import { ViewerCanvas } from '../three/common/ViewerCanvas';
import { RCBeam } from '../three/elements/RCBeam';
import { StressBlock } from '../three/overlays/StressBlock';
import { StrainProfile } from '../three/overlays/StrainProfile';

export const Tap1Chuong3Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER & BREADCRUMBS */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 3: Nguyên lý tính toán và cấu tạo</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 3: Nguyên Lý Tính Toán &amp; Cấu Tạo Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Ba giai đoạn làm việc ứng suất - biến dạng của dầm chịu uốn, phương pháp tính toán theo trạng thái giới hạn (TTGH1 &amp; TTGH2), và các quy tắc cấu tạo cốt thép nền tảng.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* QUICK JUMP TABS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-3-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.1 Khái niệm</a>
        <a href="#sec-3-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.2 Ba giai đoạn ứng suất</a>
        <a href="#sec-3-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.3 Phương pháp tính toán</a>
        <a href="#sec-3-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.4 Tải trọng &amp; Tổ hợp</a>
        <a href="#sec-3-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.5 Nguyên tắc cấu tạo</a>
      </div>

      {/* 3.1 KHÁI NIỆM */}
      <section id="sec-3-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm về tính toán kết cấu</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Mục tiêu của thiết kế kết cấu bê tông cốt thép là bảo đảm công trình làm việc an toàn, bền vững dưới mọi tác động bất lợi nhất trong suốt niên hạn sử dụng (50 - 100 năm), đồng thời thỏa mãn yêu cầu công năng và tiết kiệm kinh tế tối đa (T1 tr.49).
        </p>
      </section>

      {/* 3.2 BA GIAI ĐOẠN LÀM VIỆC CỦA DẦM CHỊU UỐN */}
      <section id="sec-3-2" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Các giai đoạn trạng thái ứng suất – biến dạng của dầm chịu uốn</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Khi tăng dần tải trọng từ 0 đến khi dầm gãy hoàn toàn, tiết diện dầm trải qua ba giai đoạn làm việc đặc trưng (T1 tr.50 - 53):
        </p>

        {/* 3D VIEWER: BEAM STRESS & CRACK STAGES */}
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-text-main text-base">Mô hình 3D: Dầm và Sự Phân Bố Ứng Suất</h3>
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-mono font-semibold">Tương tác xoay 360°</span>
          </div>
          <div className="h-80 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[2, 1.2, 2.5]}>
              {({ isXray, wireframe }) => (
                <group>
                  <RCBeam lengthMm={2400} bMm={200} hMm={350} isXray={isXray} wireframe={wireframe} />
                  <StressBlock bMm={200} xMm={90} lengthMm={1200} position={[0, 0.08, 0]} />
                  <StrainProfile hMm={350} xMm={90} position={[0.6, 0, 0]} />
                </group>
              )}
            </ViewerCanvas>
          </div>
          <p className="text-xs text-text-sub italic text-center">
            Mặt cắt minh họa khối ứng suất nén bê tông hình chữ nhật tương đương và biểu đồ biến dạng thẳng góc theo giả thiết tiết diện phẳng Bernoulli.
          </p>
        </div>

        {/* CHI TIẾT 3 GIAI ĐOẠN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-primary">Giai đoạn I (Chưa nứt)</h4>
              <span className="text-xs font-mono bg-bg px-2 py-0.5 rounded border border-border">M &lt; Mcrc</span>
            </div>
            <p className="text-xs text-text-sub leading-relaxed">
              Tải trọng nhỏ. Bê tông vùng kéo chưa bị nứt và cùng chịu lực với cốt thép. Ứng suất phân bố tuyến tính dạng tam giác. Cuối GĐ I (GĐ Ia), ứng suất kéo ở thớ biên đạt cường độ chịu kéo Rbt.
            </p>
            <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 p-1.5 rounded">
              👉 Cơ sở để tính toán khả năng chống nứt (TTGH 2).
            </div>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-amber-600">Giai đoạn II (Có nứt)</h4>
              <span className="text-xs font-mono bg-bg px-2 py-0.5 rounded border border-border">Mcrc &le; M &lt; Mu</span>
            </div>
            <p className="text-xs text-text-sub leading-relaxed">
              Vết nứt xuất hiện ở vùng kéo. Toàn bộ lực kéo do cốt thép gánh chịu qua vết nứt. Bê tông vùng nén bắt đầu phát triển biến dạng dẻo (đường cong). Dầm làm việc bình thường trong giai đoạn này.
            </p>
            <div className="text-[11px] font-semibold text-amber-600 bg-amber-500/10 p-1.5 rounded">
              👉 Cơ sở để tính toán độ mở rộng khe nứt và độ võng (TTGH 2).
            </div>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-rose-600">Giai đoạn III (Phá hoại)</h4>
              <span className="text-xs font-mono bg-bg px-2 py-0.5 rounded border border-border">M = Mu</span>
            </div>
            <p className="text-xs text-text-sub leading-relaxed">
              Trạng thái giới hạn cường độ. Với dầm đặt lượng cốt thép hợp lý (tiết diện đặt thép vừa phải), cốt thép kéo chảy dẻo trước, khe nứt mở rộng lớn đẩy trục trung hòa lên cao, cuối cùng bê tông vùng nén bị vỡ nát.
            </p>
            <div className="text-[11px] font-semibold text-rose-600 bg-rose-500/10 p-1.5 rounded">
              👉 Cơ sở để tính toán cường độ tiết diện (TTGH 1).
            </div>
          </div>
        </div>
      </section>

      {/* 3.3 CÁC PHƯƠNG PHÁP TÍNH TOÁN */}
      <section id="sec-3-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Các phương pháp tính toán (TTGH1 &amp; TTGH2)</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Hiện nay toàn bộ tiêu chuẩn hiện đại (TCXDVN 356:2005 và TCVN 5574:2018) đều áp dụng phương pháp thiết kế theo Trạng thái giới hạn (Limit State Design):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <h4 className="font-serif font-bold text-primary">1. Trạng thái giới hạn thứ nhất (TTGH I) - Về độ bền</h4>
            <p className="text-xs text-text-sub">
              Bảo đảm kết cấu không bị phá hoại giòn, mất ổn định hình học hoặc suy sụp dưới tác dụng của tải trọng tính toán lớn nhất.
            </p>
            <FormulaBlock
              number="(3.1)"
              source="T1 tr.55"
              latex={'S \\le R \\quad \\Longleftrightarrow \\quad M \\le M_u \\,;\\quad Q \\le Q_u \\,;\\quad N \\le N_u'}
              description="Nội lực do tải trọng tính toán sinh ra (S) phải nhỏ hơn hoặc bằng khả năng chịu lực giới hạn của tiết diện (R)."
            />
          </div>

          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <h4 className="font-serif font-bold text-accent">2. Trạng thái giới hạn thứ hai (TTGH II) - Về sử dụng bình thường</h4>
            <p className="text-xs text-text-sub">
              Bảo đảm kết cấu không bị nứt quá mức hoặc võng quá lớn dưới tải trọng tiêu chuẩn làm ảnh hưởng đến thẩm mỹ và độ bền lâu.
            </p>
            <FormulaBlock
              number="(3.2)"
              source="T1 tr.56"
              latex={'a_{crc} \\le [a_{crc}] \\quad ; \\quad f \\le [f] = \\frac{L}{250}'}
              description="Bề rộng khe nứt a_crc và độ võng f không vượt quá giới hạn cho phép."
            />
          </div>
        </div>
      </section>

      {/* 3.4 TẢI TRỌNG & TỔ HỢP TẢI TRỌNG */}
      <section id="sec-3-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tải trọng tiêu chuẩn và Tải trọng tính toán</h2>
        </div>
        <FormulaBlock
          number="(3.3)"
          source="T1 tr.57"
          latex={'P = \\gamma_f \\cdot P_c'}
          description="Tải trọng tính toán P bằng tải trọng tiêu chuẩn Pc nhân hệ số độ tin cậy về tải trọng gamma_f (thường 1.05 - 1.3)."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border">
            <h5 className="font-semibold text-text-main mb-1">Tải trọng thường xuyên (Tĩnh tải g):</h5>
            <p>Trọng lượng bản thân kết cấu bê tông cốt thép (<InlineMath math="\\gamma = 25\\text{ kN/m}^3" />), các lớp gạch lát, trát vữa, tường gạch ngăn chia.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border">
            <h5 className="font-semibold text-text-main mb-1">Tải trọng tạm thời (Hoạt tải p):</h5>
            <p>Người, đồ đạc nội thất, xe cộ, tải trọng gió, cầu trục trong nhà xưởng (tra theo TCVN 2737).</p>
          </div>
        </div>
      </section>

      {/* 3.5 NGUYÊN TẮC CẤU TẠO */}
      <section id="sec-3-5" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Nguyên lý cấu tạo cốt thép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Cấu tạo hợp lý bảo đảm cốt thép phát huy hết khả năng chịu lực, bê tông được đầm chặt kín khít không sinh rỗ bọt khí:
        </p>

        <ConstructionNote title="Yêu cầu cấu tạo cốt thép (T1 tr.59 - 61)">
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li><strong>Khoảng hở thông thủy giữa các thanh thép t:</strong> Dưới đáy dầm t &ge; d và t &ge; 25mm; Phía trên dầm t &ge; d và t &ge; 30mm; Bản sàn t &ge; 50mm.</li>
            <li><strong>Chiều dài đoạn neo cốt thép Lan:</strong> Thanh thép chịu kéo phải được neo vào bê tông một đoạn tối thiểu <InlineMath math="L_{an} \\ge 25d \\div 40d" /> để tránh bị tuột dính.</li>
            <li><strong>Đoạn nối buộc cốt thép Llap:</strong> Thanh nối phải chồng lên nhau tối thiểu <InlineMath math="L_{lap} \\ge 30d \\div 45d" /> và buộc chặt bằng dây kẽm mềm.</li>
          </ul>
        </ConstructionNote>

        <CommonMistakes
          mistakes={[
            {
              mistake: 'Bố trí cốt thép quá dày đặc (khoảng hở t < 20mm).',
              consequence: 'Đá dăm bê tông không lọt qua được gây rỗ tổ ong đáy dầm và mất liên kết bám dính.',
              correction: 'Tăng khoảng cách thanh thép bằng cách ghép thanh thép theo cặp hoặc tăng đường kính thép d.',
              bookRef: 'T1 tr.60'
            },
            {
              mistake: 'Dùng tải trọng tính toán để kiểm tra độ võng và bề rộng khe nứt.',
              consequence: 'Độ võng và vết nứt tính toán bị khuyếch đại lớn giả tạo, gây lãng phí vật liệu nghiêm trọng.',
              correction: 'TTGH II luôn dùng tải trọng tiêu chuẩn (gamma_f = 1.0).',
              bookRef: 'T1 tr.56'
            }
          ]}
        />
      </section>

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 3"
        cards={[
          { front: 'Cơ sở tính toán TTGH 1 (về độ bền) dựa trên giai đoạn nào?', back: 'Giai đoạn III - Trạng thái phá hoại của tiết diện.' },
          { front: 'Cơ sở tính toán TTGH 2 (về nứt và võng) dựa trên giai đoạn nào?', back: 'Giai đoạn Ia (chống nứt) và Giai đoạn II (bề rộng khe nứt và biến dạng dầm).' },
          { front: 'Hệ số độ tin cậy tải trọng gamma_f dùng để làm gì?', back: 'Quy đổi từ tải trọng tiêu chuẩn sang tải trọng tính toán nhằm xét đến sai số bất lợi của tải trọng thực tế.' },
          { front: 'Khoảng hở tối thiểu giữa các thanh cốt thép dưới đáy dầm là bao nhiêu?', back: 't >= d và t >= 25 mm để cốt liệu đá dăm lọt qua được khi đầm bê tông.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 3"
        questions={[
          {
            question: 'Khi tính toán khả năng chịu lực trên tiết diện thẳng góc theo TTGH I, ta giả thiết dầm làm việc ở giai đoạn nào?',
            options: ['Giai đoạn I', 'Giai đoạn II', 'Giai đoạn III (trạng thái giới hạn phá hoại)', 'Giai đoạn đàn hồi thuần túy'],
            correctIndex: 2,
            explanation: 'TTGH I tính toán độ bền dựa trên mô hình nội lực ở giai đoạn III khi bê tông vùng nén đạt cường độ lăng trụ Rb và cốt thép đạt Rs.'
          },
          {
            question: 'Kiểm tra độ võng f <= [f] của dầm phải sử dụng loại tải trọng nào?',
            options: ['Tải trọng tính toán', 'Tải trọng tiêu chuẩn', 'Tải trọng động đất cực hạn', 'Tải trọng phá hoại'],
            correctIndex: 1,
            explanation: 'Kiểm tra TTGH II (sử dụng bình thường) luôn sử dụng tải trọng tiêu chuẩn với hệ số gamma_f = 1.0.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/chuong-3" />
    </div>
  );
};
