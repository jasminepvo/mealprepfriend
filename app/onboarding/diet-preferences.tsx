import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useUserData } from '@/hooks/useUserData';

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
  const { updateUserData } = useUserData();
  const [selectedItems, setSelectedItems] = useState<
    Record<string, Record<string, boolean>>
  >({});

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
      // Convert selected items to array of strings
      const selectedPreferences = Object.entries(selectedItems).reduce<
        string[]
      >((acc, [category, items]) => {
        const selectedInCategory = Object.entries(items)
          .filter(([_, isSelected]) => isSelected)
          .map(([item]) => item);
        return [...acc, ...selectedInCategory];
      }, []);

      // Save selected preferences and mark onboarding as complete
      await updateUserData({
        dietPreferences: selectedPreferences,
      });
      await router.replace('/(tabs)/meal-plan');
    } catch (error) {
      console.error('Error completing onboarding:', error);
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
              <TouchableOpacity
                key={item}
                style={[
                  styles.itemButton,
                  selectedItems[category]?.[item] && styles.itemButtonActive,
                ]}
                onPress={() => toggleItem(category, item)}
              >
                <Text
                  style={[
                    styles.itemText,
                    selectedItems[category]?.[item] && styles.itemTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
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
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 60,
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
  itemTextActive: {
    color: theme.colors.secondary,
    fontFamily: 'Inter-Bold',
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
    color: theme.colors.card,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  backButtonText: {
    color: theme.colors.text,
  },
});
