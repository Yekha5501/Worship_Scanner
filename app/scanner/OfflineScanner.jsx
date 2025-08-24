import React, { useState, useEffect } from 'react';
import { View, Text,Alert, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Animated } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const QRScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const [scanAnimation] = useState(new Animated.Value(0));
  const [instructionOpacity] = useState(new Animated.Value(1));
  const [feedbackOpacity] = useState(new Animated.Value(0));
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success' or 'duplicate'
  const router = useRouter();

  // Load persisted data from AsyncStorage on mount
  useEffect(() => {
    const loadScannedData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('scannedData');
        if (storedData) {
          setScannedData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading scanned data:', error);
      }
    };
    loadScannedData();
  }, []);

  // Save scanned data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveScannedData = async () => {
      try {
        await AsyncStorage.setItem('scannedData', JSON.stringify(scannedData));
      } catch (error) {
        console.error('Error saving scanned data:', error);
      }
    };
    saveScannedData();
  }, [scannedData]);

  // Animation for scanning line
  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  // Animation for instruction text fade-out
  useEffect(() => {
    if (isScanning) {
      Animated.timing(instructionOpacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(instructionOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isScanning]);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!isScanning) return;

    const currentTime = new Date().toLocaleString('en-GB', { hour12: false }).replace(',', '');
    const isDuplicate = scannedData.some((item) => item.registration === data);

    setIsScanning(false);
    if (!isDuplicate) {
      setScannedData((prevData) => [
        ...prevData,
        { registration: data, time: currentTime },
      ]);
      setFeedbackMessage(`✅ Scanned: ${data}\nTime: ${currentTime}`);
      setFeedbackType('success');
    } else {
      setFeedbackMessage('⚠️ Duplicate: Already scanned');
      setFeedbackType('duplicate');
    }

    // Show feedback and auto-continue
    Animated.sequence([
      Animated.timing(feedbackOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 300,
        delay: 2000, // Display for 2 seconds
        useNativeDriver: true,
      }),
    ]).start(() => setIsScanning(true));
  };

  const shareExcel = async () => {
    if (scannedData.length === 0) {
      setFeedbackMessage('No data to share yet');
      setFeedbackType('error');
      Animated.sequence([
        Animated.timing(feedbackOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(feedbackOpacity, {
          toValue: 0,
          duration: 300,
          delay: 2000,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    try {
      const worksheetData = [['Registration Number', 'Time Scanned']];
      scannedData.forEach((item) => worksheetData.push([item.registration, item.time]));

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Data');

      const excelBase64 = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
      const fileUri = `${FileSystem.cacheDirectory}worship_attendance.xlsx`;

      await FileSystem.writeAsStringAsync(fileUri, excelBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!(await Sharing.isAvailableAsync())) {
        setFeedbackMessage('Sharing not available on this platform');
        setFeedbackType('error');
        Animated.sequence([
          Animated.timing(feedbackOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(feedbackOpacity, {
            toValue: 0,
            duration: 300,
            delay: 2000,
            useNativeDriver: true,
          }),
        ]).start();
        return;
      }

      await Sharing.shareAsync(fileUri);
      
      setFeedbackMessage('Data shared successfully');
      setFeedbackType('success');
      Animated.sequence([
        Animated.timing(feedbackOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(feedbackOpacity, {
          toValue: 0,
          duration: 300,
          delay: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Alert.alert(
          'Success!',
          'Attendance data has been shared successfully.',
          [
            { text: 'Keep Data', style: 'cancel' },
            { 
              text: 'Clear Data', 
              onPress: async () => {
                setScannedData([]);
                await AsyncStorage.removeItem('scannedData');
              },
              style: 'destructive' 
            }
          ]
        );
      });
    } catch (error) {
      setFeedbackMessage('Failed to share the file');
      setFeedbackType('error');
      Animated.sequence([
        Animated.timing(feedbackOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(feedbackOpacity, {
          toValue: 0,
          duration: 300,
          delay: 2000,
          useNativeDriver: true,
        }),
      ]).start();
      console.error(error);
    }
  };

  const clearData = () => {
    Alert.alert(
      'Clear All Data?',
      'This will permanently delete all scanned attendance records.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive', 
          onPress: async () => {
            setScannedData([]);
            await AsyncStorage.removeItem('scannedData');
            setFeedbackMessage('Data cleared successfully');
            setFeedbackType('success');
            Animated.sequence([
              Animated.timing(feedbackOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(feedbackOpacity, {
                toValue: 0,
                duration: 300,
                delay: 2000,
                useNativeDriver: true,
              }),
            ]).start();
          }
        }
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <Icon name="camera" size={48} color="#6b7280" />
          <Text style={styles.permissionTitle}>Camera Access</Text>
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <Icon name="camera-off" size={48} color="#ef4444" />
          <Text style={styles.permissionTitle}>Camera Access Denied</Text>
          <Text style={styles.permissionText}>
            Please enable camera access in your device settings to scan QR codes.
          </Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const scanLineTranslateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      <BarCodeScanner
        onBarCodeScanned={isScanning ? handleBarCodeScanned : undefined}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.topOverlay}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QR Scanner</Text>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsScanning(!isScanning)}
          >
            <Icon name={isScanning ? 'pause' : 'play-arrow'} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.scanningFrame}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
        
        <Animated.View 
          style={[
            styles.scanLine, 
            { transform: [{ translateY: scanLineTranslateY }] }
          ]} 
        />
      </View>

      <Animated.View style={[styles.instructionOverlay, { opacity: instructionOpacity }]}>
        <Text style={styles.instructionText}>
          {isScanning ? 'Point camera at QR code' : 'Scanning paused'}
        </Text>
      </Animated.View>

      <Animated.View style={[styles.feedbackOverlay, { opacity: feedbackOpacity }]}>
        <Text style={[styles.feedbackText, feedbackType === 'success' ? styles.successText : styles.errorText]}>
          {feedbackMessage}
        </Text>
      </Animated.View>

      <View style={styles.bottomOverlay}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Icon name="people" size={20} color="#3b82f6" />
            <Text style={styles.statNumber}>{scannedData.length}</Text>
            <Text style={styles.statLabel}>Scanned</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Icon 
              name={!isScanning ? "pause-circle-filled" : "access-time"} 
              size={20} 
              color={!isScanning ? "#f59e0b" : "#10b981"} 
            />
            <Text style={styles.statNumber}>
              {!isScanning ? 'Paused' : (scannedData.length > 0 ? 'Active' : 'Ready')}
            </Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {scannedData.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearData}>
              <Icon name="clear" size={16} color="#ef4444" />
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.shareButton, scannedData.length === 0 && styles.shareButtonDisabled]} 
            onPress={shareExcel}
            disabled={scannedData.length === 0}
          >
            <Icon name="share" size={16} color="white" />
            <Text style={styles.shareButtonText}>Share Excel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 6,
  },
  permissionText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanningFrame: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.175,
    width: width * 0.65,
    height: width * 0.65,
    zIndex: 5,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#3b82f6',
    borderRadius: 3,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#3b82f6',
    borderRadius: 3,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#3b82f6',
    borderRadius: 3,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#3b82f6',
    borderRadius: 3,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  instructionOverlay: {
    position: 'absolute',
    top: height * 0.55,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  instructionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  feedbackOverlay: {
    position: 'absolute',
    top: height * 0.4,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 6,
  },
  feedbackText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  successText: {
    backgroundColor: 'rgba(16, 185, 129, 0.8)', // Green for success
  },
  errorText: {
    backgroundColor: 'rgba(239, 68, 68, 0.8)', // Red for error/duplicate
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingBottom: 24,
    paddingTop: 16,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  clearButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#ef4444',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 2,
    justifyContent: 'center',
  },
  shareButtonDisabled: {
    backgroundColor: '#6b7280',
    opacity: 0.6,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default QRScannerScreen;