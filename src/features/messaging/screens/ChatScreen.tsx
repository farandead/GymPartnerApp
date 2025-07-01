import { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'match';
  timestamp: string;
}

export const ChatScreen = ({ route, navigation }: any) => {
  const [messageText, setMessageText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "What's the most iconic first date idea you can think of?",
      sender: 'match',
      timestamp: '10:30 PM'
    }
  ]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      // Scroll to bottom when keyboard shows
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  // Mock user data - in real app this would come from route params or context
  const matchUser = route?.params?.matchUser || {
    name: 'Rouyan',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b6b44c4d?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  };
  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <View
        key={message.id}
        className={`mb-4 ${isUser ? 'items-end' : 'items-start'}`}
      >
        <View
          className={`max-w-[80%] px-4 py-3 rounded-3xl ${
            isUser 
              ? 'bg-pump-orange rounded-br-lg' 
              : 'bg-gray-200 rounded-bl-lg'
          }`}
        >
          <Text 
            className={`text-base leading-6 ${
              isUser ? 'text-white' : 'text-black'
            }`}
          >
            {message.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center flex-1">          <TouchableOpacity 
            onPress={() => navigation?.goBack()}
            className="mr-4"
          >
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          
          <Image 
            source={{ uri: matchUser.profileImage }}
            className="w-10 h-10 rounded-full mr-3"
          />
          
          <View className="flex-1">
            <Text className="text-lg font-semibold text-black">
              {matchUser.name}
            </Text>
            {matchUser.isOnline && (
              <Text className="text-sm text-green-500">Online</Text>
            )}
          </View>
        </View>
        
        <View className="flex-row">
          <TouchableOpacity className="mr-4">
            <Icon name="more-vertical" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="x" size={24} color="#000" />
          </TouchableOpacity>
        </View>      </View>

      {/* Content Area with Dynamic Bottom Padding */}
      <View className="flex-1" style={{ paddingBottom: Platform.OS === 'android' ? keyboardHeight : 0 }}>
        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Message Input - Fixed at Bottom */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <SafeAreaView edges={['bottom']} className="bg-white">
            <View className="px-4 py-3 border-t border-gray-100">
            <View className="flex-row items-end">
            {/* Camera/Media Button */}
            <TouchableOpacity className="mr-3 mb-2">
              <Icon name="camera" size={24} color="#666" />
            </TouchableOpacity>

            {/* Text Input Container */}
            <View className="flex-1 bg-gray-100 rounded-full min-h-[44px] flex-row items-center px-4">
              {/* Text Formatting Button */}
              <TouchableOpacity className="mr-2">
                <View className="flex-row items-center">
                  <Text className="text-pump-orange font-bold text-lg">Aa</Text>
                </View>
              </TouchableOpacity>

              {/* Text Input */}
              <TextInput
                className="flex-1 text-base text-black py-2"
                placeholder="Type a message..."
                placeholderTextColor="#999"
                value={messageText}
                onChangeText={setMessageText}
                multiline
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />

              {/* GIF Button */}
              <TouchableOpacity className="ml-2 bg-pump-orange rounded-full w-8 h-8 items-center justify-center">
                <Text className="text-white text-xs font-bold">GIF</Text>
              </TouchableOpacity>
            </View>

            {/* Send Button */}
            <TouchableOpacity 
              className="ml-3 mb-2"
              onPress={sendMessage}
              disabled={!messageText.trim()}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center ${
                messageText.trim() ? 'bg-pump-orange' : 'bg-gray-300'
              }`}>
                <Icon 
                  name="send" 
                  size={18} 
                  color={messageText.trim() ? '#fff' : '#999'} 
                />              </View>
            </TouchableOpacity>
            </View>
          </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
