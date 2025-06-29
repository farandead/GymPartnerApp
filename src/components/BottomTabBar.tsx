import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View className="flex-row h-16 items-center justify-around bg-pump-black border-t border-pump-white/10">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        // Map route names to icon names
        const getIconName = () => {
          switch (route.name) {
            case 'Profile':
              return 'user';
            case 'Discover':
              return 'compass';
            case 'People':
              return 'users';
            case 'Messages':
              return 'message-circle';
            default:
              return 'circle';
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="items-center justify-center px-3 py-2"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={`${label} tab`}
          >
            <Icon
              name={getIconName()}
              size={24}
              color={isFocused ? '#FF8600' : '#FFFFFF'}
            />
            <Text
              className={`text-xs mt-1 ${
                isFocused ? 'text-pump-orange' : 'text-pump-white'
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
