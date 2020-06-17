import React from 'react';
import Svg, {Rect} from 'react-native-svg';
import { TouchableOpacity, View} from "react-native";
import {COLORS} from "../style/colors";
import {styles} from "./Plus";

export const Minus = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.icon}>
                <Svg height={40} viewBox="0 0 512 512" width={40}>
                    <Rect y="128" width="298.667" height="42.667"
                          fill={COLORS.GRAY}
                    />
                </Svg>
            </View>
        </TouchableOpacity>
    );
};
