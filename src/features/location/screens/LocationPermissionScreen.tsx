import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle, Path, Svg } from 'react-native-svg';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'LocationPermission'>;

export const LocationPermissionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSetLocation = async () => {
    // Implement location permission request here
    // After getting permission:
    navigation.navigate('NotificationPermission');
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5 items-center">
        {/* Illustration */}
        <View className="flex-1 justify-center items-center">
          <Svg width={200} height={200} viewBox="0 0 200 200">
            <Circle cx="100" cy="100" r="80" fill="#FF8600" opacity="0.2"/>
            <Circle cx="100" cy="100" r="40" fill="#FF8600"/>
            <Path 
              d="M100 70C83.4315 70 70 83.4315 70 100C70 116.569 83.4315 130 100 130C116.569 130 130 116.569 130 100C130 83.4315 116.569 70 100 70ZM100 120C88.9543 120 80 111.046 80 100C80 88.9543 88.9543 80 100 80C111.046 80 120 88.9543 120 100C120 111.046 111.046 120 100 120Z" 
              fill="white"
            />
          </Svg>
        </View>

        {/* Content */}
        <View className="flex-1 w-full">
          <Text className="text-3xl font-bold text-pump-white mb-4">
            Now, can we get your location?
          </Text>
          
          <Text className="text-lg text-pump-white/80 mb-8">
            We need it so we can show you all the great people nearby (or far away).
          </Text>

          {/* Location Services Button */}
          <TouchableOpacity
            className="bg-pump-orange rounded-full py-4 items-center mb-4"
            onPress={handleSetLocation}
          >
            <Text className="text-pump-white font-semibold text-lg">
              Set location services
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
