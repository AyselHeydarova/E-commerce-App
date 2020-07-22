import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, FlatList } from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { Btn } from "../components/Btn";
import { ProductCard } from "../components/ProductCard";
import { getCurrentUserData, selectUserData } from "../store/users";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { selectAllProductData } from "../store/products";
import { addProductToUsersBag } from "../API";
const mapStateToProps = (state) => ({
  usersData: selectUserData(state),
  allProducts: selectAllProductData(state),
});
export const Favorites = connect(mapStateToProps, {
  getCurrentUserData,
  addProductToUsersBag,
})(
  ({
    getCurrentUserData,
    allProducts,
    usersData,
    navigation,
    addProductToUsersBag,
    getAllData,
  }) => {
    const favorites = usersData.userFavorites || [];
    console.log("favorites", favorites);
    const clothes = [
      "T-Shirts",
      "Skirts",
      "Shoes",
      "Shorts",
      "Dresses",
      "Trousers",
    ];
    const [favoritesData, setFavData] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    let favoritesSortedByCategory = [];
    const handleFavs = async () => {
      try {
        await getCurrentUserData();
        await getAllData();
      } catch (error) {
        console.log("getNewData", error);
      }
    };

    useEffect(() => {
      handleFavs();
    }, [favoritesData]);

    const handleSortByCategory = (category) => {
      favoritesSortedByCategory = favorites.filter((fav) =>
        fav.tags.includes(category)
      );
      setFavData(favoritesSortedByCategory);
      setIsSorted(true);
    };

    return (
      <View style={styles.container}>
        <StatusBar />
        <CustomText weight={"bold"} style={styles.title}>
          Favorites
        </CustomText>
        <View style={styles.btns}>
          <FlatList
            horizontal={true}
            data={clothes}
            renderItem={({ item }) => (
              <View style={styles.btn}>
                <Btn
                  width={100}
                  height={30}
                  bgColor={COLORS.TEXT}
                  btnName={item}
                  titleStyle={{ color: COLORS.BACKGROUND }}
                  onPress={() => handleSortByCategory(item)}
                />
              </View>
            )}
          />
        </View>

        <FlatList
          data={isSorted ? favoritesData : favorites}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              isInFavs={true}
              isRowView={true}
              isInCatalog={true}
              onLongPress={() => {
                addProductToUsersBag(item, true, true, false);
              }}
              onPress={() =>
                navigation.navigate("SingleProductScreen", {
                  product: item,
                  products: allProducts.allProducts.filter(
                    (product) => product.categoryName === item.categoryName
                  ),
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
);

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
    margin: 20,
  },
  btn: {
    margin: 10,
  },
  filters: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btns: {
    height: 70,
    width: "100%",
  },
  card: {
    marginLeft: 30,
    marginBottom: 20,
  },
  cardContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    paddingLeft: 15,
  },
});
