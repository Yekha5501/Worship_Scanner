import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import tw from '../../lib/tailwind';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile_Middle = () => {
  return (
    <ScrollView style={tw`pt-4 px-4`}>
      
      <View style={tw`mb-2`}>
        <View style={tw`flex-row items-center mb-2`}>
          <View style={tw`bg-blue-100 rounded-full p-1`}>
            <Icon name="phone" size={30} style={tw`text-primary`} />
          </View>
          <Text style={tw`text-base font-bold ml-2`}>Phone Number</Text>
        </View>
        <Text style={tw`text-sm text-secondary mb-2 ml-11`}>123-456-7890</Text>
        <View style={tw`border-b border-primary`}></View>
      </View>
      
      <View style={tw`mb-2`}>
        <View style={tw`flex-row items-center mb-2`}>
          <View style={tw`bg-blue-100 rounded-full p-1`}>
            <Icon name="home" size={30} style={tw`text-primary`} />
          </View>
          <Text style={tw`text-base font-bold ml-2`}>Residence</Text>
        </View>
        <Text style={tw`text-sm text-secondary mb-2 ml-11`}>123 Main St</Text>
        <View style={tw`border-b border-primary`}></View>
      </View>

      <View style={tw`mb-2`}>
       <View style={tw`flex-row items-center mb-2`}>
          <View style={tw`bg-blue-100 rounded-full p-1`}>
            <Icon name="security" size={30} style={tw`text-primary`} />
          </View>
          <Text style={tw`text-base font-bold ml-2`}>Security</Text>
          <Icon name="chevron-right" size={20} style={tw`ml-auto`} />
        </View>
        <Text style={tw`text-sm text-secondary mb-2 ml-11`}>Change your Password</Text>
        <View style={tw`border-b border-primary`}></View>
      </View>
      
     
      
      <View style={tw`mb-2`}>
        <View style={tw`flex-row items-center mb-2`}>
          <View style={tw`bg-blue-100 rounded-full p-1`}>
            <Icon name="help-outline" size={30} style={tw`text-primary`} />
          </View>
          <Text style={tw`text-base font-bold ml-2`}>Help and Support</Text>
          <Icon name="chevron-right" size={20} style={tw`ml-auto`} />
        </View>
        <Text style={tw`text-sm text-secondary  ml-11 mb-2 `}>Email to john.doe@example.com</Text>
        <View style={tw`border-b border-primary`}></View>
      </View>
    </ScrollView>
  );
};

export default Profile_Middle;

const styles = StyleSheet.create({});