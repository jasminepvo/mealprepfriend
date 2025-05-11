import { Platform } from 'react-native';

export const theme = {
  colors: {
    // Base colors
    background: '#FFFFFF',
    card: '#F5F5F7',
    primary: '#005CFF',
    secondary: '#8000AD',
    text: '#1C1C1E',
    border: '#E5E5EA',
    
    // Semantic colors
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    
    // Gray scale
    gray: {
      50: '#F5F5F7',
      100: '#E5E5EA',
      200: '#D1D1D6',
      300: '#C7C7CC',
      400: '#AEAEB2',
      500: '#8E8E93',
      600: '#636366',
      700: '#48484A',
      800: '#3A3A3C',
      900: '#2C2C2E',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadow: {
    sm: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
    lg: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  typography: {
    heading1: {
      fontSize: 34,
      lineHeight: 41,
      fontFamily: 'Inter-Bold',
    },
    heading2: {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: 'Inter-Bold',
    },
    heading3: {
      fontSize: 22,
      lineHeight: 28,
      fontFamily: 'Inter-SemiBold',
    },
    body1: {
      fontSize: 17,
      lineHeight: 22,
      fontFamily: 'Inter-Regular',
    },
    body2: {
      fontSize: 15,
      lineHeight: 20,
      fontFamily: 'Inter-Regular',
    },
    button: {
      fontSize: 17,
      lineHeight: 22,
      fontFamily: 'Inter-SemiBold',
    },
    caption: {
      fontSize: 13,
      lineHeight: 18,
      fontFamily: 'Inter-Regular',
    },
  },
};