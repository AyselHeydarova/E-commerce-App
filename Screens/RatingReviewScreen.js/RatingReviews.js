import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomText } from "../../components/CustomText";
import { COLORS } from "../../style/colors";
import { RatingRow } from "./RatingRow";
import { GLOBAL_STYLES } from "../../style/globalStyles";

const product = {
  brandName: "Mango",
  productType: "T-shirt",
  price: "49$",
  size: "S",
  color: "white",
  imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
  count: 5,
  ratings: {
    one: 12,
    two: 14,
    three: 6,
    four: 22,
    five: 158,
  },
};

export const RatingReviews = ({ route }) => {
  console.log("Rating Deeper", route);

  const allRatingsArray = Object.values(product.ratings);
  const totalRatingCount = allRatingsArray.reduce(function (a, b) {
    return a + b;
  });

  let totalStarCount = 0;
  for (let i = 0; i <= 4; i++) {
    totalStarCount += allRatingsArray[i] * (i + 1);
  }

  const averageRating =
    Math.round((totalStarCount / totalRatingCount) * 10) / 10;
  return (
    <View style={styles.container}>
      <CustomText style={styles.heading} weight="bold">
        Rating&Reviews
      </CustomText>

      <View style={styles.row}>
        <View style={styles.totalRating}>
          <CustomText style={styles.averageRate} weight="medium">
            {averageRating}
          </CustomText>
          <CustomText style={styles.totalCount}>
            {totalRatingCount} rating
          </CustomText>
        </View>
        <View style={styles.ratingColumn}>
          <RatingRow
            starCount={5}
            ratingCount={product.ratings.five}
            totalRatingCount={totalRatingCount}
          />
          <RatingRow
            starCount={4}
            ratingCount={product.ratings.four}
            totalRatingCount={totalRatingCount}
          />
          <RatingRow
            starCount={3}
            ratingCount={product.ratings.three}
            totalRatingCount={totalRatingCount}
          />
          <RatingRow
            starCount={2}
            ratingCount={product.ratings.two}
            totalRatingCount={totalRatingCount}
          />
          <RatingRow
            starCount={1}
            ratingCount={product.ratings.one}
            totalRatingCount={totalRatingCount}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  heading: {
    fontSize: 34,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  averageRate: {
    fontSize: 44,
  },

  totalCount: {
    fontSize: 14,
    color: COLORS.GRAY,
  },

  ratingColumn: {
    justifyContent: "flex-end",
  },
});
