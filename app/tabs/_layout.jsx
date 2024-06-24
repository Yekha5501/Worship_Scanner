import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={tw`flex items-center justify-center gap-2`}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
      <Text style={[tw`${focused ? 'font-semibold' : 'font-regular'} text-xs`, { color }]}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#00bfff',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: tw`bg-white shadow-lg shadow-gray-500/50 rounded-t-xl border-t border-gray-200 h-15`,
          tabBarIconStyle: tw`w-10 h-10`,
          tabBarLabelStyle: tw`text-xs font-medium`,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={require('../../assets/icons/home.png')} // Adjust the path as needed
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={require('../../assets/icons/profile.png')} // Adjust the path as needed
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
