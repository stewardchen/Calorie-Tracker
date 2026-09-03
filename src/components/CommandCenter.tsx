import React from 'react';
import { NutritionTargets, TimelineMeal, ActiveTab } from '../types';

interface CommandCenterProps {
  targets: NutritionTargets;
  timelineMeals: TimelineMeal[];
  onToggleRefeed: () => void;
  onOpenScanModal: () => void;
  onQuickAddMeal: (title: string, calories: number, protein: number, carbs: number, fat: number) => void;
  onDeleteMeal: (id: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  targets,
  timelineMeals,
  onToggleRefeed,
  onOpenScanModal,
  onQuickAddMeal,
  onDeleteMeal,
  onNavigateTab,
}) => {
  const percentConsumed = Math.min(100, Math.round((targets.consumedCalories / targets.dailyCalorieTarget) * 100));
  const weeklyPercent = Math.min(100, Math.round((targets.weeklyConsumed / targets.weeklyBudget) * 100));
  const proteinPercent = Math.min(100, Math.round((targets.proteinCurrent / targets.proteinTarget) * 100));
  const carbsPercent = Math.min(100, Math.round((targets.carbsCurrent / targets.carbsTarget) * 100));
  const fatPercent = Math.min(100, Math.round((targets.fatCurrent / targets.fatTarget) * 100));

  const quickChips = [
    { title: 'Espresso & Oat Foam', calories: 65, p: 2, c: 9, f: 2 },
    { title: 'Whey Isolate Shake', calories: 140, p: 30, c: 2, f: 1 },
    { title: 'Organic Raw Almonds (28g)', calories: 170, p: 6, c: 5, f: 15 },
    { title: 'Crisp Apple & Almond Butter', calories: 210, p: 5, c: 24, f: 12 },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Editorial Hero Layout matching Artistic Flair theme */}
      <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start relative">
        {/* Left vertical index metadata */}
        <div className="hidden lg:flex col-span-1 flex-col justify-between py-2 self-stretch border-r border-[#1a1a1a]/30 pr-4">
          <div className="v-text text-[9px] uppercase tracking-[0.45em] font-sans opacity-40 whitespace-nowrap">
            ISSUE NO. 042 // CALORIE INTELLIGENCE
          </div>
          <div className="font-sans text-[10px] font-bold border-l-2 border-[#1a1a1a] pl-2 mt-auto pt-8">
            HARVARD BIO-MATH / TOKYO
          </div>
        </div>

        {/* Center Editorial Title & Brutalist Feature Box */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 relative">
          {/* Watermark outline text */}
          <div className="absolute -top-6 -left-4 text-[110px] md:text-[160px] leading-none font-black outline-text select-none pointer-events-none z-0">
            INTAKE
          </div>

          <div className="z-10 relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-[#ff3d00]"></span>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-black text-[#ff3d00]">
                Caloric Precision Command
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl leading-[0.88] tracking-tighter font-medium font-serif text-[#1a1a1a]">
              The Daily <br />
              Metabolic <br />
              <span className="italic font-light text-[#ff3d00]">Equilibrium</span>
            </h1>
          </div>

          {/* Featured Dynamic Gauge Card */}
          <div className="bg-[#f5f2eb] border-2 border-[#1a1a1a] p-6 md:p-8 relative overflow-hidden group shadow-[4px_4px_0px_#1a1a1a]">
            <div className="absolute inset-0 bg-pattern opacity-15 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Concentric / Dial Graphic */}
              <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="#1a1a1a"
                    strokeWidth="6"
                    strokeDasharray="2 4"
                    fill="none"
                    opacity="0.2"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="#1a1a1a"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="301.59"
                    strokeDashoffset={301.59 - (301.59 * percentConsumed) / 100}
                    className="transition-all duration-700 ease-out"
                  />
                  {/* Accent target needle point */}
                  <circle
                    cx="60"
                    cy="60"
                    r="38"
                    stroke="#ff3d00"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
                    Remaining
                  </span>
                  <span className="font-mono text-3xl font-black text-[#ff3d00] tracking-tight">
                    {targets.remainingCalories}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-[#1a1a1a]/70">
                    KCAL / {targets.dailyCalorieTarget}
                  </span>
                </div>
              </div>

              {/* Status Stats Block */}
              <div className="flex-1 w-full space-y-4">
                <div className="flex justify-between items-baseline border-b border-[#1a1a1a]/20 pb-2">
                  <span className="font-sans text-[11px] uppercase tracking-widest font-bold">
                    Intake Velocity
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1a1a1a]">
                    {percentConsumed}% <span className="text-[10px] text-[#1a1a1a]/60">Consumed</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-[#1a1a1a] bg-white p-3">
                    <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
                      Logged Calories
                    </div>
                    <div className="font-mono text-xl font-black text-[#1a1a1a]">
                      {targets.consumedCalories}
                    </div>
                  </div>
                  <div className="border border-[#1a1a1a] bg-white p-3">
                    <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
                      Weekly Buffer
                    </div>
                    <div className="font-mono text-xl font-black text-[#ff3d00]">
                      +450 <span className="text-[10px] text-[#1a1a1a]">KCAL</span>
                    </div>
                  </div>
                </div>

                {/* Macro progress meters */}
                <div className="space-y-2 pt-2">
                  <div>
                    <div className="flex justify-between text-[10px] font-sans uppercase tracking-wider mb-1">
                      <span>Protein ({targets.proteinCurrent}g / {targets.proteinTarget}g)</span>
                      <span className="font-mono font-bold">{proteinPercent}%</span>
                    </div>
                    <div className="h-2 border border-[#1a1a1a] bg-white p-[1px]">
                      <div className="h-full bg-[#1a1a1a]" style={{ width: `${proteinPercent}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-sans uppercase tracking-wider mb-1">
                      <span>Carbohydrates ({targets.carbsCurrent}g / {targets.carbsTarget}g)</span>
                      <span className="font-mono font-bold">{carbsPercent}%</span>
                    </div>
                    <div className="h-2 border border-[#1a1a1a] bg-white p-[1px]">
                      <div className="h-full bg-[#1a1a1a]/70" style={{ width: `${carbsPercent}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-sans uppercase tracking-wider mb-1">
                      <span>Lipids / Fats ({targets.fatCurrent}g / {targets.fatTarget}g)</span>
                      <span className="font-mono font-bold">{fatPercent}%</span>
                    </div>
                    <div className="h-2 border border-[#1a1a1a] bg-white p-[1px]">
                      <div className="h-full bg-[#ff3d00]" style={{ width: `${fatPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brutalist stamp tag */}
            <div className="absolute bottom-3 right-4 font-sans text-[8px] uppercase tracking-widest bg-white border border-[#1a1a1a] px-2 py-0.5">
              METRIC NO. 904-B
            </div>
          </div>
        </div>

        {/* Right Column: Protocols, Weekly Deficit, Quick Spectrometry */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between border-l-0 lg:border-l border-[#1a1a1a] lg:pl-8 space-y-8">
          <div>
            <h2 className="font-sans text-[10px] uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#1a1a1a]"></span>
              Adaptive Protocol
            </h2>

            {/* Metabolic Reset Card */}
            <div className={`p-4 border-2 border-[#1a1a1a] transition-all ${
              targets.refeedActive ? 'bg-[#ff3d00]/10 border-[#ff3d00]' : 'bg-[#f5f2eb]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-[#1a1a1a]">
                  Adaptive Re-Feed Mode
                </span>
                <button
                  onClick={onToggleRefeed}
                  className={`px-2 py-0.5 font-sans text-[9px] uppercase tracking-widest font-bold border border-[#1a1a1a] transition-colors cursor-pointer ${
                    targets.refeedActive ? 'bg-[#ff3d00] text-white border-[#ff3d00]' : 'bg-white hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  {targets.refeedActive ? 'ACTIVATED (+350)' : 'STANDBY'}
                </button>
              </div>
              <p className="font-serif italic text-xs text-[#1a1a1a]/80 leading-snug">
                {targets.refeedActive
                  ? 'Metabolic reset active: Daily target dynamically increased by +350 kcal for leptin resensitization without body fat rebound.'
                  : 'Currently maintaining standard 500 kcal baseline deficit. Re-feed protocol scheduled for high-output training window.'}
              </p>
            </div>

            {/* Weekly Rolling Budget Gauge */}
            <div className="mt-6 border border-[#1a1a1a] p-4 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
                  Weekly Rolling Horizon
                </span>
                <span className="font-mono text-xs font-bold text-[#1a1a1a]">
                  {targets.weeklyConsumed} / {targets.weeklyBudget} kcal
                </span>
              </div>
              <div className="h-2.5 border border-[#1a1a1a] bg-[#f5f2eb] p-[1px] mb-2">
                <div className="h-full bg-[#1a1a1a]" style={{ width: `${weeklyPercent}%` }}></div>
              </div>
              <div className="flex justify-between text-[9px] font-sans text-[#1a1a1a]/70">
                <span>7-Day Target Deficit: -3,500 kcal</span>
                <span className="text-[#ff3d00] font-bold">On Schedule</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={onOpenScanModal}
                className="w-full bg-[#1a1a1a] text-white py-3.5 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Food Spectrometry Scan</span>
                <span className="text-xs">→</span>
              </button>
              <button
                onClick={() => onNavigateTab('planner')}
                className="w-full border-2 border-[#1a1a1a] bg-[#fdfcf8] py-3 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#f5f2eb] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Curate Tonight's 460 kcal Dinner</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>

          {/* Quick Micro-Logs */}
          <div>
            <h2 className="font-sans text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#1a1a1a]"></span>
              Quick Log Accents
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickAddMeal(chip.title, chip.calories, chip.p, chip.c, chip.f)}
                  className="border border-[#1a1a1a] bg-white p-2 text-left hover:border-[#ff3d00] hover:bg-[#f5f2eb] transition-colors cursor-pointer group"
                >
                  <div className="truncate font-serif text-xs text-[#1a1a1a] group-hover:text-[#ff3d00]">
                    {chip.title}
                  </div>
                  <div className="font-mono text-[10px] text-[#1a1a1a]/60 mt-0.5">
                    +{chip.calories} kcal
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Nutrition Timeline */}
      <div className="border-t-2 border-[#1a1a1a] pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
          <div>
            <div className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#1a1a1a]/60">
              Chronological Ledger
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1a1a]">
              Today's Curated Nutrition Timeline
            </h2>
          </div>
          <div className="font-sans text-[10px] uppercase tracking-widest text-[#1a1a1a]/70">
            {timelineMeals.filter((m) => m.status === 'logged').length} of {timelineMeals.length} Phases Completed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timelineMeals.map((meal) => (
            <div
              key={meal.id}
              className={`border-2 border-[#1a1a1a] p-4 flex flex-col justify-between transition-all ${
                meal.status === 'logged' ? 'bg-white shadow-[2px_2px_0px_#1a1a1a]' : 'bg-[#f5f2eb] border-dashed'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-sans text-[9px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-0.5">
                    {meal.type} // {meal.time}
                  </span>
                  {meal.status === 'logged' ? (
                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      title="Remove entry"
                      className="text-xs text-[#1a1a1a]/40 hover:text-[#ff3d00] cursor-pointer"
                    >
                      ✕
                    </button>
                  ) : (
                    <span className="font-sans text-[8px] uppercase tracking-widest text-[#ff3d00] font-bold">
                      OPEN WINDOW
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base font-bold text-[#1a1a1a] leading-snug mt-2">
                  {meal.title}
                </h3>

                {meal.notes && (
                  <p className="font-serif text-xs italic text-[#1a1a1a]/70 mt-1 line-clamp-2">
                    {meal.notes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
                    Energy Density
                  </span>
                  <span className="font-mono text-base font-black text-[#1a1a1a]">
                    {meal.calories} <span className="text-[9px] text-[#1a1a1a]/60">KCAL</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1 text-center font-sans text-[9px]">
                  <div className="bg-[#f5f2eb] py-1 border border-[#1a1a1a]/20">
                    <span className="block opacity-60">P</span>
                    <span className="font-mono font-bold">{meal.macros.protein}g</span>
                  </div>
                  <div className="bg-[#f5f2eb] py-1 border border-[#1a1a1a]/20">
                    <span className="block opacity-60">C</span>
                    <span className="font-mono font-bold">{meal.macros.carbs}g</span>
                  </div>
                  <div className="bg-[#f5f2eb] py-1 border border-[#1a1a1a]/20">
                    <span className="block opacity-60">F</span>
                    <span className="font-mono font-bold">{meal.macros.fat}g</span>
                  </div>
                </div>

                {meal.status === 'pending' && (
                  <button
                    onClick={() => onNavigateTab('planner')}
                    className="w-full mt-3 bg-[#1a1a1a] text-white py-2 font-sans text-[9px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors cursor-pointer"
                  >
                    Select Proposal
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
