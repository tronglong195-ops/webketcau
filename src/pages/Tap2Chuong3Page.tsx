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
import { Footing } from '../three/elements/Footing';
import { calcIsolatedFooting } from '../calc/footingDesign';

export const Tap2Chuong3Page: React.FC = () => {
  // Footing Calculator State
  const [bCol, setBCol] = useState<number>(300);
  const [hCol, setHCol] = useState<number>(300);
  const [bFooting, setBFooting] = useState<number>(2.2);
  const [lFooting, setLFooting] = useState<number>(2.2);
  const [hFooting, setHFooting] = useState<number>(650);
  const [NkN, setNkN] = useState<number>(900);
  const [MkNm, setMkNm] = useState<number>(55);

  const footingRes = calcIsolatedFooting({
    concrete: 'B20',
    rebar: 'CII',
    bColMm: bCol,
    hColMm: hCol,
    bFootingM: bFooting,
    lFootingM: lFooting,
    hFootingMm: hFooting,
    aMm: 50,
    N_kN: NkN,
    M_kNm: MkNm,
    gamma_soil: 20,
    depthM: 1.5
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 2: Cấu kiện nhà cửa</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 3: Móng bê tông cốt thép</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 3: Móng Bê Tông Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Thiết kế móng đơn, móng cốc lắp ghép, móng băng một phương, móng băng giao nhau và móng bè trên nền đàn hồi theo TCXDVN 356:2005.
        </p>
      </div>

      <StandardBanner volume="tap2" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-3-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.1 Khái niệm</a>
        <a href="#sec-3-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.2 Móng đơn</a>
        <a href="#sec-3-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.3 Móng lắp ghép</a>
        <a href="#sec-3-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.4 Móng băng</a>
        <a href="#sec-3-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.5 Móng mềm</a>
        <a href="#sec-3-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.6 Móng dưới tường</a>
        <a href="#sec-3-7" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.7 Móng băng giao nhau</a>
        <a href="#sec-3-8" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">3.8 Móng bè</a>
      </div>

      {/* 3.1 KHÁI NIỆM CHUNG */}
      <section id="sec-3-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm &amp; Phân loại móng</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Móng là bộ phận kết cấu ngầm bên dưới mặt đất có chức năng tiếp nhận toàn bộ tải trọng của công trình bên trên và phân phối an toàn vào nền đất. Chi phí xây dựng phần móng thường chiếm 15 - 30% tổng giá thành công trình (T2 tr.210).
        </p>
      </section>

      {/* 3D VIEWER: ISOLATED FOOTING */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Móng Đơn Cột Bê Tông Cốt Thép</h3>
            <p className="text-xs text-text-sub">Quan sát hình chóp cụt vát bậc, lồng thép chân cột và lưới thép đáy móng</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
        </div>
        <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
          <ViewerCanvas cameraPosition={[2.4, 1.8, 2.4]}>
            {({ isXray, wireframe }) => (
              <Footing
                lxMm={bFooting * 1000}
                lyMm={lFooting * 1000}
                hMm={hFooting}
                colX={bCol}
                colY={hCol}
                isXray={isXray}
                wireframe={wireframe}
              />
            )}
          </ViewerCanvas>
        </div>
      </div>

      {/* 3.2 MÓNG ĐƠN & CALCULATOR */}
      <section id="sec-3-2" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Móng đơn đổ toàn khối: Áp lực đất &amp; Đâm thủng</h2>
        </div>

        <FormulaBlock
          number="(2.6)"
          source="T2 tr.215"
          latex={'p = \\frac{N + G_m}{F} \\pm \\frac{M}{W} \\quad ; \\quad p_{max} \\le 1.2 R_{tc} \\quad ; \\quad p_{min} \\ge 0'}
          description="F = B * L (diện tích đáy móng); W = B * L^2 / 6 (mômen kháng uốn đáy móng); Rtc: cường độ tiêu chuẩn của đất nền."
          compare5574={true}
        />

        {/* MÁY TÍNH THIẾT KẾ MÓNG ĐƠN */}
        <div className="bg-surface p-6 rounded-2xl border border-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-serif font-bold text-base text-text-main flex items-center gap-2">
              <span>⚡</span>
              <span>Máy tính kiểm tra móng đơn (Áp lực đáy &amp; Đâm thủng)</span>
            </h3>
            <span className="text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-semibold">TCXDVN 356:2005</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-text-sub mb-1">Cột b_c x h_c (mm)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={bCol}
                  onChange={e => setBCol(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
                <input
                  type="number"
                  value={hCol}
                  onChange={e => setHCol(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
              </div>
            </div>
            <div>
              <label className="block text-text-sub mb-1">Đáy móng B x L (m)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={bFooting}
                  onChange={e => setBFooting(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
                <input
                  type="number"
                  step="0.1"
                  value={lFooting}
                  onChange={e => setLFooting(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
              </div>
            </div>
            <div>
              <label className="block text-text-sub mb-1">Chiều cao H (mm)</label>
              <input
                type="number"
                value={hFooting}
                onChange={e => setHFooting(Number(e.target.value))}
                className="w-full p-2 bg-bg border border-border rounded font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-text-sub mb-1">N (kN) &amp; M (kNm)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={NkN}
                  onChange={e => setNkN(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
                <input
                  type="number"
                  value={MkNm}
                  onChange={e => setMkNm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-bg rounded-xl border border-border">
              <div className="text-[11px] text-text-sub">Áp lực đáy p_max / p_min</div>
              <div className="font-mono font-bold text-text-main text-base mt-1">
                {footingRes.p_max_kPa} / {footingRes.p_min_kPa} kPa
              </div>
              <p className="text-[10px] text-text-sub mt-1">p_tb = {footingRes.p_avg_kPa} kPa (e0 = {footingRes.e0_m} m)</p>
            </div>

            <div className="p-4 bg-bg rounded-xl border border-border">
              <div className="text-[11px] text-text-sub">Kiểm tra đâm thủng</div>
              <div className={`font-mono font-bold text-sm mt-1 p-1 rounded ${footingRes.isPunchingSafe ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                {footingRes.isPunchingSafe ? 'AN TOÀN ĐÂM THỦNG' : 'NGUY CƠ ĐÂM THỦNG!'}
              </div>
              <p className="text-[10px] text-text-sub mt-1">P_dt = {footingRes.punchingForce_kN} kN &le; P_ct = {footingRes.punchingCapacity_kN} kN</p>
            </div>

            <div className="p-4 bg-bg rounded-xl border border-border">
              <div className="text-[11px] text-text-sub">Thép đáy móng As (x &amp; y)</div>
              <div className="font-mono font-bold text-primary text-base mt-1">
                {footingRes.As_x_cm2} / {footingRes.As_y_cm2} cm²
              </div>
              <p className="text-[10px] text-text-sub mt-1">Bố trí lưới thép hàn hoặc buộc đều hai phương</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.3 MÓNG CỐC LẮP GHÉP & 3.4 MÓNG BĂNG */}
      <section id="sec-3-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Móng đơn lắp ghép (Móng cốc) &amp; Móng băng</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-sm text-text-main">Móng cốc đúc sẵn (Socket Footing)</h4>
            <p>
              Đỉnh móng có lỗ hõm sâu (cốc) để cắm chân cột đúc sẵn vào. Khe hở xung quanh chân cột (50 - 75mm) được chèn vữa xi măng trương nở mác cao (grouting) để cố định chân cột tạo liên kết ngàm chắc chắn (T2 tr.225).
            </p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-bold text-sm text-text-main">Móng băng một phương (Continuous Footing)</h4>
            <p>
              Dùng khi móng đơn quá gần nhau hoặc tải trọng cột lớn khiến diện tích móng đơn giao nhau. Dầm móng băng liên kết các cột lại thành một dải, chịu uốn dọc theo chiều dài móng và công xôn ngang (T2 tr.235).
            </p>
          </div>
        </div>
      </section>

      {/* 3.5, 3.6, 3.7 MÓNG BĂNG GIAO NHAU & 3.8 MÓNG BÈ */}
      <section id="sec-3-7" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">3.7</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Móng băng giao nhau &amp; Móng bè toàn khối</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khi nền đất yếu có sức chịu tải nhỏ (<InlineMath math="R_{tc} < 100\\text{ kPa}" />), móng băng hai phương giao nhau hoặc móng bè toàn khối (Raft/Mat Foundation) trải rộng dưới toàn bộ diện tích công trình được áp dụng để giảm áp lực tiếp xúc và khống chế lún lệch tuyệt đối (T2 tr.260):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-primary">Móng bè phẳng</h4>
            <p className="text-text-sub">Bản bê tông cốt thép dày 0.5 - 1.5m phẳng lì. Thi công ván khuôn rất nhanh, nhưng cần kiểm tra chống chọc thủng quanh chân các cột.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-accent">Móng bè sườn (Có dầm sườn sườn lật)</h4>
            <p className="text-text-sub">Hệ dầm móng cao 1.0 - 2.0m chạy dọc theo các trục cột, bản đáy móng dày 250 - 400mm. Độ cứng không gian cực lớn, chống lún lệch hiệu quả nhất.</p>
          </div>
        </div>
      </section>

      {/* COMMON MISTAKES & FLASHCARDS */}
      <CommonMistakes
        mistakes={[
          {
            mistake: 'Chọn lớp bê tông bảo vệ cốt thép đáy móng chỉ c = 20 - 25 mm.',
            consequence: 'Cốt thép đáy móng bị rỉ sét do tiếp xúc trực tiếp với nước ngầm và đất phèn chua.',
            correction: 'Lớp bảo vệ đáy móng bắt buộc c >= 35 mm (khi có lớp bê tông lót mác 100 dày 100mm) và c >= 70 mm (khi đổ trực tiếp lên đất).',
            bookRef: 'T2 tr.218'
          },
          {
            mistake: 'Để áp lực đáy móng min bị âm (p_min < 0) vượt quá giới hạn cho phép.',
            consequence: 'Mép móng bị bật nhổ khỏi mặt đất, giảm diện tích tiếp xúc truyền lực gây nguy cơ lật đổ móng.',
            correction: 'Độ lệch tâm e0 <= L/6 để toàn bộ đáy móng luôn chịu nén (p_min >= 0).',
            bookRef: 'T2 tr.216'
          }
        ]}
      />

      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 3 - Tập 2"
        cards={[
          { front: 'Điều kiện khống chế áp lực đáy móng đơn là gì?', back: 'p_max <= 1.2 Rtc; p_tb <= Rtc; p_min >= 0.' },
          { front: 'Tháp đâm thủng chân cột có góc nghiêng bao nhiêu độ?', back: 'Góc nghiêng 45° xuất phát từ mép chân cột lan xuống đáy móng.' },
          { front: 'Lớp bê tông bảo vệ cốt thép đáy móng tối thiểu là bao nhiêu?', back: 'c >= 35 mm khi có bê tông lót, và c >= 70 mm khi đổ trực tiếp trên đất.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 3 - Tập 2"
        questions={[
          {
            question: 'Khi độ lệch tâm e0 > L/6 trong móng đơn, điều gì sẽ xảy ra ở đáy móng?',
            options: ['Móng bị lún đều', 'Xuất hiện vùng bật nhổ (áp lực p_min < 0, đất bị kéo tách rời khỏi đáy móng)', 'Móng tăng sức chịu tải', 'Không có ảnh hưởng gì'],
            correctIndex: 1,
            explanation: 'Khi e0 > L/6, biểu đồ áp lực đáy móng trở thành hình tam giác cụt, mép phía đối diện bị kéo tách khỏi nền đất.'
          },
          {
            question: 'Góc nghiêng của tháp đâm thủng chân cột bê tông cốt thép là bao nhiêu?',
            options: ['30°', '45°', '60°', '90°'],
            correctIndex: 1,
            explanation: 'Theo TCXDVN 356:2005, mặt cắt phá hoại đâm thủng nghiêng góc 45° so với phương thẳng đứng.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-2/chuong-3" />
    </div>
  );
};
