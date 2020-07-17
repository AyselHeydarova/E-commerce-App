import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { CustomText } from "../../components";
import { COLORS } from "../../style/colors";
import { PaymentCard } from "../../components/PaymentCard";
import { Plus } from "../../Icons/Plus";
import { selectUserData } from "../../store/users";
import { selectPaymentCard } from "../../API/index";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: selectUserData(state),
});
export const PaymentMethods = connect(mapStateToProps, {
  selectPaymentCard,
})(({ navigation, user }) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <View style={styles.bodyPart}>
        <View style={styles.titleContainer}>
          <CustomText weight={"medium"} style={styles.title}>
            Your Payment Cards{" "}
          </CustomText>
        </View>
        <View style={styles.section}>
          <FlatList
            data={user.paymentMethods}
            renderItem={({ item, index }) => (
              <PaymentCard
                number={item.cardNumber.slice(15, 19)}
                expireDate={item.expireDate}
                name={item.fullName}
                isSelected={item.isSelected}
                cardType={item.cardType}
                onPress={() => selectPaymentCard(index)}
              />
            )}
            keyExtractor={(item) => item.cardNumber}
          />
        </View>
      </View>
      <Plus
        style={styles.plus}
        onPress={() => navigation.navigate("AddPayCardScreen")}
      />
    </ScrollView>
  );
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 13,
  },
  titleContainer: {
    width: "100%",
    height: 20,
    paddingHorizontal: 10,
  },
  bodyPart: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    paddingVertical: 2,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 16,
    lineHeight: 20,
  },
  section: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  plus: {
    backgroundColor: COLORS.TEXT,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 30,
    marginTop: 10,
  },
});
