import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface RadioChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  activeColor?: string;
}

export function RadioChip({
  label,
  isSelected,
  onPress,
  activeColor = theme.colors.secondary,
}: RadioChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected && {
          backgroundColor: activeColor + '22',
          borderColor: activeColor,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          isSelected && {
            color: activeColor,
            fontFamily: 'Inter-Bold',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
});
