import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {ui}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
