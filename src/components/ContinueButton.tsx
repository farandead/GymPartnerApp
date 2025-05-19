import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { classNames } from '../utils/styleUtils';

interface ContinueButtonProps {
  onPress: () => void;
  isEnabled?: boolean;
  className?: string;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onPress,
  isEnabled = true,
  className = ''
}) => {
  return (
    <View className={classNames('w-14 h-14', className)}>
      <TouchableOpacity
        className={`w-full h-full rounded-full items-center justify-center ${
          isEnabled ? 'bg-pump-orange' : 'bg-pump-white/30'
        }`}
        onPress={onPress}
        disabled={!isEnabled}
      >
        <View className="items-center justify-center">
          <Text className="text-pump-white text-2xl font-bold">→</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};