import { WelcomeScreen } from 'components/WelcomeScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <WelcomeScreen />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
