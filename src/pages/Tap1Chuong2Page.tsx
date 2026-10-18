import { InlineMath } from '../components/InlineMath';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StandardBanner } from '../components/StandardBanner';
import { FormulaBlock } from '../components/FormulaBlock';
import { ConstructionNote } from '../components/ConstructionNote';
import { CommonMistakes } from '../components/CommonMistakes';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { QuizBlock } from '../components/QuizBlock';
import { ChapterPagination } from '../components/ChapterPagination';
import { CONCRETE_TABLE, REBAR_TABLE } from '../calc/materials';

export const Tap1Chuong2Page: React.FC = () => {
  const [selectedConcrete, setSelectedConcrete] = useState('B20');
  const [selectedRebar, setSelectedRebar] = useState('CII');

  const conc = CONCRETE_TABLE[selectedConcrete] || CONCRETE_TABLE.B20;
  const reb = REBAR_TABLE[selectedRebar] || REBAR_TABLE.CII;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER & BREADCRUMBS */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Chương 2: Tính chất cơ lý của vật liệu</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Chương 2: Tính Chất Cơ Lý Của Bê Tông &amp; Cốt Thép
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Nghiên cứu bản chất cường độ, cấp độ bền, biến dạng từ biến, co ngót của bê tông và biểu đồ làm việc của thép.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* SECTION TABS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-2-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.1 Cơ lý BT</a>
        <a href="#sec-2-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.2 Cường độ BT</a>
        <a href="#sec-2-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.3 Cấp độ bền B &amp; Mác M</a>
        <a href="#sec-2-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.4 Yếu tố ảnh hưởng</a>
        <a href="#sec-2-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.5 Ứng suất phức tạp</a>
        <a href="#sec-2-6" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.6 Biến dạng BT</a>
        <a href="#sec-2-7" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.7 Môđun Eb</a>
        <a href="#sec-2-8" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.8 Biểu đồ sigma-epsilon thép</a>
        <a href="#sec-2-9" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.9 Cường độ TC</a>
        <a href="#sec-2-10" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.10 Cường độ TT</a>
        <a href="#sec-2-11" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.11 Môđun Es</a>
        <a href="#sec-2-12" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">2.12 Làm việc đồng thời</a>
      </div>

      {/* 2.1 TÍNH CHẤT CƠ LÝ CỦA BÊ TÔNG */}
      <section id="sec-2-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Tính chất cơ lý của bê tông</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Bê tông là vật liệu đá nhân tạo dị tính được tạo thành từ hỗn hợp xi măng, nước, cốt liệu thô (đá dăm, sỏi) và cốt liệu mịn (cát). Quá trình thủy hóa xi măng tạo thành gel keo kết dính các hạt cốt liệu lại với nhau tạo nên cấu trúc xốp có nhiều vi lỗ rỗng (T1 tr.18).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface rounded-xl border border-border">
            <h4 className="font-semibold text-text-main mb-1">Cấu trúc dị tính</h4>
            <p className="text-xs text-text-sub">Gồm 3 pha: pha cốt liệu đặc chắc, pha đá xi măng xốp, và vùng tiếp giáp (Interfacial Transition Zone - ITZ) yếu nhất.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border">
            <h4 className="font-semibold text-text-main mb-1">Tính giòn</h4>
            <p className="text-xs text-text-sub">Biến dạng phá hoại dẻo rất bé khi chịu nén và gần như bằng 0 khi chịu kéo. Bê tông nứt gãy đột ngột mà không báo trước.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border">
            <h4 className="font-semibold text-text-main mb-1">Biến dạng theo thời gian</h4>
            <p className="text-xs text-text-sub">Không chỉ biến dạng đàn hồi tức thời mà còn co ngót (mất nước) và từ biến (chảy dẻo nhớt dưới tải trọng kéo dài nhiều năm).</p>
          </div>
        </div>
      </section>

      {/* 2.2 CƯỜNG ĐỘ BÊ TÔNG */}
      <section id="sec-2-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cường độ bê tông</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Cường độ bê tông là khả năng chống lại sự phá hoại dưới tác dụng của ứng suất ngoại lực. Bê tông có cường độ chịu nén cao hơn rất nhiều lần so với cường độ chịu kéo:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-primary">Cường độ nén khối lập phương R</h4>
            <p className="text-xs text-text-sub">
              Xác định bằng thí nghiệm nén mẫu lập phương kích thước chuẩn 150x150x150 mm ở tuổi 28 ngày, dưỡng hộ tiêu chuẩn (27°C, độ ẩm &ge; 95%).
            </p>
            <FormulaBlock
              number="(2.1)"
              source="T1 tr.20"
              latex={'R = \\frac{P}{A} \\quad \\text{(MPa)}'}
              description="Mẫu có đệm ma sát ở 2 đầu sẽ chịu hiệu ứng kiềm chế nở ngang, cho cường độ cao hơn mẫu bôi dầu trơn."
            />
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-accent">Cường độ nén lăng trụ (Lăng trụ Rb)</h4>
            <p className="text-xs text-text-sub">
              Mẫu lăng trụ 150x150x600 mm (tỷ lệ h/a = 4). Phản ánh đúng trạng thái ứng suất 1 trục trong dầm và cột thực tế (không bị ảnh hưởng lực ma sát của thớt máy nén).
            </p>
            <FormulaBlock
              number="(2.2)"
              source="T1 tr.22"
              latex={'R_{pr} \\approx (0.75 \\div 0.80) R'}
              description="TCXDVN 356:2005 dùng cường độ lăng trụ làm cơ sở quy đổi sang cường độ tính toán chịu nén Rb."
            />
          </div>
        </div>
      </section>

      {/* 2.3 CẤP ĐỘ BỀN VÀ MÁC */}
      <section id="sec-2-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cấp độ bền (B) và Mác bê tông (M)</h2>
        </div>
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-sm">
          <div className="font-semibold text-amber-600 flex items-center gap-2">
            <span>[đối chiếu 5574:2018]</span> Cấp độ bền chịu nén B
          </div>
          <p className="text-text-sub">
            <strong>Mác M (TCVN 5574:1991):</strong> Cường độ trung bình nén mẫu lập phương 150 mm (kg/cm2) với xác suất bảo đảm 50%.<br />
            <strong>Cấp độ bền B (TCXDVN 356:2005 &amp; TCVN 5574:2018):</strong> Cường độ nén mẫu lập phương (MPa) với xác suất bảo đảm không dưới 95%.
          </p>
        </div>

        <FormulaBlock
          number="(2.3)"
          source="T1 tr.25"
          latex={'B \\approx 0.0787 \\cdot M \\quad \\Longleftrightarrow \\quad M \\approx 12.7 \\cdot B'}
          description="Ví dụ: Mác 200 tương đương B15; Mác 250 tương đương B20; Mác 300 tương đương B22.5 - B25; Mác 350 tương đương B25; Mác 400 tương đương B30."
          compare5574={true}
        />

        {/* BẢNG TƯƠNG TÁC TRA CẤP ĐỘ BỀN */}
        <div className="p-4 bg-surface rounded-xl border border-border space-y-4">
          <h4 className="font-semibold text-sm">Bảng tra nhanh cấp độ bền theo TCXDVN 356:2005:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(CONCRETE_TABLE).map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedConcrete(grade)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedConcrete === grade ? 'bg-primary text-white shadow-sm' : 'bg-bg text-text-sub border border-border hover:border-primary'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-bg p-3 rounded-lg border border-border text-center">
            <div>
              <div className="text-xs text-text-sub">Cấp độ bền</div>
              <div className="font-mono font-bold text-primary text-base">{conc.grade}</div>
            </div>
            <div>
              <div className="text-xs text-text-sub">Rb (Chịu nén)</div>
              <div className="font-mono font-bold text-text-main text-base">{conc.Rb} MPa</div>
            </div>
            <div>
              <div className="text-xs text-text-sub">Rbt (Chịu kéo)</div>
              <div className="font-mono font-bold text-text-main text-base">{conc.Rbt} MPa</div>
            </div>
            <div>
              <div className="text-xs text-text-sub">Eb (Môđun đàn hồi)</div>
              <div className="font-mono font-bold text-text-main text-base">{(conc.Eb / 1000).toFixed(1)} GPa</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.4 NHÂN TỐ ẢNH HƯỞNG */}
      <section id="sec-2-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Nhân tố ảnh hưởng đến cường độ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h5 className="font-semibold text-text-main">1. Tỷ lệ Nước/Xi măng (N/X):</h5>
            <p>Yếu tố quyết định nhất. Tỷ lệ N/X càng nhỏ thì cường độ càng cao (theo công thức Bolomey-Skramtaev). Tuy nhiên N/X quá nhỏ gây khó đầm lèn xốp rỗ.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h5 className="font-semibold text-text-main">2. Chất lượng xi măng và cốt liệu:</h5>
            <p>Mác xi măng càng cao cường độ càng lớn. Đá dăm dăm cạnh cho độ bám dính cao hơn sỏi cuội tròn nhẵn 15-20%.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h5 className="font-semibold text-text-main">3. Tuổi của bê tông:</h5>
            <p>Cường độ tăng theo quy luật hàm logarit thời gian: <InlineMath math="R_n = R_{28} \\cdot \\frac{\\lg n}{\\lg 28}" />. Sau 28 ngày cường độ vẫn tiếp tục tăng chậm nếu còn ẩm.</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h5 className="font-semibold text-text-main">4. Tốc độ gia tải &amp; Chế độ dưỡng hộ:</h5>
            <p>Gia tải càng nhanh cường độ ghi nhận càng cao. Tải trọng tác dụng lâu dài làm giảm cường độ khoảng 10-15% do hiện tượng từ biến vi nứt phá hoại.</p>
          </div>
        </div>
      </section>

      {/* 2.5 TRẠNG THÁI ỨNG SUẤT PHỨC TẠP */}
      <section id="sec-2-5" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Trạng thái ứng suất phức tạp</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Trong thực tế, bê tông hiếm khi chịu nén đơn trục 1D mà thường chịu nén 2 trục (như bản sàn hai phương) hoặc nén 3 trục thể tích (như vùng bê tông trong đai xoắn ốc hoặc chân cột):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-emerald-600">Nén 3 trục (Nén thể tích)</h4>
            <p className="text-xs text-text-sub">
              Sự nở ngang bị kiềm chế triệt để giúp cường độ chịu nén dọc trục tăng gấp 2 - 3 lần so với nén đơn trục. Ứng dụng để thiết kế cốt đai gián tiếp (cốt thép lưới hàn, cốt đai xoắn ốc).
            </p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-rose-600">Nén - Kéo kết hợp</h4>
            <p className="text-xs text-text-sub">
              Ứng suất kéo theo một phương làm giảm đáng kể khả năng chịu nén theo phương trực giao. Vùng nén uốn ở dầm chịu lực cắt lớn thường bị phá hoại sớm hơn vì hiệu ứng này.
            </p>
          </div>
        </div>
      </section>

      {/* 2.6 BIẾN DẠNG CỦA BÊ TÔNG */}
      <section id="sec-2-6" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.6</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Biến dạng của bê tông</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-text-main">Co ngót bê tông (Shrinkage)</h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Hiện tượng thể tích bê tông tự co lại trong quá trình đóng rắn do mất nước tự do ra môi trường. Co ngót gây ứng suất kéo tự sinh trong lòng bê tông, dẫn đến nứt bề mặt nếu không bảo dưỡng ẩm đầy đủ.
            </p>
            <div className="text-xs text-primary font-medium">Hệ quả: Cần bố trí khe co giãn nhiệt độ cách nhau không quá 35 - 50m.</div>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-text-main">Từ biến bê tông (Creep)</h4>
            <p className="text-xs text-text-sub leading-relaxed">
              Hiện tượng biến dạng tăng dần theo thời gian dưới tác dụng của ứng suất nén không đổi kéo dài. Từ biến làm độ võng của sàn và dầm tăng gấp 2 - 3 lần độ võng tức thời ban đầu.
            </p>
            <div className="text-xs text-accent font-medium">Hệ quả: Truyền bớt ứng suất nén từ bê tông sang cốt thép chịu nén.</div>
          </div>
        </div>
      </section>

      {/* 2.7 MÔĐUN ĐÀN HỒI Eb */}
      <section id="sec-2-7" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.7</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Môđun đàn hồi Eb</h2>
        </div>
        <p className="text-text-sub text-sm">
          Bê tông là vật liệu đàn hồi dẻo nên quan hệ ứng suất - biến dạng là đường cong. Môđun đàn hồi ban đầu Eb được xác định tại gốc tọa độ (sigma = 0):
        </p>
        <FormulaBlock
          number="(2.4)"
          source="T1 tr.34"
          latex={'E_b = \\tan \\alpha_0 = \\left. \\frac{d\\sigma_b}{d\\varepsilon_b} \\right|_{\\sigma_b=0}'}
          description="Khi tính toán với tải trọng dài hạn có xét từ biến, môđun biến dạng giảm xuống Eb,red = Eb / (1 + phi_cr) với hệ số từ biến phi_cr = 1.5 - 2.5."
        />
      </section>

      {/* B. CỐT THÉP: 2.8 - 2.11 */}
      <section id="sec-2-8" className="space-y-4 pt-8 border-t-2 border-primary/20">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.8</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Biểu đồ ứng suất – biến dạng của cốt thép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Cốt thép chia làm 2 nhóm chính dựa theo biểu đồ kéo nén kéo dài:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-primary text-sm">Thép có thềm chảy rõ rệt (Thép mềm: CI, CII, CIII, CB240-T, CB300-V, CB400-V)</h4>
            <p className="text-text-sub">
              Biểu đồ gồm đoạn đàn hồi dốc thẳng đến giới hạn chảy <InlineMath math="\\sigma_y" />, sau đó nằm ngang (thềm chảy kéo dài với <InlineMath math="\\varepsilon_y \\approx 0.0015 \\div 0.002" />) rồi củng cố đến giới hạn bền <InlineMath math="\\sigma_u" />.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-semibold text-accent text-sm">Thép không có thềm chảy (Thép rắn, thép cường độ cao: CIV, cáp DƯL)</h4>
            <p className="text-text-sub">
              Biểu đồ cong dần mà không có thềm chảy ngang. Tiêu chuẩn quy định giới hạn chảy quy ước <InlineMath math="\\sigma_{0.2}" /> là ứng suất ứng với độ biến dạng dư 0.2%.
            </p>
          </div>
        </div>
      </section>

      {/* 2.9, 2.10, 2.11 CƯỜNG ĐỘ TIÊU CHUẨN, TÍNH TOÁN & Es */}
      <section id="sec-2-10" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.10</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Cường độ tiêu chuẩn (Rsn) và Tính toán (Rs, Rsc, Rsw)</h2>
        </div>
        <div className="p-4 bg-surface rounded-xl border border-border space-y-4">
          <h4 className="font-semibold text-sm">Bảng tra nhóm cốt thép theo TCXDVN 356:2005:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(REBAR_TABLE).map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedRebar(grade)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedRebar === grade ? 'bg-primary text-white shadow-sm' : 'bg-bg text-text-sub border border-border hover:border-primary'
                }`}
              >
                {grade} ({REBAR_TABLE[grade].symbol})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-bg p-3 rounded-lg border border-border text-center">
            <div>
              <div className="text-xs text-text-sub">Nhóm thép</div>
              <div className="font-mono font-bold text-primary text-base">{reb.grade} ({reb.symbol})</div>
            </div>
            <div>
              <div className="text-xs text-text-sub">Rs (Kéo tính toán)</div>
              <div className="font-mono font-bold text-text-main text-base">{reb.Rs} MPa</div>
            </div>
            <div>
              <div className="text-xs text-text-sub">Rsc (Nén tính toán)</div>
              <div className="font-mono font-bold text-text-main text-base">{reb.Rsc} MPa</div>
            </div>
            <div>
              <div className="text-xs text-text-sub">Rsw (Cốt đai)</div>
              <div className="font-mono font-bold text-text-main text-base">{reb.Rsw} MPa</div>
            </div>
          </div>
        </div>

        <FormulaBlock
          number="(2.5)"
          source="T1 tr.42"
          latex={'R_s = \\frac{R_{sn}}{\\gamma_s} \\quad ; \\quad E_s = 2.0 \\times 10^5 \\div 2.1 \\times 10^5 \\text{ MPa}'}
          description="Hệ số an toàn cốt thép gamma_s = 1.05 - 1.2 tuỳ nhóm thép theo TCXDVN 356:2005."
        />
      </section>

      {/* 2.12 SỰ LÀM VIỆC ĐỒNG THỜI */}
      <section id="sec-2-12" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">2.12</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Sự làm việc đồng thời giữa bê tông và cốt thép</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Bê tông và cốt thép là hai vật liệu có tính chất rất khác nhau nhưng phối hợp tuyệt vời trong kết cấu chịu lực nhờ 3 yếu tố cốt lõi:
        </p>
        <ul className="space-y-2 list-disc list-inside text-sm text-text-sub">
          <li><strong>Lực bám dính chắc chắn:</strong> Nhờ lực ma sát, lực dính keo xi măng và đặc biệt là chốt ngàm cơ học giữa gờ thanh thép với bê tông (T1 tr.45).</li>
          <li><strong>Hệ số giãn nở nhiệt xấp xỉ bằng nhau:</strong> <InlineMath math="\\alpha_{t,bt} \\approx 1.0 \\times 10^{-5} / ^\\circ\\text{C}" /> và <InlineMath math="\\alpha_{t,st} \\approx 1.2 \\times 10^{-5} / ^\\circ\\text{C}" />. Khi nhiệt độ môi trường biến động từ -20°C đến +60°C không sinh ra ứng suất trượt phá hoại lực dính.</li>
          <li><strong>Bảo vệ chống rỉ ăn mòn:</strong> Lớp bê tông bao bọc có tính kiềm cao (pH 12 - 13) tạo màng thụ động hóa bảo vệ thép không bị oxy hóa rỉ sét trong hàng chục năm.</li>
        </ul>
      </section>

      {/* COMMON MISTAKES & CONSTRUCTION NOTES */}
      <ConstructionNote title="Lớp bê tông bảo vệ và neo cốt thép">
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Lớp bê tông bảo vệ c không được nhỏ hơn đường kính thanh thép d và không nhỏ hơn 15mm (bản), 20mm (dầm cột).</li>
          <li>Với môi trường biển hoặc ăn mòn cao, chiều dày lớp bảo vệ phải tăng thêm ít nhất 10 - 15mm.</li>
          <li>Khi đúc mẫu thí nghiệm nén tại công trường, phải đầm mẫu đồng nhất với cấu kiện thật.</li>
        </ul>
      </ConstructionNote>

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Lấy trực tiếp Mác bê tông M250 đưa vào công thức tính toán uốn như là Rb = 25 MPa.',
            consequence: 'Tính sai khả năng chịu lực nghiêm trọng, kết cấu có nguy cơ sụp đổ.',
            correction: 'Mác M250 tương đương B20 có Rb = 11.5 MPa theo TCXDVN 356:2005.',
            bookRef: 'T1 tr.25'
          },
          {
            mistake: 'Nối buộc cốt thép tại vị trí có ứng suất kéo lớn nhất ở giữa nhịp dầm.',
            consequence: 'Gây tuột neo hoặc nứt gãy tiết diện dầm dưới tải trọng lớn.',
            correction: 'Nối so le và chuyển vị trí nối sang vùng mômen nhỏ hơn.',
            bookRef: 'T1 tr.48'
          }
        ]}
      />

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Chương 2"
        cards={[
          { front: 'Cường độ lăng trụ Rpr so với lập phương R?', back: 'Rpr ≈ (0.75 - 0.80) R do loại trừ ảnh hưởng ma sát kiềm chế nở ngang của thớt máy ép.' },
          { front: 'Cấp độ bền B20 có Rb và Rbt bằng bao nhiêu?', back: 'Rb = 11.5 MPa, Rbt = 0.90 MPa theo TCXDVN 356:2005.' },
          { front: 'Thép CII / CB300-V có Rs tính toán là bao nhiêu?', back: 'Rs = 280 MPa (CII) hoặc 260-280 MPa (CB300).' },
          { front: 'Tại sao từ biến làm tăng độ võng dầm theo thời gian?', back: 'Vì bê tông tiếp tục biến dạng dẻo dưới ứng suất nén không đổi, làm trục trung hòa dịch chuyển và giảm độ cứng uốn B.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Chương 2"
        questions={[
          {
            question: 'Tại sao bê tông và cốt thép có thể cùng làm việc được với nhau trong kết cấu?',
            options: [
              'Vì cường độ của chúng bằng nhau',
              'Vì có lực dính, hệ số giãn nở nhiệt xấp xỉ nhau, và bê tông bảo vệ thép chống rỉ',
              'Vì giá thành của chúng đều rẻ',
              'Vì chúng đều là kim loại'
            ],
            correctIndex: 1,
            explanation: 'Ba nguyên nhân cơ bản: lực dính chặt, hệ số giãn nở nhiệt tương đương (1.0-1.2 x 10^-5 / °C), và môi trường kiềm bảo vệ cốt thép.'
          },
          {
            question: 'Mác bê tông M300 xấp xỉ cấp độ bền nào theo TCXDVN 356:2005?',
            options: ['B15', 'B20', 'B22.5 hoặc B25', 'B35'],
            correctIndex: 2,
            explanation: 'B ≈ 0.0787 * M. Với M=300: B ≈ 23.6 MPa, tương đương cấp B22.5 hoặc B25.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/chuong-2" />
    </div>
  );
};
