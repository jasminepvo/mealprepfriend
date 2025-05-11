import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { RadioChip } from './RadioChip';

interface DietPreferencesSectionProps {
  selectedItems: string[] | Record<string, Record<string, boolean>>;
}

export default function DietPreferencesSection({
  selectedItems,
}: DietPreferencesSectionProps) {
  // Handle array type (legacy support)
  if (Array.isArray(selectedItems)) {
    if (selectedItems.length === 0) return null;

    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Diet Preferences</Text>
        <View style={styles.chipContainer}>
          {selectedItems.map((item) => (
            <RadioChip
              key={item}
              label={item}
              isSelected={true}
              onPress={() => {}}
              activeColor={theme.colors.primary}
            />
          ))}
        </View>
      </View>
    );
  }

  // Handle record type
  const getSelectedItems = () => {
    const selected: Record<string, string[]> = {};

    Object.entries(selectedItems).forEach(([category, items]) => {
      // Filter items that are true (selected)
      const selectedInCategory = Object.entries(items)
        .filter(([_, isSelected]) => isSelected)
        .map(([item]) => item);

      // Only add category if it has selected items
      if (selectedInCategory.length > 0) {
        selected[category] = selectedInCategory;
      }
    });

    return selected;
  };

  const selectedPreferences = getSelectedItems();
  const hasPreferences = Object.values(selectedPreferences).some(
    (items) => items.length > 0
  );

  if (!hasPreferences) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Diet Preferences</Text>
      {Object.entries(selectedPreferences).map(([category, items]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.chipContainer}>
            {items.map((item) => (
              <RadioChip
                key={item}
                label={item}
                isSelected={true}
                onPress={() => {}}
                activeColor={theme.colors.primary}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    ...theme.shadow.sm,
  },
  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  categoryContainer: {
    marginBottom: theme.spacing.md,
  },
  categoryTitle: {
    ...theme.typography.caption,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.sm,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4, // Compensate for chip margins
  },
});
