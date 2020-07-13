import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { Btn } from "../components/Btn";
import { ProductCard } from "../components/ProductCard";
import { CardView } from "../Icons/CardView";
import {
  selectUserData,
  getCurrentUserData,
  addOrderedProducts,
  selectCount,
  deleteBagProducts,
} from "../store/users";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  usersData: selectUserData(state),
  count: selectCount(state),
});
export const MyBag = connect(mapStateToProps, {
  getCurrentUserData,
  addOrderedProducts,
  deleteBagProducts,
})(
  ({
    getCurrentUserData,
    usersData,
    addOrderedProducts,
    deleteBagProducts,
    navigation,
  }) => {
    const bagProducts = usersData.userProductsInBag || [];
    const totalAmount = () => {
      let total = 0;
      bagProducts.forEach((product) => {
        total = total + product.price * product.selectedCount;
      });
      return total;
    };

    const handleUserData = async () => {
      try {
        await getCurrentUserData();
      } catch (error) {
        console.log("getCurrentUserData", error);
      }
    };
    const handleDeleteBagProducts = async () => {
      try {
        await deleteBagProducts();
      } catch (error) {
        console.log("getCurrentUserData", error);
      }
    };
    const handleCheckOut = () => {
      // addOrderedProducts(bagProducts);
      // handleDeleteBagProducts();
      // console.log('bagProducts', bagProducts)
      navigation.navigate("Checkout");
    };

    useEffect(() => {
      handleUserData();
    }, []);
    return (
      <View style={styles.container}>
        <StatusBar />
        <CustomText weight={"bold"} style={styles.title}>
          My Bag
        </CustomText>

        <FlatList
          data={bagProducts}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ProductCard isInFavs={true} product={item} isRowView={true} />
            </View>
          )}
          keyExtractor={(item) => `${item.id}${item.size}${item.color}`}
        />
        <View style={styles.amountContainer}>
          <CustomText weight={"bold"} style={styles.amount}>
            Total amount:
          </CustomText>
          <CustomText weight={"bold"} style={styles.totalCost}>
            ${Math.floor(totalAmount())}
          </CustomText>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Btn
            onPress={() => handleCheckOut()}
            width={345}
            height={50}
            bgColor={COLORS.PRIMARY}
            btnName={"CHECK OUT"}
          />
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 15,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 34,
    lineHeight: 34,
    marginVertical: 30,
  },
  amount: {
    color: COLORS.GRAY,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 28,
  },
  totalCost: {
    color: COLORS.TEXT,
    fontSize: 18,
    lineHeight: 22,
    marginRight: 28,
  },
  btn: {
    marginTop: 30,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 10,
  },
  amountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
