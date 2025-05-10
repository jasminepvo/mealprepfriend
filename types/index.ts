export type DietaryPreference = 
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'keto'
  | 'paleo'
  | 'gluten-free'
  | 'dairy-free'
  | 'low-carb'
  | 'high-protein'
  | 'balanced';

export type HealthGoal = 
  | 'lose_weight'
  | 'maintain_weight'
  | 'build_muscle'
  | 'improve_health';

export type ActivityLevel = 
  | 'sedentary' 
  | 'lightly_active' 
  | 'moderately_active' 
  | 'very_active' 
  | 'extremely_active';

export type UserProfile = {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  goalWeight?: number; // in kg
  activityLevel: ActivityLevel;
  healthGoal: HealthGoal;
  dietaryPreferences: DietaryPreference[];
  allergies: string[];
  targetCalories: number;
  targetProtein: number; // in grams
  targetCarbs: number; // in grams
  targetFat: number; // in grams
};

export type Meal = {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  dietaryTags: DietaryPreference[];
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type DailyMealPlan = {
  date: Date;
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
  snacks: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
};

export type WeeklyMealPlan = {
  id: string;
  startDate: Date;
  endDate: Date;
  days: DailyMealPlan[];
  user: UserProfile;
  shoppingList: ShoppingListItem[];
};

export type ShoppingListItem = {
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  category: 'produce' | 'dairy' | 'meat' | 'grains' | 'pantry' | 'spices' | 'other';
};

export type MealPrepStep = {
  id: string;
  description: string;
  estimatedTime: number; // in minutes
  completed: boolean;
  mealId: string;
};

export type MealPrepSchedule = {
  id: string;
  weeklyMealPlanId: string;
  totalTime: number; // in minutes
  steps: MealPrepStep[];
};