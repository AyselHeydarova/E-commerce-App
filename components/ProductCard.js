import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { CustomText } from "./CustomText";
import { COLORS } from "../style/colors";
import StarRating from "react-native-star-rating";

export const ProductCard = ({
  product,
  isRowView = false,
  isInCatalog = false,
  isInFavs,
}) => {

  const columnStyles = {
    cardWrapper: {
      flexDirection: "column",
      width: 164,
      height: 280,
      borderRadius: 8,
      backgroundColor: COLORS.DARK,
      marginRight: 20,
      marginBottom: 20
    },

    imgWrapper: {
      width: "100%",
      height: 174,
      borderRadius: 8,
      overflow: "hidden",
    },
    productImg: {
      borderRadius: 8,
      width: "100%",
      height: "100%",
    },
  };

  const {
    brandName,
    name,
    price,
    size,
    colour,
    rating,
    imagesUrls,
    count,
  } = product;


  const cardWrapperStyles = [
    isRowView ? styles.cardWrapper : columnStyles.cardWrapper,
    { opacity: count === 0 ? 0.5 : 1 },
  ];

  return (
    <View style={cardWrapperStyles}>
      <View style={isRowView ? styles.imgWrapper : columnStyles.imgWrapper}>
        <Image
          source={{
            uri: imagesUrls
              ? imagesUrls[0]
              : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          }}
          style={isRowView ? styles.productImg : columnStyles.productImg}
        />

        {count === 0 && (
          <View style={styles.soldOut}>
            <CustomText>Sorry, this item is currently sold out</CustomText>
          </View>
        )}
      </View>

      <View style={styles.description}>
        <View style={styles.row}>
          <StarRating
            disabled={true}
            fullStarColor={COLORS.STAR}
            starSize={14}
            starStyle={{ margin: 3 }}
            containerStyle={{ marginTop: 0, width: 80 }}
            maxStars={5}
            // rating={ratings[0]}
          />
          <CustomText style={{ color: COLORS.GRAY }}>(10)</CustomText>
        </View>

        <CustomText style={{ color: COLORS.GRAY }}>{brandName}</CustomText>
        <CustomText weight="bold">{name}</CustomText>

        {isInCatalog ? null : (
          <View style={styles.row}>
            <View style={styles.row}>
              <CustomText style={{ color: COLORS.GRAY }}>Color: </CustomText>
              <CustomText> {Object.keys(colour[0])[0]} </CustomText>
            </View>

            <View style={styles.row}>
              <CustomText style={{ color: COLORS.GRAY }}>Size:</CustomText>
              <CustomText>{Object.keys(size[0])[0]}</CustomText>
            </View>
          </View>
        )}

        <CustomText weight="bold">${price}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    height: 110,
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: COLORS.DARK,
    overflow: "hidden",
  },

  description: {
    padding: 15,
    // width: "70%",
    paddingTop: 0,
    justifyContent: "space-between",
    flex: 1,
  },

  imgWrapper: {
    width: "30%",
    height: 110,
    overflow: "hidden",
  },

  productImg: {
    width: "100%",
    height: "100%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  soldOut: {
    height: 36,
    opacity: 0.7,
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.DARK,
  },
});
