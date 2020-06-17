import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "./style/colors";

import { loadFonts } from "./style/fonts";
import { SingleProductScreen } from "./Screens/SingleProductScreen";
import {BrandsScreen} from "./Screens/BrandsScreen";
import {SelectSize} from "./commons/SelectSize";
import {Favorites} from "./Screens/Favorites";
import {MyBag} from "./Screens/MyBag";
import {Plus} from "./Icons/Plus";
import {Minus} from "./Icons/Minus";



export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        return (
            <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)}/>
        );
    }

  return (
     <View style={styles.container}>
         <Plus />
         <Minus />
     </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },

});
