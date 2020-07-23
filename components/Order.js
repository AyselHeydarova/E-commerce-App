import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "./CustomText";
import { Btn } from "./Btn";

export const Order = ({
  orderNo,
  trackingNo,
  quantity,
  total,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.firstPart}>
        <CustomText weight={"medium"} style={styles.orderNo}>
          Order №{orderNo}
        </CustomText>
        <CustomText style={styles.date}>{date}</CustomText>
      </View>
      <View style={[styles.firstPart, { justifyContent: "flex-start" }]}>
        <CustomText style={styles.date}>Tracking number:</CustomText>
        <CustomText weight={"medium"} style={styles.orderNo}>
          {trackingNo}
        </CustomText>
      </View>
      <View style={styles.firstPart}>
        <View style={[styles.firstPart, { justifyContent: "flex-start" }]}>
          <CustomText style={styles.date}>Quantity:</CustomText>
          <CustomText weight={"medium"} style={styles.orderNo}>
            {quantity}
          </CustomText>
        </View>
        <View style={[styles.firstPart, { justifyContent: "flex-start" }]}>
          <CustomText style={styles.date}>Total Amount:</CustomText>
          <CustomText weight={"medium"} style={styles.orderNo}>
            {Math.floor(total)}$
          </CustomText>
        </View>
      </View>
      <View style={styles.firstPart}>
        <Btn
          width={100}
          height={40}
          borderColor={COLORS.TEXT}
          borderWidth={1}
          btnName={"Details"}
          onPress={onPress}
        />
        <CustomText style={styles.status}>Delivered</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    backgroundColor: COLORS.DARK,
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 7,
  },
  firstPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  date: {
    paddingRight: 10,
    color: COLORS.GRAY,
  },
  orderNo: {
    fontSize: 16,
    lineHeight: 20,
  },
  status: {
    color: COLORS.SUCCESS,
    lineHeight: 35,
    marginRight: 15,
  },
});
