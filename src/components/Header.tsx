import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  MapPin,
  Activity,
  MessageSquare,
  ScanLine,
  Menu,
  X,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  remainingCalories: number;
  refeedActive: boolean;
  onOpenScanModal: () => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  shortLabel: string;
  number: string;
  keyNumber: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  remainingCalories,
  refeedActive,
  onOpenScanModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: NavItem[] = [
    {
      id: 'command',
      label: 'Command Center',
      shortLabel: 'Command',
      number: '01',
      keyNumber: '1',
      description: 'Daily caloric budget, live macro breakdown & logs',
      icon: LayoutDashboard,
    },
    {
      id: 'planner',
      label: 'AI Meal Planner',
      shortLabel: 'Meal Planner',
      number: '02',
      keyNumber: '2',
      description: 'Metabolic generative recipes & macro-optimized meals',
      icon: UtensilsCrossed,
    },
    {
      id: 'dining',
      label: 'Smart Dining & Map',
      shortLabel: 'Smart Dining',
      number: '03',
      keyNumber: '3',
      description: 'Curated restaurants with verified macro-friendly dishes',
      icon: MapPin,
    },
    {
      id: 'calibration',
      label: 'Biometrics & Engine',
      shortLabel: 'Biometrics',
      number: '04',
      keyNumber: '4',
      description: 'Mifflin-St Jeor math, re-feed triggers & TDEE recalibration',
      icon: Activity,
    },
    {
      id: 'talk',
      label: 'Talk to Us',
      shortLabel: 'Talk to Us',
      number: '05',
      keyNumber: '5',
      description: 'Community discussion thread & feedback channel',
      icon: MessageSquare,
    },
  ];

  // Quick keyboard navigation for desktop users (Press 1 to 5 to jump tabs)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is typing in form inputs, textareas, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const tabIndex = parseInt(e.key, 10) - 1;
        if (tabs[tabIndex]) {
          setActiveTab(tabs[tabIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab, tabs]);

  const activeTabItem = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleTabSelect = (id: ActiveTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b-2 border-[#1a1a1a] bg-[#fdfcf8] shrink-0 sticky top-0 z-40 shadow-sm">
      {/* Upper Brand & Utility Bar */}
      <div className="border-b border-[#1a1a1a]/15 px-4 sm:px-6 md:px-10 py-3 bg-[#fdfcf8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo & Subtitle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleTabSelect('command')}
              className="border-2 border-[#1a1a1a] p-2 bg-white inline-block shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#f5f2eb] transition-colors text-left"
              title="Return to Command Center"
            >
              <span className="font-sans font-black text-lg sm:text-xl uppercase tracking-tighter text-[#1a1a1a]">
                NutriAI<span className="text-[#ff3d00]">.</span>Lab
              </span>
            </button>

            <div className="hidden sm:flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-[#1a1a1a]/70">
                Caloric Intelligence & Bio-Metabolic Hub
              </span>
              <span className="font-serif italic text-xs text-[#1a1a1a]/60">
                Artisanal Nutritional Architecture
              </span>
            </div>
          </div>

          {/* Current View Badge on small screens to confirm location */}
          <div className="md:hidden flex items-center gap-1 text-[11px] font-mono font-bold bg-[#f5f2eb] px-2.5 py-1 border border-[#1a1a1a]/30">
            <span className="text-[#ff3d00]">{activeTabItem.number}</span>
            <span className="text-[#1a1a1a] truncate max-w-[110px]">{activeTabItem.shortLabel}</span>
          </div>

          {/* Right Action & Status Capsule */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick scan trigger */}
            <button
              onClick={onOpenScanModal}
              className="border border-[#1a1a1a] px-3 sm:px-4 py-2 font-sans text-[10px] sm:text-[11px] uppercase font-bold tracking-wider sm:tracking-widest bg-white hover:bg-[#ff3d00] hover:text-white transition-all shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-1.5 sm:gap-2 active:translate-x-0.5 active:translate-y-0.5"
            >
              <ScanLine className="w-3.5 h-3.5 text-[#ff3d00] group-hover:text-white" />
              <span className="hidden xs:inline">Scan Dish</span>
              <span className="xs:hidden">Scan</span>
            </button>

            {/* Remaining Budget Badge */}
            <div className="border border-[#1a1a1a] bg-[#f5f2eb] px-2.5 sm:px-3.5 py-1.5 text-right font-sans shadow-[2px_2px_0px_#1a1a1a]">
              <div className="hidden sm:block text-[8px] uppercase tracking-widest text-[#1a1a1a]/70 font-semibold">
                Remaining Budget
              </div>
              <div className="text-xs sm:text-sm font-black font-mono flex items-center justify-end gap-1">
                <span className="text-[#ff3d00]">{remainingCalories}</span>
                <span className="text-[9px] text-[#1a1a1a]/70">KCAL</span>
                {refeedActive && (
                  <span className="bg-[#ff3d00] text-white text-[8px] font-bold px-1 py-0.5 uppercase tracking-tighter flex items-center gap-0.5 ml-0.5">
                    <Flame className="w-2.5 h-2.5" />
                    RE-FEED
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="md:hidden border-2 border-[#1a1a1a] p-2 bg-white hover:bg-[#ff3d00] hover:text-white transition-colors shadow-[2px_2px_0px_#1a1a1a]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Row (Always clearly visible on desktop & clean horizontal rail on mobile) */}
      <div className="bg-[#f7f5ef] px-3 sm:px-6 md:px-10 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav
            aria-label="Main Navigation"
            className="w-full flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-[#1a1a1a]/20"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex items-center gap-2 whitespace-nowrap px-3 sm:px-4 py-2 text-xs font-sans tracking-wide transition-all duration-150 border shrink-0 ${
                    isActive
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-[2px_2px_0px_#ff3d00] font-extrabold'
                      : 'bg-white text-[#1a1a1a] border-[#1a1a1a]/40 hover:border-[#1a1a1a] hover:bg-[#eae6db] font-semibold'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-colors ${
                      isActive ? 'text-[#ff3d00]' : 'text-[#1a1a1a]/70 group-hover:text-[#ff3d00]'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? 'text-[#ff3d00]' : 'text-[#1a1a1a]/60'
                    }`}
                  >
                    {tab.number}.
                  </span>
                  <span className="font-bold">{tab.label}</span>

                  {/* Desktop shortcut hint */}
                  <span
                    className={`hidden lg:inline-block ml-1 font-mono text-[9px] px-1 py-0.2 rounded border ${
                      isActive
                        ? 'border-white/20 text-white/70 bg-white/10'
                        : 'border-[#1a1a1a]/20 text-[#1a1a1a]/40 bg-[#f5f2eb]'
                    }`}
                    title={`Press '${tab.keyNumber}' key to navigate`}
                  >
                    [{tab.keyNumber}]
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Full-width Mobile Navigation Drawer (Ensures headers/tabs are NEVER hidden on smaller screens) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#1a1a1a] bg-[#fdfcf8] p-4 shadow-xl animate-fadeIn">
          <div className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#ff3d00] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3d00] animate-ping" />
            <span>Select System Section</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={`flex items-center justify-between p-3 text-left border-2 transition-all ${
                    isActive
                      ? 'border-[#ff3d00] bg-[#1a1a1a] text-white shadow-[3px_3px_0px_#ff3d00]'
                      : 'border-[#1a1a1a] bg-white text-[#1a1a1a] hover:bg-[#f5f2eb]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 border ${
                        isActive ? 'border-[#ff3d00] bg-black text-[#ff3d00]' : 'border-[#1a1a1a] bg-[#f5f2eb]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold opacity-70">
                          {tab.number} //
                        </span>
                        <span className="font-sans font-extrabold text-sm">{tab.label}</span>
                      </div>
                      <p
                        className={`text-xs mt-0.5 line-clamp-1 ${
                          isActive ? 'text-white/75' : 'text-[#1a1a1a]/70'
                        }`}
                      >
                        {tab.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#ff3d00]' : 'text-[#1a1a1a]/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Quick Info in Mobile Drawer */}
          <div className="mt-4 pt-3 border-t border-[#1a1a1a]/20 flex items-center justify-between text-xs font-mono">
            <span className="text-[#1a1a1a]/70">Shortcuts: Keys [1] - [5]</span>
            <button
              onClick={() => {
                onOpenScanModal();
                setMobileMenuOpen(false);
              }}
              className="text-[#ff3d00] font-bold underline uppercase tracking-wider"
            >
              Open Spectrometry Scan →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

