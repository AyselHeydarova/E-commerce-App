import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Bags from "../assets/bags.png";
import { CustomText } from "../components/CustomText";
import { ActionModal } from "../components/ActionModal";
import { GLOBAL_STYLES } from "../style/globalStyles";

export const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={Bags} style={styles.bagImg} />
      <CustomText style={{ fontSize: 34, paddingBottom: 20 }} weight="bold">
        Success!
      </CustomText>
      <CustomText>Your order will be delivered soon.</CustomText>
      <CustomText>Thank you for choosing our app!</CustomText>
      <ActionModal btnName="Continue shopping" />
    </View>
  );
};

const styles = StyleSheet.create({
  bagImg: {
    width: 208,
    height: 213,
    marginBottom: 35,
    marginTop: 60,
  },

  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
});
