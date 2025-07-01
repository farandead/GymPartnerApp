import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface PhotoItem {
  uri: string;
  index: number;
}

interface PhotoGridProps {
  photos: PhotoItem[];
  onPhotosChange: (photos: PhotoItem[]) => void;
  maxPhotos?: number;
  showBestPhotoIndicator?: boolean;
  bestPhotoIndex?: number;
  onBestPhotoChange?: (index: number) => void;
  showDragHandle?: boolean;
  gridCols?: 2 | 3;
  aspectRatio?: [number, number];
  title?: string;
  showAddButton?: boolean;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 6,
  showBestPhotoIndicator = false,
  bestPhotoIndex = 0,
  onBestPhotoChange,
  showDragHandle = false,
  gridCols = 3,
  aspectRatio = [3, 4],
  title,
  showAddButton = true,
}) => {
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
        aspect: aspectRatio,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhoto = {
          uri: result.assets[0].uri,
          index,
        };

        const updatedPhotos = photos.filter(p => p.index !== index);
        const newPhotos = [...updatedPhotos, newPhoto].sort((a, b) => a.index - b.index);
        onPhotosChange(newPhotos);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error selecting your photo. Please try again."
      );
    }
  };

  const handlePhotoPress = (index: number) => {
    const existingPhoto = photos.find(p => p.index === index);
    
    if (existingPhoto) {
      // Photo exists, show delete option
      Alert.alert(
        "Photo Options",
        "What would you like to do with this photo?",
        [
          {
            text: "Delete",
            style: "destructive",
            onPress: () => handleRemovePhoto(index)
          },
          {
            text: "Replace",
            onPress: () => handleAddPhoto(index)
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      );
    } else {
      // No photo, add new one
      handleAddPhoto(index);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter(p => p.index !== index);
    onPhotosChange(updatedPhotos);
  };

  const handleBestPhotoPress = (index: number) => {
    if (showBestPhotoIndicator && onBestPhotoChange) {
      onBestPhotoChange(index);
    }
  };

  const getPhotoWidth = () => {
    if (gridCols === 2) return 'w-[48%]';
    return 'w-[31%]';
  };

  const renderPhotoBox = (index: number) => {
    const photo = photos.find(p => p.index === index);
    const isBestPhoto = showBestPhotoIndicator && bestPhotoIndex === index;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handlePhotoPress(index)}
        className={`${getPhotoWidth()} aspect-[${aspectRatio[0]}/${aspectRatio[1]}] rounded-2xl overflow-hidden ${
          photo ? 'bg-pump-white/10' : 'bg-pump-white/5'
        } ${isBestPhoto && photo ? 'border-2 border-pump-orange' : ''}`}
      >
        {photo ? (
          <View className="relative w-full h-full">
            <Image
              source={{ uri: photo.uri }}
              className="w-full h-full"
              resizeMode="cover"
            />
            
            {/* Drag handle */}
            {showDragHandle && (
              <TouchableOpacity className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full items-center justify-center">
                <MaterialIcons name="drag-indicator" size={14} color="white" />
              </TouchableOpacity>
            )}
            
            {/* Best photo indicator */}
            {isBestPhoto && (
              <View className="absolute top-2 left-2 bg-pump-orange rounded-full px-2 py-1">
                <Text className="text-white text-xs font-bold">Best</Text>
              </View>
            )}
            
            {/* Delete button (always visible on tap) */}
            <TouchableOpacity
              onPress={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 items-center justify-center"
              style={{ display: showDragHandle ? 'none' : 'flex' }}
            >
              <Text className="text-white text-xl">×</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Icon name="plus" size={gridCols === 2 ? 24 : 20} color="#FFFFFF30" />
            {gridCols === 3 && (
              <Text className="text-pump-white/30 text-xs mt-1">Add</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {title && (
        <Text className="text-pump-white text-lg font-semibold mb-4">
          {title}
        </Text>
      )}
      
      <View className={`flex-row flex-wrap ${gridCols === 2 ? 'justify-between' : 'justify-between'} gap-y-4`}>
        {Array.from({ length: maxPhotos }, (_, index) => renderPhotoBox(index))}
        
        {/* Add Photo Button (for profile screen style) */}
        {showAddButton && gridCols === 2 && photos.length < maxPhotos && (
          <TouchableOpacity 
            onPress={() => handleAddPhoto(photos.length)}
            className="w-[48%] aspect-[3/4] border-2 border-dashed border-pump-white/30 rounded-2xl items-center justify-center"
          >
            <Icon name="plus" size={24} color="#FFFFFF50" />
            <Text className="text-pump-white/50 text-sm mt-2">Add Photo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
