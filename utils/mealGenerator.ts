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
  // Filter food database to only include items in user preferences
  const availableFoods = preferences
    .filter(pref => foodDatabase[pref])
    .map(pref => foodDatabase[pref]);
  
  // If no preferred foods found, use some defaults
  if (availableFoods.length === 0) {
    const defaultMeals = {
      breakfast: {
        name: 'Default Breakfast',
        items: ['Oatmeal with fruit'],
        calories: 300,
        protein: 10,
        carbs: 45,
        fat: 8,
      },
      lunch: {
        name: 'Default Lunch',
        items: ['Chicken salad'],
        calories: 450,
        protein: 35,
        carbs: 30,
        fat: 15,
      },
      dinner: {
        name: 'Default Dinner',
        items: ['Grilled fish with vegetables'],
        calories: 500,
        protein: 40,
        carbs: 35,
        fat: 18,
      },
    };
    
    return defaultMeals[mealType];
  }
  
  // Target macros for this meal
  const mealCalorieTargets = {
    breakfast: targetCalories * 0.25, // 25% of daily calories
    lunch: targetCalories * 0.35,     // 35% of daily calories
    dinner: targetCalories * 0.4,     // 40% of daily calories
  };
  
  const mealCalories = mealCalorieTargets[mealType];
  
  // Meal templates provide more structure and variety to generated meals
  const mealTemplates = {
    breakfast: [
      {
        name: 'Hearty Breakfast Bowl',
        components: ['protein', 'carb', 'veggies'],
        description: (items: string[]) => `${items[0]} with ${items[1]} and ${items[2]}`,
        protein: ['EGGS', 'GREEK YOGURT', 'TOFU'],
        carb: ['OATMEAL', 'SWEET POTATO', 'WHOLE GRAIN BREAD'],
        veggies: ['SPINACH', 'AVOCADO', 'TOMATO'],
      },
      {
        name: 'Morning Power Smoothie',
        components: ['protein', 'fruit', 'liquid'],
        description: (items: string[]) => `${items[1]} smoothie with ${items[0]} and ${items[2]}`,
        protein: ['GREEK YOGURT', 'PROTEIN SHAKE'],
        fruit: ['BANANA', 'BLUEBERRY', 'STRAWBERRY', 'MANGO'],
        liquid: ['ALMOND MILK', 'OAT MILK', 'MILK', 'COCONUT MILK'],
      },
      {
        name: 'Classic Breakfast',
        components: ['protein', 'carb', 'side'],
        description: (items: string[]) => `${items[0]} with ${items[1]} and ${items[2]}`,
        protein: ['EGGS', 'BACON', 'TURKEY BACON'],
        carb: ['WHOLE GRAIN BREAD', 'SWEET POTATO', 'OATMEAL'],
        side: ['AVOCADO', 'SPINACH', 'TOMATO', 'FRUIT'],
      },
    ],
    lunch: [
      {
        name: 'Power Bowl',
        components: ['protein', 'carb', 'veggies', 'topping'],
        description: (items: string[]) => `${items[0]} bowl with ${items[1]}, ${items[2]}, and ${items[3]}`,
        protein: ['CHICKEN BREAST', 'SALMON', 'TOFU', 'TEMPEH'],
        carb: ['BROWN RICE', 'QUINOA', 'SWEET POTATO'],
        veggies: ['BROCCOLI', 'KALE', 'SPINACH', 'MIXED GREENS'],
        topping: ['AVOCADO', 'ALMONDS', 'FETA CHEESE'],
      },
      {
        name: 'Hearty Salad',
        components: ['base', 'protein', 'veggies', 'topping'],
        description: (items: string[]) => `${items[1]} ${items[0]} with ${items[2]} and ${items[3]}`,
        base: ['MIXED GREENS', 'SPINACH', 'KALE', 'ARUGULA'],
        protein: ['CHICKEN BREAST', 'SALMON', 'TUNA', 'TOFU', 'EGGS'],
        veggies: ['BELL PEPPER', 'CUCUMBER', 'TOMATO', 'AVOCADO'],
        topping: ['ALMONDS', 'FETA CHEESE', 'WALNUTS'],
      },
      {
        name: 'Wrap Combo',
        components: ['protein', 'carb', 'veggies', 'sauce'],
        description: (items: string[]) => `${items[0]} ${items[1]} wrap with ${items[2]} and ${items[3]}`,
        protein: ['CHICKEN BREAST', 'GROUND TURKEY', 'TOFU', 'EGGS'],
        carb: ['TORTILLA', 'WHOLE GRAIN BREAD'],
        veggies: ['MIXED GREENS', 'BELL PEPPER', 'TOMATO', 'AVOCADO'],
        sauce: ['HUMMUS', 'GREEK YOGURT'],
      },
    ],
    dinner: [
      {
        name: 'Protein & Sides',
        components: ['protein', 'carb', 'veggies', 'seasoning'],
        description: (items: string[]) => `${items[3]} ${items[0]} with ${items[1]} and ${items[2]}`,
        protein: ['SALMON', 'CHICKEN BREAST', 'STEAK', 'TOFU', 'TILAPIA'],
        carb: ['BROWN RICE', 'QUINOA', 'SWEET POTATO', 'POTATO'],
        veggies: ['BROCCOLI', 'ASPARAGUS', 'GREEN BEANS', 'CAULIFLOWER'],
        seasoning: ['Roasted', 'Grilled', 'Baked', 'Sautéed'],
      },
      {
        name: 'Hearty Bowl',
        components: ['protein', 'carb', 'veggies', 'sauce'],
        description: (items: string[]) => `${items[0]} ${items[1]} bowl with ${items[2]} and ${items[3]}`,
        protein: ['GROUND TURKEY', 'GROUND BEEF', 'CHICKEN BREAST', 'TOFU'],
        carb: ['BROWN RICE', 'QUINOA', 'SWEET POTATO'],
        veggies: ['BROCCOLI', 'BELL PEPPER', 'SPINACH', 'AVOCADO'],
        sauce: ['spicy sauce', 'garlic sauce', 'creamy sauce'],
      },
      {
        name: 'Pasta Dish',
        components: ['protein', 'carb', 'veggies', 'topping'],
        description: (items: string[]) => `${items[0]} ${items[1]} with ${items[2]} and ${items[3]}`,
        protein: ['CHICKEN BREAST', 'GROUND TURKEY', 'SHRIMP', 'TOFU'],
        carb: ['PASTA', 'WHOLE WHEAT PASTA'],
        veggies: ['BROCCOLI', 'SPINACH', 'TOMATO', 'BELL PEPPER'],
        topping: ['PARMESAN', 'MOZZARELLA', 'herb garnish'],
      },
    ],
  };
  
  // Select a meal template
  const templates = mealTemplates[mealType];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Build the meal
  const selectedItems: MealItem[] = [];
  const itemNames: string[] = [];
  let currentCalories = 0;
  let currentProtein = 0;
  let currentCarbs = 0;
  let currentFat = 0;
  
  // Select an item for each component in the template
  for (const component of template.components) {
    // Get component options
    const componentOptions = template[component as keyof typeof template] as string[];
    if (!componentOptions || !Array.isArray(componentOptions)) continue;
    
    // Try to find a match in preferences
    const matchingPrefs = preferences.filter(pref => 
      componentOptions.includes(pref) && foodDatabase[pref]
    );
    
    if (matchingPrefs.length > 0) {
      // Randomly select from matching preferences
      const selectedItem = matchingPrefs[Math.floor(Math.random() * matchingPrefs.length)];
      const foodItem = foodDatabase[selectedItem];
      
      if (foodItem) {
        selectedItems.push(foodItem);
        itemNames.push(foodItem.name);
        currentCalories += foodItem.calories;
        currentProtein += foodItem.protein;
        currentCarbs += foodItem.carbs;
        currentFat += foodItem.fat;
      } else if (typeof componentOptions[0] === 'string') {
        // Use a generic name if we don't have nutrition data
        itemNames.push(componentOptions[0]);
      }
    } else if (componentOptions.length > 0 && typeof componentOptions[0] === 'string') {
      // If no matches in preferences, just use a name
      itemNames.push(componentOptions[0]);
    }
  }
  
  // If we couldn't build a proper meal, fall back to simpler approach
  if (selectedItems.length === 0) {
    return simpleRandomMeal(availableFoods, mealType, targetCalories);
  }
  
  // Generate a meal description
  let mealName = template.name;
  let description = '';
  
  try {
    if (typeof template.description === 'function' && itemNames.length >= template.components.length) {
      description = template.description(itemNames);
    } else {
      description = itemNames.join(', ');
    }
  } catch (e) {
    // Fallback if description generation fails
    description = itemNames.join(', ');
  }
  
  return {
    name: mealName,
    items: description ? [description] : itemNames,
    calories: Math.round(currentCalories),
    protein: Math.round(currentProtein),
    carbs: Math.round(currentCarbs),
    fat: Math.round(currentFat),
  };
}

