import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackgroundImage } from '~/components';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  // Sample background image - replace with your own when ready
  const bgImage = require('~/assets/images/sample-bg.jpg');
  // If you want to use your own image, update the path:
  // const bgImage = require('~/assets/images/your-gym-image.jpg');
  
  const handleMobileNumberPress = () => {
    navigation.navigate('PhoneLogin');
  };
  
  return (
    <BackgroundImage imageSource={bgImage} overlayOpacity={0.65}>
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between p-5">
          <View className="items-center mt-10">
            <Text className="text-4xl font-bold text-pump-orange mb-2">PumpCult</Text>
            <Text className="text-5xl font-bold text-pump-orange text-center leading-[56px]">
              FIND YOUR{'\n'}GYM PARTNER
            </Text>
          </View>

          {/* Middle section - can be used for decorative elements later */}
          <View className="flex-1">
            {/* Future elements can go here */}
          </View>

          <View className="w-full mb-8">
            <TouchableOpacity className="bg-pump-white rounded-full py-4 items-center mb-4">
              <Text className="text-pump-black font-semibold text-base">Continue with Apple ID</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-pump-orange rounded-full py-4 items-center mb-4">
              <Text className="text-pump-white font-semibold text-base">Continue with Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-pump-white rounded-full py-4 items-center mb-6"
              onPress={handleMobileNumberPress}
            >
              <Text className="text-pump-black font-semibold text-base">Use mobile number</Text>
            </TouchableOpacity>
            
            <Text className="text-center text-pump-white text-sm">
              By signing up, you agree to our{' '}
              <Text className="text-pump-white underline">Terms</Text>
              . See how we use your data in our{' '}
              <Text className="text-pump-white underline">Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </BackgroundImage>
  );
};
