import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

export default function OnboardingHealthGoal() {
  const [goal, setGoal] = useState('lose');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LETS GET COOKING</Text>
      <View style={styles.caloriesContainer}>
        <View style={styles.caloriesBox}>
          <Text style={styles.caloriesLabel}>BMI</Text>
          <Text style={styles.caloriesValue}>24.5</Text>
        </View>
        <View style={styles.caloriesBox}>
          <Text style={styles.caloriesLabel}>TDEE</Text>
          <Text style={styles.caloriesValue}>900</Text>
        </View>
        <View style={styles.caloriesBoxLarge}>
          <Text style={styles.caloriesLabel}>Daily calories</Text>
          <Text style={styles.caloriesValueLarge}>1560 cal</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Select your goal</Text>
      <TouchableOpacity
        style={[styles.goalButton, goal === 'lose' && styles.goalButtonActive]}
        onPress={() => setGoal('lose')}
      >
        <Text style={styles.goalText}>lose weight: 1500 cal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.goalButton,
          goal === 'maintain' && styles.goalButtonActive,
        ]}
        onPress={() => setGoal('maintain')}
      >
        <Text style={styles.goalText}>maintain: 1600 cal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.goalButton, goal === 'gain' && styles.goalButtonActive]}
        onPress={() => setGoal('gain')}
      >
        <Text style={styles.goalText}>gain weight: 1800 cal</Text>
      </TouchableOpacity>
      <View style={styles.macroContainer}>
        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.macroValue}>40%</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Carb</Text>
          <Text style={styles.macroValue}>35%</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Fat</Text>
          <Text style={styles.macroValue}>25%</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
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
  },
  caloriesBoxLarge: {
    flex: 1.5,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  caloriesLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  caloriesValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
  },
  caloriesValueLarge: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: theme.colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 16,
  },
  goalButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  goalButtonActive: {
    backgroundColor: theme.colors.primary + '22',
    borderColor: theme.colors.primary,
  },
  goalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  macroBox: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  macroLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  macroValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.text,
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  continueText: {
    color: theme.colors.card,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textTransform: 'lowercase',
  },
});
