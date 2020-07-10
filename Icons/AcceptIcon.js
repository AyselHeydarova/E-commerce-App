import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { COLORS } from "../style/colors";

export const AcceptIcon = ({ width, height, color }) => {
  return (
    <Svg height={height} viewBox="0 0 512 512" width={width}>
      <Polygon
        points="344.96,44.48 119.147,270.293 30.187,181.333 0,211.52 119.147,330.667 375.147,74.667 		"
        fill={color}
      />
    </Svg>
  );
};
