# Nearby Gyms Feature

## Overview
The nearby gyms module identifies and displays information about gyms in the user's vicinity.

## Implementation Requirements

### Components
- `GymMap`: Map display of nearby gyms
- `GymList`: List view of nearby gyms
- `GymDetails`: Detailed information about a specific gym
- `GymStats`: Display how many potential matches frequent a gym
- `UserCountIndicator`: Anonymous count of PumpCult users at a gym

### Services
- `gymFinderService`: Locate and retrieve gym information
- `gymStatisticsService`: Gather anonymous statistics about gym users
- `mapService`: Handle map rendering and interactions

### Screens
- `NearbyGymsScreen`: Display gyms in the area
- `GymDetailScreen`: Detailed view of a specific gym
- `MapScreen`: Map-based view of local gyms

### Types
- `Gym`: Gym data structure
- `GymStatistics`: Anonymous usage statistics
- `GymFilter`: Filtering options for gym search

## API Integration
- Google Places API for gym locations
- Foursquare API as alternative
- OpenStreetMap for map visualization
- Custom backend for anonymous user statistics

## Privacy Considerations
- Display only aggregate numbers of users
- No individual identification at specific gyms
- Opt-out of being counted in statistics
- Clear disclosures about anonymized data collection
