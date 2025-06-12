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
// import {
//   ChatScreen,
//   ConversationsScreen,
//   MessageSettingsScreen
// } from '~/features/messaging/screens';
import { NotificationPermissionScreen } from '~/features/notifications/screens';
import { ProfileSetupScreen } from '~/features/profile/screens';
import { MainTabParamList, MessagingStackParamList } from '../types/navigation';

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
    <AuthStack.Screen name="HeightSelection" component={HeightSelectionScreen} />
    <AuthStack.Screen name="Photos" component={PhotosScreen} />
    <AuthStack.Screen name="PersonalQuestions" component={PersonalQuestionsScreen} />
    <AuthStack.Screen name="InterestsSelection" component={InterestsSelectionScreen} />
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
const MessagingStack = createStackNavigator<MessagingStackParamList>();

type MessagingScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MessagingStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

const MessagingNavigator = () => (
  <MessagingStack.Navigator
    screenOptions={{
      headerShown: true, // Show header for messaging screens
      headerStyle: {
        backgroundColor: '#1B2021',
        elevation: 0, // Android
        shadowOpacity: 0, // iOS
      },
      headerTintColor: '#FF8600',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerTitleAlign: 'center',
    }}
  >
    <MessagingStack.Screen 
      name="Conversations" 
      // component={ConversationsScreen}
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
      // component={ChatScreen}
      component={PlaceholderScreen}
      options={({ route }) => ({
        headerShown: false,
        title: route.params?.name,
      })}
    />
    <MessagingStack.Screen 
      name="MessageSettings" 
      // component={MessageSettingsScreen}
      component={PlaceholderScreen}
      options={{
        title: 'Settings',
      }}
    />
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
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FF8600',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerTitleAlign: 'center',
    }}
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
    {/* ...other profile screens... */}
  </ProfileStack.Navigator>
);

// Requests Stack
const RequestsStack = createStackNavigator();
const RequestsNavigator = () => (
  <RequestsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1B2021',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FF8600',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerTitleAlign: 'center',
    }}
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
    />
  </RequestsStack.Navigator>
);

// Discovery Stack
const DiscoveryStack = createStackNavigator();
const DiscoveryNavigator = () => (
  <DiscoveryStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1B2021',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FF8600',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerTitleAlign: 'center',
    }}
  >
    <DiscoveryStack.Screen 
      name="DiscoverPeople" 
      component={PlaceholderScreen}
      options={{
        title: 'Discover Partners',
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

// Settings Stack
const SettingsStack = createStackNavigator();
const SettingsNavigator = () => (
  <SettingsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1B2021',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FF8600',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerTitleAlign: 'center',
    }}
  >
    <SettingsStack.Screen 
      name="SettingsList" 
      component={PlaceholderScreen}
      options={{
        title: 'Settings',
      }}
    />
    <SettingsStack.Screen 
      name="AppSettings" 
      component={PlaceholderScreen} 
    />
    <SettingsStack.Screen 
      name="Privacy" 
      component={PlaceholderScreen} 
    />
    <SettingsStack.Screen 
      name="Notifications" 
      component={PlaceholderScreen} 
    />
    <SettingsStack.Screen 
      name="Help" 
      component={PlaceholderScreen} 
    />
  </SettingsStack.Navigator>
);

// Main Tab Navigator
const MainTab = createBottomTabNavigator();
const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#1B2021',
        borderTopWidth: 0,
        height: 80, 
        paddingTop: 10,
        paddingBottom: 20,
      },
      tabBarActiveTintColor: '#FF8600',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarLabel: ({ focused, color }) => (
        <Text 
          className={`text-xs ${focused ? 'font-semibold' : 'font-normal'} mb-1`}
          style={{ color }}
        >
          {route.name}
        </Text>
      ),
    })}
  >
    <MainTab.Screen 
      name="Messages" 
      component={MessagingNavigator} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons 
            name={focused ? 'chatbubbles' : 'chatbubbles-outline'} 
            size={size} 
            color={color} 
          />
        ),
      }}
    />
    <MainTab.Screen 
      name="Requests" 
      component={RequestsNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons 
            name={focused ? 'people' : 'people-outline'} 
            size={size} 
            color={color} 
          />
        ),
      }}
    />
    <MainTab.Screen 
      name="Discovery" 
      component={DiscoveryNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <View className="bg-pump-orange rounded-full w-14 h-14 items-center justify-center -mt-6">
            <Ionicons 
              name={focused ? 'compass' : 'compass-outline'} 
              size={28} 
              color="#FFFFFF" 
            />
          </View>
        ),
      }}
    />
    <MainTab.Screen 
      name="Profile" 
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons 
            name={focused ? 'person' : 'person-outline'} 
            size={size} 
            color={color} 
          />
        ),
      }}
    />
    <MainTab.Screen 
      name="Settings" 
      component={SettingsNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons 
            name={focused ? 'settings' : 'settings-outline'} 
            size={size} 
            color={color} 
          />
        ),
      }}
    />
  </MainTab.Navigator>
);

// Root Navigator
const RootStack = createStackNavigator();
export const RootNavigator = () => {
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
};
