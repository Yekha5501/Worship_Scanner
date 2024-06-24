import React from 'react';
import { View, Text } from 'react-native';

import { Feather } from '@expo/vector-icons'; // Import Feather instead of Icon
import tw from '../../lib/tailwind'; // Adjust the path as necessar

const AttendanceSummaryCard = () => {
  return (
    <View style={[tw`bg-white p-4 rounded-lg shadow-md`, { flex: 1 }]}>
      <View style={tw`items-center justify-center w-13 h-13 rounded-full bg-blue-100 mb-4`}>
        <Feather name="clock" size={24} color="#00bfff" />
      </View>
      <Text style={tw`text-base font-bold`}>Recent Session</Text>
      <Text style={tw`text-secondary mt-2`}>Number of Scans: 10</Text>
    </View>
  );
};

const NextSessionCard = () => {
  return (
    <View style={[tw`bg-white p-4 rounded-lg shadow-md ml-4`, { flex: 1 }]}>
      <View style={tw`items-center justify-center w-13 h-13 rounded-full bg-blue-100 mb-4`}>
        <Feather name="calendar" size={24} color="#00bfff" />
      </View>
      <Text style={tw`text-base font-bold`}>Next Session</Text>
      <Text style={tw`text-secondary mt-2`}>Date: 2023-02-25</Text>
      <Text style={tw`text-secondary`}>Time: 10:00 AM</Text>
    </View>
  );
};



const AttendanceComponent = () => {
  return (
   <View style={tw``}>
     <View style={tw` mt-6 px-2`}>
  <Text style={tw`text-lg font-bold mb-2`}>My overview</Text>
</View>
<View style={tw`flex-row justify-between mb-4  px-4`}>
  <AttendanceSummaryCard />
  <NextSessionCard />
</View>
    </View>
  );
};

export default AttendanceComponent;
