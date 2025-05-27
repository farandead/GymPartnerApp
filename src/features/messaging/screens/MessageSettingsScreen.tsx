import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MessageSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    messagePreview: true,
    soundEnabled: true,
    readReceipts: true,
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const SettingItem: React.FC<{
    title: string;
    description: string;
    value: boolean;
    onToggle: () => void;
  }> = ({ title, description, value, onToggle }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-pump-white/10">
      <View className="flex-1 mr-4">
        <Text className="text-pump-white text-lg font-semibold mb-1">
          {title}
        </Text>
        <Text className="text-pump-white/60 text-base">
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#2A2E35', true: '#FF860080' }}
        thumbColor={value ? '#FF8600' : '#FFFFFF'}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-pump-white/10">
        <TouchableOpacity
          className="mr-3"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-pump-white text-lg font-semibold">
          Message Settings
        </Text>
      </View>

      {/* Settings */}
      <View className="p-4">
        <SettingItem
          title="Push Notifications"
          description="Receive notifications for new messages"
          value={settings.pushNotifications}
          onToggle={() => toggleSetting('pushNotifications')}
        />
        <SettingItem
          title="Message Preview"
          description="Show message content in notifications"
          value={settings.messagePreview}
          onToggle={() => toggleSetting('messagePreview')}
        />
        <SettingItem
          title="Sound"
          description="Play sound for new messages"
          value={settings.soundEnabled}
          onToggle={() => toggleSetting('soundEnabled')}
        />
        <SettingItem
          title="Read Receipts"
          description="Let others know when you've read their messages"
          value={settings.readReceipts}
          onToggle={() => toggleSetting('readReceipts')}
        />
      </View>
    </SafeAreaView>
  );
};
