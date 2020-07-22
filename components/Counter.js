import React from "react";
import { StyleSheet, View } from "react-native";
import { Plus } from "../Icons/Plus";
import { Minus } from "../Icons/Minus";
import { CustomText } from "./CustomText";
import { COLORS } from "../style/colors";

export const Counter = ({ count, handleMinus, handlePlus }) => {
  return (
    <View style={styles.container}>
      <Minus onPress={handleMinus} />
      <View style={styles.countContainer}>
        <CustomText style={styles.count}>{count}</CustomText>
      </View>
      <Plus onPress={handlePlus} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  count: {
    fontSize: 18,
    color: COLORS.TEXT,
  },
  countContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
