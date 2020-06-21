import React from 'react';
import {StyleSheet, View} from "react-native";
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";
import {Btn} from "./Btn";

export const Order = ({orderNo, trackingNo, quantity, total, date, status}) => {
    return (
        <View style={styles.container} >
            <View style={styles.firstPart}>
                <CustomText weight={"medium"} style={styles.orderNo}>
                    Order №1947034
                </CustomText>
                <CustomText style={styles.date}>
                    05-12-2020
                </CustomText>
            </View>
            <View style={[styles.firstPart, {justifyContent: "flex-start"}]}>
                <CustomText style={styles.date}>
                    Tracking number:
                </CustomText>
                <CustomText weight={"medium"} style={styles.orderNo}>
                    IW3475453455
                </CustomText>

            </View>
            <View style={styles.firstPart}>
                <View style={[styles.firstPart, {justifyContent: "flex-start"}]}>
                    <CustomText style={styles.date}>
                        Quantity:
                    </CustomText>
                    <CustomText weight={"medium"} style={styles.orderNo}>
                        3
                    </CustomText>

                </View>
                <View style={[styles.firstPart, {justifyContent: "flex-start"}]}>
                    <CustomText style={styles.date}>
                        Total Amount:
                    </CustomText>
                    <CustomText weight={"medium"} style={styles.orderNo}>
                        112$
                    </CustomText>
                </View>
            </View>
            <View style={styles.firstPart}>
                <Btn width={100}
                     height={40}
                     borderColor={COLORS.TEXT}
                     borderWidth={1}
                     btnName={"Details"}
                />
                <CustomText style={styles.status}>
                    Delivered
                </CustomText>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({

    container: {
        width: 345,
        height: 170,
        borderRadius: 8,
        backgroundColor: COLORS.DARK,
        padding: 15,
        marginBottom: 20,
        marginTop: 10,
        marginLeft:7
    },
    firstPart: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,

    },
    date: {
        paddingRight: 10,
        color: COLORS.GRAY
    },
    orderNo: {
        fontSize: 16,
        lineHeight: 20
    },
    status:{
        color:COLORS.SUCCESS,
        lineHeight: 35,
        marginRight:15
    }

});