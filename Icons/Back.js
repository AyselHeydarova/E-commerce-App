import React from "react";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity, StyleSheet } from "react-native";

export const Back = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.icon}>
      <Svg height="26" viewBox="0 0 512 512" width="24">
        <Path
          d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8
			c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712
			L143.492,221.863z"
          fill="#ffffff"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});
