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
import { LoadArrows } from '../three/overlays/LoadArrows';

export const Tap1Chuong6Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 6: Cấu kiện chịu kéo</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 6: Cấu Kiện Chịu Kéo
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán cấu kiện bê tông cốt thép chịu kéo đúng tâm, kéo lệch tâm bé (không có vùng nén), kéo lệch tâm lớn (có vùng nén) và kiểm tra khả năng chịu lực cắt khi có kéo.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-6-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">6.1 Khái niệm &amp; Cấu tạo</a>
        <a href="#sec-6-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">6.2 Kéo đúng tâm</a>
        <a href="#sec-6-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">6.3 Kéo lệch tâm</a>
        <a href="#sec-6-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">6.4 Lực cắt khi có kéo</a>
      </div>

      {/* 6.1 KHÁI NIỆM & CẤU TẠO */}
      <section id="sec-6-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">6.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm chung và cấu tạo</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Cấu kiện chịu kéo thường gặp trong thanh cánh hạ và thanh bụng giằng của dàn mái, thanh căng của vòm, thành bể chứa chất lỏng hình trụ, silô bunke và ống dẫn nước có áp. Do bê tông chịu kéo rất kém, ngay khi tải trọng còn nhỏ tiết diện bê tông đã bị nứt xuyên suốt, toàn bộ lực kéo dọc trục do cốt thép gánh chịu (T1 tr.235).
        </p>

        {/* 3D VIEWER: TENSION MEMBER */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Cấu Kiện Chịu Kéo</h3>
              <p className="text-xs text-text-sub">Quan sát hai đầu neo cốt thép và lực kéo N kéo giãn cấu kiện</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
          </div>
          <div className="h-80 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[2.2, 0.8, 1.8]}>
              {({ isXray, wireframe }) => (
                <group>
                  <RCBeam lengthMm={2400} bMm={200} hMm={250} isXray={isXray} wireframe={wireframe} />
                  <LoadArrows
                    type="point"
                    positions={[[-1.25, 0, 0], [1.25, 0, 0]]}
                    direction="down"
                    label="Lực kéo N"
                  />
                </group>
              )}
            </ViewerCanvas>
          </div>
        </div>

        <ConstructionNote title="Yêu cầu cấu tạo thanh chịu kéo (T1 tr.237)">
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Tuyệt đối không nối buộc cốt thép trong vùng chịu kéo lớn của thanh căng vòm hoặc thanh cánh hạ của dàn. Nếu bắt buộc nối, phải hàn đối đầu hoặc dùng coupler ren cơ học.</li>
            <li>Cốt thép dọc phải được neo thật chắc chắn vào các nút dàn hoặc gối tựa bằng bản đệm thép hàn hoặc uốn móc neo tiêu chuẩn.</li>
            <li>Cốt đai có nhiệm vụ định vị cốt dọc và khống chế vết nứt dọc theo phương thanh thép, bước đai <InlineMath math="s_w \\le 200\\text{ mm}" />.</li>
          </ul>
        </ConstructionNote>
      </section>

      {/* 6.2 KÉO ĐÚNG TÂM */}
      <section id="sec-6-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">6.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Kéo đúng tâm</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Ở trạng thái giới hạn về cường độ (TTGH 1), toàn bộ tiết diện bê tông đã bị nứt gãy xuyên qua. Lực kéo tính toán giới hạn hoàn toàn do toàn bộ cốt thép dọc Ast chịu:
        </p>

        <FormulaBlock
          number="(6.1)"
          source="T1 tr.238"
          latex={'N \\le R_s A_{st}'}
          description="Ast: tổng diện tích toàn bộ các thanh cốt thép dọc trong tiết diện; Rs: cường độ tính toán chịu kéo của cốt thép."
          compare5574={true}
        />

        <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-xl space-y-2 text-xs">
          <span className="font-bold text-primary">Tính toán theo TTGH 2 (Điều kiện chống nứt):</span>
          <p className="text-text-sub">
            Với các kết cấu chống thấm nghiêm ngặt (bể nước cấp 1 không cho phép nứt), điều kiện không xuất hiện vết nứt là:
          </p>
          <div className="font-mono font-semibold text-text-main text-center py-1">
            <InlineMath math="N \\le R_{bt} A + R_{sn} A_{st}" />
          </div>
        </div>
      </section>

      {/* 6.3 KÉO LỆCH TÂM */}
      <section id="sec-6-3" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">6.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Kéo lệch tâm, tiết diện chữ nhật</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Độ lệch tâm tĩnh học: <InlineMath math="e_0 = M / N" />. Gọi e và e' là khoảng cách từ điểm đặt lực nén đến trọng tâm cốt thép As và As'. Tùy thuộc vị trí điểm đặt lực N, phân chia làm 2 trường hợp:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LỆCH TÂM BÉ */}
          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-primary">1. Kéo lệch tâm bé</h4>
              <span className="text-xs bg-bg px-2 py-0.5 rounded border border-border font-mono">e' &le; h0 - a'</span>
            </div>
            <p className="text-xs text-text-sub leading-relaxed">
              Điểm đặt lực kéo N nằm <strong>ở giữa hai lớp cốt thép</strong> As và As'. Toàn bộ tiết diện bê tông bị kéo và nứt đứt hoàn toàn, không có vùng nén bê tông. Cả hai lớp cốt thép đều chịu kéo.
            </p>
            <FormulaBlock
              number="(6.2)"
              source="T1 tr.241"
              latex="A_s = \frac{N \cdot e'}{R_s (h_0 - a')} \quad ; \quad A'_s = \frac{N \cdot e}{R_s (h_0 - a')}"
              description="e là khoảng cách từ N đến As; e' là khoảng cách từ N đến As'."
            />
          </div>

          {/* LỆCH TÂM LỚN */}
          <div className="p-5 bg-surface rounded-xl border border-border space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-amber-600">2. Kéo lệch tâm lớn</h4>
              <span className="text-xs bg-bg px-2 py-0.5 rounded border border-border font-mono">e' &gt; h0 - a'</span>
            </div>
            <p className="text-xs text-text-sub leading-relaxed">
              Điểm đặt lực kéo N nằm <strong>ngoài khoảng giữa hai lớp cốt thép</strong>. Tiết diện xuất hiện một vùng bê tông chịu nén có chiều cao x giống như cấu kiện chịu uốn.
            </p>
            <FormulaBlock
              number="(6.3)"
              source="T1 tr.244"
              latex="N \cdot e \le R_b b x (h_0 - 0.5x) + R_{sc} A'_s (h_0 - a')"
              description="Với chiều cao vùng nén: x = (Rs*As - Rsc*As' - N) / (Rb*b). Điều kiện xi <= xi_R."
              compare5574={true}
            />
          </div>
        </div>

        {/* BÀI TẬP VÍ DỤ TỪ SÁCH VÕ BÁ TẦM */}
        <ExampleBlock
          number="Ví dụ 6.1"
          title="Thiết kế cốt thép thanh giằng chịu kéo lệch tâm lớn"
          bookRef="T1 tr.247"
          given="Thanh giằng tiết diện b = 200 mm, h = 300 mm. Vật liệu: Bê tông B15 (Rb = 8.5 MPa), Thép CII (Rs = Rsc = 280 MPa). Lớp bảo vệ a = a' = 30 mm (h0 = 270 mm). Nội lực tính toán: N = 120 kN, M = 36 kNm."
          solution={[
            '1. Độ lệch tâm tĩnh học: e0 = M / N = 36 / 120 = 0.3 m = 300 mm.',
            '2. Khoảng cách giữa 2 lớp thép: h0 - a\' = 270 - 30 = 240 mm.',
            '3. Khoảng cách từ điểm đặt N đến trọng tâm As\': e\' = e0 - h/2 + a\' = 300 - 150 + 30 = 180 mm < 240 mm => Lực N nằm giữa 2 lớp thép => Kéo lệch tâm bé!',
            '4. Khoảng cách từ điểm đặt N đến trọng tâm As: e = e0 + h/2 - a = 300 + 150 - 30 = 420 mm.',
            '5. Diện tích cốt thép As: As = (N * e\') / [Rs * (h0 - a\')] = (120e3 * 180) / [280 * 240] = 321 mm².',
            '6. Diện tích cốt thép As\': As\' = (N * e) / [Rs * (h0 - a\')] = (120e3 * 420) / [280 * 240] = 750 mm².',
            '7. Chọn cốt thép: Phía As đặt 2 phi 16 (As = 402 mm²), phía As\' đặt 2 phi 22 (As = 760 mm²).'
          ]}
        />
      </section>

      {/* 6.4 LỰC CẮT KHI CÓ KÉO */}
      <section id="sec-6-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">6.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Kéo lệch tâm theo lực cắt</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khi cấu kiện vừa chịu lực cắt Q vừa chịu lực kéo N dọc trục, ứng suất kéo làm vết nứt xiên mở rộng rất nhanh và làm giảm đáng kể khả năng chịu cắt của bê tông Qb (T1 tr.250):
        </p>

        <FormulaBlock
          number="(6.4)"
          source="T1 tr.250"
          latex={'Q_b = \\frac{\\phi_{b2} R_{bt} b h_0^2}{c} \\left( 1 - 0.2 \\frac{N}{R_{bt} b h_0} \\right)'}
          description="Lực kéo N làm giảm khả năng chịu cắt Qb của bê tông. Nếu N quá lớn, toàn bộ lực cắt Q phải do cốt đai Qsw và cốt xiên gánh chịu."
        />
      </section>

      {/* COMMON MISTAKES */}
      <CommonMistakes
        mistakes={[
          {
            mistake: 'Áp dụng công thức uốn thông thường cho cấu kiện chịu kéo lệch tâm bé.',
            consequence: 'Bỏ qua hiện tượng không có vùng nén bê tông, dẫn đến tính thiếu hụt cốt thép nghiêm trọng.',
            correction: 'Luôn so sánh vị trí điểm đặt lực e\' với (h0 - a\') để xác định chính xác kéo lệch tâm bé hay lớn.',
            bookRef: 'T1 tr.242'
          },
          {
            mistake: 'Dùng biện pháp nối buộc cốt thép trong thanh căng vòm hoặc thanh cánh hạ của dàn.',
            consequence: 'Mối nối bị tuột lực dính gây đứt thanh giằng và sập đổ toàn bộ hệ kết cấu mái.',
            correction: 'Chỉ được hàn đối đầu hoặc dùng coupler ren gia cường tại các thanh chịu kéo quan trọng.',
            bookRef: 'T1 tr.237'
          }
        ]}
      />

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 6"
        cards={[
          { front: 'Cấu kiện chịu kéo đúng tâm tính toán theo TTGH 1 như thế nào?', back: 'N <= Rs * Ast (toàn bộ bê tông đã nứt đứt, chỉ cốt thép chịu lực kéo).' },
          { front: 'Dấu hiệu nhận biết cấu kiện kéo lệch tâm bé?', back: 'Điểm đặt lực kéo N nằm ở giữa hai lớp cốt thép: e\' <= h0 - a\'. Toàn bộ tiết diện nứt, không có vùng nén bê tông.' },
          { front: 'Lực kéo dọc trục ảnh hưởng thế nào đến khả năng chịu cắt Q?', back: 'Lực kéo làm giảm khả năng chịu cắt Qb của bê tông, làm vết nứt xiên mở rộng sớm hơn.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 6"
        questions={[
          {
            question: 'Trong cấu kiện bê tông cốt thép chịu kéo lệch tâm bé, sự làm việc của bê tông vùng nén như thế nào?',
            options: ['Bê tông vùng nén chịu ứng suất Rb', 'Không tồn tại vùng nén bê tông, toàn bộ tiết diện bị kéo và nứt', 'Bê tông chịu nén một nửa tiết diện', 'Bê tông không bị nứt'],
            correctIndex: 1,
            explanation: 'Trong kéo lệch tâm bé, lực kéo nằm giữa hai hàng thép nên toàn bộ tiết diện chỉ chịu kéo và nứt xuyên suốt, không có vùng bê tông chịu nén.'
          },
          {
            question: 'Tại sao cấm nối buộc cốt thép ở thanh cánh hạ chịu kéo của dàn bê tông cốt thép?',
            options: ['Vì tốn kẽm buộc', 'Vì lực kéo lớn dễ làm tuột neo và bê tông bao quanh bị xé toác', 'Vì làm tăng trọng lượng', 'Vì khó kiểm tra'],
            correctIndex: 1,
            explanation: 'Lực kéo trực tiếp trong thanh dàn rất lớn, liên kết dính ma sát của mối nối buộc không đủ độ tin cậy để chống tuột thanh thép.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/chuong-6" />
    </div>
  );
};
