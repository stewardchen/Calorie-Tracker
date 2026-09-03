/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { ActiveTab, NutritionTargets, TimelineMeal, MealProposal, MacroBreakdown, BiometricProfile } from './types';
import { initialNutritionTargets, initialTimelineMeals, initialMealProposals, initialDiningVenues, initialBiometrics } from './data/mockData';
import { Header } from './components/Header';
import { CommandCenter } from './components/CommandCenter';
import { MealPlanner } from './components/MealPlanner';
import { SmartDining } from './components/SmartDining';
import { BiometricsCalibration } from './components/BiometricsCalibration';
import { DiscussionForum } from './components/DiscussionForum';
import { ScanModal } from './components/ScanModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('command');
  const [targets, setTargets] = useState<NutritionTargets>(initialNutritionTargets);
  const [timelineMeals, setTimelineMeals] = useState<TimelineMeal[]>(initialTimelineMeals);
  const [proposals] = useState<MealProposal[]>(initialMealProposals);
  const [venues] = useState(initialDiningVenues);
  const [biometrics, setBiometrics] = useState<BiometricProfile>(initialBiometrics);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  // Sync active tab with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'discussion' || hash === 'disqus' || hash === 'forum') {
        setActiveTab('discussion');
      } else if (hash === 'command' || hash === 'planner' || hash === 'dining' || hash === 'calibration') {
        setActiveTab(hash as ActiveTab);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
    }
  };

  // Toggle Adaptive Re-feed Protocol (+350 kcal)
  const handleToggleRefeed = () => {
    setTargets((prev) => {
      const isNowActive = !prev.refeedActive;
      const targetDelta = isNowActive ? 350 : -350;
      const newTarget = prev.dailyCalorieTarget + targetDelta;
      const newRemaining = Math.max(0, newTarget - prev.consumedCalories);
      return {
        ...prev,
        refeedActive: isNowActive,
        dailyCalorieTarget: newTarget,
        remainingCalories: newRemaining,
      };
    });
  };

  // Add meal from scan or manual
  const handleAddMeal = (
    title: string,
    calories: number,
    macros: MacroBreakdown,
    type: 'Breakfast' | 'Lunch' | 'Afternoon' | 'Dinner' | 'Snack'
  ) => {
    const newMeal: TimelineMeal = {
      id: `meal-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      title,
      calories,
      macros,
      status: 'logged',
      notes: 'Captured via optical food spectrometry HUD.',
    };

    setTimelineMeals((prev) => [newMeal, ...prev]);

    setTargets((prev) => {
      const newConsumed = prev.consumedCalories + calories;
      return {
        ...prev,
        consumedCalories: newConsumed,
        remainingCalories: Math.max(0, prev.dailyCalorieTarget - newConsumed),
        proteinCurrent: prev.proteinCurrent + macros.protein,
        carbsCurrent: prev.carbsCurrent + macros.carbs,
        fatCurrent: prev.fatCurrent + macros.fat,
        weeklyConsumed: prev.weeklyConsumed + calories,
      };
    });
  };

  // Quick snack add
  const handleQuickAddMeal = (title: string, calories: number, p: number, c: number, f: number) => {
    handleAddMeal(title, calories, { protein: p, carbs: c, fat: f }, 'Snack');
  };

  // Delete logged meal
  const handleDeleteMeal = (id: string) => {
    const mealToDelete = timelineMeals.find((m) => m.id === id);
    if (!mealToDelete) return;

    setTimelineMeals((prev) => prev.filter((m) => m.id !== id));

    setTargets((prev) => {
      const newConsumed = Math.max(0, prev.consumedCalories - mealToDelete.calories);
      return {
        ...prev,
        consumedCalories: newConsumed,
        remainingCalories: Math.max(0, prev.dailyCalorieTarget - newConsumed),
        proteinCurrent: Math.max(0, prev.proteinCurrent - mealToDelete.macros.protein),
        carbsCurrent: Math.max(0, prev.carbsCurrent - mealToDelete.macros.carbs),
        fatCurrent: Math.max(0, prev.fatCurrent - mealToDelete.macros.fat),
        weeklyConsumed: Math.max(0, prev.weeklyConsumed - mealToDelete.calories),
      };
    });
  };

  // Select meal from AI Meal Planner
  const handleSelectProposal = (proposal: MealProposal) => {
    const newMeal: TimelineMeal = {
      id: `prop-${Date.now()}`,
      time: '08:00 PM',
      type: 'Dinner',
      title: proposal.title,
      calories: proposal.calories,
      macros: proposal.macros,
      status: 'logged',
      notes: proposal.matchReason,
    };

    // Replace pending dinner or append
    setTimelineMeals((prev) => {
      const filtered = prev.filter((m) => m.id !== 'm-4');
      return [...filtered, newMeal];
    });

    setTargets((prev) => {
      const newConsumed = prev.consumedCalories + proposal.calories;
      return {
        ...prev,
        consumedCalories: newConsumed,
        remainingCalories: Math.max(0, prev.dailyCalorieTarget - newConsumed),
        proteinCurrent: prev.proteinCurrent + proposal.macros.protein,
        carbsCurrent: prev.carbsCurrent + proposal.macros.carbs,
        fatCurrent: prev.fatCurrent + proposal.macros.fat,
        weeklyConsumed: prev.weeklyConsumed + proposal.calories,
      };
    });

    setActiveTab('command');
  };

  // Order from Smart Dining
  const handleOrderDiningMeal = (dish: string, calories: number, macros: MacroBreakdown) => {
    handleAddMeal(dish, calories, macros, 'Dinner');
    setActiveTab('command');
  };

  // Update biometrics and recalibrate
  const handleUpdateProfile = (updated: Partial<BiometricProfile>) => {
    setBiometrics((prev) => ({ ...prev, ...updated }));
  };

  const handleRecalibrate = () => {
    const calcTarget = Math.max(1200, biometrics.tdee - biometrics.recommendedDeficit);
    setTargets((prev) => ({
      ...prev,
      dailyCalorieTarget: calcTarget,
      remainingCalories: Math.max(0, calcTarget - prev.consumedCalories),
      weeklyBudget: calcTarget * 7,
    }));
  };

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-[#1a1a1a] flex flex-col relative overflow-x-hidden">
      {/* Subtle Artistic Flair Vermilion Dot Overlay */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff3d00] -mr-24 -mt-24 rounded-full opacity-10 pointer-events-none z-0" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        remainingCalories={targets.remainingCalories}
        refeedActive={targets.refeedActive}
        onOpenScanModal={() => setIsScanModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-8 relative z-10">
        {activeTab === 'command' && (
          <CommandCenter
            targets={targets}
            timelineMeals={timelineMeals}
            onToggleRefeed={handleToggleRefeed}
            onOpenScanModal={() => setIsScanModalOpen(true)}
            onQuickAddMeal={handleQuickAddMeal}
            onDeleteMeal={handleDeleteMeal}
            onNavigateTab={handleTabChange}
          />
        )}

        {activeTab === 'planner' && (
          <MealPlanner
            remainingCalories={targets.remainingCalories}
            proposals={proposals}
            onSelectProposal={handleSelectProposal}
          />
        )}

        {activeTab === 'dining' && (
          <SmartDining
            venues={venues}
            remainingCalories={targets.remainingCalories}
            onOpenScanModal={() => setIsScanModalOpen(true)}
            onOrderMeal={handleOrderDiningMeal}
          />
        )}

        {activeTab === 'calibration' && (
          <BiometricsCalibration
            profile={biometrics}
            onUpdateProfile={handleUpdateProfile}
            onRecalibrate={handleRecalibrate}
          />
        )}

        {activeTab === 'discussion' && (
          <DiscussionForum />
        )}
      </main>

      {/* Optical Spectrometry & Quick Scan Modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onAddMeal={handleAddMeal}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

