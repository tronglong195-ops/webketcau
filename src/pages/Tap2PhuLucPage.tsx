import { InlineMath } from '../components/InlineMath';
import React from 'react';
import { Link } from 'react-router-dom';
import { StandardBanner } from '../components/StandardBanner';
import { ChapterPagination } from '../components/ChapterPagination';

export const Tap2PhuLucPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 2: Cấu kiện nhà cửa</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Phụ lục Tập 2</span>
        </div>
        <h1 className="font-serif font-bold text-3xl text-text-main mb-2">Phụ Lục Tra Cứu Tập 2</h1>
        <p className="text-sm text-text-sub">
          Bảng tra hệ số mômen bản kê 4 cạnh (bản hai phương), phân phối mômen sàn nấm và bảng tra móng trên nền đàn hồi Winkler theo giáo trình PGS. TS. Võ Bá Tầm.
        </p>
      </div>

      <StandardBanner volume="tap2" />

      {/* PL2.1 BẢNG TRA BẢN KÊ 4 CẠNH */}
      <section id="sec-pl2-1" className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-serif font-bold text-lg text-text-main">
          1. Bảng tra hệ số mômen bản kê 4 cạnh chịu tải phân bố đều (P.M. Marcus)
        </h3>
        <p className="text-xs text-text-sub">
          Mômen tính theo công thức: <InlineMath math="M_1 = k_1 \\cdot q \\cdot L_1^2" /> (phương ngắn) và <InlineMath math="M_2 = k_2 \\cdot q \\cdot L_1^2" /> (phương dài):
        </p>

        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-sm">
          <table className="w-full text-center text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-sub font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">Tỷ số L2 / L1</th>
                <th className="py-3 px-4">1.0 (Hình vuông)</th>
                <th className="py-3 px-4">1.2</th>
                <th className="py-3 px-4">1.4</th>
                <th className="py-3 px-4">1.6</th>
                <th className="py-3 px-4">1.8</th>
                <th className="py-3 px-4">2.0 (Bản dầm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 text-left font-bold text-primary">k1 (Nhịp ngắn)</td>
                <td className="py-3 px-4 font-semibold">0.0368</td>
                <td className="py-3 px-4 font-semibold">0.0531</td>
                <td className="py-3 px-4 font-semibold">0.0683</td>
                <td className="py-3 px-4 font-semibold">0.0808</td>
                <td className="py-3 px-4 font-semibold">0.0906</td>
                <td className="py-3 px-4 font-semibold">0.0982</td>
              </tr>
              <tr className="hover:bg-bg/50">
                <td className="py-3 px-4 text-left font-bold text-accent">k2 (Nhịp dài)</td>
                <td className="py-3 px-4">0.0368</td>
                <td className="py-3 px-4">0.0264</td>
                <td className="py-3 px-4">0.0192</td>
                <td className="py-3 px-4">0.0142</td>
                <td className="py-3 px-4">0.0107</td>
                <td className="py-3 px-4">0.0082</td>
              </tr>
              <tr className="hover:bg-bg/50 text-text-sub">
                <td className="py-3 px-4 text-left font-bold">Tỷ lệ M1 / M2</td>
                <td className="py-3 px-4">1.00</td>
                <td className="py-3 px-4">2.01</td>
                <td className="py-3 px-4">3.56</td>
                <td className="py-3 px-4">5.69</td>
                <td className="py-3 px-4">8.47</td>
                <td className="py-3 px-4">11.98</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* PL2.2 BẢNG TRA NỀN ĐÀN HỒI WINKLER */}
      <section id="sec-pl2-2" className="space-y-4 pt-6 border-t border-border">
        <h3 className="font-serif font-bold text-lg text-text-main">
          2. Bảng tra dầm móng trên nền đàn hồi Winkler (Hệ số nền k0)
        </h3>
        <div className="bg-surface rounded-2xl border border-border p-4 text-xs space-y-3">
          <p className="text-text-sub">
            Mô hình nền Winkler giả thiết phản lực đất nền tỷ lệ thuận với độ lún: <InlineMath math="p = C_0 \\cdot y" />. Độ cứng đàn hồi tương đối của dầm móng:
          </p>
          <div className="font-mono bg-bg p-3 rounded-xl border border-border text-center text-primary font-bold">
            <InlineMath math="\\lambda = \\sqrt[4]{\\frac{C_0 \\cdot b}{4 E_b I}}" />
          </div>
          <ul className="list-disc list-inside space-y-1 text-text-sub">
            <li>Nếu <InlineMath math="\\lambda L < \\pi / 2" />: Móng tuyệt đối cứng (áp lực đất tuyến tính dạng hình thang).</li>
            <li>Nếu <InlineMath math="\\lambda L \\ge \\pi / 2" />: Móng mềm (biến dạng uốn của dầm móng ảnh hưởng mạnh đến phân bố áp lực đất).</li>
          </ul>
        </div>
      </section>

      <ChapterPagination currentPath="/tap-2/phu-luc" />
    </div>
  );
};
