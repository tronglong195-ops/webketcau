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
import { RCColumn } from '../three/elements/RCColumn';
import { LoadArrows } from '../three/overlays/LoadArrows';
import { calcEccentricColumn, calcAxialColumn } from '../calc/columnDesign';

export const Tap1Chuong5Page: React.FC = () => {
  // Interactive Calculator State
  const [concrete, setConcrete] = useState<'B20' | 'B25' | 'B30'>('B20');
  const [rebar, setRebar] = useState<'CII' | 'CIII'>('CII');
  const [bMm, setBMm] = useState<number>(300);
  const [hMm, setHMm] = useState<number>(400);
  const [l0Mm, setL0Mm] = useState<number>(3600);
  const [NMm, setNMm] = useState<number>(600);
  const [MMm, setMMm] = useState<number>(90);

  const calcResult = calcEccentricColumn({
    concrete,
    rebar,
    bMm,
    hMm,
    cMm: 35,
    l0Mm,
    NMm,
    MMm,
    symmetric: true
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
          <span className="text-text-main font-semibold">Chương 5: Cấu kiện chịu nén</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 5: Cấu Kiện Chịu Nén
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Tính toán cột bê tông cốt thép nén đúng tâm, nén lệch tâm phẳng (lệch tâm lớn &amp; lệch tâm bé), ảnh hưởng uốn dọc và biểu đồ tương tác N – M.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-5-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.1 Khái niệm</a>
        <a href="#sec-5-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.2 Đặc điểm cấu tạo</a>
        <a href="#sec-5-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.3 Nén đúng tâm</a>
        <a href="#sec-5-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.4 Nén lệch tâm</a>
        <a href="#sec-5-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.5 Tiết diện chữ nhật</a>
        <a href="#sec-5-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">5.6 Biểu đồ N-M &amp; Bài tập</a>
      </div>

      {/* 5.1 KHÁI NIỆM CHUNG */}
      <section id="sec-5-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Khái niệm cấu kiện chịu nén</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Cấu kiện chịu nén là những cấu kiện có nội lực dọc trục chủ đạo là lực nén N (cột nhà dân dụng và công nghiệp, thanh nén của dàn, vòm chịu nén, tường chắn). Tùy thuộc vị trí điểm đặt của lực nén N đối với trọng tâm tiết diện bê tông, ta phân biệt nén đúng tâm (rất hiếm trong thực tế) và nén lệch tâm (phổ biến) (T1 tr.183).
        </p>
      </section>

      {/* 3D VIEWER: RC COLUMN */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-text-main text-lg">Mô hình 3D: Cột Bê Tông Cốt Thép Chịu Lực</h3>
            <p className="text-xs text-text-sub">Quan sát lồng thép đai kín, cốt thép dọc và lực nén lệch tâm N</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
        </div>
        <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
          <ViewerCanvas cameraPosition={[1.8, 1.6, 2.2]}>
            {({ isXray, wireframe }) => (
              <group>
                <RCColumn heightMm={2800} bMm={300} hMm={400} isXray={isXray} wireframe={wireframe} />
                <LoadArrows
                  type="point"
                  positions={[[0.06, 1.4, 0]]}
                  direction="down"
                  label={`N = ${NMm} kN (e0 = ${(MMm * 1000 / Math.max(1, NMm)).toFixed(0)} mm)`}
                />
              </group>
            )}
          </ViewerCanvas>
        </div>
      </div>

      {/* 5.2 ĐẶC ĐIỂM CẤU TẠO */}
      <section id="sec-5-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Đặc điểm cấu tạo cột bê tông cốt thép</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-text-main text-sm">Cốt thép dọc chịu lực</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Đường kính cốt dọc thường dùng <InlineMath math="d \\ge 16\\text{ mm}" /> (tối thiểu <InlineMath math="d=12\\text{ mm}" />).</li>
              <li>Hàm lượng cốt thép hợp lý: <InlineMath math="\\mu = 0.5\\% \\div 2.0\\%" />. Khống chế tối thiểu <InlineMath math="\\mu_{min} = 0.4\\%" /> và tối đa <InlineMath math="\\mu_{max} = 3.0\\%" /> (để tránh nghẹt bê tông khi đổ).</li>
              <li>Khoảng cách giữa các thanh cốt dọc không lớn hơn 400 mm và không nhỏ hơn 50 mm.</li>
            </ul>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-text-main text-sm">Cốt thép đai gián tiếp</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Cốt đai giữ cho cốt dọc không bị phình uốn cục bộ ra ngoài trước khi bê tông đạt tới hạn.</li>
              <li>Đường kính đai <InlineMath math="d_{sw} \\ge 0.25 d_{max}" /> và không nhỏ hơn 6 mm.</li>
              <li>Khoảng cách đai: <InlineMath math="s_w \\le 15 d_{min}" /> và <InlineMath math="s_w \\le 400\\text{ mm}" />. Tại vùng nối chồng cốt thép, bước đai giảm còn <InlineMath math="s_w \\le 10 d_{min}" />.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5.3 NÉN ĐÚNG TÂM */}
      <section id="sec-5-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cấu kiện chịu nén đúng tâm</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Nén đúng tâm chỉ tồn tại trên lý thuyết khi lực nén N trùng tuyệt đối với trọng tâm tiết diện. Khả năng chịu lực nén đúng tâm được tính theo TCXDVN 356:2005 (T1 tr.185):
        </p>

        <FormulaBlock
          number="(5.1)"
          source="T1 tr.185"
          latex={'N \\le \\varphi \\left( R_b A + R_{sc} A_{st} \\right)'}
          description="phi: hệ số uốn dọc phụ thuộc vào độ mảnh lambda = l0 / r (tra bảng hoặc tính toán); Ast: tổng diện tích toàn bộ cốt thép dọc."
          compare5574={true}
        />
      </section>

      {/* 5.4 SỰ LÀM VIỆC NÉN LỆCH TÂM */}
      <section id="sec-5-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Sự làm việc của cấu kiện nén lệch tâm</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Độ lệch tâm tĩnh học ban đầu: <InlineMath math="e_0 = M / N" />. Do sai số thi công và không đồng nhất vật liệu, tiêu chuẩn quy định độ lệch tâm ngẫu nhiên <InlineMath math="e_a" />:
        </p>
        <FormulaBlock
          number="(5.2)"
          source="T1 tr.189"
          latex={'e_a \\ge \\max \\left( \\frac{h}{30}, \\, \\frac{l_0}{600}, \\, 10\\text{ mm} \\right)'}
          description="Độ lệch tâm ban đầu tính toán e1 = e0 + ea. Xét uốn dọc kết cấu thanh mảnh e = eta * e0 + ea."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
            <h4 className="font-bold text-emerald-800 text-sm">Trường hợp 1: Lệch tâm lớn (<InlineMath math="\\xi \\le \\xi_R" />)</h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Xảy ra khi lực nén N nhỏ, mômen M lớn (độ lệch tâm e lớn). Vùng kéo nứt rộng, cốt thép As chảy dẻo trước (<InlineMath math="\\sigma_s = R_s" />), sau đó bê tông vùng nén bị vỡ. Phá hoại dẻo có biến dạng báo trước.
            </p>
          </div>
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-2">
            <h4 className="font-bold text-rose-800 text-sm">Trường hợp 2: Lệch tâm bé (<InlineMath math="\\xi > \\xi_R" />)</h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Xảy ra khi lực nén N rất lớn, mômen M nhỏ (độ lệch tâm e nhỏ). Toàn bộ hoặc phần lớn tiết diện bị nén. Cốt thép As không đạt tới giới hạn chảy dẻo (<InlineMath math="\\sigma_s < R_s" />). Phá hoại giòn đột ngột do bê tông nát vụn.
            </p>
          </div>
        </div>
      </section>

      {/* 5.5 TIẾT DIỆN CHỮ NHẬT & CALCULATOR */}
      <section id="sec-5-5" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tính toán tiết diện chữ nhật chịu nén lệch tâm phẳng</h2>
        </div>

        {/* CÔNG CỤ TÍNH CỘT LỆCH TÂM */}
        <div className="bg-surface p-6 rounded-2xl border border-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-serif font-bold text-base text-text-main flex items-center gap-2">
              <span>⚡</span>
              <span>Máy tính thiết kế cốt thép cột (Bố trí đối xứng As = As')</span>
            </h3>
            <span className="text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-semibold">TCXDVN 356:2005</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-text-sub mb-1">Cấp bê tông</label>
              <select
                value={concrete}
                onChange={e => setConcrete(e.target.value as any)}
                className="w-full p-2 bg-bg border border-border rounded-lg font-mono font-semibold"
              >
                <option value="B20">B20 (Rb = 11.5 MPa)</option>
                <option value="B25">B25 (Rb = 14.5 MPa)</option>
                <option value="B30">B30 (Rb = 17.0 MPa)</option>
              </select>
            </div>
            <div>
              <label className="block text-text-sub mb-1">Nhóm thép</label>
              <select
                value={rebar}
                onChange={e => setRebar(e.target.value as any)}
                className="w-full p-2 bg-bg border border-border rounded-lg font-mono font-semibold"
              >
                <option value="CII">CII / CB300 (Rs=280 MPa)</option>
                <option value="CIII">CIII / CB400 (Rs=365 MPa)</option>
              </select>
            </div>
            <div>
              <label className="block text-text-sub mb-1">Kích thước b x h (mm)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={bMm}
                  onChange={e => setBMm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded-lg font-mono text-center"
                  placeholder="b"
                />
                <input
                  type="number"
                  value={hMm}
                  onChange={e => setHMm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded-lg font-mono text-center"
                  placeholder="h"
                />
              </div>
            </div>
            <div>
              <label className="block text-text-sub mb-1">N (kN) &amp; M (kNm)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={NMm}
                  onChange={e => setNMm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded-lg font-mono text-center"
                  placeholder="N"
                />
                <input
                  type="number"
                  value={MMm}
                  onChange={e => setMMm(Number(e.target.value))}
                  className="w-1/2 p-2 bg-bg border border-border rounded-lg font-mono text-center"
                  placeholder="M"
                />
              </div>
            </div>
          </div>

          {/* KẾT QUẢ TÍNH */}
          <div className="p-4 bg-bg rounded-xl border border-border space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-[11px] text-text-sub">Độ lệch tâm e0</div>
                <div className="font-mono font-bold text-text-main text-base">{calcResult.e0_mm} mm</div>
              </div>
              <div>
                <div className="text-[11px] text-text-sub">Hệ số uốn dọc eta</div>
                <div className="font-mono font-bold text-text-main text-base">{calcResult.eta}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-sub">Trạng thái</div>
                <div className={`font-mono font-bold text-xs p-1 rounded ${calcResult.isLargeEccentric ? 'text-emerald-700 bg-emerald-100' : 'text-amber-700 bg-amber-100'}`}>
                  {calcResult.isLargeEccentric ? 'Lệch tâm lớn (xi <= xi_R)' : 'Lệch tâm bé (xi > xi_R)'}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-text-sub">Thép mỗi phía As = As'</div>
                <div className="font-mono font-bold text-primary text-base">{calcResult.As_mm2} mm²</div>
              </div>
            </div>
            <div className="text-xs text-text-sub text-center border-t border-border pt-2">
              Tổng diện tích thép: <strong>{calcResult.totalAs_mm2} mm²</strong> | Hàm lượng: <strong>{calcResult.mu_pct}%</strong>
              {calcResult.mu_pct < 0.4 && <span className="text-amber-600 ml-2">(Đã ép khống chế mu_min = 0.4%)</span>}
            </div>
          </div>
        </div>
      </section>

      {/* 5.6 BIỂU ĐỒ TƯƠNG TÁC N - M & BÀI TẬP VÍ DỤ */}
      <section id="sec-5-6" className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">5.6</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Biểu đồ tương tác N – M và Bài tập ví dụ</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Biểu đồ tương tác N – M là đường cong bao thể hiện khả năng chịu lực đồng thời của lực nén N và mômen M. Mọi cặp nội lực <InlineMath math="(N, M)" /> nằm bên trong đường cong tương tác là an toàn, nằm bên ngoài là tiết diện bị phá hoại (T1 tr.210):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-surface rounded-lg border border-border">
            <span className="font-bold text-primary">Điểm A (M=0, N = N0):</span>
            <p className="text-text-sub mt-1">Nén đúng tâm thuần túy. Khả năng chịu lực nén đạt cực đại.</p>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <span className="font-bold text-amber-600">Điểm B (Điểm cân bằng xi = xi_R):</span>
            <p className="text-text-sub mt-1">Cốt thép kéo vừa bắt đầu chảy dẻo cùng lúc bê tông vùng nén bị phá hoại. Tiết diện chịu mômen M max.</p>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <span className="font-bold text-rose-600">Điểm C (N=0, M = M0):</span>
            <p className="text-text-sub mt-1">Uốn thuần túy (như dầm chịu uốn bình thường).</p>
          </div>
        </div>

        {/* BÀI TẬP VÍ DỤ TỪ SÁCH VÕ BÁ TẦM */}
        <ExampleBlock
          number="Ví dụ 5.1"
          title="Thiết kế cốt thép đối xứng cột chữ nhật chịu nén lệch tâm phẳng"
          bookRef="T1 tr.215"
          given="Cột tầng trệt kích thước b = 300 mm, h = 400 mm; chiều dài tính toán l0 = 3.6 m. Vật liệu: Bê tông B20 (Rb = 11.5 MPa), Thép CII (Rs = Rsc = 280 MPa). Lớp bảo vệ a = a' = 40 mm (h0 = 360 mm). Nội lực tính toán: N = 750 kN, M = 110 kNm."
          solution={[
            '1. Tính độ lệch tâm tĩnh học: e0 = M / N = 110 / 750 = 0.147 m = 147 mm.',
            '2. Độ lệch tâm ngẫu nhiên: ea = max(h/30, l0/600, 10mm) = max(400/30 = 13.3, 3600/600 = 6, 10) = 14 mm.',
            '3. Xét uốn dọc: lambda = l0 / (0.288 * h) = 3600 / (0.288 * 400) = 31.25 > 14 => Tính được hệ số eta = 1.08.',
            '4. Độ lệch tâm tính toán: e = eta * e0 + ea = 1.08 * 147 + 14 = 173 mm.',
            '5. Khoảng cách đến As: es = e + h/2 - a = 173 + 200 - 40 = 333 mm.',
            '6. Chiều cao vùng nén x = N / (Rb * b) = (750 * 10^3) / (11.5 * 300) = 217.4 mm => xi = x / h0 = 217.4 / 360 = 0.604 <= xi_R (0.648) => Cột lệch tâm lớn!',
            '7. Diện tích cốt thép đối xứng As = As\': As = [N * es - Rb * b * x * (h0 - 0.5*x)] / [Rs * (h0 - a\')] = [750e3 * 333 - 11.5 * 300 * 217.4 * (360 - 108.7)] / [280 * 320] = 682 mm².',
            '8. Chọn cốt thép: Chọn 2 phi 22 (As = 760 mm²) cho mỗi bên. Tổng thép 4 phi 22 (As_tot = 1520 mm²), hàm lượng mu = 1.27% (thỏa mãn 0.4% <= mu <= 3%).'
          ]}
        />
      </section>

      {/* CẤU TẠO & LỖI THƯỜNG GẶP */}
      <ConstructionNote title="Cấu tạo cột chống động đất">
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Tại vùng đầu cột và chân cột (trong đoạn dài tối thiểu 500 mm hoặc max(h, l/6)): bước đai phải dày hơn, giảm xuống s &le; 100 mm.</li>
          <li>Đoạn nối cốt thép dọc nên bố trí ở giữa chiều cao cột (nơi mômen uốn do lực ngang gió/động đất thường nhỏ nhất).</li>
          <li>Móc đai phải uốn góc 135° với đoạn móc thẳng dài tối thiểu 10d để không bị bung khi chấn động.</li>
        </ul>
      </ConstructionNote>

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Bỏ qua độ lệch tâm ngẫu nhiên ea khi tính cột nén đúng tâm.',
            consequence: 'Cột bị nứt hoặc cong gãy bất ngờ do mômen phụ không được tính đến trong thiết kế.',
            correction: 'Luôn xét ea = max(h/30, l0/600, 10mm) và tính toán theo cấu kiện lệch tâm bé nếu e0 quá nhỏ.',
            bookRef: 'T1 tr.189'
          },
          {
            mistake: 'Không giảm bước cốt đai tại vùng nối chồng cốt thép dọc.',
            consequence: 'Ứng suất nén truyền qua mối nối làm toác lớp bê tông bảo vệ và phình vỡ cốt dọc.',
            correction: 'Tại đoạn nối chồng, khoảng cách đai tối đa s <= 10 d_min.',
            bookRef: 'T1 tr.187'
          }
        ]}
      />

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 5"
        cards={[
          { front: 'Cột nén lệch tâm lớn khác lệch tâm bé ở điểm nào?', back: 'Lệch tâm lớn xi <= xi_R: cốt thép kéo chảy dẻo trước khi bê tông nén vỡ (phá hoại dẻo). Lệch tâm bé xi > xi_R: cốt kéo không chảy, bê tông nén vỡ đột ngột (phá hoại giòn).' },
          { front: 'Hàm lượng cốt thép tối thiểu trong cột là bao nhiêu?', back: 'mu_min = 0.4% cho toàn tiết diện, hoặc 0.2% cho mỗi bên theo TCXDVN 356:2005.' },
          { front: 'Độ lệch tâm ngẫu nhiên ea được quy định như thế nào?', back: 'ea >= max(h/30, l0/600, 10mm).' },
          { front: 'Tác dụng chủ yếu của cốt thép đai trong cột?', back: 'Giữ ổn định chống phình uốn dọc cho các thanh thép chịu nén và kiềm chế nở hông cho lõi bê tông.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 5"
        questions={[
          {
            question: 'Khi tính toán cột nén lệch tâm, nếu xi <= xi_R thì thuộc trường hợp nào?',
            options: ['Lệch tâm bé', 'Lệch tâm lớn', 'Nén đúng tâm thuần túy', 'Uốn thuần túy'],
            correctIndex: 1,
            explanation: 'xi <= xi_R là trường hợp lệch tâm lớn, cốt thép chịu kéo đạt tới giới hạn chảy dẻo Rs.'
          },
          {
            question: 'Tại sao tại vùng nối chồng cốt thép cột phải giảm khoảng cách bước cốt đai?',
            options: ['Để tăng trọng lượng cột', 'Để giữ chặt các thanh nối chồng tránh bị bung toác bê tông khi chịu lực nén lớn', 'Để chống thấm nước', 'Để giảm giá thành'],
            correctIndex: 1,
            explanation: 'Vùng nối chồng có số lượng thanh thép tăng gấp đôi, cốt đai dày giúp kiềm chế ứng suất chẻ tách bê tông cục bộ.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/chuong-5" />
    </div>
  );
};
