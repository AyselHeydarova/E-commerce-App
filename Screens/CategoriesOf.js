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
import { getAllData } from "../store/products";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../style/globalStyles";

export const CategoriesOf = connect(null, { getAllData })(
  ({ getAllData, route, navigation }) => {
    const { isWomanClicked, isOnSale, categoryName } = route.params;
    const categoriesMen =
      categoryName === "Shoes" || categoryName === "Bags"
        ? [`${categoryName}`]
        : ["Shorts", "Trousers", "T-shirts"];
    const categoriesWomen =
      categoryName === "Shoes" || categoryName === "Bags"
        ? [`${categoryName}`]
        : ["Dresses", "Shorts", "Skirts", "Trousers", "T-shirts"];
    const gender = isWomanClicked ? "women" : "men";

    const handleCategory = async (category) => {
      try {
        await getAllData(gender, category);
      } catch (error) {
        console.log("getAllData", error);
      }
      navigation.navigate("Catalog", {
        name: category,
        isWomanClicked: isWomanClicked,
        categoryName: categoryName,
        isOnSale: isOnSale,
      });
    };

    const handleAllProducts = async () => {
      try {
        if (categoryName === "Shoes" || categoryName === "Bags")
          await getAllData(gender, categoryName);
        else await getAllData(gender);
      } catch (error) {
        console.log("getAllData", error);
      }
      navigation.navigate("Catalog", {
        name: "All Products",
        isWomanClicked: isWomanClicked,
        categoryName: categoryName,
        isOnSale: isOnSale,
      });
    };
    return (
      <View style={styles.container}>
        <StatusBar />
        <Btn
          height={50}
          width={"100%"}
          bgColor={COLORS.PRIMARY}
          btnName={"VIEW ALL ITEMS"}
          titleStyle={{ fontSize: 18 }}
          onPress={() => handleAllProducts()}
        />
        <CustomText weight={"bold"} style={styles.choose}>
          Choose Category
        </CustomText>
        <View style={{ marginTop: 60 }}>
          <FlatList
            data={isWomanClicked ? categoriesWomen : categoriesMen}
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
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingTop: 10,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 30,
    lineHeight: 28,
    margin: 10,
    marginLeft: 55,
    marginRight: 75,
  },
  choose: {
    color: COLORS.GRAY,
    fontSize: 20,
    position: "absolute",
    left: 16,
    top: 90,
  },
  backIcon: {
    marginTop: 10,
  },
  category: {
    width: 355,
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
