import React from 'react';
import { Text, View } from 'react-native';

export const WorkoutStats: React.FC = () => {
  return (
    <View className="p-6">
      <Text className="text-pump-white text-xl font-bold mb-4">Workout Stats</Text>
      <View className="flex-row flex-wrap justify-between">
        <StatItem title="Experience" value="Intermediate" />
        <StatItem title="Workouts/Week" value="4-5" />
        <StatItem title="Preferred Time" value="Evening" />
        <StatItem title="Style" value="Partner" />
      </View>
    </View>
  );
};

const StatItem: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <View className="bg-[#2A2E35] p-4 rounded-lg mb-4 w-[48%]">
    <Text className="text-pump-white/60 text-sm">{title}</Text>
    <Text className="text-pump-white text-lg font-semibold mt-1">{value}</Text>
  </View>
);
