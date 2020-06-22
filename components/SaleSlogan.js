import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";

export const SaleSlogan = ({discount,onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <CustomText weight={"bold"} style={styles.title}>
                    SUMMER SALES
                </CustomText>
                <CustomText style={styles.text}>
                    Up to {discount}% off
                </CustomText>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({

    container: {
        height: 110,
        width: 340,
        backgroundColor: COLORS.SALE,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10

    },
    title:{
        fontSize:26
    },
       text:{
        fontSize:18
    },

});
