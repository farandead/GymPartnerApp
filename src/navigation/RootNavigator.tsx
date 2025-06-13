import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import {
  EmailScreen,
  GenderSelectionScreen,
  GenderVisibilityScreen,
  GymModeScreen,
  HeightSelectionScreen,
  InterestsSelectionScreen,
  OtpVerificationScreen,
  PersonalQuestionsScreen,
  PhoneNumberScreen,
  PhotosScreen,
  PreferredPartnersScreen,
  PrivacyConsentScreen,
  PrivacyPreferencesScreen,
  TrackingConsentScreen,
  WelcomeScreen,
  WorkoutGoalsScreen,
} from '~/features/auth/screens';
import { LocationPermissionScreen } from '~/features/location/screens';
import { DiscoverScreen } from '~/features/matching/screens';
import { NotificationPermissionScreen } from '~/features/notifications/screens';
import { BottomTabBar } from '../components/BottomTabBar';

// Placeholder for actual screen components
const PlaceholderScreen = ({ route }: { route: any }) => (
  <View className="flex-1 items-center justify-center bg-pump-black">
    <Text className="text-pump-white text-xl">
      {route.name} Screen
    </Text>
    <Text className="text-pump-orange mt-2">
      (Component to be implemented)
    </Text>
  </View>
);

// Auth Stack
const AuthStack = createStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="PhoneLogin" component={PhoneNumberScreen} />
    <AuthStack.Screen name="OtpVerification" component={OtpVerificationScreen} />
    <AuthStack.Screen name="LocationPermission" component={LocationPermissionScreen} />
    <AuthStack.Screen name="NotificationPermission" component={NotificationPermissionScreen} />
    <AuthStack.Screen name="PrivacyConsent" component={PrivacyConsentScreen} />
    <AuthStack.Screen name="PrivacyPreferences" component={PrivacyPreferencesScreen} />
    <AuthStack.Screen name="TrackingConsent" component={TrackingConsentScreen} />
    <AuthStack.Screen name="GenderSelection" component={GenderSelectionScreen} />
    <AuthStack.Screen name="GenderVisibility" component={GenderVisibilityScreen} />
    <AuthStack.Screen name="Email" component={EmailScreen} />
    <AuthStack.Screen name="GymMode" component={GymModeScreen} />
    <AuthStack.Screen name="PreferredPartners" component={PreferredPartnersScreen} />
    <AuthStack.Screen name="WorkoutGoals" component={WorkoutGoalsScreen} />
    <AuthStack.Screen name="HeightSelection" component={HeightSelectionScreen} />
    <AuthStack.Screen name="Photos" component={PhotosScreen} />
    <AuthStack.Screen name="PersonalQuestions" component={PersonalQuestionsScreen} />
    <AuthStack.Screen name="InterestsSelection" component={InterestsSelectionScreen} />
  </AuthStack.Navigator>
);

// Home Stack (Discover/Matching)
const HomeStack = createStackNavigator();
const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="Discover" component={DiscoverScreen} />
    <HomeStack.Screen name="MatchDetails" component={PlaceholderScreen} />
    <HomeStack.Screen name="LikesYou" component={PlaceholderScreen} />
  </HomeStack.Navigator>
);

// Messaging Stack
const MessagingStack = createStackNavigator<MessagingStackParamList>();

type MessagingScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MessagingStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

const MessagingNavigator = () => (
  <MessagingStack.Navigator>
    <MessagingStack.Screen name="Conversations" component={PlaceholderScreen} />
    <MessagingStack.Screen name="Chat" component={PlaceholderScreen} />
  </MessagingStack.Navigator>
);

// People/Nearby Stack
const PeopleStack = createStackNavigator();
const PeopleNavigator = () => (
  <PeopleStack.Navigator
    screenOptions={defaultHeaderStyle}
  >
    <PeopleStack.Screen 
      name="Map" 
      component={PlaceholderScreen}
      options={{
        title: 'Nearby People',
      }}
    />
    <PeopleStack.Screen 
      name="GymDetails" 
      component={PlaceholderScreen}
      options={{
        title: 'Gym Details',
      }}
    />
  </PeopleStack.Navigator>
);

// Profile Stack
const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="MyProfile" component={PlaceholderScreen} />
    <ProfileStack.Screen name="EditProfile" component={PlaceholderScreen} />
    <ProfileStack.Screen name="Settings" component={PlaceholderScreen} />
    <ProfileStack.Screen name="AccountSettings" component={PlaceholderScreen} />
    <ProfileStack.Screen name="NotificationSettings" component={PlaceholderScreen} />
    <ProfileStack.Screen name="PrivacySettings" component={PlaceholderScreen} />
  </ProfileStack.Navigator>
);

// Main Tab Navigator
const MainTab = createBottomTabNavigator();
const MainNavigator = () => (
  <MainTab.Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainTab.Screen 
      name="Profile" 
      component={ProfileNavigator}
      options={{
        title: 'Profile'
      }}
    />
    <MainTab.Screen 
      name="Discover" 
      component={HomeNavigator}
      options={{
        title: 'Discover'
      }}
    />
    <MainTab.Screen 
      name="People" 
      component={NearbyNavigator}
      options={{
        title: 'People'
      }}
    />
    <MainTab.Screen 
      name="Messages" 
      component={MessagingNavigator}
      options={{
        title: 'Chats'
      }}
    />
  </MainTab.Navigator>
);

// Root Navigator
const RootStack = createStackNavigator();
export const RootNavigator = () => {  // Mock authentication state
  const isAuthenticated = true;

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
