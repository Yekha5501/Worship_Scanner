import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';

const QRScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState([]);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle QR code scanning
 const handleBarCodeScanned = ({ data }) => {
  const currentTime = new Date().toLocaleString('en-GB', { hour12: false }).replace(',', ''); // Corrected Time
  const isDuplicate = scannedData.some((item) => item.registration === data);

  if (!isDuplicate) {
    setScannedData((prevData) => [
      ...prevData,
      { registration: data, time: currentTime },
    ]);
    Alert.alert('Scanned', `Registration Number: ${data}\nTime: ${currentTime}`);
  } else {
    Alert.alert('Duplicate', 'This registration number has already been scanned.');
  }
};

  // Share scanned data as an Excel file
  const shareExcel = async () => {
    if (scannedData.length === 0) {
      Alert.alert('Error', 'No data to share.');
      return;
    }

    // Correct Excel format
    const worksheetData = [['Registration Number', 'Time Scanned']];
    scannedData.forEach((item) => worksheetData.push([item.registration, item.time]));

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Scanned Data');

    // Generate Excel file in base64 format
    const excelBase64 = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

    // Create a temporary file in the cache directory
    const fileUri = `${FileSystem.cacheDirectory}scanned_data.xlsx`;

    // Write the Excel data to the temporary file
    await FileSystem.writeAsStringAsync(fileUri, excelBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Sharing is not available on this platform.');
        return;
      }

      // Share the file directly
      await Sharing.shareAsync(fileUri);

      // Clear scanned data after sharing
      setScannedData([]);
      Alert.alert('Shared and Cleared', 'Scanned data has been shared and cleared.');
    } catch (error) {
      Alert.alert('Error', 'Failed to share the file.');
      console.error(error);
    }
  };

  // Render the scanner or permission message
  if (hasPermission === null) {
    return <Text style={styles.message}>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.message}>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* QR Code Scanner */}
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay with Buttons */}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          Scanned: {scannedData.length} registration numbers
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={shareExcel}>
            <Text style={styles.buttonText}>Share Excel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#1cc6ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default QRScannerScreen;
