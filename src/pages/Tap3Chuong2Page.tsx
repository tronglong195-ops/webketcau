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
import { Tank } from '../three/elements/Tank';

export const Tap3Chuong2Page: React.FC = () => {
  const [tankShape, setTankShape] = React.useState<'circular' | 'rectangular'>('circular');
  const [cutaway, setCutaway] = React.useState<boolean>(false);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 3: Các cấu kiện đặc biệt</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 2: Bể chứa chất lỏng</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 2: Bể Chứa Chất Lỏng Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán và thiết kế bể nước trên mái, bể ngầm hình chữ nhật, bể trụ tròn, lực kéo vòng, áp lực nước và điều kiện chống thấm chống nứt theo TCVN 5574-1991.
        </p>
      </div>

      <StandardBanner volume="tap3" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-2-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.1 Khái niệm</a>
        <a href="#sec-2-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.2 Bể trên mái</a>
        <a href="#sec-2-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.3 Bể tròn</a>
        <a href="#sec-2-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.4 Bể ngầm chữ nhật</a>
        <a href="#sec-2-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.5 Bể ngầm tròn</a>
        <a href="#sec-2-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.6 Bài tập ví dụ</a>
      </div>

      {/* 2.1 KHÁI NIỆM & 2.2 BỂ MÁI */}
      <section id="sec-2-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm &amp; Phân loại bể chứa</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Bể chứa chất lỏng là công trình đặc biệt đòi hỏi yêu cầu kép: vừa phải đảm bảo khả năng chịu lực (TTGH 1) vừa phải khống chế tuyệt đối không được xuất hiện vết nứt xuyên qua thành bể (TTGH 2 cấp 1 hoặc cấp 2 với <InlineMath math="a_{crc} \\le 0.1\\text{ mm}" />) để chống rò rỉ thất thoát nước (T3 tr.85).
        </p>

        {/* 3D VIEWER: WATER TANK */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif font-bold text-text-main text-lg">
                Mô hình 3D: {tankShape === 'circular' ? 'Bể Chứa Nước Tròn' : 'Bể Nước Chữ Nhật Toàn Khối'}
              </h3>
              <p className="text-xs text-text-sub">
                Chi tiết cấu tạo: Băng cản nước PVC, vát mòi 45° chân đáy, lồng thép 2 lớp, nắp thăm manhole và hệ thống ống kỹ thuật.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTankShape(tankShape === 'circular' ? 'rectangular' : 'circular')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-bg border border-border hover:bg-surface text-text-main shadow-xs"
              >
                {tankShape === 'circular' ? 'Chuyển sang Bể chữ nhật' : 'Chuyển sang Bể tròn'}
              </button>
              {tankShape === 'rectangular' && (
                <button
                  onClick={() => setCutaway(!cutaway)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    cutaway
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-bg text-text-muted border-border hover:bg-surface'
                  }`}
                >
                  {cutaway ? 'Đóng thành trước' : '✂️ Cắt nhìn bên trong'}
                </button>
              )}
            </div>
          </div>
          <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[2.8, 2.2, 2.8]}>
              {({ isXray, wireframe }) => (
                <Tank
                  type={tankShape}
                  radiusMm={1400}
                  widthMm={2200}
                  lengthMm={3000}
                  heightMm={2200}
                  wallThicknessMm={150}
                  baseThickMm={200}
                  waterLevelPct={80}
                  isXray={isXray}
                  wireframe={wireframe}
                  cutaway={cutaway}
                  showRoof={true}
                  showPipes={true}
                  showRebars={true}
                />
              )}
            </ViewerCanvas>
          </div>
        </div>
      </section>

      {/* 2.3 BỂ TRÒN: LỰC KÉO VÒNG */}
      <section id="sec-2-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Bể tròn: Lực kéo vòng và Mômen uốn thành bể</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Thành bể hình trụ tròn chịu áp lực thủy tĩnh tam giác <InlineMath math="p(z) = \\gamma_w z" />. Nhờ tính đối xứng trục, thành bể chịu <strong>lực kéo vòng (Hoop tension N)</strong> theo chu vi và mômen uốn theo phương đứng tại chân thành ngàm vào đáy (T3 tr.102):
        </p>

        <FormulaBlock
          number="(3.3)"
          source="T3 tr.105"
          latex={'N_{\\varphi} = p(z) \\cdot R = \\gamma_w z \\cdot R \\quad ; \\quad A_s = \\frac{N_{\\varphi}}{R_s}'}
          description="R: bán kính bể tròn; gamma_w = 10 kN/m3; Cốt thép chịu lực vòng đặt ở hai mặt thành bể thành các vòng tròn khép kín."
        />
      </section>

      {/* 2.4 BỂ NGẦM HÌNH CHỮ NHẬT */}
      <section id="sec-2-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Bể ngầm hình chữ nhật</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Bể ngầm chịu hai tổ hợp tải trọng trái ngược nhau hoàn toàn (T3 tr.115):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-primary text-sm">Trường hợp 1: Bể rỗng, đất và nước ngầm ngoài đẩy vào</h4>
            <p>Áp lực đất chủ động Ea và áp lực thủy tĩnh nước ngầm từ bên ngoài ép vào thành bể. Thành bể ngàm ở đáy và tự do (hoặc khớp) ở nắp.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-accent text-sm">Trường hợp 2: Bể đầy nước, chưa đắp đất</h4>
            <p>Áp lực nước từ bên trong đẩy bung thành bể ra ngoài. Đây là trường hợp kiểm tra khi thử nước nghiệm thu công trình.</p>
          </div>
        </div>
      </section>

      {/* 2.6 BÀI TẬP VÍ DỤ */}
      <section id="sec-2-6" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.6</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Bài tập ví dụ</h2>
        </div>

        <ExampleBlock
          number="Ví dụ 2.1"
          title="Tính toán cốt thép vòng thành bể chứa nước hình trụ tròn"
          bookRef="T3 tr.128"
          given="Bể nước tròn bán kính R = 3.0 m, chiều sâu nước H = 3.5 m. Chiều dày thành bể h_w = 150 mm. Bê tông B20 (Rb = 11.5 MPa, Rbt = 0.9 MPa), Thép CII (Rs = 280 MPa). Trọng lượng riêng của nước gamma_w = 10 kN/m3."
          solution={[
            '1. Áp lực nước tại đáy thành bể: p = gamma_w * H = 10 * 3.5 = 35 kN/m2.',
            '2. Lực kéo vòng lớn nhất (xấp xỉ tại z ≈ 0.6H do ảnh hưởng ngàm chân): N_phi = 0.6 * p * R = 0.6 * 35 * 3.0 = 63 kN/m.',
            '3. Tính diện tích cốt thép vòng cho 1 mét chiều cao thành bể: As = N_phi / Rs = (63e3) / 280 = 225 mm²/m.',
            '4. Kiểm tra điều kiện chống nứt của bê tông (TTGH 2 cấp 1): sigma_bt = N_phi / (A_bt + alpha * As) = 63e3 / (150 * 1000 + 7.4 * 225) = 0.42 MPa <= Rbt (0.90 MPa) => Bê tông thành bể không bị nứt xuyên suốt, chống thấm an toàn!',
            '5. Chọn cốt thép vòng: Bố trí 2 lớp thép: phi 8a150 ở hai mặt (As = 2 * 335 = 670 mm²/m).'
          ]}
        />
      </section>

      {/* COMMON MISTAKES & FLASHCARDS */}
      <ConstructionNote title="Cấu tạo bê tông chống thấm cho bể chứa">
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Cấp chống thấm của bê tông tối thiểu B6 đến B8, tỷ lệ N/X &le; 0.45.</li>
          <li>Tại mạch ngừng thi công giữa đáy bể và thành bể bắt buộc phải đặt băng cản nước (Waterstop PVC hoặc thanh trương nở Bentonite).</li>
          <li>Không dùng thép thanh đường kính quá lớn, ưu tiên dùng thanh thép nhỏ d = 8 - 14 mm bố trí dày để kiểm soát bề rộng khe nứt cực nhỏ.</li>
        </ul>
      </ConstructionNote>

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Bỏ qua kiểm tra điều kiện chống nứt của bê tông thành bể.',
            consequence: 'Bể bị rò rỉ nước ngấm qua các vết nứt gây thất thoát nước và ăn mòn cốt thép.',
            correction: 'Bể chứa chất lỏng bắt buộc phải tính toán theo TTGH 2 (điều kiện chống nứt và khống chế acrc <= 0.1 mm).',
            bookRef: 'T3 tr.90'
          }
        ]}
      />

      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 2 - Tập 3"
        cards={[
          { front: 'Lực kéo vòng trong bể tròn được tính theo công thức nào?', back: 'N = p * R với p là áp lực thủy tĩnh tại độ sâu đang xét, R là bán kính bể.' },
          { front: 'Bề rộng khe nứt giới hạn cho phép trong bể chứa nước thông thường?', back: 'a_crc <= 0.1 mm để đảm bảo khả năng tự liền sẹo của bê tông và chống rò rỉ.' },
          { front: 'Tại mạch ngừng thi công giữa đáy và thành bể cần đặt chi tiết gì?', back: 'Băng cản nước Waterstop PVC hoặc sợi thanh trương nở chống thấm.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 2 - Tập 3"
        questions={[
          {
            question: 'Tại sao trong bể chứa chất lỏng, tính toán theo TTGH 2 (chống nứt) lại quan trọng hơn cả TTGH 1?',
            options: ['Vì bể rất dễ vỡ', 'Vì chỉ cần xuất hiện vết nứt xuyên qua thành là nước sẽ rò rỉ, công trình mất hoàn toàn công năng sử dụng', 'Vì tiêu chuẩn bắt buộc', 'Vì giá thành đắt'],
            correctIndex: 1,
            explanation: 'Bể chứa có yêu cầu công năng cốt lõi là giữ nước, vết nứt xuyên suốt dù chưa làm sập bể nhưng sẽ khiến nước rò rỉ và ăn mòn cốt thép nhanh chóng.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-3/chuong-2" />
    </div>
  );
};
