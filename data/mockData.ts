import { Meal, WeeklyMealPlan, UserProfile, DailyMealPlan, ShoppingListItem } from '@/types';

export const mockMeals: Meal[] = [
  {
    id: 'm1',
    name: 'Greek Yogurt Parfait',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    calories: 320,
    protein: 20,
    carbs: 40,
    fat: 10,
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    ingredients: [
      { name: 'Greek yogurt', quantity: 200, unit: 'g' },
      { name: 'Honey', quantity: 1, unit: 'tbsp' },
      { name: 'Granola', quantity: 3, unit: 'tbsp' },
      { name: 'Mixed berries', quantity: 100, unit: 'g' },
    ],
    instructions: [
      'Layer Greek yogurt in a bowl or jar',
      'Drizzle honey on top',
      'Add granola',
      'Top with mixed berries',
    ],
    dietaryTags: ['vegetarian', 'gluten-free', 'high-protein'],
  },
  {
    id: 'm2',
    name: 'Chicken Quinoa Bowl',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
    calories: 450,
    protein: 35,
    carbs: 45,
    fat: 15,
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      { name: 'Chicken breast', quantity: 600, unit: 'g' },
      { name: 'Quinoa', quantity: 200, unit: 'g' },
      { name: 'Broccoli', quantity: 300, unit: 'g' },
      { name: 'Bell peppers', quantity: 2, unit: 'medium' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Lemon juice', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.5, unit: 'tsp' },
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Season chicken breasts with salt and pepper',
      'Grill chicken until fully cooked and slice into pieces',
      'Steam broccoli for 5 minutes',
      'Slice bell peppers',
      'Combine all ingredients in a bowl',
      'Drizzle with olive oil and lemon juice',
    ],
    dietaryTags: ['high-protein', 'dairy-free', 'gluten-free'],
  },
  {
    id: 'm3',
    name: 'Lentil Soup',
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    calories: 350,
    protein: 20,
    carbs: 60,
    fat: 5,
    prepTime: 15,
    cookTime: 40,
    servings: 6,
    ingredients: [
      { name: 'Lentils', quantity: 300, unit: 'g' },
      { name: 'Onion', quantity: 1, unit: 'large' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Celery', quantity: 2, unit: 'stalks' },
      { name: 'Garlic', quantity: 3, unit: 'cloves' },
      { name: 'Vegetable broth', quantity: 1.5, unit: 'l' },
      { name: 'Cumin', quantity: 1, unit: 'tsp' },
      { name: 'Bay leaf', quantity: 2, unit: 'leaves' },
      { name: 'Olive oil', quantity: 1, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.5, unit: 'tsp' },
    ],
    instructions: [
      'Rinse lentils thoroughly',
      'Chop onion, carrots, celery, and mince garlic',
      'Heat olive oil in a large pot over medium heat',
      'Add onions, carrots, and celery; cook for 5 minutes',
      'Add garlic and cook for another minute',
      'Add lentils, vegetable broth, cumin, bay leaves, salt, and pepper',
      'Bring to a boil, then reduce heat and simmer for 35-40 minutes',
      'Remove bay leaves before serving',
    ],
    dietaryTags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'low-fat'],
  },
  {
    id: 'm4',
    name: 'Salmon with Roasted Vegetables',
    image: 'https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg',
    calories: 490,
    protein: 40,
    carbs: 25,
    fat: 25,
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    ingredients: [
      { name: 'Salmon fillet', quantity: 300, unit: 'g' },
      { name: 'Zucchini', quantity: 1, unit: 'medium' },
      { name: 'Cherry tomatoes', quantity: 200, unit: 'g' },
      { name: 'Bell pepper', quantity: 1, unit: 'medium' },
      { name: 'Red onion', quantity: 1, unit: 'small' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Lemon', quantity: 1, unit: 'medium' },
      { name: 'Dill', quantity: 1, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.5, unit: 'tsp' },
    ],
    instructions: [
      'Preheat oven to 200°C (400°F)',
      'Chop vegetables into bite-sized pieces and place on a baking sheet',
      'Drizzle vegetables with 1 tbsp olive oil, salt, and pepper',
      'Roast vegetables for 15 minutes',
      'Season salmon with salt, pepper, and dill',
      'Place salmon on top of vegetables and drizzle with remaining olive oil',
      'Return to oven and bake for an additional 10-12 minutes',
      'Squeeze lemon juice over salmon and vegetables before serving',
    ],
    dietaryTags: ['pescatarian', 'dairy-free', 'gluten-free', 'high-protein'],
  },
  {
    id: 'm5',
    name: 'Avocado Toast',
    image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg',
    calories: 280,
    protein: 10,
    carbs: 30,
    fat: 15,
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    ingredients: [
      { name: 'Whole grain bread', quantity: 2, unit: 'slices' },
      { name: 'Avocado', quantity: 1, unit: 'medium' },
      { name: 'Cherry tomatoes', quantity: 5, unit: '' },
      { name: 'Red pepper flakes', quantity: 0.25, unit: 'tsp' },
      { name: 'Salt', quantity: 0.25, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.25, unit: 'tsp' },
      { name: 'Lime', quantity: 0.5, unit: '' },
    ],
    instructions: [
      'Toast bread slices',
      'Mash avocado in a bowl with lime juice, salt, and pepper',
      'Spread avocado mash on toasted bread',
      'Slice cherry tomatoes in half and place on top',
      'Sprinkle with red pepper flakes',
    ],
    dietaryTags: ['vegetarian', 'vegan', 'dairy-free'],
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Alex Smith',
  age: 30,
  gender: 'female',
  height: 165,
  weight: 65,
  goalWeight: 60,
  activityLevel: 'moderately_active',
  healthGoal: 'lose_weight',
  dietaryPreferences: ['balanced', 'high-protein'],
  allergies: ['peanuts'],
  targetCalories: 1800,
  targetProtein: 135,
  targetCarbs: 157,
  targetFat: 60,
};

const createMockDailyMealPlan = (date: Date, breakfast: Meal, lunch: Meal, dinner: Meal, snacks: Meal[]): DailyMealPlan => {
  const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snacks.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = breakfast.protein + lunch.protein + dinner.protein + snacks.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + snacks.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = breakfast.fat + lunch.fat + dinner.fat + snacks.reduce((sum, meal) => sum + meal.fat, 0);

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

const today = new Date();
const createDateOffset = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
};

const mockDailyMealPlans: DailyMealPlan[] = [
  createMockDailyMealPlan(createDateOffset(0), mockMeals[0], mockMeals[1], mockMeals[3], [mockMeals[4]]),
  createMockDailyMealPlan(createDateOffset(1), mockMeals[0], mockMeals[2], mockMeals[1], [mockMeals[4]]),
  createMockDailyMealPlan(createDateOffset(2), mockMeals[4], mockMeals[3], mockMeals[2], [mockMeals[0]]),
  createMockDailyMealPlan(createDateOffset(3), mockMeals[0], mockMeals[1], mockMeals[3], [mockMeals[4]]),
  createMockDailyMealPlan(createDateOffset(4), mockMeals[4], mockMeals[2], mockMeals[1], [mockMeals[0]]),
  createMockDailyMealPlan(createDateOffset(5), mockMeals[0], mockMeals[3], mockMeals[2], [mockMeals[4]]),
  createMockDailyMealPlan(createDateOffset(6), mockMeals[4], mockMeals[1], mockMeals[3], [mockMeals[0]]),
];

// Create a unified shopping list from the meal plans
const createShoppingList = (): ShoppingListItem[] => {
  const ingredientMap = new Map<string, { quantity: number; unit: string; category: ShoppingListItem['category'] }>();
  
  mockDailyMealPlans.forEach(day => {
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

export const mockWeeklyMealPlan: WeeklyMealPlan = {
  id: 'mp1',
  startDate: createDateOffset(0),
  endDate: createDateOffset(6),
  days: mockDailyMealPlans,
  user: mockUserProfile,
  shoppingList: createShoppingList(),
};