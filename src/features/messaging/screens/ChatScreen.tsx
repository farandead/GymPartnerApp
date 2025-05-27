import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessagingStackParamList } from '../../../types/navigation';
import { ChatBubble } from '../components/ChatBubble';
import { MessageInput } from '../components/MessageInput';
import { mockConversations, mockMessages } from '../data/mockData';
import { Conversation, Message } from '../types';

type NavigationProp = StackNavigationProp<MessagingStackParamList, 'Chat'>;
type RoutePropType = RouteProp<MessagingStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    loadConversation();
    navigation.setOptions({
      headerShown: false,
    });
  }, [route.params?.conversationId]);

  const loadConversation = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const conv = mockConversations.find(c => c.id === route.params?.conversationId);
      if (!conv) throw new Error('Conversation not found');
      
      setConversation(conv);
      // Load all messages for this conversation
      setMessages(mockMessages[conv.id] || []);
    } catch (error) {
      console.error('Error loading conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (content: string) => {
    if (!conversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1', // Current user ID
      receiverId: conversation.participants[0].id,
      content,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleAttachment = () => {
    // TODO: Implement attachment functionality
    console.log('Attachment button pressed');
  };

  if (isLoading || !conversation) {
    return (
      <View className="flex-1 items-center justify-center bg-pump-black">
        <ActivityIndicator color="#FF8600" size="large" />
      </View>
    );
  }

  const participant = conversation.participants[0]; // Assuming 1-1 chat

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-pump-white/10">
        <TouchableOpacity
          className="mr-3"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center flex-1"
          onPress={() => {
            navigation.navigate('MessageSettings', { 
              conversationId: route.params.conversationId 
            });
          }}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: participant.avatar }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <View className="flex-1">
            <Text className="text-pump-white text-lg font-semibold">
              {participant.name}
            </Text>
            {participant.lastSeen && (
              <Text className="text-pump-white/60 text-sm">
                Active now
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        className="flex-1 p-4"
        renderItem={({ item }) => (
          <ChatBubble
            message={item}
            isOwn={item.senderId === '1'}
            onMediaPress={url => {
              // TODO: Implement media viewer
              console.log('View media:', url);
            }}
          />
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Input */}
      <MessageInput onSend={handleSend} onAttachment={handleAttachment} />
    </SafeAreaView>
  );
};
