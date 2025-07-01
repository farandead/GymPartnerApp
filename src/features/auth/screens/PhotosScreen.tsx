import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { PhotoGrid, PhotoItem } from '../../../components/PhotoGrid';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Photos'>;

export const PhotosScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  const handlePhotosChange = (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
  };

  const handleContinue = () => {
    if (photos.length >= 4) {
      // Navigate to next screen with photos
      navigation.navigate('PersonalQuestions');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[65%]" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          Time to put a face to the name
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-8">
          You do you! Add at least 4 photos, whether it's you with your pet, eating your fave food, or in a place you love.
        </Text>        {/* Photo Grid */}
        <PhotoGrid
          photos={photos}
          onPhotosChange={handlePhotosChange}
          maxPhotos={6}
          gridCols={3}
          aspectRatio={[1, 1]}
          showAddButton={false}
        />

        {/* Photo Tips */}
        <View className="mt-auto mb-24">
          <TouchableOpacity
            onPress={() => {/* Navigate to photo tips */}}
            className="flex-row items-center space-x-3 bg-pump-white/5 rounded-xl p-4"
          >
            <View className="w-12 h-12 rounded-xl bg-pump-black items-center justify-center">
              <Text className="text-2xl">📷</Text>
            </View>
            <View className="flex-1">
              <Text className="text-pump-white font-medium text-base">
                Want to make sure you really shine?
              </Text>
              <Text className="text-pump-white/70 underline">
                Check out our photo tips
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={photos.length >= 4}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
