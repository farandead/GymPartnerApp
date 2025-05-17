# Location Feature

## Overview
The location module handles geolocation services with privacy as a primary concern.

## Implementation Requirements

### Components
- `LocationPermissions`: Request and explain location permissions
- `LocationSettings`: Control location sharing settings
- `DistanceDisplay`: Show distance to other users
- `LocationPrivacyInfo`: Explain location privacy measures

### Services
- `locationService`: Handle location data requests and storage
- `geocodingService`: Convert coordinates to readable locations
- `privacySettingsService`: Manage location privacy settings

### Screens
- `LocationPermissionScreen`: Request location permissions
- `LocationSettingsScreen`: Adjust location visibility settings

### Types
- `UserLocation`: Location data structure
- `PrivacySettings`: Location privacy settings
- `LocationPermissionStatus`: Location permission states

## Privacy Features
- Fuzzy location (neighborhood level, not exact)
- Configurable visibility settings
- Location data expiration/auto-deletion
- Clear opt-out process
- Distance display without revealing exact location

## Implementation Notes
- Use Expo Location API
- Request minimal required permissions
- Clear communication about how location data is used
- Consider implementing location caching to reduce continuous tracking
