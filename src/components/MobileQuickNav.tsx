import React, { useState, useEffect } from 'react';

interface SectionItem {
  id: string;
  label: string;
}

interface MobileQuickNavProps {
  sections?: SectionItem[];
}

export const MobileQuickNav: React.FC<MobileQuickNavProps> = ({ sections: propSections }) => {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    if (propSections && propSections.length > 0) {
      setSections(propSections);
      return;
    }

    // Auto-detect sections with IDs and headings on the page
    const found: SectionItem[] = [];
    const elements = document.querySelectorAll('section[id]');
    elements.forEach((el) => {
      const id = el.id;
      const heading = el.querySelector('h2, h3, h4');
      const label = heading?.textContent?.trim() || id;
      found.push({ id, label });
    });

    if (found.length > 0) {
      setSections(found);
    }
  }, [propSections]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(s.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70; // offset for sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  if (sections.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Button on Mobile (visible only below lg breakpoint) */}
      <div className="lg:hidden fixed bottom-5 right-4 z-40 flex items-center gap-2">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md border border-border text-text-muted hover:text-text-main shadow-lg flex items-center justify-center text-sm active:scale-95 transition-all"
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
        >
          ▲
        </button>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-white shadow-lg shadow-primary/25 font-semibold text-xs active:scale-95 transition-all"
          title="Mở mục lục đề mục chương"
        >
          <span>📑</span>
          <span>Đề mục</span>
          <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">
            {sections.length}
          </span>
        </button>
      </div>

      {/* Slide-up Bottom Drawer Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          {/* Drawer Content */}
          <div
            className="bg-surface rounded-t-3xl border-t border-border shadow-2xl p-5 max-h-[75vh] flex flex-col space-y-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-lg">📑</span>
                <h3 className="font-serif font-bold text-base text-text-main">
                  Mục lục nội dung chương
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-bg border border-border text-text-muted hover:text-text-main flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Section Links */}
            <div className="overflow-y-auto space-y-1.5 pr-1 divide-y divide-border/40">
              {sections.map((s, idx) => {
                const isActive = activeSectionId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-text-main hover:bg-bg'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                        isActive ? 'bg-primary text-white font-bold' : 'bg-bg text-text-muted border border-border/60'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs leading-relaxed line-clamp-2">
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <button
                onClick={scrollToTop}
                className="text-primary font-semibold hover:underline flex items-center gap-1"
              >
                <span>▲</span>
                <span>Lên đầu trang</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-bg border border-border text-text-muted hover:text-text-main"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
