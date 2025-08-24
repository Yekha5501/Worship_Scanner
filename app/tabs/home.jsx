import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '../../lib/tailwind';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(80));

  useEffect(() => {
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
    ]).start();
  }, [fadeAnim, slideAnim]);

  useFocusEffect(
    useCallback(() => {
      loadAttendanceData();
    }, [])
  );

  const loadAttendanceData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('scannedData');
      const storedStartTime = await AsyncStorage.getItem('sessionStartTime');
      
      if (storedData) {
        setAttendanceData(JSON.parse(storedData));
      } else {
        setAttendanceData([]);
      }
      
      if (storedStartTime) {
        setSessionStartTime(storedStartTime);
      }
    } catch (error) {
      console.error('Error loading attendance data:', error);
    }
  };

  const handleScannerPress = async () => {
    if (!sessionStartTime) {
      const startTime = new Date().toLocaleTimeString('en-GB', { hour12: false });
      await AsyncStorage.setItem('sessionStartTime', startTime);
      setSessionStartTime(startTime);
    }
    
    router.push('/scanner/OfflineScanner');
  };

  const handleViewAttendance = () => {
    setModalVisible(true);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        Alert.alert(
          'Keep Attendance Data?',
          'Do you want to keep today\'s attendance records for the next session?',
          [
            { 
              text: 'Keep Data', 
              onPress: async () => {
                await AsyncStorage.removeItem('userToken');
                setLoading(false);
                setLoggedOut(true);
              }
            },
            { 
              text: 'Clear All', 
              style: 'destructive',
              onPress: async () => {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('scannedData');
                await AsyncStorage.removeItem('sessionStartTime');
                setAttendanceData([]);
                setSessionStartTime(null);
                setLoading(false);
                setLoggedOut(true);
              }
            }
          ],
          { 
            cancelable: false,
            onDismiss: () => setLoading(false)
          }
        );
      } else {
        Alert.alert('Error', 'No user session found');
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred during logout');
      setLoading(false);
    }
  };

  if (loggedOut) {
    return <Redirect href="/auth/login" />;
  }

  const getSessionStatus = () => {
    if (attendanceData.length === 0) return 'Ready';
    if (attendanceData.length > 0) return 'Active';
    return 'Inactive';
  };

  const getSessionStatusColor = () => {
    const status = getSessionStatus();
    if (status === 'Active') return 'text-green-500';
    if (status === 'Ready') return 'text-blue-500';
    return 'text-gray-500';
  };

  const renderAttendanceItem = ({ item, index }) => (
    <View style={tw`flex-row justify-between items-center py-2 px-4 border-b border-gray-200`}>
      <Text style={tw`text-gray-700 text-sm font-mono flex-1`}>{item.registration}</Text>
      <Text style={tw`text-gray-500 text-sm`}>{item.time.split(' ')[1]}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <LinearGradient
        colors={['#dbeafe', '#e0f2fe', '#ffffff']}
        style={tw`flex-1`}
      >
        {/* Modern Header */}
        <View style={tw`relative overflow-hidden`}>
          <LinearGradient
            colors={['#2563eb', '#3b82f6', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`px-5 py-6 rounded-b-3xl shadow-lg`}
          >
            <View style={tw`absolute -top-16 -right-16 w-28 h-28 bg-white opacity-10 rounded-full`} />
            <View style={tw`absolute -top-24 -left-12 w-24 h-24 bg-white opacity-5 rounded-full`} />
            <View style={tw`absolute top-1/3 -right-10 w-16 h-16 bg-purple-300 opacity-20 rounded-full`} />
            <View style={tw`absolute bottom-6 left-6 w-12 h-12 bg-blue-200 opacity-20 rounded-full`} />

            <View style={tw`flex-row items-center justify-between mb-1`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`bg-white bg-opacity-20 rounded-full p-1.5 mr-2`}>
                  <Ionicons name="scan" size={20} style={tw`text-white`} />
                </View>
                <Text style={tw`text-white text-xl font-bold tracking-tight`}>Worship Scan</Text>
              </View>
              
              <View style={tw`bg-white bg-opacity-20 rounded-full px-2 py-0.5`}>
                <Text style={tw`text-white text-xs font-medium tracking-wide`}>
                  {getSessionStatus().toUpperCase()}
                </Text>
              </View>
            </View>
            
            <Text style={tw`text-blue-100 text-sm ml-9 font-medium`}>
              Offline Attendance Tracking
            </Text>
          </LinearGradient>
        </View>

        {/* Main Content Area */}
        <Animated.View
          style={[
            tw`flex-1 px-5 mt-6`,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Session Status Card */}
          <View style={tw`rounded-2xl p-5 shadow-md mb-5 border border-gray-100 overflow-hidden`}>
            <LinearGradient
              colors={['#fafafa', '#f5f5f5', '#ffffff']}
              style={tw`absolute inset-0 rounded-2xl`}
            />
            <View style={tw`flex-row items-center justify-between mb-3 z-10`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`bg-blue-100 rounded-full p-1.5 mr-2`}>
                  <Icon name="analytics" size={16} style={tw`text-blue-600`} />
                </View>
                <Text style={tw`text-gray-800 text-base font-bold tracking-tight`}>Live Session</Text>
              </View>
              
              {attendanceData.length > 0 && (
                <TouchableOpacity 
                  onPress={handleViewAttendance}
                  style={tw`bg-blue-50 px-2 py-0.5 rounded-lg`}
                >
                  <Text style={tw`text-blue-600 text-xs font-medium`}>View All</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={tw`flex-row justify-between z-10`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-xl font-bold text-gray-800`}>{attendanceData.length}</Text>
                <Text style={tw`text-gray-500 text-xs`}>Total Scanned</Text>
              </View>
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-base font-bold ${getSessionStatusColor()} tracking-wide`}>
                  {getSessionStatus()}
                </Text>
                <Text style={tw`text-gray-500 text-xs`}>Session Status</Text>
              </View>
              <View style={tw`flex-1 items-end`}>
                <Text style={tw`text-base font-bold text-gray-800`}>
                  {sessionStartTime || '--:--'}
                </Text>
                <Text style={tw`text-gray-500 text-xs`}>Started</Text>
              </View>
            </View>
          </View>

          {/* Main Scanner Button */}
          <View style={tw`items-center mb-5`}>
            <TouchableOpacity
              style={tw`rounded-3xl shadow-xl overflow-hidden w-40 h-40`}
              onPress={handleScannerPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4338ca', '#6366f1', '#7c3aed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`flex-1 items-center justify-center`}
              >
                <View style={tw`bg-white bg-opacity-20 rounded-full p-3 mb-3`}>
                  <Icon name="qr-code-scanner" size={36} style={tw`text-white`} />
                </View>
                <Text style={tw`text-white text-sm font-bold tracking-wide`}>
                  {attendanceData.length > 0 ? 'Continue Scanning' : 'Start Scanning'}
                </Text>
                <Text style={tw`text-blue-100 text-xs mt-1`}>Tap to begin</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Feature Cards */}
          <View style={tw`flex-row justify-between mb-5`}>
            <View style={tw`rounded-xl p-3 flex-1 mr-3 shadow-md border border-gray-100 overflow-hidden`}>
              <LinearGradient
                colors={['#fafafa', '#f5f5f5', '#ffffff']}
                style={tw`absolute inset-0 rounded-xl`}
              />
              <View style={tw`bg-green-100 rounded-full w-8 h-8 items-center justify-center mb-2 z-10`}>
                <Icon name="offline-pin" size={16} style={tw`text-green-600`} />
              </View>
              <Text style={tw`text-gray-800 font-semibold text-xs mb-1 z-10`}>Offline Mode</Text>
              <Text style={tw`text-gray-500 text-xs z-10`}>Works without internet</Text>
            </View>

            <View style={tw`rounded-xl p-3 flex-1 ml-3 shadow-md border border-gray-100 overflow-hidden`}>
              <LinearGradient
                colors={['#fafafa', '#f5f5f5', '#ffffff']}
                style={tw`absolute inset-0 rounded-xl`}
              />
              <View style={tw`bg-purple-100 rounded-full w-8 h-8 items-center justify-center mb-2 z-10`}>
                <Icon name="description" size={16} style={tw`text-purple-600`} />
              </View>
              <Text style={tw`text-gray-800 font-semibold text-xs mb-1 z-10`}>Excel Export</Text>
              <Text style={tw`text-gray-500 text-xs z-10`}>Share attendance data</Text>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Actions */}
        <View style={tw`px-5 pb-6`}>
          <TouchableOpacity
            style={tw`rounded-xl shadow-md overflow-hidden`}
            onPress={handleLogout}
            disabled={loading}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#ef4444', '#dc2626']}
              style={tw`p-3 flex-row items-center justify-center`}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Icon name="logout" size={16} style={tw`text-white mr-2`} />
                  <Text style={tw`text-white font-semibold text-sm tracking-wide`}>Sign Out</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={tw`text-xs text-center text-gray-400 mt-2`}>
            Worship Attendance • Offline Mode • {attendanceData.length} Records Stored
          </Text>
        </View>

        {/* Attendance Records Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white rounded-2xl p-5 w-11/12 max-h-3/4 shadow-lg`}>
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-gray-800 text-lg font-bold`}>Attendance Records</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} style={tw`text-gray-600`} />
                </TouchableOpacity>
              </View>

              {attendanceData.length === 0 ? (
                <View style={tw`items-center py-10`}>
                  <Text style={tw`text-gray-500 text-base`}>No attendance records found.</Text>
                  <Text style={tw`text-gray-400 text-sm mt-2`}>Start scanning to add records.</Text>
                </View>
              ) : (
                <FlatList
                  data={attendanceData.slice().reverse()}
                  renderItem={renderAttendanceItem}
                  keyExtractor={(item, index) => index.toString()}
                  style={tw`max-h-96`}
                  showsVerticalScrollIndicator={true}
                />
              )}

              <TouchableOpacity
                style={tw`mt-4 bg-blue-600 rounded-lg p-3 items-center`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-white font-semibold text-sm`}>Close</Text>
              </TouchableOpacity>
              {/* Clear All Records button removed */}
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

const renderAttendanceItem = ({ item, index }) => (
  <View style={tw`flex-row justify-between items-center py-2 px-4 border-b border-gray-200`}>
    <Text style={tw`text-gray-700 text-sm font-mono flex-1`}>{item.registration}</Text>
    <Text style={tw`text-gray-500 text-sm`}>{item.time.split(' ')[1]}</Text>
  </View>
);

export default Home;