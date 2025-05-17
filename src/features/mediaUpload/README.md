# Media Upload Feature

## Overview
The media upload module handles image uploading, management, and profile photo requirements.

## Implementation Requirements

### Components
- `ImagePicker`: Select images from device
- `CameraCapture`: Take photos directly
- `ImageEditor`: Basic editing capabilities
- `ImageGallery`: Display uploaded images
- `GymPhotoVerification`: UI for adding a required gym photo

### Services
- `mediaUploadService`: Handle image uploads
- `mediaStorageService`: Store and retrieve images
- `imageProcessingService`: Process and optimize images

### Screens
- `MediaUploadScreen`: Upload new images
- `GalleryScreen`: View and manage uploaded images
- `PhotoRequirementsScreen`: Explain photo guidelines

### Types
- `MediaItem`: Media data structure
- `UploadStatus`: Upload progress and status
- `MediaValidationResult`: Validation results

## Gym Photo Requirement
- Implement detection of gym environment in photos
- Provide clear guidelines for acceptable gym photos
- Flag profiles that don't have the required gym photo

## Implementation Notes
- Use Expo ImagePicker
- Implement client-side image compression
- Consider adding watermarking for exported images
- Implement proper cache management
- Support multiple image formats
- Enforce reasonable size limits
