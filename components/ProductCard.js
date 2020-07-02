import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { CustomText } from "./CustomText";
import { COLORS } from "../style/colors";
import StarRating from "react-native-star-rating";
import { ProductTag } from "../commons/ProductTag";
import { Heart } from "../Icons/Heart";

export const ProductCard = ({
  product,
  isRowView = false,
  isInCatalog = false,
  isInFavs,
  isNew,
  isOnSale,
}) => {
  const columnStyles = {
    cardWrapper: {
      flexDirection: "column",
      width: 150,
      height: 280,
      borderRadius: 8,
      backgroundColor: COLORS.DARK,
      marginRight: 20,
      marginBottom: 20,
    },

    imgWrapper: {
      width: "100%",
      height: 174,
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
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
    onSale,
  } = product;

  console.log("product firestore", product);

  const allRatingsArray = rating.map((obj) => {
    for (let key in obj) {
      const value = obj[key];
      return value;
    }
  });
  const totalRatingCount = allRatingsArray.reduce(function (a, b) {
    return a + b;
  });

  let totalStarCount = 0;
  for (let i = 0; i <= 4; i++) {
    totalStarCount += allRatingsArray[i] * (i + 1);
  }

  const averageRating =
    Math.round((totalStarCount / totalRatingCount) * 10) / 10;

  const cardWrapperStyles = [
    isRowView ? styles.cardWrapper : columnStyles.cardWrapper,
    { opacity: count === 0 ? 0.5 : 1 },
  ];

  // const salePrice = Math.floor((+price * (100 - +onSale.percentage)) / 100);

  return (
    <View style={cardWrapperStyles}>
      <View style={isRowView ? styles.imgWrapper : columnStyles.imgWrapper}>
        {isNew ? <ProductTag style={styles.tag} title="new" /> : null}

        {isOnSale ? (
          <ProductTag
            style={{ ...styles.tag, backgroundColor: COLORS.PRIMARY }}
            // title={`${onSale.percentage}%`}
          />
        ) : null}
        <Image
          source={{
            uri:
              imagesUrls[0] ||
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
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
            containerStyle={{ marginTop: 10, width: 80 }}
            maxStars={5}
            rating={averageRating}
          />
          <CustomText style={{ color: COLORS.GRAY, marginTop: 10 }}>
            {`(${totalRatingCount})`}
          </CustomText>
        </View>

        <CustomText style={{ color: COLORS.GRAY }}>{brandName}</CustomText>
        <CustomText weight="medium">{name.toLowerCase()}</CustomText>

        {isInCatalog ? null : (
          <View style={styles.row}>
            <View style={styles.row}>
              <CustomText style={{ color: COLORS.GRAY }}>Color: </CustomText>
              {/*<CustomText> {Object.keys(colour[0])[0]} </CustomText>*/}
            </View>

            <View style={styles.row}>
              <CustomText style={{ color: COLORS.GRAY }}>Size:</CustomText>
              {/*<CustomText>{Object.keys(size[0])[0]}</CustomText>*/}
            </View>
          </View>
        )}

        <View style={styles.priceRow}>
          <CustomText
            weight="bold"
            style={{
              color: isOnSale ? COLORS.GRAY : COLORS.TEXT,
              // textDecorationLine: isOnSale ? "line-through" : null,
            }}
          >
            {`${price}$`}
          </CustomText>
          {/*{isOnSale ? (*/}
          {/*  <CustomText*/}
          {/*    weight="bold"*/}
          {/*    style={{ color: COLORS.SALE, marginLeft: 10 }}*/}
          {/*  >{`${salePrice}$`}*/}
          {/*  </CustomText>*/}
          {/*) : null}*/}
        </View>
      </View>

      <Heart width={12} height={12} color={COLORS.GRAY} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    height: 110,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: COLORS.DARK,
    marginBottom: 25,
    position: "relative",
  },

  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 3,
  },
  description: {
    padding: 15,
    // width: "70%",
    paddingTop: 0,
    justifyContent: "space-between",
    flex: 1,
  },

  imgWrapper: {
    width: 110,
    height: 110,
    overflow: "hidden",
    position: "relative",
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

  priceRow: {
    flexDirection: "row",
  },
});
