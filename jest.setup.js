import '@testing-library/jest-native/extend-expect';

// ✅ react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    createNativeWrapper: jest.fn(),
    BaseButton: View,
    State: {},
    gestureHandlerRootHOC: jest.fn((comp) => comp),
    PanGestureHandler: View,
    TapGestureHandler: View,
    ScrollView: View,
    FlatList: View,
    TouchableOpacity: View,
    RectButton: View,
    BorderlessButton: View,
    Directions: {},
  };
});

// ✅ RNGestureHandlerModule (for install issue)
jest.mock('react-native-gesture-handler/lib/commonjs/RNGestureHandlerModule', () => ({
  default: {
    State: {},
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    handleClearJSResponder: jest.fn(),
    handleSetJSResponder: jest.fn(),
    install: jest.fn(),
    updateGestureHandler: jest.fn(),
  },
}));

// ✅ safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

// ✅ navigation mock
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// ✅ suppress native animation warnings
try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
} catch (e) {
  // Ignore if not found (safe fallback for newer SDKs)
}
// ✅ optional: reanimated mock
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
