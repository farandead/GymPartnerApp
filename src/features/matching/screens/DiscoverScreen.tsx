import { useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface UserProfile {
  id: string;
  name: string;
  age: number;
  distance: string;
  bio: string;
  interests: Array<{
    emoji: string;
    label: string;
  }>;
  photos: string[];
}

const DUMMY_PROFILE: UserProfile = {
  id: '1',
  name: 'Sarah',
  age: 28,
  distance: '3 miles away',
  bio: 'Morning workout enthusiast 🌅 Looking for a gym partner who loves HIIT and doesn\'t skip leg day 💪',
  interests: [
    { emoji: '🏋️‍♀️', label: 'Weight Training' },
    { emoji: '🧘‍♀️', label: 'Yoga' },
    { emoji: '🏃‍♀️', label: 'Running' },
  ],
  photos: ['https://example.com/photo1.jpg'] // Replace with actual photo URLs
};

export const DiscoverScreen = () => {
  const [currentProfile] = useState<UserProfile>(DUMMY_PROFILE);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      rotate.value = translateX.value / SCREEN_WIDTH * 60;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        translateX.value = withSpring(Math.sign(event.translationX) * SCREEN_WIDTH * 1.5);
        translateY.value = withSpring(0);
        // Handle match or pass based on direction
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const renderUserCard = () => {
    return (
      <Animated.View style={[cardStyle, { 
        width: SCREEN_WIDTH - 32, 
        height: SCREEN_WIDTH * 1.4,
        borderRadius: 20,
        backgroundColor: '#1B2021',
        overflow: 'hidden',
      }]}>
        <View className="flex-1">
          {/* Profile Image */}
          <View className="w-full h-3/4 bg-pump-white/10">
            <Image
              source={require('../../../assets/images/sample-bg.jpg')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Profile Info */}
          <View className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
            <Text className="text-pump-white text-3xl font-bold">
              {currentProfile.name}, {currentProfile.age}
            </Text>
            <Text className="text-pump-white/70 text-lg mb-2">
              {currentProfile.distance}
            </Text>

            {/* Interests */}
            <View className="flex-row flex-wrap gap-2 mt-2">
              {currentProfile.interests.map((interest, index) => (
                <View key={index} className="flex-row items-center bg-pump-white/20 rounded-full px-3 py-1">
                  <Text>{interest.emoji}</Text>
                  <Text className="text-pump-white ml-1">{interest.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 items-center justify-center">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          {renderUserCard()}
        </PanGestureHandler>

        {/* Action Buttons */}
        <View className="flex-row justify-evenly w-full mt-8 px-8">
          <TouchableOpacity className="w-16 h-16 rounded-full bg-red-500 items-center justify-center">
            <Icon name="x" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="w-16 h-16 rounded-full bg-yellow-400 items-center justify-center">
            <Icon name="star" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="w-16 h-16 rounded-full bg-green-500 items-center justify-center">
            <Icon name="check" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
