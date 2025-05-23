import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'HeightSelection'>;

interface HeightOption {
  label: string;
  value: string;
}

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 7;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export const HeightSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedHeight, setSelectedHeight] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);

  const generateHeightOptions = (): HeightOption[] => {
    const heights: HeightOption[] = [];
    for (let feet = 4; feet <= 7; feet++) {
      for (let inches = 0; inches < 12; inches++) {
        if (feet === 7 && inches > 0) break;
        const heightString = `${feet}' ${inches}"`;
        heights.push({
          label: heightString,
          value: heightString,
        });
      }
    }
    return heights;
  };

  const heightOptions = generateHeightOptions();
  const initialIndex = heightOptions.findIndex(h => h.value === "6' 2\"");

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
        viewPosition: 0.5
      });
      setSelectedHeight(heightOptions[initialIndex].value);
    }, 100);
  }, []);

  const handleContinue = () => {
    if (selectedHeight) {
      navigation.navigate('InterestsSelection');
    }
  };

  const handleSkip = () => {
    navigation.navigate('InterestsSelection');
  };

  const renderHeightOption = ({ item }: ListRenderItemInfo<HeightOption>) => (
    <View className="h-[48px] mx-5 justify-center items-center">
      <Text
        className={`text-2xl ${
          selectedHeight === item.value
            ? 'text-pump-white font-semibold'
            : 'text-pump-white/30'
        }`}
      >
        {item.label}
      </Text>
    </View>
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (heightOptions[index] && heightOptions[index].value !== selectedHeight) {
      setSelectedHeight(heightOptions[index].value);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[98%]" />
        </View>

        {/* Title */}
        <Text className="text-[42px] font-bold text-pump-white mb-4">
          Now, let's talk about you
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-12">
          Let's get the small talk out of the way. We'll get into the deep and meaningful later.
        </Text>

        {/* Height Label */}
        <Text className="text-3xl font-bold text-pump-white mb-8">
          Your height
        </Text>

        {/* Height Picker */}
        <View className="items-center flex-1">
          <View className="h-[336px] w-full relative">
            {/* Selector Border */}
            <View 
              className="absolute w-full h-[48px] top-[144px] border border-pump-white/20 rounded-xl"
              pointerEvents="none"
            />

            {/* Top Fade */}
            <View 
              className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-pump-black to-transparent z-10"
              pointerEvents="none"
            />

            <FlatList
              ref={flatListRef}
              data={heightOptions}
              renderItem={renderHeightOption}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              ListHeaderComponent={<View style={{ height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2 }} />}
              ListFooterComponent={<View style={{ height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2 }} />}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              initialScrollIndex={initialIndex}
              onScroll={onScroll}
              scrollEventThrottle={16}
            />

            {/* Bottom Fade */}
            <View 
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-pump-black to-transparent z-10"
              pointerEvents="none"
            />
          </View>
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={handleSkip}
          className="absolute bottom-8 left-5"
        >
          <Text className="text-pump-white/90 text-lg font-semibold">Skip</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={selectedHeight !== ''}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};

export default HeightSelectionScreen;
