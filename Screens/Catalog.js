import React, { useState, useEffect } from "react";
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
import { Filter } from "../Icons/Filter";
import { PriceArrows } from "../Icons/PriceArrows";
import { ListViewChanger } from "../Icons/ListViewChanger";
import { ProductCard } from "../components/ProductCard";
import { CardView } from "../Icons/CardView";
import { BottomModal } from "../components/bottomModal";
import {
  getAllData,
  selectAllProductData,
  selectFilteredProducts,
  getFilteredProducts,
} from "../store/products";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../style/globalStyles";

const mapStateToProps = (state) => ({
  allProducts: selectAllProductData(state),
  filteredProductsData: selectFilteredProducts(state),
});
export const Catalog = connect(mapStateToProps, { getFilteredProducts })(
  ({
    allProducts,
    route,
    navigation,
    filteredProductsData,
    getFilteredProducts,
  }) => {
    const sortingHandler = async () => await getFilteredProducts(sortedFields);

    // useEffect(() => sortingHandler(), []);

    const {
      name,
      isWomanClicked,
      categoryName,
      isOnSale = false,
      isFiltered = true,
      filteredProducts,
    } = route.params;

    const products = allProducts.allProducts;
    const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState({
      lowestToHigh: false,
      highestToLow: true,
    });

    const [isSortingType, setIsSortingType] = useState("Price: highest to low");

    const sortType = isSortingType === "Price: highest to low" ? "asc" : "desc";

    const sortedFields = {
      category: categoryName,
      gender: isWomanClicked ? "women" : "men",
      sortBy: "price",
      sortType,
    };
    const sortOptions = [
      {
        sortingName: "Price: lowest to high",
        sortOptionBool: "lowestToHigh",
      },
      {
        sortingName: "Price: highest to low",
        sortOptionBool: "highestToLow",
      },
    ];

    const handleSorting = (name, sortOptionBool) => {
      setIsSortingType(name);
      setSortOption({
        ...false,
        [sortOptionBool]: !sortOption[`${sortOptionBool}`],
      });
      sortingHandler();
      setIsBottomModalOpen(false);
    };

    const newProducts = products.filter(
      (product) =>
        product.tags.includes("new") || product.tags.includes("isNew")
    );

    const saleProducts = products.filter((product) =>
      product.tags.includes("sale")
    );

    const finalProducts =
      categoryName === "New" ? newProducts : isOnSale ? saleProducts : products;
    console.log('finalProducts',finalProducts)
    console.log('filteredProductsData',filteredProductsData)
    const [isListView, setIsListView] = useState(true);

    const numberOfColums = isListView ? 1 : 2;

    const handleProductCard = (item) => {
      navigation.navigate("SingleProductScreen", {
        product: item,
        products: products,
      });
    };

    return (
      <View style={styles.container}>
        <StatusBar />
        <CustomText weight={"bold"} style={styles.title}>
          {isOnSale ? "Sale" : name}
        </CustomText>
        <View style={styles.filters}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() =>
              navigation.navigate("Filters", {
                finalProducts: finalProducts,
              })
            }
          >
            <Filter width={20} height={20} />
            <CustomText>Filters</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setIsBottomModalOpen(!isBottomModalOpen)}
          >
            <PriceArrows width={20} height={20} />
            <CustomText>{isSortingType}</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setIsListView(!isListView)}
          >
            {isListView ? (
              <ListViewChanger width={20} height={20} />
            ) : (
              <CardView width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          data={isFiltered ? filteredProductsData : finalProducts}
          numColumns={numberOfColums}
          key={numberOfColums}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleProductCard(item)}
              activeOpacity={0.9}
            >
              <ProductCard
                product={item}
                isInCatalog={true}
                isRowView={isListView}
                isOnSale={isOnSale}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />

        {isBottomModalOpen ? (
          <BottomModal name={"SortBy"} height={250}>
            <View style={styles.sortBy}>
              <FlatList
                data={sortOptions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.sortingContainer,
                      {
                        backgroundColor: sortOption[`${item.sortOptionBool}`]
                          ? COLORS.PRIMARY
                          : null,
                      },
                    ]}
                    onPress={() => {
                      handleSorting(item.sortingName, item.sortOptionBool);
                    }}
                  >
                    <CustomText weight={"medium"} style={styles.sortingName}>
                      {item.sortingName}
                    </CustomText>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.sortingName}
              />
            </View>
          </BottomModal>
        ) : null}
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
  sortBy: {
    width: "100%",
    marginTop: 70,
  },
  sortingName: {
    fontSize: 18,
    lineHeight: 18,
  },
  sortingContainer: {
    width: "100%",
    padding: 16,
    alignItems: "flex-start",
  },
});
