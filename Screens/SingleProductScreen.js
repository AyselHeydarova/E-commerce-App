import React, { useState, useEffect } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../style/colors";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { SizeContainer } from "../components/SizeContainer";
import { Heart } from "../Icons/Heart";
import { CustomText } from "../components/CustomText";
import { ProductCard } from "../components/ProductCard";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { BottomModal } from "../components/bottomModal";
import StarRating from "react-native-star-rating";
import { averageRatingCalc, totalRatingCalc } from "../Utils/Calculations";
import { getCurrentProduct, toggleModal } from "../store/products";
import { connect } from "react-redux";
import { Btn } from "../components/Btn";
import { addProductToUsersBag } from "../API";

export const SingleProductScreen = connect(null, {
  addProductToUsersBag,
  getCurrentProduct,
  toggleModal,
})(({ route, addProductToUsersBag, navigation, getCurrentProduct }) => {
  useEffect(() => {
    handleGetCurrentProduct();
  }, []);
  const {
    id,
    about,
    brandName,
    price,
    imagesUrls,
    name,
    rating,
    colors,
    count,
    onSale,
  } = route.params.product;
  const [isSizeClicked, setIsSizeClicked] = useState(false);
  const [isColorClicked, setIsColorClicked] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [addProduct, setAddProduct] = useState({
    selectedCount: 1,
    id: id,
    name: name,
    price: price,
    count: count,
    imagesUrls: imagesUrls,
    size: "",
    color: "",
    onSale: onSale == undefined ? {} : onSale,
  });
  const [isClicked, setIsClicked] = useState({
    S: false,
    M: false,
    L: false,
  });

  const { products } = route.params;
  const { product } = route.params;
  const size = ["S", "M", "L"];
  const colorsArray = colors.map((colorObj) => colorObj.color);

  const handleGetCurrentProduct = async () => {
    try {
      await getCurrentProduct(id);
    } catch (error) {
      console.log("handleGetCurrentProduct", error);
    }
  };
  const handleAddToCart = () => {
    addProductToUsersBag(addProduct, false);
    setIsSizeClicked(false);
    setIsColorClicked(false);
  };
  const handleFavoriteProduct = () => {
    addProductToUsersBag(product, true);
    setIsHeartClicked(!isHeartClicked);
  };
  const handleSize = (size) => {
    setIsClicked({ ...false, [size]: !isClicked[`${size}`] });
    setAddProduct((prevState) => ({
      ...prevState,
      ["size"]: size,
    }));
  };
  const handleColor = (color) => {
    setAddProduct((prevState) => ({
      ...prevState,
      ["color"]: color,
    }));
    setIsSizeClicked(!isColorClicked);
  };

  const salePrice =
    onSale !== undefined && onSale.discount !== undefined
      ? Math.floor((+price * (100 - +onSale.discount)) / 100)
      : null;
  return (
    <View style={styles.container}>
      <ScrollView>
        <SliderBox
          images={imagesUrls}
          sliderBoxHeight={400}
          circleLoop={true}
          dotColor={COLORS.PRIMARY}
        />
        <View style={styles.main}>
          <View style={styles.row}>
            <SizeContainer
              width={130}
              name="Size"
              onPress={() => setIsSizeClicked(!isSizeClicked)}
              isClicked={isSizeClicked}
              bgColor={isSizeClicked ? COLORS.PRIMARY : null}
              borderWidth={isSizeClicked ? 0 : 0.4}
            />
            <SizeContainer
              onPress={() => setIsColorClicked(!isColorClicked)}
              isClicked={isColorClicked}
              width={130}
              name="Color"
              bgColor={isColorClicked ? COLORS.PRIMARY : null}
              borderWidth={isColorClicked ? 0 : 0.4}
            />
            <View style={{ width: 38 }}>
              <Heart
                width={20}
                height={20}
                isHeartClicked={isHeartClicked}
                onPress={() => handleFavoriteProduct()}
              />
            </View>
          </View>

          <View style={styles.row}>
            <CustomText style={styles.bigText} weight="bold">
              {brandName}
            </CustomText>
            <View style={styles.priceRow}>
              <CustomText
                style={{
                  ...styles.bigText,
                  ...{
                    textDecorationLine:
                      onSale !== undefined && onSale.discount !== undefined
                        ? "line-through"
                        : null,
                  },
                }}
                weight="bold"
              >
                {`${price}$`}
              </CustomText>

              <CustomText
                style={{ ...styles.bigText, ...{ color: COLORS.SALE } }}
                weight="bold"
              >
                {`${salePrice}$`}
              </CustomText>
            </View>
          </View>
          <CustomText style={styles.clothName}>{name}</CustomText>
          <TouchableOpacity
            style={styles.ratingRow}
            onPress={() =>
              navigation.navigate("Rating", {
                productID: id,
              })
            }
          >
            <StarRating
              disabled={true}
              fullStarColor={COLORS.STAR}
              starSize={14}
              starStyle={{ margin: 3 }}
              containerStyle={{ marginTop: 10, width: 80 }}
              maxStars={5}
              rating={averageRatingCalc(rating)}
            />
            <CustomText style={styles.ratingCount}>
              ({totalRatingCalc(rating)})
            </CustomText>
          </TouchableOpacity>
          <CustomText style={styles.descText}>{about}</CustomText>
          <CustomText style={styles.suggestionText} weight="bold">
            You can also like this
          </CustomText>
          <FlatList
            data={products}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("SingleProductScreen", {
                    product: item,
                    products: products,
                  })
                }
              >
                <View>
                  {id !== item.id ? (
                    <ProductCard
                      isInCatalog={true}
                      product={item}
                      isRowView={false}
                    />
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>

      {isSizeClicked ? (
        <BottomModal
          title={"Select Size"}
          data={size}
          height={300}
          handlePress={(item) => handleSize(item)}
          isClicked={isClicked}
          closeModal={() => setIsSizeClicked(false)}
        />
      ) : null}
      {isColorClicked ? (
        <BottomModal
          title={"Select Color"}
          height={350}
          data={colorsArray}
          handlePress={(item) => {
            handleColor(item);
          }}
          isColor={true}
          closeModal={() => setIsColorClicked(false)}
        />
      ) : null}

      <Btn
        height={50}
        width={"100%"}
        bgColor={COLORS.PRIMARY}
        btnName="Add to cart"
        titleStyle={{ fontSize: 18 }}
        onPress={() => handleAddToCart()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  main: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingRow: {
    width: 140,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  bigText: {
    fontSize: 24,
  },
  typeText: {
    fontSize: 11,
    color: COLORS.GRAY,
  },
  descText: {
    fontSize: 14,
  },
  suggestionText: {
    fontSize: 18,
    marginVertical: 20,
  },

  clothName: {
    fontSize: 10,
    marginBottom: 15,
  },
  ratingCount: {
    color: COLORS.GRAY,
    marginTop: 10,
    marginLeft: 15,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
  },
});
