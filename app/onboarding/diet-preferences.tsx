import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useUserData } from '@/hooks/useUserData';
import { RadioChip } from '../components/RadioChip';

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

export default function DietPreferences() {
  const router = useRouter();
  const { userData, updateUserData } = useUserData();

  // Initialize state with categories structure
  const [selectedItems, setSelectedItems] = useState<
    Record<string, Record<string, boolean>>
  >(() => {
    // Start with empty categories
    const initialState: Record<string, Record<string, boolean>> = {};

    // Initialize all categories and items
    Object.entries(categories).forEach(([category, items]) => {
      initialState[category] = {};
      items.forEach((item) => {
        // If we have existing user data, use it, otherwise initialize as false
        initialState[category][item] =
          userData?.dietPreferences?.[category]?.[item] || false;
      });
    });

    return initialState;
  });

  const toggleItem = (category: string, item: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item],
      },
    }));
  };

  const handleComplete = async () => {
    try {
      // Save selected preferences
      await updateUserData({ dietPreferences: selectedItems });
      router.replace('/(tabs)/meal-plan');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT YOUR DIET PREFERENCES</Text>
      {Object.entries(categories).map(([category, items]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.itemsContainer}>
            {items.map((item) => (
              <RadioChip
                key={item}
                label={item}
                isSelected={selectedItems[category]?.[item] || false}
                onPress={() => toggleItem(category, item)}
                activeColor={theme.colors.primary}
              />
            ))}
          </View>
        </View>
      ))}

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={handleBack}
        >
          <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={handleComplete}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
  },
  title: {
    ...theme.typography.heading2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 60,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    ...theme.typography.body1,
    color: theme.colors.text,
    marginBottom: 8,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  navigationButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
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
    ...theme.typography.button,
    color: theme.colors.card,
  },
  backButtonText: {
    color: theme.colors.text,
  },
});
