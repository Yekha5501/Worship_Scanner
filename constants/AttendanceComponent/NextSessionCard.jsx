import React from 'react';
import { View, Text } from 'react-native';
import  tw  from 'twrnc';
import { Feather } from '@expo/vector-icons';

const NextSessionCard = () => {
  return (
   <View style={tw`mb-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <View style={tw`bg-blue-500 rounded-full p-1`}>
            <Icon name="phone" size={20} style={tw`text-white`} />
          </View>
          <Text style={tw`text-base font-bold ml-2`}>Phone Number</Text>
        </View>
        <Text style={tw`text-sm mb-2 ml-7`}>123-456-7890</Text>
        <View style={tw`border-b border-gray-300`}></View>
      </View>
  );
};

export default NextSessionCard;
