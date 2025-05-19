import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'GenderSelection'>;

type GenderOption = 'Woman' | 'Man' | 'Nonbinary' | 'Other';

export const GenderSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const firstName = route.params?.firstName || '';
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);
  const [customGender, setCustomGender] = useState('');

  const genderOptions: GenderOption[] = ['Woman', 'Man', 'Nonbinary', 'Other'];  const handleContinue = () => {
    if (selectedGender) {
      const finalGender = selectedGender === 'Other' ? customGender : selectedGender;
      console.log('Selected gender:', finalGender);
      navigation.navigate('GenderVisibility', { gender: finalGender });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-1/2" />
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-pump-white mb-2">
          {firstName} is a great name
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-8">
          We love that you're here. Pick the gender that best describes you, then add more about it if you like.
        </Text>

        {/* Gender Selection */}
        <Text className="text-xl font-semibold text-pump-white mb-4">
          Which gender best describes you?
        </Text>
        <View className="space-y-4">
          <View>
            {genderOptions.map((gender, index) => (
              <TouchableOpacity
            key={gender}
            className={`p-4 rounded-xl flex-row justify-between items-center ${
              selectedGender === gender
                ? 'bg-pump-orange/20'
                : 'bg-pump-white/10'
            } ${index !== genderOptions.length - 1 ? 'mb-4' : ''}`} // add gap
            onPress={() => {
              setSelectedGender(gender);
              if (gender !== 'Other') {
                setCustomGender('');
              }
            }}
              >
            <Text
              className={`text-lg ${
                selectedGender === gender
                  ? 'text-pump-orange'
                  : 'text-pump-white'
              }`}
            >
              {gender}
            </Text>
            <View
              className={`w-6 h-6 rounded-full ${
                selectedGender === gender
                  ? 'bg-pump-orange'
                  : 'bg-pump-white/20'
              } flex items-center justify-center`}
            >
              {selectedGender === gender && (
                <View className="w-3 h-3 rounded-full bg-pump-white" />
              )}
            </View>
              </TouchableOpacity>
            ))}
          </View>

            {/* Custom Gender Input */}
            {selectedGender === 'Other' && (
            <TextInput
                className="bg-pump-white/10 rounded-xl px-4 py-3 text-pump-white text-lg mt-2"
                placeholder="Enter your gender"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={customGender}
                onChangeText={setCustomGender}
                autoCapitalize="words"
                autoCorrect={false}
            />
            )}
        </View>

        {/* Note */}
        <View className="flex-row items-center mt-6">
          <View className="w-5 h-5 items-center justify-center rounded-full border border-pump-white/60 mr-2">
            <Text className="text-pump-white/60">i</Text>
          </View>
          <Text className="text-pump-white/60">
            You can always update this later.{' '}
            <Text className="underline">A note about gender on pumpcult.</Text>
          </Text>
        </View>        {/* Continue Button - Fixed at bottom */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={selectedGender !== null && (selectedGender !== 'Other' || customGender.trim() !== '')}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
