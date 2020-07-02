import React, { useState,useEffect } from "react";
import { AppLoading } from "expo";
import { COLORS } from "./style/colors";
import { loadFonts } from "./style/fonts";
import { StyleSheet, Text, View, Image } from 'react-native';
import {Provider, connect} from 'react-redux';
import store from './store';
import MyTabs from "./navigation/MyTabs";
import {getData} from "./API";
import {setAppProducts} from "./store/products";


export default function App() {
// const getAllData=async (item="Dresses")=>{
//     try {
//         await getData(item);
//     } catch (error) {
//         console.log("getAllData", error);
//     }
//
// };

    // useEffect( ()=>{
    //     getAllData();
    // },[]);
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
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
    alignItems: "center",
    justifyContent: "center",
  },
});
