import React from "react";
import { Text } from "react-native";
import { FONT_FAMILIES } from "../style/fonts";

export const CustomText = ({ weight, children, style, ...rest }) => {
    const styles = {
        fontFamily: FONT_FAMILIES[weight] || FONT_FAMILIES.regular,
        ...style,
    };
    return (
        <Text {...rest} style={styles}>
            {children}
        </Text>
    );
};
