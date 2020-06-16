import React, {Component} from 'react';
import {StyleSheet, StatusBar, View, Text} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import Slider from "../components/Slider";


export class Filters extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <View style={styles.bodyPart}>
                    <View style={styles.titleContainer}>
                        <CustomText weight={'medium'} style={styles.title}>Price Range </CustomText>
                    </View>
                    <Slider/>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    titleContainer: {
        width: '100%',
        height: 20,
        padding: 20
    },
    bodyPart: {
        width: '100%',
        height: 120,
        borderBottomWidth: 4,
        borderBottomColor: 'black'
    },
    title: {
        color: COLORS.white,
        fontSize: 18,
        lineHeight: 20,
    },
    sliderContainer: {}
});
