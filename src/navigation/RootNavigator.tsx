import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
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
import { ProfileScreen } from '~/features/profile/screens';

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
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1B2021',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <ProfileStack.Screen 
      name="MyProfile" 
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <ProfileStack.Screen 
      name="EditProfile" 
      component={PlaceholderScreen}
      options={{
        title: 'Edit Profile',
      }}
    />
    <ProfileStack.Screen 
      name="Settings" 
      component={PlaceholderScreen} 
      options={{
        title: 'Settings',
      }}
    />
    <ProfileStack.Screen 
      name="AccountSettings" 
      component={PlaceholderScreen}
      options={{
        title: 'Account',
      }}
    />
    <ProfileStack.Screen 
      name="NotificationSettings" 
      component={PlaceholderScreen}
      options={{
        title: 'Notifications',
      }}
    />
    <ProfileStack.Screen 
      name="PrivacySettings" 
      component={PlaceholderScreen}
      options={{
        title: 'Privacy',
      }}
    />
  </ProfileStack.Navigator>
);

// Main Tab Navigator
const MainTab = createBottomTabNavigator();
const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: '#1B2021',
        borderTopWidth: 0,
        paddingBottom: 5,
        height: 60,
      },
      tabBarActiveTintColor: '#FF8600',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Messages':
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            break;
          case 'Nearby':
            iconName = focused ? 'location' : 'location-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'ellipsis-horizontal';
        }
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    })}
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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating auth check
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // For development, you can toggle this to true to skip auth
      setIsAuthenticated(true);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-pump-black">
        <ActivityIndicator color="#FF8600" size="large" />
      </View>
    );
  }
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
