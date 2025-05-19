import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'TrackingConsent'>;

const PeaceHandIcon = () => (
  <Svg width={140} height={140} viewBox="0 0 140 140" fill="none">
    {/* Hand outline */}
    <Path
      d="M70 30C65 30 60 35 60 45V70M80 45V70M70 70V90M80 70V90M90 60V90M60 90H90V70"
      stroke="#FF8600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Wrist/palm base */}
    <Path
      d="M55 90C55 90 60 110 75 110C90 110 95 90 95 90"
      stroke="#FF8600"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Victory/peace sign highlight */}
    <Path
      d="M60 45V65M80 45V65"
      stroke="#FF8600"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

export const TrackingConsentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleContinue = () => {
    // Implement tracking consent logic here
    navigation.navigate('ProfileSetup');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://pumpcult.com/privacy-policy');
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Icon Section */}
        <View className="flex-1 justify-center items-center">
          <PeaceHandIcon />
        </View>

        {/* Content Section */}
        <View className="flex-1 justify-center">
          <Text className="text-4xl font-bold text-pump-white mb-4">
            Let's make this about you
          </Text>
          
          <Text className="text-lg text-pump-white/80 mb-6">
            We always want to improve your experience, so we use tracking to show you relevant ads.
          </Text>
        </View>

        {/* Bottom Section */}
        <View className="mb-8">
          <TouchableOpacity
            className="bg-pump-orange border-2 border-pump-white/10 rounded-full py-4 items-center mb-4"
            onPress={handleContinue}
          >
            <Text className="text-pump-white font-semibold text-lg">
              Continue
            </Text>
          </TouchableOpacity>
          

          <Text className="text-center text-pump-white/60 text-base">
            Make changes in device settings at any time. Learn more in our{' '}
            <Text 
              className="text-pump-orange underline"
              onPress={openPrivacyPolicy}
            >
              privacy policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};