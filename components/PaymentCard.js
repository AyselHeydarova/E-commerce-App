import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { CustomText } from "./CustomText";
import { AcceptIcon } from "../Icons/AcceptIcon";
import { COLORS } from "../style/colors";

export const PaymentCard = ({
  name = "Mehebbet Comerdli",
  expireDate = "05/23",
  number = 3947,
  cardType = "Visa",
  isSelected = true,
  onPress,
}) => {
  const url =
    cardType === "Visa"
      ? require("../assets/Visa.png")
      : require("../assets/Maestro.png");
  return (
    <>
      <TouchableWithoutFeedback>
        <View style={{ width: 380, height: 220 }}>
          <Image source={url} style={styles.container} resizeMode={"cover"} />
          <View style={styles.numberCont}>
            <CustomText style={{ fontSize: 27, letterSpacing: 5 }}>
              **** **** ****
            </CustomText>
            <CustomText style={{ lineHeight: 28, fontSize: 19 }}>
              {" "}
              {number}{" "}
            </CustomText>
          </View>
          <CustomText style={styles.name} weight={"medium"}>
            {" "}
            {name}{" "}
          </CustomText>
          <CustomText
            style={{
              fontSize: 13,
              position: "absolute",
              bottom: 30,
              right: cardType === "Visa" ? 56 : 136,
            }}
            weight={"bold"}
          >
            {" "}
            {expireDate}{" "}
          </CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.checkboxWrapper} onPress={onPress}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: isSelected ? COLORS.TEXT : null,
              borderColor: isSelected ? null : COLORS.GRAY,
              borderWidth: isSelected ? null : 2,
            },
          ]}
        >
          <View style={styles.acceptIcon}>
            <AcceptIcon width={20} height={20} color={COLORS.DARK} />
          </View>
        </View>
        <CustomText>Use as default payment method</CustomText>
      </TouchableOpacity>
    </>
  );
};
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 220,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 13,
    position: "absolute",
    bottom: 30,
    left: 24,
  },
  numberCont: {
    position: "absolute",
    top: 80,
    left: 30,
    flexDirection: "row",
  },
  checkboxWrapper: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 25,
    marginLeft: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptIcon: {
    position: "absolute",
    top: 2,
    left: 2,
  },
});
