import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform,
    Keyboard
} from "react-native";
import {COLORS} from "../../style/colors";
import {CustomText} from "../../components/CustomText";
import {Back} from "../../Icons/Back";

import {Input} from "../../components/Input";
import {GLOBAL_STYLES} from "../../style/globalStyles";
import {BottomModal} from "../../components/bottomModal";
import {Btn} from "../../components/Btn";

export const PasswordChange = () => {

    return (
        <KeyboardAvoidingView
            // behavior="padding"
            // keyboardVerticalOffset={Platform.select({ios: 120, android: 500})}
            // enabled
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}


        >
            <TouchableWithoutFeedback
                // style={styles.container}
                onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>

                    <StatusBar/>
                    <TouchableOpacity style={styles.backIcon}>
                        <Back/>
                    </TouchableOpacity>
                    <CustomText weight={'bold'} style={styles.title}>
                        Settings
                    </CustomText>

                    <TouchableOpacity style={styles.infoSection}>
                        <View style={styles.text}>
                            <CustomText weight={'bold'} style={styles.name}>
                                Personal Information
                            </CustomText>
                            <CustomText style={styles.email}>
                                Name,Date of birth
                            </CustomText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoSection}>
                        <View style={styles.text}>
                            <CustomText weight={'bold'} style={styles.name}>
                                Password
                            </CustomText>
                            <CustomText style={styles.email}>
                                Password Settings
                            </CustomText>
                        </View>
                    </TouchableOpacity>
                    <BottomModal name={"Password change"}>
                        <Input name={" Old Password"} secureTextEntry={true}/>
                        <Input name={" New Password"} secureTextEntry={true}/>
                        <Input name={" Repeat New Password"} secureTextEntry={true}/>
                        <Btn width={335}
                             height={50}
                             btnName={"SAVE PASSWORD"}
                             bgColor={COLORS.PRIMARY}
                        />
                    </BottomModal>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(30, 31, 40, 0.98)'

    },
    title: {
        color: COLORS.TEXT,
        fontSize: 34,
        lineHeight: 34,
        margin: GLOBAL_STYLES.MARGIN_LEFT,
        marginBottom: 48

    },

    backIcon: {
        marginTop: 20,
        marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
    },

    infoSection: {
        width: '100%',
        borderBottomWidth: 0.3,
        borderColor: COLORS.GRAY,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
        marginBottom: GLOBAL_STYLES.MARGIN_LEFT,

    },
    email: {
        color: COLORS.GRAY,
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 15,
        marginLeft: GLOBAL_STYLES.MARGIN_LEFT,

    },
    name: {
        color: COLORS.TEXT,
        fontSize: 20,
        lineHeight: 22,
        marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
        marginBottom: 8,
    },


});