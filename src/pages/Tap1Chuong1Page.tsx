import React from 'react';
import { Link } from 'react-router-dom';
import { StandardBanner } from '../components/StandardBanner';
import { FormulaBlock } from '../components/FormulaBlock';
import { ConstructionNote } from '../components/ConstructionNote';
import { CommonMistakes } from '../components/CommonMistakes';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { QuizBlock } from '../components/QuizBlock';
import { ChapterPagination } from '../components/ChapterPagination';
import { ViewerCanvas } from '../three/common/ViewerCanvas';
import { RCBeam } from '../three/elements/RCBeam';

export const Tap1Chuong1Page: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Tiêu đề chương */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          <span>Tập 1: Cấu kiện cơ bản</span>
          <span>&bull;</span>
          <span>Chương 1</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-text-main mb-4 leading-tight">
          Chương 1: Khái niệm chung về Bê tông Cốt thép
        </h1>
        <p className="text-text-muted text-base leading-relaxed">
          Bản chất cộng tác chịu lực giữa bê tông và cốt thép, phân loại theo công nghệ thi công và trạng thái ứng suất, ưu khuyết điểm và phạm vi ứng dụng trong xây dựng hiện đại.
        </p>
      </div>

      <StandardBanner />

      {/* Mục lục nhanh */}
      <nav className="p-4 bg-surface border border-border rounded-xl text-xs flex flex-wrap gap-4">
        <a href="#sec-1-1" className="text-primary hover:underline font-medium">1.1 Bê tông cốt thép là gì</a>
        <a href="#sec-1-2" className="text-primary hover:underline font-medium">1.2 Phân loại kết cấu BTCT</a>
        <a href="#sec-1-3" className="text-primary hover:underline font-medium">1.3 Ưu và khuyết điểm</a>
        <a href="#sec-1-4" className="text-primary hover:underline font-medium">1.4 Phạm vi ứng dụng</a>
        <a href="#sec-quiz" className="text-emerald-700 hover:underline font-semibold">📝 Trắc nghiệm &amp; Flashcards</a>
      </nav>

      {/* 3D Model: Khối bê tông và cốt thép */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-bg/50">
          <h4 className="font-serif font-bold text-base text-text-main">
            Mô hình 3D tương tác: Bản chất cộng tác chịu lực
          </h4>
          <p className="text-xs text-text-muted mt-0.5">
            Bê tông bao bọc bảo vệ cốt thép; cốt thép đặt vào vùng chịu kéo để nâng cao khả năng chịu lực gấp hàng chục lần.
          </p>
        </div>
        <div className="h-[360px] bg-[#151922] relative">
          <ViewerCanvas cameraPosition={[2, 1.5, 2]}>
            {({ isXray, wireframe }) => (
              <RCBeam
                type="rect"
                lengthMm={2400}
                bMm={200}
                hMm={350}
                isXray={isXray}
                wireframe={wireframe}
                rebarProps={{
                  bottomCount: 3,
                  bottomDiamMm: 18,
                  topCount: 2,
                  topDiamMm: 12,
                  stirrupSpacingMidspan: 150,
                  stirrupSpacingSupport: 100,
                }}
              />
            )}
          </ViewerCanvas>
          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border text-xs font-mono shadow">
            👁️ Bấm nút <strong>X-ray</strong> ở góc trên bên phải để nhìn xuyên thấu cốt thép bên trong dầm
          </div>
        </div>
      </div>

      {/* 1.1 BÊ TÔNG CỐT THÉP LÀ GÌ */}
      <section id="sec-1-1" className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            1.1
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">Bê tông cốt thép là gì</h2>
        </div>

        <p className="text-text-main leading-relaxed text-sm">
          Bê tông cốt thép (BTCT) là một loại vật liệu phức hợp gồm <strong>bê tông</strong> và <strong>cốt thép</strong> cùng phối hợp làm việc chịu lực với nhau.
        </p>

        <div className="p-4 bg-bg rounded-xl border border-border text-xs space-y-2">
          <div className="font-semibold text-text-main">Thành phần cấu tạo:</div>
          <div className="font-mono text-primary font-bold">
            BÊ TÔNG = ĐÁ (SỎI) + CÁT + XI MĂNG + NƯỚC + PHỤ GIA
          </div>
          <p className="text-text-muted leading-relaxed">
            Bê tông có cường độ chịu nén rất tốt nhưng khả năng chịu kéo rất kém (cường độ kéo chỉ bằng khoảng 1/10 đến 1/15 cường độ nén). Khi chịu uốn, nếu không có cốt thép, vùng kéo sẽ bị nứt và dầm gãy gập khi khả năng chịu nén của bê tông mới khai thác được một phần rất nhỏ. Đặt cốt thép vào vùng kéo giúp tận dụng triệt để cường độ nén của bê tông, nâng khả năng chịu tải của dầm lên <strong>hàng chục lần</strong>.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-base text-text-main">
            3 yếu tố quyết định sự cộng tác hoàn hảo giữa Bê tông và Cốt thép (T1 tr.9)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
              <span className="text-lg">🤝</span>
              <h4 className="font-serif font-bold text-sm text-text-main">1. Lực dính bám (Bond)</h4>
              <p className="text-text-muted leading-relaxed">
                Lực dính bám giữa bê tông và bề mặt cốt thép giúp truyền tải trọng và nội lực qua lại giữa hai vật liệu. Nhờ lực dính, cốt thép không bị tuột trượt khi dầm uốn cong, hạn chế bề rộng khe nứt mở rộng.
              </p>
            </div>

            <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
              <span className="text-lg">🌡️</span>
              <h4 className="font-serif font-bold text-sm text-text-main">2. Hệ số giãn nở nhiệt tương đồng</h4>
              <p className="text-text-muted leading-relaxed">
                Hệ số giãn nở vì nhiệt của bê tông và cốt thép xấp xỉ bằng nhau:
                <br />
                <span className="font-mono text-primary font-semibold">
                  alpha_s = (1.0 - 1.5) x 10⁻⁵ / °C
                </span>
                <br />
                <span className="font-mono text-primary font-semibold">
                  alpha_b = 1.2 x 10⁻⁵ / °C
                </span>
                <br />
                Do đó trong khoảng nhiệt độ môi trường (&lt; 100°C), không sinh ra nội ứng suất phá hủy lực dính bám.
              </p>
            </div>

            <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
              <span className="text-lg">🛡️</span>
              <h4 className="font-serif font-bold text-sm text-text-main">3. Bảo vệ hóa học chống ăn mòn</h4>
              <p className="text-text-muted leading-relaxed">
                Môi trường kiềm cao của bê tông (pH &gt; 12 do Ca(OH)2 sinh ra khi thủy hóa xi măng) tạo lớp màng thụ động bảo vệ thép khỏi bị oxy hóa gỉ sét. Bê tông còn đóng vai trò lớp áo cách nhiệt chống cháy cho cốt thép.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1.2 PHÂN LOẠI */}
      <section id="sec-1-2" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            1.2
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">Phân loại kết cấu BTCT</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-serif font-semibold text-sm text-text-main">A. Phân loại theo phương pháp thi công</h4>
            <ul className="text-text-muted space-y-1.5 list-disc list-inside">
              <li><strong>BTCT toàn khối (Cast-in-place):</strong> Lắp dựng ván khuôn, đặt cốt thép và đổ bê tông trực tiếp tại vị trí công trình. Độ cứng không gian cao, chống rung động và động đất rất tốt.</li>
              <li><strong>BTCT lắp ghép (Precast):</strong> Cấu kiện được đúc sẵn trong nhà máy hoặc bãi đúc, sau đó vận chuyển đến công trường lắp ghép và nối mối hàn/bê tông chèn. Tiết kiệm ván khuôn, tốc độ thi công nhanh.</li>
              <li><strong>BTCT bán lắp ghép:</strong> Kết hợp đúc sẵn phần chịu tải trọng bản thân và thi công toàn khối phần bản mặt sàn hoàn thiện.</li>
            </ul>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
            <h4 className="font-serif font-semibold text-sm text-text-main">B. Phân loại theo trạng thái ứng suất</h4>
            <ul className="text-text-muted space-y-1.5 list-disc list-inside">
              <li><strong>BTCT thông thường:</strong> Cốt thép đặt tự nhiên vào bê tông, chỉ chịu lực khi ngoại lực tác dụng lên công trình. Khi chịu uốn ở tải trọng sử dụng thường đã có vết nứt nhỏ trong giới hạn cho phép.</li>
              <li><strong>BTCT ứng lực trước (Prestressed Concrete):</strong> Căng trước cốt thép cường độ rất cao tạo lực nén trước vào vùng bê tông dự kiến chịu kéo. Kết cấu không bị nứt dưới tải trọng sử dụng, độ cứng lớn và vượt được nhịp lớn (dầm cầu, sàn phẳng nhịp lớn).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 1.3 ƯU VÀ KHUYẾT ĐIỂM */}
      <section id="sec-1-3" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            1.3
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">Ưu và khuyết điểm</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2 text-emerald-950">
            <h4 className="font-serif font-bold text-sm text-emerald-900">Ưu điểm nổi bật</h4>
            <ul className="space-y-1.5 list-disc list-inside">
              <li><strong>Giá thành hợp lý:</strong> Tận dụng được các vật liệu địa phương sẵn có (đá, cát, sỏi, nước) chiếm 80-90% thể tích.</li>
              <li><strong>Khả năng chịu lực cao:</strong> Chịu được tải trọng lớn và tải trọng động (rung lắc máy móc, gió bão, động đất).</li>
              <li><strong>Độ bền lâu dài:</strong> Bê tông đóng rắn trong môi trường ẩm càng để lâu càng tăng cường độ, chi phí bảo dưỡng thấp hơn kết cấu thép.</li>
              <li><strong>Chịu lửa tốt:</strong> Lớp bê tông bảo vệ cách nhiệt cho cốt thép khi có hỏa hoạn trong vài giờ.</li>
              <li><strong>Tạo hình kiến trúc phong phú:</strong> Có thể đổ vào khuôn tạo thành các hình dạng uốn lượn, vòm, vỏ mỏng không gian.</li>
            </ul>
          </div>

          <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2 text-rose-950">
            <h4 className="font-serif font-bold text-sm text-rose-900">Khuyết điểm &amp; Biện pháp khắc phục</h4>
            <ul className="space-y-1.5 list-disc list-inside">
              <li><strong>Trọng lượng bản thân lớn:</strong> Khắc phục bằng cách dùng bê tông cường độ cao, bê tông nhẹ, hoặc kết cấu rỗng, ứng lực trước.</li>
              <li><strong>Dễ xuất hiện vết nứt:</strong> Do bê tông chịu kéo kém. Khắc phục bằng cách tính toán khống chế bề rộng khe nứt <code>a_crc &le; a_crc,gh</code> hoặc dùng giải pháp bê tông cốt thép ứng lực trước.</li>
              <li><strong>Cách âm, cách nhiệt trung bình:</strong> Bê tông nặng dẫn nhiệt nhanh. Cần kết hợp vật liệu xốp cách âm cách nhiệt.</li>
              <li><strong>Thi công phụ thuộc thời tiết:</strong> Cần thời gian bảo dưỡng bê tông (7 - 28 ngày) để đạt đủ cường độ tháo dỡ cốp pha.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 1.4 PHẠM VI ỨNG DỤNG */}
      <section id="sec-1-4" className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm">
            1.4
          </span>
          <h2 className="font-serif font-bold text-2xl text-text-main">Phạm vi ứng dụng</h2>
        </div>

        <p className="text-text-main text-sm leading-relaxed">
          Hiện nay, bê tông cốt thép là vật liệu chủ đạo trong hầu hết các lĩnh vực xây dựng:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-surface rounded-lg border border-border">
            <div className="font-bold text-text-main mb-1">🏢 Dân dụng &amp; Nhà cao tầng</div>
            <p className="text-text-muted">Móng bè, cọc khoan nhồi, cột, vách thang máy, dầm, sàn không dầm.</p>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <div className="font-bold text-text-main mb-1">🏭 Công nghiệp</div>
            <p className="text-text-muted">Nhà xưởng nhịp lớn, khung cột đỡ cầu trục, silô chứa xi măng, bunke than.</p>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <div className="font-bold text-text-main mb-1">🌉 Cầu &amp; Giao thông</div>
            <p className="text-text-muted">Mố trụ cầu, dầm Super-T, dầm hộp đúc hẫng, mặt đường bê tông, đường hầm Metro.</p>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <div className="font-bold text-text-main mb-1">🌊 Thủy lợi &amp; Bến cảng</div>
            <p className="text-text-muted">Đập bê tông trọng lực, cống điều tiết, âu thuyền, cầu cảng nước sâu, bể chứa dầu.</p>
          </div>
        </div>
      </section>

      {/* FLASHCARDS */}
      <section className="pt-6 border-t border-border">
        <FlashcardDeck
          title="Flashcards ôn tập nhanh Chương 1"
          cards={[
            {
              front: 'Tại sao lại đặt cốt thép vào vùng chịu kéo của cấu kiện chịu uốn?',
              back: 'Vì bê tông chịu kéo rất kém (chỉ bằng 1/10 - 1/15 cường độ nén). Đặt thép vào vùng kéo giúp gánh toàn bộ lực kéo sau khi nứt, khai thác triệt để khả năng chịu nén của bê tông.',
              category: 'BẢN CHẤT BTCT',
            },
            {
              front: 'Hệ số giãn nở nhiệt của bê tông và cốt thép bằng bao nhiêu?',
              back: 'Cốt thép: alpha_s = (1.0 - 1.5) x 10⁻⁵ / °C. Bê tông: alpha_b xấp xỉ 1.2 x 10⁻⁵ / °C. Chúng gần bằng nhau nên không làm nứt hỏng lực dính khi nhiệt độ thay đổi.',
              category: 'VẬT LÝ',
            },
            {
              front: '3 yếu tố quyết định sự cộng tác giữa bê tông và cốt thép là gì?',
              back: '1. Lực dính bám (Bond) truyền lực qua lại; 2. Hệ số giãn nở nhiệt bằng nhau tránh nội ứng suất; 3. Bê tông có môi trường kiềm (pH > 12) bảo vệ cốt thép chống gỉ sét.',
              category: 'CỐT LÕI',
            },
            {
              front: 'Ưu điểm lớn nhất của bê tông cốt thép ứng lực trước là gì?',
              back: 'Không bị nứt hoặc nứt rất muộn dưới tải trọng sử dụng, độ cứng tổng thể cao, tiết diện thanh mảnh và vượt được nhịp lớn hơn nhiều so với BTCT thường.',
              category: 'PHÂN LOẠI',
            },
          ]}
        />
      </section>

      {/* TRẮC NGHIỆM */}
      <section id="sec-quiz" className="pt-6 border-t border-border">
        <QuizBlock
          title="Trắc nghiệm củng cố Chương 1"
          questions={[
            {
              question: 'Khả năng chịu kéo của bê tông nặng thông thường so với khả năng chịu nén bằng khoảng:',
              options: [
                'Bằng nhau (1/1)',
                'Khoảng 1/2 đến 1/3',
                'Khoảng 1/10 đến 1/15',
                'Gấp đôi khả năng chịu nén',
              ],
              correctIndex: 2,
              explanation: 'Cường độ chịu kéo của bê tông Rbt rất nhỏ, chỉ bằng khoảng 8% - 10% cường độ nén Rb.',
            },
            {
              question: 'Nguyên nhân nào dưới đây KHÔNG PHẢI là lý do bê tông và cốt thép cộng tác được với nhau?',
              options: [
                'Giữa bê tông và cốt thép có lực dính bám lớn',
                'Bê tông và cốt thép có hệ số giãn nở nhiệt xấp xỉ nhau',
                'Bê tông bảo vệ cốt thép khỏi bị oxy hóa gỉ sét',
                'Bê tông và cốt thép phản ứng hóa học tạo thành hợp chất mới',
              ],
              correctIndex: 3,
              explanation: 'Giữa bê tông và cốt thép không xảy ra phản ứng hóa học tạo hợp chất mới. Sự cộng tác thuần túy về mặt cơ học bám dính.',
            },
          ]}
        />
      </section>

      {/* Điều hướng chương */}
      <ChapterPagination currentPath="/tap-1/chuong-1" />
    </div>
  );
};
