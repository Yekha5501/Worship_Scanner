// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


const Layout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="scanner" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
       
      </Stack>
    </>
  );
};

export default Layout;
