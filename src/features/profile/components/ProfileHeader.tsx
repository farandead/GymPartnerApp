import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ProfileStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<ProfileStackParamList, 'MyProfile'>;

export const ProfileHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="items-center p-6">
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        className="w-32 h-32 rounded-full mb-4"
      />
      <Text className="text-pump-white text-2xl font-bold mb-2">John Doe</Text>
      <Text className="text-pump-white text-base mb-4">💪 Fitness Enthusiast</Text>
      <TouchableOpacity 
        className="bg-pump-orange px-6 py-2 rounded-full"
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text className="text-pump-white font-semibold">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
