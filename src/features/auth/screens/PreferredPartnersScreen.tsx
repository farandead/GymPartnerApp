import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'PreferredPartners'>;

type PreferredPartner = 'Men' | 'Women' | 'Other';

export const PreferredPartnersScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [openToAll, setOpenToAll] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState<Set<PreferredPartner>>(new Set());
  const [customGender, setCustomGender] = useState('');

  const partnerOptions: PreferredPartner[] = [
    'Men',
    'Women',
    'Other'
  ];

  const togglePartner = (partner: PreferredPartner) => {
    const newSelected = new Set(selectedPartners);
    if (newSelected.has(partner)) {
      newSelected.delete(partner);
    } else {
      newSelected.add(partner);
    }
    setSelectedPartners(newSelected);
  };

  const handleOpenToAllChange = (value: boolean) => {
    setOpenToAll(value);
    if (value) {
      setSelectedPartners(new Set(partnerOptions));
    }
  };  const handleContinue = () => {
    const preferences = {
      openToAll,
      selectedPartners: Array.from(selectedPartners).map(partner => 
        partner === 'Other' && customGender ? customGender : partner
      )
    };
    console.log('Partner preferences:', preferences);
    navigation.navigate('WorkoutGoals', { preferences });
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[95%]" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          Who would you like to train with?
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-8">
          You can choose more than one answer and change it any time.
        </Text>

        {/* Open to All Switch */}
        <View className="mb-6 flex-row items-center bg-pump-white/10 p-4 rounded-xl">
          <Switch
            value={openToAll}
            onValueChange={handleOpenToAllChange}
            trackColor={{ false: '#3f3f3f', true: '#ff6b00' }}
            thumbColor="#ffffff"
            className="mr-3"
          />
          <Text className="text-lg text-pump-white flex-1">
            I'm open to training with everyone
          </Text>
        </View>        {/* Partner Options */}
        <View>
  {partnerOptions.map((partner, index) => (
    <View key={partner} className={index !== partnerOptions.length - 1 ? 'mb-2' : ''}>
      <TouchableOpacity
        className={`p-4 rounded-xl flex-row justify-between items-center ${
          selectedPartners.has(partner) || openToAll
            ? 'bg-pump-white/20'
            : 'bg-pump-white/10'
        }`}
        onPress={() => !openToAll && togglePartner(partner)}
        disabled={openToAll}
      >
        <Text className="text-lg text-pump-white">{partner}</Text>
        <View
          className={`w-6 h-6 rounded border-2 ${
            selectedPartners.has(partner) || openToAll
              ? 'border-pump-orange bg-pump-orange'
              : 'border-pump-white/50 bg-transparent'
          } items-center justify-center`}
        >
          {(selectedPartners.has(partner) || openToAll) && (
            <Text className="text-pump-white text-sm">✓</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Custom Gender Input */}
      {partner === 'Other' && selectedPartners.has('Other') && !openToAll && (
        <TextInput
          className="bg-pump-white/10 mt-2 rounded-xl px-4 py-3 text-pump-white text-lg"
          placeholder="Specify gender preference"
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={customGender}
          onChangeText={setCustomGender}
          autoCapitalize="words"
          autoCorrect={false}
        />
      )}
    </View>
  ))}
</View>


        {/* Info Note */}
        <View className="flex-row items-center mt-8">
          <View className="w-5 h-5 rounded-full border border-pump-white/60 items-center justify-center mr-2">
            <Text className="text-pump-white/60">i</Text>
          </View>
          <Text className="text-pump-white/60 flex-1">
            You'll only be shown to people looking to train with your gender.
          </Text>
        </View>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={openToAll || (selectedPartners.size > 0 && (!selectedPartners.has('Other') || customGender.trim()))}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
