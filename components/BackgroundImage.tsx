import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, Platform, StyleSheet, View } from 'react-native';

interface BackgroundImageProps {
  children: React.ReactNode;
  imageSource: any; // Can be a require() or uri source
  blurIntensity?: number;
  overlayOpacity?: number;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
  imageSource,
  blurIntensity = 10,
  overlayOpacity = 0.5,
}) => {
  // State for tracking image loading
  const [isLoading, setIsLoading] = useState(true);
  
  // Try to use provided image, fall back to a solid color if not available
  const source = imageSource || { uri: undefined };

  return (
    <View className="flex-1 bg-pump-black">
      {/* Only render ImageBackground if we have a source */}
      {imageSource && (
        <ImageBackground
          source={source}
          className="flex-1"
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        >
          {/* Overlay with opacity to make content more readable */}
          <View 
            className="absolute inset-0 bg-pump-black"
            style={{ opacity: overlayOpacity }}
          />
          
          {/* Conditional BlurView - only on iOS where it works better */}
          {Platform.OS === 'ios' && (
            <BlurView 
              intensity={blurIntensity} 
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          )}
        </ImageBackground>
      )}
      
      {/* Loading indicator */}
      {isLoading && imageSource && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator size="large" color="#FF8600" />
        </View>
      )}

      {/* Actual content */}
      <View className="flex-1">
        {children}
      </View>
    </View>
  );
};
