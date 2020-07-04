import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import homeImage from "../assets/homeImage.png";
import { Btn } from "../components/Btn";
import { ProductCard } from "../components/ProductCard";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import {
  getAllData,
  selectNewProducts,
  selectOnSale,
  selectCategory,
} from "../store/products";
import { connect } from "react-redux";

import banner from "../assets/Small_banner.png";
import { filterDataByTag, getData } from "../API";

const mapStateToProps = (state) => ({
  // newProducts: selectNewProducts(state),
  // onSale: selectOnSale(state),
});

const Home = connect(mapStateToProps, { getAllData })(
  ({ getAllData, navigation, newProducts, onSale, dresses }) => {
    const [showSale, setShowSale] = useState(false);
    const [newAysel, setNewProducts] = useState([]);

    // const newHandle = async (data) => {
    //   try {
    //     const newwss = await getAllData(data);
    //     console.log("newwss", newwss);
    //   } catch (error) {
    //     console.log("newww err", error);
    //   }
    // };

    // const womenNew = async () => await filterDataByTag(["new", "women"]);
    // const New = async () => await filterDataByTag("new");
    // const women = async () => await filterDataByTag("women");
    // const alllData = async (value) => await getAllData("new");

    // console.log("womenNew", womenNew);
    // console.log("New", New);
    // console.log("women", women);
    // console.log("alllData", alllData);

    // useEffect(() => {
    //   const response = async () => {
    //     const answer = await getData("new");

    //     console.log("answer", answer);

    //     setNewProducts(answer);
    //   };
    // }, []);

    // console.log("newProducts", newAysel);
    return (
      <ScrollView style={styles.container}>
        {showSale ? (
          <>
            <Image source={banner} style={{ width: "100%", height: 196 }} />
            <View style={styles.newItemsWrap}>
              <CustomText style={styles.categoryTitle} weight="bold">
                Sale
              </CustomText>
              <CustomText style={styles.description}>
                Super Summer Sale
              </CustomText>

              <Button title="show new" onPress={() => newHandle("new")} />
              {/* <FlatList
                horizontal
                contentContainerStyle={{
                  paddingTop: 15,
                }}
                data={onSale}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SingleProduct", {
                        product: item,
                        products: onSale,
                      })
                    }
                  >
                    <ProductCard
                      product={item}
                      isOnSale={true}
                      isInCatalog={true}
                      navigation={navigation}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.productType}
              /> */}
            </View>
          </>
        ) : (
          <View style={styles.imageWrapper}>
            <Image source={homeImage} style={{ width: "100%", height: 480 }} />
            <CustomText style={styles.title} weight="bold">
              Fashion sale
            </CustomText>
            <View style={styles.btn}>
              <Btn
                btnName="Check"
                bgColor={COLORS.PRIMARY}
                height={36}
                width={160}
                onPress={() => setShowSale(true)}
              />
            </View>
          </View>
        )}

        <View style={styles.newItemsWrap}>
          <CustomText style={styles.categoryTitle} weight="bold">
            New
          </CustomText>
          <CustomText style={styles.description}>
            You've never seen it before
          </CustomText>

          {/* <FlatList
            horizontal
            contentContainerStyle={{
              paddingTop: 15,
            }}
            data={newProducts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SingleProduct", {
                    product: item,
                    products: newProducts,
                  })
                }
              >
                <ProductCard
                  product={item}
                  isNew={true}
                  isInCatalog={true}
                  navigation={navigation}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.productType}
          /> */}
        </View>
      </ScrollView>
    );
  }
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: "100%",
  },
  title: {
    fontSize: 48,
    position: "absolute",
    bottom: 88,
    left: 15,
    width: 190,
    color: COLORS.TEXT,
  },
  btn: {
    position: "absolute",
    left: 15,
    bottom: 34,
  },
  newItemsWrap: {
    backgroundColor: COLORS.BACKGROUND,
    paddingLeft: 15,
    paddingTop: 20,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 34,
    color: COLORS.TEXT,
  },
  description: {
    color: COLORS.GRAY,
    fontSize: 11,
    marginBottom: 10,
  },
});
