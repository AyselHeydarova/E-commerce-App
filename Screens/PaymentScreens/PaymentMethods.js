import React from "react";
import { StyleSheet, StatusBar, ScrollView, FlatList } from "react-native";
import { CustomText } from "../../components";
import { COLORS } from "../../style/colors";
import { PaymentCard } from "../../components/PaymentCard";
import { Plus } from "../../Icons/Plus";
import { selectUserData } from "../../store/users";
import { selectPaymentCard } from "../../API/index";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../../style/globalStyles";

const mapStateToProps = (state) => ({
  user: selectUserData(state),
});
export const PaymentMethods = connect(mapStateToProps)(
  ({ navigation, user }) => {
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        <CustomText weight={"medium"} style={styles.title}>
          Your Payment Cards{" "}
        </CustomText>
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
        <Plus
          style={{
            alignSelf: "flex-end",
            backgroundColor: COLORS.DARK,
          }}
          onPress={() => navigation.navigate("AddPayCardScreen")}
        />
      </ScrollView>
    );
  }
);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 10,
    marginLeft: 15,
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
