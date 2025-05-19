import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../../types/navigation';

interface CountryCode {
  code: string;
  prefix: string;
  flag: string;
}

type NavigationProp = StackNavigationProp<AuthStackParamList, 'PhoneLogin'>;

export const PhoneNumberScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>({
    code: 'GB',
    prefix: '+44',
    flag: '🇬🇧'
  });
  
  // This would be expanded in a real app with a proper country picker
  const handleCountryPress = () => {
    // For demo purposes we're just using a single country
    console.log('Country selector would open here');
  };
  
  const handleContinue = () => {
    if (phoneNumber.length === 0) return;
    
    // Remove any spaces or special characters
    const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    const fullPhoneNumber = `${selectedCountry.prefix}${cleanPhoneNumber}`;
    
    // Navigate to verification screen with the phone number
    navigation.navigate('OtpVerification', { phoneNumber: fullPhoneNumber });
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-pump-black"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 p-5">
          {/* Header with back button */}
          <TouchableOpacity 
            className="mb-8" 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          
          {/* Title and description */}
          <Text className="text-pump-white text-3xl font-bold mb-4">
            Can we get your number, please?
          </Text>
          <Text className="text-pump-white/80 text-lg mb-8">
            We only use phone numbers to make sure everyone on PumpCult is real.
          </Text>
          
          {/* Phone number input */}
          <View className="mb-6">
            <Text className="text-pump-white/80 mb-2">Country</Text>
            <TouchableOpacity 
              className="flex-row items-center border border-pump-white/30 rounded-lg p-4 mb-4"
              onPress={handleCountryPress}
            >
              <Text className="text-pump-white text-lg">{selectedCountry.flag} {selectedCountry.code} {selectedCountry.prefix}</Text>
              <Ionicons name="chevron-down" size={20} color="white" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
            
            <Text className="text-pump-white/80 mb-2">Phone number</Text>
            <TextInput
              className="border border-pump-white/30 rounded-lg p-4 text-pump-white text-lg"
              placeholder="Enter your phone number"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          
          {/* Privacy notice */}
          <View className="flex-row items-start mb-8">
            <Ionicons name="lock-closed-outline" size={20} color="white" className="mt-1" />
            <Text className="text-pump-white/80 ml-2 flex-1">
              We never share this with anyone and it won't be on your profile.
            </Text>
          </View>
          
          {/* Continue button */}
          <View className="mt-auto">
            <TouchableOpacity 
              className={`rounded-full py-4 items-center ${
                phoneNumber.length > 0 ? 'bg-pump-orange' : 'bg-pump-white/30'
              }`}
              onPress={handleContinue}
              disabled={phoneNumber.length === 0}
            >
              <Text className="text-pump-white font-semibold text-base">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
