import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { History, Home, Profile } from '../../components';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

const Tab = createBottomTabNavigator();

function HistoryIcon({ color, size }) {
  return (
     <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
        fill={color}
      />
    </Svg>
  );
}

function HomeIcon({ color, size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12l8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ProfileIcon({ color, size }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </Svg>
  );
}

function Bottom_Navigation() {
  return (
  <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'History') {
            return <HistoryIcon color={color} size={size} />;
          } else if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          } else if (route.name === 'Profile') {
            return <ProfileIcon color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: '#00bfff',
        tabBarInactiveTintColor: 'gray',
         tabBarStyle: tw`bg-white shadow-lg shadow-gray-500/50 rounded-t-xl border-t border-gray-200 h-15`,  // Tailwind style for tab bar
        tabBarIconStyle: tw`w-10 h-10`, // Tailwind style for tab icons
        tabBarLabelStyle: tw`text-xs font-medium`, // Tailwind style for tab labels
      })}
    >
      <Tab.Screen
        name="History"
        component={History}
        options={{ headerShown: false }} // Hide the header for this screen
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} // Hide the header for this screen
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }} // Hide the header for this screen
      />
    </Tab.Navigator>
  );
}

export default Bottom_Navigation;
