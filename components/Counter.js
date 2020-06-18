import React from 'react';
import {StyleSheet, View} from "react-native";
import {Plus} from "../Icons/Plus";
import {Minus} from "../Icons/Minus";
import {CustomText} from "./CustomText";
import {COLORS} from "../style/colors";

export const Counter = ({count}) => {
    return (
        <View style={styles.container}>
            <Minus/>
           <View style={styles.countContainer}>
               <CustomText style={styles.count}>
                   18
               </CustomText>
           </View>
            <Plus/>
        </View>
    );
};
const styles = StyleSheet.create({

    container: {
        width: 120,
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    count: {
        fontSize: 21,
        lineHeight: 20,
        color:COLORS.TEXT
    },
    countContainer:{
        width: 60,
        height:30,
        paddingTop:17,
        paddingLeft:21,
    }

});
