import React from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import tw from 'twrnc';

const PieChartCard = () => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  // Replace these values with your actual data
  const maleAttendees = 60;
  const femaleAttendees = 40;
  const totalAttendees = maleAttendees + femaleAttendees;

  const malePercentage = (maleAttendees / totalAttendees) * 100;
  const femalePercentage = (femaleAttendees / totalAttendees) * 100;

  const maleStrokeDashoffset = circleCircumference - (circleCircumference * malePercentage) / 100;
  const femaleStrokeDashoffset = circleCircumference - (circleCircumference * femalePercentage) / 100;

  return (
    <View style={tw`bg-white rounded-lg py-4 h-58 px-4 mt-2 shadow-lg`}>
      <Text style={tw`text-center font-semibold text-gray-800`}>
        My Today's Scan
      </Text>
      <View style={tw`flex-row items-center mt-4`}>
        <View style={tw`flex-1 items-center relative`}>
          <Svg height="160" width="160" viewBox="0 0 180 180">
            <G rotation={-90} originX="90" originY="90">
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#1cc6ff" // Color for male attendees
                fill="transparent"
                strokeWidth="40"
                strokeDasharray={circleCircumference}
                strokeDashoffset={maleStrokeDashoffset}
                strokeLinecap="round"
              />
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#FF5733" // Color for female attendees
                fill="transparent"
                strokeWidth="40"
                strokeDasharray={circleCircumference}
                strokeDashoffset={femaleStrokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(${(malePercentage / 100) * 360}, 90, 90)`} // Rotate the second circle to start where the first one ended
              />
            </G>
          </Svg>
          <Text style={tw`absolute bottom-0 mb-18 text-center font-semibold text-gray-800`}>
            Total: {totalAttendees}
          </Text>
        </View>
        <View style={tw`flex-1 items-center ml-4`}>
          <Text style={tw`font-semibold text-gray-800`}>
            Legend
          </Text>
          <View style={tw`flex-row items-center mt-2`}>
            <View style={[tw`w-4 h-4 rounded-full mr-2`, { backgroundColor: '#1cc6ff' }]} />
            <Text style={tw`text-gray-800`}>{malePercentage.toFixed(1)}% Male</Text>
          </View>
          <View style={tw`flex-row items-center mt-1`}>
            <View style={[tw`w-4 h-4 rounded-full mr-2`, { backgroundColor: '#FF5733' }]} />
            <Text style={tw`text-gray-800`}>{femalePercentage.toFixed(1)}% Female</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PieChartCard;
