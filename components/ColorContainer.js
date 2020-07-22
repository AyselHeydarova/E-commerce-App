import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export const ColorContainer = ({ bgColor, borderColor, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: `${bgColor}`, borderColor: `${borderColor}` },
      ]}
    ></TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 15,
  },
});
