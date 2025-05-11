import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '@/constants/theme';

const days = ['Monday', 'Tuesday', 'Wednesday'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];
const mealData = {
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
      <ScrollView>
        {days.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{day}</Text>
            <Text style={styles.macroText}>{mealData.protein}</Text>
            <Text style={styles.macroText}>{mealData.carb}</Text>
            <Text style={styles.macroText}>{mealData.fat}</Text>
            <View style={styles.mealContainer}>
              {meals.map((meal) => (
                <View key={meal} style={styles.mealBox}>
                  <Text style={styles.mealTitle}>{meal}</Text>
                  <Text style={styles.mealText}>
                    {mealData.meals[meal as keyof typeof mealData.meals]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>WEEKLY MEAL PLAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>SHOPPING LIST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
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
  dayContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 16,
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
    color: theme.colors.text,
  },
  mealContainer: {
    marginTop: 8,
  },
  mealBox: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: 8,
    marginBottom: 8,
  },
  mealTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  mealText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
});
