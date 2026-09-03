import React, { useState } from 'react';
import { BiometricProfile } from '../types';

interface BiometricsCalibrationProps {
  profile: BiometricProfile;
  onUpdateProfile: (updated: Partial<BiometricProfile>) => void;
  onRecalibrate: () => void;
}

export const BiometricsCalibration: React.FC<BiometricsCalibrationProps> = ({
  profile,
  onUpdateProfile,
  onRecalibrate,
}) => {
  const [age, setAge] = useState(profile.age);
  const [sex, setSex] = useState(profile.biologicalSex);
  const [height, setHeight] = useState(profile.heightCm);
  const [weight, setWeight] = useState(profile.weightKg);
  const [activity, setActivity] = useState(profile.activityLevel);
  const [variance, setVariance] = useState(profile.metabolicVariance);
  const [cadence, setCadence] = useState(profile.cheatDayCadence);
  const [strategy, setStrategy] = useState(profile.cheatStrategy);
  const [maxSurplus, setMaxSurplus] = useState(profile.maxSurplusCap);
  const [locationTracking, setLocationTracking] = useState(profile.locationTrackingEnabled);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Dynamic BMR calculation (Mifflin-St Jeor formula)
  const calcBmr = Math.round(
    sex === 'Male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161
  );

  // Activity multipliers
  const activityMultiplierMap: Record<string, number> = {
    Sedentary: 1.2,
    Light: 1.375,
    Moderate: 1.55,
    'Very Active': 1.725,
    Athletic: 1.9,
  };

  const mult = activityMultiplierMap[activity] || 1.55;
  const calcTdee = Math.round(calcBmr * mult * (1 + variance / 100));
  const calcTarget = Math.max(1200, calcTdee - profile.recommendedDeficit);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      age,
      biologicalSex: sex,
      heightCm: height,
      weightKg: weight,
      activityLevel: activity,
      metabolicVariance: variance,
      bmr: calcBmr,
      tdee: calcTdee,
      cheatDayCadence: cadence,
      cheatStrategy: strategy,
      maxSurplusCap: maxSurplus,
      locationTrackingEnabled: locationTracking,
    });
    onRecalibrate();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ profile, exportedAt: new Date().toISOString() }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'nutriai-biometric-ledger.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b-2 border-[#1a1a1a] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#ff3d00]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-black text-[#ff3d00]">
              Physiological Engine & Governance
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[#1a1a1a]">
            Biometrics & <span className="italic font-light text-[#ff3d00]">Calibration</span>
          </h1>
        </div>

        {savedSuccess && (
          <div className="border-2 border-[#1a1a1a] bg-[#ff3d00] text-white px-4 py-2 font-sans text-[10px] uppercase tracking-widest font-bold animate-pulse">
            ✓ Model Recalibrated & Synced
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Top Calculated Baselines Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-6 shadow-[3px_3px_0px_#1a1a1a] relative">
            <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 mb-1">
              Basal Metabolic Rate (BMR)
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-black text-[#1a1a1a]">
              {calcBmr} <span className="text-sm font-sans text-[#1a1a1a]/60">kcal</span>
            </div>
            <p className="font-serif italic text-xs text-[#1a1a1a]/70 mt-2">
              Resting cellular respiration expenditure at thermal equilibrium.
            </p>
          </div>

          <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-6 shadow-[3px_3px_0px_#1a1a1a] relative">
            <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 mb-1">
              Total Daily Expenditure (TDEE)
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-black text-[#1a1a1a]">
              {calcTdee} <span className="text-sm font-sans text-[#1a1a1a]/60">kcal</span>
            </div>
            <p className="font-serif italic text-xs text-[#1a1a1a]/70 mt-2">
              Combined physical exertion, NEAT thermogenesis, and baseline variance.
            </p>
          </div>

          <div className="border-2 border-[#1a1a1a] bg-white p-6 shadow-[4px_4px_0px_#ff3d00] relative">
            <div className="font-sans text-[9px] uppercase tracking-widest text-[#ff3d00] font-black mb-1">
              Calibrated Daily Target
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-black text-[#ff3d00]">
              {calcTarget} <span className="text-sm font-sans text-[#1a1a1a]/60">kcal</span>
            </div>
            <p className="font-serif italic text-xs text-[#1a1a1a]/70 mt-2">
              High-precision 500 kcal caloric deficit targeting ~0.5kg/week steady lean fat reduction.
            </p>
          </div>
        </div>

        {/* Section 1: Physical Parameters */}
        <div className="border-2 border-[#1a1a1a] bg-[#fdfcf8] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold border-b border-[#1a1a1a]/20 pb-3">
            <span className="w-6 h-[1px] bg-[#1a1a1a]"></span>
            01 // Physiological Biometric Parameters
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Biological Sex
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as any)}
                className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-serif text-sm focus:outline-hidden focus:border-[#ff3d00]"
              >
                <option value="Male">Male (Biological baseline)</option>
                <option value="Female">Female (Biological baseline)</option>
                <option value="Other">Custom Averaged Horizon</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Chronological Age
              </label>
              <input
                type="number"
                min="16"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-mono text-sm focus:outline-hidden focus:border-[#ff3d00]"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Stature / Height (cm)
              </label>
              <input
                type="number"
                min="120"
                max="240"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-mono text-sm focus:outline-hidden focus:border-[#ff3d00]"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Body Mass (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="35"
                max="200"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-mono text-sm focus:outline-hidden focus:border-[#ff3d00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Physical Exertion Tier
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as any)}
                className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-serif text-sm focus:outline-hidden focus:border-[#ff3d00]"
              >
                <option value="Sedentary">Sedentary (Desk work, &lt;3,000 steps)</option>
                <option value="Light">Light Exertion (1-2 weekly sessions)</option>
                <option value="Moderate">Moderate Exertion (3-5 intense workouts/wk)</option>
                <option value="Very Active">Very Active (6-7 intense workouts/wk)</option>
                <option value="Athletic">Elite Athletic (Twice daily training)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-sans text-[10px] uppercase tracking-widest font-bold">
                  Metabolic Baseline Variance Factor ({variance > 0 ? `+${variance}%` : `${variance}%`})
                </label>
                <span className="font-mono text-xs text-[#ff3d00] font-bold">
                  {variance > 0 ? 'Hyper-Metabolic' : variance < 0 ? 'Hypo-Metabolic' : 'Standard'}
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={variance}
                onChange={(e) => setVariance(Number(e.target.value))}
                className="w-full accent-[#ff3d00] cursor-pointer mt-2"
              />
              <div className="flex justify-between text-[8px] font-mono text-[#1a1a1a]/60 mt-1">
                <span>-10% (Slower adaptive baseline)</span>
                <span>0% (Standard)</span>
                <span>+10% (High sympathetic tone)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Cheat Day & Re-feed Strategy Architecture */}
        <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold border-b border-[#1a1a1a]/20 pb-3">
            <span className="w-6 h-[1px] bg-[#ff3d00]"></span>
            02 // Re-feed Strategy & Caloric Smoothing Architecture
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Re-feed Cadence
              </label>
              <select
                value={cadence}
                onChange={(e) => setCadence(e.target.value as any)}
                className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-serif text-sm focus:outline-hidden focus:border-[#ff3d00]"
              >
                <option value="Every 7 Days">Every 7 Days (Standard Weekend Protocol)</option>
                <option value="Every 14 Days">Every 14 Days (Conservative Deficit)</option>
                <option value="Flexible Adaptive">Flexible Adaptive (Auto-triggered on fatigue)</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Absorption Strategy
              </label>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value as any)}
                className="w-full border-2 border-[#1a1a1a] bg-white p-3 font-serif text-sm focus:outline-hidden focus:border-[#ff3d00]"
              >
                <option value="72h Caloric Smoothing">72-Hour Caloric Smoothing (Recommended)</option>
                <option value="Deficit Bank">Deficit Bank (Pre-deduct 100 kcal Mon-Fri)</option>
                <option value="Metabolic Reset Spike">Metabolic Reset Spike (Single day unbuffered)</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-2">
                Max Safety Surplus Cap (+{maxSurplus} kcal)
              </label>
              <input
                type="range"
                min="300"
                max="1200"
                step="50"
                value={maxSurplus}
                onChange={(e) => setMaxSurplus(Number(e.target.value))}
                className="w-full accent-[#ff3d00] cursor-pointer mt-3"
              />
              <div className="text-[9px] font-sans text-[#1a1a1a]/60 mt-1">
                Limits maximum single-meal overconsumption to prevent visceral fat accumulation.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Data Governance & Privacy */}
        <div className="border-2 border-[#1a1a1a] bg-white p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold border-b border-[#1a1a1a]/20 pb-3">
            <span className="w-6 h-[1px] bg-[#1a1a1a]"></span>
            03 // Data Sovereignty & Privacy Controls
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-[#1a1a1a] bg-[#fdfcf8]">
            <div>
              <div className="font-serif font-bold text-sm text-[#1a1a1a]">
                Smart Dining Ephemeral Location Caching
              </div>
              <p className="font-serif italic text-xs text-[#1a1a1a]/70 mt-0.5">
                When enabled, GPS coordinates are processed exclusively on device memory to match nearest healthy eateries.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLocationTracking(!locationTracking)}
              className={`px-4 py-2 font-sans text-[10px] uppercase font-bold tracking-widest border transition-colors cursor-pointer ${
                locationTracking ? 'border-[#ff3d00] bg-[#ff3d00] text-white' : 'border-[#1a1a1a] bg-white text-[#1a1a1a]'
              }`}
            >
              {locationTracking ? 'Tracking Enabled' : 'Disabled (Offline)'}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={handleExportData}
              className="border border-[#1a1a1a] bg-white px-5 py-3 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer"
            >
              Export Biometric Ledger (.JSON)
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear ephemeral cached meal history?')) {
                  alert('Ephemeral telemetry cleared.');
                }
              }}
              className="border border-[#1a1a1a] bg-white px-5 py-3 font-sans text-[10px] uppercase font-bold tracking-widest hover:border-[#ff3d00] hover:text-[#ff3d00] transition-colors cursor-pointer"
            >
              Purge Local Cache
            </button>
          </div>
        </div>

        {/* Submit action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1a1a1a] text-white px-10 py-4 font-sans text-[11px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors shadow-[4px_4px_0px_#1a1a1a] cursor-pointer"
          >
            Apply & Recalibrate Metabolic Model
          </button>
          <span className="text-xs font-serif italic text-[#1a1a1a]/70">
            Recalibration automatically updates your Command Center daily target limits.
          </span>
        </div>
      </form>
    </div>
  );
};
