import { View, Text } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Reports_Header from "../../constants/Reports_Header/Reports_Header";
import PieChartCard from "../../constants/PieChart/PieChartCard";
import BarChartCard from "../../constants/BarChartCard/BarChartCard";


const History = () => {
  return (
    <View style={tw` `}>
      <Reports_Header />
      <View style={tw`p-4 `}>
        <PieChartCard />
      </View>
      <View style={tw`px-4 `}>
        <BarChartCard />
      </View>
    </View>
  );
};

export default History;
