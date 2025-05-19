export interface Profile {
  id: string;
  name: string;
  bio: string;
  photos: ProfilePhoto[];
  workoutPreferences: WorkoutPreferences;
  personalityAnswers: PersonalityAnswers;
  completionPercentage: number;
}

export interface ProfilePhoto {
  id: string;
  url: string;
  isGymPhoto: boolean;
  isVerified: boolean;
}

export interface WorkoutPreferences {
  style: 'solo' | 'partner' | 'group';
  frequency: number;
  preferredTimes: string[];
  goals: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface PersonalityAnswers {
  workoutStyle: string;
  fitnessGoals: string[];
  schedule: {
    frequency: number;
    preferredTimes: string[];
  };
  activities: string[];
  experience: string;
}
