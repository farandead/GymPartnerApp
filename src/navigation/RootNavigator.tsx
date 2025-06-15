import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text, TouchableOpacity, View } from 'react-native';
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

// import {
//   ChatScreen,
//   ConversationsScreen,
//   MessageSettingsScreen
// } from '~/features/messaging/screens';

import { BottomTabBar } from '~/components/BottomTabBar';
import { NotificationPermissionScreen } from '~/features/notifications/screens';
import { ProfileSetupScreen } from '~/features/profile/screens';
import {
  DiscoveryStackParamList,
  MainTabParamList,
  MessagingStackParamList,
  ProfileStackParamList,
  RequestsStackParamList,
  SettingsStackParamList
} from '../types/navigation';

// Shared header styling
const defaultHeaderStyle = {
  headerStyle: {
    backgroundColor: '#1B2021',
    elevation: 0, // Android
    shadowOpacity: 0, // iOS
  },
  headerTintColor: '#FF8600',
  headerTitleStyle: {
    fontWeight: '600' as '600',
    fontSize: 18,
  },
  headerTitleAlign: 'center' as const,
};

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

// Error fallback component
const ErrorFallback = () => (
  <View className="flex-1 items-center justify-center bg-pump-black">
    <Text className="text-pump-white text-xl">Something went wrong</Text>
    <Text className="text-pump-orange mt-2">
      Please try again or restart the app
    </Text>
  </View>
);

// Auth Stack
const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  try {
    return (
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
        <AuthStack.Screen name="HeightSelection" component={HeightSelectionScreen} />
        <AuthStack.Screen name="Photos" component={PhotosScreen} />
        <AuthStack.Screen name="PersonalQuestions" component={PersonalQuestionsScreen} />
        <AuthStack.Screen name="InterestsSelection" component={InterestsSelectionScreen} />
      </AuthStack.Navigator>
    );
  } catch (error) {
    console.error("AuthNavigator error:", error);
    return <ErrorFallback />;
  }
};

// Messaging Stack
const MessagingStack = createStackNavigator<MessagingStackParamList>();

type MessagingScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MessagingStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

const MessagingNavigator = () => {
  try {
    return (
      <MessagingStack.Navigator
        screenOptions={defaultHeaderStyle}
      >
        <MessagingStack.Screen 
          name="Conversations" 
          component={PlaceholderScreen}
          options={({ navigation }) => ({
            title: 'Messages',
            headerRight: () => (
              <TouchableOpacity 
                className="mr-4"
                onPress={() => {
                  navigation.navigate('MessageSettings', { 
                    conversationId: 'settings' 
                  });
                }}
              >
                <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ),
          })}
        />
        <MessagingStack.Screen 
          name="Chat" 
          component={PlaceholderScreen}
          options={({ route }) => ({
            headerShown: false,
            title: route.params?.name || 'Chat',
          })}
        />
        <MessagingStack.Screen 
          name="MessageSettings" 
          component={PlaceholderScreen}
          options={{
            title: 'Settings',
          }}
        />
      </MessagingStack.Navigator>
    );
  } catch (error) {
    console.error("MessagingNavigator error:", error);
    return <ErrorFallback />;
  }
};

// Requests Stack
const RequestsStack = createStackNavigator<RequestsStackParamList>();
const RequestsNavigator = () => {
  try {
    return (
      <RequestsStack.Navigator
        screenOptions={defaultHeaderStyle}
      >
        <RequestsStack.Screen 
          name="RequestsList" 
          component={PlaceholderScreen}
          options={{
            title: 'Partner Requests',
          }}
        />
        <RequestsStack.Screen 
          name="RequestDetails" 
          component={PlaceholderScreen}
          options={{
            title: 'Request Details',
          }}
        />
      </RequestsStack.Navigator>
    );
  } catch (error) {
    console.error("RequestsNavigator error:", error);
    return <ErrorFallback />;
  }
};

