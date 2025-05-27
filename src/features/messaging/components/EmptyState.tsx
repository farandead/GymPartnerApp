import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const EmptyState: React.FC<Props> = ({
  title,
  message,
  icon = 'chatbubbles-outline',
}) => {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="w-20 h-20 rounded-full bg-pump-white/10 items-center justify-center mb-4">
        <Ionicons name={icon} size={32} color="#FF8600" />
      </View>
      <Text className="text-pump-white text-xl font-bold text-center mb-2">
        {title}
      </Text>
      <Text className="text-pump-white/60 text-base text-center">
        {message}
      </Text>
    </View>
  );
};
