import React, { useState } from "react";
import { AppLoading } from "expo";
import { COLORS } from "./style/colors";
import { loadFonts } from "./style/fonts";
import {GLOBAL_STYLES} from "./style/globalStyles";
import {PasswordChange} from "./Screens/ProfileScreens/PasswordChange";

import { StyleSheet, Text, View, Image } from 'react-native';
import {Provider, connect} from 'react-redux';
import store from './store';
import { Ionicons } from '@expo/vector-icons';
import MyTabs from './navigation';
import { AuthForm } from './navigation/screens/AuthForm';
import Home from "./navigation/screens/Home";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }

  return (
		<Provider store={store}>
			 <View style={styles.container}> 
				<Home/>
			 </View>
		</Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    //paddingHorizontal: GLOBAL_STYLES.PADDING,
    alignItems: "center",
    justifyContent: "center",
  },
});
{
  /*<View style={styles.container}>*/
}
{
  /*    <ProfileScreen/>*/
}
{
  /*</View>*/
}
