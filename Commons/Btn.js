import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";
import {FONT_FAMILIES} from "../style/fonts";


export const Btn = ({btnName, bgColor,height,width,borderColor,borderWidth,...rest}) => {
    return (
        <TouchableOpacity style={[styles.btnContainer,
            {
                backgroundColor: bgColor,
                height: height,
                width: width,
                borderWidth:borderWidth,
                borderColor:borderColor,
            }
        ]} rest={rest}>
            <CustomText weight={'medium'} style={styles.btnText}>{btnName}</CustomText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    btnText: {
        color: COLORS.white,
        fontSize: 14,
        lineHeight: 20,
    }
});
