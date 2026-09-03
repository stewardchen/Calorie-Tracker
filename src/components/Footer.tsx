import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#fdfcf8] mt-16 py-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-md">
          <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/50 mb-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#1a1a1a]"></span>
            Nutritional Catalog & Physiological Archive
          </div>
          <p className="font-serif text-sm text-[#1a1a1a]/80 italic leading-relaxed">
            A study on the brutalist intersection of metabolic geometry and nutritional precision within daily modern lifestyle.
          </p>
          <div className="font-sans text-[10px] text-[#1a1a1a]/60 mt-2">
            Curated by NutriAI Laboratory / Engine v4.2 / Licensed Bio-Mathematical Model
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-[1px] bg-[#ff3d00]"></div>
            <div className="font-sans text-[10px] uppercase font-black tracking-tighter text-[#1a1a1a]">
              PRECISION INTELLIGENCE // EST. MMXXIV
            </div>
          </div>
          <div className="flex items-center gap-4 font-sans text-[10px] uppercase tracking-widest text-[#1a1a1a]/50">
            <span>Client-Side Privacy Enforced</span>
            <span>•</span>
            <a href="#discussion" className="text-[#ff3d00] hover:underline font-bold">
              Disqus Forum (zh_TW)
            </a>
            <span>•</span>
            <span>99.4% Macro Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
