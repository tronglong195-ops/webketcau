import { InlineMath } from '../components/InlineMath';
import React from 'react';
import { ChapterPagination } from '../components/ChapterPagination';
import { CONCRETE_TABLE, REBAR_TABLE } from '../calc/materials';

export const MaterialAppendixPage: React.FC = () => {
  const barDiameters = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32];
  const barCounts = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="font-serif font-bold text-3xl text-text-main mb-2">Phụ lục tra cứu vật liệu</h1>
        <p className="text-sm text-text-muted">
          Bảng tra cường độ tính toán của bê tông, cốt thép và bảng tra diện tích cốt thép theo TCXDVN 356:2005.
        </p>
      </div>

      {/* Bảng 1: Bê tông */}
      <section id="sec-pl1-1" className="space-y-3">
        <h3 className="font-serif font-bold text-lg text-text-main">
          1. Bảng đổi đơn vị và cường độ tính toán Bê tông nặng (MPa) — Bảng 13 TCXDVN 356:2005
        </h3>
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-muted font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Cấp độ bền</th>
                <th className="py-3 px-4">Mác tương đương</th>
                <th className="py-3 px-4">Rb (Nén THGH1)</th>
                <th className="py-3 px-4">Rbt (Kéo THGH1)</th>
                <th className="py-3 px-4">Eb (x10³ MPa)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {Object.values(CONCRETE_TABLE).map((c) => (
                <tr key={c.grade} className="hover:bg-bg/50">
                  <td className="py-3 px-4 font-bold text-primary">{c.grade}</td>
                  <td className="py-3 px-4 text-text-main">
                    {c.grade === 'B15' ? 'M200' : c.grade === 'B20' ? 'M250' : c.grade === 'B25' ? 'M300' : c.grade === 'B30' ? 'M400' : 'M500'}
                  </td>
                  <td className="py-3 px-4 font-bold">{c.Rb.toFixed(1)}</td>
                  <td className="py-3 px-4">{c.Rbt.toFixed(2)}</td>
                  <td className="py-3 px-4">{(c.Eb / 1000).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bảng 2: Cốt thép */}
      <section id="sec-pl1-2" className="space-y-3">
        <h3 className="font-serif font-bold text-lg text-text-main">
          2. Bảng tra cốt thép: Cường độ, diện tích và trọng lượng (kg/m)
        </h3>
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-muted font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Nhóm cốt thép</th>
                <th className="py-3 px-4">Ký hiệu cũ</th>
                <th className="py-3 px-4">Rs (Kéo THGH1)</th>
                <th className="py-3 px-4">Rsc (Nén THGH1)</th>
                <th className="py-3 px-4">Rsw (Cốt đai cắt)</th>
                <th className="py-3 px-4">Es (x10⁵ MPa)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {Object.values(REBAR_TABLE).map((r) => (
                <tr key={r.grade} className="hover:bg-bg/50">
                  <td className="py-3 px-4 font-bold text-primary">{r.grade}</td>
                  <td className="py-3 px-4 text-text-main">{r.symbol}</td>
                  <td className="py-3 px-4 font-bold">{r.Rs}</td>
                  <td className="py-3 px-4">{r.Rsc}</td>
                  <td className="py-3 px-4">{r.Rsw}</td>
                  <td className="py-3 px-4">{(r.Es / 100000).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-sm mt-4">
          <table className="w-full text-center text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-3 text-left">Đường kính</th>
                <th className="py-3 px-3">Trọng lượng (kg/m)</th>
                <th className="py-3 px-3">1 thanh (mm²)</th>
                {barCounts.slice(1).map((n) => (
                  <th key={n} className="py-3 px-3">{n} thanh</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {barDiameters.map((d) => {
                const a1 = (Math.PI * d * d) / 4;
                const weight = (d * d * 0.00617).toFixed(3);
                return (
                  <tr key={d} className="hover:bg-bg/50">
                    <td className="py-2.5 px-3 text-left font-bold text-primary">ϕ{d}</td>
                    <td className="py-2.5 px-3 text-text-sub">{weight}</td>
                    <td className="py-2.5 px-3 font-semibold text-text-main">{a1.toFixed(1)}</td>
                    {barCounts.slice(1).map((n) => (
                      <td key={n} className="py-2.5 px-3 text-text-muted">
                        {(n * a1).toFixed(0)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bảng 3: Dầm liên tục */}
      <section id="sec-pl1-3" className="space-y-3">
        <h3 className="font-serif font-bold text-lg text-text-main">
          3. Bảng hệ số tính toán dầm liên tục (Sơ đồ dẻo &amp; đàn hồi) — T1 tr.380
        </h3>
        <div className="bg-surface rounded-2xl border border-border overflow-x-auto shadow-sm p-4 text-xs space-y-3">
          <p className="text-text-sub">
            Hệ số mômen uốn <InlineMath math="M = \\beta \\cdot q \\cdot L^2" /> cho dầm liên tục có 5 nhịp đều nhau theo lý thuyết khớp dẻo:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center font-mono">
            <div className="p-3 bg-bg rounded-lg border border-border">
              <div className="text-text-sub text-[11px]">Nhịp 1 (Biên)</div>
              <div className="font-bold text-primary mt-1">+1/11 (0.091)</div>
            </div>
            <div className="p-3 bg-bg rounded-lg border border-border">
              <div className="text-text-sub text-[11px]">Gối B (Gối 2)</div>
              <div className="font-bold text-rose-600 mt-1">-1/11 (-0.091)</div>
            </div>
            <div className="p-3 bg-bg rounded-lg border border-border">
              <div className="text-text-sub text-[11px]">Nhịp 2</div>
              <div className="font-bold text-primary mt-1">+1/16 (0.0625)</div>
            </div>
            <div className="p-3 bg-bg rounded-lg border border-border">
              <div className="text-text-sub text-[11px]">Gối C (Gối trong)</div>
              <div className="font-bold text-rose-600 mt-1">-1/16 (-0.0625)</div>
            </div>
            <div className="p-3 bg-bg rounded-lg border border-border">
              <div className="text-text-sub text-[11px]">Nhịp 3 (Giữa)</div>
              <div className="font-bold text-primary mt-1">+1/16 (0.0625)</div>
            </div>
          </div>
        </div>
      </section>

      <ChapterPagination currentPath="/tap-1/phu-luc" />
    </div>
  );
};
