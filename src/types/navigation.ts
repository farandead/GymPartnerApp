export type AuthStackParamList = {
  Welcome: undefined;
  PhoneLogin: undefined;
  OtpVerification: { phoneNumber: string };
  LocationPermission: undefined;
  NotificationPermission: undefined;
  PrivacyConsent: undefined;
  PrivacyPreferences: undefined;
  TrackingConsent: undefined;  
  ProfileSetup: undefined;
  GenderSelection: { firstName: string };
  GenderVisibility: { gender: string };
  Email: undefined;
  GymMode: undefined;
  PreferredPartners: { mode: string };
  PersonalQuestions: undefined;
  InterestsSelection: undefined;
  Photos: undefined;
  WorkoutGoals: { preferences: { openToAll: boolean; selectedPartners: string[] } };
  HeightSelection: undefined;
};

export type MainTabParamList = {
  Messages: undefined;
  Requests: undefined;
  Discovery: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Discover: undefined;
  MatchDetails: { id: string };
  LikesYou: undefined;
};

export type MessagingStackParamList = {
  Conversations: undefined;
  Chat: { 
    conversationId: string;
    name: string;
    avatar?: string; // Add avatar for header display
  };
  MessageSettings: { 
    conversationId: string;
  };
};

export type RequestsStackParamList = {
  RequestsList: undefined;
  RequestDetails: { requestId: string };
};

export type ProfileStackParamList = {
  MyProfile: undefined;
  EditProfile: undefined;
};

export type SettingsStackParamList = {
  SettingsList: undefined;
  AccountSettings: undefined;
  NotificationSettings: undefined;
  PrivacySettings: undefined;
};

export type DiscoveryStackParamList = {
  DiscoverPeople: undefined;
  UserProfile: { userId: string };
  FilterSettings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}
