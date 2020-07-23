import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { Filter } from "../Icons/Filter";
import { PriceArrows } from "../Icons/PriceArrows";
import { ListViewChanger } from "../Icons/ListViewChanger";
import { ProductCard } from "../components/ProductCard";
import { CardView } from "../Icons/CardView";
import {
  selectAllProductData,
  selectFilteredProducts,
  getFilteredProducts,
} from "../store/products";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { SortByModal } from "../components/SortByModal";

const mapStateToProps = (state) => ({
  allProducts: selectAllProductData(state),
  sortedProducts: selectFilteredProducts(state),
});
export const Catalog = connect(mapStateToProps, { getFilteredProducts })(
  ({ allProducts, route, navigation, sortedProducts, getFilteredProducts }) => {
    const {
      name,
      isWomanClicked,
      categoryName,
      isOnSale = false,
      isFiltered = false,
      filteredProducts,
    } = route.params;

    const products = allProducts.allProducts;

    const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState({
      lowestToHigh: false,
      highestToLow: false,
    });
    const [isSortingType, setIsSortingType] = useState("Price");
    const [isSorted, setIsSorted] = useState(false);
    const [isListView, setIsListView] = useState(true);

    const sortType =
      isSortingType === "Price: highest to low"
        ? "desc"
        : isSortingType === "Price: lowest to high"
        ? "asc"
        : null;

    const sortedFields = {
      category: name,
      gender: isWomanClicked ? "women" : "men",
      isSortClicked: true,
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

    const sortingHandler = async () => {
      try {
        await getFilteredProducts(sortedFields);
      } catch (error) {
        console.log("sortingHandler err", error);
      }
    };

    const handleSorting = (name, sortOptionBool) => {
      setIsSortingType(name);
      setSortOption({
        ...false,
        [sortOptionBool]: !sortOption[`${sortOptionBool}`],
      });
      setIsSorted(true);
      setIsBottomModalOpen(false);
      sortingHandler();
    };

    useEffect(() => {
      sortingHandler();
    }, [sortedFields.sortType]);

    const newProducts = products.filter(
      (product) =>
        product.tags.includes("new") || product.tags.includes("isNew")
    );

    const saleProducts = products.filter((product) =>
      product.tags.includes("sale")
    );

    const finalProducts =
      categoryName === "New" ? newProducts : isOnSale ? saleProducts : products;

    const numberOfColums = isListView ? 1 : 2;

    const handleProductCard = (item) => {
      navigation.navigate("SingleProductScreen", {
        product: item,
        products: products,
      });
    };
    const result = isFiltered
      ? filteredProducts
      : isSorted
      ? sortedProducts
      : finalProducts;

    console.log("isSorted", isSorted);
    console.log("result", result);
    console.log("sorted products", sortedProducts);

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
            onPress={() => {
              isFiltered
                ? Alert.alert(
                    "Sorry",
                    "You can not sort products after filtering"
                  )
                : setIsBottomModalOpen(!isBottomModalOpen);
            }}
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
        {finalProducts.length === 0 ? (
          <CustomText style={{ fontSize: 16.6, color: COLORS.SALE }}>
            Sorry, You don't have any products in {`${categoryName}`} yet!
          </CustomText>
        ) : filteredProducts !== undefined && filteredProducts.length === 0 ? (
          <CustomText style={{ fontSize: 16.6, color: COLORS.SALE }}>
            Sorry, You don't have any products by this filtering
          </CustomText>
        ) : (
          <FlatList
            data={result}
            numColumns={numberOfColums}
            columnWrapperStyle={
              isListView ? null : { justifyContent: "space-around" }
            }
            key={numberOfColums}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                isInCatalog={true}
                isRowView={isListView}
                isOnSale={isOnSale}
                onPress={() => handleProductCard(item)}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        )}
        {isBottomModalOpen ? (
          <SortByModal name={"SortBy"} height={250}>
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
          </SortByModal>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 34,
    lineHeight: 34,
    marginBottom: 20,
  },
  btn: {
    margin: 10,
  },
  filters: {
    height: 40,
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
