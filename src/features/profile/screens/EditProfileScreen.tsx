import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from '../../../types/navigation';
import { UserProfile } from '../types';

type Props = StackScreenProps<ProfileStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [originalProfile, setOriginalProfile] = useState<Partial<UserProfile>>();
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: 'John Doe',
    bio: 'Fitness enthusiast',
    age: 25,
    location: 'New York, NY',
    photos: [],
    workoutPreferences: {
      experience: 'Intermediate',
      frequency: '3-4 times/week',
      preferredTime: ['Evening'],
      style: 'Partner',
      goals: ['Strength', 'Muscle gain'],
    },
    socialLinks: {
      instagram: '@johndoe',
      strava: 'johndoe',
    },
  });

  const [errors, setErrors] = useState<{
    name?: string;
    bio?: string;
  }>();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      // TODO: Load profile from API
      // For now using mock data
      const mockProfile = { ...profile };
      setProfile(mockProfile);
      setOriginalProfile(mockProfile);
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!profile.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!profile.bio?.trim()) {
      newErrors.bio = 'Bio is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);
    if (hasChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to discard them?',
        [
          {
            text: 'Keep Editing',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Needed',
        'We need access to your photos to add images to your profile.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhoto = {
          id: Date.now().toString(),
          url: result.assets[0].uri,
          type: 'profile' as const,
          isMain: !profile.photos?.length,
        };

        setProfile(prev => ({
          ...prev,
          photos: [...(prev.photos || []), newPhoto],
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add photo');
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setProfile(prev => ({
              ...prev,
              photos: prev.photos?.filter(p => p.id !== photoId) || [],
            }));
          },
        },
      ]
    );
  };

  const handleGoalToggle = (goal: string) => {
    const currentGoals = profile.workoutPreferences?.goals || [];
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
      
    setProfile(prev => ({
      ...prev,
      workoutPreferences: {
        ...prev.workoutPreferences,
        goals: newGoals,
      },
    }));
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
      <View className="flex-row items-center justify-between p-4 border-b border-pump-white/10">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-pump-white text-lg font-semibold">Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-pump-orange">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Photo Section */}
        <View className="p-4">
          <Text className="text-pump-white/60 text-base mb-4">Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Add Photo Button */}
            <TouchableOpacity
              className="w-24 h-24 bg-pump-white/10 rounded-xl mr-4 items-center justify-center"
              onPress={handleAddPhoto}
            >
              <Ionicons name="add" size={32} color="#FF8600" />
            </TouchableOpacity>
            {/* Photo List */}
            {profile.photos?.map((photo, index) => (
              <View key={photo.id} className="relative mr-4">
                <Image
                  source={{ uri: photo.url }}
                  className="w-24 h-24 rounded-xl"
                />
                <TouchableOpacity
                  className="absolute top-2 right-2 bg-pump-black/50 rounded-full p-1"
                  onPress={() => handleDeletePhoto(photo.id)}
                >
                  <Ionicons name="trash" size={16} color="#FF8600" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Basic Info Section */}
        <View className="p-4 border-t border-pump-white/10">
          <Text className="text-pump-white/60 text-base mb-4">Basic Info</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-pump-white/60 text-sm mb-2">Name</Text>
              <TextInput
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                className="bg-pump-white/10 rounded-xl p-4 text-pump-white"
              />
              {errors?.name && (
                <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
              )}
            </View>
            <View>
              <Text className="text-pump-white/60 text-sm mb-2">Bio</Text>
              <TextInput
                value={profile.bio}
                onChangeText={(text) => setProfile({ ...profile, bio: text })}
                multiline
                numberOfLines={4}
                className="bg-pump-white/10 rounded-xl p-4 text-pump-white"
              />
              {errors?.bio && (
                <Text className="text-red-500 text-sm mt-1">{errors.bio}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Workout Preferences Section */}
        <View className="p-4 border-t border-pump-white/10">
          <Text className="text-pump-white/60 text-base mb-4">Workout Preferences</Text>
          <View className="space-y-4">
            {/* Experience Level */}
            <View>
              <Text className="text-pump-white/60 text-sm mb-2">Experience Level</Text>
              <View className="flex-row space-x-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() =>
                      setProfile({
                        ...profile,
                        workoutPreferences: {
                          ...profile.workoutPreferences,
                          experience: level as 'Beginner' | 'Intermediate' | 'Advanced',
                        },
                      })
                    }
                    className={`px-4 py-2 rounded-full ${
                      profile.workoutPreferences?.experience === level
                        ? 'bg-pump-orange'
                        : 'bg-pump-white/10'
                    }`}
                  >
                    <Text className="text-pump-white">{level}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Goals */}
            <View>
              <Text className="text-pump-white/60 text-sm mb-2">Goals</Text>
              <View className="flex-row flex-wrap gap-2">
                {['Strength', 'Muscle gain', 'Weight loss', 'Endurance'].map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    onPress={() => handleGoalToggle(goal)}
                    className={`px-4 py-2 rounded-full ${
                      profile.workoutPreferences?.goals.includes(goal)
                        ? 'bg-pump-orange'
                        : 'bg-pump-white/10'
                    }`}
                  >
                    <Text className="text-pump-white">{goal}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Social Links */}
        <View className="p-4 border-t border-pump-white/10">
          <Text className="text-pump-white/60 text-base mb-4">Social Links</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-pump-white/60 text-sm mb-2">Instagram</Text>
              <TextInput
                value={profile.socialLinks?.instagram}
                onChangeText={(text) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, instagram: text },
                  })
                }
                className="bg-pump-white/10 rounded-xl p-4 text-pump-white"
              />
            </View>
            <View>
              <Text className="text-pump-white/60 text-sm mb-2">Strava</Text>
              <TextInput
                value={profile.socialLinks?.strava}
                onChangeText={(text) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, strava: text },
                  })
                }
                className="bg-pump-white/10 rounded-xl p-4 text-pump-white"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
