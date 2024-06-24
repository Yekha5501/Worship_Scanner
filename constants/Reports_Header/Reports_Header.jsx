import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const Reports_Header = ({ name }) => {
  return (
    <View
      style={tw`flex-row items-center justify-between px-4 pt-14 pb-5 bg-white`}
    >
      <Ionicons name="menu" size={24} color="black" />
      <Text style={tw`text-black text-lg font-bold`}>{`Reports`}</Text>
      <Image
        source={{
          uri: "https://www.hdcarwallpapers.com/walls/2018_volkswagen_t_roc_suv_4k-HD.jpg",
        }}
        style={tw`w-10 h-10 rounded-full`}
      />
    </View>
  );
};

export default Reports_Header;
