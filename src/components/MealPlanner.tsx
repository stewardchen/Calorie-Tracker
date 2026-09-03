import React, { useState } from 'react';
import { MealProposal, MacroBreakdown } from '../types';

interface MealPlannerProps {
  remainingCalories: number;
  proposals: MealProposal[];
  onSelectProposal: (proposal: MealProposal) => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  remainingCalories,
  proposals,
  onSelectProposal,
}) => {
  const [activeProposalId, setActiveProposalId] = useState(proposals[0]?.id || '');
  const [selectedSwaps, setSelectedSwaps] = useState<Record<string, boolean>>({});
  const [cheatSurplus, setCheatSurplus] = useState(500);

  const activeProposal = proposals.find((p) => p.id === activeProposalId) || proposals[0];

  const toggleSwap = (swapKey: string) => {
    setSelectedSwaps((prev) => ({
      ...prev,
      [swapKey]: !prev[swapKey],
    }));
  };

  // Calculate dynamic calories after selected swaps
  const swapDeltas = activeProposal.swaps.reduce((acc, s, idx) => {
    return selectedSwaps[`${activeProposal.id}-${idx}`] ? acc + s.calorieDelta : acc;
  }, 0);

  const adjustedCalories = activeProposal.calories + swapDeltas;

  // Smoothing calculation over 3 days
  const dailyOffset = Math.round(cheatSurplus / 3);

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b-2 border-[#1a1a1a] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#ff3d00]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-black text-[#ff3d00]">
              Predictive Intake & Menu Synthesis
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[#1a1a1a]">
            AI Meal <span className="italic font-light text-[#ff3d00]">Architect</span>
          </h1>
        </div>

        {/* High-Precision Metabolic Allocation Bar */}
        <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-3.5 shadow-[2px_2px_0px_#1a1a1a] min-w-[280px]">
          <div className="flex justify-between items-center text-[10px] font-sans uppercase tracking-widest text-[#1a1a1a]/70 mb-1">
            <span>Dinner Allocation Window</span>
            <span className="font-mono font-bold text-[#ff3d00]">{remainingCalories} KCAL</span>
          </div>
          <div className="h-2 border border-[#1a1a1a] bg-white p-[1px]">
            <div
              className="h-full bg-[#1a1a1a]"
              style={{ width: `${Math.min(100, (adjustedCalories / remainingCalories) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[9px] font-sans text-[#1a1a1a]/60 mt-1">
            <span>Target Match: {Math.round((adjustedCalories / remainingCalories) * 100)}%</span>
            <span>Delta: {adjustedCalories - remainingCalories > 0 ? `+${adjustedCalories - remainingCalories}` : adjustedCalories - remainingCalories} kcal</span>
          </div>
        </div>
      </div>

      {/* 3 Curated Next Meal Proposals */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-sans text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#1a1a1a]"></span>
            Next Meal Proposals (Target Window: 460 kcal)
          </h2>
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#1a1a1a]/60">
            3 High-Affinity Blueprints
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {proposals.map((prop, idx) => {
            const isSelected = prop.id === activeProposalId;
            return (
              <div
                key={prop.id}
                onClick={() => setActiveProposalId(prop.id)}
                className={`border-2 border-[#1a1a1a] p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-[#f5f2eb] shadow-[6px_6px_0px_#1a1a1a] scale-[1.01]'
                    : 'bg-white hover:bg-[#fdfcf8] hover:shadow-[3px_3px_0px_#1a1a1a]'
                }`}
              >
                {/* Proposal Index Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="font-sans text-[9px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-0.5">
                    Proposal 0{idx + 1}
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#ff3d00] font-bold border border-[#ff3d00] px-2 py-0.5 bg-white">
                    {prop.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] leading-tight">
                    {prop.title}
                  </h3>
                  <div className="font-serif italic text-xs text-[#1a1a1a]/70 mt-1">
                    {prop.subhead}
                  </div>

                  <p className="font-sans text-xs text-[#1a1a1a]/80 mt-3 leading-relaxed">
                    {prop.matchReason}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-mono border-y border-[#1a1a1a]/20 py-2">
                    <div>
                      <span className="text-[9px] font-sans uppercase tracking-wider block text-[#1a1a1a]/60">Prep</span>
                      <span className="font-bold">{prop.prepTime}</span>
                    </div>
                    <div className="border-l border-[#1a1a1a]/20 pl-4">
                      <span className="text-[9px] font-sans uppercase tracking-wider block text-[#1a1a1a]/60">AI Match</span>
                      <span className="font-bold text-[#ff3d00]">{prop.aiMatchScore}%</span>
                    </div>
                    <div className="border-l border-[#1a1a1a]/20 pl-4">
                      <span className="text-[9px] font-sans uppercase tracking-wider block text-[#1a1a1a]/60">Energy</span>
                      <span className="font-bold">{prop.calories} kcal</span>
                    </div>
                  </div>

                  {/* Macro breakdown */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="border border-[#1a1a1a] bg-white p-2">
                      <span className="text-[9px] font-sans uppercase tracking-wider block text-[#1a1a1a]/60">Protein</span>
                      <span className="font-mono font-bold text-sm text-[#1a1a1a]">{prop.macros.protein}g</span>
                    </div>
                    <div className="border border-[#1a1a1a] bg-white p-2">
                      <span className="text-[9px] font-sans uppercase tracking-wider block text-[#1a1a1a]/60">Carbs</span>
                      <span className="font-mono font-bold text-sm text-[#1a1a1a]">{prop.macros.carbs}g</span>
                    </div>
                    <div className="border border-[#1a1a1a] bg-white p-2">
                      <span className="text-[9px] font-sans uppercase tracking-wider block text-[#1a1a1a]/60">Fats</span>
                      <span className="font-mono font-bold text-sm text-[#1a1a1a]">{prop.macros.fat}g</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1a1a1a]/20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProposal({
                        ...prop,
                        calories: isSelected ? adjustedCalories : prop.calories,
                      });
                    }}
                    className="w-full bg-[#1a1a1a] text-white py-3 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors cursor-pointer"
                  >
                    Log to Today's Timeline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Proposal Deep Dive: Ingredients & Live Calorie Swap Engine */}
      <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-6 md:p-8 relative">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Ingredients List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold">
              <span className="w-6 h-[1px] bg-[#1a1a1a]"></span>
              Ingredient Architecture // {activeProposal.title}
            </div>

            <ul className="space-y-2 border border-[#1a1a1a] bg-white p-4">
              {activeProposal.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center justify-between text-xs font-serif text-[#1a1a1a] border-b border-[#e5e5e5] pb-2 last:border-b-0 last:pb-0">
                  <span>{ing}</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider opacity-60">Verified</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Smart Macro Balance & Ingredient Swaps */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold">
              <span className="w-6 h-[1px] bg-[#ff3d00]"></span>
              Smart Macro Balance & Ingredient Swap Calibration
            </div>

            <div className="space-y-3">
              {activeProposal.swaps.map((swap, idx) => {
                const swapKey = `${activeProposal.id}-${idx}`;
                const isToggled = !!selectedSwaps[swapKey];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleSwap(swapKey)}
                    className={`border-2 p-3 cursor-pointer transition-all flex items-center justify-between ${
                      isToggled
                        ? 'border-[#ff3d00] bg-white shadow-[2px_2px_0px_#ff3d00]'
                        : 'border-[#1a1a1a] bg-white hover:border-[#ff3d00]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-serif text-[#1a1a1a]">
                        <span className="line-through opacity-50">{swap.original}</span>
                        <span className="font-bold text-[#ff3d00] ml-2">→ {swap.replacement}</span>
                      </div>
                      <div className="text-[10px] font-sans text-[#1a1a1a]/60 mt-0.5">
                        Click to {isToggled ? 'revert swap' : 'apply caloric reduction'}
                      </div>
                    </div>

                    <span className="font-mono text-xs font-bold text-[#ff3d00] bg-[#ff3d00]/10 border border-[#ff3d00] px-2 py-1">
                      {swap.calorieDelta} kcal
                    </span>
                  </div>
                );
              })}

              <div className="border border-[#1a1a1a] bg-white p-3 flex justify-between items-center">
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
                  Final Caloric Output
                </span>
                <span className="font-mono text-xl font-black text-[#ff3d00]">
                  {adjustedCalories} KCAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tomorrow's Predictive Meal Blueprint & Re-Feed Smoothing Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t-2 border-[#1a1a1a] pt-8">
        {/* Tomorrow's Blueprint */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-baseline">
            <h2 className="font-sans text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#1a1a1a]"></span>
              Tomorrow's Predictive Meal Blueprint
            </h2>
            <span className="font-sans text-[9px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-0.5">
              Sync: Leg Hypertrophy Day
            </span>
          </div>

          <div className="border border-[#1a1a1a] divide-y divide-[#1a1a1a] bg-white">
            <div className="p-3.5 flex justify-between items-center hover:bg-[#f5f2eb] transition-colors">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">Phase 01 // 08:00 AM</span>
                <div className="font-serif font-bold text-sm text-[#1a1a1a]">Steel-Cut Oats with Whey & Crushed Flaxseed</div>
              </div>
              <div className="text-right font-mono text-sm font-bold text-[#1a1a1a]">390 <span className="text-[9px] font-sans">kcal</span></div>
            </div>

            <div className="p-3.5 flex justify-between items-center hover:bg-[#f5f2eb] transition-colors">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">Phase 02 // 12:45 PM</span>
                <div className="font-serif font-bold text-sm text-[#1a1a1a]">Smoked Turkey Breast & Sweet Potato Wedges</div>
              </div>
              <div className="text-right font-mono text-sm font-bold text-[#1a1a1a]">560 <span className="text-[9px] font-sans">kcal</span></div>
            </div>

            <div className="p-3.5 flex justify-between items-center hover:bg-[#f5f2eb] transition-colors">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">Phase 03 // 04:30 PM</span>
                <div className="font-serif font-bold text-sm text-[#1a1a1a]">Pre-Workout Cold Brew + Rice Cake with Honey</div>
              </div>
              <div className="text-right font-mono text-sm font-bold text-[#1a1a1a]">250 <span className="text-[9px] font-sans">kcal</span></div>
            </div>

            <div className="p-3.5 flex justify-between items-center hover:bg-[#f5f2eb] transition-colors">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">Phase 04 // 08:00 PM</span>
                <div className="font-serif font-bold text-sm text-[#1a1a1a]">Post-Workout Sirloin Medallions & Roasted Beets</div>
              </div>
              <div className="text-right font-mono text-sm font-bold text-[#1a1a1a]">750 <span className="text-[9px] font-sans">kcal</span></div>
            </div>
          </div>
        </div>

        {/* Cheat Day & Caloric Smoothing Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-sans text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#ff3d00]"></span>
            Cheat Day & 72-Hour Caloric Smoothing Engine
          </h2>

          <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-5 space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-sans mb-1">
                <span className="uppercase tracking-widest text-[#1a1a1a]/70">Simulate Surplus Event</span>
                <span className="font-mono font-black text-base text-[#ff3d00]">+{cheatSurplus} KCAL</span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={cheatSurplus}
                onChange={(e) => setCheatSurplus(Number(e.target.value))}
                className="w-full accent-[#ff3d00] cursor-pointer"
              />
            </div>

            <div className="bg-white border border-[#1a1a1a] p-3 text-xs space-y-2">
              <div className="font-serif italic text-[#1a1a1a]">
                The NutriAI algorithm partitions the +{cheatSurplus} kcal surplus across the next 3 days:
              </div>
              <div className="flex justify-between font-mono text-sm border-t border-[#e5e5e5] pt-1">
                <span>Daily Deficit Adjustment:</span>
                <span className="font-bold text-[#ff3d00]">-{dailyOffset} kcal / day</span>
              </div>
              <div className="text-[10px] font-sans text-[#1a1a1a]/60">
                Maintains rolling weekly target deficit (-3,500 kcal) with zero physiological fat storage overshoot.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
