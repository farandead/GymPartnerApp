export type AuthStackParamList = {
  Welcome: undefined;
  PhoneLogin: undefined;
  OtpVerification: { phoneNumber: string };
  ProfileSetup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Messages: undefined;
  Nearby: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Discover: undefined;
  MatchDetails: { id: string };
  LikesYou: undefined;
};

export type MessagingStackParamList = {
  Conversations: undefined;
  Chat: { matchId: string };
};

export type NearbyStackParamList = {
  Map: undefined;
  GymDetails: { id: string };
};

export type ProfileStackParamList = {
  MyProfile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  AccountSettings: undefined;
  NotificationSettings: undefined;
  PrivacySettings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}
