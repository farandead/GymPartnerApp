import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'WorkoutGoals'>;

type WorkoutGoal = {
  id: string;
  title: string;
  description: string;

};

export const WorkoutGoalsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set());

  const goals: WorkoutGoal[] = [
    {
      id: 'gym_buddy',
      title: 'A gym buddy',
      description: 'For regular sessions, motivation, and shared routines'
    
    },
    {
      id: 'mentor',
      title: 'A mentor or coach',
      description: 'Someone with experience who can guide or train you'
    },
    {
      id: 'challenge',
      title: 'A challenge partner',
      description: 'Friendly competition and fitness challenges to push you',

    },
    {
      id: 'class',
      title: 'A class companion',
      description: 'Someone to join yoga, HIIT, or spin classes with',
    
    },
    {
      id: 'social',
      title: 'A social fitness friend',
      description: 'For walks, casual workouts, and post-gym hangouts',
   
    }
  ];

  const toggleGoal = (goalId: string) => {
    const newSelected = new Set(selectedGoals);
    if (newSelected.has(goalId)) {
      newSelected.delete(goalId);
    } else {
      if (newSelected.size < 2) {
        newSelected.add(goalId);
      }
    }
    setSelectedGoals(newSelected);
  };

  const handleContinue = () => {
    if (selectedGoals.size > 0) {
      const selectedGoalsList = Array.from(selectedGoals).map(
        id => goals.find(goal => goal.id === id)!
      );
      console.log('Selected goals:', selectedGoalsList);
      // Will implement in next PR
      // navigation.navigate('NextScreen', { goals: selectedGoalsList });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[98%]" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          And what are you hoping to find?
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-8">
          It's your fitness journey, so choose 1 or 2 options that feel right for you.
        </Text>

        {/* Goals List */}
       <View>
  {goals.map((goal, index) => (
    <View key={goal.id} className={index !== goals.length - 1 ? 'mb-3' : ''}>
      <TouchableOpacity
        className={`p-4 rounded-xl flex-row items-center ${
          selectedGoals.has(goal.id)
            ? 'bg-pump-orange/20'
            : 'bg-pump-white/10'
        }`}
        onPress={() => toggleGoal(goal.id)}
      >
        <View className="flex-1 mr-3">
          <Text
            className={`text-lg font-semibold ${
              selectedGoals.has(goal.id)
                ? 'text-pump-orange'
                : 'text-pump-white'
            }`}
          >
            {goal.title}
          </Text>
          <Text
            className={
              selectedGoals.has(goal.id)
                ? 'text-pump-orange/80'
                : 'text-pump-white/70'
            }
          >
            {goal.description}
          </Text>
        </View>
        <View
          className={`w-6 h-6 rounded border-2 ${
            selectedGoals.has(goal.id)
              ? 'border-pump-orange bg-pump-orange'
              : 'border-pump-white/50 bg-transparent'
          } items-center justify-center`}
        >
          {selectedGoals.has(goal.id) && (
            <Text className="text-pump-white text-sm">✓</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  ))}
</View>


        {/* Info Note */}
        <View className="flex-row items-center mt-8">
          <View className="w-5 h-5 rounded-full border border-pump-white/60 items-center justify-center mr-2">
                      <Text className="text-pump-white/60">i</Text>
                    </View>
          <Text className="text-pump-white/60 flex-1">
            This will show on your profile to help everyone find the right match for their fitness journey.
          </Text>
        </View>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={selectedGoals.size > 0}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
