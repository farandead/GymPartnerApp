# Adding Your Custom Background Image

To personalize the PumpCult app with your own background image, follow these steps:

## Image Requirements
- **Resolution**: At least 1080x1920px (portrait orientation)
- **Format**: .jpg or .png (PNG preferred if transparency is needed)
- **Content**: Ideally a gym-related image that represents your brand
- **Considerations**: Choose an image with darker areas so text remains readable

## Steps to Add Your Image

1. Place your image in the `assets/images/` folder
2. Open `components/WelcomeScreen.tsx`
3. Locate the line: `const bgImage = null;`
4. Replace it with: `const bgImage = require('../assets/images/your-image-filename.jpg');`
   (Change the filename to match your actual image file's name)

## Customizing the Image Display

You can adjust how the background image appears by modifying these properties in BackgroundImage component when it's called:

- **overlayOpacity**: Controls the darkness of the overlay (0.0 to 1.0)
  - Example: `overlayOpacity={0.5}` for 50% dark overlay
- **blurIntensity**: Controls the blur effect (iOS only)
  - Example: `blurIntensity={5}` for a subtle blur

## Example Configuration

```typescript
// For a darker overlay with less blur:
<BackgroundImage 
  imageSource={require('../assets/images/gym-background.jpg')} 
  overlayOpacity={0.7}
  blurIntensity={5}
>
  {/* Content remains the same */}
</BackgroundImage>
```

## Best Practices

- Test your image on different devices to ensure text remains readable
- Consider providing multiple image sizes using asset catalogs for best performance
- Avoid very bright images that make the text hard to read
