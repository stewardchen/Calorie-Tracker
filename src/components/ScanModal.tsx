import React, { useState } from 'react';
import { MacroBreakdown } from '../types';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (title: string, calories: number, macros: MacroBreakdown, type: 'Breakfast' | 'Lunch' | 'Afternoon' | 'Dinner' | 'Snack') => void;
}

const SAMPLE_SCANS = [
  {
    name: 'Herb-Seared Wild Salmon & Organic Quinoa',
    type: 'Dinner' as const,
    calories: 520,
    macros: { protein: 46, carbs: 36, fat: 18 },
    confidence: '99.2%',
    detectedItems: ['Wild Atlantic Salmon (190g)', 'Tri-color Quinoa (120g)', 'Braised Asparagus', 'Lemon Olive Emulsion'],
    photoUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&auto=format&fit=crop&q=80',
  },
  {
    name: 'Açai Protein Bowl with Chia & Cacao Nibs',
    type: 'Breakfast' as const,
    calories: 390,
    macros: { protein: 28, carbs: 46, fat: 11 },
    confidence: '98.5%',
    detectedItems: ['Organic Pure Açai Pulp', 'Plant Protein Isolate', 'Raw Chia Seeds (15g)', 'Cacao Nibs (8g)'],
    photoUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=700&auto=format&fit=crop&q=80',
  },
  {
    name: 'Charred Flank Steak with Roasted Broccolini',
    type: 'Lunch' as const,
    calories: 580,
    macros: { protein: 56, carbs: 14, fat: 22 },
    confidence: '97.9%',
    detectedItems: ['Grass-Fed Flank Steak (210g)', 'Charred Baby Broccolini', 'Chimichurri Herb Reduction'],
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80',
  },
];

