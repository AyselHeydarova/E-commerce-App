import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, FlatList } from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import { Btn } from "../../components/Btn";
import { Order } from "../../components/Order";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { getCurrentUserData, selectUserData } from "../../store/users";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  usersData: selectUserData(state),
});

export const MyOrders = connect(mapStateToProps, {
  getCurrentUserData,
})(({ navigation, getCurrentUserData, usersData }) => {
  const [isDeliveredClicked, setIsDeliveredClicked] = useState(true);
  const [isProcessingClicked, setIsProcessingClicked] = useState(false);
  const [isCancelledClicked, setIsCancelledClicked] = useState(false);
  const orders = usersData.orders || [];
  const handleDelivered = () => {
    setIsDeliveredClicked(true);
    setIsProcessingClicked(false);
    setIsCancelledClicked(false);
  };
  const handleProcessing = () => {
    setIsDeliveredClicked(false);
    setIsProcessingClicked(true);
    setIsCancelledClicked(false);
  };
  const handleCancelled = () => {
    setIsDeliveredClicked(false);
    setIsProcessingClicked(false);
    setIsCancelledClicked(true);
  };
  const handleUserData = async () => {
    try {
      await getCurrentUserData();
    } catch (error) {
      console.log("getCurrentUserData", error);
    }
  };
  useEffect(() => {
    handleUserData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />
      <CustomText weight={"bold"} style={styles.title}>
        My Orders
      </CustomText>

      <View style={styles.btns}>
        <Btn
          width={110}
          height={34}
          btnName={"Delivered"}
          titleStyle={{ color: isDeliveredClicked ? COLORS.DARK : COLORS.TEXT }}
          bgColor={isDeliveredClicked ? COLORS.TEXT : COLORS.BACKGROUND}
          onPress={handleDelivered}
        />
        <Btn
          btnName={"Processing"}
          width={110}
          height={34}
          titleStyle={{
            color: isProcessingClicked ? COLORS.DARK : COLORS.TEXT,
          }}
          bgColor={isProcessingClicked ? COLORS.TEXT : null}
          onPress={() => handleProcessing()}
        />
        <Btn
          btnName={"Cancelled"}
          width={110}
          height={34}
          titleStyle={{ color: isCancelledClicked ? COLORS.DARK : COLORS.TEXT }}
          bgColor={isCancelledClicked ? COLORS.TEXT : null}
          onPress={handleCancelled}
        />
      </View>
      <FlatList
        data={orders.reverse()}
        renderItem={({ item }) => (
          <Order
            date={item.date}
            orderNo={item.orderNo}
            quantity={item.quantity}
            total={Math.floor(
              item.totalAmount + item.deliveryMethod.deliveryMethodCost
            )}
            trackingNo={item.trackingNo}
            onPress={() =>
              navigation.navigate("OrderDetails", {
                orderedProducts: item.orderedProducts,
                orderNo: item.orderNo,
                trackingNo: item.trackingNo,
                quantity: item.quantity,
                date: item.date,
                status: "Delivered",
                total: Math.floor(
                  item.totalAmount + item.deliveryMethod.deliveryMethodCost
                ),
                deliveryMethod: item.deliveryMethod,
                paymentMethod: item.paymentMethod,
                shippingAddress: item.shippingAddress,
              })
            }
          />
        )}
        keyExtractor={(item) => item.orderNo}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 34,
    lineHeight: 34,
    margin: 15,
  },
  backIcon: {
    marginTop: 20,
    marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
  },

  btns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: GLOBAL_STYLES.MARGIN_LEFT,
  },
});
