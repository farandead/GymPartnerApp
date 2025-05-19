import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'ProfileSetup'>;

export const ProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState({
    day: '',
    month: '',
    year: ''
  });

  const isValidDay = (day: string) => {
    const num = parseInt(day);
    return num >= 1 && num <= 31;
  };

  const isValidMonth = (month: string) => {
    const num = parseInt(month);
    return num >= 1 && num <= 12;
  };

  const isValidYear = (year: string) => {
    const num = parseInt(year);
    const currentYear = new Date().getFullYear();
    return num >= 1900 && num <= currentYear - 18; // Must be at least 18 years old
  };

  const isFormValid = () => {
    return (
      firstName.length > 0 &&
      isValidDay(birthday.day) &&
      isValidMonth(birthday.month) &&
      isValidYear(birthday.year)
    );
  };
  const handleContinue = () => {
    if (isFormValid()) {
      // Store profile data and navigate to gender selection
      console.log('Profile data:', { firstName, birthday });
      navigation.navigate('GenderSelection', { firstName });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-5">
          {/* Progress Bar */}
          <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
            <View className="h-1 bg-pump-orange rounded-full w-1/4" />
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-pump-white mb-8">
            Oh hey! Let's start with an intro.
          </Text>

          {/* First Name Input */}
          <View className="mb-8">
            <Text className="text-pump-white/90 text-lg mb-2">
              Your first name
            </Text>
            <TextInput
              className="bg-transparent border-2 border-pump-white/70 rounded-xl px-4 py-3 text-pump-white/90 text-lg"
              placeholder="Enter your first name"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* Birthday Input */}
          <View className="mb-2">
            <Text className="text-pump-white/90 text-lg mb-2">
              Your birthday
            </Text>
            <View className="flex-row space-x-6">
              {/* Day */}
              <View className="flex-1 mr-3">
                <Text className="text-pump-white/60 text-sm mb-1">Day</Text>
                <TextInput
                  className="bg-transparent border-2 border-pump-white/70 rounded-xl px-4 py-3 text-pump-white/90 text-lg"
                  placeholder="DD"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={birthday.day}
                  onChangeText={(text) => setBirthday(prev => ({ ...prev, day: text }))}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
              {/* Month */}
              <View className="flex-1 mr-3">
                <Text className="text-pump-white/60 text-sm mb-1">Month</Text>
                <TextInput
                  className="bg-transparent border-2 border-pump-white/70 rounded-xl px-4 py-3 text-pump-white/90 text-lg"
                  placeholder="MM"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={birthday.month}
                  onChangeText={(text) => setBirthday(prev => ({ ...prev, month: text }))}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
              {/* Year */}
              <View className="flex-2">
                <Text className="text-pump-white/60 text-sm mb-1">Year</Text>
                <TextInput
                  className="bg-transparent border-2 border-pump-white/70 rounded-xl px-4 py-3 text-pump-white/90 text-lg"
                  placeholder="YYYY"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={birthday.year}
                  onChangeText={(text) => setBirthday(prev => ({ ...prev, year: text }))}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          <Text className="text-pump-white/60 text-base mb-8">
            It's never too early to count down
          </Text>

          {/* Continue Button - Fixed at bottom */}
          <View className="absolute bottom-8 right-5 w-14 h-14">
            <TouchableOpacity
              className={`w-full h-full rounded-full items-center justify-center ${
                isFormValid() ? 'bg-pump-orange' : 'bg-pump-white/30'
              }`}
              onPress={handleContinue}
              disabled={!isFormValid()}
            >
              <View className="items-center justify-center">
                <Text className="text-pump-white text-2xl font-bold">→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
