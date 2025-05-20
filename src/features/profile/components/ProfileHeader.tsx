import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  onEditPress: () => void;
}

export const ProfileHeader: React.FC<Props> = ({ profile, onEditPress }) => {
  return (
    <View>
      {/* Cover Image */}
      <View className="h-48 bg-pump-white/10">
        <Image
          source={
            profile.photos.find(p => !p.isMain)?.url
              ? { uri: profile.photos.find(p => !p.isMain)?.url }
              : { uri: 'https://via.placeholder.com/800x400' }
          }
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Profile Info */}
      <View className="px-6 pb-6 -mt-16">
        <View className="flex-row justify-between items-end mb-4">
          <Image
            source={
              profile.photos.find(p => p.isMain)?.url
                ? { uri: profile.photos.find(p => p.isMain)?.url }
                : { uri: 'https://via.placeholder.com/150' }
            }
            className="w-32 h-32 rounded-2xl border-4 border-pump-black"
          />
          <TouchableOpacity 
            className="bg-pump-orange px-6 py-3 rounded-xl flex-row items-center"
            onPress={onEditPress}
          >
            <Ionicons name="pencil" size={16} color="#FFFFFF" />
            <Text className="text-pump-white font-semibold ml-2">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-pump-white text-2xl font-bold">{profile.name}</Text>
          <Text className="text-pump-white/70 text-lg mb-2">{profile.bio}</Text>
          <Text className="text-pump-white/60 text-base mb-4">📍 {profile.location}</Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mt-6 bg-pump-white/5 p-4 rounded-xl">
          <View className="items-center flex-1">
            <Text className="text-pump-orange text-xl font-bold">{profile.stats?.workoutsCompleted || 0}</Text>
            <Text className="text-pump-white/60 text-sm">Workouts</Text>
          </View>
          <View className="items-center flex-1 border-x border-pump-white/10">
            <Text className="text-pump-orange text-xl font-bold">{profile.stats?.partneredSessions || 0}</Text>
            <Text className="text-pump-white/60 text-sm">Partners</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-pump-orange text-xl font-bold">{profile.stats?.rating || 0}</Text>
            <Text className="text-pump-white/60 text-sm">Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
