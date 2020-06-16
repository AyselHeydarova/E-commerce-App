import React, {Component} from 'react';
import {StyleSheet, StatusBar, View, FlatList,TouchableOpacity} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import Slider from "../components/Slider";
import {ColorContainer} from "../components/ColorContainer";
import {SizeContainer} from "../components/SizeContainer";
import {Forward} from "../Icons/Forward";


export const Filters = () => {
    const sizes = ["XS", "S", "M", "L", "XL"]
    const categories = ["All", "Women", "Men"]
    return (
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Price Range </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <Slider/>
                </View>
            </View>

            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Colors </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <ColorContainer/>
                    <ColorContainer/>
                    <ColorContainer/>
                    <ColorContainer/>
                    <ColorContainer/>
                    <ColorContainer/>
                </View>
            </View>
            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Sizes </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <FlatList
                        horizontal={true}
                        data={sizes}
                        renderItem={({item, index}) => (
                            <SizeContainer name={item} width={40}/>
                        )}
                        keyExtractor={item => item}
                    />

                </View>
            </View>

            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Sizes </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <FlatList
                        horizontal={true}
                        data={categories}
                        renderItem={({item, index}) => (
                            <SizeContainer name={item} width={100}/>
                        )}
                        keyExtractor={item => item}
                    />

                </View>
            </View>
            <View style={[styles.bodyPart, {height: 80}]}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Brand </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <CustomText style={styles.brands}>adidas Originals, Jack & Jones, s.Oliver</CustomText>

                    <TouchableOpacity style={styles.rightIcon}>
                        <Forward height={15} width={20}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
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
        borderBottomColor: 'black',
        alignItems: "center"
    },
    title: {
        color: COLORS.TEXT,
        fontSize: 16,
        lineHeight: 20,

    },
    sliderContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: 'space-around',
        flexWrap: "wrap",

    },
    brands: {
        color: COLORS.GRAY,
        fontSize: 11,
        lineHeight: 11,
        position: 'absolute',
        left: -160,
        top: -10,
    },
    rightIcon:{
        position: 'absolute',
        right: -160,
        top: -26,
    }
});
