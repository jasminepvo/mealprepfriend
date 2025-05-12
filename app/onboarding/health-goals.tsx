import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useUserData } from '@/hooks/useUserData';

type HealthGoal =
  | 'build muscle'
  | 'lose weight'
  | 'maintain weight'
  | 'gain weight';

interface GoalConfig {
  title: string;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  description: string;
  calorieAdjustment: number; // Percentage modifier for daily calories
  calorieDescription: string;
}

const HEALTH_GOALS: Record<HealthGoal, GoalConfig> = {
  'build muscle': {
    title: 'Build Muscle',
    macros: { protein: 45, carbs: 35, fat: 20 },
    description: 'Higher protein for muscle growth',
    calorieAdjustment: 1.15, // 15% caloric surplus
    calorieDescription: 'Caloric surplus for muscle gain',
  },
  'lose weight': {
    title: 'Lose Weight',
    macros: { protein: 40, carbs: 25, fat: 35 },
    description: 'Higher protein, lower carbs',
    calorieAdjustment: 0.8, // 20% caloric deficit
    calorieDescription: 'Caloric deficit for fat loss',
  },
  'maintain weight': {
    title: 'Maintain Weight',
    macros: { protein: 35, carbs: 40, fat: 25 },
    description: 'Balanced nutrition',
    calorieAdjustment: 1.0, // Maintenance calories
    calorieDescription: 'Maintenance calories',
  },
  'gain weight': {
    title: 'Gain Weight',
    macros: { protein: 30, carbs: 45, fat: 25 },
    description: 'Higher carbs and fats',
    calorieAdjustment: 1.2, // 20% caloric surplus
    calorieDescription: 'Caloric surplus for weight gain',
  },
};

export default function HealthGoals() {
  const router = useRouter();
  const { userData, updateUserData } = useUserData();
  const [selectedGoal, setSelectedGoal] =
    useState<HealthGoal>('maintain weight');

  const handleNext = async () => {
    await updateUserData({
      healthGoals: [selectedGoal],
      dailyCalories: getAdjustedCalories(),
    });
    router.push('/onboarding/diet-preferences');
  };

  const handleBack = () => {
    router.back();
  };

  const currentMacros = HEALTH_GOALS[selectedGoal].macros;

  const getAdjustedCalories = () => {
    if (!userData?.dailyCalories) return undefined;
    const baseCalories = userData.dailyCalories;
    const adjustment = HEALTH_GOALS[selectedGoal].calorieAdjustment;
    return Math.round(baseCalories * adjustment);
  };

  const adjustedCalories = getAdjustedCalories();

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>CHOOSE YOUR GOAL</Text>

        <View style={styles.caloriesContainer}>
          <View style={styles.caloriesBox}>
            <Text style={styles.caloriesLabel}>BMI</Text>
            <Text style={styles.caloriesValue}>
              {userData?.bmi?.toFixed(1) || '--'}
            </Text>
          </View>
          <View style={styles.caloriesBox}>
            <Text style={styles.caloriesLabel}>TDEE</Text>
            <Text style={styles.caloriesValue}>
              {userData?.dailyCalories || '--'}
            </Text>
          </View>
          <View style={styles.caloriesBoxLarge}>
            <Text style={styles.caloriesLabel}>Target Daily Calories</Text>
            <Text style={styles.caloriesValueLarge}>
              {adjustedCalories ? `${adjustedCalories} cal` : '--'}
            </Text>
            <Text style={styles.caloriesDescription}>
              {userData?.dailyCalories
                ? HEALTH_GOALS[selectedGoal].calorieDescription
                : ''}
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Select your primary goal</Text>

        {(Object.entries(HEALTH_GOALS) as [HealthGoal, GoalConfig][]).map(
          ([goal, config]) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalButton,
                selectedGoal === goal && styles.goalButtonActive,
              ]}
              onPress={() => setSelectedGoal(goal)}
            >
              <View style={styles.goalContent}>
                <Text
                  style={[
                    styles.goalText,
                    selectedGoal === goal && styles.goalTextActive,
                  ]}
                >
                  {config.title}
                </Text>
                <Text style={styles.goalDescription}>{config.description}</Text>
              </View>
            </TouchableOpacity>
          )
        )}

        <View style={styles.macroContainer}>
          <View style={styles.macroBox}>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroValue}>{currentMacros.protein}%</Text>
          </View>
          <View style={styles.macroBox}>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={styles.macroValue}>{currentMacros.carbs}%</Text>
          </View>
          <View style={styles.macroBox}>
            <Text style={styles.macroLabel}>Fat</Text>
            <Text style={styles.macroValue}>{currentMacros.fat}%</Text>
          </View>
        </View>

        {/* Add padding at the bottom to ensure content isn't covered by buttons */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={handleBack}
        >
          <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100, // Add extra padding at bottom for the navigation buttons
  },
  title: {
    ...theme.typography.heading2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitle: {
    ...theme.typography.body1,
    color: theme.colors.text,
    marginBottom: 16,
  },
  caloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  caloriesBox: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  caloriesBoxLarge: {
    flex: 1.5,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  caloriesLabel: {
    ...theme.typography.caption,
    color: theme.colors.text,
    opacity: 0.7,
  },
  caloriesValue: {
    ...theme.typography.heading3,
    color: theme.colors.text,
  },
  caloriesValueLarge: {
    ...theme.typography.heading1,
    color: theme.colors.primary,
  },
  caloriesDescription: {
    ...theme.typography.caption,
    color: theme.colors.text,
    opacity: 0.6,
    marginTop: 4,
  },
  goalButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadow.sm,
  },
  goalButtonActive: {
    backgroundColor: theme.colors.primary + '15',
    borderColor: theme.colors.primary,
  },
  goalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    ...theme.typography.body1,
    color: theme.colors.text,
    fontWeight: '600',
  },
  goalTextActive: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Bold',
  },
  goalDescription: {
    ...theme.typography.caption,
    color: theme.colors.text,
    opacity: 0.7,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24,
  },
  macroBox: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  macroLabel: {
    ...theme.typography.caption,
    color: theme.colors.text,
    opacity: 0.7,
  },
  macroValue: {
    ...theme.typography.heading3,
    color: theme.colors.primary,
  },
  bottomPadding: {
    height: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
  },
  backButton: {
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  buttonText: {
    color: theme.colors.card,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  backButtonText: {
    color: theme.colors.text,
  },
});
