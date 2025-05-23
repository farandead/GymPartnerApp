import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'GenderVisibility'>;

export const GenderVisibilityScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [showOnProfile, setShowOnProfile] = useState(true);
  const selectedGender = route.params?.gender || '';
  const handleContinue = () => {
    console.log('Gender visibility:', { selectedGender, showOnProfile });
    navigation.navigate('Email');
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-3/4" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          Want to show your gender on your profile?
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-12">
          It's totally up to you whether you feel comfortable sharing this.
        </Text>

        {/* Shown as Section */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-pump-white mb-4">
            Shown as:
          </Text>
          <View className="bg-pump-orange/20 self-start rounded-full px-6 py-2">
            <Text className="text-pump-orange text-lg">{selectedGender}</Text>
          </View>
        </View>

        {/* Toggle Switch */}
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-xl text-pump-white">Show on profile</Text>
          <Switch
            value={showOnProfile}
            onValueChange={setShowOnProfile}
            trackColor={{ false: '#3f3f3f', true: '#ff6b00' }}
            thumbColor="#ffffff"
          />
        </View>

        {/* Continue Button - At bottom */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={true}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