/**
 * Simple random meal generation approach as a fallback
 */
function simpleRandomMeal(
  availableFoods: MealItem[],
  mealType: 'breakfast' | 'lunch' | 'dinner',
  targetCalories: number
): Meal {
  // Different meal types have different compositions
  const mealTypeConfigs = {
    breakfast: {
      caloriePercent: 0.25, // 25% of daily calories
      namePrefixes: ['Hearty', 'Morning', 'Sunrise'],
      proteinItems: availableFoods.filter(f => f.category === 'Protein' && ['EGGS', 'GREEK YOGURT', 'TOFU'].includes(f.name.toUpperCase())),
      carbItems: availableFoods.filter(f => f.category === 'Carb' && ['OATMEAL', 'BREAD', 'BAGEL'].includes(f.name.toUpperCase())),
    },
    lunch: {
      caloriePercent: 0.35,
      namePrefixes: ['Fresh', 'Power', 'Midday'],
      proteinItems: availableFoods.filter(f => f.category === 'Protein'),
      carbItems: availableFoods.filter(f => f.category === 'Carb'),
    },
    dinner: {
      caloriePercent: 0.4,
      namePrefixes: ['Savory', 'Evening', 'Gourmet'],
      proteinItems: availableFoods.filter(f => f.category === 'Protein'),
      carbItems: availableFoods.filter(f => f.category === 'Carb'),
    },
  };
  
  const config = mealTypeConfigs[mealType];
  const mealCalories = targetCalories * config.caloriePercent;
  
  // Simple algorithm to select foods
  const selectedItems: MealItem[] = [];
  let currentCalories = 0;
  let currentProtein = 0;
  let currentCarbs = 0;
  let currentFat = 0;
  
  // Add a protein
  const proteinOptions = config.proteinItems.length > 0 ? config.proteinItems : availableFoods.filter(f => f.category === 'Protein');
  if (proteinOptions.length > 0) {
    const protein = proteinOptions[Math.floor(Math.random() * proteinOptions.length)];
    selectedItems.push(protein);
    currentCalories += protein.calories;
    currentProtein += protein.protein;
    currentCarbs += protein.carbs;
    currentFat += protein.fat;
  }
  
  // Add a carb
  const carbOptions = config.carbItems.length > 0 ? config.carbItems : availableFoods.filter(f => f.category === 'Carb');
  if (carbOptions.length > 0) {
    const carb = carbOptions[Math.floor(Math.random() * carbOptions.length)];
    selectedItems.push(carb);
    currentCalories += carb.calories;
    currentProtein += carb.protein;
    currentCarbs += carb.carbs;
    currentFat += carb.fat;
  }
  
  // Add a vegetable
  const veggieOptions = availableFoods.filter(f => f.category === 'Veggies');
  if (veggieOptions.length > 0) {
    const veggie = veggieOptions[Math.floor(Math.random() * veggieOptions.length)];
    selectedItems.push(veggie);
    currentCalories += veggie.calories;
    currentProtein += veggie.protein;
    currentCarbs += veggie.carbs;
    currentFat += veggie.fat;
  }
  
  // Generate a meal name
  const prefix = config.namePrefixes[Math.floor(Math.random() * config.namePrefixes.length)];
  const mainItem = selectedItems.find(item => item.category === 'Protein')?.name || 'Meal';
  const mealName = `${prefix} ${mainItem}`;
  
  return {
    name: mealName,
    items: selectedItems.map(item => item.name),
    calories: Math.round(currentCalories),
    protein: Math.round(currentProtein),
    carbs: Math.round(currentCarbs),
    fat: Math.round(currentFat),
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
  const breakfast = generateMeal(
    preferences,
    targetCalories,
    'breakfast',
    proteinRatio,
    carbRatio,
    fatRatio
  );
  
  const lunch = generateMeal(
    preferences,
    targetCalories,
    'lunch',
    proteinRatio,
    carbRatio,
    fatRatio
  );
  
  const dinner = generateMeal(
    preferences,
    targetCalories,
    'dinner',
    proteinRatio,
    carbRatio,
    fatRatio
  );
  
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