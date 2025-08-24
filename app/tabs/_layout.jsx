import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="scanner/OfflineScanner" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
      </Stack>
    </>
  );
};

export default RootLayout;