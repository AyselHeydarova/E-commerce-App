import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, KeyboardAvoidingView, TouchableOpacity, Platform} from "react-native";
import {COLORS} from "../../style/colors";
import {CustomText} from "../../components/CustomText";
import {Back} from "../../Icons/Back";
import {Btn} from "../../components/Btn";
import {Order} from "../../components/Order";
import {Input} from "../../components/Input";
import {GLOBAL_STYLES} from "../../style/globalStyles";

export const Settings = ({navigation}) => {

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.select({ios :120, android : 500})}
            enabled
            style={styles.container}>
            <StatusBar/>
            <TouchableOpacity style={styles.backIcon}>
                <Back/>
            </TouchableOpacity>
            <CustomText weight={'bold'} style={styles.title}>
                Settings
            </CustomText>

            <CustomText weight={"medium"} style={styles.infoTitle}>
                Personal Information
            </CustomText>
            <Input name={"Full name"} />
            <Input name={"Date of birth"} />

            <View style={[styles.header, {marginTop: 30}]} >
                <CustomText weight={"medium"} style={styles.infoTitle}>
                    Password
                </CustomText>
                <TouchableOpacity onPress={()=>navigation.navigate("PasswordChange")}>
                    <CustomText  style={styles.btnText}>
                        Change
                    </CustomText>
                </TouchableOpacity>
            </View>
            <Input marginLeft={20} name={"Password"} secureTextEntry={true}/>
        </KeyboardAvoidingView>
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
        margin: GLOBAL_STYLES.MARGIN_LEFT,

    },
    btnText: {
        color: COLORS.GRAY,
        fontSize: 14,
        lineHeight: 38,
        marginRight:GLOBAL_STYLES.MARGIN_LEFT

    },
    backIcon: {
        marginTop: 20,
        marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
    },
    infoTitle: {
        fontSize: 19,
        lineHeight: 20,
        marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
        marginTop: 10,
        marginBottom:20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,

    },


});