import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { classNames } from '../utils/styleUtils';

interface ContinueButtonProps {
  onPress: () => void;
  isEnabled?: boolean;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
  accessible?: boolean;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onPress,
  isEnabled = true,
  className = '',
  testID = 'continue-button',
  accessibilityLabel = 'Continue',
  accessible = true,
  accessibilityState,
  ...props
}) => {
  return (
    <View className={classNames('w-14 h-14', className)}>      <TouchableOpacity 
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessible={accessible}
        accessibilityState={{
          disabled: !isEnabled,
          ...accessibilityState
        }}
        className={`w-full h-full rounded-full items-center justify-center ${
          isEnabled ? 'bg-pump-orange' : 'bg-pump-white/30'
        }`}
        onPress={onPress}
        disabled={!isEnabled}
        {...props}
      >
        <View className="items-center justify-center">
          <Text className="text-pump-white text-2xl font-bold">→</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};