import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  gender: 'male' | 'female';
  age: number;
  heightFt: string;
  heightIn: string;
  weight: string;
  activity: ActivityLevel;
  healthGoals: string[];
  dietPreferences: string[];
  dailyCalories?: number;
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  bmi?: number;
}

export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extra_active';

const USER_DATA_KEY = '@user_data';

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem(USER_DATA_KEY);
      setUserData(data ? JSON.parse(data) : null);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateBMI = (weight: string, heightFt: string, heightIn: string) => {
    // Convert weight to kg and height to meters
    const weightKg = parseFloat(weight) * 0.453592;
    const heightM = (parseFloat(heightFt) * 30.48 + parseFloat(heightIn) * 2.54) / 100;
    return Number((weightKg / (heightM * heightM)).toFixed(1));
  };

  const calculateMacros = (calories: number, healthGoals: string[]) => {
    // Default macro split if no specific goals: 40% protein, 35% carbs, 25% fat
    let proteinPercentage = 40;
    let carbsPercentage = 35;
    let fatPercentage = 25;

    // Adjust macros based on primary health goal (using first goal in array)
    if (healthGoals && healthGoals.length > 0) {
      switch (healthGoals[0].toLowerCase()) {
        case 'build muscle':
          // Higher protein for muscle building
          proteinPercentage = 45;
          carbsPercentage = 35;
          fatPercentage = 20;
          break;
        case 'lose weight':
          // Higher protein, lower carbs for weight loss
          proteinPercentage = 40;
          carbsPercentage = 25;
          fatPercentage = 35;
          break;
        case 'maintain weight':
          // Balanced split
          proteinPercentage = 35;
          carbsPercentage = 40;
          fatPercentage = 25;
          break;
        case 'gain weight':
          // Higher carbs and fats for caloric surplus
          proteinPercentage = 30;
          carbsPercentage = 45;
          fatPercentage = 25;
          break;
      }
    }

    return {
      protein: proteinPercentage,
      carbs: carbsPercentage,
      fat: fatPercentage,
    };
  };

  const saveUserData = async (newData: Partial<UserData>) => {
    try {
      const updatedData = userData ? { ...userData, ...newData } : newData as UserData;
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedData));
      setUserData(updatedData);
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  const calculateDailyCalories = (data: UserData) => {
    // Harris-Benedict equation for BMR
    const weight = parseFloat(data.weight) * 0.453592; // Convert lbs to kg
    const height = (parseFloat(data.heightFt) * 30.48) + (parseFloat(data.heightIn) * 2.54); // Convert ft/in to cm
    
    let bmr;
    if (data.gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * data.age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * data.age);
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };

    return Math.round(bmr * activityMultipliers[data.activity]);
  };

  const updateUserData = async (data: Partial<UserData>) => {
    const currentData = userData || {} as UserData;
    const updatedData = { ...currentData, ...data } as UserData;
    
    // If we have all the necessary fields, calculate derived values
    if (
      updatedData.gender &&
      updatedData.age &&
      updatedData.heightFt &&
      updatedData.heightIn &&
      updatedData.weight &&
      updatedData.activity
    ) {
      updatedData.dailyCalories = calculateDailyCalories(updatedData);
      updatedData.bmi = calculateBMI(updatedData.weight, updatedData.heightFt, updatedData.heightIn);
      updatedData.macros = calculateMacros(updatedData.dailyCalories, updatedData.healthGoals);
    }

    return saveUserData(updatedData);
  };

  return {
    userData,
    isLoading,
    updateUserData,
    loadUserData,
  };
} 