export const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, onAddMeal }) => {
  const [selectedScanIdx, setSelectedScanIdx] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customCals, setCustomCals] = useState('');
  const [activeMode, setActiveMode] = useState<'scan' | 'manual'>('scan');

  if (!isOpen) return null;

  const currentSample = SAMPLE_SCANS[selectedScanIdx];

  const handleSimulateScan = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  const handleCommitScan = () => {
    onAddMeal(
      currentSample.name,
      currentSample.calories,
      currentSample.macros,
      currentSample.type
    );
    onClose();
  };

  const handleCommitManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customCals) return;
    const cals = parseInt(customCals, 10) || 300;
    // approximate macros
    const protein = Math.round((cals * 0.3) / 4);
    const carbs = Math.round((cals * 0.45) / 4);
    const fat = Math.round((cals * 0.25) / 9);

    onAddMeal(customTitle, cals, { protein, carbs, fat }, 'Snack');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a1a]/70 backdrop-blur-xs">
      <div className="bg-[#fdfcf8] border-2 border-[#1a1a1a] w-full max-w-2xl shadow-[8px_8px_0px_#1a1a1a] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between bg-[#f5f2eb]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#ff3d00]"></span>
            <div>
              <div className="font-sans text-[9px] uppercase tracking-widest font-black text-[#1a1a1a]/60">
                Optical Caloric Recognition HUD
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1a1a1a]">
                Bio-Visual Meal & Menu Scanner
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#1a1a1a] flex items-center justify-center font-mono text-sm hover:bg-[#ff3d00] hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-[#1a1a1a] bg-[#fdfcf8]">
          <button
            onClick={() => setActiveMode('scan')}
            className={`flex-1 py-2.5 font-sans text-[10px] uppercase font-bold tracking-widest text-center transition-colors ${
              activeMode === 'scan' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-[#f5f2eb] text-[#1a1a1a]'
            }`}
          >
            AI Camera HUD (Sample Dishes)
          </button>
          <button
            onClick={() => setActiveMode('manual')}
            className={`flex-1 py-2.5 font-sans text-[10px] uppercase font-bold tracking-widest text-center transition-colors ${
              activeMode === 'manual' ? 'bg-[#1a1a1a] text-white' : 'hover:bg-[#f5f2eb] text-[#1a1a1a]'
            }`}
          >
            Precision Manual Entry
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeMode === 'scan' ? (
            <div>
              {/* Sample Dish Selector Buttons */}
              <div className="mb-4">
                <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 mb-2">
                  Select Visual Dish Sample to Scan
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_SCANS.map((scan, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedScanIdx(idx);
                        handleSimulateScan();
                      }}
                      className={`p-2 text-left border text-xs font-sans transition-all ${
                        selectedScanIdx === idx
                          ? 'border-2 border-[#1a1a1a] bg-[#f5f2eb] font-bold shadow-[2px_2px_0px_#1a1a1a]'
                          : 'border-[#1a1a1a]/30 hover:border-[#1a1a1a] bg-white'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider text-[#ff3d00] font-bold">
                        Sample 0{idx + 1}
                      </div>
                      <div className="truncate font-serif text-[11px] text-[#1a1a1a] mt-0.5">
                        {scan.name.split(' ')[0]} {scan.name.split(' ')[1]}
                      </div>
                      <div className="font-mono text-[10px] text-[#1a1a1a]/70 mt-1">
                        {scan.calories} KCAL
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera HUD Box */}
              <div className="border-2 border-[#1a1a1a] relative h-64 overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={currentSample.photoUrl}
                  alt={currentSample.name}
                  className="w-full h-full object-cover opacity-85"
                />

                {/* HUD Overlay Lines */}
                <div className="absolute inset-4 border border-dashed border-white/60 pointer-events-none"></div>
                <div className="absolute top-4 left-4 font-mono text-[9px] text-[#ff3d00] bg-black/80 px-2 py-0.5">
                  AI VISION: ACTIVE // CONFIDENCE: {currentSample.confidence}
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white bg-black/80 px-2 py-0.5">
                  CALIBRATED SPECTROMETRY: VERIFIED
                </div>

                {/* Simulated Bounding Box */}
                <div className="absolute inset-12 border-2 border-[#ff3d00] bg-[#ff3d00]/10 flex flex-col justify-between p-2 pointer-events-none">
                  <div className="font-mono text-[8px] text-[#ff3d00] font-bold uppercase tracking-widest bg-black/80 px-1 py-0.5 self-start">
                    [METABOLIC_TARGET_LOCKED]
                  </div>
                  <div className="font-mono text-[10px] text-white font-bold bg-black/80 px-1.5 py-0.5 self-end">
                    {currentSample.calories} kcal
                  </div>
                </div>

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-[#1a1a1a]/80 flex flex-col items-center justify-center text-white">
                    <div className="w-8 h-8 border-2 border-[#ff3d00] border-t-transparent animate-spin rounded-full mb-3"></div>
                    <div className="font-sans text-[10px] uppercase tracking-widest">
                      Deconstructing Macro Volumetrics...
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Result Breakdown */}
              <div className="mt-4 border border-[#1a1a1a] bg-[#f5f2eb] p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-0.5">
                      Identified Composition
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#1a1a1a] mt-1.5">
                      {currentSample.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-2xl font-black text-[#ff3d00]">
                      {currentSample.calories}
                    </div>
                    <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
                      KCAL EXTRACTED
                    </div>
                  </div>
                </div>

                {/* Macro pill summary */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="border border-[#1a1a1a] bg-white p-2 text-center">
                    <div className="text-[9px] uppercase font-sans tracking-widest text-[#1a1a1a]/60">Protein</div>
                    <div className="font-mono text-sm font-bold text-[#1a1a1a]">{currentSample.macros.protein}g</div>
                  </div>
                  <div className="border border-[#1a1a1a] bg-white p-2 text-center">
                    <div className="text-[9px] uppercase font-sans tracking-widest text-[#1a1a1a]/60">Carbs</div>
                    <div className="font-mono text-sm font-bold text-[#1a1a1a]">{currentSample.macros.carbs}g</div>
                  </div>
                  <div className="border border-[#1a1a1a] bg-white p-2 text-center">
                    <div className="text-[9px] uppercase font-sans tracking-widest text-[#1a1a1a]/60">Fats</div>
                    <div className="font-mono text-sm font-bold text-[#1a1a1a]">{currentSample.macros.fat}g</div>
                  </div>
                </div>

                {/* Ingredients tags */}
                <div className="space-y-1">
                  <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
                    Detected Ingredients:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSample.detectedItems.map((item, i) => (
                      <span
                        key={i}
                        className="font-sans text-[10px] bg-white border border-[#1a1a1a]/30 px-2 py-0.5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleCommitScan}
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors cursor-pointer"
                >
                  Confirm & Log to Today's Timeline
                </button>
                <button
                  onClick={onClose}
                  className="border border-[#1a1a1a] px-6 py-3.5 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCommitManual} className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-1.5">
                  Meal or Food Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grass-fed Bison Burger with Sweet Potato Wedges"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-serif text-sm focus:outline-hidden focus:border-[#ff3d00]"
                  required
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-1.5">
                  Estimated Caloric Content (kcal)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 520"
                  value={customCals}
                  onChange={(e) => setCustomCals(e.target.value)}
                  className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-mono text-base focus:outline-hidden focus:border-[#ff3d00]"
                  required
                />
              </div>

              <div className="p-3 bg-[#f5f2eb] border border-[#1a1a1a] text-[11px] text-[#1a1a1a]/70 font-serif italic">
                The NutriAI precision engine will automatically partition macronutrient distribution (30% Protein / 45% Complex Carbs / 25% Clean Lipids) to calibrate your daily metabolic timeline.
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors cursor-pointer"
                >
                  Log Custom Nutrients
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-[#1a1a1a] px-6 py-3.5 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
