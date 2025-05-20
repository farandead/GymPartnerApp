import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'InterestsSelection'>;

interface Interest {
  id: string;
  emoji: string;
  label: string;
}

export const InterestsSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

  const interests: Interest[] = [
    { id: 'weightlifting', emoji: '🏋️‍♂️', label: 'Weightlifting' },
    { id: 'yoga', emoji: '🧘', label: 'Yoga' },
    { id: 'running', emoji: '🏃', label: 'Running' },
    { id: 'bouldering', emoji: '🧗‍♂️', label: 'Bouldering' },
    { id: 'spinning', emoji: '🚴', label: 'Spinning' },
    { id: 'calisthenics', emoji: '🤸', label: 'Calisthenics' },
    { id: 'boxing', emoji: '🥊', label: 'Boxing' },
    { id: 'surfTraining', emoji: '🏄', label: 'Surf Training' },
    { id: 'martialArts', emoji: '🥋', label: 'Martial Arts' },
    { id: 'swimming', emoji: '🏊', label: 'Swimming' },
    { id: 'basketball', emoji: '⛹️', label: 'Basketball' },
    { id: 'golfFitness', emoji: '🏌️', label: 'Golf Fitness' },
    { id: 'strengthTraining', emoji: '📈', label: 'Strength Training' },
    { id: 'hiit', emoji: '🪜', label: 'HIIT' },
    { id: 'crossfit', emoji: '🔄', label: 'CrossFit' },
    { id: 'outdoorWorkouts', emoji: '🏔️', label: 'Outdoor Workouts' },
    { id: 'groupClasses', emoji: '👯', label: 'Group Classes' },
    { id: 'nutrition', emoji: '🍎', label: 'Nutrition' },
    { id: 'bodybuilding', emoji: '💪', label: 'Bodybuilding' },
    { id: 'mindfulness', emoji: '🧠', label: 'Mindfulness' },
    { id: 'coldPlunge', emoji: '🧊', label: 'Cold Plunge' },
    { id: 'morningRoutines', emoji: '🌞', label: 'Morning Routines' },
    { id: 'nightOwl', emoji: '🌃', label: 'Night Owl Workouts' },
    { id: 'musicWorkouts', emoji: '🎶', label: 'Workout with Music' },
    { id: 'progress', emoji: '📊', label: 'Progress Tracking' },
  ];

  const filteredInterests = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return interests.filter(
      interest => interest.label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleInterest = (id: string) => {
    const newSelected = new Set(selectedInterests);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else if (newSelected.size < 5) {
      newSelected.add(id);
    }
    setSelectedInterests(newSelected);
  };

  const handleContinue = () => {
    if (selectedInterests.size > 0) {
      const selectedInterestsList = Array.from(selectedInterests).map(
        id => interests.find(interest => interest.id === id)!
      );
      console.log('Selected interests:', selectedInterestsList);
      // Navigate to the next screen
      navigation.navigate('PersonalQuestions');
    }
  };

  const handleSkip = () => {
    navigation.navigate('PersonalQuestions');
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[85%]" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          Choose 5 things you're really into
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-8">
          Add interests to your profile to help you match with people who share your fitness passions.
        </Text>

        {/* Search Input */}
        <View className="mb-8">
          <View className="flex-row items-center bg-pump-white/10 rounded-xl px-4 py-3">
            <Text className="text-pump-white/50 text-xl mr-2">🔍</Text>
            <TextInput
              className="flex-1 text-lg text-pump-white"
              placeholder="What are you into?"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Interests Section */}
        <View className="mb-4">
          <Text className="text-xl font-semibold text-pump-white mb-4">
            You might like...
          </Text>
        </View>

        {/* Interests Grid */}
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap gap-2 pb-24">
            {filteredInterests.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                onPress={() => toggleInterest(interest.id)}
                className={`flex-row items-center rounded-full px-4 py-2 border ${
                  selectedInterests.has(interest.id)
                    ? 'bg-pump-orange/20 border-pump-orange'
                    : 'border-pump-white/20'
                }`}
              >
                <Text className="text-lg mr-2">{interest.emoji}</Text>
                <Text
                  className={`text-lg ${
                    selectedInterests.has(interest.id)
                      ? 'text-pump-orange font-semibold'
                      : 'text-pump-white'
                  }`}
                >
                  {interest.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Counter */}
        <View className="absolute bottom-8 left-5">
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-pump-white/90 text-lg font-semibold">Skip</Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-8 right-24">
          <Text className="text-pump-white/70 text-lg">
            {selectedInterests.size}/5 selected
          </Text>
        </View>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={selectedInterests.size > 0}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};