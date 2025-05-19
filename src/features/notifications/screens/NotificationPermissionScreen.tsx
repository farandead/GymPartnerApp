import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'NotificationPermission'>;

export const NotificationPermissionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleAllowNotifications = async () => {
    // Implement notification permission request here
    // After getting permission:
    navigation.navigate('PrivacyConsent');
  };

  const handleSkip = () => {
    navigation.navigate('PrivacyConsent');
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5 items-center">
        {/* Bell Icon */}
        <View className="flex-1 justify-center items-center">
          <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
            <Path
              d="M60 15C57.2386 15 55 17.2386 55 20V25.1375C41.3096 27.1383 30.8889 38.9374 30.8889 53V70.5556L25 82.2222H95L89.1111 70.5556V53C89.1111 38.9374 78.6904 27.1383 65 25.1375V20C65 17.2386 62.7614 15 60 15Z"
              fill="#FF8600"
            />
            <Path
              d="M50 85C50 90.5228 54.4772 95 60 95C65.5228 95 70 90.5228 70 85"
              stroke="#FF8600"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* Content */}
        <View className="flex-1 w-full">
          <Text className="text-3xl font-bold text-pump-white mb-4">
            Don't miss a beat, or a match
          </Text>
          
          <Text className="text-lg text-pump-white/80 mb-8">
            Turn on your notifications so we can let you know when you have new matches, likes, or messages.
          </Text>

          {/* Allow Notifications Button */}
          <TouchableOpacity
            className="bg-pump-orange rounded-full py-4 items-center mb-4"
            onPress={handleAllowNotifications}
          >
            <Text className="text-pump-white font-semibold text-lg">
              Allow notifications
            </Text>
          </TouchableOpacity>

          {/* Skip Button */}
          <TouchableOpacity
            className="py-4 items-center"
            onPress={handleSkip}
          >
            <Text className="text-pump-white/80 font-semibold text-base">
              Not now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
