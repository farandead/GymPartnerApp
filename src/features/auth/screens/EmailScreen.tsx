import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Email'>;

export const EmailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleContinue = () => {
    if (isValidEmail(email)) {
      console.log('Email:', email);
      navigation.navigate('GymMode');
    }
  };

  const handleSkip = () => {
    navigation.navigate('GymMode');
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[85%]" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          Can we get your email?
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-12">
          We'll use this to recover your account ASAP if you can't log in.
        </Text>

        {/* Email Input */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-pump-white mb-4">
            Your email
          </Text>
          <TextInput
            className={`bg-transparent border-2 rounded-2xl px-4 py-3 text-pump-white text-lg ${
              email ? 'border-pump-white' : 'border-pump-white/30'
            }`}
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            autoComplete="email"
          />
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={handleSkip}
          className="absolute bottom-8 left-5"
        >
          <Text className="text-pump-white text-lg font-semibold">Skip</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={isValidEmail(email)}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
