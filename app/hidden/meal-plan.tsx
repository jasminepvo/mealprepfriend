import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { ChevronDown, Filter, RotateCcw } from 'lucide-react-native';
import { mockWeeklyMealPlan } from '@/data/mockData';
import { theme } from '@/constants/theme';
import { DailyMealPlan, Meal } from '@/types';

const MealPlan = () => {
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(mockWeeklyMealPlan);
  const [selectedDay, setSelectedDay] = useState(weeklyMealPlan.days[0]);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  // Format date to display day of week
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Format date to display full date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggleMealDetails = (mealId: string) => {
    if (expandedMeal === mealId) {
      setExpandedMeal(null);
    } else {
      setExpandedMeal(mealId);
    }
  };

  // Calculate daily macros percentages
  const calculateMacroPercentage = (dailyPlan: DailyMealPlan) => {
    const totalCalories = dailyPlan.totalCalories;
    if (totalCalories === 0) return { protein: 0, carbs: 0, fat: 0 };

    // Protein and carbs have 4 calories per gram, fat has 9 calories per gram
    const proteinCalories = dailyPlan.totalProtein * 4;
    const carbsCalories = dailyPlan.totalCarbs * 4;
    const fatCalories = dailyPlan.totalFat * 9;

    return {
      protein: Math.round((proteinCalories / totalCalories) * 100),
      carbs: Math.round((carbsCalories / totalCalories) * 100),
      fat: Math.round((fatCalories / totalCalories) * 100),
    };
  };

  const macroPercentages = calculateMacroPercentage(selectedDay);

  const renderMealDetails = (meal: Meal) => {
    if (!meal) return null;

    return (
      <View style={styles.mealDetailsContainer}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsList}>
          {meal.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientItem}>
              • {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.instructionsList}>
          {meal.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>{index + 1}</Text>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Nutrition Info</Text>
        <View style={styles.nutritionGrid}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.calories}</Text>
            <Text style={styles.nutritionLabel}>Calories</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.protein}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.carbs}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.fat}g</Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weekly Meal Plan</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Filter size={20} color={theme.colors.gray[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <RotateCcw size={20} color={theme.colors.gray[700]} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysScrollView}
        contentContainerStyle={styles.daysContainer}
      >
        {weeklyMealPlan.days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCard,
              selectedDay.date.getDate() === day.date.getDate() &&
                styles.activeDay,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay.date.getDate() === day.date.getDate() &&
                  styles.activeDayText,
              ]}
            >
              {formatDay(day.date)}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDay.date.getDate() === day.date.getDate() &&
                  styles.activeDateText,
              ]}
            >
              {day.date.getDate()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.dateHeader}>
        <Text style={styles.currentDate}>{formatDate(selectedDay.date)}</Text>
      </View>

      <View style={styles.macrosContainer}>
        <Text style={styles.macroTitle}>Daily Macros</Text>
        <View style={styles.macroPercentages}>
          <View
            style={[
              styles.macroBar,
              {
                flex: macroPercentages.protein,
                backgroundColor: theme.colors.secondary[500],
              },
            ]}
          >
            <Text style={styles.macroText}>P {macroPercentages.protein}%</Text>
          </View>
          <View
            style={[
              styles.macroBar,
              { flex: macroPercentages.carbs, backgroundColor: '#4AA4FC' },
            ]}
          >
            <Text style={styles.macroText}>C {macroPercentages.carbs}%</Text>
          </View>
          <View
            style={[
              styles.macroBar,
              { flex: macroPercentages.fat, backgroundColor: '#FCB144' },
            ]}
          >
            <Text style={styles.macroText}>F {macroPercentages.fat}%</Text>
          </View>
        </View>
        <View style={styles.calorieCount}>
          <Text style={styles.calorieText}>
            {selectedDay.totalCalories} calories
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.mealsScrollView}
        showsVerticalScrollIndicator={false}
      >
        {selectedDay.breakfast && (
          <View style={styles.mealSection}>
            <Text style={styles.mealTypeTitle}>Breakfast</Text>
            <View style={styles.mealCard}>
              <Image
                source={{ uri: selectedDay.breakfast.image }}
                style={styles.mealImage}
              />
              <View style={styles.mealCardContent}>
                <Text style={styles.mealName}>
                  {selectedDay.breakfast.name}
                </Text>
                <View style={styles.mealTags}>
                  {selectedDay.breakfast.dietaryTags
                    .slice(0, 2)
                    .map((tag, index) => (
                      <View key={index} style={styles.tagContainer}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                </View>
                <View style={styles.mealMacros}>
                  <Text style={styles.macroDetail}>
                    {selectedDay.breakfast.calories} kcal
                  </Text>
                  <Text style={styles.macroDetail}>
                    P: {selectedDay.breakfast.protein}g
                  </Text>
                  <Text style={styles.macroDetail}>
                    C: {selectedDay.breakfast.carbs}g
                  </Text>
                  <Text style={styles.macroDetail}>
                    F: {selectedDay.breakfast.fat}g
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => toggleMealDetails(selectedDay.breakfast!.id)}
                >
                  <Text style={styles.expandButtonText}>
                    {expandedMeal === selectedDay.breakfast!.id
                      ? 'Hide Details'
                      : 'Show Details'}
                  </Text>
                  <ChevronDown
                    size={16}
                    color={theme.colors.primary[600]}
                    style={{
                      transform: [
                        {
                          rotate:
                            expandedMeal === selectedDay.breakfast!.id
                              ? '180deg'
                              : '0deg',
                        },
                      ],
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expandedMeal === selectedDay.breakfast!.id &&
              renderMealDetails(selectedDay.breakfast)}
          </View>
        )}

        {selectedDay.lunch && (
          <View style={styles.mealSection}>
            <Text style={styles.mealTypeTitle}>Lunch</Text>
            <View style={styles.mealCard}>
              <Image
                source={{ uri: selectedDay.lunch.image }}
                style={styles.mealImage}
              />
              <View style={styles.mealCardContent}>
                <Text style={styles.mealName}>{selectedDay.lunch.name}</Text>
                <View style={styles.mealTags}>
                  {selectedDay.lunch.dietaryTags
                    .slice(0, 2)
                    .map((tag, index) => (
                      <View key={index} style={styles.tagContainer}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                </View>
                <View style={styles.mealMacros}>
                  <Text style={styles.macroDetail}>
                    {selectedDay.lunch.calories} kcal
                  </Text>
                  <Text style={styles.macroDetail}>
                    P: {selectedDay.lunch.protein}g
                  </Text>
                  <Text style={styles.macroDetail}>
                    C: {selectedDay.lunch.carbs}g
                  </Text>
                  <Text style={styles.macroDetail}>
                    F: {selectedDay.lunch.fat}g
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => toggleMealDetails(selectedDay.lunch!.id)}
                >
                  <Text style={styles.expandButtonText}>
                    {expandedMeal === selectedDay.lunch!.id
                      ? 'Hide Details'
                      : 'Show Details'}
                  </Text>
                  <ChevronDown
                    size={16}
                    color={theme.colors.primary[600]}
                    style={{
                      transform: [
                        {
                          rotate:
                            expandedMeal === selectedDay.lunch!.id
                              ? '180deg'
                              : '0deg',
                        },
                      ],
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expandedMeal === selectedDay.lunch!.id &&
              renderMealDetails(selectedDay.lunch)}
          </View>
        )}

        {selectedDay.dinner && (
          <View style={styles.mealSection}>
            <Text style={styles.mealTypeTitle}>Dinner</Text>
            <View style={styles.mealCard}>
              <Image
                source={{ uri: selectedDay.dinner.image }}
                style={styles.mealImage}
              />
              <View style={styles.mealCardContent}>
                <Text style={styles.mealName}>{selectedDay.dinner.name}</Text>
                <View style={styles.mealTags}>
                  {selectedDay.dinner.dietaryTags
                    .slice(0, 2)
                    .map((tag, index) => (
                      <View key={index} style={styles.tagContainer}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                </View>
                <View style={styles.mealMacros}>
                  <Text style={styles.macroDetail}>
                    {selectedDay.dinner.calories} kcal
                  </Text>
                  <Text style={styles.macroDetail}>
                    P: {selectedDay.dinner.protein}g
                  </Text>
                  <Text style={styles.macroDetail}>
                    C: {selectedDay.dinner.carbs}g
                  </Text>
                  <Text style={styles.macroDetail}>
                    F: {selectedDay.dinner.fat}g
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => toggleMealDetails(selectedDay.dinner!.id)}
                >
                  <Text style={styles.expandButtonText}>
                    {expandedMeal === selectedDay.dinner!.id
                      ? 'Hide Details'
                      : 'Show Details'}
                  </Text>
                  <ChevronDown
                    size={16}
                    color={theme.colors.primary[600]}
                    style={{
                      transform: [
                        {
                          rotate:
                            expandedMeal === selectedDay.dinner!.id
                              ? '180deg'
                              : '0deg',
                        },
                      ],
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expandedMeal === selectedDay.dinner!.id &&
              renderMealDetails(selectedDay.dinner)}
          </View>
        )}

        {selectedDay.snacks.length > 0 && (
          <View style={styles.mealSection}>
            <Text style={styles.mealTypeTitle}>Snacks</Text>
            {selectedDay.snacks.map((snack, index) => (
              <View key={index}>
                <View style={styles.mealCard}>
                  <Image
                    source={{ uri: snack.image }}
                    style={styles.mealImage}
                  />
                  <View style={styles.mealCardContent}>
                    <Text style={styles.mealName}>{snack.name}</Text>
                    <View style={styles.mealTags}>
                      {snack.dietaryTags.slice(0, 2).map((tag, idx) => (
                        <View key={idx} style={styles.tagContainer}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.mealMacros}>
                      <Text style={styles.macroDetail}>
                        {snack.calories} kcal
                      </Text>
                      <Text style={styles.macroDetail}>
                        P: {snack.protein}g
                      </Text>
                      <Text style={styles.macroDetail}>C: {snack.carbs}g</Text>
                      <Text style={styles.macroDetail}>F: {snack.fat}g</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.expandButton}
                      onPress={() => toggleMealDetails(snack.id)}
                    >
                      <Text style={styles.expandButtonText}>
                        {expandedMeal === snack.id
                          ? 'Hide Details'
                          : 'Show Details'}
                      </Text>
                      <ChevronDown
                        size={16}
                        color={theme.colors.primary[600]}
                        style={{
                          transform: [
                            {
                              rotate:
                                expandedMeal === snack.id ? '180deg' : '0deg',
                            },
                          ],
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {expandedMeal === snack.id && renderMealDetails(snack)}
              </View>
            ))}
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl + 20,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: theme.typography.heading2.fontSize,
    color: theme.colors.text,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  daysScrollView: {
    maxHeight: 80,
  },
  daysContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  dayCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 70,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[50],
    marginRight: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  activeDay: {
    backgroundColor: theme.colors.primary[500],
  },
  dayText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[700],
  },
  activeDayText: {
    color: theme.colors.white,
  },
  dateText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginTop: 4,
  },
  activeDateText: {
    color: theme.colors.white,
  },
  dateHeader: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  currentDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[700],
  },
  macrosContainer: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  macroTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[800],
    marginBottom: 8,
  },
  macroPercentages: {
    flexDirection: 'row',
    height: 24,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  macroBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  macroText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: theme.colors.white,
  },
  calorieCount: {
    alignItems: 'center',
    marginTop: 8,
  },
  calorieText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  mealsScrollView: {
    flex: 1,
    marginTop: theme.spacing.lg,
  },
  mealSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  mealTypeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.sm,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadow.sm,
    overflow: 'hidden',
  },
  mealImage: {
    width: 100,
    height: 100,
  },
  mealCardContent: {
    flex: 1,
    padding: theme.spacing.md,
  },
  mealName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  mealTags: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tagContainer: {
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    marginRight: 6,
  },
  tagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: theme.colors.primary[700],
  },
  mealMacros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  macroDetail: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
    marginRight: 10,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  expandButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: theme.colors.primary[600],
    marginRight: 4,
  },
  mealDetailsContainer: {
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: theme.typography.heading3.fontSize,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  ingredientsList: {
    marginBottom: theme.spacing.md,
  },
  ingredientItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 4,
  },
  instructionsList: {
    marginBottom: theme.spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  instructionNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.primary[500],
    width: 20,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    flex: 1,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  nutritionValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.gray[900],
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
  },
  spacer: {
    height: 90,
  },
});

export default MealPlan;
