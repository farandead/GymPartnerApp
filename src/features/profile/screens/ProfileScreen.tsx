import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from '../../../types/navigation';
import { GymPreferences } from '../components/GymPreferences';
import { ProfileHeader } from '../components/ProfileHeader';
import { WorkoutStats } from '../components/WorkoutStats';
import { UserProfile, defaultProfile } from '../types';

type Props = StackScreenProps<ProfileStackParamList, 'MyProfile'>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      // TODO: Load from API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile({
        name: 'John Doe',
        bio: 'Passionate about fitness and looking for workout partners! 💪',
        age: 28,
        location: 'New York, NY',
        photos: [
          {
            id: '1',
            url: 'https://via.placeholder.com/400',
            type: 'profile',
            isMain: true,
          },
        ],
        workoutPreferences: {
          experience: 'Intermediate',
          frequency: '4-5 times/week',
          preferredTime: ['Evening', 'Weekend'],
          style: 'Partner',
          goals: ['Strength', 'Muscle gain'],
        },
        stats: {
          workoutsCompleted: 85,
          partneredSessions: 12,
          streak: 7,
          rating: 4.9,
        },
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-pump-black items-center justify-center">
        <ActivityIndicator color="#FF8600" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <ScrollView stickyHeaderIndices={[0]}>
        {/* Header with Settings Button */}
        <View className="flex-row justify-between items-center px-5 py-4 bg-pump-black">
          <Text className="text-2xl font-bold text-pump-white">Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            className="w-10 h-10 items-center justify-center rounded-full bg-pump-white/10"
          >
            <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Content */}
        <View className="flex-1">
          <ProfileHeader
            profile={profile}
            onEditPress={() => navigation.navigate('EditProfile')}
          />
          <WorkoutStats stats={profile.stats} preferences={profile.workoutPreferences} />
          <GymPreferences preferences={profile.workoutPreferences} />

          {/* Action Buttons */}
          <View className="flex-row justify-between px-6 py-4">
            <TouchableOpacity
              className="flex-1 mr-2 py-3 rounded-xl bg-pump-orange/20"
              onPress={() => {/* TODO: Share Profile */}}
            >
              <Text className="text-pump-orange text-center font-semibold">
                Share Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 ml-2 py-3 rounded-xl bg-pump-orange"
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text className="text-pump-white text-center font-semibold">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
