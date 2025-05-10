import { UserProfile, WeeklyMealPlan, DailyMealPlan, Meal, ShoppingListItem } from '@/types';
import { mockMeals } from '@/data/mockData';

/**
 * Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation
 */
export const calculateBMR = (profile: UserProfile): number => {
  const { gender, weight, height, age } = profile;
  
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export const calculateTDEE = (profile: UserProfile): number => {
  const bmr = calculateBMR(profile);
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9,
  };
  
  return Math.round(bmr * activityMultipliers[profile.activityLevel]);
};

/**
 * Calculate target calorie intake based on health goal
 */
export const calculateTargetCalories = (profile: UserProfile): number => {
  const tdee = calculateTDEE(profile);
  
  switch (profile.healthGoal) {
    case 'lose_weight':
      return Math.round(tdee * 0.8); // 20% deficit
    case 'maintain_weight':
      return tdee;
    case 'build_muscle':
      return Math.round(tdee * 1.15); // 15% surplus
    case 'improve_health':
      return tdee;
    default:
      return tdee;
  }
};

/**
 * Calculate macronutrient targets based on health goal
 */
export const calculateMacroTargets = (profile: UserProfile) => {
  const targetCalories = profile.targetCalories || calculateTargetCalories(profile);
  let proteinPercentage = 0.30;
  let fatPercentage = 0.30;
  let carbPercentage = 0.40;
  
  // Adjust macros based on health goal and dietary preferences
  if (profile.healthGoal === 'build_muscle') {
    proteinPercentage = 0.35;
    fatPercentage = 0.25;
    carbPercentage = 0.40;
  } else if (profile.healthGoal === 'lose_weight') {
    proteinPercentage = 0.40;
    fatPercentage = 0.30;
    carbPercentage = 0.30;
  }
  
  // Adjust based on dietary preferences
  if (profile.dietaryPreferences.includes('keto') || profile.dietaryPreferences.includes('low-carb')) {
    carbPercentage = 0.10;
    fatPercentage = 0.65;
    proteinPercentage = 0.25;
  } else if (profile.dietaryPreferences.includes('high-protein')) {
    proteinPercentage = 0.40;
    carbPercentage = 0.35;
    fatPercentage = 0.25;
  }
  
  // Calculate grams based on calories
  // 1g protein = 4 calories, 1g carbs = 4 calories, 1g fat = 9 calories
  const targetProtein = Math.round((targetCalories * proteinPercentage) / 4);
  const targetCarbs = Math.round((targetCalories * carbPercentage) / 4);
  const targetFat = Math.round((targetCalories * fatPercentage) / 9);
  
  return { targetProtein, targetCarbs, targetFat };
};

/**
 * Filter meals based on dietary preferences and allergies
 */
export const filterMealsByDiet = (meals: Meal[], profile: UserProfile): Meal[] => {
  return meals.filter(meal => {
    // Check if meal contains any allergies
    const hasAllergies = profile.allergies.some(allergy => 
      meal.ingredients.some(ingredient => 
        ingredient.name.toLowerCase().includes(allergy.toLowerCase())
      )
    );
    
    if (hasAllergies) return false;
    
    // Check if meal matches dietary preferences
    if (profile.dietaryPreferences.includes('vegetarian') && 
        !meal.dietaryTags.includes('vegetarian') && 
        !meal.dietaryTags.includes('vegan')) {
      return false;
    }
    
    if (profile.dietaryPreferences.includes('vegan') && 
        !meal.dietaryTags.includes('vegan')) {
      return false;
    }
    
    if (profile.dietaryPreferences.includes('gluten-free') && 
        !meal.dietaryTags.includes('gluten-free')) {
      return false;
    }
    
    if (profile.dietaryPreferences.includes('dairy-free') && 
        !meal.dietaryTags.includes('dairy-free')) {
      return false;
    }
    
    return true;
  });
};

/**
 * Generate a daily meal plan based on user profile
 */
