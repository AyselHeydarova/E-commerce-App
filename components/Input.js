import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";
import {GLOBAL_STYLES} from "../style/globalStyles";


export const Input = ({name,secureTextEntry=false,marginLeft}) => {
    return (
        <View style={[styles.inputContainer,{marginLeft:marginLeft}]}>
            <CustomText style={styles.inputLabel}>{name}</CustomText>
            <TextInput secureTextEntry={secureTextEntry} weight={'medium'} style={styles.inputText}/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        height: 70,
        width: 325,
        paddingTop: 15,
        paddingLeft: 25,
        backgroundColor: COLORS.DARK,
        borderRadius: 4,
        marginBottom:15,


    },
    inputLabel: {
        color: COLORS.GRAY,
        fontSize: 13,
        lineHeight: 16,
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: 14,
        lineHeight: 20,
    }
});
