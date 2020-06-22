import React, { useState } from "react";
import { AppLoading } from "expo";
import { COLORS } from "./style/colors";
import { loadFonts } from "./style/fonts";
import { StyleSheet, Text, View, Image } from 'react-native';
import {Provider, connect} from 'react-redux';
import store from './store';
import MyTabs from "./navigation/MyTabs";

export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        return (
            <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)}/>
        );
    }

  return (
		<Provider store={store}>
			 <View style={styles.container}>
				<MyTabs/>
			 </View>
		</Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    //paddingHorizontal: GLOBAL_STYLES.PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
{/*<View style={styles.container}>*/}
{/*    <ProfileScreen/>*/}
{/*</View>*/}