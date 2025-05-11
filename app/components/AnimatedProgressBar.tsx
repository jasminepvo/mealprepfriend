import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '@/constants/theme';

interface AnimatedProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  height = 8,
  color = theme.colors.primary,
  backgroundColor = theme.colors.border,
  borderRadius = theme.borderRadius.lg,
}) => {
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedWidth]);

  return (
    <View style={[styles.container, { height, backgroundColor, borderRadius }]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: color,
            borderRadius,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});

export default AnimatedProgressBar;
