import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, } from "react-native";
import {CustomText} from "../components/CustomText";
import {COLORS} from "../style/colors"
import {GLOBAL_STYLES} from "../style/globalStyles"
import {Plus} from "../Icons/Plus"
import {styles} from "./filters";


export const PaymentScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <StatusBar/>
    <View style={styles.title}>
    <CustomText weight={'bold'} style={{textAlign: "center", color: COLORS.TEXT , fontSize: 25, }} >
        Payment Methods
    </CustomText>
    <CustomText>Your payment cards</CustomText>
    </View>
    <Plus
        style={{ alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("AddPayCardScreen")}
      />
</View>
  );
};
