import React, { useState } from 'react';
import { FormulaBlock } from '../components/FormulaBlock';

export const FormulaCheatSheetPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'flexure' | 'shear' | 'material'>('all');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="font-serif font-bold text-3xl text-text-main mb-2">Bảng tra công thức cốt lõi</h1>
        <p className="text-sm text-text-muted">
          Tổng hợp toàn bộ công thức tính toán kết cấu bê tông cốt thép theo sách Võ Bá Tầm (TCXDVN 356:2005 &bull; Đối chiếu TCVN 5574:2018).
        </p>
      </div>

      <div className="flex gap-2 border-b border-border pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filter === 'all' ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:text-text-main'
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter('flexure')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filter === 'flexure' ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:text-text-main'
          }`}
        >
          Uốn thẳng góc
        </button>
        <button
          onClick={() => setFilter('shear')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filter === 'shear' ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:text-text-main'
          }`}
        >
          Cắt trên tiết diện nghiêng
        </button>
        <button
          onClick={() => setFilter('material')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filter === 'material' ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:text-text-main'
          }`}
        >
          Đặc trưng vật liệu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(filter === 'all' || filter === 'material') && (
          <>
            <FormulaBlock
              number="(4.15)"
              source="T1 tr.62"
              latex="\omega = 0.85 - 0.008 \cdot (\gamma_b R_b)"
              description="Đặc trưng vùng biến dạng nén của bê tông nặng (Rb tính bằng MPa)"
              compare5574={true}
            />
            <FormulaBlock
              number="(4.16)"
              source="T1 tr.62"
              latex="\xi_R = \frac{\omega}{1 + \frac{R_s}{500} \left(1 - \frac{\omega}{1.1}\right)}"
              description="Chiều cao vùng nén tương đối giới hạn (bê tông nặng)"
              compare5574={true}
            />
            <FormulaBlock
              number="(4.23)"
              source="T1 tr.65"
              latex="\alpha_R = \xi_R (1 - 0.5 \xi_R)"
              description="Hệ số momen uốn giới hạn tiết diện dẻo"
              compare5574={true}
            />
          </>
        )}

        {(filter === 'all' || filter === 'flexure') && (
          <>
            <FormulaBlock
              number="(4.22)"
              source="T1 tr.65"
              latex="\alpha_m = \frac{M}{\gamma_b R_b b h_0^2} \le \alpha_R"
              description="Điều kiện không cần cốt thép nén (cốt đơn)"
              compare5574={true}
            />
            <FormulaBlock
              number="(4.25)"
              source="T1 tr.66"
              latex="\xi = 1 - \sqrt{1 - 2\alpha_m} \quad ; \quad A_s = \frac{\xi \gamma_b R_b b h_0}{R_s}"
              description="Chiều cao vùng nén tương đối và diện tích cốt thép kéo"
            />
            <FormulaBlock
              number="(4.36)"
              source="T1 tr.89"
              latex="M_f = \gamma_b R_b b'_f h'_f \left(h_0 - \frac{h'_f}{2}\right)"
              description="Giới hạn phân biệt vị trí trục trung hòa dầm chữ T"
            />
            <FormulaBlock
              number="(4.27)"
              source="T1 tr.73"
              latex="A'_s = \frac{M - \alpha_R \gamma_b R_b b h_0^2}{R_{sc} (h_0 - a')}"
              description="Diện tích cốt nén bổ sung khi alpha_m > alpha_R (cốt kép)"
            />
          </>
        )}

        {(filter === 'all' || filter === 'shear') && (
          <>
            <FormulaBlock
              number="(4.56)"
              source="T1 tr.120"
              latex="Q \le 0.3 \phi_{w1} \phi_{b1} \gamma_b R_b b h_0"
              description="Kiểm tra không bị ép vỡ bê tông trên dải nghiêng"
              compare5574={true}
            />
            <FormulaBlock
              number="(4.60)"
              source="T1 tr.124"
              latex="M_b = 2.0 (1 + \phi_f) \gamma_b R_{bt} b h_0^2"
              description="Khả năng chống cắt của bê tông trên tiết diện nghiêng"
            />
            <FormulaBlock
              number="(4.63)"
              source="T1 tr.124"
              latex="s_{max} = \frac{1.5 (1 + \phi_f) \gamma_b R_{bt} b h_0^2}{Q}"
              description="Khoảng cách cốt đai lớn nhất theo điều kiện tính toán"
            />
            <FormulaBlock
              number="(4.65)"
              source="T1 tr.127"
              latex="A_{inc} = \frac{Q - Q_{ub}}{R_{s,inc} \sin\alpha}"
              description="Diện tích cốt xiên yêu cầu khi cốt đai không đủ chịu cắt"
            />
          </>
        )}
      </div>
    </div>
  );
};
