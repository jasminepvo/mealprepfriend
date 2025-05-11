import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ArrowRight, Utensils, Clock, UserCircle2 } from 'lucide-react-native';
import { mockUserProfile, mockWeeklyMealPlan } from '@/data/mockData';
import { theme } from '@/constants/theme';
import AnimatedProgressBar from '@/app/components/AnimatedProgressBar';

const Home = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [currentMealPlan, setCurrentMealPlan] = useState(mockWeeklyMealPlan);
  const [todaysMeals, setTodaysMeals] = useState(mockWeeklyMealPlan.days[0]);

  // Format date to display day of week
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Calculate percentage of target calories consumed
  const caloriePercentage = Math.min(
    Math.round((todaysMeals.totalCalories / userProfile.targetCalories) * 100),
    100
  );
  const proteinPercentage = Math.min(
    Math.round((todaysMeals.totalProtein / userProfile.targetProtein) * 100),
    100
  );
  const carbsPercentage = Math.min(
    Math.round((todaysMeals.totalCarbs / userProfile.targetCarbs) * 100),
    100
  );
  const fatPercentage = Math.min(
    Math.round((todaysMeals.totalFat / userProfile.targetFat) * 100),
    100
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{userProfile.name}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <UserCircle2 size={40} color={theme.colors.primary[600]} />
          </TouchableOpacity>
        </View>

        <View style={styles.todayOverview}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Calories</Text>
              <AnimatedProgressBar
                progress={caloriePercentage}
                color={theme.colors.primary[500]}
              />
              <Text style={styles.statValue}>
                {todaysMeals.totalCalories} / {userProfile.targetCalories} kcal
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Protein</Text>
              <AnimatedProgressBar
                progress={proteinPercentage}
                color={theme.colors.secondary[500]}
              />
              <Text style={styles.statValue}>
                {todaysMeals.totalProtein}g / {userProfile.targetProtein}g
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Carbs</Text>
              <AnimatedProgressBar progress={carbsPercentage} color="#4AA4FC" />
              <Text style={styles.statValue}>
                {todaysMeals.totalCarbs}g / {userProfile.targetCarbs}g
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Fats</Text>
              <AnimatedProgressBar progress={fatPercentage} color="#FCB144" />
              <Text style={styles.statValue}>
                {todaysMeals.totalFat}g / {userProfile.targetFat}g
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.mealsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <Link href="/meal-plan" asChild>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color={theme.colors.primary[600]} />
              </TouchableOpacity>
            </Link>
          </View>

          {todaysMeals.breakfast && (
            <View style={styles.mealCard}>
              <Image
                source={{ uri: todaysMeals.breakfast.image }}
                style={styles.mealImage}
              />
              <View style={styles.mealInfo}>
                <View style={styles.mealTypeContainer}>
                  <Text style={styles.mealType}>Breakfast</Text>
                </View>
                <Text style={styles.mealName}>
                  {todaysMeals.breakfast.name}
                </Text>
                <View style={styles.mealStats}>
                  <View style={styles.mealStat}>
                    <Utensils size={14} color={theme.colors.gray[600]} />
                    <Text style={styles.mealStatText}>
                      {todaysMeals.breakfast.calories} kcal
                    </Text>
                  </View>
                  <View style={styles.mealStat}>
                    <Clock size={14} color={theme.colors.gray[600]} />
                    <Text style={styles.mealStatText}>
                      {todaysMeals.breakfast.prepTime +
                        todaysMeals.breakfast.cookTime}{' '}
                      min
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {todaysMeals.lunch && (
            <View style={styles.mealCard}>
              <Image
                source={{ uri: todaysMeals.lunch.image }}
                style={styles.mealImage}
              />
              <View style={styles.mealInfo}>
                <View style={[styles.mealTypeContainer, styles.lunchContainer]}>
                  <Text style={styles.mealType}>Lunch</Text>
                </View>
                <Text style={styles.mealName}>{todaysMeals.lunch.name}</Text>
                <View style={styles.mealStats}>
                  <View style={styles.mealStat}>
                    <Utensils size={14} color={theme.colors.gray[600]} />
                    <Text style={styles.mealStatText}>
                      {todaysMeals.lunch.calories} kcal
                    </Text>
                  </View>
                  <View style={styles.mealStat}>
                    <Clock size={14} color={theme.colors.gray[600]} />
                    <Text style={styles.mealStatText}>
                      {todaysMeals.lunch.prepTime + todaysMeals.lunch.cookTime}{' '}
                      min
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {todaysMeals.dinner && (
            <View style={styles.mealCard}>
              <Image
                source={{ uri: todaysMeals.dinner.image }}
                style={styles.mealImage}
              />
              <View style={styles.mealInfo}>
                <View
                  style={[styles.mealTypeContainer, styles.dinnerContainer]}
                >
                  <Text style={styles.mealType}>Dinner</Text>
                </View>
                <Text style={styles.mealName}>{todaysMeals.dinner.name}</Text>
                <View style={styles.mealStats}>
                  <View style={styles.mealStat}>
                    <Utensils size={14} color={theme.colors.gray[600]} />
                    <Text style={styles.mealStatText}>
                      {todaysMeals.dinner.calories} kcal
                    </Text>
                  </View>
                  <View style={styles.mealStat}>
                    <Clock size={14} color={theme.colors.gray[600]} />
                    <Text style={styles.mealStatText}>
                      {todaysMeals.dinner.prepTime +
                        todaysMeals.dinner.cookTime}{' '}
                      min
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.weekOverview}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysScrollView}
            contentContainerStyle={styles.daysContainer}
          >
            {currentMealPlan.days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dayCard, index === 0 && styles.activeDay]}
                onPress={() => setTodaysMeals(day)}
              >
                <Text
                  style={[styles.dayText, index === 0 && styles.activeDayText]}
                >
                  {formatDay(day.date)}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    index === 0 && styles.activeDateText,
                  ]}
                >
                  {day.date.getDate()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.actionCard}>
          <View style={styles.actionCardContent}>
            <Text style={styles.actionCardTitle}>Ready to meal prep?</Text>
            <Text style={styles.actionCardSubtitle}>
              Follow our 3-hour guide to prepare all your meals for the week!
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Start Prepping</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionIconContainer}>
            <Utensils size={48} color={theme.colors.primary[500]} />
          </View>
        </View>

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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl + 20,
    paddingBottom: theme.spacing.md,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[600],
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: theme.typography.heading2.fontSize,
    color: theme.colors.text,
  },
  todayOverview: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: theme.typography.heading3.fontSize,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  statItem: {
    marginBottom: theme.spacing.md,
  },
  statLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
    marginTop: 2,
  },
  mealsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.primary[600],
    marginRight: 4,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.sm,
    overflow: 'hidden',
  },
  mealImage: {
    width: 110,
    height: 110,
  },
  mealInfo: {
    flex: 1,
    padding: theme.spacing.md,
  },
  mealTypeContainer: {
    backgroundColor: theme.colors.primary[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  lunchContainer: {
    backgroundColor: theme.colors.secondary[100],
  },
  dinnerContainer: {
    backgroundColor: '#E1F5FE', // light blue
  },
  mealType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: theme.colors.primary[700],
  },
  mealName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 6,
  },
  mealStats: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  mealStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  mealStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
    marginLeft: 4,
  },
  weekOverview: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  daysScrollView: {
    marginTop: theme.spacing.sm,
  },
  daysContainer: {
    paddingRight: theme.spacing.lg,
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
  actionCard: {
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
    flexDirection: 'row',
  },
  actionCardContent: {
    flex: 1,
  },
  actionCardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.white,
  },
  actionIconContainer: {
    marginLeft: theme.spacing.md,
    justifyContent: 'center',
  },
  spacer: {
    height: 90,
  },
});

export default Home;
