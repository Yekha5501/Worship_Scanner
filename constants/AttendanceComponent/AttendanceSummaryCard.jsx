import React from 'react';
import { View, Text } from 'react-native';
import { tw } from 'twrnc';
import { Feather } from '@expo/vector-icons';

const AttendanceSummaryCard = () => {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md`}>
      <Text style={tw`text-lg font-bold`}>Previous Attendance</Text>
      <View style={tw`flex-row justify-between mt-2`}>
        <Text style={tw`text-gray-600`}>Last Attended: 2023-02-20</Text>
        <Text style={tw`text-gray-600`}>Attendance Rate: 80%</Text>
      </View>
      <Feather name="clock" size={24} color="#666" style={tw`mt-2`} />
    </View>
  );
};

export default AttendanceSummaryCard;