// Profile Stack
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const ProfileNavigator = () => {
  try {
    return (
      <ProfileStack.Navigator
        screenOptions={defaultHeaderStyle}
      >
        <ProfileStack.Screen 
          name="MyProfile" 
          component={PlaceholderScreen}
          options={{
            title: 'Profile'
          }}
        />
        <ProfileStack.Screen 
          name="EditProfile" 
          component={PlaceholderScreen}
          options={{
            title: 'Edit Profile',
          }}
        />
      </ProfileStack.Navigator>
    );
  } catch (error) {
    console.error("ProfileNavigator error:", error);
    return <ErrorFallback />;
  }
};

// Settings Stack
const SettingsStack = createStackNavigator<SettingsStackParamList>();
const SettingsNavigator = () => {
  try {
    return (
      <SettingsStack.Navigator
        screenOptions={defaultHeaderStyle}
      >
        <SettingsStack.Screen 
          name="SettingsList" 
          component={PlaceholderScreen}
          options={{
            title: 'Settings',
          }}
        />
        <SettingsStack.Screen 
          name="AccountSettings" 
          component={PlaceholderScreen}
          options={{
            title: 'Account',
          }}
        />
        <SettingsStack.Screen 
          name="NotificationSettings" 
          component={PlaceholderScreen}
          options={{
            title: 'Notifications',
          }}
        />
        <SettingsStack.Screen 
          name="PrivacySettings" 
          component={PlaceholderScreen}
          options={{
            title: 'Privacy',
          }}
        />
      </SettingsStack.Navigator>
    );
  } catch (error) {
    console.error("SettingsNavigator error:", error);
    return <ErrorFallback />;
  }
};

// Discovery Stack 
const DiscoveryStack = createStackNavigator<DiscoveryStackParamList>();
const DiscoveryNavigator = () => {
  try {
    return (
      <DiscoveryStack.Navigator
        screenOptions={defaultHeaderStyle}
      >
        <DiscoveryStack.Screen 
          name ="Discover"
          component={DiscoverScreen} 
          options={{
            title: 'Discover Buddies',
          }}
        />
        <DiscoveryStack.Screen 
          name="UserProfile" 
          component={PlaceholderScreen}
          options={{
            title: 'Profile',
          }}
        />
        <DiscoveryStack.Screen 
          name="FilterSettings" 
          component={PlaceholderScreen}
          options={{
            title: 'Filters',
          }}
        />
      </DiscoveryStack.Navigator>
    );
  } catch (error) {
    console.error("DiscoveryNavigator error:", error);
    return <ErrorFallback />;
  }
};

// Main Tab Navigator - 5 Tab Style
const MainTab = createBottomTabNavigator();
const MainNavigator = () => {
  try {
    return (
      <MainTab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainTab.Screen 
          name="Messages" 
          component={MessagingNavigator} 
          options={{
            title: 'Messages'
          }}
        />
        <MainTab.Screen 
          name="Requests" 
          component={RequestsNavigator}
          options={{
            title: 'Requests'
          }}
        />
        <MainTab.Screen 
          name="Discovery" 
          component={DiscoveryNavigator}
          options={{
            title: 'Discover'
          }}
        />
        <MainTab.Screen 
          name="Profile" 
          component={ProfileNavigator}
          options={{
            title: 'Profile'
          }}
        />
        <MainTab.Screen 
          name="Settings" 
          component={SettingsNavigator}
          options={{
            title: 'Settings'
          }}
        />
      </MainTab.Navigator>
    );
  } catch (error) {
    console.error("MainNavigator error:", error);
    return <ErrorFallback />;
  }
};

// Root Navigator
const RootStack = createStackNavigator();
export const RootNavigator = () => {
  try {
    // Mock authentication state
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
  } catch (error) {
    console.error("RootNavigator error:", error);
    return <ErrorFallback />;
  }
};
