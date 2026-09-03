export type ActiveTab = 'command' | 'planner' | 'dining' | 'calibration';

export interface MacroBreakdown {
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionTargets {
  dailyCalorieTarget: number;
  consumedCalories: number;
  remainingCalories: number;
  weeklyBudget: number;
  weeklyConsumed: number;
  proteinTarget: number;
  proteinCurrent: number;
  carbsTarget: number;
  carbsCurrent: number;
  fatTarget: number;
  fatCurrent: number;
  refeedActive: boolean;
}

export interface TimelineMeal {
  id: string;
  time: string;
  type: 'Breakfast' | 'Lunch' | 'Afternoon' | 'Dinner' | 'Snack';
  title: string;
  calories: number;
  macros: MacroBreakdown;
  status: 'logged' | 'pending';
  imageUrl?: string;
  notes?: string;
}

export interface MealProposal {
  id: string;
  title: string;
  subhead: string;
  calories: number;
  macros: MacroBreakdown;
  prepTime: string;
  aiMatchScore: number;
  ingredients: string[];
  swaps: { original: string; replacement: string; calorieDelta: number }[];
  matchReason: string;
  badge: string;
}

export interface RestaurantVenue {
  id: string;
  name: string;
  category: string;
  distance: string;
  coordinates: { x: number; y: number }; // percentage on map
  recommendedDish: string;
  calories: number;
  macros: MacroBreakdown;
  customOrderingTip: string;
  aiFitScore: number;
  address: string;
}

export interface BiometricProfile {
  age: number;
  biologicalSex: 'Male' | 'Female' | 'Other';
  heightCm: number;
  weightKg: number;
  activityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Very Active' | 'Athletic';
  metabolicVariance: number; // percentage +/- baseline
  bmr: number;
  tdee: number;
  recommendedDeficit: number;
  weeklyRollingGoal: number;
  monthlyCap: number;
  cheatDayCadence: 'Every 7 Days' | 'Every 14 Days' | 'Flexible Adaptive';
  cheatStrategy: 'Deficit Bank' | '72h Caloric Smoothing' | 'Metabolic Reset Spike';
  maxSurplusCap: number;
  locationTrackingEnabled: boolean;
}
