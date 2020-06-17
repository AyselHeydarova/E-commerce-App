import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "./style/colors";

import {loadFonts} from "./style/fonts";
import { RatingReviews } from "./Screens/RatingReviewScreen.js/RatingReviews";
import { GLOBAL_STYLES } from "./style/globalStyles";


export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        return (
            <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)}/>
        );
    }
    return (
      <View style={styles.container}>

        <RatingReviews/>
      </View>
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
