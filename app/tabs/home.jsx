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

  const handleOfflineScannerPress = () => {
    router.push('/scanner/OfflineScanner');
  };

  const handleOnlineScannerPress = () => {
    router.push('/scanner/ScannerScreen');
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await axios.post('https://51e4-105-234-160-30.ngrok-free.app/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          await AsyncStorage.removeItem('userToken');
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
      <View style={tw`bg-blue-500 p-4 shadow-md`}>
        <Text style={tw`text-white text-2xl font-bold text-center`}>Worship Scan</Text>
      </View>

      {/* Main Content */}
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-gray-800 text-base text-center mb-8`}>
          Scan QR codes to mark attendance for worship sessions
        </Text>

        {/* Scanner Buttons */}
        <View style={tw`flex-row justify-between w-full px-6`}>
          {/* Online Scanner */}
          <TouchableOpacity
            style={tw`bg-blue-600 w-36 h-36 rounded-lg shadow-lg items-center justify-center`}
            onPress={handleOnlineScannerPress}
          >
            <Icon name="qr-code-scanner" size={36} style={tw`text-white`} />
            <Text style={tw`text-white text-sm font-semibold mt-2`}>Online Scan</Text>
          </TouchableOpacity>

          {/* Offline Scanner */}
          <TouchableOpacity
            style={tw`bg-green-600 w-36 h-36 rounded-lg shadow-lg items-center justify-center`}
            onPress={handleOfflineScannerPress}
          >
            <Icon name="qr-code" size={36} style={tw`text-white`} />
            <Text style={tw`text-white text-sm font-semibold mt-2`}>Offline Scan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Section */}
      <View style={tw`px-6 mb-4`}>
        <TouchableOpacity
          style={tw`bg-white border border-gray-300 rounded-lg p-3 flex-row items-center justify-center shadow-sm`}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#1cc6ff" />
          ) : (
            <>
              <Icon name="logout" size={20} style={tw`text-blue-500 mr-2`} />
              <Text style={tw`text-blue-500 font-bold text-base`}>Logout</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={tw`px-6 py-4`}>
        <Text style={tw`text-sm text-center text-gray-500`}>
          Powered by Worship Attendance App
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
