import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import QRCodeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PhotoGrid, PhotoItem } from '../../../components/PhotoGrid';
import { ProfileStackParamList } from '../../../types/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'MyProfile'>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [bestPhotoIndex, setBestPhotoIndex] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profilePhotos, setProfilePhotos] = useState<PhotoItem[]>([
    { uri: 'https://images.unsplash.com/photo-1494790108755-2616b6b44c4d?w=300&h=400&fit=crop&crop=face', index: 0 },
    { uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop', index: 1 },
    { uri: 'https://images.unsplash.com/photo-1544348817-69f76a8a25f9?w=300&h=400&fit=crop', index: 2 },
    { uri: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=300&h=400&fit=crop', index: 3 },
  ]);

  // Mock user data - in real app this would come from context/state
  const user = {
    name: 'Joanna',
    age: 28,
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b6b44c4d?w=200&h=200&fit=crop&crop=face',
    isVerified: true,
    completionPercentage: 85,
    location: 'New York',
    bio: 'Fitness enthusiast and yoga lover. Looking for a workout partner who shares my passion for healthy living!',
    interests: [
      { emoji: '🏋️‍♀️', label: 'Weight Training' },
      { emoji: '🧘‍♀️', label: 'Yoga' },
      { emoji: '🏃‍♀️', label: 'Running' },
      { emoji: '🥊', label: 'Boxing' },
    ],
  };

  const availableInterests = [
    { emoji: '🏋️‍♀️', label: 'Weight Training' },
    { emoji: '🧘‍♀️', label: 'Yoga' },
    { emoji: '🏃‍♀️', label: 'Running' },
    { emoji: '🥊', label: 'Boxing' },
    { emoji: '🚴‍♀️', label: 'Cycling' },
    { emoji: '🏊‍♀️', label: 'Swimming' },
    { emoji: '⛹️‍♀️', label: 'Basketball' },
    { emoji: '🧗‍♀️', label: 'Climbing' },
    { emoji: '🤸‍♀️', label: 'Gymnastics' },
    { emoji: '🏸', label: 'Badminton' },
  ];

  const handlePhotosChange = (newPhotos: PhotoItem[]) => {
    setProfilePhotos(newPhotos);
  };

  const handleBestPhotoChange = (index: number) => {
    setBestPhotoIndex(index);
  };

  const renderProfileHeader = () => (
    <View className="px-5 py-6">
      {/* Profile Picture, Name, and Actions Row */}
      <View className="flex-row items-center justify-between mb-4">
        {/* Profile Picture and Info */}
        <View className="flex-row items-center flex-1">
          <View className="relative">
            <Image 
              source={{ uri: user.profileImage }}
              className="w-20 h-20 rounded-full"
              resizeMode="cover"
            />
            {/* Verification Badge */}
            {user.isVerified && (
              <View className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full items-center justify-center border-2 border-white">
                <Icon name="check" size={12} color="white" />
              </View>
            )}
          </View>
          
          {/* Name and Age */}
          <View className="ml-4 flex-1">
            <Text className="text-pump-white text-2xl font-bold">
              {user.name}, {user.age}
            </Text>
            <Text className="text-pump-white/70 text-base">
              {user.location}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3">          {/* QR Code Button */}
          <TouchableOpacity className="w-12 h-12 bg-pump-white/10 rounded-full items-center justify-center">
            <QRCodeIcon name="qrcode" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Settings Button */}
          <TouchableOpacity 
            className="w-12 h-12 bg-pump-white/10 rounded-full items-center justify-center"
            onPress={() => {
              console.log('Settings button pressed');
              navigation.navigate('Settings');
            }}
          >
            <Icon name="settings" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Completion Progress */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-pump-white/80 text-sm font-medium">
            Profile Completion
          </Text>
          <Text className="text-pump-orange text-sm font-bold">
            {user.completionPercentage}%
          </Text>
        </View>
        
        {/* Progress Bar */}
        <View className="w-full h-2 bg-pump-white/10 rounded-full overflow-hidden">
          <View 
            className="h-full bg-pump-orange rounded-full" 
            style={{ width: `${user.completionPercentage}%` }}
          />
        </View>
          {/* Completion Status Text */}
        <Text className="text-pump-white/60 text-xs mt-2">
          {user.completionPercentage < 100 
            ? `${100 - user.completionPercentage}% left to complete your profile`
            : 'Your profile is complete!'
          }
        </Text>
      </View>
    </View>
  );

  const renderProfileStrength = () => (
    <View className="mx-5 mb-6 bg-pump-white/5 rounded-2xl p-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-pump-white text-lg font-semibold">
          Profile Strength
        </Text>
        <TouchableOpacity>
          <Icon name="info" size={18} color="#FFFFFF80" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row items-center mb-3">
        <View className="flex-1 h-2 bg-pump-white/10 rounded-full mr-3">
          <View 
            className="h-full bg-pump-orange rounded-full" 
            style={{ width: `${user.completionPercentage}%` }}
          />
        </View>
        <Text className="text-pump-orange text-sm font-bold">
          {user.completionPercentage}%
        </Text>
      </View>
      
      <Text className="text-pump-white/70 text-sm mb-4">
        Complete your profile to get more matches
      </Text>
      
      <TouchableOpacity className="bg-pump-orange/20 border border-pump-orange rounded-full py-3 items-center">
        <Text className="text-pump-orange font-semibold">Improve Profile</Text>
      </TouchableOpacity>
    </View>
  );
  const renderPhotosAndVideos = () => (
    <View className="mx-5 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-pump-white text-lg font-semibold">
          Photos & Videos
        </Text>
        <TouchableOpacity>
          <Icon name="plus" size={20} color="#FF6B35" />
        </TouchableOpacity>
      </View>
      
      {/* Best Photo Toggle */}
      <View className="flex-row items-center justify-between mb-4 bg-pump-white/5 rounded-xl p-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-pump-orange/20 rounded-full items-center justify-center mr-3">
            <Icon name="star" size={18} color="#FF6B35" />
          </View>
          <View>
            <Text className="text-pump-white font-semibold">Best Photo</Text>
            <Text className="text-pump-white/70 text-xs">
              Choose your best photo to show first
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-pump-orange rounded-full px-4 py-2">
          <Text className="text-pump-white text-sm font-semibold">Set</Text>
        </TouchableOpacity>
      </View>

      {/* Photo Grid */}
      <PhotoGrid
        photos={profilePhotos}
        onPhotosChange={handlePhotosChange}
        maxPhotos={6}
        showBestPhotoIndicator={true}
        bestPhotoIndex={bestPhotoIndex}
        onBestPhotoChange={handleBestPhotoChange}
        showDragHandle={true}
        gridCols={2}
        aspectRatio={[3, 4]}
        showAddButton={true}
      />
    </View>
  );

  const renderGetVerified = () => (
    <View className="mx-5 mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30">
      <View className="flex-row items-center mb-3">
        <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
          <Icon name="check" size={18} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-pump-white text-lg font-semibold">
            Get Verified
          </Text>
          <Text className="text-pump-white/70 text-sm">
            Boost your credibility and get more matches
          </Text>
        </View>
      </View>
      
      <View className="space-y-3 mb-4">
        <View className="flex-row items-center">
          <Icon name="check-circle" size={16} color="#10B981" />
          <Text className="text-pump-white/80 text-sm ml-2">Photo verification</Text>
        </View>
        <View className="flex-row items-center">
          <Icon name="check-circle" size={16} color="#10B981" />
          <Text className="text-pump-white/80 text-sm ml-2">Phone number verification</Text>
        </View>
        <View className="flex-row items-center">
          <Icon name="circle" size={16} color="#6B7280" />
          <Text className="text-pump-white/60 text-sm ml-2">Social media verification</Text>
        </View>
      </View>
      
      <TouchableOpacity className="bg-blue-500 rounded-full py-3 items-center">
        <Text className="text-white font-semibold">Start Verification</Text>
      </TouchableOpacity>
    </View>
  );

  const renderInterestsSection = () => (
    <View className="mx-5 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-pump-white text-lg font-semibold">
          My Interests
        </Text>
        <TouchableOpacity onPress={() => Alert.alert('Add Interest', 'Feature coming soon!')}>
          <Icon name="plus" size={20} color="#FF6B35" />
        </TouchableOpacity>
<<<<<<< HEAD
      </View>      
      <View className="flex-row flex-wrap gap-2 mb-4">
        {user.interests.map((interest, index) => (
=======
      </View>
      
      <View className="flex-row flex-wrap gap-2 mb-4">        {user.interests.map((interest, index) => (
>>>>>>> dev
          <TouchableOpacity 
            key={index} 
            className="flex-row items-center bg-pump-orange/20 border border-pump-orange rounded-full px-3 py-2"
            onPress={() => Alert.alert('Remove Interest', `Remove ${interest.label}?`)}
          >
            <Text className="text-base mr-2">{interest.emoji}</Text>
            <Text className="text-pump-orange text-sm font-medium">{interest.label}</Text>
            <View className="ml-2">
              <Icon name="x" size={14} color="#FF6B35" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text className="text-pump-white/70 text-sm mb-3">Suggested for you:</Text>
<<<<<<< HEAD
      <View className="flex-row flex-wrap gap-2">        {availableInterests
          .filter(interest => !user.interests.some(userInterest => userInterest.label === interest.label))
          .slice(0, 6)
          .map((interest, index) => (
=======
      <View className="flex-row flex-wrap gap-2">
        {availableInterests
          .filter(interest => !user.interests.some(userInterest => userInterest.label === interest.label))
          .slice(0, 6)          .map((interest, index) => (
>>>>>>> dev
            <TouchableOpacity 
              key={index} 
              className="flex-row items-center bg-pump-white/10 rounded-full px-3 py-2"
              onPress={() => Alert.alert('Add Interest', `Add ${interest.label}?`)}
            >
              <Text className="text-base mr-2">{interest.emoji}</Text>
              <Text className="text-pump-white/80 text-sm">{interest.label}</Text>
              <View className="ml-2">
                <Icon name="plus" size={14} color="#FFFFFF80" />
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
  const renderBio = () => (
    <View className="px-5 mb-6">
      <Text className="text-pump-white text-base leading-6">
        {user.bio}
      </Text>
    </View>
  );

  const renderActionButtons = () => (
    <View className="px-5 py-6 space-y-3">
      <TouchableOpacity className="bg-pump-orange rounded-full py-4 items-center">
        <Text className="text-pump-white text-lg font-semibold">
          Edit Profile
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="bg-pump-white/10 rounded-full py-4 items-center">
        <Text className="text-pump-white text-lg font-semibold">
          Share Profile
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
<<<<<<< HEAD
    <SafeAreaView edges={['top']} className="flex-1 bg-pump-black">      {/* Header */}
      <View className="px-5 py-4 border-b border-pump-white/10">
        <Text className="text-pump-white text-xl font-semibold">Profile</Text>
      </View>
      
      <ScrollView
=======
    <SafeAreaView edges={['top']} className="flex-1 bg-pump-black">
      {/* Header */}
      <View className="px-5 py-4 border-b border-pump-white/10">
        <Text className="text-pump-white text-xl font-semibold">Profile</Text>
      </View>      <ScrollView 
>>>>>>> dev
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {renderProfileHeader()}
        {renderBio()}
        {renderProfileStrength()}
        {renderPhotosAndVideos()}
        {renderGetVerified()}
        {renderInterestsSection()}
        {renderActionButtons()}
      </ScrollView>
    </SafeAreaView>
  );
};
