import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ProfileStackParamList } from '../../../types/navigation';

type SettingsScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Settings'>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [dateMode, setDateMode] = useState(true);
  const [snoozeMode, setSnoozeMode] = useState(false);
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [autoSpotlight, setAutoSpotlight] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleVerifyEmail = () => {
    Alert.alert('Verify Email', 'Check your inbox for your verification email');
  };

  const handleConnectionType = () => {
    Alert.alert('Type of Connection', 'Date option selected');
  };

  const handleLocation = () => {
    Alert.alert('Location', 'Current location: Birmingham, GB');
  };

  const handleTravel = () => {
    Alert.alert('Travel', 'Change your location to connect with people in other locations.');
  };

  const handleVideoAutoplay = () => {
    Alert.alert('Video Autoplay Settings', 'Configure video autoplay preferences');
  };

  const handleDateModeToggle = (value: boolean) => {
    setDateMode(value);
    if (!value) {
      Alert.alert(
        'Date Mode',
        'Hide your profile in Date and just use BFF or Bizz. If you do this, you\'ll lose your connections and chats in Date.'
      );
    }
  };

  const handleSnoozeModeToggle = () => {
    Alert.alert(
      'Snooze Mode',
      'Hide your profile temporarily, in all modes. You won\'t lose any connections or chats.'
    );
  };

  const handleIncognitoModeToggle = (value: boolean) => {
    setIncognitoMode(value);
    Alert.alert(
      'Incognito Mode for Date',
      'Only people you\'ve liked already, or like later, will see your profile. If you turn on Incognito Mode for Date, this won\'t apply across Bizz or BFF.'
    );
  };

  const handleAutoSpotlightToggle = (value: boolean) => {
    setAutoSpotlight(value);
    Alert.alert(
      'Auto-Spotlight',
      'We\'ll use Spotlight automatically to boost your profile when most people will see it'
    );
  };

  const SettingsSection: React.FC<{ title?: string; children: React.ReactNode }> = ({ 
    title, 
    children 
  }) => (
    <View className="mb-6">
      {title && (
        <Text className="text-pump-white/60 text-sm font-medium mb-3 px-5 uppercase tracking-wider">
          {title}
        </Text>
      )}
      <View className="bg-pump-white/5 mx-5 rounded-2xl overflow-hidden">
        {children}
      </View>
    </View>
  );

  const SettingsItem: React.FC<{
    icon?: string;
    title: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    showChevron?: boolean;
    isLast?: boolean;
  }> = ({ 
    icon, 
    title, 
    subtitle, 
    rightElement, 
    onPress, 
    showChevron = false,
    isLast = false 
  }) => (
    <TouchableOpacity 
      className={`flex-row items-center p-4 ${!isLast ? 'border-b border-pump-white/10' : ''}`}
      onPress={onPress}
      disabled={!onPress}
    >
      {icon && (
        <View className="w-8 h-8 mr-3">
          <MaterialIcons name={icon} size={24} color="#FFFFFF80" />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-pump-white text-base font-medium">{title}</Text>
        {subtitle && (
          <Text className="text-pump-white/60 text-sm mt-1 leading-5">{subtitle}</Text>
        )}
      </View>      {rightElement && (
        <View className="ml-3">
          {rightElement}
        </View>
      )}
      
      {showChevron && (
        <View className="ml-3">
          <Icon name="chevron-right" size={20} color="#FFFFFF60" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-pump-black">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-pump-white/10">
        <TouchableOpacity onPress={handleGoBack}>
          <Text className="text-pump-white text-lg">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-pump-white text-xl font-semibold">Settings</Text>
        <TouchableOpacity>
          <Text className="text-pump-orange text-lg font-medium">Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {/* Account Section */}
        <SettingsSection>
          <SettingsItem
            icon="email"
            title="Verify your email"
            subtitle="Check your inbox for your verification email"
            onPress={handleVerifyEmail}
            showChevron={true}
          />
          <SettingsItem
            title="Type of connection"
            rightElement={<Text className="text-pump-white/60">Date</Text>}
            onPress={handleConnectionType}
            showChevron={true}
            isLast={true}
          />
        </SettingsSection>

        {/* Privacy Modes */}
        <SettingsSection>
          <SettingsItem
            title="Date mode"
            subtitle="Hide your profile in Date and just use BFF or Bizz. If you do this, you'll lose your connections and chats in Date."
            rightElement={
              <Switch
                value={dateMode}
                onValueChange={handleDateModeToggle}
                trackColor={{ false: '#374151', true: '#FF6B35' }}
                thumbColor={dateMode ? '#FFFFFF' : '#9CA3AF'}
              />
            }
          />
          <SettingsItem
            title="Snooze mode"
            subtitle="Hide your profile temporarily, in all modes. You won't lose any connections or chats."
            onPress={handleSnoozeModeToggle}
          />
          <SettingsItem
            title="Incognito Mode for Date"
            subtitle="Only people you've liked already, or like later, will see your profile. If you turn on Incognito Mode for Date, this won't apply across Bizz or BFF."
            rightElement={
              <Switch
                value={incognitoMode}
                onValueChange={handleIncognitoModeToggle}
                trackColor={{ false: '#374151', true: '#FF6B35' }}
                thumbColor={incognitoMode ? '#FFFFFF' : '#9CA3AF'}
              />
            }
          />
          <SettingsItem
            title="Auto-Spotlight"
            subtitle="We'll use Spotlight automatically to boost your profile when most people will see it"
            rightElement={
              <Switch
                value={autoSpotlight}
                onValueChange={handleAutoSpotlightToggle}
                trackColor={{ false: '#374151', true: '#FF6B35' }}
                thumbColor={autoSpotlight ? '#FFFFFF' : '#9CA3AF'}
              />
            }
            isLast={true}
          />
        </SettingsSection>

        {/* Location Section */}
        <SettingsSection title="Location">
          <SettingsItem
            title="Current location"
            rightElement={<Text className="text-pump-white/60">Birmingham, GB</Text>}
            onPress={handleLocation}
          />
          <SettingsItem
            icon="travel-explore"
            title="Travel"
            subtitle="Change your location to connect with people in other locations."
            onPress={handleTravel}
            showChevron={true}
            isLast={true}
          />
        </SettingsSection>

        {/* Media Section */}
        <SettingsSection>
          <SettingsItem
            title="Video autoplay settings"
            onPress={handleVideoAutoplay}
            showChevron={true}
            isLast={true}
          />
        </SettingsSection>        {/* Additional Settings */}
        <SettingsSection>
          <SettingsItem
            title="Account Settings"
            onPress={() => navigation.navigate('AccountSettings')}
            showChevron={true}
          />
          <SettingsItem
            title="Privacy Settings"
            onPress={() => navigation.navigate('PrivacySettings')}
            showChevron={true}
          />
          <SettingsItem
            title="Notification Settings"
            onPress={() => navigation.navigate('NotificationSettings')}
            showChevron={true}
            isLast={true}
          />
        </SettingsSection>

        {/* Footer */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-pump-white/40 text-xs text-center">
            Version 1.0.0 • Terms of Service • Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
