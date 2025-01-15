import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';

const ScanButton = () => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the scanner page
    router.push('/scanner/ScannerScreen');
  };

  return (
    <View style={tw`flex items-center justify-center mt-2`}>
      <TouchableOpacity
        style={tw`bg-white w-30 h-30 rounded-full shadow-md relative`}
        shadowColor="blue"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.5}
        shadowRadius={6}
        onPress={handlePress}
      >
        <View style={tw`w-full h-full bg-cover bg-center rounded-full`}>
          {/* Add your custom image or styling */}
        </View>
        <Text style={tw`absolute right-0 bottom-0 text-2xl font-bold mr-9 mb-11`}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanButton;
