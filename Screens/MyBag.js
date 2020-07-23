import React, { useEffect } from "react";
import "firebase/firestore";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { Btn } from "../components/Btn";
import { ProductCard } from "../components/ProductCard";
import { selectUserData, getCurrentUserData } from "../store/users";
import { connect } from "react-redux";
import { totalAmount } from "../Utils/Calculations";
import { GLOBAL_STYLES } from "../style/globalStyles";

const mapStateToProps = (state) => ({
  usersData: selectUserData(state),
});
export const MyBag = connect(mapStateToProps, {
  getCurrentUserData,
})(({ getCurrentUserData, usersData, navigation }) => {
  let bagProducts;
  if (usersData.userProductsInBag) {
    bagProducts = usersData.userProductsInBag;
  } else {
    bagProducts = [];
  }
  const handleUserData = async () => {
    try {
      await getCurrentUserData();
    } catch (error) {
      console.log("getCurrentUserData", error);
    }
  };
  const handleCheckOut = () => {
    if (bagProducts.length) {
      navigation.navigate("Checkout", {
        bagProducts: bagProducts,
      });
    } else {
      Alert.alert("Error", "Please add product before ordering!");
    }
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
      {bagProducts.length ? (
        <FlatList
          data={bagProducts}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ProductCard isInFavs={true} product={item} isRowView={true} />
            </View>
          )}
          keyExtractor={(item) => `${item.id}${item.size}${item.color}`}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <CustomText style={{ fontSize: 16.6, color: COLORS.SALE }}>
            Sorry, You don't have any products in Bag.
          </CustomText>
        </View>
      )}
      <View style={styles.amountContainer}>
        <CustomText weight={"bold"} style={styles.amount}>
          Total amount:
        </CustomText>
        <CustomText weight={"bold"} style={styles.totalCost}>
          ${Math.floor(totalAmount(bagProducts))}
        </CustomText>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Btn
          onPress={() => handleCheckOut()}
          width={Dimensions.get("window").width - 32}
          height={50}
          bgColor={COLORS.PRIMARY}
          btnName={"CHECK OUT"}
        />
      </TouchableOpacity>
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
