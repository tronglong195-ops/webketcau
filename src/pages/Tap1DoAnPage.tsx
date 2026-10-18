import { InlineMath } from '../components/InlineMath';
import React from 'react';
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
import { RCSlab } from '../three/elements/RCSlab';

export const Tap1DoAnPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-sub mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>/</span>
          <span className="text-text-main font-semibold">Đồ án BT1: Sàn sườn toàn khối loại bản dầm</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main">
          Đồ Án Môn Học BTCT 1: Thiết Kế Sàn Sườn Toàn Khối
        </h1>
        <p className="text-text-sub mt-2 text-base lg:text-lg">
          Hướng dẫn toàn diện từng bước làm đồ án môn học: Chọn kích thước tiết diện, tính toán bản sàn, dầm phụ, dầm chính, vẽ biểu đồ bao mômen - bao vật liệu và xuất bản vẽ thi công A1.
        </p>
      </div>

      <StandardBanner volume="tap1" />

      {/* QUICK LINKS */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-2 text-xs md:text-sm">
        <a href="#sec-bt1-1" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">BT1.1 Đề bài &amp; Số liệu</a>
        <a href="#sec-bt1-2" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">BT1.2 Thiết kế bản sàn</a>
        <a href="#sec-bt1-3" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">BT1.3 Thiết kế dầm phụ</a>
        <a href="#sec-bt1-4" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">BT1.4 Thiết kế dầm chính</a>
        <a href="#sec-bt1-5" className="px-3 py-1.5 rounded-lg bg-bg hover:bg-primary/10 border border-border">BT1.5 Bản vẽ &amp; Thống kê</a>
      </div>

      {/* BT1.1 ĐỀ BÀI VÀ SỐ LIỆU */}
      <section id="sec-bt1-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">BT1.1</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Đề bài và số liệu tính toán</h2>
        </div>
        <p className="text-text-sub leading-relaxed">
          Đề bài đồ án môn học BTCT 1 yêu cầu thiết kế hệ sàn sườn toàn khối cho một công trình nhiều tầng có mặt bằng lưới cột chữ nhật <InlineMath math="L_1 \\times L_2" /> (ví dụ: nhịp dầm chính <InlineMath math="L_c = 6.6\\text{ m}" />, nhịp dầm phụ <InlineMath math="L_{dp} = 6.0\\text{ m}" />, khoảng cách dầm phụ <InlineMath math="l_1 = 2.2\\text{ m}" />).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-sub">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-text-main">1. Chọn vật liệu</h4>
            <p>Bê tông cấp độ bền B20 (Rb = 11.5 MPa, Rbt = 0.90 MPa). Cốt thép bản sàn dùng nhóm CI/CB240-T; Cốt thép dầm dùng CII/CB300-V (Rs = 280 MPa).</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-text-main">2. Tải trọng</h4>
            <p>Tĩnh tải các lớp sàn (gạch ceramic, vữa lót, bản bê tông, trát trần): <InlineMath math="g = \\sum g_i \\gamma_i" />. Hoạt tải tiêu chuẩn sử dụng <InlineMath math="p_c" /> (nhân hệ số tin cậy <InlineMath math="\\gamma_p = 1.2" /> hoặc <InlineMath math="1.3" />).</p>
          </div>
          <div className="p-4 bg-surface rounded-xl border border-border space-y-1">
            <h4 className="font-semibold text-text-main">3. Kích thước sơ bộ</h4>
            <p>Bản: <InlineMath math="h_b = 80\\text{ mm}" />. Dầm phụ: <InlineMath math="200 \\times 450\\text{ mm}" />. Dầm chính: <InlineMath math="250 \\times 700\\text{ mm}" />. Cột đỡ: <InlineMath math="350 \\times 350\\text{ mm}" />.</p>
          </div>
        </div>
      </section>

      {/* 3D VIEWER: PROJECT 1 FLOOR SYSTEM */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-text-main text-lg">Mặt Bằng Kết Cấu Sàn Sườn 3D (Đồ Án BT1)</h3>
            <p className="text-xs text-text-sub">Mô hình hóa hệ kết cấu không gian: bản sàn, dầm phụ, dầm chính và cột đỡ</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-semibold">Tương tác 3D</span>
        </div>
        <div className="h-96 w-full rounded-xl overflow-hidden border border-border bg-slate-900/40">
          <ViewerCanvas cameraPosition={[3.2, 2.2, 3.2]}>
            {({ isXray, wireframe }) => (
              <RCSlab lxMm={3500} lyMm={6600} hMm={100} isXray={isXray} wireframe={wireframe} />
            )}
          </ViewerCanvas>
        </div>
      </div>

      {/* BT1.2 THIẾT KẾ BẢN SÀN */}
      <section id="sec-bt1-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">BT1.2</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Thiết kế bản sàn</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Cắt một dải bản b = 1m vuông góc với các dầm phụ. Sơ đồ tính là dầm liên tục nhiều nhịp tựa lên các dầm phụ và tường ngoài (T1 tr.345):
        </p>

        <FormulaBlock
          number="(DA.1)"
          source="T1 tr.348"
          latex={'M_{n1} = M_{g2} = \\frac{q L_0^2}{11} \\quad ; \\quad M_{n2} = M_{gn} = \\frac{q L_0^2}{16}'}
          description="Nhịp tính toán: L0 = l1 - b_dp (nhịp giữa) hoặc l1 - 0.5 b_dp + 0.5 a_tuong (nhịp biên)."
        />
        <div className="p-4 bg-surface rounded-xl border border-border space-y-2 text-xs">
          <h4 className="font-semibold text-primary">Cấu tạo thép bản sàn:</h4>
          <p className="text-text-sub">
            Cốt thép chịu mômen dương đặt ở đáy bản. Cốt thép chịu mômen âm (thép mũ) đặt ở đỉnh bản tại gối dầm phụ. Dùng thép phi 6 hoặc phi 8 với khoảng cách a = 100 - 200 mm. Thép phân bố đặt vuông góc với thép chịu lực (tối thiểu 15-20% diện tích thép chính).
          </p>
        </div>
      </section>

      {/* BT1.3 THIẾT KẾ DẦM PHỤ */}
      <section id="sec-bt1-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">BT1.3</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Thiết kế dầm phụ</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Dầm phụ là dầm liên tục có các gối tựa là dầm chính. Tải trọng tác dụng gồm tĩnh tải tự trọng dầm phụ và tải trọng từ bản sàn truyền vào (T1 tr.355):
        </p>

        <FormulaBlock
          number="(DA.2)"
          source="T1 tr.358"
          latex={'q_{dp} = g_{dp}^{tt} + q_{ban}^{tt} \\cdot l_1'}
          description="Tính theo sơ đồ dẻo: Mmax = q*L0^2 / 11; Qmax = 0.6*q*L0."
        />
        <p className="text-xs text-text-sub">
          Tại nhịp, dầm phụ làm việc như tiết diện chữ T cánh nén (bf' tính theo bảng quy phạm). Tại gối, cánh bê tông chịu kéo bị nứt, dầm làm việc như tiết diện chữ nhật b x h.
        </p>
      </section>

      {/* BT1.4 THIẾT KẾ DẦM CHÍNH */}
      <section id="sec-bt1-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">BT1.4</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Thiết kế dầm chính</h2>
        </div>
        <p className="text-text-sub text-sm leading-relaxed">
          Dầm chính chịu tải trọng tập trung rất lớn từ các dầm phụ truyền vào. Tính toán theo sơ đồ đàn hồi có xét các trường hợp sắp xếp hoạt tải để lập biểu đồ bao mômen và bao lực cắt (T1 tr.368):
        </p>

        <FormulaBlock
          number="(DA.3)"
          source="T1 tr.372"
          latex={'P_{dp} = Q_{dp,trai} + Q_{dp,phai} \\quad ; \\quad A_{sw,treo} = \\frac{P_{dp} (1 - h_{dp}/h_{dc})}{R_{sw}}'}
          description="Lực tập trung truyền vào dầm chính và công thức tính cốt đai treo gia cường tại nút gác."
        />
      </section>

      {/* BT1.5 BẢN VẼ VÀ THỐNG KÊ CỐT THÉP */}
      <section id="sec-bt1-5" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">BT1.5</span>
          <h2 className="text-2xl font-serif font-bold text-text-main">Bản vẽ thi công A1 và bảng thống kê thép</h2>
        </div>
        <div className="p-5 bg-surface rounded-xl border border-border space-y-3 text-xs text-text-sub">
          <h4 className="font-bold text-sm text-text-main">Quy cách thể hiện hồ sơ bản vẽ đồ án BT1:</h4>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>Mặt bằng kết cấu sàn (Tỷ lệ 1/100):</strong> Định vị trục lưới cột, dầm chính, dầm phụ, chiều dày sàn và ký hiệu ô sàn.</li>
            <li><strong>Mặt cắt dọc dầm chính và dầm phụ (Tỷ lệ dài 1/50, cao 1/20):</strong> Thể hiện đầy đủ thanh cốt thép dọc, cốt đai, cốt treo, kích thước và cao độ. Kèm theo biểu đồ bao mômen và biểu đồ bao vật liệu phía dưới.</li>
            <li><strong>Các mặt cắt ngang dầm (Tỷ lệ 1/20):</strong> Cắt tại nhịp (thấy thép đáy) và cắt tại gối (thấy thép mũ đỉnh).</li>
            <li><strong>Bảng thống kê cốt thép:</strong> Số hiệu thanh, hình dạng uốn, đường kính d (mm), số lượng, chiều dài 1 thanh, tổng chiều dài và trọng lượng (kg).</li>
          </ul>
        </div>

        <ConstructionNote title="Kinh nghiệm bảo vệ đồ án BT1 đạt điểm cao">
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Nắm chắc vì sao nhịp biên có mômen lớn hơn nhịp giữa (do gối biên có độ cứng xoay kiềm chế kém hơn gối trong).</li>
            <li>Giải thích rõ tại sao tiết diện dầm ở nhịp tính theo chữ T, còn ở gối lại tính theo chữ nhật.</li>
            <li>Chỉ rõ trên bản vẽ vị trí tiết diện lý thuyết và tiết diện cắt thanh thực tế w (đoạn neo chống nhổ).</li>
          </ul>
        </ConstructionNote>

        <CommonMistakes
          mistakes={[
            {
              mistake: 'Cắt thanh thép dầm chính ngay đúng vị trí tiết diện cắt lý thuyết trên biểu đồ mômen.',
              consequence: 'Dầm bị nứt gãy nghiêng do thanh thép chưa đủ chiều dài đoạn neo w vượt qua tiết diện nứt.',
              correction: 'Phải kéo dài thanh thép một đoạn w >= 20d và w >= h/3 vượt quá tiết diện cắt lý thuyết.',
              bookRef: 'T1 tr.335'
            },
            {
              mistake: 'Quên cộng trọng lượng bản thân dầm chính khi tính mômen uốn.',
              consequence: 'Thiếu hụt mômen tĩnh tải gây võng dầm chính.',
              correction: 'Luôn tính g_dc = b * (h - hb) * gamma_bt * 1.1.',
              bookRef: 'T1 tr.369'
            }
          ]}
        />
      </section>

      {/* FLASHCARDS & QUIZ */}
      <FlashcardDeck
        title="Ghi nhớ nhanh Đồ Án BT1"
        cards={[
          { front: 'Tại sao tại gối dầm phụ lại tính toán theo tiết diện chữ nhật b x h?', back: 'Vì mômen âm làm nứt vùng bê tông cánh ở đỉnh dầm, chỉ còn vùng bê tông đáy chịu nén.' },
          { front: 'Đoạn kéo dài neo w khi cắt cốt thép dầm có tác dụng gì?', back: 'Đảm bảo thanh thép phát huy hết khả năng chịu lực chống nứt xiên theo tiết diện nghiêng.' },
          { front: 'Tác dụng của cốt đai treo tại nút dầm phụ gác lên dầm chính?', back: 'Treo toàn bộ phản lực tập trung P của dầm phụ lên vùng đỉnh dầm chính, tránh toác đáy dầm.' }
        ]}
      />

      <QuizBlock
        title="Kiểm tra kiến thức Đồ Án BT1"
        questions={[
          {
            question: 'Khi tính toán dầm phụ ở nhịp giữa, tại sao dầm làm việc như tiết diện chữ T?',
            options: ['Vì bản sàn gắn liền nằm ở vùng nén tham gia chịu lực cùng dầm', 'Vì hình dạng bê tông đúc sẵn', 'Vì dầm phụ chịu xoắn', 'Vì tải trọng là tải phân bố'],
            correctIndex: 0,
            explanation: 'Ở nhịp giữa, mômen uốn dương làm thớ trên bị nén, bản sàn toàn khối tham gia vào vùng nén tạo thành cánh chữ T rất lớn.'
          },
          {
            question: 'Đoạn kéo dài neo w khi cắt cốt thép dầm tối thiểu bằng bao nhiêu?',
            options: ['w >= 5d', 'w >= 10d', 'w >= 20d và w >= h/3', 'w = 0'],
            correctIndex: 2,
            explanation: 'Theo quy phạm cấu tạo neo cốt thép, đoạn kéo dài neo w phải >= 20d và >= h/3 kể từ tiết diện cắt lý thuyết.'
          }
        ]}
      />

      <ChapterPagination currentPath="/tap-1/do-an-bt1" />
    </div>
  );
};
