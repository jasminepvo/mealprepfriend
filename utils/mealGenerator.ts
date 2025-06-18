import dietCategories from '@/data/dietCategories';

interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

export interface Meal {
  name: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface WeeklyMealPlan {
  monday: DailyMeals;
  tuesday: DailyMeals;
  wednesday: DailyMeals;
  thursday: DailyMeals;
  friday: DailyMeals;
  saturday: DailyMeals;
  sunday: DailyMeals;
}

// Sample database of food items with nutrition info
// In a real app, this would come from an API or a more comprehensive database
const foodDatabase: Record<string, MealItem> = {
  // Proteins
  'TILAPIA': { name: 'Tilapia', calories: 128, protein: 26, carbs: 0, fat: 3, category: 'Protein' },
  'BARRAMUNDI': { name: 'Barramundi', calories: 122, protein: 24, carbs: 0, fat: 2.5, category: 'Protein' },
  'SALMON': { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13, category: 'Protein' },
  'TUNA': { name: 'Tuna', calories: 142, protein: 30, carbs: 0, fat: 1, category: 'Protein' },
  'SHRIMP': { name: 'Shrimp', calories: 99, protein: 24, carbs: 0, fat: 1, category: 'Protein' },
  'CHICKEN BREAST': { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Protein' },
  'CHICKEN THIGHS': { name: 'Chicken Thighs', calories: 209, protein: 26, carbs: 0, fat: 10.9, category: 'Protein' },
  'GROUND TURKEY': { name: 'Ground Turkey', calories: 170, protein: 22, carbs: 0, fat: 9, category: 'Protein' },
  'GROUND BEEF': { name: 'Ground Beef', calories: 250, protein: 26, carbs: 0, fat: 15, category: 'Protein' },
  'STEAK': { name: 'Steak', calories: 271, protein: 28, carbs: 0, fat: 17, category: 'Protein' },
  'PORK CHOP': { name: 'Pork Chop', calories: 196, protein: 26, carbs: 0, fat: 10, category: 'Protein' },
  'BACON': { name: 'Bacon', calories: 460, protein: 37, carbs: 1.4, fat: 35, category: 'Protein' },
  'TURKEY BACON': { name: 'Turkey Bacon', calories: 218, protein: 25, carbs: 1, fat: 14, category: 'Protein' },
  'TOFU': { name: 'Tofu', calories: 144, protein: 17, carbs: 3, fat: 8, category: 'Protein' },
  'TEMPEH': { name: 'Tempeh', calories: 193, protein: 20, carbs: 8, fat: 11, category: 'Protein' },
  'EGGS': { name: 'Eggs', calories: 143, protein: 13, carbs: 1, fat: 10, category: 'Protein' },
  'GREEK YOGURT': { name: 'Greek Yogurt', calories: 100, protein: 10, carbs: 6, fat: 2.5, category: 'Protein' },
  'COTTAGE CHEESE': { name: 'Cottage Cheese', calories: 98, protein: 11, carbs: 3, fat: 4, category: 'Protein' },
  'LENTILS': { name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, category: 'Protein' },
  'BLACK BEANS': { name: 'Black Beans', calories: 114, protein: 7, carbs: 20, fat: 0.5, category: 'Protein' },
  'CHICKPEAS': { name: 'Chickpeas', calories: 120, protein: 6, carbs: 22, fat: 2, category: 'Protein' },

  // Carbs
  'RICE': { name: 'Rice', calories: 204, protein: 4, carbs: 44, fat: 0.5, category: 'Carb' },
  'BROWN RICE': { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, category: 'Carb' },
  'WHITE RICE': { name: 'White Rice', calories: 204, protein: 4, carbs: 44, fat: 0.5, category: 'Carb' },
  'JASMINE RICE': { name: 'Jasmine Rice', calories: 200, protein: 4, carbs: 45, fat: 0.6, category: 'Carb' },
  'POTATO': { name: 'Potato', calories: 161, protein: 4, carbs: 37, fat: 0.2, category: 'Carb' },
  'SWEET POTATO': { name: 'Sweet Potato', calories: 114, protein: 2, carbs: 27, fat: 0.1, category: 'Carb' },
  'QUINOA': { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.6, category: 'Carb' },
  'FRENCH FRIES': { name: 'French Fries', calories: 312, protein: 4, carbs: 41, fat: 15, category: 'Carb' },
  'TORTILLA': { name: 'Tortilla', calories: 104, protein: 3, carbs: 17, fat: 3.2, category: 'Carb' },
  'CORN TORTILLA': { name: 'Corn Tortilla', calories: 62, protein: 1.6, carbs: 12.5, fat: 0.7, category: 'Carb' },
  'FLOUR TORTILLA': { name: 'Flour Tortilla', calories: 104, protein: 3, carbs: 17, fat: 3.2, category: 'Carb' },
  'PASTA': { name: 'Pasta', calories: 183, protein: 6.7, carbs: 35.5, fat: 0.9, category: 'Carb' },
  'WHOLE WHEAT PASTA': { name: 'Whole Wheat Pasta', calories: 174, protein: 7.5, carbs: 37, fat: 0.8, category: 'Carb' },
  'BREAD': { name: 'Bread', calories: 79, protein: 3, carbs: 14, fat: 1, category: 'Carb' },
  'WHOLE GRAIN BREAD': { name: 'Whole Grain Bread', calories: 81, protein: 4, carbs: 15, fat: 1, category: 'Carb' },
  'SOURDOUGH': { name: 'Sourdough', calories: 80, protein: 3, carbs: 16, fat: 0.5, category: 'Carb' },
  'BAGEL': { name: 'Bagel', calories: 245, protein: 9, carbs: 48, fat: 1.5, category: 'Carb' },
  'OATMEAL': { name: 'Oatmeal', calories: 166, protein: 6, carbs: 28, fat: 3.6, category: 'Carb' },
  'COUSCOUS': { name: 'Couscous', calories: 176, protein: 6, carbs: 37, fat: 0.3, category: 'Carb' },
  'BARLEY': { name: 'Barley', calories: 193, protein: 4, carbs: 44, fat: 1, category: 'Carb' },

  // Veggies
  'BROCCOLI': { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, category: 'Veggies' },
  'SPINACH': { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: 'Veggies' },
  'KALE': { name: 'Kale', calories: 49, protein: 4.3, carbs: 8.8, fat: 0.9, category: 'Veggies' },
  'ARUGULA': { name: 'Arugula', calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, category: 'Veggies' },
  'CARROT': { name: 'Carrot', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, category: 'Veggies' },
  'BOK CHOY': { name: 'Bok Choy', calories: 13, protein: 1.5, carbs: 2.2, fat: 0.2, category: 'Veggies' },
  'SALAD MIX': { name: 'Salad Mix', calories: 18, protein: 1.5, carbs: 3.5, fat: 0.2, category: 'Veggies' },
  'MIXED GREENS': { name: 'Mixed Greens', calories: 17, protein: 1.5, carbs: 3, fat: 0.2, category: 'Veggies' },
  'KIMCHI': { name: 'Kimchi', calories: 23, protein: 1.7, carbs: 4, fat: 0.5, category: 'Veggies' },
  'GREEN BEANS': { name: 'Green Beans', calories: 31, protein: 1.8, carbs: 7, fat: 0.2, category: 'Veggies' },
  'BRUSSEL SPROUTS': { name: 'Brussel Sprouts', calories: 43, protein: 3, carbs: 9, fat: 0.3, category: 'Veggies' },
  'CAULIFLOWER': { name: 'Cauliflower', calories: 25, protein: 1.9, carbs: 5, fat: 0.3, category: 'Veggies' },
  'BELL PEPPER': { name: 'Bell Pepper', calories: 31, protein: 1, carbs: 7.6, fat: 0.3, category: 'Veggies' },
  'ZUCCHINI': { name: 'Zucchini', calories: 17, protein: 1.2, carbs: 3.4, fat: 0.3, category: 'Veggies' },
  'ASPARAGUS': { name: 'Asparagus', calories: 27, protein: 2.9, carbs: 5.2, fat: 0.2, category: 'Veggies' },
  'TOMATO': { name: 'Tomato', calories: 18, protein: 0.9, carbs: 4, fat: 0.2, category: 'Veggies' },
  'CUCUMBER': { name: 'Cucumber', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, category: 'Veggies' },
  'MUSHROOM': { name: 'Mushroom', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, category: 'Veggies' },
  'ONION': { name: 'Onion', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, category: 'Veggies' },
  'GARLIC': { name: 'Garlic', calories: 149, protein: 6.4, carbs: 33, fat: 0.5, category: 'Veggies' },
  'AVOCADO': { name: 'Avocado', calories: 160, protein: 2, carbs: 8.5, fat: 15, category: 'Veggies' },
  'CORN': { name: 'Corn', calories: 86, protein: 3.2, carbs: 19, fat: 1.2, category: 'Veggies' },
  'CABBAGE': { name: 'Cabbage', calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, category: 'Veggies' },

  // Snacks
  'CHIPS': { name: 'Chips', calories: 155, protein: 2, carbs: 15, fat: 10, category: 'Snacks' },
  'TORTILLA CHIPS': { name: 'Tortilla Chips', calories: 142, protein: 2, carbs: 19, fat: 7, category: 'Snacks' },
  'POTATO CHIPS': { name: 'Potato Chips', calories: 155, protein: 2, carbs: 15, fat: 10, category: 'Snacks' },
  'VEGGIE CHIPS': { name: 'Veggie Chips', calories: 130, protein: 1.5, carbs: 16, fat: 7, category: 'Snacks' },
  'COOKIES': { name: 'Cookies', calories: 148, protein: 1.5, carbs: 22, fat: 7, category: 'Snacks' },
  'CHOCOLATE CHIP COOKIES': { name: 'Chocolate Chip Cookies', calories: 160, protein: 2, carbs: 24, fat: 8, category: 'Snacks' },
  'ICE CREAM': { name: 'Ice Cream', calories: 137, protein: 2.3, carbs: 16, fat: 7, category: 'Snacks' },
  'FROZEN YOGURT': { name: 'Frozen Yogurt', calories: 100, protein: 3, carbs: 17, fat: 2, category: 'Snacks' },
  'MANGO': { name: 'Mango', calories: 99, protein: 1.4, carbs: 25, fat: 0.6, category: 'Snacks' },
  'STRAWBERRY': { name: 'Strawberry', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, category: 'Snacks' },
  'BLUEBERRY': { name: 'Blueberry', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, category: 'Snacks' },
  'BANANA': { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: 'Snacks' },
  'APPLE': { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, category: 'Snacks' },
  'GRAPES': { name: 'Grapes', calories: 69, protein: 0.7, carbs: 18, fat: 0.2, category: 'Snacks' },
  'ORANGE': { name: 'Orange', calories: 62, protein: 1.2, carbs: 15, fat: 0.2, category: 'Snacks' },
  'DARK CHOCOLATE': { name: 'Dark Chocolate', calories: 155, protein: 2, carbs: 13, fat: 9, category: 'Snacks' },
  'POPCORN': { name: 'Popcorn', calories: 106, protein: 3.1, carbs: 21, fat: 1.2, category: 'Snacks' },
  'NUTS': { name: 'Mixed Nuts', calories: 172, protein: 5, carbs: 6, fat: 15, category: 'Snacks' },
  'ALMONDS': { name: 'Almonds', calories: 161, protein: 6, carbs: 6, fat: 14, category: 'Snacks' },
  'WALNUTS': { name: 'Walnuts', calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, category: 'Snacks' },
  'PROTEIN BAR': { name: 'Protein Bar', calories: 180, protein: 15, carbs: 21, fat: 5, category: 'Snacks' },
  'GRANOLA BAR': { name: 'Granola Bar', calories: 120, protein: 3, carbs: 20, fat: 4, category: 'Snacks' },
  'TRAIL MIX': { name: 'Trail Mix', calories: 170, protein: 4, carbs: 15, fat: 11, category: 'Snacks' },
  'HUMMUS': { name: 'Hummus', calories: 166, protein: 7.9, carbs: 14, fat: 9.6, category: 'Snacks' },

  // Dairy
  'MILK': { name: 'Milk', calories: 103, protein: 8, carbs: 12, fat: 2.4, category: 'Dairy' },
  'ALMOND MILK': { name: 'Almond Milk', calories: 39, protein: 1.5, carbs: 3.5, fat: 2.5, category: 'Dairy' },
  'OAT MILK': { name: 'Oat Milk', calories: 120, protein: 3, carbs: 16, fat: 5, category: 'Dairy' },
  'SOY MILK': { name: 'Soy Milk', calories: 80, protein: 7, carbs: 4, fat: 4, category: 'Dairy' },
  'COCONUT MILK': { name: 'Coconut Milk', calories: 230, protein: 2.3, carbs: 6, fat: 24, category: 'Dairy' },
  'CHEESE': { name: 'Cheese', calories: 113, protein: 7, carbs: 0.9, fat: 9, category: 'Dairy' },
  'CHEDDAR CHEESE': { name: 'Cheddar Cheese', calories: 113, protein: 7, carbs: 0.9, fat: 9, category: 'Dairy' },
  'MOZZARELLA': { name: 'Mozzarella', calories: 85, protein: 6.3, carbs: 0.6, fat: 6.3, category: 'Dairy' },
  'FETA CHEESE': { name: 'Feta Cheese', calories: 99, protein: 5.3, carbs: 1.2, fat: 8, category: 'Dairy' },
  'PARMESAN': { name: 'Parmesan', calories: 111, protein: 10, carbs: 0.9, fat: 7.3, category: 'Dairy' },
  'BUTTER': { name: 'Butter', calories: 102, protein: 0.1, carbs: 0.1, fat: 11.5, category: 'Dairy' },
  'GHEE': { name: 'Ghee', calories: 112, protein: 0, carbs: 0, fat: 12.5, category: 'Dairy' },
  'YOGURT': { name: 'Yogurt', calories: 59, protein: 3.5, carbs: 5, fat: 3.3, category: 'Dairy' },
  'KEFIR': { name: 'Kefir', calories: 60, protein: 3.3, carbs: 4.6, fat: 3.3, category: 'Dairy' },
  'WHIPPED CREAM': { name: 'Whipped Cream', calories: 154, protein: 1.5, carbs: 7, fat: 13, category: 'Dairy' },

  // Beverages
  'WATER': { name: 'Water', calories: 0, protein: 0, carbs: 0, fat: 0, category: 'Beverages' },
  'SPARKLING WATER': { name: 'Sparkling Water', calories: 0, protein: 0, carbs: 0, fat: 0, category: 'Beverages' },
  'COFFEE': { name: 'Coffee', calories: 2, protein: 0.3, carbs: 0, fat: 0, category: 'Beverages' },
  'BLACK TEA': { name: 'Black Tea', calories: 2, protein: 0, carbs: 0.5, fat: 0, category: 'Beverages' },
  'GREEN TEA': { name: 'Green Tea', calories: 2, protein: 0, carbs: 0.5, fat: 0, category: 'Beverages' },
  'HERBAL TEA': { name: 'Herbal Tea', calories: 2, protein: 0, carbs: 0.5, fat: 0, category: 'Beverages' },
  'KOMBUCHA': { name: 'Kombucha', calories: 30, protein: 0, carbs: 7, fat: 0, category: 'Beverages' },
  'SODA': { name: 'Soda', calories: 140, protein: 0, carbs: 39, fat: 0, category: 'Beverages' },
  'DIET SODA': { name: 'Diet Soda', calories: 0, protein: 0, carbs: 0, fat: 0, category: 'Beverages' },
  'JUICE': { name: 'Juice', calories: 110, protein: 0.5, carbs: 26, fat: 0.3, category: 'Beverages' },
  'ORANGE JUICE': { name: 'Orange Juice', calories: 112, protein: 1.7, carbs: 26, fat: 0.5, category: 'Beverages' },
  'APPLE JUICE': { name: 'Apple Juice', calories: 114, protein: 0.2, carbs: 28, fat: 0.3, category: 'Beverages' },
  'SMOOTHIE': { name: 'Smoothie', calories: 170, protein: 3, carbs: 34, fat: 2, category: 'Beverages' },
  'PROTEIN SHAKE': { name: 'Protein Shake', calories: 150, protein: 25, carbs: 5, fat: 3, category: 'Beverages' },
};

/**
 * Generate a meal based on dietary preferences and calorie targets
 */
export function generateMeal(
  preferences: string[],
  targetCalories: number,
  mealType: 'breakfast' | 'lunch' | 'dinner',
  proteinRatio: number,
  carbRatio: number,
  fatRatio: number
): Meal {
  // Calculate target calories for this meal
  const mealTargets = {
    breakfast: targetCalories * 0.25,
    lunch: targetCalories * 0.35,
    dinner: targetCalories * 0.30
  };

  const mealTargetCalories = mealTargets[mealType];
  // Allow 10% margin of error
  const minCalories = mealTargetCalories * 0.9;
  const maxCalories = mealTargetCalories * 1.1;

  // Filter food database to only include items in user preferences
  const availableFoods = preferences
    .filter(pref => foodDatabase[pref])
    .map(pref => foodDatabase[pref]);

  // If no preferred foods found, use some defaults
  if (availableFoods.length === 0) {
    const defaultMeals = {
      breakfast: {
        name: 'Default Breakfast',
        items: ['OATMEAL', 'EGGS', 'BANANA'],
        calories: Math.round(mealTargetCalories),
        protein: Math.round((mealTargetCalories * proteinRatio) / 4),
        carbs: Math.round((mealTargetCalories * carbRatio) / 4),
        fat: Math.round((mealTargetCalories * fatRatio) / 9),
      },
      lunch: {
        name: 'Default Lunch',
        items: ['CHICKEN BREAST', 'BROWN RICE', 'MIXED GREENS'],
        calories: Math.round(mealTargetCalories),
        protein: Math.round((mealTargetCalories * proteinRatio) / 4),
        carbs: Math.round((mealTargetCalories * carbRatio) / 4),
        fat: Math.round((mealTargetCalories * fatRatio) / 9),
      },
      dinner: {
        name: 'Default Dinner',
        items: ['SALMON', 'QUINOA', 'BROCCOLI'],
        calories: Math.round(mealTargetCalories),
        protein: Math.round((mealTargetCalories * proteinRatio) / 4),
        carbs: Math.round((mealTargetCalories * carbRatio) / 4),
        fat: Math.round((mealTargetCalories * fatRatio) / 9),
      },
    };
    return defaultMeals[mealType];
  }

  // Categorize foods
  const proteinFoods = availableFoods.filter(food => food.category === 'Protein');
  const carbFoods = availableFoods.filter(food => food.category === 'Carb');
  const veggies = availableFoods.filter(food => food.category === 'Veggies');

  // Try to generate a meal that meets the calorie target
  let attempts = 0;
  let bestMeal: Meal | null = null;
  let closestCalorieDiff = Infinity;

  while (attempts < 15) {
    // Select a protein (40-50% of meal calories)
    const proteinTarget = mealTargetCalories * 0.45;
    const proteinFood = proteinFoods.length > 0 ?
      proteinFoods.reduce((prev, curr) =>
        Math.abs(curr.calories - proteinTarget) < Math.abs(prev.calories - proteinTarget) ? curr : prev
      ) : null;

    // Select a carb (30-40% of meal calories)
    const carbTarget = mealTargetCalories * 0.35;
    const carbFood = carbFoods.length > 0 ?
      carbFoods.reduce((prev, curr) =>
        Math.abs(curr.calories - carbTarget) < Math.abs(prev.calories - carbTarget) ? curr : prev
      ) : null;

    // Select veggies (remaining calories)
    const veggie = veggies.length > 0 ?
      veggies[Math.floor(Math.random() * veggies.length)] : null;

    // Calculate meal totals
    const items: string[] = [];
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    if (proteinFood) {
      items.push(proteinFood.name.toUpperCase());
      totalCalories += proteinFood.calories;
      totalProtein += proteinFood.protein;
      totalCarbs += proteinFood.carbs;
      totalFat += proteinFood.fat;
    }

    if (carbFood) {
      items.push(carbFood.name.toUpperCase());
      totalCalories += carbFood.calories;
      totalProtein += carbFood.protein;
      totalCarbs += carbFood.carbs;
      totalFat += carbFood.fat;
    }

    if (veggie) {
      items.push(veggie.name.toUpperCase());
      totalCalories += veggie.calories;
      totalProtein += veggie.protein;
      totalCarbs += veggie.carbs;
      totalFat += veggie.fat;
    }

    const meal = {
      name: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Meal`,
      items,
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fat: Math.round(totalFat),
    };

    // If we found a meal within our target range, use it
    if (meal.calories >= minCalories && meal.calories <= maxCalories) {
      return meal;
    }

    // Keep track of the closest meal to target
    const calorieDiff = Math.abs(meal.calories - mealTargetCalories);
    if (calorieDiff < closestCalorieDiff) {
      closestCalorieDiff = calorieDiff;
      bestMeal = meal;
    }

    attempts++;
  }

  // If we couldn't find an ideal meal, return the closest one
  return bestMeal || {
    name: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Meal`,
    items: ['OATMEAL', 'EGGS', 'MIXED GREENS'],
    calories: Math.round(mealTargetCalories),
    protein: Math.round((mealTargetCalories * proteinRatio) / 4),
    carbs: Math.round((mealTargetCalories * carbRatio) / 4),
    fat: Math.round((mealTargetCalories * fatRatio) / 9),
  };
}

/**
 * Generate a full day of meals
 */
export function generateDailyMeals(
  preferences: string[],
  targetCalories: number,
  proteinRatio: number,
  carbRatio: number,
  fatRatio: number
): DailyMeals {
  // Generate main meals
  const breakfast = generateMeal(preferences, targetCalories, 'breakfast', proteinRatio, carbRatio, fatRatio);
  const lunch = generateMeal(preferences, targetCalories, 'lunch', proteinRatio, carbRatio, fatRatio);
  const dinner = generateMeal(preferences, targetCalories, 'dinner', proteinRatio, carbRatio, fatRatio);

  // Calculate remaining calories needed
  const currentTotal = breakfast.calories + lunch.calories + dinner.calories;
  const targetSnackCalories = targetCalories * 0.10; // 10% for snacks
  const remainingCalories = targetCalories - currentTotal;

  // Generate snacks if needed
  const snackFoods = preferences
    .filter(pref => foodDatabase[pref])
    .map(pref => foodDatabase[pref])
    .filter(food =>
      food.category === 'Snacks' &&
      food.calories <= targetSnackCalories * 1.2
    );

  // Try to add snacks to meet calorie goals
  if (remainingCalories > targetCalories * 0.05 && snackFoods.length > 0) {
    // Find snacks that best fit the remaining calories
    const snack = snackFoods.reduce((prev, curr) =>
      Math.abs(curr.calories - remainingCalories) < Math.abs(prev.calories - remainingCalories) ? curr : prev
    );

    // Create a copy of breakfast without modifying its original values
    const breakfastWithSnack = {
      ...breakfast,
      items: [...breakfast.items, snack.name + ' (snack)'],
      calories: breakfast.calories + snack.calories,
      protein: breakfast.protein + snack.protein,
      carbs: breakfast.carbs + snack.carbs,
      fat: breakfast.fat + snack.fat,
    };

    return {
      breakfast: breakfastWithSnack,
      lunch,
      dinner,
      totalCalories: breakfastWithSnack.calories + lunch.calories + dinner.calories,
      totalProtein: breakfastWithSnack.protein + lunch.protein + dinner.protein,
      totalCarbs: breakfastWithSnack.carbs + lunch.carbs + dinner.carbs,
      totalFat: breakfastWithSnack.fat + lunch.fat + dinner.fat,
    };
  }

  return {
    breakfast,
    lunch,
    dinner,
    totalCalories: breakfast.calories + lunch.calories + dinner.calories,
    totalProtein: breakfast.protein + lunch.protein + dinner.protein,
    totalCarbs: breakfast.carbs + lunch.carbs + dinner.carbs,
    totalFat: breakfast.fat + lunch.fat + dinner.fat,
  };
}

/**
 * Generate a full week of meals
 */
export function generateWeeklyMealPlan(
  preferences: string[],
  targetCalories: number,
  proteinRatio: number,
  carbRatio: number,
  fatRatio: number
): WeeklyMealPlan {
  return {
    monday: generateDailyMeals(preferences, targetCalories, proteinRatio, carbRatio, fatRatio),
    tuesday: generateDailyMeals(preferences, targetCalories, proteinRatio, carbRatio, fatRatio),
    wednesday: generateDailyMeals(preferences, targetCalories, proteinRatio, carbRatio, fatRatio),
    thursday: generateDailyMeals(preferences, targetCalories, proteinRatio, carbRatio, fatRatio),
    friday: generateDailyMeals(preferences, targetCalories, proteinRatio, carbRatio, fatRatio),
    saturday: generateDailyMeals(preferences, targetCalories, proteinRatio, carbRatio, fatRatio),
    sunday: generateDailyMeals(preferences, targetCalories, proteinRatio, carbRatio, fatRatio),
  };
}

// Key type for storing meal plan in AsyncStorage
export const MEAL_PLAN_STORAGE_KEY = '@meal_plan'; 