import React from 'react';
import { Text, View } from 'react-native';
import { WorkoutPreferences } from '../types';

interface Props {
  preferences: WorkoutPreferences;
}

export const GymPreferences: React.FC<Props> = ({ preferences }) => {
  return (
    <View className="p-6 border-t border-pump-white/10">
      <Text className="text-pump-white text-xl font-bold mb-4">Goals</Text>
      <View className="flex-row flex-wrap gap-2">
        {preferences.goals.map((goal) => (
          <View
            key={goal}
            className="bg-pump-orange/20 px-4 py-2 rounded-full"
          >
            <Text className="text-pump-orange">{goal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
