import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Conversation } from '../types';
import { MessageStatus } from './MessageStatus';

interface ChatPreviewProps {
  conversation: Conversation;
  onPress: (conversationId: string) => void;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({ conversation, onPress }) => {
  const participant = conversation.participants[0];
  const lastMessage = conversation.lastMessage;

  return (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-pump-white/10"
      onPress={() => onPress(conversation.id)}
    >
      {/* Avatar */}
      <View className="relative">
        <Image
          source={{ uri: participant.avatar }}
          className="w-14 h-14 rounded-full"
        />
        {conversation.unreadCount > 0 && (
          <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pump-orange items-center justify-center">
            <Text className="text-pump-white text-xs font-bold">
              {conversation.unreadCount}
            </Text>
          </View>
        )}
      </View>

      {/* Chat Info */}
      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-pump-white text-lg font-semibold">
            {participant.name}
          </Text>
          {lastMessage && (
            <Text className="text-pump-white/60 text-sm">
              {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })}
            </Text>
          )}
        </View>

        <View className="flex-row items-center mt-1">
          {lastMessage && (
            <>
              <Text
                className="flex-1 text-pump-white/80 text-base"
                numberOfLines={1}
              >
                {lastMessage.content}
              </Text>
              <MessageStatus status={lastMessage.status} />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
