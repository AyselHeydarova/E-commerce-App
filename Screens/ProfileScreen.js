import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, ScrollView} from "react-native";
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import {Btn} from "../components/Btn";
import {ProductCard} from "../components/ProductCard";
import {CardView} from "../Icons/CardView";

export const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar/>
            <CustomText weight={'bold'} style={styles.title}>
                My Bag
            </CustomText>

            <FlatList
                data={}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <ProductCard/>
                    </View>
                )}
                keyExtractor={item => item}
            />
            <View style={styles.amountContainer}>
                <CustomText weight={'bold'} style={styles.amount}>
                    Total amount:
                </CustomText>
                <CustomText weight={'bold'} style={styles.totalCost}>
                    124$
                </CustomText>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Btn width={345} height={50} bgColor={COLORS.PRIMARY} btnName={"CHECK OUT"}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,


    },
    title: {
        color: COLORS.TEXT,
        fontSize: 34,
        lineHeight: 34,
        margin: 30,

    },
    amount: {
        color: COLORS.GRAY,
        fontSize: 16,
        lineHeight: 20,
        marginLeft: 28,

    },
    totalCost: {
        color: COLORS.TEXT,
        fontSize: 18,
        lineHeight: 22,
        marginRight:28

    },
    btn: {
        marginTop: 30,
        marginBottom: 30,
        justifyContent: "center",
        alignItems:"center"
    },
    card: {
        marginLeft: 30,
        marginBottom: 20
    },
    amountContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 20
    }


});