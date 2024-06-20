import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
