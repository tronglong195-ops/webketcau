import { InlineMath } from '../components/InlineMath';
import React from 'react';
import { Link } from 'react-router-dom';
import { StandardBanner } from '../components/StandardBanner';
import { ChapterPagination } from '../components/ChapterPagination';

export const Tap3PhuLucPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 3: Các cấu kiện đặc biệt</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Phụ lục Tập 3</span>
        </div>
        <h1 className="font-serif font-bold text-3xl lg:text-4xl text-text-main mb-2">
          Phụ Lục Tra Cứu Tập 3
        </h1>
        <p className="text-sm text-text-sub">
          Bảng tra hệ số nội lực vỏ mỏng, thành bể tròn và bảng tra hệ số áp lực đất, thông số cơ lý đất nền theo giáo trình PGS. TS. Võ Bá Tầm.
        </p>
      </div>

      <StandardBanner volume="tap3" />

      {/* PL3.1 BẢNG TRA NỘI LỰC VỎ MỎNG VÀ BỂ TRÒN */}
      <section id="section-pl3-1" className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-serif font-bold text-xl text-text-main">
          pl3.1 Bảng tra nội lực vỏ mỏng và thành bể tròn
        </h2>
        <p className="text-sm text-text-sub leading-relaxed">
          Nội lực trong thành bể hình trụ tròn (bán kính R, chiều cao H, chiều dày t) liên kết ngàm ở đáy và tự do ở đỉnh dưới tác dụng của áp lực thủy tĩnh tam giác \(p(y) = \gamma (H - y)\):
        </p>

        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-sm">
          <table className="w-full text-center text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-sub font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">Thông số <InlineMath math="\\xi = \\frac{H^2}{2 R t}" /></th>
                <th className="py-3 px-4">0.4</th>
                <th className="py-3 px-4">0.8</th>
                <th className="py-3 px-4">1.2</th>
                <th className="py-3 px-4">1.6</th>
                <th className="py-3 px-4">2.0</th>
                <th className="py-3 px-4">3.0</th>
                <th className="py-3 px-4">4.0</th>
                <th className="py-3 px-4">6.0</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 text-left font-bold text-primary">
                  Hệ số mômen đáy <InlineMath math="k_M" /> (<InlineMath math="M_{\\max} = -k_M \\gamma H^3" />)
                </td>
                <td className="py-3 px-4 font-semibold">0.0014</td>
                <td className="py-3 px-4 font-semibold">0.0041</td>
                <td className="py-3 px-4 font-semibold">0.0075</td>
                <td className="py-3 px-4 font-semibold">0.0110</td>
                <td className="py-3 px-4 font-semibold">0.0146</td>
                <td className="py-3 px-4 font-semibold">0.0225</td>
                <td className="py-3 px-4 font-semibold">0.0284</td>
                <td className="py-3 px-4 font-semibold">0.0350</td>
              </tr>
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 text-left font-bold text-accent">
                  Hệ số kéo vòng <InlineMath math="k_N" /> (<InlineMath math="N_{\\max} = k_N \\gamma H R" />)
                </td>
                <td className="py-3 px-4">0.950</td>
                <td className="py-3 px-4">0.880</td>
                <td className="py-3 px-4">0.805</td>
                <td className="py-3 px-4">0.730</td>
                <td className="py-3 px-4">0.665</td>
                <td className="py-3 px-4">0.550</td>
                <td className="py-3 px-4">0.470</td>
                <td className="py-3 px-4">0.380</td>
              </tr>
              <tr className="hover:bg-bg/50 text-text-sub">
                <td className="py-3 px-4 text-left font-bold">Vị trí <InlineMath math="N_{\\max}" /> (từ đáy lên, <InlineMath math="y/H" />)</td>
                <td className="py-3 px-4">0.05</td>
                <td className="py-3 px-4">0.10</td>
                <td className="py-3 px-4">0.15</td>
                <td className="py-3 px-4">0.20</td>
                <td className="py-3 px-4">0.25</td>
                <td className="py-3 px-4">0.30</td>
                <td className="py-3 px-4">0.35</td>
                <td className="py-3 px-4">0.40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-surface p-4 rounded-xl border border-border mt-4">
          <h4 className="font-bold text-text-main text-xs mb-1 uppercase tracking-wide">
            Bảng tra lực màng vỏ cầu vòm dưới tải phân bố đều:
          </h4>
          <p className="text-xs text-text-sub leading-relaxed">
            Công thức: \(N_\varphi = -q R / (1 + \cos\varphi)\); \(N_\theta = q R [1/(1 + \cos\varphi) - \cos\varphi]\). Tại góc \(\varphi_0 = 51^\circ 49'\), lực vòng \(N_\theta = 0\). Với \(\varphi &gt; 51^\circ 49'\), chuyển sang lực kéo vòng (\(N_\theta &gt; 0\)).
          </p>
        </div>
      </section>

      {/* PL3.2 BẢNG TRA ÁP LỰC ĐẤT VÀ CƠ LÝ ĐẤT NỀN */}
      <section id="section-pl3-2" className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-serif font-bold text-xl text-text-main">
          pl3.2 Bảng tra hệ số áp lực đất và thông số đất nền
        </h2>
        <p className="text-sm text-text-sub leading-relaxed">
          Hệ số áp lực chủ động Rankine \(k_a = \tan^2(45^\circ - \varphi/2)\) và bị động \(k_p = \tan^2(45^\circ + \varphi/2)\) với mặt đất sau tường nằm ngang (\(\beta = 0\)) và lưng tường thẳng đứng (\(\theta = 0\)):
        </p>

        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-sm">
          <table className="w-full text-center text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-sub font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">Góc ma sát trong \(\varphi\)</th>
                <th className="py-3 px-4">15°</th>
                <th className="py-3 px-4">20°</th>
                <th className="py-3 px-4">25°</th>
                <th className="py-3 px-4">28°</th>
                <th className="py-3 px-4">30°</th>
                <th className="py-3 px-4">32°</th>
                <th className="py-3 px-4">35°</th>
                <th className="py-3 px-4">40°</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 text-left font-bold text-primary">Hệ số chủ động \(k_a\)</td>
                <td className="py-3 px-4 font-semibold">0.589</td>
                <td className="py-3 px-4 font-semibold">0.490</td>
                <td className="py-3 px-4 font-semibold">0.406</td>
                <td className="py-3 px-4 font-semibold">0.361</td>
                <td className="py-3 px-4 font-semibold">0.333</td>
                <td className="py-3 px-4 font-semibold">0.307</td>
                <td className="py-3 px-4 font-semibold">0.271</td>
                <td className="py-3 px-4 font-semibold">0.217</td>
              </tr>
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 text-left font-bold text-emerald-600">Hệ số bị động \(k_p = 1/k_a\)</td>
                <td className="py-3 px-4">1.70</td>
                <td className="py-3 px-4">2.04</td>
                <td className="py-3 px-4">2.46</td>
                <td className="py-3 px-4">2.77</td>
                <td className="py-3 px-4">3.00</td>
                <td className="py-3 px-4">3.26</td>
                <td className="py-3 px-4">3.69</td>
                <td className="py-3 px-4">4.60</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* BẢNG CHỈ TIÊU CƠ LÝ ĐẤT TIÊU BIỂU */}
        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-sm mt-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-sub font-semibold">
              <tr>
                <th className="py-3 px-4">Loại đất nền đắp</th>
                <th className="py-3 px-4 text-center">Dung trọng \(\gamma\) (kN/m³)</th>
                <th className="py-3 px-4 text-center">Góc \(\varphi\) (độ)</th>
                <th className="py-3 px-4 text-center">Lực dính c (kPa)</th>
                <th className="py-3 px-4 text-center">Hệ số ma sát \(\mu\) đáy móng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 font-medium">Sỏi sạn thô, đá dăm đầm chặt</td>
                <td className="py-3 px-4 text-center font-mono">19 – 21</td>
                <td className="py-3 px-4 text-center font-mono">38° – 42°</td>
                <td className="py-3 px-4 text-center font-mono">0</td>
                <td className="py-3 px-4 text-center font-mono font-bold text-primary">0.55 – 0.60</td>
              </tr>
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 font-medium">Cát hạt vừa và to đầm chặt vừa</td>
                <td className="py-3 px-4 text-center font-mono">17 – 19</td>
                <td className="py-3 px-4 text-center font-mono">30° – 35°</td>
                <td className="py-3 px-4 text-center font-mono">0</td>
                <td className="py-3 px-4 text-center font-mono font-bold text-primary">0.45 – 0.50</td>
              </tr>
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 font-medium">Cát mịn đầm chặt</td>
                <td className="py-3 px-4 text-center font-mono">16 – 18</td>
                <td className="py-3 px-4 text-center font-mono">26° – 30°</td>
                <td className="py-3 px-4 text-center font-mono">0 – 2</td>
                <td className="py-3 px-4 text-center font-mono font-bold text-primary">0.35 – 0.40</td>
              </tr>
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 font-medium">Sét pha, cát pha dẻo cứng</td>
                <td className="py-3 px-4 text-center font-mono">18 – 19</td>
                <td className="py-3 px-4 text-center font-mono">18° – 24°</td>
                <td className="py-3 px-4 text-center font-mono">15 – 25</td>
                <td className="py-3 px-4 text-center font-mono font-bold text-primary">0.30 – 0.35</td>
              </tr>
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 font-medium">Đất sét dẻo mềm (không dùng đắp tường)</td>
                <td className="py-3 px-4 text-center font-mono">16 – 17</td>
                <td className="py-3 px-4 text-center font-mono">10° – 15°</td>
                <td className="py-3 px-4 text-center font-mono">8 – 15</td>
                <td className="py-3 px-4 text-center font-mono font-bold text-primary">0.20 – 0.25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <ChapterPagination currentPath="/tap-3/phu-luc" />
    </div>
  );
};
