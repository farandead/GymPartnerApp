/**
 * App color palette constants
 * These colors are also defined in tailwind.config.js for use with Tailwind CSS classes
 */

export const COLORS = {
  // Primary brand colors
  BLACK: '#1B2021', // Primary dark color
  ORANGE: '#FF8600', // Primary accent color
  WHITE: '#FFFFFF', // Primary light color
  
  // Additional UI colors
  DARK_GRAY: '#333333',
  MEDIUM_GRAY: '#666666',
  LIGHT_GRAY: '#E0E0E0',
  ERROR: '#FF3B30',
  SUCCESS: '#4CD964',
  WARNING: '#FF9500',
  INFO: '#5AC8FA',
  
  // Feature-specific colors
  MATCH: '#FF2D55', // For match indicators
  LOCATION: '#5856D6', // For location features
  WORKOUT: '#34C759', // For workout related features
  SPOTIFY: '#1DB954', // Spotify brand color

  // Gradients (used with linear gradients)
  GRADIENTS: {
    PRIMARY: ['#FF8600', '#FF6B00'],
    DARK: ['#1B2021', '#2D3436'],
  },

  // Opacity variants
  getWithOpacity: (color: string, opacity: number) => {
    // Convert hex to rgba
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  }
};

// Usage example:
// import { COLORS } from 'src/constants/colors';
// 
// // In component:
// <View style={{ backgroundColor: COLORS.BLACK }}>
//   <Text style={{ color: COLORS.ORANGE }}>
//     PumpCult
//   </Text>
// </View>
//
// // With opacity:
// <View style={{ backgroundColor: COLORS.getWithOpacity(COLORS.BLACK, 0.5) }} />
//
// // Or with Tailwind:
// <View className="bg-pump-black">
//   <Text className="text-pump-orange">
//     PumpCult
//   </Text>
// </View>
