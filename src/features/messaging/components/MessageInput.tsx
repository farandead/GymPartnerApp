import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Props {
  onSend: (message: string) => void;
  onAttachment?: () => void;
}

export const MessageInput: React.FC<Props> = ({ onSend, onAttachment }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View className="flex-row items-center p-4 border-t border-pump-white/10 bg-pump-black">
        <TouchableOpacity
          className="mr-3"
          onPress={onAttachment}
        >
          <Ionicons name="add-circle-outline" size={24} color="#FF8600" />
        </TouchableOpacity>

        <View className="flex-1 mr-3 bg-pump-white/10 rounded-full px-4 py-2">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#FFFFFF60"
            className="text-pump-white"
            multiline
            maxLength={500}
          />
        </View>

        <TouchableOpacity
          className={`w-10 h-10 rounded-full items-center justify-center ${
            message.trim() ? 'bg-pump-orange' : 'bg-pump-white/10'
          }`}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={message.trim() ? '#FFFFFF' : '#FFFFFF60'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
