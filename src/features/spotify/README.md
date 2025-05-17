# Spotify Integration Feature

## Overview
The Spotify integration module allows users to share gym playlists and view music compatibility with potential matches.

## Implementation Requirements

### Components
- `SpotifyConnect`: Connect Spotify account
- `PlaylistGallery`: Display user playlists
- `PlaylistShare`: Share playlists with matches
- `MusicCompatibility`: Display music taste compatibility
- `CurrentlyPlayingWidget`: Show currently playing track

### Services
- `spotifyAuthService`: Handle Spotify authentication
- `spotifyApiService`: Interface with Spotify API
- `playlistSharingService`: Manage shared playlists

### Screens
- `SpotifyConnectScreen`: Link Spotify account
- `PlaylistsScreen`: View and select playlists
- `MusicPreferencesScreen`: Set music preferences
- `SharedMusicScreen`: View shared playlists

### Types
- `SpotifyAuth`: Spotify authentication data
- `Playlist`: Playlist data structure
- `Track`: Track data structure
- `MusicPreferences`: User music preferences

## Spotify API Integration
- Implement OAuth flow for Spotify connection
- Request minimal required permissions
- Access user's public playlists
- Allow creating "Gym Favorites" playlists
- Implement playlist recommendations

## Implementation Notes
- Use Spotify Web API
- Ensure proper token refresh handling
- Consider offline access for shared playlists
- Implement music taste compatibility scoring
- Allow disconnect/reconnect of Spotify accounts
