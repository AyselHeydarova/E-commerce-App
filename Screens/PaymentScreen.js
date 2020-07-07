import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, } from "react-native";
import {CustomText} from "../Payments/components/CustomText";
import {COLORS} from "../Payments/style/colors"
import {GLOBAL_STYLES} from "../Payments/style/globalStyles"
import {Plus} from "../Payments/Icons/Plus"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function PaymentsScreen ({ navigation }) {
  return (
    <View style={styles.container}>
    <StatusBar/>
    <View style={styles.title}>
    <CustomText weight={'bold'} style={{textAlign: "center", color: COLORS.TEXT , fontSize: 25, }} >
        Payment Methods
    </CustomText>
    </View>
    <Plus
        style={{ alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("AddPayCardScreen")}
      />
</View>
  );
};
export default PaymentsScreen;