import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '../../lib/tailwind';
import { Redirect } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(80));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  const mockUser = {
    email: 'worship@mchs.org',
    password: '12345678',
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setLoggedIn(true);
      }
    };
    checkLoginStatus();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      if (email === mockUser.email && password === mockUser.password) {
        await AsyncStorage.setItem('userToken', 'mock_token_123');
        setLoggedIn(true);
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  if (loggedIn) {
    return <Redirect href="/tabs/home" />;
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <LinearGradient
        colors={['#dbeafe', '#e0f2fe', '#ffffff']}
        style={tw`flex-1`}
      >
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        >
          <View style={tw`flex-1`}>
            {/* Header Section */}
            <View style={tw`flex-1 relative`}>
              <LinearGradient
                colors={['#2563eb', '#3b82f6', '#6366f1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`flex-1`}
              >
                {/* Reduced Bubble Sizes */}
                <View style={tw`absolute -top-16 -right-16 w-28 h-28 bg-white opacity-10 rounded-full`} />
                <View style={tw`absolute top-1/3 -right-10 w-16 h-16 bg-purple-300 opacity-20 rounded-full`} />
                <View style={tw`absolute -top-24 -left-12 w-24 h-24 bg-white opacity-5 rounded-full`} />
                <View style={tw`absolute bottom-24 left-6 w-12 h-12 bg-blue-200 opacity-20 rounded-full`} />

                {/* Logo + Welcome */}
                <View style={tw`flex-1 justify-center items-center px-6 pt-10`}>
                  <View style={tw`mb-4`}>
                    <LinearGradient
                      colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                      style={tw`rounded-full p-4`}
                    >
                      <LinearGradient
                        colors={['#ffffff', '#f8fafc']}
                        style={tw`rounded-full p-3`}
                      >
                        <Ionicons name="shield-checkmark" size={26} color="#2563eb" />
                      </LinearGradient>
                    </LinearGradient>
                  </View>
                  <Text style={tw`text-white text-2xl font-bold text-center mb-1 tracking-tight`}>
                    Welcome Back
                  </Text>
                  <Text style={tw`text-blue-100 text-base text-center mb-3 font-medium`}>
                    Worship Management System
                  </Text>
                  <Text style={tw`text-blue-200 text-xs text-center px-3 mb-6 leading-4`}>
                    Sign in to access your worship dashboard
                  </Text>
                </View>
              </LinearGradient>
            </View>

            {/* Form Section */}
            <Animated.View
              style={[
                tw`bg-white/95 rounded-t-3xl px-5 pt-6 pb-8 shadow-lg border-t border-white/20`,
                { marginTop: -20, opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] },
              ]}
            >
              {/* Reduced Handle Bar */}
              <View style={tw`flex items-center mb-6`}>
                <View style={tw`h-1 w-12 bg-gray-300 rounded-full`} />
              </View>

              {/* Reduced Header */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-2xl font-bold text-gray-900 mb-1 tracking-tight`}>
                  Sign In
                </Text>
                <Text style={tw`text-gray-600 text-sm font-medium`}>
                  Enter your credentials to continue
                </Text>
              </View>

              {/* Reduced Email Input */}
              <View style={tw`mb-5`}>
                <Text style={tw`text-xs font-semibold text-gray-800 mb-2 tracking-wide uppercase`}>
                  Email
                </Text>
                <View
                  style={[
                    tw`relative overflow-hidden rounded-xl shadow-sm`,
                    emailFocused ? tw`shadow-md shadow-blue-500/20` : tw`shadow-gray-200/40`,
                  ]}
                >
                  <LinearGradient
                    colors={['#fafafa', '#f5f5f5', '#ffffff']}
                    style={tw`absolute inset-0`}
                  />
                  <View style={tw`absolute left-4 top-0 bottom-0 justify-center z-20`}>
                    <MaterialIcons name="email" size={16} color={emailFocused ? '#3b82f6' : '#6b7280'} />
                  </View>
                  <TextInput
                    style={tw`pl-10 pr-4 py-3 text-sm font-medium text-gray-900 z-10`}
                    placeholder="Enter your email"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </View>
              </View>

              {/* Reduced Password Input */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-xs font-semibold text-gray-800 mb-2 tracking-wide uppercase`}>
                  Password
                </Text>
                <View
                  style={[
                    tw`relative overflow-hidden rounded-xl shadow-sm`,
                    passwordFocused ? tw`shadow-md shadow-blue-500/20` : tw`shadow-gray-200/40`,
                  ]}
                >
                  <LinearGradient
                    colors={['#fafafa', '#f5f5f5', '#ffffff']}
                    style={tw`absolute inset-0`}
                  />
                  <View style={tw`absolute left-4 top-0 bottom-0 justify-center z-20`}>
                    <MaterialIcons name="lock" size={16} color={emailFocused ? '#3b82f6' : '#6b7280'} />
                  </View>
                  <TextInput
                    style={tw`pl-10 pr-10 py-3 text-sm font-medium text-gray-900 z-10`}
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    autoComplete="password"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    style={tw`absolute right-3 top-0 bottom-0 justify-center z-20`}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={16} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Reduced Login Button */}
              <TouchableOpacity
                style={[tw`rounded-xl shadow-md mb-3 overflow-hidden`, loading && tw`opacity-70`]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#4338ca', '#6366f1', '#7c3aed']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`py-3 px-5 flex-row items-center justify-center`}
                >
                  {loading ? (
                    <View style={tw`flex-row items-center`}>
                      <ActivityIndicator size="small" color="white" />
                      <Text style={tw`text-white text-sm font-semibold ml-2 tracking-wide`}>
                        Authenticating...
                      </Text>
                    </View>
                  ) : (
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-white text-sm font-semibold tracking-wide`}>
                        Sign In
                      </Text>
                      <MaterialIcons name="arrow-forward" size={16} color="white" style={tw`ml-2`} />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Reduced Footer Text */}
              <Text style={tw`text-center text-gray-500 text-xs font-medium mt-2`}>
                Secure authentication powered by modern encryption
              </Text>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;