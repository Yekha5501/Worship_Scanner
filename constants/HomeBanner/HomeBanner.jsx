import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';


const HomeBanner = () => {
  return (
    <View style={tw`relative px-4 pt-4 rounded-full`}>
      <Image
       
        source={{ uri: 'https://getwallpapers.com/wallpaper/full/0/c/b/1270016-religious-backgrounds-1920x1080-images.jpg' }}
        style={tw`w-full h-37 rounded-lg`}
        resizeMode="cover"
      />
      <View style={tw`absolute inset-0   justify-center items-center`}>
        <Text style={tw`text-white text-lg font-bold mb-4`}>
          Worship Session Title
        </Text>
        <View style={tw`flex flex-row items-center mb-2`}>
          <Icon name="clock" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white`}>10:00 AM - 12:00 PM</Text>
        </View>
        <View style={tw`flex flex-row items-center mb-2`}>
          <Icon name="calendar-alt" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white`}>Monday, 24 May 2024</Text>
        </View>
        <View style={tw`flex flex-row items-center`}>
          <Icon name="map-marker-alt" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white`}>123 Worship Street, City</Text>
        </View>
      </View>
    </View>
  );
};


export default HomeBanner

