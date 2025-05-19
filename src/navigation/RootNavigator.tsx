import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import {
  EmailScreen,
  GymModeScreen,
  OtpVerificationScreen,
  PhoneNumberScreen,
  PreferredPartnersScreen,
  PrivacyConsentScreen,
  PrivacyPreferencesScreen,
  TrackingConsentScreen,
  WelcomeScreen,
  WorkoutGoalsScreen
} from '~/features/auth/screens';
import { LocationPermissionScreen } from '~/features/location/screens';
import { NotificationPermissionScreen } from '~/features/notifications/screens';
import { GenderSelectionScreen, GenderVisibilityScreen, ProfileSetupScreen } from '~/features/profile/screens';

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
    <AuthStack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    <AuthStack.Screen name="GenderSelection" component={GenderSelectionScreen} />
    <AuthStack.Screen name="GenderVisibility" component={GenderVisibilityScreen} />
    <AuthStack.Screen name="Email" component={EmailScreen} />
    <AuthStack.Screen name="GymMode" component={GymModeScreen} />
    <AuthStack.Screen name="PreferredPartners" component={PreferredPartnersScreen} />
    <AuthStack.Screen name="WorkoutGoals" component={WorkoutGoalsScreen} />
  </AuthStack.Navigator>
);

// Home Stack (Discover/Matching)
const HomeStack = createStackNavigator();
const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Discover" component={PlaceholderScreen} />
    <HomeStack.Screen name="MatchDetails" component={PlaceholderScreen} />
    <HomeStack.Screen name="LikesYou" component={PlaceholderScreen} />
  </HomeStack.Navigator>
);

// Messaging Stack
const MessagingStack = createStackNavigator();
const MessagingNavigator = () => (
  <MessagingStack.Navigator>
    <MessagingStack.Screen name="Conversations" component={PlaceholderScreen} />
    <MessagingStack.Screen name="Chat" component={PlaceholderScreen} />
  </MessagingStack.Navigator>
);

// Nearby Stack
const NearbyStack = createStackNavigator();
const NearbyNavigator = () => (
  <NearbyStack.Navigator>
    <NearbyStack.Screen name="Map" component={PlaceholderScreen} />
    <NearbyStack.Screen name="GymDetails" component={PlaceholderScreen} />
  </NearbyStack.Navigator>
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
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#1B2021',
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: '#FF8600',
      tabBarInactiveTintColor: '#FFFFFF',
    }}
  >
    <MainTab.Screen name="Home" component={HomeNavigator} />
    <MainTab.Screen name="Messages" component={MessagingNavigator} />
    <MainTab.Screen name="Nearby" component={NearbyNavigator} />
    <MainTab.Screen name="Profile" component={ProfileNavigator} />
  </MainTab.Navigator>
);

// Root Navigator
const RootStack = createStackNavigator();
export const RootNavigator = () => {
  // Mock authentication state
  const isAuthenticated = false;

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
