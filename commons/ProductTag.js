import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomText } from "../components/CustomText";
import { COLORS } from "../style/colors";

export const ProductTag = ({title ="New", style}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <CustomText style={styles.text} weight="medium">{title}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
    borderRadius: 29,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
      textTransform: "uppercase",
      fontSize: 11

  }
});
