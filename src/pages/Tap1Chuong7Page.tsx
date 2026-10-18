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
import { CrackPattern } from '../three/overlays/CrackPattern';
import { calcCrackWidth, calcBeamDeflection } from '../calc/serviceability';

export const Tap1Chuong7Page: React.FC = () => {
  // Crack & Deflection Interactive State
  const [concrete, setConcrete] = useState<'B20' | 'B25' | 'B30'>('B20');
  const [bMm, setBMm] = useState<number>(200);
  const [hMm, setHMm] = useState<number>(400);
  const [spanMm, setSpanMm] = useState<number>(6000);
  const [AsMm2, setAsMm2] = useState<number>(628);
  const [barDiaMm, setBarDiaMm] = useState<number>(20);
  const [MserKNm, setMserKNm] = useState<number>(35);
  const [qSerKNm, setQSerKNm] = useState<number>(12);

  const crackRes = calcCrackWidth({
    concrete,
    rebar: 'CII',
    bMm,
    hMm,
    aMm: 35,
    AsMm2,
    barDiaMm,
    M_ser_kNm: MserKNm,
    isLongTerm: true
  });

  const deflRes = calcBeamDeflection({
    concrete,
    bMm,
    hMm,
    spanMm,
    q_ser_kNm: qSerKNm,
    AsMm2
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 7: Trạng thái giới hạn thứ hai</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 7: Tính Toán Theo Trạng Thái Giới Hạn Thứ Hai
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Kiểm tra điều kiện sử dụng bình thường: Tính toán độ cong trục dầm, độ cứng kháng uốn B, độ võng f và bề rộng khe nứt thẳng góc a_crc.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-7-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">7.1 Khái niệm</a>
        <a href="#sec-7-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">7.2 Độ cong trục dầm</a>
        <a href="#sec-7-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">7.3 Độ cong dầm BTCT</a>
        <a href="#sec-7-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">7.4 Độ cứng B</a>
        <a href="#sec-7-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">7.5 Độ võng</a>
        <a href="#sec-7-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">7.6 Khe nứt thẳng góc</a>
      </div>

      {/* 7.1 KHÁI NIỆM CHUNG */}
      <section id="sec-7-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">7.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm chung về TTGH thứ hai</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Một cấu kiện thỏa mãn điều kiện độ bền (TTGH 1) vẫn có thể không sử dụng được nếu bị võng quá lớn gây nứt tường, võng sàn, đọng nước, làm kẹt cửa kính hoặc gây tâm lý bất an cho người dùng. Ngoài ra, khe nứt quá rộng sẽ cho phép hơi ẩm và khí quyển CO2 thâm nhập ăn mòn cốt thép. TTGH 2 kiểm soát hai yếu tố này với tải trọng tiêu chuẩn (T1 tr.255).
        </p>
      </section>

      {/* 3D VIEWER: CRACK PATTERN & DEFLECTION */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Dầm Uốn Xuất Hiện Vết Nứt</h3>
            <p className="text-xs text-text-sub">Quan sát các vết nứt thẳng góc ở giữa nhịp và vết nứt xiên gần gối tựa</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
        </div>
        <div className="h-80 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
          <ViewerCanvas cameraPosition={[2.4, 0.9, 1.8]}>
            {({ isXray, wireframe }) => (
              <group>
                <RCBeam lengthMm={2800} bMm={200} hMm={400} isXray={isXray} wireframe={wireframe} />
                <CrackPattern lengthMm={2800} hMm={400} crackType="flexure" />
              </group>
            )}
          </ViewerCanvas>
        </div>
      </div>

      {/* 7.2 & 7.3 ĐỘ CONG CỦA TRỤC DẦM BTCT */}
      <section id="sec-7-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">7.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Độ cong của dầm bê tông cốt thép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Độ cong (1/r) của dầm là biến thiên góc xoay của tiết diện trên một đơn vị chiều dài. Trong kết cấu bê tông cốt thép đã xuất hiện vết nứt, độ cong phụ thuộc vào biến dạng kéo của cốt thép tại vị trí vết nứt và biến dạng nén của thớ biên bê tông (T1 tr.258):
        </p>

        <FormulaBlock
          number="(7.1)"
          source="T1 tr.258"
          latex={'\\frac{1}{r} = \\frac{\\varepsilon_{s} - \\varepsilon_{b}}{h_0} = \\frac{M}{B}'}
          description="B là độ cứng kháng uốn của tiết diện dầm có vết nứt (N.mm2)."
        />
      </section>

      {/* 7.4 ĐỘ CỨNG B CỦA DẦM BTCT */}
      <section id="sec-7-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">7.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Độ cứng kháng uốn B</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Khác với vật liệu đồng nhất đàn hồi tuyến tính (B = E*I không đổi), độ cứng B của dầm BTCT giảm dần khi tải trọng tăng (do vết nứt phát triển) và giảm tiếp theo thời gian (do bê tông co ngót và từ biến):
        </p>

        <FormulaBlock
          number="(7.2)"
          source="T1 tr.263"
          latex={'B = \\frac{E_s A_s z (h_0 - x)}{\\psi_s} \\approx (0.15 \\div 0.25) E_b I_b'}
          description="psi_s: hệ số xét đến sự tham gia chịu kéo của bê tông giữa các vết nứt (psi_s <= 1.0)."
          compare5574={true}
        />
      </section>

      {/* 7.5 ĐỘ VÕNG CỦA DẦM */}
      <section id="sec-7-5" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">7.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tính toán độ võng</h2>
        </div>
        <FormulaBlock
          number="(7.3)"
          source="T1 tr.268"
          latex={'f = S \\cdot \\left( \\frac{1}{r} \\right) \\cdot L^2 \\le [f] = \\frac{L}{250}'}
          description="Với dầm đơn giản tải trọng phân bố đều: S = 5/48. Độ võng giới hạn [f] thường lấy L/200 - L/300."
          compare5574={true}
        />
      </section>

      {/* 7.6 BỀ RỘNG KHE NỨT THẲNG GÓC a_crc */}
      <section id="sec-7-6" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">7.6</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Mở rộng khe nứt thẳng góc</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Theo TCXDVN 356:2005 mục 6.2.2.22, bề rộng khe nứt mở rộng cơ bản được tính theo công thức bán thực nghiệm (T1 tr.272):
        </p>

        <FormulaBlock
          number="(7.4)"
          source="T1 tr.272"
          latex={'a_{crc} = \\delta \\cdot \\phi_l \\cdot \\eta \\cdot \\left( \\frac{\\sigma_s}{E_s} \\right) \\cdot 20 (3.5 - 100\\mu) \\sqrt[3]{d} \\le [a_{crc}]'}
          description="eta = 1.0 (thép gờ), 1.4 (thép trơn); phi_l = 1.0 (ngắn hạn), 1.2 (dài hạn); [a_crc] = 0.3mm (dài hạn), 0.4mm (ngắn hạn)."
          compare5574={true}
        />

        {/* INTERACTIVE CALCULATOR */}
        <div className="bg-surface p-6 rounded-2xl border border-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-serif font-bold text-base text-text-main flex items-center gap-2">
              <span>⚡</span>
              <span>Máy tính kiểm tra vết nứt &amp; độ võng dầm</span>
            </h3>
            <span className="text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-semibold">TTGH 2</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-text-sub mb-1">Cấp bê tông</label>
              <select
                value={concrete}
                onChange={e => setConcrete(e.target.value as any)}
                className="w-full p-2 bg-bg border border-border rounded-lg font-mono font-semibold"
              >
                <option value="B20">B20 (Eb = 27 GPa)</option>
                <option value="B25">B25 (Eb = 30 GPa)</option>
                <option value="B30">B30 (Eb = 32.5 GPa)</option>
              </select>
            </div>
            <div>
              <label className="block text-text-sub mb-1">b x h x L (mm)</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  value={bMm}
                  onChange={e => setBMm(Number(e.target.value))}
                  className="w-1/3 p-2 bg-bg border border-border rounded font-mono text-center"
                  placeholder="b"
                />
                <input
                  type="number"
                  value={hMm}
                  onChange={e => setHMm(Number(e.target.value))}
                  className="w-1/3 p-2 bg-bg border border-border rounded font-mono text-center"
                  placeholder="h"
                />
                <input
                  type="number"
                  value={spanMm}
                  onChange={e => setSpanMm(Number(e.target.value))}
                  className="w-1/3 p-2 bg-bg border border-border rounded font-mono text-center"
                  placeholder="L"
                />
              </div>
            </div>
            <div>
              <label className="block text-text-sub mb-1">As (mm²) &amp; phi (mm)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={AsMm2}
                  onChange={e => setAsMm2(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
                <input
                  type="number"
                  value={barDiaMm}
                  onChange={e => setBarDiaMm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
              </div>
            </div>
            <div>
              <label className="block text-text-sub mb-1">M_ser (kNm) &amp; q_ser (kN/m)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={MserKNm}
                  onChange={e => setMserKNm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
                <input
                  type="number"
                  value={qSerKNm}
                  onChange={e => setQSerKNm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded font-mono text-center"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* KẾT QUẢ NỨT */}
            <div className="p-4 bg-bg rounded-xl border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-text-main">1. Bề rộng khe nứt a_crc:</span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${crackRes.isSafe ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                  {crackRes.isSafe ? 'ĐẠT (<= 0.3mm)' : 'KHÔNG ĐẠT (> 0.3mm)'}
                </span>
              </div>
              <div className="text-xl font-mono font-bold text-primary">{crackRes.a_crc_mm} mm</div>
              <p className="text-[11px] text-text-sub">Ứng suất kéo cốt thép sigma_s = {crackRes.sigma_s_MPa} MPa (mu = {crackRes.mu_pct}%)</p>
            </div>

            {/* KẾT QUẢ VÕNG */}
            <div className="p-4 bg-bg rounded-xl border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-text-main">2. Độ võng giữa nhịp f:</span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${deflRes.isSafe ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                  {deflRes.isSafe ? `ĐẠT (<= ${deflRes.f_limit_mm}mm)` : 'KHÔNG ĐẠT'}
                </span>
              </div>
              <div className="text-xl font-mono font-bold text-accent">{deflRes.f_mm} mm</div>
              <p className="text-[11px] text-text-sub">Tỷ lệ võng f/L = {deflRes.ratio} (Giới hạn [f] = L/250 = {deflRes.f_limit_mm} mm)</p>
            </div>
          </div>
        </div>

        {/* BÀI TẬP VÍ DỤ TỪ SÁCH VÕ BÁ TẦM */}
        <ExampleBlock
          number="Ví dụ 7.1"
          title="Kiểm tra bề rộng khe nứt và độ võng dầm chữ nhật"
          bookRef="T1 tr.275"
          given="Dầm đơn giản nhịp L = 6 m, tiết diện b = 200 mm, h = 450 mm. Cốt thép dọc 3 phi 20 (As = 942 mm², d = 20 mm). Lớp bảo vệ a = 35 mm (h0 = 415 mm). Bê tông B20, thép CII (Rs = 280 MPa, Es = 2.1e5 MPa). Tải trọng tiêu chuẩn dài hạn q_ser = 14 kN/m sinh ra mômen tiêu chuẩn M_ser = 63 kNm."
          solution={[
            '1. Tính ứng suất trong cốt thép chịu kéo sigma_s: Cánh tay đòn z ≈ 0.87 * h0 = 0.87 * 415 = 361 mm. => sigma_s = M_ser / (As * z) = (63e6) / (942 * 361) = 185.3 MPa.',
            '2. Hàm lượng cốt thép: mu = As / (b * h0) = 942 / (200 * 415) = 0.0113 (1.13%).',
            '3. Tính các hệ số: eta = 1.0 (thép CII có gờ), delta = 1.0 (cấu kiện chịu uốn), phi_l = 1.2 (tải dài hạn).',
            '4. Tính bề rộng khe nứt: a_crc = 1.0 * 1.2 * 1.0 * (185.3 / 2.1e5) * 20 * (3.5 - 100 * 0.0113) * cbrt(20) = 0.228 mm.',
            '5. So sánh giới hạn: a_crc = 0.228 mm <= [a_crc] = 0.3 mm => Thỏa mãn điều kiện chống nứt!',
            '6. Kiểm tra độ võng f: Độ cứng B ≈ 0.2 * Eb * Ib = 0.2 * 2.7e4 * (200 * 450^3 / 12) = 8.2e12 N.mm2. f = (5/48) * (M_ser * L^2) / B = (5/48) * (63e6 * 6000^2) / 8.2e12 = 28.8 mm.',
            '7. Giới hạn [f] = L / 200 = 6000 / 200 = 30 mm (hoặc L/250 = 24 mm). Nếu lấy [f] = L/200 thì dầm đạt yêu cầu độ võng.'
          ]}
        />
      </section>

      {/* COMMON MISTAKES & CONSTRUCTION NOTES */}
      <ConstructionNote title="Biện pháp hiệu quả để giảm nứt và giảm võng">
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>Giảm bề rộng khe nứt:</strong> Thay vì dùng ít thanh thép đường kính lớn (ví dụ 2 phi 28), nên chia nhỏ thành nhiều thanh đường kính nhỏ hơn (ví dụ 4 phi 20) để tăng diện tích bám dính tiếp xúc và giảm đường kính d trong công thức cbrt(d).</li>
          <li><strong>Giảm độ võng:</strong> Biện pháp hữu hiệu nhất là tăng chiều cao dầm h (vì độ cứng I tỷ lệ với h^3), hoặc bố trí thêm cốt thép chịu nén As' (làm giảm từ biến bê tông).</li>
        </ul>
      </ConstructionNote>

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Tăng mác bê tông để mong giảm độ võng của dầm.',
            consequence: 'Độ võng hầu như không giảm đáng kể trong khi chi phí xi măng tăng cao.',
            correction: 'Môđun Eb tăng rất ít khi tăng mác bê tông (tỷ lệ căn bậc hai). Muốn giảm võng hiệu quả phải tăng chiều cao tiết diện h.',
            bookRef: 'T1 tr.265'
          },
          {
            mistake: 'Dùng thép cường độ rất cao (CB500) mà không kiểm tra bề rộng vết nứt.',
            consequence: 'Cường độ chịu lực đạt nhưng vết nứt mở rộng quá lớn (> 0.4mm) gây gỉ sét nhanh chóng.',
            correction: 'Khi dùng thép cường độ cao, ứng suất sigma_s làm việc lớn khiến a_crc tăng cao, bắt buộc phải kiểm tra TTGH 2.',
            bookRef: 'T1 tr.274'
          }
        ]}
      />

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 7"
        cards={[
          { front: 'Bề rộng khe nứt giới hạn cho phép [a_crc] thông thường là bao nhiêu?', back: '[a_crc] = 0.3 mm đối với tải trọng dài hạn và 0.4 mm đối với tải trọng ngắn hạn.' },
          { front: 'Để giảm bề rộng khe nứt hiệu quả nhất ta nên làm gì?', back: 'Dùng thanh thép đường kính nhỏ d và phân bố đều (do a_crc tỷ lệ với căn bậc ba của d).' },
          { front: 'Độ võng giới hạn [f] của dầm thông thường là bao nhiêu?', back: '[f] = L / 250 đối với dầm nhà dân dụng và L / 200 đối với kết cấu dầm có trần treo.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 7"
        questions={[
          {
            question: 'Biện pháp nào sau đây giúp giảm độ võng của dầm bê tông cốt thép hiệu quả nhất?',
            options: ['Tăng cấp độ bền bê tông từ B20 lên B25', 'Tăng chiều cao tiết diện dầm h', 'Dùng cốt thép trơn thay cho thép gờ', 'Tăng bề rộng dầm b'],
            correctIndex: 1,
            explanation: 'Độ cứng kháng uốn tỷ lệ thuận với b * h^3. Tăng chiều cao h làm tăng độ cứng theo hàm bậc 3, giảm độ võng nhanh nhất.'
          },
          {
            question: 'Khi cùng diện tích thép As, cách bố trí nào cho vết nứt hẹp hơn?',
            options: ['2 thanh phi 28', '4 thanh phi 20', 'Cả hai như nhau', '1 thanh phi 40'],
            correctIndex: 1,
            explanation: 'Bề rộng khe nứt a_crc tỷ lệ thuận với cbrt(d). Đường kính thanh nhỏ hơn (phi 20 < phi 28) sẽ cho vết nứt phân tán và hẹp hơn.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/chuong-7" />
    </div>
  );
};
