import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";


export const Category = ({categoryName}) => {
    return (
        <View style={styles.categoryContainer}>
            <View style={styles.categoryTextContainer}><CustomText weight={'bold'}
                                                                   style={styles.categoryText}>{categoryName}</CustomText></View>
            <Image style={styles.categoryImage}
                   source={{uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        height: 100,
        width: 330,
        backgroundColor: COLORS.dark,
        borderRadius: 4,
        position: 'relative'
    },
    categoryText: {
        color: COLORS.white,
        fontSize: 18,
        lineHeight: 22,
    },
    categoryTextContainer: {
        height: 100,
        width: 165,
        paddingTop:40,
        paddingLeft:25,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0
    },

    categoryImage: {
        height: 100,
        width: 165,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0
    }
});
