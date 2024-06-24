import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from '../../lib/tailwind'; // Adjust the path as necessar

const Profile_Top = () => {
  return (
    <View style={[tw`bg-primary pt-14 pb-8  shadow-md items-center`, { borderBottomLeftRadius:50, borderBottomRightRadius: 50}]}>
      <Image
        source={{ uri: 'https://www.hdcarwallpapers.com/walls/2018_volkswagen_t_roc_suv_4k-HD.jpg' }} // Replace with your profile image URL
        style={tw`w-24 h-24  rounded-full  border-blue-500 mb-2`}
      />
      <Text style={tw`text-lg font-bold`}>John Doe</Text>
      <Text style={tw`text-secondary`}>john.doe@example.com</Text>
    </View>
  );
};

export default Profile_Top;
