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
    <View className="flex-row h-20 items-center justify-around bg-pump-black border-t border-pump-white/10 pb-2">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const isDiscovery = route.name === 'Discovery';

        // Map route names to icon names
        const getIconName = () => {
          switch (route.name) {
            case 'Profile':
              return 'user';
            case 'Discovery':
              return 'compass';
            case 'Requests':
              return 'users';
            case 'Messages':
              return 'message-circle';
            case 'Settings':
              return 'settings';
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
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 12,
              paddingVertical: 8,
              // Add negative margin-top only to the Discovery tab
              marginTop: isDiscovery ? -20 : 0,
            }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={`${label} tab`}
          >
            {isDiscovery ? (
              <View
                style={{
                  backgroundColor: '#FF8600',
                  borderRadius: 30,
                  width: 56,
                  height: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name={getIconName()} size={28} color="#FFFFFF" />
              </View>
            ) : (
              <Icon
                name={getIconName()}
                size={24}
                color={isFocused ? '#FF8600' : '#FFFFFF'}
              />
            )}
            <Text
              className={`text-xs mt-1 ${
                isFocused ? 'text-pump-orange' : 'text-pump-white'
              }`}
            >
              {typeof label === 'string' ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