export const generateDailyMealPlan = (date: Date, meals: Meal[], profile: UserProfile): DailyMealPlan => {
  const filteredMeals = filterMealsByDiet(meals, profile);
  
  if (filteredMeals.length < 3) {
    // Not enough meals that match criteria
    return {
      date,
      breakfast: null,
      lunch: null,
      dinner: null,
      snacks: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };
  }
  
  // Simple algorithm to pick meals based on target calories
  // In a real app, this would be more sophisticated
  const targetCalories = profile.targetCalories;
  
  // Helper to get a random meal within the calorie range
  const getRandomMealInRange = (meals: Meal[], minCal: number, maxCal: number): Meal => {
    const mealsInRange = meals.filter(m => m.calories >= minCal && m.calories <= maxCal);
    
    if (mealsInRange.length === 0) {
      return meals[Math.floor(Math.random() * meals.length)];
    }
    
    return mealsInRange[Math.floor(Math.random() * mealsInRange.length)];
  };
  
  // Allocate calories to each meal type
  const breakfastCal = targetCalories * 0.25; // 25% of daily calories
  const lunchCal = targetCalories * 0.35; // 35% of daily calories
  const dinnerCal = targetCalories * 0.30; // 30% of daily calories
  const snackCal = targetCalories * 0.10; // 10% of daily calories
  
  // Pick meals
  const breakfast = getRandomMealInRange(filteredMeals, breakfastCal * 0.8, breakfastCal * 1.2);
  
  // Filter out the selected breakfast for lunch and dinner
  const remainingMeals = filteredMeals.filter(m => m.id !== breakfast.id);
  
  const lunch = getRandomMealInRange(remainingMeals, lunchCal * 0.8, lunchCal * 1.2);
  
  // Filter out lunch
  const mealsForDinner = remainingMeals.filter(m => m.id !== lunch.id);
  
  const dinner = getRandomMealInRange(mealsForDinner, dinnerCal * 0.8, dinnerCal * 1.2);
  
  // Find a suitable snack
  const mealsForSnack = remainingMeals.filter(m => m.id !== dinner.id && m.calories <= snackCal);
  
  const snacks = mealsForSnack.length > 0 
    ? [mealsForSnack[Math.floor(Math.random() * mealsForSnack.length)]] 
    : [];
  
  // Calculate totals
  const totalCalories = breakfast.calories + lunch.calories + dinner.calories + 
    snacks.reduce((sum, meal) => sum + meal.calories, 0);
    
  const totalProtein = breakfast.protein + lunch.protein + dinner.protein + 
    snacks.reduce((sum, meal) => sum + meal.protein, 0);
    
  const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + 
    snacks.reduce((sum, meal) => sum + meal.carbs, 0);
    
  const totalFat = breakfast.fat + lunch.fat + dinner.fat + 
    snacks.reduce((sum, meal) => sum + meal.fat, 0);
  
  return {
    date,
    breakfast,
    lunch,
    dinner,
    snacks,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
  };
};

/**
 * Generate a weekly meal plan
 */
export const generateWeeklyMealPlan = (profile: UserProfile): WeeklyMealPlan => {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  
  const days: DailyMealPlan[] = [];
  
  // Generate 7 days of meal plans
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    days.push(generateDailyMealPlan(date, mockMeals, profile));
  }
  
  // Generate a consolidated shopping list
  const shoppingList = generateShoppingList(days);
  
  return {
    id: `mp-${Date.now()}`,
    startDate,
    endDate,
    days,
    user: profile,
    shoppingList,
  };
};

/**
 * Generate a consolidated shopping list from daily meal plans
 */
export const generateShoppingList = (days: DailyMealPlan[]): ShoppingListItem[] => {
  const ingredientMap = new Map<string, { quantity: number; unit: string; category: ShoppingListItem['category'] }>();
  
  days.forEach(day => {
    const meals = [day.breakfast, day.lunch, day.dinner, ...day.snacks].filter(Boolean) as Meal[];
    
    meals.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        if (ingredientMap.has(ingredient.name)) {
          const existing = ingredientMap.get(ingredient.name)!;
          if (existing.unit === ingredient.unit) {
            existing.quantity += ingredient.quantity;
          }
        } else {
          let category: ShoppingListItem['category'] = 'other';
          
          // Simple categorization logic
          if (['apple', 'banana', 'berries', 'avocado', 'broccoli', 'carrots', 'celery', 'tomatoes', 'zucchini', 'onion', 'garlic', 'lemon', 'lime'].some(item => 
            ingredient.name.toLowerCase().includes(item)
          )) {
            category = 'produce';
          } else if (['chicken', 'beef', 'salmon', 'tuna', 'fish', 'pork', 'turkey'].some(item => 
            ingredient.name.toLowerCase().includes(item)
          )) {
            category = 'meat';
          } else if (['yogurt', 'cheese', 'milk', 'cream'].some(item => 
            ingredient.name.toLowerCase().includes(item)
          )) {
            category = 'dairy';
          } else if (['rice', 'pasta', 'bread', 'quinoa', 'oats', 'cereal'].some(item => 
            ingredient.name.toLowerCase().includes(item)
          )) {
            category = 'grains';
          } else if (['salt', 'pepper', 'cumin', 'cinnamon', 'oregano', 'basil', 'thyme', 'paprika'].some(item => 
            ingredient.name.toLowerCase().includes(item)
          )) {
            category = 'spices';
          } else if (['oil', 'vinegar', 'sauce', 'broth', 'stock', 'beans', 'lentils', 'canned'].some(item => 
            ingredient.name.toLowerCase().includes(item)
          )) {
            category = 'pantry';
          }
          
          ingredientMap.set(ingredient.name, {
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            category
          });
        }
      });
    });
  });
  
  // Convert the map to a list of shopping items
  return Array.from(ingredientMap.entries()).map(([name, details]) => ({
    name,
    quantity: details.quantity,
    unit: details.unit,
    purchased: false,
    category: details.category
  }));
};

/**
 * Calculate the total meal prep time for a weekly meal plan
 */
