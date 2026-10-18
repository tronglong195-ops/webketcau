import React from 'react';

interface StandardBannerProps {
  volume?: 'tap1' | 'tap2' | 'tap3';
}

export const StandardBanner: React.FC<StandardBannerProps> = ({ volume = 'tap1' }) => {
  const standardText =
    volume === 'tap3'
      ? 'Theo sách: TCVN 5574-1991 — đã được thay bằng TCVN 5574:2018. Đối chiếu trước khi dùng cho thiết kế thật.'
      : 'Theo sách: TCXDVN 356:2005 — đã được thay bằng TCVN 5574:2018. Đối chiếu trước khi dùng cho thiết kế thật.';

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-6 shadow-xs text-amber-900 flex items-start gap-3">
      <span className="text-xl shrink-0">⚠️</span>
      <div className="text-sm">
        <p className="font-semibold text-amber-950">Lưu ý về Tiêu chuẩn thiết kế</p>
        <p className="mt-0.5 text-amber-900/90 leading-relaxed font-sans">{standardText}</p>
      </div>
    </div>
  );
};

export const Compare5574Tag: React.FC = () => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-50 text-primary border border-blue-200 ml-2 select-none">
      [đối chiếu 5574:2018]
    </span>
  );
};
