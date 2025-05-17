# Profile Feature

## Overview
The profile module handles user profile creation, editing, and displaying profile information with a focus on gym preferences and personality.

## Implementation Requirements

### Personality Questions
Implement 5 key questions for matching compatibility:
1. Workout style preference (solo, partner, group)
2. Fitness goals (weight loss, muscle gain, endurance, etc.)
3. Workout schedule/frequency
4. Preferred gym activities
5. Fitness experience level

### Components
- `ProfileCard`: Display user profile information
- `ProfileEditor`: Edit profile details
- `PersonalityQuiz`: Component for answering the 5 personality questions
- `GenderPreference`: Set gender preferences for matching
- `ProfileImageGallery`: Display and manage profile images

### Services
- `profileService`: CRUD operations for profile data
- `preferenceService`: Store and retrieve user preferences

### Screens
- `ProfileSetupScreen`: Initial profile creation
- `EditProfileScreen`: Update profile information
- `ProfileViewScreen`: View own or other's profile
- `PreferencesScreen`: Set matching preferences

### Types
- `Profile`: User profile data structure
- `UserPreferences`: User preference settings
- `PersonalityQuestions`: Question and answer data structure

## Requirements
- At least one image must be a gym photo (verified through content moderation)
- Gender preferences must be configurable
- Profile completion percentage tracking
