import React from 'react';
import {StyleSheet, Image, View, TouchableWithoutFeedback} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";


export const Category = ({categoryName, imageSrc,onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.categoryContainer}>
            <View style={styles.categoryTextContainer}>
                <CustomText weight={'bold'}
                            style={styles.categoryText}>
                    {categoryName}
                </CustomText>
            </View>
            <Image style={styles.categoryImage}
                   source={{uri: imageSrc}}/>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        height: 100,
        width: 330,
        backgroundColor: COLORS.DARK,
        borderRadius: 7,
        position: 'relative'
    },
    categoryText: {
        fontSize: 18,
        lineHeight: 22,
    },
    categoryTextContainer: {
        height: 100,
        width: 165,
        paddingTop: 40,
        paddingLeft: 25,
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
