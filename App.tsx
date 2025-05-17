import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WelcomeScreen } from '~/index';

import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <WelcomeScreen />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
