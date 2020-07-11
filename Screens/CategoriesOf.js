
import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CustomText } from "../components/CustomText";
import { COLORS } from "../style/colors";
import { Btn } from "../components/Btn";
import { getAllData, selectAllProductData } from "../store/products";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../style/globalStyles";

const mapStateToProps = (state) => ({
    allProducts: selectAllProductData(state),
});

export const CategoriesOf = connect(mapStateToProps, { getAllData })(
  ({ getAllData, allProducts, route, navigation }) => {
    const { isWomanClicked, isOnSale, categoryName } = route.params;
    const categoriesMen = ["Shorts", "Trousers", "T-shirts", "Shoes"];
    const categoriesWomen = [
      "Dresses",
      "Shorts",
      "Skirts",
      "Trousers",
      "T-shirts",
      "Shoes",
    ];
    const gender = isWomanClicked ? "women" : "men";
    const handleCategory = async (category) => {
      try {
        await getAllData(category, gender);
      } catch (error) {
        console.log("getAllData", error);
      }
      navigation.navigate("Catalog", {
        name: category,
        isWomanClicked: isWomanClicked,
        categoryName: category,
        isOnSale: isOnSale,
      });
    };
    return (
      <View style={styles.container}>
        <StatusBar />
        <Btn
          height={50}
          width="100%"
          bgColor={COLORS.PRIMARY}
          btnName={"VIEW ALL ITEMS"}
          titleStyle={{ fontSize: 18 }}
        />
        <CustomText weight={"bold"} style={styles.choose}>
          Choose Category
        </CustomText>
        <FlatList
          data={isWomanClicked ? categoriesWomen : categoriesMen}
          contentContainerStyle={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.category}
              onPress={() => handleCategory(item)}
            >
              <CustomText style={styles.categoryText}>{item}</CustomText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    backgroundColor: COLORS.BACKGROUND,
    paddingTop: 10,
  },
  choose: {
    color: COLORS.GRAY,
    fontSize: 20,
    textAlign: "left",
    marginTop: 16,
  },
  category: {
    width: "100%",
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: COLORS.GRAY,
  },
  categoryText: {
    fontSize: 16,
    lineHeight: 16,
  },
});
