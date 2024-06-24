import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import tw from '../../lib/tailwind'; // Adjust the path as necessary

const LoginCard = () => {
  return (
    <View style={tw``}>
      <ImageBackground
        source={{ uri: 'https://www.uneecops.com/wp-content/uploads/2017/01/mobile-1.jpg' }}
        style={tw`h-60 rounded-lg overflow-hidden`}
        resizeMode="cover"
      >
       
      </ImageBackground>
    </View>
  );
};

export default LoginCard;
