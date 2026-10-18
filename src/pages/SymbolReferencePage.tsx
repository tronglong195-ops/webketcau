import React, { useState } from 'react';
import { InlineMath } from '../components/InlineMath';

interface SymbolItem {
  symbol: string;
  latex: string;
  name: string;
  unit: string;
  definition: string;
  reference: string;
}

const SYMBOLS: SymbolItem[] = [
  { symbol: 'Rb', latex: 'R_b', name: 'Cường độ tính toán chịu nén của bê tông', unit: 'MPa (hoặc kG/cm²)', definition: 'Đặc trưng cường độ chịu nén lăng trụ theo trạng thái giới hạn thứ nhất.', reference: 'T1 tr.25' },
  { symbol: 'Rbt', latex: 'R_{bt}', name: 'Cường độ tính toán chịu kéo của bê tông', unit: 'MPa', definition: 'Đặc trưng chịu kéo dọc trục của bê tông dùng trong tính toán chịu cắt và nứt.', reference: 'T1 tr.27' },
  { symbol: 'Eb', latex: 'E_b', name: 'Môđun đàn hồi ban đầu của bê tông', unit: 'MPa', definition: 'Độ dốc tiếp tuyến ban đầu của đường cong ứng suất - biến dạng bê tông.', reference: 'T1 tr.32' },
  { symbol: 'Rs', latex: 'R_s', name: 'Cường độ tính toán chịu kéo của cốt thép dọc', unit: 'MPa', definition: 'Cường độ dùng để tính toán cốt thép chịu kéo trên tiết diện thẳng góc.', reference: 'T1 tr.40' },
  { symbol: 'Rsc', latex: 'R_{sc}', name: 'Cường độ tính toán chịu nén của cốt thép', unit: 'MPa', definition: 'Cường độ chịu nén lớn nhất của cốt thép đặt trong vùng nén của bê tông.', reference: 'T1 tr.40' },
  { symbol: 'Rsw', latex: 'R_{sw}', name: 'Cường độ tính toán chịu cắt của cốt đai', unit: 'MPa', definition: 'Cường độ chịu kéo của thanh cốt đai bắc qua vết nứt nghiêng.', reference: 'T1 tr.120' },
  { symbol: 'h0', latex: 'h_0', name: 'Chiều cao làm việc của tiết diện', unit: 'mm', definition: 'Khoảng cách từ mép chịu nén ngoài cùng đến trọng tâm vùng cốt kéo: h0 = h - a.', reference: 'T1 tr.61' },
  { symbol: 'x', latex: 'x', name: 'Chiều cao quy ước của vùng bê tông chịu nén', unit: 'mm', definition: 'Chiều cao khối ứng suất chữ nhật tương đương chịu nén của bê tông.', reference: 'T1 tr.62' },
  { symbol: 'xi', latex: '\\xi', name: 'Chiều cao tương đối của vùng nén', unit: 'Không thứ nguyên', definition: 'Tỷ số giữa chiều cao vùng nén x và chiều cao làm việc h0: xi = x / h0.', reference: 'T1 tr.62' },
  { symbol: 'xi_R', latex: '\\xi_R', name: 'Chiều cao tương đối giới hạn của vùng nén', unit: 'Không thứ nguyên', definition: 'Giá trị giới hạn phân biệt phá hoại dẻo (xi <= xi_R) và phá hoại giòn (xi > xi_R).', reference: 'T1 tr.62' },
  { symbol: 'alpha_m', latex: '\\alpha_m', name: 'Hệ số momen uốn tính toán', unit: 'Không thứ nguyên', definition: 'Tỷ số giữa momen ngoại lực M và khả năng chịu nén cực đại: M / (gamma_b * Rb * b * h0^2).', reference: 'T1 tr.65' },
  { symbol: 'alpha_R', latex: '\\alpha_R', name: 'Hệ số momen uốn giới hạn', unit: 'Không thứ nguyên', definition: 'alpha_R = xi_R * (1 - 0.5 * xi_R). Giá trị lớn nhất để dầm đặt cốt đơn.', reference: 'T1 tr.65' },
  { symbol: 'zeta', latex: '\\zeta', name: 'Hệ số cánh tay đòn nội lực', unit: 'Không thứ nguyên', definition: 'zeta = 1 - 0.5 * xi. Khoảng cách giữa hợp lực nén và hợp lực kéo là zeta * h0.', reference: 'T1 tr.65' },
  { symbol: 'mu', latex: '\\mu', name: 'Hàm lượng cốt thép chịu kéo', unit: '%', definition: 'mu = (As / (b * h0)) * 100%. Đánh giá mức độ tiết kiệm và dẻo của tiết diện.', reference: 'T1 tr.66' },
  { symbol: "b'f", latex: "b'_f", name: 'Bề rộng cánh chịu nén dầm chữ T', unit: 'mm', definition: 'Bề rộng cánh tính toán tham gia chịu nén cùng với sườn dầm trong sàn toàn khối.', reference: 'T1 tr.88' },
  { symbol: "h'f", latex: "h'_f", name: 'Chiều dày cánh nén dầm chữ T', unit: 'mm', definition: 'Chiều dày bản sàn tại vị trí cánh dầm chữ T.', reference: 'T1 tr.88' },
  { symbol: 'Mf', latex: 'M_f', name: 'Momen giới hạn của bản cánh dầm chữ T', unit: 'kNm', definition: 'Mf = gamma_b * Rb * b\'f * h\'f * (h0 - 0.5 * h\'f). Dùng xác định vị trí trục trung hòa.', reference: 'T1 tr.89' },
  { symbol: 'w', latex: 'w', name: 'Đoạn kéo dài neo cốt thép', unit: 'mm', definition: 'Khoảng cách từ tiết diện cắt lý thuyết đến tiết diện cắt thực tế trong biểu đồ vật liệu.', reference: 'T1 tr.155' },
  { symbol: 'c0', latex: 'c_0', name: 'Hình chiếu vết nứt nghiêng nguy hiểm nhất', unit: 'mm', definition: 'Chiều dài hình chiếu bằng của vết nứt xiên mà tại đó khả năng chịu cắt Qub đạt cực tiểu.', reference: 'T1 tr.124' },
];

