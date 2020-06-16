import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {COLORS} from "../style/colors";

export const ColorContainer = () => {
    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:'red',borderColor:'TouchableOpacity'}]}>

        </TouchableOpacity>
    );
};
export const styles = StyleSheet.create({
    container: {
        width:40,
        height:40,
        borderRadius:20,
        borderWidth:2,
        marginRight:15,

    },

});
