import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QRCodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [scannedData, setScannedData] = useState(null); // State for temporarily storing scanned data

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    const loadAuthToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
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
    setScannedData(data); // Temporarily store scanned data

    try {
      const response = await axios.post(
        'https://phplaravel-1397226-5183104.cloudwaysapps.com/api/scan-attendance',
        {
          qrCodeData: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const studentName = response.data.student.name;
      Alert.alert('Scanning Successful', `${studentName}: ${response.data.message}`);
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred while scanning the QR code');
      }
    } finally {
      setIsLoading(false);
      setScannedData(null); // Clear scanned data after processing
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
      <BarCodeScanner
        onBarCodeScanned={isLoading ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
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
