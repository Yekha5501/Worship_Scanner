import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tw from '../../lib/tailwind';
import { Redirect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const InputsCard = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://f6f6-105-234-166-13.ngrok-free.app/api/login', {
        email,
        password,
      });

      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        setLoggedIn(true);
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  }, [email, password]);

  if (loggedIn) {
    return <Redirect href="/tabs/home" />;
  }

  return (
    <View style={tw`absolute top-50 left-0 right-0 bottom-0 z-10`}>
      <View style={tw`flex-1 bg-white rounded-t-3xl px-10 pt-2 shadow-lg`}>
        <View style={tw`flex items-center`}>
          <View style={tw`bg-gray-500 h-1 w-15 mb-6`} />
        </View>
        <Text style={tw`text-3xl font-bold mb-8 mt-4`}>Login</Text>
        <View style={tw`mb-4`}>
          <Text style={tw`text-sm font-bold mb-3`}>Email Address</Text>
          <TextInput
            style={tw`border bg-blue-100 border-blue-100 rounded-3xl p-2`}
            placeholder="johndoe@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={tw`mb-2`}>
          <Text style={tw`text-sm font-bold mb-3`}>Password</Text>
          <TextInput
            style={tw`border bg-blue-100 border-blue-100 rounded-3xl p-2`}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={tw`border-2 border-primary rounded-3xl p-3 mt-12 flex-row items-center justify-center`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#1cc6ff" />
          ) : (
            <>
              <Text style={tw`text-primary text-base font-bold mr-2`}>Login</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#1cc6ff" />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={tw`text-gray-500 text-sm text-center font-bold mt-10`}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default InputsCard;
