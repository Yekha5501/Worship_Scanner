// // components/Login/Login.jsx
// import React from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import tw from '../../lib/tailwind';
// import LoginCard from '../../hooks/Login/LoginCard';

// const Login = ({ navigation }) => {
//   const handleLogin = () => {
//     // Add your login logic here
//     navigation.replace('Bottom_Navigation');
//   };

//   return (
//     <View style={tw`flex-1 justify-center items-center `}>
//             <LoginCard />
//       <Text style={tw`text-4xl text-white mb-6`}>Login</Text>
//       <TextInput placeholder="Username" style={tw`bg-white p-4 mb-4 w-3/4`} />
//       <TextInput placeholder="Password" secureTextEntry style={tw`bg-white p-4 mb-6 w-3/4`} />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// export default Login;

import React from 'react';
import { SafeAreaView, View } from 'react-native';
import LoginCard from '../../hooks/Login/LoginCard';
import InputsCard from '../../hooks/Login/InputsCard';

const Login = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <LoginCard />
        <InputsCard/>
        {/* Other components or content */}
      </View>
    </SafeAreaView>
  );
};

export default Login;


