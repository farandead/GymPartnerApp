import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Rect, Svg } from 'react-native-svg';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'PrivacyConsent'>;

const PrivacyIcon = () => (
  <Svg width={100} height={100} viewBox="0 0 100 100" fill="none">
    <Rect x="20" y="15" width="60" height="70" stroke="#FF8600" strokeWidth="2" fill="none" />
    <Path
      d="M45 45 C45 40, 55 40, 55 45 L55 60 C55 65, 45 65, 45 60 Z"
      fill="#FF8600"
    />
    <Rect x="47" y="35" width="6" height="15" rx="2" fill="#FF8600" />
  </Svg>
);

export const PrivacyConsentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleAccept = () => {
    // Implement privacy acceptance logic here
    navigation.navigate('ProfileSetup');
  };

  const handlePersonalize = () => {
    navigation.navigate('PrivacyPreferences');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://pumpcult.com/privacy-policy');
  };

  const openCookiePolicy = () => {
    Linking.openURL('https://pumpcult.com/cookie-policy');
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <ScrollView className="flex-1 px-5">
        <View className="items-center mt-8 mb-6">
          <PrivacyIcon />
        </View>

        <Text className="text-3xl font-bold text-pump-white mb-4">
          Your privacy comes first
        </Text>

        <Text className="text-lg text-pump-white/80 mb-4">
          We and our 3{' '}
          <Text className="text-pump-orange underline" onPress={() => console.log('Show partners')}>
            partners
          </Text>
          {' '}use tracking tools to store and process your data, including IP address and profile information, to provide key app features, show you relevant ads and improve our marketing. "Accept" to consent to this in the PumpCult app.
        </Text>

        <Text className="text-lg text-pump-white/80 mb-4">
          You can change this or opt out below now, or whenever you like in the app settings. Read the details in our{' '}
          <Text className="text-pump-orange underline" onPress={openPrivacyPolicy}>
            privacy policy
          </Text>
          {' '}and{' '}
          <Text className="text-pump-orange underline" onPress={openCookiePolicy}>
            cookie policy
          </Text>
          .
        </Text>

        <Text className="text-xl font-semibold text-pump-white mb-4">
          We and our partners use your data for the following purposes:
        </Text>

        <View className="mb-8">
          {[
            'Store and/or access information on a device',
            'Personalised advertising and content, advertising and content measurement, audience research and services development',
            'Improve marketing'
          ].map((purpose, index) => (
            <View key={index} className="flex-row items-start mb-4">
              <View className="w-6 h-6 mr-2 mt-1">
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M7 10L12 15L17 10"
                    stroke="#FF8600"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text className="flex-1 text-lg text-pump-white/80">
                {purpose}
              </Text>
            </View>
          ))}
        </View>

        <View className="mb-8">
          <TouchableOpacity
            className="bg-pump-orange rounded-full py-4 items-center mb-4"
            onPress={handleAccept}
          >
            <Text className="text-pump-white font-semibold text-lg">
              Accept
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-4 items-center"
            onPress={handlePersonalize}
          >
            <Text className="text-pump-white/80 text-lg">
              Personalise or opt out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
