import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeeklyMealPlan } from '@/utils/mealGenerator';
import { MEAL_PLAN_STORAGE_KEY } from '@/utils/mealGenerator';

export const saveMealPlan = async (plan: WeeklyMealPlan) => {
    try {
        await AsyncStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(plan));
    } catch (error) {
        console.error('Error saving meal plan:', error);
    }
}; 