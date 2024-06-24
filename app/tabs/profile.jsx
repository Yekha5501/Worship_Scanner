import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile_Top from '../../constants/Profile_Frames/Profile_Top'
import Profile_Middle from '../../constants/Profile_Frames/Profile_Middle'
import LogoutButton from '../../constants/Profile_Frames/Logout'
import tw from '../../lib/tailwind';
const Profile = () => {
  return (
    <View style={tw}>
      <Profile_Top/>
      <Profile_Middle/>
      <LogoutButton/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})