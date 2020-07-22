import React from "react";
import { Text } from "react-native";
import { FONT_FAMILIES } from "../style/fonts";
import { COLORS } from "../style/colors";

export const CustomText = ({ weight, children, style, ...rest }) => {
  const customStyle = {
    fontFamily: FONT_FAMILIES[weight] || FONT_FAMILIES.regular,
    color: COLORS.TEXT,
    ...style,
  };
  return (
    <Text style={customStyle} {...rest}>
      {children}
    </Text>
  );
};
