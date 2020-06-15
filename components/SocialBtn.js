import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";
import {IconFacebook} from "../Icons/IconFacebook";
import {IconGoogle} from "../Icons/IconGoogle";


export const SocialBtn = () => {

    return (
       <View style={styles.socialBtnContainer}>
           <TouchableOpacity style={styles.btnContainer}>
               <IconGoogle/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnContainer}>
               <IconFacebook/>
           </TouchableOpacity>
       </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        height: 70,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 24,
        margin:20
    },
    socialBtnContainer:{
        display:'flex',
        flexDirection:'row',


    }
});
