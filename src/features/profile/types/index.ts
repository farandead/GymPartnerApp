export interface UserProfile {
  id?: string;
  name: string;
  bio: string;
  age: number;
  location: string;
  photos: PhotoType[];
  workoutPreferences: WorkoutPreferences;
  socialLinks?: SocialLinks;
  stats?: WorkoutStats;
  availability?: string[];
}

export interface PhotoType {
  id: string;
  url: string;
  type: 'profile' | 'gym' | 'action';
  isMain: boolean;
}

export interface WorkoutPreferences {
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  frequency: string;
  preferredTime: string[];
  style: 'Solo' | 'Partner' | 'Group';
  goals: string[];
}

export interface SocialLinks {
  instagram?: string;
  strava?: string;
}

export interface WorkoutStats {
  workoutsCompleted: number;
  partneredSessions: number;
  favoriteGym?: string;
  streak: number;
  rating?: number;
}

export const defaultProfile: UserProfile = {
  name: '',
  bio: '',
  age: 0,
  location: '',
  photos: [],
  workoutPreferences: {
    experience: 'Beginner',
    frequency: '1-2 times/week',
    preferredTime: ['Evening'],
    style: 'Solo',
    goals: [],
  },
  socialLinks: {
    instagram: '',
    strava: '',
  },
  stats: {
    workoutsCompleted: 0,
    partneredSessions: 0,
    streak: 0,
    rating: 0,
  },
};
