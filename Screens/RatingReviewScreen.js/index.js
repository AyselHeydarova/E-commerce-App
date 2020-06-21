import React from "react";
import { RatingReviews } from "./RatingReviews";
import { ClientReviewsList } from "./ClientReviewsList";
import { View, StyleSheet, ScrollView } from "react-native";

export const RatingReviewScreen = () => {
  return (
    <View style={styles.container}>
      <RatingReviews />
      <ClientReviewsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingBottom:50
  },
});
