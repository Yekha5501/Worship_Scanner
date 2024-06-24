// ScanButton.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';

const ScanButton = () => {
  const router = useRouter();

  const handlePress = () => {
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
          <Image
            source={{ uri: 'https://kingsremovals.com.au/wp-content/uploads/2019/04/blue-whitish-background-moving-boxes-1400x1025-1024x750.png' }}
            style={tw`w-full h-full rounded-full`}
          />
        </View>
        <Text style={tw`absolute  right-0 bottom-0 text-2xl font-bold mr-9 mb-11`}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanButton;
