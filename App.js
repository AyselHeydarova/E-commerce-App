import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet } from "react-native";
import { COLORS } from "./style/colors";
import { loadFonts } from "./style/fonts";
import {GLOBAL_STYLES} from "./style/globalStyles";
import {ProfileScreen} from "./Screens/ProfileScreen";



export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        return (
            <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)}/>
        );
    }

  return (
         <ProfileScreen orderCount={12} paymentMethods={"**34"} shippingAddresses={3}/>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    justifyContent: "center",
  },

});
{/*<View style={styles.container}>*/}
{/*    <ProfileScreen/>*/}
{/*</View>*/}