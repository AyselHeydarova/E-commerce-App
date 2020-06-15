import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";


export const Input = ({name}) => {
    return (
        <View style={styles.inputContainer}>
            <CustomText style={styles.inputLabel}>{name}</CustomText>
            <TextInput weight={'medium'} style={styles.inputText}/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        height: 70,
        width: 345,
        paddingTop: 15,
        paddingLeft: 25,
        backgroundColor: COLORS.dark,
        borderRadius: 4,
    },
    inputLabel: {
        color: COLORS.ordinaryText,
        fontSize: 13,
        lineHeight: 11,
    },
    inputText: {
        color: COLORS.white,
        fontSize: 14,
        lineHeight: 20,
    }
});
