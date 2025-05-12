import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import { theme } from '@/constants/theme';
import { useUserData, ActivityLevel } from '@/hooks/useUserData';
import { useRouter } from 'expo-router';
import dietCategories from '@/data/dietCategories';

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary',
  lightly_active: 'Lightly Active',
  moderately_active: 'Moderately Active',
  very_active: 'Very Active',
  extra_active: 'Extra Active',
};

interface DietPreferencesDisplayProps {
  preferences: string[];
}

const DietPreferencesDisplay = ({
  preferences,
}: DietPreferencesDisplayProps) => {
  // Create a map of selected items
  const selectedItems = preferences.reduce<Record<string, boolean>>(
    (acc, pref) => {
      acc[pref] = true;
      return acc;
    },
    {}
  );

  // Find categories that have at least one selected item
  const categoriesWithSelections = Object.entries(dietCategories).reduce<
    Record<string, string[]>
  >((acc, [category, items]) => {
    const selectedInCategory = items.filter((item) => selectedItems[item]);
    if (selectedInCategory.length > 0) {
      acc[category] = selectedInCategory;
    }
    return acc;
  }, {});

  return (
    <View style={styles.preferencesContainer}>
      {Object.entries(categoriesWithSelections).map(([category, items]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.itemsContainer}>
            {items.map((item) => (
              <View
                key={item}
                style={[styles.itemButton, styles.itemButtonActive]}
              >
                <Text style={[styles.itemText, styles.itemTextActive]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

interface MacroBreakdownProps {
  macros:
    | {
        protein: number;
        carbs: number;
        fat: number;
      }
    | undefined;
  healthGoals: string[] | undefined;
}

interface MacroItemProps {
  label: string;
  percentage: number;
  color: string;
}

const MacroItem = ({ label, percentage, color }: MacroItemProps) => (
  <View
    style={[styles.macroBox, { borderLeftColor: color, borderLeftWidth: 4 }]}
  >
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={styles.macroValue}>{percentage}%</Text>
  </View>
);

const MacroBreakdown = ({ macros, healthGoals }: MacroBreakdownProps) => {
  const getMacroExplanation = () => {
    if (!healthGoals || healthGoals.length === 0) return '';

    const primaryGoal = healthGoals[0].toLowerCase();
    switch (primaryGoal) {
      case 'build muscle':
        return 'Higher protein ratio to support muscle growth and recovery';
      case 'lose weight':
        return 'Higher protein and fat with reduced carbs to promote satiety and fat loss';
      case 'maintain weight':
        return 'Balanced macro split for overall health maintenance';
      case 'improve fitness':
        return 'Higher carbs for sustained energy during workouts';
      case 'gain weight':
        return 'Higher carbs and fats to support caloric surplus';
      default:
        return '';
    }
  };

  if (!macros) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Macro Breakdown</Text>
      <View style={styles.macroContainer}>
        <MacroItem
          label="Protein"
          percentage={macros.protein}
          color="#FF6B6B"
        />
        <MacroItem label="Carbs" percentage={macros.carbs} color="#4ECDC4" />
        <MacroItem label="Fat" percentage={macros.fat} color="#45B7D1" />
      </View>
      {healthGoals && healthGoals.length > 0 && (
        <Text style={styles.macroExplanation}>{getMacroExplanation()}</Text>
      )}
    </View>
  );
};

const getAdjustedCalories = (baseCalories: number, healthGoal: string) => {
  const adjustments: Record<string, number> = {
    'build muscle': 1.15, // +15%
    'lose weight': 0.8, // -20%
    'maintain weight': 1.0, // no change
    'gain weight': 1.2, // +20%
  };

  const adjustment = adjustments[healthGoal.toLowerCase()] || 1.0;
  return Math.round(baseCalories * adjustment);
};

const getCalorieDescription = (healthGoal: string) => {
  const descriptions: Record<string, string> = {
    'build muscle': 'Surplus for muscle gain',
    'lose weight': 'Deficit for fat loss',
    'maintain weight': 'Maintenance calories',
    'gain weight': 'Surplus for weight gain',
  };

  return descriptions[healthGoal.toLowerCase()] || 'Daily target';
};

export default function Profile() {
  const { userData, isLoading } = useUserData();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Not Found</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/onboarding/user-details')}
        >
          <Text style={styles.buttonText}>Complete Onboarding</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleEdit = () => {
    router.push('/onboarding/user-details');
  };

  const targetCalories =
    userData?.dailyCalories && userData?.healthGoals?.[0]
      ? getAdjustedCalories(userData.dailyCalories, userData.healthGoals[0])
      : undefined;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MY PROFILE</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.caloriesContainer}>
        <View style={styles.caloriesBox}>
          <Text style={styles.caloriesLabel}>BMI</Text>
          <Text style={styles.caloriesValue}>{userData.bmi?.toFixed(1)}</Text>
        </View>
        <View style={styles.caloriesBox}>
          <Text style={styles.caloriesLabel}>TDEE</Text>
          <Text style={styles.caloriesValue}>{userData.dailyCalories}</Text>
          <Text style={styles.caloriesCaption}>Base calories</Text>
        </View>
        <View style={styles.caloriesBoxLarge}>
          <Text style={styles.caloriesLabel}>Target Calories</Text>
          <Text style={styles.caloriesValueLarge}>{targetCalories} cal</Text>
          <Text style={styles.caloriesCaption}>
            {userData.healthGoals?.[0]
              ? getCalorieDescription(userData.healthGoals[0])
              : ''}
          </Text>
        </View>
      </View>

      <MacroBreakdown
        macros={userData.macros}
        healthGoals={userData.healthGoals}
      />

      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>AGE</Text>
          <Text style={styles.detailsValue}>{userData.age}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>GENDER</Text>
          <Text style={styles.detailsValue}>
            {userData.gender.toUpperCase()}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>HEIGHT</Text>
          <Text style={styles.detailsValue}>
            {userData.heightFt}'{userData.heightIn}"
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>WEIGHT</Text>
          <Text style={styles.detailsValue}>{userData.weight} lbs</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>ACTIVITY</Text>
          <Text style={styles.detailsValue}>
            {activityLabels[userData.activity]}
          </Text>
        </View>
        {userData.healthGoals && userData.healthGoals.length > 0 && (
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>HEALTH GOALS</Text>
            <Text style={styles.detailsValue}>
              {userData.healthGoals.join(', ')}
            </Text>
          </View>
        )}
      </View>

      {userData.dietPreferences && userData.dietPreferences.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Diet Preferences</Text>
          <DietPreferencesDisplay preferences={userData.dietPreferences} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading2,
    color: theme.colors.text,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  editButtonText: {
    color: theme.colors.card,
    ...theme.typography.button,
  },
  caloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  caloriesBox: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: 4,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  caloriesBoxLarge: {
    flex: 1.5,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
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
  caloriesCaption: {
    ...theme.typography.caption,
    color: theme.colors.text,
    opacity: 0.6,
    marginTop: 4,
    textAlign: 'center',
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  macroBox: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
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
    color: theme.colors.secondary,
  },
  detailsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    ...theme.shadow.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  detailsText: {
    ...theme.typography.body2,
    color: theme.colors.text,
    opacity: 0.7,
  },
  detailsValue: {
    ...theme.typography.body2,
    color: theme.colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.card,
    ...theme.typography.button,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    ...theme.shadow.sm,
  },
  cardTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  macroExplanation: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  preferencesContainer: {
    marginTop: theme.spacing.md,
  },
  categoryContainer: {
    marginBottom: theme.spacing.md,
  },
  categoryTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  itemButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  itemButtonActive: {
    backgroundColor: theme.colors.secondary + '22',
    borderColor: theme.colors.secondary,
  },
  itemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  itemTextActive: {
    color: theme.colors.secondary,
    fontFamily: 'Inter-Bold',
  },
});
