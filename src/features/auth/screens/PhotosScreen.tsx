import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Photos'>;

interface PhotoItem {
  uri: string;
  index: number;
}

export const PhotosScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  const handleAddPhoto = async (index: number) => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "We need access to your photos to continue. Please enable it in your settings."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhoto = {
          uri: result.assets[0].uri,
          index,
        };

        setPhotos(prev => {
          const filtered = prev.filter(p => p.index !== index);
          return [...filtered, newPhoto].sort((a, b) => a.index - b.index);
        });
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error selecting your photo. Please try again."
      );
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter(p => p.index !== index));
  };

  const handleContinue = () => {
    if (photos.length >= 4) {
      // Navigate to next screen with photos
      navigation.navigate('PersonalQuestions');
    }
  };

  const renderPhotoBox = (index: number) => {
    const photo = photos.find(p => p.index === index);

    return (
      <TouchableOpacity
        onPress={() => handleAddPhoto(index)}
        className={`aspect-square rounded-2xl overflow-hidden ${
          photo ? 'bg-pump-white/10' : 'bg-pump-white/5'
        }`}
      >
        {photo ? (
          <View className="relative w-full h-full">
            <Image
              source={{ uri: photo.uri }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 items-center justify-center"
            >
              <Text className="text-white text-xl">×</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-4xl text-pump-white/30">+</Text>
          </View>
        )}
      </TouchableOpacity>
    );
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
        </Text>

        {/* Photo Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {[0, 1, 2, 3, 4, 5].map(index => (
            <View key={index} className="w-[31%]">
              {renderPhotoBox(index)}
            </View>
          ))}
        </View>

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
