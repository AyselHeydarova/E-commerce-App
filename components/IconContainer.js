import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../style/colors";
import { Heart } from "../Icons/Heart";

export const IconContainer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Heart width={18} height={18} color={"#ffffff"} />
      </TouchableOpacity>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: COLORS.DARK,
    alignItems: "center",
    justifyContent: "center",
  },
});
