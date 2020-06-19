import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export const Btn = ({
    btnName,
    bgColor,
    height,
    width,
    borderColor,
    borderWidth,
    titleStyle,
    style
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.btnContainer,
          {
            backgroundColor: bgColor,
            height: height,
            width: width,
            borderWidth: borderWidth,
            borderColor: borderColor,
          },
          {...style}
        ]}
      >
        <Text
          style={{ ...styles.btnText, ...titleStyle }}
        >
          {btnName}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    btnContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
    },
    btnText: {
      fontSize: 14,
      lineHeight: 20,
    },
  });