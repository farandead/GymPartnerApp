# PumpCult App Architecture

## Folder Structure

The application follows a feature-based architecture with the following structure:

```
src/
├── assets/           # App assets (images, fonts, etc.)
├── components/       # Shared components
├── constants/        # App-wide constants
├── context/          # React Context providers
├── features/         # Feature modules
│   ├── auth/         # Authentication
│   ├── profile/      # Profile management
│   ├── matching/     # User matching system
│   ├── messaging/    # Chat functionality
│   ├── location/     # Geolocation services
│   ├── nearbyGyms/   # Gym discovery
│   ├── notifications/ # Push notifications
│   ├── workouts/     # Workout tracking
│   ├── mediaUpload/  # Image upload and management
│   ├── contentModeration/ # Content safety
│   ├── spotify/      # Music integration
│   └── recommendations/ # ML-based suggestions
├── hooks/            # Custom React hooks
├── navigation/       # Navigation configuration
├── screens/          # Main app screens
├── services/         # API and third-party service interfaces
├── types/            # TypeScript type definitions
└── utils/            # Helper functions and utilities
```

Each feature module follows a consistent structure:
- `/components` - Feature-specific UI components
- `/screens` - Feature screens
- `/hooks` - Feature-specific hooks
- `/services` - API and business logic
- `/types` - TypeScript types for the feature

## App Navigation Structure

```
App
├── Auth Stack (unauthenticated users)
│   ├── Welcome Screen
│   ├── Phone Login Screen
│   ├── OTP Verification Screen
│   └── Profile Setup Screen
│
└── Main Tab Navigator (authenticated users)
    ├── Home Stack
    │   ├── Discover Screen (matching)
    │   ├── Match Details Screen
    │   └── Likes You Screen
    │
    ├── Messaging Stack
    │   ├── Conversations List Screen
    │   └── Chat Screen
    │
    ├── Nearby Stack
    │   ├── Map Screen
    │   └── Gym Details Screen
    │
    └── Profile Stack
        ├── My Profile Screen
        ├── Edit Profile Screen
        ├── Settings Screen
        ├── Account Settings Screen
        ├── Notification Settings Screen
        └── Privacy Settings Screen
```

## State Management

The app uses a combination of:
- React Context API for global state
- Redux for complex state management where needed
- Local component state for UI-specific state
- AsyncStorage for persistent data

## API Services

Backend services are organized by feature and accessed through service modules:
- `authService` - Authentication and user management
- `profileService` - Profile data
- `matchingService` - Match discovery and management
- `messagingService` - Real-time chat
- etc.

## Third-party Integrations

- **Geolocation**: Expo Location
- **Maps**: Google Maps/MapBox
- **Push Notifications**: Expo Notifications
- **Content Moderation**: Google Vision API/AWS Rekognition
- **Music**: Spotify API
- **Authentication**: Apple, Facebook, SMS
- **Storage**: Cloud storage for media
