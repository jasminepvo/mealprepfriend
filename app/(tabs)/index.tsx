import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '@/constants/theme';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

interface MealData {
  protein: string;
  carb: string;
  fat: string;
  meals: {
    [key: string]: string;
  };
}

// Example meal data for one day
const exampleMealData: MealData = {
  protein: '120g protein',
  carb: '130g carb',
  fat: '25g fat',
  meals: {
    Breakfast: 'Boiled eggs and yogurt',
    Lunch: 'Grilled chicken salad',
    Dinner: 'Ground turkey rice bowl',
  },
};

export default function WeeklyMealPlan() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEEKLY MEAL PLAN</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>GENERATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>PREP</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mealPlanScroll}>
        {days.map((day) => (
          <View key={day} style={styles.dayRow}>
            <View style={styles.dayDetails}>
              <Text style={styles.dayTitle}>{day}</Text>
              <Text style={styles.macroText}>{exampleMealData.protein}</Text>
              <Text style={styles.macroText}>{exampleMealData.carb}</Text>
              <Text style={styles.macroText}>{exampleMealData.fat}</Text>
            </View>
            <View style={styles.mealContainer}>
              {meals.map((meal) => (
                <View key={meal} style={styles.mealBox}>
                  <Text style={styles.mealTitle}>{meal}</Text>
                  <Text style={styles.mealText}>
                    {exampleMealData.meals[meal]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
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
  navButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
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
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  mealContainer: {
    flex: 1,
    gap: 8,
  },
  mealBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  mealTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.text,
  },
  mealText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.secondary,
  },
});
