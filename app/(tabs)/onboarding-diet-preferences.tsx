import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

const categories = {
  Protein: [
    'FISH',
    'STEAK',
    'TURKEY BACON',
    'BACON',
    'CHICKEN',
    'GROUND BEEF',
    'GROUND TURKEY',
  ],
  Carb: [
    'RICE',
    'POTATO',
    'SWEET POTATO',
    'QUINOA',
    'FRENCH FRIES',
    'TORTILLA',
  ],
  Veggies: [
    'BROCCOLI',
    'CARROT',
    'BOY CHOY',
    'SALAD MIX',
    'KIMCHI',
    'GREEN BEANS',
    'BRUSSEL SPROUTS',
  ],
  Snacks: ['CHIPS', 'COOKIES', 'ICE CREAM', 'MANGO', 'STRAWBERRY', 'CUSTOM'],
};

export default function OnboardingDietPreferences() {
  const [selectedItems, setSelectedItems] = useState({});

  const toggleItem = (category, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item],
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT YOUR DIET PREFERENCES</Text>
      {Object.entries(categories).map(([category, items]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.itemsContainer}>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.itemButton,
                  selectedItems[category]?.[item] && styles.itemButtonActive,
                ]}
                onPress={() => toggleItem(category, item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateText}>Generate meal plan</Text>
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
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
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
  generateButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  generateText: {
    color: theme.colors.card,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
