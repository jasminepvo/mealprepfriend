import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HELLO JASMINE</Text>
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
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>AGE</Text>
        <Text style={styles.detailsValue}>27</Text>
        <Text style={styles.detailsText}>GENDER</Text>
        <Text style={styles.detailsValue}>FEMALE</Text>
        <Text style={styles.detailsText}>HEIGHT</Text>
        <Text style={styles.detailsValue}>5'2</Text>
        <Text style={styles.detailsText}>WEIGHT</Text>
        <Text style={styles.detailsValue}>109</Text>
        <Text style={styles.detailsText}>ACTIVITY</Text>
        <Text style={styles.detailsValue}>SEDENTARY</Text>
        <Text style={styles.detailsText}>HEALTH GOAL</Text>
        <Text style={styles.detailsValue}>LOSE WEIGHT</Text>
      </View>
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
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  detailsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 24,
  },
  detailsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  detailsValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'right',
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
