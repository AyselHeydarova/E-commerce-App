import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { CustomText } from "../../components";
import { COLORS } from "../../style/colors";
import { AddressCard } from "../AddressCard";
import { getCurrentUserData, selectUserData } from "../../store/users";
import { connect } from "react-redux";
import { Btn } from "../../components/Btn";
import { totalAmount } from "../../Utils/Calculations";
import {
  addOrderedProducts,
  deleteBagProducts,
  countDecreaser,
} from "../../API";
import { GLOBAL_STYLES } from "../../style/globalStyles";

const mapStateToProps = (state) => ({
  user: selectUserData(state),
});
export const Checkout = connect(mapStateToProps, {
  getCurrentUserData,
  addOrderedProducts,
  deleteBagProducts,
})(({ navigation, route, user, addOrderedProducts, deleteBagProducts }) => {
  const { bagProducts } = route.params;
  const shippingAddresses = (user.shippingAddresses || []).filter(
    (address) => address.isSelected === true
  );
  const paymentMethods = (user.paymentMethods || []).filter(
    (method) => method.isSelected === true
  );
  const [deliveryMethod, setDeliveryMethod] = useState({
    deliveryMethodName: "fedex",
    deliveryMethodCost: 15,
  });
  const handleDeliveryMethod = (name, value) => {
    setDeliveryMethod({
      deliveryMethodName: name,
      deliveryMethodCost: value,
    });
  };

  const handleDeleteBagProducts = async () => {
    try {
      await deleteBagProducts();
    } catch (error) {
      console.log("handleDeleteBagProducts", error);
    }
  };

  const handleCountDecrease = () => {
    bagProducts.forEach((element) => {
      countDecreaser(element);
    });
  };

  const handleSubmit = () => {
    addOrderedProducts(
      bagProducts,
      paymentMethods[0],
      shippingAddresses[0],
      deliveryMethod
    );
    handleCountDecrease();
    handleDeleteBagProducts();
    navigation.navigate("SuccessScreen");
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <View style={styles.bodyPart}>
        <View style={styles.titleContainer}>
          <CustomText weight={"medium"} style={styles.title}>
            Shipping Address{" "}
          </CustomText>
        </View>
        <View style={styles.section}>
          <AddressCard
            fullName={shippingAddresses[0].fullName}
            address={shippingAddresses[0].address}
            city={shippingAddresses[0].city}
            state={shippingAddresses[0].state}
            zipCode={shippingAddresses[0].zipCode}
            country={shippingAddresses[0].country}
            isInCheckout={true}
            changePressHandler={() =>
              navigation.navigate("ShippingAddressesScreen")
            }
          />
        </View>
      </View>

      <View style={styles.bodyPart}>
        <View style={styles.titleContainer}>
          <CustomText weight={"medium"} style={styles.title}>
            Payment{" "}
          </CustomText>
          <TouchableOpacity
            style={styles.change}
            onPress={() => navigation.navigate("PaymentMethods")}
          >
            <CustomText weight={"bold"} style={{ color: COLORS.PRIMARY }}>
              Change{" "}
            </CustomText>
          </TouchableOpacity>
        </View>
        {paymentMethods.length !== 0 ? (
          <View style={[styles.section, { height: 60 }]}>
            <Image
              style={styles.imgWrapper}
              source={{
                uri:
                  paymentMethods[0].cardType === "Visa"
                    ? "https://seeklogo.com/images/V/visa-logo-121ECA05B2-seeklogo.com.png"
                    : "data:image/png;base64,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",
              }}
            />
            <CustomText weight={"medium"} style={styles.title}>
              **** **** **** {paymentMethods[0].cardNumber.slice(15, 19)}{" "}
            </CustomText>
          </View>
        ) : null}
      </View>
      <View style={styles.titleContainer}>
        <CustomText weight={"medium"} style={styles.title}>
          Delivery Method{" "}
        </CustomText>
      </View>
      <View style={[styles.section, { height: 100 }]}>
        <TouchableOpacity
          onPress={() => {
            handleDeliveryMethod("fedEx", 15);
          }}
        >
          <Image
            style={styles.deliveryImgWrapper}
            source={{
              uri:
                "https://cdnuploads.aa.com.tr/uploads/Contents/2020/05/21/thumbs_b_c_734048bfd3b897e3a838fe7dbe4d2bcb.jpg?v=144915",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleDeliveryMethod("usps.com", 17);
          }}
        >
          <Image
            style={styles.deliveryImgWrapper}
            source={{
              uri:
                "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042018/untitled-1_102.png?5lnaGj371nVr0mbE.uvCG3dfRcjQIgZL&itok=f3Iwenu5",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleDeliveryMethod("DHL", 25);
          }}
        >
          <Image
            style={styles.deliveryImgWrapper}
            source={{
              uri:
                "https://www.albawaba.com/sites/default/files/styles/d08_standard/public/im/pr_new/DHL-large.png?itok=i3KT2eS2",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <CustomText weight={"medium"} style={styles.text}>
          Order:{" "}
        </CustomText>
        <CustomText weight={"medium"} style={styles.price}>
          ${Math.floor(totalAmount(bagProducts))}
        </CustomText>
      </View>

      <View style={styles.titleContainer}>
        <CustomText weight={"medium"} style={styles.text}>
          Delivery:{" "}
        </CustomText>
        <CustomText weight={"medium"} style={styles.price}>
          ${deliveryMethod.deliveryMethodCost}
        </CustomText>
      </View>

      <View style={styles.titleContainer}>
        <CustomText weight={"medium"} style={styles.text}>
          Summary:{" "}
        </CustomText>
        <CustomText weight={"medium"} style={styles.price}>
          $
          {Math.floor(
            totalAmount(bagProducts) + deliveryMethod.deliveryMethodCost
          )}
        </CustomText>
      </View>
      <Btn
        height={50}
        width={Dimensions.get("window").width - 32}
        bgColor={COLORS.PRIMARY}
        btnName={"Submit Order"}
        titleStyle={{ fontSize: 18 }}
        containerStyle={{ marginTop: 25 }}
        onPress={() => handleSubmit()}
      />
    </ScrollView>
  );
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  titleContainer: {
    width: "100%",
    height: 20,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 16,
    lineHeight: 20,
  },
  section: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  imgWrapper: {
    width: 65,
    height: 40,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  deliveryImgWrapper: {
    width: 100,
    height: 70,
    borderRadius: 8,
  },
  change: {
    position: "absolute",
    top: 0,
    right: 20,
  },
  text: {
    color: COLORS.GRAY,
    fontSize: 16,
    lineHeight: 20,
  },
  price: {
    color: COLORS.TEXT,
    fontSize: 16,
    lineHeight: 20,
    position: "absolute",
    top: 10,
    right: 20,
  },
});
