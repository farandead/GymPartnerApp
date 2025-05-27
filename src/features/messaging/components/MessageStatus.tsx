import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { MessageStatus as MessageStatusType } from '../types';

interface Props {
  status: MessageStatusType;
  color?: string;
}

export const MessageStatus: React.FC<Props> = ({ status, color = '#FFFFFF' }) => {
  let iconName: keyof typeof Ionicons.glyphMap;
  let opacity: number;

  switch (status) {
    case 'sent':
      iconName = 'checkmark';
      opacity = 0.5;
      break;
    case 'delivered':
      iconName = 'checkmark-done';
      opacity = 0.5;
      break;
    case 'read':
      iconName = 'checkmark-done';
      opacity = 1;
      break;
    default:
      return null;
  }

  return (
    <View style={{ opacity }}>
      <Ionicons name={iconName} size={16} color={color} />
    </View>
  );
};
