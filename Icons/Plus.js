import React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../style/colors";

export const Plus = ({ style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.icon}>
        <Svg height={17} viewBox="0 0 512 512" width={17}>
          <Path
            d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"
            fill={COLORS.GRAY}
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 25,
  },
  icon: {
    position: "absolute",
    top: 12,
    left: 12,
  },
});
