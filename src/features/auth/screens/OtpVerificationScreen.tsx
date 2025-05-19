import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../../types/navigation';

type OtpVerificationScreenRouteProp = RouteProp<AuthStackParamList, 'OtpVerification'>;
type NavigationProp = StackNavigationProp<AuthStackParamList, 'OtpVerification'>;

const OTP_LENGTH = 6;

export const OtpVerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<OtpVerificationScreenRouteProp>();
  const { phoneNumber } = route.params;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(30);
  const otpInputs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    setTimer(30);
    // Implement resend code logic here
    console.log('Resending code to:', phoneNumber);
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
    // Implement verification logic here
    // On success:
    navigation.navigate('LocationPermission');
  };

  const formatPhoneNumber = (phone: string) => {
    // Basic formatting, you might want to improve this based on your needs
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
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
            Enter verification code
          </Text>
          <Text className="text-pump-white/80 text-lg mb-8">
            We sent a code to {formatPhoneNumber(phoneNumber)}
          </Text>
          
          {/* OTP Input */}
          <View className="flex-row justify-between mb-8">
            {Array(OTP_LENGTH).fill(null).map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => otpInputs.current[index] = ref}
                className="w-12 h-14 bg-pump-black border-2 border-pump-white/30 rounded-lg text-center text-pump-white text-xl"
                maxLength={1}
                keyboardType="number-pad"
                value={otp[index]}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>
          
          {/* Resend code */}
          <TouchableOpacity 
            className="items-center mb-8"
            onPress={handleResendCode}
            disabled={timer > 0}
          >
            <Text className={`text-lg ${timer > 0 ? 'text-pump-white/50' : 'text-pump-orange'}`}>
              {timer > 0 
                ? `Resend code in ${timer}s` 
                : 'Resend code'}
            </Text>
          </TouchableOpacity>
          
          {/* Verify button */}
          <View className="mt-auto">
            <TouchableOpacity 
              className={`rounded-full py-4 items-center ${
                otp.every(digit => digit) ? 'bg-pump-orange' : 'bg-pump-white/30'
              }`}
              onPress={handleVerify}
              disabled={!otp.every(digit => digit)}
            >
              <Text className="text-pump-white font-semibold text-base">
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
