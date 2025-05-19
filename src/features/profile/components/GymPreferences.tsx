import React from 'react';
import { Text, View } from 'react-native';

export const GymPreferences: React.FC = () => {
  const preferences = {
    activities: ['Weight Training', 'HIIT', 'Cardio'],
    goals: ['Muscle Gain', 'Strength'],
    schedule: ['Weekday Evenings', 'Weekend Mornings'],
  };

  return (
    <View className="p-6">
      <Text className="text-pump-white text-xl font-bold mb-4">Gym Preferences</Text>
      <PreferenceSection title="Activities" items={preferences.activities} />
      <PreferenceSection title="Goals" items={preferences.goals} />
      <PreferenceSection title="Schedule" items={preferences.schedule} />
    </View>
  );
};

const PreferenceSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <View className="mb-6">
    <Text className="text-pump-white/60 text-base mb-3">{title}</Text>
    <View className="flex-row flex-wrap">
      {items.map((item, index) => (
        <View key={index} className="bg-pump-orange px-4 py-2 rounded-full mr-2 mb-2">
          <Text className="text-pump-white">{item}</Text>
        </View>
      ))}
    </View>
  </View>
);
