// app/scanner/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

const ScannerLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="ScannerScreen" />
    </Stack>
  );
};

export default ScannerLayout;
