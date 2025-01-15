import React from 'react';
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import LoginCard from '../../hooks/Login/LoginCard';
import InputsCard from '../../hooks/Login/InputsCard';

const Login = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Add KeyboardAvoidingView to handle keyboard adjustments */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  // Different behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}  // Adjust offset to avoid content being hidden
      >
        {/* Wrap content inside ScrollView to allow scrolling */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1 }}>
            <LoginCard />
            <InputsCard />
            {/* Other components or content */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
