import { UserData, ActivityLevel } from '@/hooks/useUserData';
import { UserProfile, HealthGoal } from '@/types';

const activityLevelMap: Record<ActivityLevel, UserProfile['activityLevel']> = {
    sedentary: 'sedentary',
    lightly_active: 'lightly_active',
    moderately_active: 'moderately_active',
    very_active: 'very_active',
    extra_active: 'extremely_active',
};

const healthGoalMap: Record<string, HealthGoal> = {
    'build muscle': 'build_muscle',
    'lose weight': 'lose_weight',
    'maintain weight': 'maintain_weight',
    'gain weight': 'maintain_weight', // Map gain weight to maintain_weight since it's not in HealthGoal type
    'improve health': 'improve_health',
};

export const convertUserDataToProfile = (userData: UserData): UserProfile => {
    // Convert height from ft/in to cm
    const heightInCm = (parseFloat(userData.heightFt) * 30.48) + (parseFloat(userData.heightIn) * 2.54);

    // Convert weight from lbs to kg
    const weightInKg = parseFloat(userData.weight) * 0.453592;

    // Get the first health goal and convert it to HealthGoal type
    const healthGoal = userData.healthGoals && userData.healthGoals.length > 0
        ? healthGoalMap[userData.healthGoals[0].toLowerCase()]
        : 'maintain_weight';

    return {
        name: 'User', // Default name since UserData doesn't have name
        age: userData.age,
        gender: userData.gender === 'male' ? 'male' : 'female', // Map to exact type, excluding 'other'
        height: Math.round(heightInCm),
        weight: Math.round(weightInKg),
        activityLevel: activityLevelMap[userData.activity],
        healthGoal,
        dietaryPreferences: userData.dietPreferences || [],
        allergies: [], // Default empty since UserData doesn't have allergies
        targetCalories: userData.dailyCalories || 2000, // Use existing or default
        targetProtein: userData.macros?.protein || 0,
        targetCarbs: userData.macros?.carbs || 0,
        targetFat: userData.macros?.fat || 0,
    };
}; 