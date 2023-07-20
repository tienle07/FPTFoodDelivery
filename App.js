import { StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import colors from './constants/colors.js';
import Navigator from './navigation/Navigator.js';
import { AuthProvider } from './context/AuthContext.js';
import {Welcome, Home, Intro, Login, Register, Search, Category, Details, Profile, Password, Cart, Product, PayFromDetail} from './screens/index.js';
export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
        showHideTransition={'fade'}
        hidden={false}/>
      <AuthProvider>
        <Navigator/>
      </AuthProvider>
    </SafeAreaView>
  )
}

