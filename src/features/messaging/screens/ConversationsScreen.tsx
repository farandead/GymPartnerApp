import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessagingStackParamList } from '../../../types/navigation';
import { ChatPreview } from '../components/ChatPreview';
import { EmptyState } from '../components/EmptyState';
import { mockConversations } from '../data/mockData';
import { Conversation } from '../types';

type NavigationProp = StackNavigationProp<MessagingStackParamList, 'Conversations'>;

export const ConversationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setConversations(mockConversations);
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const handleConversationPress = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    navigation.navigate('Chat', { 
      conversationId,
      name: conversation.participants[0].name 
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-pump-black">
        <ActivityIndicator color="#FF8600" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatPreview 
            conversation={item}
            onPress={() => handleConversationPress(item.id)}
          />
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<EmptyState message="No messages yet" />}
      />
    </SafeAreaView>
  );
};
