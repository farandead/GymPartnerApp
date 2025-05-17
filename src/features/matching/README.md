# Matching Feature

## Overview
The matching module handles user discovery, matching algorithms, and the swipe-style interface (similar to Bumble).

## Implementation Requirements

### Gender-Based Filters
- Implement filter options for gender preferences
- Support multiple gender identity options
- Privacy-focused filter settings

### Components
- `SwipeCard`: Tinder/Bumble style card for potential matches
- `MatchList`: List of current matches
- `LikesYouList`: Users who have liked your profile
- `MatchFilters`: UI for setting match preferences
- `MatchPopup`: Animation/display when a match occurs

### Services
- `matchingService`: Handle matching algorithms and data
- `recommendationService`: Process and deliver recommendations
- `userDiscoveryService`: Find potential matches based on criteria

### Screens
- `DiscoveryScreen`: Swipe interface for potential matches
- `MatchesScreen`: View all matches
- `LikesYouScreen`: See users who have liked you
- `MatchFilterScreen`: Set matching preferences

### Types
- `Match`: Match data structure
- `MatchPreferences`: User matching preferences
- `SwipeAction`: Enum for swipe actions (like, pass, etc.)

## ML Recommendation System
- Implement a basic recommendation algorithm based on:
  - Personality question similarities
  - Location proximity
  - Workout preferences
  - Activity level compatibility
  - Previous successful matches (learning)
