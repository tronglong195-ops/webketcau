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
import { Wall } from '../three/elements/Wall';
import { calcRetainingWall } from '../calc/retainingWall';

export const Tap3Chuong3Page: React.FC = () => {
  // Retaining Wall State
  const [H_m, setH] = useState<number>(4.5);
  const [B_m, setB] = useState<number>(2.8);
  const [phi_deg, setPhi] = useState<number>(30);
  const [gamma_soil, setGamma] = useState<number>(18);
  const [q_surcharge, setQ] = useState<number>(10);

  const wallRes = calcRetainingWall({
    concrete: 'B20',
    rebar: 'CII',
    H_m,
    B_m,
    b_stem_top_m: 0.25,
    b_stem_bot_m: 0.45,
    h_base_m: 0.45,
    b_toe_m: 0.8,
    gamma_soil,
    phi_deg,
    q_surcharge,
    mu_friction: 0.45
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 3: Các cấu kiện đặc biệt</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 3: Tường chắn đất</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 3: Tường Chắn Đất Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán áp lực đất chủ động Rankine/Coulomb, kiểm tra ổn định chống trượt, chống lật, thiết kế tường góc công xôn và tường có sườn tăng cường theo TCVN 5574-1991.
        </p>
      </div>

      <StandardBanner volume="tap3" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-3-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.1 Khái niệm</a>
        <a href="#sec-3-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.2 Tải trọng</a>
        <a href="#sec-3-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.3 Kích thước sơ bộ</a>
        <a href="#sec-3-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.4 Áp lực đất Ka</a>
        <a href="#sec-3-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.5 Tường công xôn</a>
        <a href="#sec-3-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.6 Tính cường độ</a>
        <a href="#sec-3-7" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.7 Tường có thành chống</a>
        <a href="#sec-3-8" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.8 Bài tập ví dụ</a>
      </div>

      {/* 3.1 KHÁI NIỆM & 3.2 TẢI TRỌNG */}
      <section id="sec-3-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm &amp; Tải trọng tác dụng</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Tường chắn đất là công trình giữ ổn định mái dốc đất đắp hoặc đất đào chống sạt lở tại các triền dốc, mố cầu, tầng hầm nhà cao tầng và bờ kè sông biển. Tải trọng tác dụng gồm: trọng lượng bản thân tường, trọng lượng khối đất trên bản gót, áp lực đất chủ động Ea, hoạt tải xe cộ trên mặt đất q và áp lực thủy tĩnh nước ngầm nếu có (T3 tr.145).
        </p>

        {/* 3D VIEWER: RETAINING WALL */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Tường Chắn Đất Dạng Công Xôn (Cantilever Wall)</h3>
              <p className="text-xs text-text-sub">Quan sát bản thẳng đứng (Stem), bản mũi (Toe) và bản gót (Heel)</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
          </div>
          <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
            <ViewerCanvas cameraPosition={[3.2, 2.2, 3.2]}>
              {({ isXray, wireframe }) => (
                <Wall heightMm={H_m * 1000} lengthMm={4000} thicknessMm={450} isXray={isXray} wireframe={wireframe} />
              )}
            </ViewerCanvas>
          </div>
        </div>
      </section>

      {/* 3.4 ÁP LỰC ĐẤT CHỦ ĐỘNG & CALCULATOR */}
      <section id="sec-3-4" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Áp lực đất chủ động &amp; Kiểm tra ổn định</h2>
        </div>

        <FormulaBlock
          number="(3.4)"
          source="T3 tr.152"
          latex="K_a = \tan^2 \left( 45^{\circ} - \frac{\varphi}{2} \right) \quad ; \quad E_a = \frac{1}{2} \gamma H^2 K_a + q H K_a"
          description="Ka: hệ số áp lực đất chủ động Rankine; phi: góc nội ma sát của đất đắp sau lưng tường."
        />

        {/* MÁY TÍNH KIỂM TRA TƯỜNG CHẮN */}
        <div className="bg-surface p-6 rounded-2xl border border-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-serif font-bold text-base text-text-main flex items-center gap-2">
              <span>⚡</span>
              <span>Máy tính ổn định trượt, lật &amp; Cốt thép tường chắn</span>
            </h3>
            <span className="text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-semibold">TCVN 5574-1991</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block text-text-sub mb-1">Chiều cao H (m)</label>
              <input
                type="number"
                step="0.1"
                value={H_m}
                onChange={e => setH(Number(e.target.value))}
                className="w-full p-2 bg-bg border border-border rounded font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-text-sub mb-1">Rộng đáy B (m)</label>
              <input
                type="number"
                step="0.1"
                value={B_m}
                onChange={e => setB(Number(e.target.value))}
                className="w-full p-2 bg-bg border border-border rounded font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-text-sub mb-1">Góc phi (°)</label>
              <input
                type="number"
                value={phi_deg}
                onChange={e => setPhi(Number(e.target.value))}
                className="w-full p-2 bg-bg border border-border rounded font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-text-sub mb-1">Dung trọng gamma (kN/m³)</label>
              <input
                type="number"
                value={gamma_soil}
                onChange={e => setGamma(Number(e.target.value))}
                className="w-full p-2 bg-bg border border-border rounded font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-text-sub mb-1">Hoạt tải q (kN/m²)</label>
              <input
                type="number"
                value={q_surcharge}
                onChange={e => setQ(Number(e.target.value))}
                className="w-full p-2 bg-bg border border-border rounded font-mono text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-bg rounded-xl border border-border">
              <div className="text-[11px] text-text-sub">Áp lực đất Ea (Ka = {wallRes.Ka})</div>
              <div className="font-mono font-bold text-text-main text-base mt-1">{wallRes.Ea_total_kN} kN/m</div>
              <p className="text-[10px] text-text-sub mt-1">Đất: {wallRes.Ea_soil_kN} kN | Hoạt tải: {wallRes.Ea_surch_kN} kN</p>
            </div>

            <div className="p-4 bg-bg rounded-xl border border-border">
              <div className="text-[11px] text-text-sub">Hệ số an toàn Lật &amp; Trượt</div>
              <div className="font-mono font-bold text-sm mt-1 flex justify-center gap-2">
                <span className={wallRes.isOverturningSafe ? 'text-emerald-700' : 'text-rose-700'}>
                  Kl = {wallRes.K_overturning} (&ge;1.5)
                </span>
                <span>|</span>
                <span className={wallRes.isSlidingSafe ? 'text-emerald-700' : 'text-rose-700'}>
                  Ktr = {wallRes.K_sliding} (&ge;1.3)
                </span>
              </div>
              <p className="text-[10px] text-text-sub mt-1">
                {wallRes.isOverturningSafe && wallRes.isSlidingSafe ? 'ỔN ĐỊNH ĐẠT YÊU CẦU' : 'CẦN MỞ RỘNG BẢN ĐÁY B!'}
              </p>
            </div>

            <div className="p-4 bg-bg rounded-xl border border-border">
              <div className="text-[11px] text-text-sub">Thép chân bản đứng As</div>
              <div className="font-mono font-bold text-primary text-base mt-1">{wallRes.As_stem_cm2} cm²/m</div>
              <p className="text-[10px] text-text-sub mt-1">Mômen ngàm chân: M = {wallRes.M_stem_bot_kNm} kNm/m</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.7 TƯỜNG CÓ THÀNH CHỐNG & 3.8 BÀI TẬP */}
      <section id="sec-3-7" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.7</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tường có sườn chống (Counterfort Wall) &amp; Bài tập</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khi chiều cao tường chắn lớn (<InlineMath math="H > 6\\text{ m}" />), bản đứng công xôn phải rất dày và tốn nhiều thép. Người ta bố trí thêm các <strong>sườn tăng cường (thành chống tam giác)</strong> cách nhau 2.5 - 4.5m ở phía sau lưng tường (bản gót). Bản đứng lúc này làm việc như bản liên tục tựa lên các sườn chống (T3 tr.172).
        </p>

        <ExampleBlock
          number="Ví dụ 3.1"
          title="Kiểm tra ổn định tường chắn góc công xôn H = 4.5m"
          bookRef="T3 tr.180"
          given="Tường chắn cao H = 4.5 m, bề rộng bản đáy B = 2.8 m. Đất đắp có phi = 30°, gamma = 18 kN/m3. Hoạt tải q = 10 kN/m2. Hệ số ma sát đáy móng mu = 0.45. Bê tông B20, thép CII."
          solution={[
            '1. Hệ số áp lực đất chủ động: Ka = tan^2(45° - 30°/2) = tan^2(30°) = 0.333.',
            '2. Hợp lực áp lực đất: Ea_dat = 0.5 * 18 * 4.5^2 * 0.333 = 60.7 kN/m. Ea_tai = 10 * 4.5 * 0.333 = 15.0 kN/m. Tổng Ea = 75.7 kN/m.',
            '3. Mômen gây lật quanh mũi O: Mo = 60.7 * (4.5/3) + 15.0 * (4.5/2) = 91.1 + 33.8 = 124.9 kNm/m.',
            '4. Tổng trọng lượng thẳng đứng W = W_tuong + W_day + W_dat = 27.3 + 31.5 + 115.8 = 174.6 kN/m.',
            '5. Mômen chống lật Mr = 265.4 kNm/m.',
            '6. Hệ số chống lật: Kl = Mr / Mo = 265.4 / 124.9 = 2.12 >= [Kl] = 1.5 => ĐẠT!',
            '7. Hệ số chống trượt: Ktr = (mu * W) / Ea = (0.45 * 174.6) / 75.7 = 1.04 < 1.3 => Chưa an toàn trượt! Cần làm răng móng (khóa chống trượt chìm dưới đáy móng).'
          ]}
        />
      </section>

      {/* COMMON MISTAKES & FLASHCARDS */}
      <ConstructionNote title="Hệ thống thoát nước sau lưng tường chắn">
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Nước đọng sau lưng tường là nguyên nhân hàng đầu gây sập tường chắn đất do áp lực thủy tĩnh tăng vọt.</li>
          <li>Bắt buộc bố trí tầng lọc ngược bằng đá dăm/sỏi sau lưng tường và các lỗ thoát nước (Weep holes) đường kính D = 100 mm cách nhau 2 - 3m với độ dốc thoát ra ngoài.</li>
        </ul>
      </ConstructionNote>

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Quên làm lỗ thoát nước sau lưng tường chắn đất.',
            consequence: 'Mùa mưa nước tích tụ làm tăng áp lực ngang gấp đôi dẫn đến tường bị trượt hoặc lật đổ sụp.',
            correction: 'Bắt buộc làm lỗ thoát nước D100 kèm lớp sỏi lọc ngược sau lưng tường.',
            bookRef: 'T3 tr.160'
          }
        ]}
      />

      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 3 - Tập 3"
        cards={[
          { front: 'Hệ số an toàn chống lật Kl và chống trượt Ktr tối thiểu là bao nhiêu?', back: 'Kl >= 1.5 và Ktr >= 1.3.' },
          { front: 'Khi nào nên chuyển từ tường công xôn sang tường có sườn chống?', back: 'Khi chiều cao tường H > 6m để giảm chiều dày bản đứng và tiết kiệm cốt thép.' },
          { front: 'Giải pháp nào hiệu quả khi tường không đạt hệ số an toàn chống trượt?', back: 'Làm răng móng (khóa chống trượt) ăn sâu vào nền đất dưới bản đáy.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 3 - Tập 3"
        questions={[
          {
            question: 'Khi tường chắn đất không thỏa mãn điều kiện chống trượt (Ktr < 1.3), biện pháp xử lý nào hiệu quả nhất?',
            options: ['Làm khóa chống trượt (răng móng) dưới đáy móng', 'Sơn tường', 'Tăng mác bê tông', 'Giảm chiều dày tường'],
            correctIndex: 0,
            explanation: 'Răng móng chìm sâu xuống đất kích hoạt áp lực đất bị động phía trước răng, tăng lực cản trượt rất lớn.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-3/chuong-3" />
    </div>
  );
};
