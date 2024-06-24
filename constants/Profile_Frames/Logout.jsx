import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tw from '../../lib/tailwind'; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // If token exists, proceed with logout request
      if (token) {
        const response = await axios.post('https://24b5-102-70-6-135.ngrok-free.app/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          // Clear user token from AsyncStorage
          await AsyncStorage.removeItem('userToken');
          
          // Set loggedOut to true to trigger the redirect
          setLoggedOut(true);
        }
      } else {
        Alert.alert('Error', 'No user token found');
      }
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred during logout');
    } finally {
      setLoading(false);
    }
  };

  if (loggedOut) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <View style={tw`px-4`}>
      <TouchableOpacity
        style={tw`border border-primary rounded-lg p-3 mt-4 flex-row items-center justify-center`}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#1cc6ff" />
        ) : (
          <>
            <Icon name="logout" size={20} style={tw`mr-2 text-primary`} />
            <Text style={tw`text-primary font-bold text-base ml-20`}>Logout</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
