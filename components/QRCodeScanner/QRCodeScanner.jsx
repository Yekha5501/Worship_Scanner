import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from '../../lib/tailwind';

const QRCodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    const loadAuthToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken'); // Ensure the key matches the one used in logout function
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to load token:', error);
      }
    };

    loadAuthToken();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setIsLoading(true);

    console.log('Scanned Data:', data);
    console.log('Token:', token); // Log the token to ensure it is loaded

    try {
      const response = await axios.post(
        'https://phplaravel-1285273-4657621.cloudwaysapps.com/api/scan-attendance',
        {
          qrCodeData: data, // Assuming data contains the student_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the loaded token
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle the response from the API
      const studentName = response.data.student.name;
      Alert.alert('Scanning Successful', `${studentName}: ${response.data.message}`);
    } catch (error) {
      // Handle error response from the API
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred while scanning the QR code');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={isLoading ? undefined : handleBarCodeScanned}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRCodeScanner;