export const calculateTotalPrepTime = (weeklyMealPlan: WeeklyMealPlan): number => {
  let totalTime = 0;
  const uniqueMeals = new Set<string>();
  
  weeklyMealPlan.days.forEach(day => {
    const meals = [day.breakfast, day.lunch, day.dinner, ...day.snacks].filter(Boolean) as Meal[];
    
    meals.forEach(meal => {
      if (!uniqueMeals.has(meal.id)) {
        uniqueMeals.add(meal.id);
        totalTime += meal.prepTime + meal.cookTime;
      }
    });
  });
  
  // Factor in some efficiency for batch cooking
  return Math.round(totalTime * 0.7); // 30% efficiency gain from batch cooking
};

/**
 * Generate a meal prep schedule
 */
export const generateMealPrepSchedule = (weeklyMealPlan: WeeklyMealPlan) => {
  const totalTime = calculateTotalPrepTime(weeklyMealPlan);
  const steps: { id: string; description: string; estimatedTime: number; completed: boolean; mealId: string }[] = [];
  
  // Track processed meals to avoid duplicates
  const processedMeals = new Set<string>();
  
  // Organize meals by type to batch similar tasks
  const breakfasts: Meal[] = [];
  const lunches: Meal[] = [];
  const dinners: Meal[] = [];
  const snacks: Meal[] = [];
  
  weeklyMealPlan.days.forEach(day => {
    if (day.breakfast && !processedMeals.has(day.breakfast.id)) {
      breakfasts.push(day.breakfast);
      processedMeals.add(day.breakfast.id);
    }
    
    if (day.lunch && !processedMeals.has(day.lunch.id)) {
      lunches.push(day.lunch);
      processedMeals.add(day.lunch.id);
    }
    
    if (day.dinner && !processedMeals.has(day.dinner.id)) {
      dinners.push(day.dinner);
      processedMeals.add(day.dinner.id);
    }
    
    day.snacks.forEach(snack => {
      if (!processedMeals.has(snack.id)) {
        snacks.push(snack);
        processedMeals.add(snack.id);
      }
    });
  });
  
  // Add preparation steps in a logical order
  
  // 1. Start with washing and chopping all vegetables
  steps.push({
    id: `step-${steps.length + 1}`,
    description: 'Wash and chop all vegetables for the week',
    estimatedTime: 20,
    completed: false,
    mealId: 'all'
  });
  
  // 2. Prepare breakfast items
  breakfasts.forEach(breakfast => {
    steps.push({
      id: `step-${steps.length + 1}`,
      description: `Prepare ${breakfast.name}`,
      estimatedTime: breakfast.prepTime + breakfast.cookTime,
      completed: false,
      mealId: breakfast.id
    });
  });
  
  // 3. Prepare proteins for lunches and dinners
  const proteins = [...lunches, ...dinners].filter(meal => 
    meal.ingredients.some(ing => 
      ['chicken', 'beef', 'fish', 'tofu', 'pork', 'turkey', 'eggs'].some(protein => 
        ing.name.toLowerCase().includes(protein)
      )
    )
  );
  
  if (proteins.length > 0) {
    steps.push({
      id: `step-${steps.length + 1}`,
      description: 'Batch cook proteins (chicken, beef, fish, etc.)',
      estimatedTime: 40,
      completed: false,
      mealId: 'proteins'
    });
  }
  
  // 4. Prepare grains and starches
  const grains = [...lunches, ...dinners].filter(meal => 
    meal.ingredients.some(ing => 
      ['rice', 'quinoa', 'pasta', 'potato', 'sweet potato'].some(grain => 
        ing.name.toLowerCase().includes(grain)
      )
    )
  );
  
  if (grains.length > 0) {
    steps.push({
      id: `step-${steps.length + 1}`,
      description: 'Cook all grains and starches (rice, quinoa, potatoes)',
      estimatedTime: 30,
      completed: false,
      mealId: 'grains'
    });
  }
  
  // 5. Prepare sauces and dressings
  steps.push({
    id: `step-${steps.length + 1}`,
    description: 'Prepare sauces, dressings, and marinades',
    estimatedTime: 15,
    completed: false,
    mealId: 'sauces'
  });
  
  // 6. Assemble and portion meals
  steps.push({
    id: `step-${steps.length + 1}`,
    description: 'Assemble and portion all meals into containers',
    estimatedTime: 30,
    completed: false,
    mealId: 'assembly'
  });
  
  // 7. Prepare snacks
  if (snacks.length > 0) {
    steps.push({
      id: `step-${steps.length + 1}`,
      description: 'Prepare and portion snacks',
      estimatedTime: 15,
      completed: false,
      mealId: 'snacks'
    });
  }
  
  // 8. Clean up
  steps.push({
    id: `step-${steps.length + 1}`,
    description: 'Clean up kitchen and store all meals properly',
    estimatedTime: 20,
    completed: false,
    mealId: 'cleanup'
  });
  
  return {
    id: `prep-${Date.now()}`,
    weeklyMealPlanId: weeklyMealPlan.id,
    totalTime,
    steps
  };
};