export const SymbolReferencePage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = SYMBOLS.filter(
    (s) =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-serif font-bold text-3xl text-text-main mb-2">Bảng tra cứu ký hiệu kỹ thuật</h1>
        <p className="text-sm text-text-muted">
          Định nghĩa chuẩn xác toàn bộ biến số, hệ số và đơn vị đo lường trong bộ sách Võ Bá Tầm và tiêu chuẩn TCXDVN 356:2005.
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Tìm ký hiệu (ví dụ: Rb, xi_R, h0, alpha_m, b'f...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-3 text-xs text-text-muted hover:text-text-main px-2 py-0.5 rounded"
          >
            Xóa ✕
          </button>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg/80 border-b border-border text-text-muted font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-28">Ký hiệu</th>
                <th className="py-3 px-4 w-44">Tên gọi</th>
                <th className="py-3 px-4 w-28">Đơn vị</th>
                <th className="py-3 px-4">Ý nghĩa &amp; Định nghĩa</th>
                <th className="py-3 px-4 w-24">Nguồn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-bg/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-primary text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <InlineMath math={item.latex} />
                      <span className="text-[10px] text-text-muted font-mono font-normal">({item.symbol})</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-text-main">{item.name}</td>
                  <td className="py-3 px-4 font-mono text-text-muted">{item.unit}</td>
                  <td className="py-3 px-4 text-text-muted leading-relaxed">{item.definition}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-text-muted">{item.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {filtered.map((item, idx) => (
          <div key={idx} className="p-4 bg-surface rounded-xl border border-border shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold text-base flex items-center">
                  <InlineMath math={item.latex} />
                </div>
                <span className="text-xs font-mono text-text-muted">{item.symbol}</span>
              </div>
              <span className="text-[11px] font-mono bg-bg px-2 py-0.5 rounded border border-border text-text-muted">
                {item.reference}
              </span>
            </div>

            <div>
              <div className="font-semibold text-text-main text-xs">{item.name}</div>
              <div className="text-[11px] font-mono text-primary mt-0.5">Đơn vị: {item.unit}</div>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
