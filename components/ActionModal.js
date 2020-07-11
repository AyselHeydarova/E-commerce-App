import React from "react";
import { COLORS } from "../style/colors";
import { View, StyleSheet } from "react-native";
import { Btn } from "./Btn";
import { GLOBAL_STYLES } from "../style/globalStyles";

export const ActionModal = ({ btnName, onPress }) => {
  return (
    // <View style={styles.btnBox}>
    <Btn
      onPress={onPress}
      btnName={btnName}
      bgColor={COLORS.PRIMARY}
      height={48}
      width={"100%"}
      titleStyle={{ textTransform: "uppercase" }}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  btnBox: {
    height: 90,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    backgroundColor: COLORS.BACKGROUND,
    alignSelf: "center",
  },
});
