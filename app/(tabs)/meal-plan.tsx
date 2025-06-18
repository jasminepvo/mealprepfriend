import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from '@/hooks/useUserData';
import {
  generateWeeklyMealPlan,
  MEAL_PLAN_STORAGE_KEY,
  WeeklyMealPlan as WeeklyMealPlanType,
  DailyMeals,
} from '@/utils/mealGenerator';
import { calculateTargetCalories } from '@/utils/mealPlanUtils';
import { convertUserDataToProfile } from '@/utils/userDataConverter';

// Map day keys to readable day names
const dayMappings: Record<keyof WeeklyMealPlanType, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export default function WeeklyMealPlan() {
  const { userData } = useUserData();
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlanType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentView, setCurrentView] = useState<'plan' | 'prep'>('plan');

  // Load saved meal plan from storage
  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    try {
      const savedPlan = await AsyncStorage.getItem(MEAL_PLAN_STORAGE_KEY);
      if (savedPlan) {
        setMealPlan(JSON.parse(savedPlan));
      }
    } catch (error) {
      console.error('Error loading meal plan:', error);
    }
  };

  const handleGenerateMealPlan = async () => {
    if (!userData || !userData.dietPreferences || !userData.macros) {
      alert('Please complete your profile with diet preferences first');
      return;
    }

    setIsGenerating(true);

    try {
      // Convert UserData to UserProfile
      const userProfile = convertUserDataToProfile(userData);

      // Calculate target calories based on user profile
      const targetCalories = calculateTargetCalories(userProfile);

      // Get macro ratios from user data
      const { protein, carbs, fat } = userData.macros;

      // Generate meal plan using user preferences and macros
      const newMealPlan = generateWeeklyMealPlan(
        userData.dietPreferences,
        targetCalories,
        protein,
        carbs,
        fat
      );

      setMealPlan(newMealPlan);
      await AsyncStorage.setItem(
        MEAL_PLAN_STORAGE_KEY,
        JSON.stringify(newMealPlan)
      );
    } catch (error) {
      console.error('Error generating meal plan:', error);
      alert('Failed to generate meal plan');
    } finally {
      setIsGenerating(false);
    }
  };

  // Format macro amounts as readable text
  const formatMacros = (dailyMeals: DailyMeals) => {
    return {
      protein: `${dailyMeals.totalProtein}g protein`,
      carbs: `${dailyMeals.totalCarbs}g carbs`,
      fat: `${dailyMeals.totalFat}g fat`,
    };
  };

  if (isGenerating) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Generating your meal plan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEEKLY MEAL PLAN</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentView === 'plan' && styles.navButtonActive,
          ]}
          onPress={() => setCurrentView('plan')}
        >
          <Text
            style={[
              styles.navButtonText,
              currentView === 'plan' && styles.navButtonTextActive,
            ]}
          >
            PLAN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentView === 'prep' && styles.navButtonActive,
          ]}
          onPress={() => setCurrentView('prep')}
        >
          <Text
            style={[
              styles.navButtonText,
              currentView === 'prep' && styles.navButtonTextActive,
            ]}
          >
            PREP
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.generateButton}
        onPress={handleGenerateMealPlan}
      >
        <Text style={styles.generateButtonText}>GENERATE NEW MEAL PLAN</Text>
      </TouchableOpacity>

      {mealPlan ? (
        <ScrollView style={styles.mealPlanScroll}>
          {Object.entries(mealPlan).map(([day, dailyMeals]) => {
            const dayName = dayMappings[day as keyof WeeklyMealPlanType];
            const macros = formatMacros(dailyMeals as DailyMeals);
            const meals = dailyMeals as DailyMeals;

            return (
              <View key={day} style={styles.dayRow}>
                <View style={styles.dayDetails}>
                  <Text style={styles.dayTitle}>{dayName}</Text>
                  <Text style={styles.macroText}>{macros.protein}</Text>
                  <Text style={styles.macroText}>{macros.carbs}</Text>
                  <Text style={styles.macroText}>{macros.fat}</Text>
                  <Text style={styles.totalCalories}>
                    {meals.totalCalories} cal
                  </Text>
                </View>
                <View style={styles.mealContainer}>
                  <View style={styles.mealBox}>
                    <Text style={styles.mealTitle}>Breakfast</Text>
                    <View style={styles.mealDetails}>
                      <Text style={styles.mealName}>
                        {meals.breakfast.name}
                      </Text>
                      <Text style={styles.mealText}>
                        {meals.breakfast.items.join(', ')}
                      </Text>
                      <Text style={styles.mealCalories}>
                        {meals.breakfast.calories} cal
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mealBox}>
                    <Text style={styles.mealTitle}>Lunch</Text>
                    <View style={styles.mealDetails}>
                      <Text style={styles.mealName}>{meals.lunch.name}</Text>
                      <Text style={styles.mealText}>
                        {meals.lunch.items.join(', ')}
                      </Text>
                      <Text style={styles.mealCalories}>
                        {meals.lunch.calories} cal
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mealBox}>
                    <Text style={styles.mealTitle}>Dinner</Text>
                    <View style={styles.mealDetails}>
                      <Text style={styles.mealName}>{meals.dinner.name}</Text>
                      <Text style={styles.mealText}>
                        {meals.dinner.items.join(', ')}
                      </Text>
                      <Text style={styles.mealCalories}>
                        {meals.dinner.calories} cal
                      </Text>
                    </View>
                  </View>

                  {/* Add snacks section */}
                  {meals.breakfast.items.some((item) =>
                    item.includes('(snack)')
                  ) && (
                    <View style={styles.mealBox}>
                      <Text style={styles.mealTitle}>Snacks</Text>
                      <View style={styles.mealDetails}>
                        <Text style={styles.mealText}>
                          {meals.breakfast.items
                            .filter((item) => item.includes('(snack)'))
                            .map((item) => item.replace(' (snack)', ''))
                            .join(', ')}
                        </Text>
                        <Text style={styles.mealCalories}>
                          {meals.breakfast.items.filter((item) =>
                            item.includes('(snack)')
                          ).length > 0
                            ? Math.round(meals.breakfast.calories * 0.1)
                            : 0}{' '}
                          cal
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No meal plan generated yet. Press the button above to create your
            personalized meal plan.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  navButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  navButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  navButtonTextActive: {
    color: theme.colors.card,
    fontFamily: 'Inter-Bold',
  },
  generateButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  generateButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.card,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
  },
  mealPlanScroll: {
    flex: 1,
  },
  dayRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 16,
    marginBottom: 12,
  },
  dayDetails: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingRight: 12,
  },
  dayTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  macroText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.secondary,
    marginBottom: 2,
  },
  totalCalories: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: 4,
  },
  mealContainer: {
    flex: 1,
    gap: 12,
  },
  mealBox: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: 8,
    marginBottom: 8,
  },
  mealTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
  },
  mealName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 2,
  },
  mealText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.text,
  },
  mealCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.secondary,
    marginTop: 2,
  },
  mealDetails: {
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    opacity: 0.7,
  },
});
