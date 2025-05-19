import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'GymMode'>;

type GymModeOption = 'Gym Partner' | 'Social' | 'Professional';

interface ModeOption {
  id: GymModeOption;
  title: string;
  description: string;
}

export const GymModeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMode, setSelectedMode] = useState<GymModeOption | null>(null);

  const modeOptions: ModeOption[] = [
    {
      id: 'Gym Partner',
      title: 'Gym Partner',
      description: 'Find a reliable gym buddy for consistent training',
    },
    {
      id: 'Social',
      title: 'Social',
      description: 'Connect with fitness friends and join workout groups',
    },
    {
      id: 'Professional',
      title: 'Professional',
      description: 'Network with trainers, nutritionists, and fitness pros',
    },
  ];
  const handleContinue = () => {
    if (selectedMode) {
      console.log('Selected mode:', selectedMode);
      navigation.navigate('PreferredPartners', { mode: selectedMode });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[90%]" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          What brings you to PumpCult?
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-8">
          Fitness goals and gym buddies or professional connections?
          Choose a mode to find your people.
        </Text>

        {/* Mode Options */}
        <View>
  {modeOptions.map((mode, index) => (
    <TouchableOpacity
      key={mode.id}
      className={`p-6 rounded-2xl ${
        selectedMode === mode.id
          ? 'bg-pump-orange'
          : 'bg-pump-white/10'
      } ${index !== modeOptions.length - 1 ? 'mb-4' : ''}`} // Add gap between cards
      onPress={() => setSelectedMode(mode.id)}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text
            className={`text-xl font-semibold mb-1 ${
              selectedMode === mode.id
                ? 'text-pump-black'
                : 'text-pump-white'
            }`}
          >
            {mode.title}
          </Text>
          <Text
            className={
              selectedMode === mode.id
                ? 'text-pump-black/70'
                : 'text-pump-white/70'
            }
          >
            {mode.description}
          </Text>
        </View>
        <View
          className={`w-6 h-6 rounded-full ml-4 ${
            selectedMode === mode.id
              ? 'bg-pump-black'
              : 'bg-pump-white/20'
          } flex items-center justify-center`}
        >
          {selectedMode === mode.id && (
            <View className="w-3 h-3 rounded-full bg-pump-orange" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  ))}
</View>

        {/* Info Note */}
        <View className="flex-row items-center mt-8 mb-4">
          <View className="w-5 h-5 rounded-full border border-pump-white/60 items-center justify-center mr-2">
            <Text className="text-pump-white/60">i</Text>
          </View>
          <Text className="text-pump-white/60 flex-1">
            You'll only be shown to people in the same mode as you.
          </Text>
        </View>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={selectedMode !== null}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
