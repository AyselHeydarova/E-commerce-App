import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "./style/colors";

import { loadFonts } from "./style/fonts";
import { RatingReviews } from "./Screens/RatingReviewScreen.js/RatingReviews";
import { GLOBAL_STYLES } from "./style/globalStyles";
import { ReviewItem } from "./Screens/RatingReviewScreen.js/ReviewItem";
import { ClientReview } from "./Screens/RatingReviewScreen.js/ClientReview";
import { SingleProductScreen } from "./Screens/SingleProductScreen";
import { ClientReviewsList } from "./Screens/RatingReviewScreen.js/ClientReviewsList";
import { RatingReviewScreen } from "./Screens/RatingReviewScreen.js";
import { SuccessScreen } from "./Screens/SuccessScreen";
import { AddingShippingAddress } from "./Screens/AddingShippingAddress";
import { AddressCard } from "./Screens/AddressCard";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }
  return (
    <View style={styles.container}>
      {/* <AddingShippingAddress/> */}
      <AddressCard/>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    // paddingHorizontal: GLOBAL_STYLES.PADDING,
    justifyContent: "center",
  },
});
