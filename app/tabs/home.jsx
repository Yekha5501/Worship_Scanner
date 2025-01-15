import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import tw from '../../lib/tailwind'; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Redirect } from 'expo-router';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the scanner page
    router.push('/scanner/ScannerScreen');
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // If token exists, proceed with logout request
      if (token) {
        const response = await axios.post('https://phplaravel-1397226-5183104.cloudwaysapps.com/api/logout', {}, {
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
    <SafeAreaView style={tw`flex-1 bg-gradient-to-b from-blue-100 to-blue-300`}>
      {/* App Bar (Header) */}
      <View style={tw`bg-blue-400 p-4`}>
        <Text style={tw`text-gray-100 text-3xl font-semibold text-center`}>Worship Scan</Text>
      </View>

      {/* Main Content Section */}
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-gray-800 text-lg text-center mb-12`}>
          Scan QR codes to mark attendance for worship sessions
        </Text>
        <TouchableOpacity
          style={tw`bg-ora-800 w-48 h-48 rounded-full shadow-xl items-center justify-center mt-12`}
          onPress={handlePress}
        >
          <Text style={tw`text-4xl font-semibold text-gray-800`}>Press</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button Section */}
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

      {/* Footer Section (Optional, for styling) */}
      <View style={tw`px-6 py-4`}>
        <Text style={tw`text-sm text-center text-gray-600 opacity-80`}>
          Powered by Worship Attendance App
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
