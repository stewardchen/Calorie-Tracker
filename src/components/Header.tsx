import React from 'react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  remainingCalories: number;
  refeedActive: boolean;
  onOpenScanModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  remainingCalories,
  refeedActive,
  onOpenScanModal,
}) => {
  const tabs: { id: ActiveTab; label: string; number: string }[] = [
    { id: 'command', label: 'Command Center', number: '01' },
    { id: 'planner', label: 'AI Meal Planner', number: '02' },
    { id: 'dining', label: 'Smart Dining & Map', number: '03' },
    { id: 'calibration', label: 'Biometrics & Engine', number: '04' },
    { id: 'talk', label: 'Talk to Us', number: '05' },
  ];

  return (
    <header className="border-b border-[#1a1a1a] bg-[#fdfcf8] px-6 py-4 md:px-10 shrink-0 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand / Curated Logomark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-2 border-[#1a1a1a] p-2 bg-white inline-block shadow-[2px_2px_0px_#1a1a1a]">
              <span className="font-sans font-black text-xl uppercase tracking-tighter text-[#1a1a1a]">
                NutriAI<span className="text-[#ff3d00]">.</span>Lab
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-[#1a1a1a]/60">
                Caloric Intelligence & Bio-Metabolic Hub
              </span>
              <span className="font-serif italic text-xs text-[#1a1a1a]/70">
                Artisanal Nutritional Architecture
              </span>
            </div>
          </div>

          {/* Quick scan trigger on mobile */}
          <button
            onClick={onOpenScanModal}
            className="md:hidden border border-[#1a1a1a] px-3 py-1.5 font-sans text-[10px] uppercase font-bold tracking-widest bg-white hover:bg-[#ff3d00] hover:text-white transition-colors"
          >
            Scan Dish
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-1 md:pb-0 scrollbar-none font-sans text-[11px] uppercase tracking-widest font-bold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap transition-all duration-150 py-1 ${
                  isActive
                    ? 'border-b-2 border-[#ff3d00] text-[#1a1a1a] font-black'
                    : 'opacity-40 hover:opacity-100 text-[#1a1a1a]'
                }`}
              >
                <span className="text-[9px] font-mono opacity-60">{tab.number}.</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status Capsule */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenScanModal}
            className="border border-[#1a1a1a] px-4 py-2 font-sans text-[10px] uppercase font-bold tracking-widest bg-white hover:bg-[#ff3d00] hover:text-white transition-colors flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff3d00] animate-pulse"></span>
            Scan Dish / Menu
          </button>

          <div className="border border-[#1a1a1a] bg-[#f5f2eb] px-3 py-1.5 text-right font-sans">
            <div className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">Remaining Budget</div>
            <div className="text-xs font-black font-mono flex items-center justify-end gap-1.5">
              <span className="text-[#ff3d00]">{remainingCalories}</span>
              <span className="text-[9px] text-[#1a1a1a]/70">KCAL</span>
              {refeedActive && (
                <span className="bg-[#ff3d00] text-white text-[8px] px-1 py-0.5 uppercase tracking-tighter">RE-FEED</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
