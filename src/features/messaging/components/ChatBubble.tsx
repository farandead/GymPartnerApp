import { format } from 'date-fns';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Message } from '../types';
import { MessageStatus } from './MessageStatus';

interface Props {
  message: Message;
  isOwn: boolean;
  onMediaPress?: (mediaUrl: string) => void;
}

export const ChatBubble: React.FC<Props> = ({ message, isOwn, onMediaPress }) => {
  const bubbleStyle = isOwn
    ? 'bg-pump-orange rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl ml-16'
    : 'bg-[#2A2E35] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl mr-16';

  const timeStyle = isOwn
    ? 'text-pump-white/60 text-right'
    : 'text-pump-white/60';

  return (
    <View className={`mb-4 ${isOwn ? 'items-end' : 'items-start'}`}>
      <View className={`p-3 ${bubbleStyle}`}>
        {message.mediaUrl && (
          <TouchableOpacity
            className="mb-2"
            onPress={() => onMediaPress?.(message.mediaUrl!)}
          >
            <Image
              source={{ uri: message.mediaUrl }}
              className="w-48 h-48 rounded-lg"
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <Text className="text-pump-white text-base">
          {message.content}
        </Text>
      </View>
      <View className={`flex-row items-center mt-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
        <Text className={timeStyle}>
          {format(message.timestamp, 'HH:mm')}
        </Text>
        {isOwn && (
          <View className="ml-2">
            <MessageStatus status={message.status} />
          </View>
        )}
      </View>
    </View>
  );
};
