import React from "react";
import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "./CustomText";
import { GLOBAL_STYLES } from "../style/globalStyles";

export const Input = ({ name, style, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <CustomText style={styles.inputLabel}>{name}</CustomText>
      <TextInput
        weight={"medium"}
        style={{ ...styles.inputText, ...style }}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 70,
    width: "100%",
    paddingTop: 15,
    paddingLeft: 25,
    backgroundColor: COLORS.DARK,
    borderRadius: 4,
    marginBottom: 20,
  },
  inputLabel: {
    color: COLORS.GRAY,
    fontSize: 13,
    lineHeight: 13,
  },
  inputText: {
    color: COLORS.TEXT,
    fontSize: 14,
    lineHeight: 20,
  },
});
