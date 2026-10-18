import React from 'react';

export interface ConstructionNoteProps {
  title?: string;
  children: React.ReactNode;
}

export const ConstructionNote: React.FC<ConstructionNoteProps> = ({
  title = "Lưu ý cấu tạo cốt thép",
  children
}) => {
  return (
    <div className="my-5 bg-sky-50/70 border border-sky-200 rounded-custom p-4 text-sky-950 shadow-soft">
      <div className="flex items-center gap-2 mb-2 font-semibold text-sky-900 text-sm">
        <span className="text-base">📐</span>
        <span>{title}</span>
      </div>
      <div className="text-sm leading-relaxed space-y-1.5 text-sky-950/90 pl-6">
        {children}
      </div>
    </div>
  );
};
