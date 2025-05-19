import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Linking,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Rect, Svg } from 'react-native-svg';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'PrivacyPreferences'>;

type Tab = 'PURPOSES' | 'FEATURES' | 'PARTNERS';

const PrivacyIcon = () => (
  <Svg width={100} height={100} viewBox="0 0 100 100" fill="none">
    <Rect x="20" y="15" width="60" height="70" stroke="#FF8600" strokeWidth="2" fill="none" />
    <Path
      d="M45 45 C45 40, 55 40, 55 45 L55 60 C55 65, 45 65, 45 60 Z"
      fill="#FF8600"
    />
    <Rect x="47" y="35" width="6" height="15" rx="2" fill="#FF8600" />
  </Svg>
);

const ToggleSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
  <TouchableOpacity 
    onPress={onToggle}
    className={`w-12 h-7 rounded-full ${value ? 'bg-pump-orange' : 'bg-gray-400'} 
      flex-row items-center px-1`}
  >
    <View 
      className={`w-5 h-5 rounded-full bg-white shadow 
        ${value ? 'ml-5' : 'ml-0'} transition-all duration-200`} 
    />
  </TouchableOpacity>
);

const TabButton = ({ title, isActive, onPress }: { 
  title: string; 
  isActive: boolean; 
  onPress: () => void;
}) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-1 py-4 border-b-2"
    style={{ 
      borderColor: isActive ? '#FF8600' : '#4A4A4A',
    }}
  >
    <Text className={`text-center ${isActive ? 'text-pump-orange' : 'text-gray-400'}`}>
      {title}
    </Text>
  </TouchableOpacity>
);

export const PrivacyPreferencesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<Tab>('PURPOSES');
  const [preferences, setPreferences] = useState({
    purposes: {
      'Store and/or access information on a device': false,
      'Use limited data to select advertising': false,
      'Create profiles for personalised advertising': false,
      'Use profiles to select personalised advertising': false,
    },
    features: {
      'Match and combine data from other data sources': false,
      'Link different devices': false,
      'Identify devices based on information transmitted automatically': false,
    },
    partners: {
      'AppsFlyer': false,
    }
  });

  const togglePreference = (category: keyof typeof preferences, key: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      }
    }));
  };

  const handleAcceptAll = () => {
    const newPreferences = Object.keys(preferences).reduce((acc, category) => ({
      ...acc,
      [category]: Object.keys(preferences[category as keyof typeof preferences]).reduce((inner, key) => ({
        ...inner,
        [key]: true
      }), {})
    }), {});
    setPreferences(newPreferences as typeof preferences);
  };

  const handleRejectAll = () => {
    const newPreferences = Object.keys(preferences).reduce((acc, category) => ({
      ...acc,
      [category]: Object.keys(preferences[category as keyof typeof preferences]).reduce((inner, key) => ({
        ...inner,
        [key]: false
      }), {})
    }), {});
    setPreferences(newPreferences as typeof preferences);
  };

  const handleSavePreferences = () => {
    // Save preferences logic here
    navigation.navigate('TrackingConsent');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'PURPOSES':
        return (
          <View className="p-4">
            <Text className="text-pump-white/60 text-base mb-6">
              See what we and our partners use these tools for. You can choose
              to consent or not to each purpose individually by using the toggles.
            </Text>
            {Object.entries(preferences.purposes).map(([key, value]) => (
              <View key={key} className="flex-row items-center justify-between mb-6">
                <View className="flex-1 mr-4">
                  <Text className="text-pump-white text-base">{key}</Text>
                </View>
                <ToggleSwitch 
                  value={value} 
                  onToggle={() => togglePreference('purposes', key)} 
                />
              </View>
            ))}
          </View>
        );
      case 'FEATURES':
        return (
          <View className="p-4">
            <Text className="text-pump-white/60 text-base mb-6">
              These tools are necessary for your data to be used for the
              purposes you agree to in this Preferences Centre.
            </Text>
            {Object.entries(preferences.features).map(([key, value]) => (
              <View key={key} className="flex-row items-center justify-between mb-6">
                <View className="flex-1 mr-4">
                  <Text className="text-pump-white text-base">{key}</Text>
                </View>
                <ToggleSwitch 
                  value={value} 
                  onToggle={() => togglePreference('features', key)} 
                />
              </View>
            ))}
          </View>
        );
      case 'PARTNERS':
        return (
          <View className="p-4">
            <Text className="text-pump-white/60 text-base mb-6">
              The choices you make regarding the purposes and entities listed
              in this notice are saved in a local storage entry called euconsent
              for websites and sp_state for mobile apps. The information is
              stored for a maximum duration of 12 months.
            </Text>
            <TextInput
              className="bg-pump-white/10 rounded-lg px-4 py-3 text-pump-white mb-6"
              placeholder="Search Partners..."
              placeholderTextColor="#9CA3AF"
            />
            <Text className="text-pump-white mb-4">5 Vendor(s)</Text>
            {Object.entries(preferences.partners).map(([key, value]) => (
              <View key={key} className="flex-row items-center justify-between mb-6">
                <View className="flex-1 mr-4">
                  <Text className="text-pump-white text-base">{key}</Text>
                </View>
                <ToggleSwitch 
                  value={value} 
                  onToggle={() => togglePreference('partners', key)} 
                />
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1">
        <ScrollView>
          {/* Header */}
          <View className="p-5">
            <View className="items-center mb-6">
              <PrivacyIcon />
            </View>

            <Text className="text-3xl font-bold text-pump-white mb-4">
              Privacy preferences
            </Text>

            <Text className="text-lg text-pump-white/80 mb-4">
              We and our partners use tracking tools to store and process
              your data for the purposes below. You can adjust your
              preferences by choosing to consent or not to certain tools.
            </Text>

            <Text className="text-lg text-pump-white/80 mb-6">
              You can also find the list of tools that are strictly necessary
              for the app to function, as well as the list of partners that
              place tools on our behalf. You can find out more in our{' '}
              <Text 
                className="text-pump-orange underline"
                onPress={() => Linking.openURL('https://pumpcult.com/privacy-policy')}
              >
                privacy policy
              </Text>
              {' '}and{' '}
              <Text 
                className="text-pump-orange underline"
                onPress={() => Linking.openURL('https://pumpcult.com/cookie-policy')}
              >
                cookie policy
              </Text>
              .
            </Text>
          </View>

          {/* Tabs */}
          <View className="flex-row border-b border-gray-700">
            <TabButton 
              title="PURPOSES" 
              isActive={activeTab === 'PURPOSES'} 
              onPress={() => setActiveTab('PURPOSES')} 
            />
            <TabButton 
              title="FEATURES" 
              isActive={activeTab === 'FEATURES'} 
              onPress={() => setActiveTab('FEATURES')} 
            />
            <TabButton 
              title="PARTNERS" 
              isActive={activeTab === 'PARTNERS'} 
              onPress={() => setActiveTab('PARTNERS')} 
            />
          </View>

          {/* Tab Content */}
          {renderContent()}
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="p-5 border-t border-gray-700">
          <TouchableOpacity
            className="bg-pump-black border-2 border-pump-orange rounded-full py-4 items-center mb-4"
            onPress={handleAcceptAll}
          >
            <Text className="text-pump-orange font-semibold text-lg">
              Accept all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-pump-orange rounded-full py-4 items-center mb-4"
            onPress={handleSavePreferences}
          >
            <Text className="text-pump-white font-semibold text-lg">
              Save preferences
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-4 items-center"
            onPress={handleRejectAll}
          >
            <Text className="text-pump-white/80 text-lg">
              Reject all
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
