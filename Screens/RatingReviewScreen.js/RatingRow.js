import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomText } from "../../components/CustomText";
import StarRating from "react-native-star-rating";
import { COLORS } from "../../style/colors";

export const RatingRow = ({ starCount, ratingCount, totalRatingCount }) => {
  const ratingInPercentage = (ratingCount / totalRatingCount) * 100;
  return (
    <View style={styles.row}>
      <StarRating
        disabled={true}
        fullStarColor={COLORS.STAR}
        starSize={14}
        starStyle={{ margin: 3 }}
        maxStars={starCount}
        rating={starCount}
      />

      <View style={styles.progressWrapper}>
        <View
          style={[styles.progressBar, { width: `${ratingInPercentage}%` }]}
        />
      </View>

      <CustomText style={styles.ratingCount}>{ratingCount}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  progressWrapper: {
    width: 90,
    height: 8,
    backgroundColor: COLORS.DARK,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
  },

  ratingCount: {
    fontSize: 14,
    color: COLORS.GRAY,
    width: 33,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
