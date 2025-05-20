import React from 'react';
import { Text, View } from 'react-native';
import { WorkoutPreferences, WorkoutStats as WorkoutStatsType } from '../types';

interface Props {
  stats?: WorkoutStatsType;
  preferences: WorkoutPreferences;
}

export const WorkoutStats: React.FC<Props> = ({ stats, preferences }) => {
  return (
    <View className="p-6 border-t border-pump-white/10">
      <Text className="text-pump-white text-xl font-bold mb-4">Workout Stats</Text>
      <View className="flex-row flex-wrap justify-between">
        <StatItem title="Experience" value={preferences.experience} />
        <StatItem title="Workouts/Week" value={preferences.frequency} />
        <StatItem title="Preferred Time" value={preferences.preferredTime[0]} />
        <StatItem title="Style" value={preferences.style} />
        {stats?.streak ? <StatItem title="Current Streak" value={`${stats.streak} days`} /> : null}
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
