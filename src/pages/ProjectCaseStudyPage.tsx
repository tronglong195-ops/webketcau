import React, { useState } from 'react';
import { StandardBanner } from '../components/StandardBanner';
import { FormulaBlock } from '../components/FormulaBlock';
import { InlineMath } from '../components/InlineMath';
import { ViewerCanvas } from '../three/common/ViewerCanvas';
import { RCSlab } from '../three/elements/RCSlab';
import { RCBeam } from '../three/elements/RCBeam';
import { RCColumn } from '../three/elements/RCColumn';
import { Footing } from '../three/elements/Footing';
import { Stair } from '../three/elements/Stair';
import { Tank } from '../three/elements/Tank';

type TabType = 'tong-quan' | 'san' | 'dam-phu' | 'dam-chinh' | 'cot' | 'mong' | 'dac-biet';

export const ProjectCaseStudyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tong-quan');

  // Interactive state for Column Calculator
  const [colN, setColN] = useState<number>(1250);
  const [colM, setColM] = useState<number>(145);
  const [colB, setColB] = useState<number>(300);
  const [colH, setColH] = useState<number>(400);

  // 3D Visual States for Case Study
  const [showPunchingCone, setShowPunchingCone] = useState<boolean>(false);
  const [stairHandrail, setStairHandrail] = useState<boolean>(true);
  const [tankCaseType, setTankCaseType] = useState<'rectangular' | 'circular'>('rectangular');
  const [tankCutaway, setTankCutaway] = useState<boolean>(false);
  const [tankRoof, setTankRoof] = useState<boolean>(true);
  const [tankPipes, setTankPipes] = useState<boolean>(true);
  const [tankRebars, setTankRebars] = useState<boolean>(true);

  // Quick Column Calculation according to TCXDVN 356:2005
  const Rb = 11.5; // MPa (B20)
  const Rs = 280;  // MPa (CB300 / CII)
  const aCol = 40;  // mm
  const h0Col = colH - aCol;
  const e0 = colN > 0 ? (colM * 1e3) / colN : 0; // mm
  const ea = Math.max(colH / 30, 10); // mm
  const e1 = Math.max(e0, ea);
  const eta = 1.05; // Giả định hệ số uốn dọc cột ngắn tầng 1
  const e = eta * e0 + (colH / 2 - aCol);
  const xiR = 0.513; // B20 + CB300
  const xCol = (colN * 1e3) / (Rb * colB);
  const xiCol = xCol / h0Col;
  const isLargeEccentric = xiCol <= xiR;

  // Tính As đối xứng sơ bộ
  let AsEachSide = 0;
  if (isLargeEccentric) {
    const numer = colN * 1e3 * (e - h0Col + 0.5 * xCol);
    const denom = Rs * (h0Col - aCol);
    AsEachSide = Math.max(0, Math.round(numer / denom));
  } else {
    // Lệch tâm bé
    const numer = colN * 1e3 * e - 0.5 * Rb * colB * h0Col * h0Col;
    const denom = Rs * (h0Col - aCol);
    AsEachSide = Math.max(0, Math.round(numer / denom));
  }
  const totalAs = AsEachSide * 2;
  const muPct = ((totalAs / (colB * colH)) * 100).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-indigo-900 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <span>🏗️ DỰ ÁN MẪU TỔNG HỢP</span>
            <span>•</span>
            <span>KẾT CẤU BÊ TÔNG CỐT THÉP VÕ BÁ TẦM</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-tight">
            Nghiên Cứu & Tính Toán Dự Án Nhà Văn Phòng 5 Tầng
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-3xl leading-relaxed">
            Hồ sơ tính toán kết cấu thực chiến xuyên suốt 3 tập sách: từ mặt bằng sàn sườn, dầm phụ, dầm chính khung, cột nén lệch tâm, móng đơn nông, đến cầu thang bộ và bể nước mái. Kèm mô hình 3D tương tác và công cụ tính toán động.
          </p>
        </div>
      </div>

      <StandardBanner volume="tap1" />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border">
        {[
          { id: 'tong-quan', label: '1. Mặt Bằng & Tải Trọng', icon: '📋' },
          { id: 'san', label: '2. Bản Sàn (T1 C9 & T2 C1)', icon: '🟦' },
          { id: 'dam-phu', label: '3. Dầm Phụ (T1 C4 & Đồ Án)', icon: '➖' },
          { id: 'dam-chinh', label: '4. Dầm Chính Khung (T1 C4 & T2 C2)', icon: '📐' },
          { id: 'cot', label: '5. Cột Nén Lệch Tâm (T1 C5)', icon: '🏛️' },
          { id: 'mong', label: '6. Móng Đơn BTCT (T2 C3)', icon: '🧱' },
          { id: 'dac-biet', label: '7. Cầu Thang & Bể Nước (T3)', icon: '🪜' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface hover:bg-bg text-text-muted hover:text-text-main border border-border'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: TỔNG QUAN DỰ ÁN */}
      {activeTab === 'tong-quan' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2">
                  <span>🏢</span> 1. Nhiệm Vụ Thiết Kế & Quy Mô Công Trình
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-bg rounded-xl border border-border/80">
                    <span className="text-text-muted text-xs block">Loại công trình:</span>
                    <strong className="text-text-main">Tòa nhà văn phòng làm việc 5 tầng</strong>
                  </div>
                  <div className="p-3 bg-bg rounded-xl border border-border/80">
                    <span className="text-text-muted text-xs block">Lưới cột mặt bằng:</span>
                    <strong className="text-text-main"><InlineMath math="6.0\text{ m} \times 6.0\text{ m}" /> (4 nhịp × 3 bước)</strong>
                  </div>
                  <div className="p-3 bg-bg rounded-xl border border-border/80">
                    <span className="text-text-muted text-xs block">Chiều cao tầng:</span>
                    <strong className="text-text-main"><InlineMath math="H = 3.6\text{ m}" /> (Tổng chiều cao <InlineMath math="18.0\text{ m}" />)</strong>
                  </div>
                  <div className="p-3 bg-bg rounded-xl border border-border/80">
                    <span className="text-text-muted text-xs block">Địa chất công trình:</span>
                    <strong className="text-text-main">Đất sét pha dẻo cứng, <InlineMath math="R_0 = 220\text{ kPa}" /></strong>
                  </div>
                </div>

                <h3 className="font-bold text-text-main pt-2">Vật liệu sử dụng (Theo sách TCXDVN 356:2005):</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 space-y-1">
                    <strong className="text-primary block">Bê tông cấp độ bền B20 (Mác 250):</strong>
                    <p>• <InlineMath math="R_b = 11.5\text{ MPa}" /> (cường độ nén tính toán)</p>
                    <p>• <InlineMath math="R_{bt} = 0.90\text{ MPa}" /> (cường độ kéo tính toán)</p>
                    <p>• <InlineMath math="E_b = 27.5 \times 10^3\text{ MPa}" /> (môđun đàn hồi)</p>
                    <p>• Hệ số điều kiện làm việc: <InlineMath math="\gamma_{b1} = 0.9 \rightarrow R_b^* = 10.35\text{ MPa}" /></p>
                  </div>
                  <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20 space-y-1">
                    <strong className="text-indigo-600 dark:text-indigo-400 block">Cốt thép CB300-V (Thép CII) & CB240-T (CI):</strong>
                    <p>• Thép dọc CB300-V: <InlineMath math="R_s = R_{sc} = 280\text{ MPa}" />, <InlineMath math="E_s = 2.0 \times 10^5\text{ MPa}" /></p>
                    <p>• Thép đai CB240-T: <InlineMath math="R_{sw} = 170\text{ MPa}" /></p>
                    <p>• Giới hạn vùng nén: <InlineMath math="\xi_R = 0.513" />, <InlineMath math="\alpha_R = 0.381" /></p>
                  </div>
                </div>
              </div>

              {/* Sơ đồ truyền lực */}
              <div className="bg-surface rounded-2xl border border-border p-6 space-y-3">
                <h3 className="font-bold text-text-main flex items-center gap-2">
                  <span>🔄</span> Sơ Đồ Dòng Chảy Tải Trọng (Load Path)
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm py-2">
                  <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold rounded-lg">
                    Tải mặt sàn (q)
                  </span>
                  <span>&rarr;</span>
                  <span className="px-3 py-1.5 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 font-semibold rounded-lg">
                    Dầm phụ (b = 200)
                  </span>
                  <span>&rarr;</span>
                  <span className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold rounded-lg">
                    Dầm chính khung
                  </span>
                  <span>&rarr;</span>
                  <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold rounded-lg">
                    Cột tầng (N, M)
                  </span>
                  <span>&rarr;</span>
                  <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold rounded-lg">
                    Móng đơn nông
                  </span>
                  <span>&rarr;</span>
                  <span className="px-3 py-1.5 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold rounded-lg">
                    Đất nền (<InlineMath math="R_0" />)
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Overview */}
            <div className="space-y-4">
              <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
                <h3 className="font-bold text-sm text-text-main">Mục lục kiểm tra cấu kiện</h3>
                <ul className="space-y-2 text-xs text-text-muted">
                  <li className="flex items-center justify-between p-2 rounded-lg bg-bg">
                    <span>1. Bản sàn <InlineMath math="h_b = 8\text{cm}" /></span>
                    <span className="text-emerald-500 font-semibold">Tập 1 C9</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-bg">
                    <span>2. Dầm phụ <InlineMath math="20 \times 40\text{cm}" /></span>
                    <span className="text-emerald-500 font-semibold">Tập 1 C4</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-bg">
                    <span>3. Dầm chính <InlineMath math="25 \times 60\text{cm}" /></span>
                    <span className="text-emerald-500 font-semibold">Tập 2 C2</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-bg">
                    <span>4. Cột khung <InlineMath math="30 \times 40\text{cm}" /></span>
                    <span className="text-emerald-500 font-semibold">Tập 1 C5</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-bg">
                    <span>5. Móng đơn <InlineMath math="2.4 \times 1.8\text{m}" /></span>
                    <span className="text-emerald-500 font-semibold">Tập 2 C3</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-bg">
                    <span>6. Thang bản & Bể nước</span>
                    <span className="text-emerald-500 font-semibold">Tập 3 C1, C2</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-primary">💡 Phương pháp học tập</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Nhấp vào từng Tab phía trên để xem chi tiết tính toán từng bước: đầu vào tải trọng, sơ đồ hình học, công thức giải tích KaTeX theo sách Võ Bá Tầm, và mô hình 3D trực quan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BẢN SÀN */}
      {activeTab === 'san' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-text-main flex items-center gap-2">
                  <span>🟦</span> 2. Tính Toán Bản Sàn Tầng Điển Hình (Tập 1 Chương 9 & Tập 2 Chương 1)
                </h2>

                <div className="p-4 bg-bg rounded-xl border border-border space-y-2 text-sm">
                  <h4 className="font-bold text-text-main">a) Phân loại ô bản sàn:</h4>
                  <p>• Nhịp dầm chính: <InlineMath math="l_2 = 6.0\text{ m}" />. Nhịp dầm phụ: chia nhịp <InlineMath math="l_2" /> làm 3 phần <InlineMath math="\rightarrow l_1 = 2.0\text{ m}" />.</p>
                  <p>• Tỷ số cạnh: <InlineMath math="\lambda = \frac{l_2}{l_1} = \frac{6.0}{2.0} = 3.0 > 2.0 \rightarrow" /> <strong>Bản loại dầm (bản làm việc 1 phương theo phương cạnh ngắn <InlineMath math="l_1" />)</strong> [T1 tr.245].</p>
                  <p>• Chiều dày bản: <InlineMath math="h_b = \frac{l_1}{m} = \frac{2000}{30 \div 35} \approx 60 \div 70\text{ mm} \rightarrow" /> Chọn <InlineMath math="h_b = 80\text{ mm} = 8\text{ cm}" /> (đảm bảo độ võng và cách âm).</p>
                </div>

                <div className="space-y-2 text-sm">
                  <h4 className="font-bold text-text-main">b) Tải trọng tác dụng lên <InlineMath math="1\text{ m}^2" /> sàn:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-border">
                      <thead>
                        <tr className="bg-bg">
                          <th className="p-2 border border-border">Lớp cấu tạo</th>
                          <th className="p-2 border border-border text-center"><InlineMath math="\delta\text{ (m)}" /></th>
                          <th className="p-2 border border-border text-center"><InlineMath math="\gamma\text{ (kN/m}^3\text{)}" /></th>
                          <th className="p-2 border border-border text-center"><InlineMath math="n" /></th>
                          <th className="p-2 border border-border text-right"><InlineMath math="q^{tt}\text{ (kN/m}^2\text{)}" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-border">1. Gạch ceramic lót sàn</td>
                          <td className="p-2 border border-border text-center">0.01</td>
                          <td className="p-2 border border-border text-center">20.0</td>
                          <td className="p-2 border border-border text-center">1.1</td>
                          <td className="p-2 border border-border text-right">0.22</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-border">2. Vữa lót xi măng</td>
                          <td className="p-2 border border-border text-center">0.02</td>
                          <td className="p-2 border border-border text-center">18.0</td>
                          <td className="p-2 border border-border text-center">1.3</td>
                          <td className="p-2 border border-border text-right">0.47</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-border">3. Bản BTCT chịu lực</td>
                          <td className="p-2 border border-border text-center">0.08</td>
                          <td className="p-2 border border-border text-center">25.0</td>
                          <td className="p-2 border border-border text-center">1.1</td>
                          <td className="p-2 border border-border text-right">2.20</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-border">4. Vữa trát trần</td>
                          <td className="p-2 border border-border text-center">0.015</td>
                          <td className="p-2 border border-border text-center">18.0</td>
                          <td className="p-2 border border-border text-center">1.3</td>
                          <td className="p-2 border border-border text-right">0.35</td>
                        </tr>
                        <tr className="font-bold bg-bg/50">
                          <td colSpan={4} className="p-2 border border-border">Tổng tĩnh tải tính toán (<InlineMath math="g" />)</td>
                          <td className="p-2 border border-border text-right text-primary">3.24 kN/m²</td>
                        </tr>
                        <tr className="font-bold">
                          <td colSpan={4} className="p-2 border border-border">Hoạt tải tính toán (<InlineMath math="p = 2.0 \times 1.2" />)</td>
                          <td className="p-2 border border-border text-right text-indigo-600">2.40 kN/m²</td>
                        </tr>
                        <tr className="font-bold bg-primary/10">
                          <td colSpan={4} className="p-2 border border-border">TỔNG TẢI TRỌNG TÍNH TOÁN (<InlineMath math="q = g + p" />)</td>
                          <td className="p-2 border border-border text-right text-primary font-bold">5.64 kN/m²</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-text-main text-sm">c) Tính toán nội lực theo sơ đồ khớp dẻo (Cắt dải rộng <InlineMath math="b = 1\text{m}" />):</h4>
                  <FormulaBlock
                    number="(DA.1)"
                    source="T1 tr.251, CT (9.4)"
                    latex="M_1 = \frac{q l_1^2}{11} = \frac{5.64 \times 2.0^2}{11} = 2.05\text{ kNm} \quad (\text{(Nhip bien)})"
                  />
                  <FormulaBlock
                    number="(DA.2)"
                    source="T1 tr.251, CT (9.5)"
                    latex="M_2 = \frac{q l_1^2}{16} = \frac{5.64 \times 2.0^2}{16} = 1.41\text{ kNm} \quad (\text{(Nhip giua)})"
                  />
                  <FormulaBlock
                    number="(DA.3)"
                    source="T1 tr.251, CT (9.6)"
                    latex="M_g = -\frac{q l_1^2}{11} = -2.05\text{ kNm} \quad (\text{(Goi tua)})"
                  />
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">d) Kết quả bố trí cốt thép bản sàn:</h4>
                  <p>• Chiều cao làm việc: <InlineMath math="h_0 = 80 - 15 = 65\text{ mm}" />.</p>
                  <p>• Tại nhịp biên & gối (<InlineMath math="M = 2.05\text{ kNm}" />): <InlineMath math="\alpha_m = \frac{2.05 \times 10^6}{10.35 \times 1000 \times 65^2} = 0.047 < \alpha_R = 0.381" />.</p>
                  <p>• <InlineMath math="\zeta = 0.976 \rightarrow A_s = \frac{2.05 \times 10^6}{280 \times 0.976 \times 65} = 115\text{ mm}^2/m" />.</p>
                  <p>• <strong>Bố trí thép:</strong> Chọn <InlineMath math="\phi 6 a150\text{ (}A_s = 188\text{ mm}^2\text{)}" /> hoặc <InlineMath math="\phi 8 a200\text{ (}A_s = 251\text{ mm}^2\text{)}" />. Đặt so le uốn góc lên gối chịu mômen âm.</p>
                </div>
              </div>
            </div>

            {/* 3D Model Slab */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm">
                <h3 className="font-bold text-sm text-text-main mb-2">Mô hình 3D ô bản sàn BTCT</h3>
                <ViewerCanvas cameraPosition={[3, 2.5, 3]}>
                  <RCSlab />
                </ViewerCanvas>
                <p className="text-xs text-text-muted mt-2 text-center">
                  Mô hình 3D bản dầm sàn sườn: Lưới thép nhịp dưới và mũ gối chịu mômen âm.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DẦM PHỤ */}
      {activeTab === 'dam-phu' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-text-main flex items-center gap-2">
                  <span>➖</span> 3. Tính Toán Dầm Phụ Nhịp 6.0m (Tập 1 Chương 4 & Đồ Án BT1)
                </h2>

                <div className="p-4 bg-bg rounded-xl border border-border space-y-2 text-sm">
                  <h4 className="font-bold text-text-main">a) Sơ bộ kích thước tiết diện:</h4>
                  <p>• Nhịp dầm phụ: <InlineMath math="L = 6.0\text{ m} = 6000\text{ mm}" />.</p>
                  <p>• Chiều cao dầm: <InlineMath math="h = \left(\frac{1}{12} \div \frac{1}{16}\right) L = (500 \div 375)\text{ mm} \rightarrow" /> Chọn <InlineMath math="h = 400\text{ mm}" />.</p>
                  <p>• Bề rộng dầm: <InlineMath math="b = (0.3 \div 0.5) h \rightarrow" /> Chọn <InlineMath math="b = 200\text{ mm}" />.</p>
                  <p>• Cánh chữ T làm việc: <InlineMath math="b'_f = b + 2 S_c \le b + \frac{L}{6} = 200 + 1000 = 1200\text{ mm}" />.</p>
                </div>

                <div className="space-y-3 text-sm">
                  <h4 className="font-bold text-text-main">b) Tải trọng tác dụng lên dầm phụ:</h4>
                  <p>• Bề rộng thu tải từ sàn: <InlineMath math="B_{tt} = l_1 = 2.0\text{ m}" />.</p>
                  <p>• Tải từ sàn truyền vào: <InlineMath math="q_{san} = 5.64 \times 2.0 = 11.28\text{ kN/m}" />.</p>
                  <p>• Trọng lượng bản thân dầm phụ (đã trừ phần bản): <InlineMath math="g_{bt} = 1.1 \times 25 \times 0.2 \times (0.4 - 0.08) = 1.76\text{ kN/m}" />.</p>
                  <p>• <strong>Tổng tải phân bố tính toán:</strong> <InlineMath math="q_{dp} = 11.28 + 1.76 = 13.04\text{ kN/m}" />.</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-text-main text-sm">c) Tính toán mômen uốn & Cắt:</h4>
                  <FormulaBlock
                    number="(DA.4)"
                    source="T1 tr.258"
                    latex="M_{\max} = \frac{q_{dp} L^2}{11} = \frac{13.04 \times 6.0^2}{11} = 42.68\text{ kNm} \quad (\text{(Nhip bien)})"
                  />
                  <FormulaBlock
                    number="(DA.5)"
                    source="T1 tr.258"
                    latex="M_{goi} = -\frac{q_{dp} L^2}{11} = -42.68\text{ kNm} \quad (\text{(Goi tua)})"
                  />
                  <FormulaBlock
                    number="(DA.6)"
                    source="T1 tr.259"
                    latex="Q_{\max} = 0.6 \, q_{dp} L = 0.6 \times 13.04 \times 6.0 = 46.94\text{ kN}"
                  />
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">d) Kết quả bố trí thép dầm phụ:</h4>
                  <p>• <strong>Tại nhịp (Tiết diện chữ T cánh nén):</strong> <InlineMath math="h_0 = 400 - 35 = 365\text{ mm}" />. Cánh chịu nén rất khỏe, trục trung hòa qua cánh <InlineMath math="\rightarrow A_s = 468\text{ mm}^2 \rightarrow" /> <strong>Chọn <InlineMath math="2\phi 18\text{ (}A_s = 509\text{ mm}^2\text{)}" /></strong>.</p>
                  <p>• <strong>Tại gối (Tiết diện chữ nhật <InlineMath math="200 \times 400" /> cánh chịu kéo):</strong> <InlineMath math="\alpha_m = \frac{42.68 \times 10^6}{10.35 \times 200 \times 365^2} = 0.155 < \alpha_R \rightarrow A_s = 485\text{ mm}^2 \rightarrow" /> <strong>Chọn <InlineMath math="2\phi 18" /> (uốn hoặc thêm thép gối)</strong>.</p>
                  <p>• <strong>Cốt đai chống cắt:</strong> <InlineMath math="Q_{\max} = 46.94\text{ kN} < Q_{b\min} \rightarrow" /> Cốt đai đặt theo cấu tạo kết hợp chịu lực: <strong><InlineMath math="\phi 6 a150" /> ở <InlineMath math="L/4" /> hai đầu gối, <InlineMath math="\phi 6 a200" /> ở giữa nhịp</strong>.</p>
                </div>
              </div>
            </div>

            {/* 3D Model Beam */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm">
                <h3 className="font-bold text-sm text-text-main mb-2">Mô hình 3D dầm phụ chữ nhật / chữ T</h3>
                <ViewerCanvas cameraPosition={[3.5, 2, 3.5]}>
                  <RCBeam />
                </ViewerCanvas>
                <p className="text-xs text-text-muted mt-2 text-center">
                  Dầm phụ BTCT: Cốt thép dọc chịu uốn nhịp/gối và hệ đai dày ở 2 đầu dầm chống lực cắt.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DẦM CHÍNH KHUNG */}
      {activeTab === 'dam-chinh' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-text-main flex items-center gap-2">
                  <span>📐</span> 4. Tính Toán Dầm Chính Khung (Tập 1 Chương 4 & Tập 2 Chương 2)
                </h2>

                <div className="p-4 bg-bg rounded-xl border border-border space-y-2 text-sm">
                  <h4 className="font-bold text-text-main">a) Kích thước tiết diện & Sơ đồ làm việc:</h4>
                  <p>• Nhịp khung: <InlineMath math="L = 6.0\text{ m}" /> gác lên cột kích thước <InlineMath math="300 \times 400\text{ mm}" />.</p>
                  <p>• Chiều cao dầm chính: <InlineMath math="h = \left(\frac{1}{8} \div \frac{1}{12}\right) L = (750 \div 500)\text{ mm} \rightarrow" /> Chọn <InlineMath math="h = 600\text{ mm}" />.</p>
                  <p>• Bề rộng dầm: <InlineMath math="b = 250\text{ mm}" />.</p>
                  <p>• Trên mỗi nhịp dầm chính có <strong>2 lực tập trung <InlineMath math="P" /></strong> truyền từ dầm phụ ở khoảng cách <InlineMath math="L/3 = 2.0\text{ m}" />.</p>
                </div>

                <div className="space-y-3 text-sm">
                  <h4 className="font-bold text-text-main">b) Xác định tải trọng:</h4>
                  <p>• Lực tập trung từ 2 vế dầm phụ gác vào: <InlineMath math="P = 2 \times Q_{dp} = 2 \times (13.04 \times 3.0) = 78.24\text{ kN}" />.</p>
                  <p>• Trọng lượng bản thân dầm chính: <InlineMath math="g_0 = 1.1 \times 25 \times 0.25 \times 0.6 = 4.125\text{ kN/m}" />.</p>
                  <FormulaBlock
                    number="(DA.7)"
                    source="T2 tr.88"
                    latex="M_{goi} \approx -\frac{P L}{3} - \frac{g_0 L^2}{12} = -\frac{78.24 \times 6.0}{3} - \frac{4.125 \times 36}{12} = -168.85\text{ kNm}"
                  />
                  <FormulaBlock
                    number="(DA.8)"
                    source="T2 tr.89"
                    latex="M_{nhip} \approx \frac{P L}{4.5} + \frac{g_0 L^2}{24} = \frac{78.24 \times 6.0}{4.5} + \frac{4.125 \times 36}{24} = 110.51\text{ kNm}"
                  />
                  <FormulaBlock
                    number="(DA.9)"
                    source="T1 tr.112"
                    latex="Q_{goi} = P + \frac{g_0 L}{2} = 78.24 + 12.38 = 90.62\text{ kN}"
                  />
                </div>

                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-indigo-700 dark:text-indigo-400">c) Kết quả chọn thép & Cốt treo (T1 tr.275):</h4>
                  <p>• <strong>Gối khung (<InlineMath math="M = 168.85\text{ kNm}" />):</strong> <InlineMath math="h_0 = 560\text{ mm} \rightarrow \alpha_m = 0.208 < \alpha_R \rightarrow A_s = 1240\text{ mm}^2 \rightarrow" /> <strong>Chọn <InlineMath math="4\phi 20\text{ (}A_s = 1256\text{ mm}^2\text{)}" /></strong>.</p>
                  <p>• <strong>Nhịp khung (<InlineMath math="M = 110.51\text{ kNm}" />):</strong> Chữ T cánh chịu nén <InlineMath math="\rightarrow A_s = 780\text{ mm}^2 \rightarrow" /> <strong>Chọn <InlineMath math="3\phi 20\text{ (}A_s = 942\text{ mm}^2\text{)}" /></strong>.</p>
                  <p>• <strong>Cốt treo tại vị trí liên kết dầm phụ - dầm chính:</strong> Do tải tập trung truyền vào vùng dưới, bắt buộc bố trí đai treo bổ sung: <InlineMath math="A_{st} = \frac{P (1 - h_s/h)}{R_{sw}} \rightarrow" /> Bố trí <strong>4 đai <InlineMath math="2\phi 8" /> mỗi bên dầm phụ</strong> để giằng lực kéo nứt chéo.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm">
                <h3 className="font-bold text-sm text-text-main mb-2">Mô hình 3D dầm chính toàn khối</h3>
                <ViewerCanvas cameraPosition={[4, 2.5, 4]}>
                  <RCBeam />
                </ViewerCanvas>
                <p className="text-xs text-text-muted mt-2 text-center">
                  Dầm chính chịu tải trọng tập trung từ dầm phụ, yêu cầu cốt treo đặc biệt tại nút giao.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CỘT NÉN LỆCH TÂM */}
      {activeTab === 'cot' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-text-main flex items-center gap-2">
                  <span>🏛️</span> 5. Tính Toán Cột Tầng 1 Chịu Nén Lệch Tâm (Tập 1 Chương 5 & Tập 2 Chương 2)
                </h2>

                <div className="p-4 bg-bg rounded-xl border border-border space-y-3 text-sm">
                  <h4 className="font-bold text-text-main">a) Bộ công cụ tính toán động cột BTCT:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-text-muted block">Lực nén N (kN):</label>
                      <input
                        type="number"
                        value={colN}
                        onChange={(e) => setColN(Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg border border-border bg-surface text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted block">Mômen M (kNm):</label>
                      <input
                        type="number"
                        value={colM}
                        onChange={(e) => setColM(Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg border border-border bg-surface text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted block">Bề rộng b (mm):</label>
                      <input
                        type="number"
                        value={colB}
                        onChange={(e) => setColB(Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg border border-border bg-surface text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted block">Chiều cao h (mm):</label>
                      <input
                        type="number"
                        value={colH}
                        onChange={(e) => setColH(Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg border border-border bg-surface text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-text-main text-sm">b) Trình tự tính toán tự động theo TCXDVN 356:2005:</h4>
                  <FormulaBlock
                    number="(DA.10)"
                    source="T1 tr.135, CT (5.4)"
                    latex="e_0 = \\frac{M}{N} = \\frac{145 \\times 10^3}{1250} = 116\\text{ mm}, \\quad e_a = \\max\\left(\\frac{h}{30}, 10\\right) = 13.3\\text{ mm}"
                  />
                  <FormulaBlock
                    number="(DA.11)"
                    source="T1 tr.137, CT (5.9)"
                    latex="e = \\eta \\cdot e_0 + \\left(\\frac{h}{2} - a\\right) = 1.05 \\times 116 + (200 - 40) = 281.8\\text{ mm}"
                  />
                  <div className="p-3 bg-bg rounded-xl border border-border text-xs sm:text-sm space-y-1">
                    <p>• Chiều cao vùng nén sơ bộ: <InlineMath math={`x = \\frac{N}{R_b b} = ${xCol.toFixed(1)}\\text{ mm} \\rightarrow \\xi = ${xiCol.toFixed(3)}`} /></p>
                    <p>• So sánh với <InlineMath math={`\\xi_R = ${xiR}`} />: {isLargeEccentric ? (
                      <span className="text-emerald-600 font-bold">Trường hợp nén LỆCH TÂM LỚN (ξ ≤ ξR)</span>
                    ) : (
                      <span className="text-amber-600 font-bold">Trường hợp nén LỆCH TÂM BÉ (ξ &gt; ξR)</span>
                    )}</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">c) Kết quả tính thép đối xứng (<InlineMath math="A_s = A'_s" />):</h4>
                  <p>• Diện tích cốt thép mỗi bên: <InlineMath math={`A_s = A'_s = ${AsEachSide}\\text{ mm}^2`} />.</p>
                  <p>• Tổng diện tích cốt thép cột: <InlineMath math={`A_{st} = ${totalAs}\\text{ mm}^2`} />.</p>
                  <p>• Hàm lượng cốt thép: <InlineMath math={`\\mu = ${muPct}\\%`} /> (thỏa mãn quy chuẩn <InlineMath math="0.5\\% \\le \\mu \\le 3.0\\%" />).</p>
                  <p className="font-bold text-text-main">
                    👉 Bố trí thực tế: Chọn 4 cây góc <InlineMath math="4\\phi 20" /> + 2 cây mép <InlineMath math="2\\phi 18" /> (<InlineMath math="A_{st} = 1768\\text{ mm}^2" />). Thép đai <InlineMath math="\\phi 8 a100" /> ở chân và đầu cột, <InlineMath math="\\phi 8 a150" /> ở thân cột.
                  </p>
                </div>
              </div>
            </div>

            {/* 3D Model Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm">
                <h3 className="font-bold text-sm text-text-main mb-2">Mô hình 3D cột chịu nén lệch tâm</h3>
                <ViewerCanvas cameraPosition={[3, 3, 3]}>
                  <RCColumn />
                </ViewerCanvas>
                <p className="text-xs text-text-muted mt-2 text-center">
                  Cột BTCT: Khung cốt dọc chịu nén lệch tâm kết hợp đai dày chống nở hông bê tông.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: MÓNG ĐƠN NÔNG */}
      {activeTab === 'mong' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-text-main flex items-center gap-2">
                  <span>🧱</span> 6. Tính Toán Móng Đơn BTCT Dưới Cột Khung (Tập 2 Chương 3)
                </h2>

                <div className="p-4 bg-bg rounded-xl border border-border space-y-2 text-sm">
                  <h4 className="font-bold text-text-main">a) Tải trọng chân cột tính toán:</h4>
                  <p>• Lực dọc tính toán: <InlineMath math="N_0 = 1250\text{ kN} \approx 125\text{ tấn}" />.</p>
                  <p>• Mômen chân cột: <InlineMath math="M_0 = 145\text{ kNm}" />. Lực cắt: <InlineMath math="Q_0 = 42\text{ kN}" />.</p>
                  <p>• Độ sâu chôn móng: <InlineMath math="h_m = 1.5\text{ m}" />. Dung trọng trung bình đất và móng: <InlineMath math="\gamma_{tb} = 20\text{ kN/m}^3" />.</p>
                  <p>• Cường độ tính toán của nền đất: <InlineMath math="R_0 = 220\text{ kPa} = 22\text{ T/m}^2" />.</p>
                </div>

                <div className="space-y-3 text-sm">
                  <h4 className="font-bold text-text-main">b) Xác định diện tích đáy móng:</h4>
                  <FormulaBlock
                    number="(DA.12)"
                    source="T2 tr.124"
                    latex="F \ge \frac{N_0^{tc}}{R_0 - \gamma_{tb} h_m} = \frac{1250 / 1.15}{220 - 20 \times 1.5} = \frac{1087}{190} = 5.72\text{ m}^2"
                  />
                  <p>• Chọn móng hình chữ nhật theo phương chịu mômen: <strong><InlineMath math="L = 2.4\text{ m}, B = 1.8\text{ m} \rightarrow F = 4.32\text{ m}^2" /></strong> (kèm độ lệch tâm).</p>
                  <FormulaBlock
                    number="(DA.13)"
                    source="T2 tr.126"
                    latex="p_{\max} = \frac{N_{tong}}{F} + \frac{M_{tong}}{W} = \frac{1250 + 20 \times 4.32 \times 1.5}{4.32} + \frac{145 + 42 \times 0.7}{\frac{1.8 \times 2.4^2}{6}} = 319 + 101 = 420\text{ kPa}"
                  />
                  <p className="text-xs text-text-muted">Kiểm tra điều kiện: <InlineMath math="p_{\max} \le 1.2 R, p_{\min} > 0" /> thỏa mãn áp lực nền đất.</p>
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">c) Kiểm tra chọc thủng & Thép đáy móng:</h4>
                  <p>• <strong>Chiều cao móng:</strong> Chọn móng bậc với tổng chiều cao <InlineMath math="H_m = 700\text{ mm}" /> (<InlineMath math="h_0 = 650\text{ mm}" />).</p>
                  <p>• <strong>Kiểm tra chọc thủng tháp 45°:</strong> <InlineMath math="P_{ct} = p_{tb} \cdot F_{ct} \le 0.75 R_{bt} b_{tb} h_0 \rightarrow" /> Thỏa mãn an toàn chống thủng đáy móng [T2 tr.131].</p>
                  <p>• <strong>Cốt thép đáy phương dài (L = 2.4m):</strong> <InlineMath math="M_{I-I} = \frac{p_{ngam} c_L^2}{2} \rightarrow A_{sx} = 1520\text{ mm}^2 \rightarrow" /> <strong>Chọn <InlineMath math="12\phi 14a150" /></strong>.</p>
                  <p>• <strong>Cốt thép đáy phương ngắn (B = 1.8m):</strong> <InlineMath math="A_{sy} = 1140\text{ mm}^2 \rightarrow" /> <strong>Chọn <InlineMath math="10\phi 12a180" /></strong>.</p>
                </div>
              </div>
            </div>

            {/* 3D Model Footing */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-text-main">Mô hình 3D móng đơn BTCT</h3>
                  <button
                    onClick={() => setShowPunchingCone(!showPunchingCone)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                      showPunchingCone
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-bg text-text-muted border-border hover:bg-surface'
                    }`}
                  >
                    {showPunchingCone ? 'Ẩn tháp đâm thủng 45°' : '👁️ Xem tháp đâm thủng 45°'}
                  </button>
                </div>
                <ViewerCanvas cameraPosition={[3.5, 2.8, 3.5]}>
                  {({ isXray, wireframe }) => (
                    <Footing
                      bMm={1800}
                      lMm={2400}
                      hMm={700}
                      hStepMm={350}
                      colBMm={300}
                      colHMm={400}
                      isXray={isXray}
                      wireframe={wireframe}
                      showPunchingCone={showPunchingCone}
                      showLeanConcrete={true}
                    />
                  )}
                </ViewerCanvas>
                <p className="text-xs text-text-muted mt-2 text-center">
                  Móng đơn nông: Lớp bê tông lót 100mm, lưới thép đáy móng uốn móc 90°, thép chờ cổ cột bẻ chân vịt quỳ neo vào móng và đai cổ cột.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CẤU KIỆN ĐẶC BIỆT */}
      {activeTab === 'dac-biet' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cầu thang */}
            <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-serif font-bold text-text-main flex items-center gap-2">
                <span>🪜</span> 7.1 Cầu Thang Bộ 2 Vế (Tập 3 Chương 1)
              </h2>
              <div className="space-y-3 text-sm">
                <p>• <strong>Sơ đồ kết cấu:</strong> Bản nghiêng dạng bản dầm tựa lên dầm chiếu nghỉ và dầm chiếu tới, nhịp tính toán <InlineMath math="L_t = 2.7\text{ m}" />.</p>
                <p>• Kích thước bậc: rộng <InlineMath math="b = 300\text{ mm}" />, cao <InlineMath math="h = 150\text{ mm}" />. Góc dốc thang <InlineMath math="\alpha = 26.5^\circ" />.</p>
                <p>• Chiều dày bản thang chịu lực: <InlineMath math="h_{bt} = 100\text{ mm}" />.</p>
                <FormulaBlock
                    number="(DA.14)"
                    source="T3 tr.18"
                    latex="M_{\max} = \frac{q_{thang} L_t^2}{8} = \frac{8.45 \times 2.7^2}{8} = 7.70\text{ kNm/m}"
                  />
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs space-y-1">
                  <p className="font-bold text-emerald-700 dark:text-emerald-400">Bố trí thép vế thang:</p>
                  <p>• Cốt dọc chịu uốn: <strong><InlineMath math="\phi 10 a150\text{ (}A_s = 524\text{ mm}^2\text{/m)}" /></strong>.</p>
                  <p>• Cốt phân bố cấu tạo: <strong><InlineMath math="\phi 6 a200" /></strong>.</p>
                  <p>• <strong>Lưu ý cấu tạo nút uốn [T3 tr.24]:</strong> Tại góc gãy khúc vế thang - chiếu nghỉ, cốt thép kéo bắt buộc phải uốn vắt chéo neo sâu vào vùng nén, tuyệt đối không được uốn theo mép trong vì lực kéo sẽ đẩy bật lớp bê tông bảo vệ.</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 mb-1">
                <span className="text-xs text-text-muted">Mô hình 3D vế thang & dầm chiếu nghỉ</span>
                <button
                  onClick={() => setStairHandrail(!stairHandrail)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                    stairHandrail
                      ? 'bg-primary text-white border-primary'
                      : 'bg-bg text-text-muted border-border hover:bg-surface'
                  }`}
                >
                  {stairHandrail ? 'Ẩn lan can' : 'Hiện lan can'}
                </button>
              </div>
              <div className="mt-1">
                <ViewerCanvas cameraPosition={[3.5, 2.5, 3.5]}>
                  {({ isXray, wireframe }) => (
                    <Stair
                      isXray={isXray}
                      wireframe={wireframe}
                      showHandrail={stairHandrail}
                      showRebars={true}
                    />
                  )}
                </ViewerCanvas>
              </div>
            </div>

            {/* Bể nước mái */}
            <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-serif font-bold text-text-main flex items-center gap-2">
                <span>💧</span> 7.2 Bể Nước Mái Sinh Hoạt 12m³ (Tập 3 Chương 2)
              </h2>
              <div className="space-y-3 text-sm">
                <p>• <strong>Kích thước bể:</strong> Dài <InlineMath math="3.0\text{ m}" />, Rộng <InlineMath math="2.0\text{ m}" />, Cao mực nước <InlineMath math="H = 2.0\text{ m}" />.</p>
                <p>• Chiều dày thành bể: <InlineMath math="h_{th} = 100\text{ mm}" />. Đáy bể: <InlineMath math="h_d = 120\text{ mm}" />.</p>
                <p>• <strong>Tải trọng:</strong> Áp lực thủy tĩnh tam giác đáy <InlineMath math="p_{\max} = \gamma_w H = 10 \times 2.0 = 20\text{ kN/m}^2" />.</p>
                <FormulaBlock
                    number="(DA.15)"
                    source="T3 tr.54"
                    latex="M_{chan} = -\frac{p_{\max} H^2}{15} = -\frac{20 \times 2.0^2}{15} = -5.33\text{ kNm/m} \quad (\text{(Ngam day)})"
                  />
                <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-xs space-y-1">
                  <p className="font-bold text-indigo-700 dark:text-indigo-400">Kiểm tra nứt & Chống thấm (THGH 2 - T1 C7):</p>
                  <p>• Cốt thép đứng chịu áp lực nước: <strong><InlineMath math="\phi 10 a150\text{ (}A_s = 524\text{ mm}^2\text{/m)}" /></strong>.</p>
                  <p>• Cốt thép ngang chịu lực nở vòng: <strong><InlineMath math="\phi 8 a150" /></strong>.</p>
                  <p>• Bề rộng vết nứt giới hạn: <InlineMath math="a_{crc} \le 0.2\text{ mm}" /> để đảm bảo khả năng giữ nước không bị thấm rỉ.</p>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setTankCaseType(tankCaseType === 'rectangular' ? 'circular' : 'rectangular')}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-bg border border-border hover:bg-surface text-text-main shadow-xs"
                    >
                      {tankCaseType === 'rectangular' ? '🔁 Xem dạng Bể tròn' : '🔁 Xem dạng Bể chữ nhật'}
                    </button>
                    <button
                      onClick={() => setTankCutaway(!tankCutaway)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        tankCutaway
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-bg text-text-muted border-border hover:bg-surface'
                      }`}
                    >
                      {tankCutaway ? 'Đóng thành trước' : '✂️ Cắt quan sát bên trong'}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setTankRoof(!tankRoof)}
                      className={`px-2 py-1 rounded-lg text-xs border ${
                        !tankRoof ? 'bg-primary text-white border-primary' : 'bg-bg border-border text-text-muted hover:bg-surface'
                      }`}
                    >
                      {tankRoof ? 'Mở nắp bể' : 'Đậy nắp'}
                    </button>
                    <button
                      onClick={() => setTankPipes(!tankPipes)}
                      className={`px-2 py-1 rounded-lg text-xs border ${
                        tankPipes ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-bg border-border text-text-muted hover:bg-surface'
                      }`}
                    >
                      {tankPipes ? 'Đường ống: Bật' : 'Đường ống: Tắt'}
                    </button>
                    <button
                      onClick={() => setTankRebars(!tankRebars)}
                      className={`px-2 py-1 rounded-lg text-xs border ${
                        tankRebars ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-bg border-border text-text-muted hover:bg-surface'
                      }`}
                    >
                      {tankRebars ? 'Lồng thép: Bật' : 'Lồng thép: Tắt'}
                    </button>
                  </div>
                </div>

                <ViewerCanvas cameraPosition={[3.5, 2.8, 3.5]}>
                  {({ isXray, wireframe }) => (
                    <Tank
                      type={tankCaseType}
                      lengthMm={3000}
                      widthMm={2000}
                      heightMm={2000}
                      wallThickMm={120}
                      baseThickMm={150}
                      waterLevelPct={80}
                      isXray={isXray}
                      wireframe={wireframe}
                      cutaway={tankCutaway}
                      showRoof={tankRoof}
                      showPipes={tankPipes}
                      showRebars={tankRebars}
                    />
                  )}
                </ViewerCanvas>
                <p className="text-xs text-text-muted text-center">
                  Mô hình 3D bể nước BTCT: Vát mòi 45° chân tường đáy, băng cản nước PVC, lồng thép 2 lớp thành & đáy, cổ thăm manhole và hệ thống ống cấp, tràn, xả cặn, thông hơi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
