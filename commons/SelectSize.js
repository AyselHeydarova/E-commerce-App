import React from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {COLORS} from "../style/colors";
import {SizeContainer} from "../components/SizeContainer";
import {CustomText} from "../components/CustomText";

export const SelectSize = () => {
    const sizes = ["XS", "S", "M", "L", "XL"]
        return (
        <View style={styles.container}>
            <View style={styles.line}/>
            <CustomText weight={'bold'} style={styles.title}>Select Size </CustomText>
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {sizes.map(( name ) => (
                    <View style={styles.sizes} key={`${name}-${Date.now()}`}>
                    <SizeContainer name={name} width={100}/>
                    </View>
                ))}
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.BACKGROUND,
        width: '100%',
        height: '50%',
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 34,
        borderTopLeftRadius: 34,
        position:"absolute",
        bottom:0

    },
    sizes: {
        marginTop: 20,

    },
    line: {
        width: 70,
        height: 6,
        backgroundColor:COLORS.TEXT,
        margin:20,
        borderRadius: 10,
    },
    title: {
        color: COLORS.TEXT,
        fontSize: 18,
        lineHeight: 22,
        marginBottom:10

    },
});