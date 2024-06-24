import React from 'react';
import { View, Text } from 'react-native';
import AppBar from '../../constants/AppBar/AppBar';
import HomeBanner from '../../constants/HomeBanner/HomeBanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import AttendanceComponent from '../../constants/AttendanceComponent/AttendanceComponent';
import ScanButton from '../../constants/ScanButton/ScanButton';
import tw from '../../lib/tailwind'
const Home = () => {
 
  return (
    <View style={tw}>
      <AppBar />
       <HomeBanner
      />
      <AttendanceComponent/>
      <ScanButton/>
    
    </View>
  );
};

export default Home;