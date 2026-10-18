import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border mt-16 py-10 text-text-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2 font-serif font-bold text-base text-text-main">
              <span className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center text-xs">BT</span>
              <span>Kết Cấu Bê Tông Cốt Thép — Sổ Tay Học Tập 3D</span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted pr-6">
              Dự án số hóa trực quan toàn bộ giáo trình 3 tập của PGS. TS. Võ Bá Tầm (NXB ĐHQG TP.HCM). Trang web phục vụ mục đích học tập cá nhân, nghiên cứu chuyên sâu và tra cứu kỹ thuật xây dựng công trình.
            </p>
            <div className="mt-3 text-[11px] font-mono text-text-muted/80">
              Tiêu chuẩn cốt lõi: TCXDVN 356:2005 (T1, T2), TCVN 5574-1991 (T3) đối chiếu TCVN 5574:2018.
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-text-main text-xs uppercase tracking-wider mb-3">Tập Giáo Trình</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/tap-1/chuong-4" className="hover:text-primary transition-colors">Tập 1: Cấu kiện cơ bản</Link></li>
              <li><Link to="/tap-2/chuong-1" className="hover:text-primary transition-colors">Tập 2: Cấu kiện nhà cửa</Link></li>
              <li><Link to="/tap-3/chuong-1" className="hover:text-primary transition-colors">Tập 3: Các cấu kiện đặc biệt</Link></li>
              <li><Link to="/demo-3d" className="hover:text-primary transition-colors">Phòng mô hình 3D tổng hợp</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-text-main text-xs uppercase tracking-wider mb-3">Công Cụ & Tra Cứu</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/cong-thuc" className="hover:text-primary transition-colors">Sổ tay công thức LaTeX</Link></li>
              <li><Link to="/ky-hieu" className="hover:text-primary transition-colors">Bảng ký hiệu quy ước</Link></li>
              <li><Link to="/phu-luc" className="hover:text-primary transition-colors">Bảng tra phụ lục số liệu</Link></li>
              <li><Link to="/tra-cuu" className="hover:text-primary transition-colors">Tìm kiếm toàn văn Fuse.js</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2">
          <div>
            © 2026 Sổ tay học tập cá nhân. Toàn bộ hình vẽ được dựng mới bằng React + Three.js & SVG.
          </div>
          <div className="font-mono text-[11px]">
            WCAG AA Compliant • 100% Static Client
          </div>
        </div>
      </div>
    </footer>
  );
};
