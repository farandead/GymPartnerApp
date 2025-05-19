import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GymPreferences } from '../components/GymPreferences';
import { ProfileHeader } from '../components/ProfileHeader';
import { WorkoutStats } from '../components/WorkoutStats';

import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../types/navigation';

type Props = StackScreenProps<ProfileStackParamList, 'MyProfile'>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <ScrollView>
        <ProfileHeader onEditPress={() => navigation.navigate('EditProfile')} />
        <WorkoutStats />
        <GymPreferences />
      </ScrollView>
    </SafeAreaView>
  );
};
