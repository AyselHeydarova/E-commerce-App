import React from 'react';
import {StyleSheet, View,TouchableOpacity} from "react-native";
import {COLORS} from "../style/colors";
import {Bag} from "../Icons/Bag";

export const BagContainer = () => {
    return (
        <View style={[styles.container, {backgroundColor: 'red'}]}>
           <TouchableOpacity>
               <Bag height={18} width={18}/>
           </TouchableOpacity>
        </View>
    );
};
export const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },

});
