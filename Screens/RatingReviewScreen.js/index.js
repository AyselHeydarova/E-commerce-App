import React, { useEffect } from "react";
import { ClientReviewsList } from "./ClientReviewsList";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import { RatingRow } from "./RatingRow";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { averageRatingCalc, totalRatingCalc } from "../../Utils/Calculations";
import { ClientReview } from "./ClientReview";
import { Btn } from "../../components/Btn";
import { connect } from "react-redux";
import {
  selectCurrentProductRating,
  getCurrentProduct,
  selectIsModalOpen,
  toggleModal,
} from "../../store/products";

const mapStateToProps = (state) => ({
  rating: selectCurrentProductRating(state),
  isModalOpen: selectIsModalOpen(state),
});

export const RatingReviewScreen = connect(mapStateToProps, {
  getCurrentProduct,
  toggleModal,
})(({ route, rating, getCurrentProduct, toggleModal, isModalOpen }) => {
  const productID = route.params.productID;
  const handleGetCurrentProduct = async () => {
    try {
      await getCurrentProduct(productID);
    } catch (error) {
      console.log("handleGetCurrentProduct", error);
    }
  };
  useEffect(() => {
    handleGetCurrentProduct();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => toggleModal(false)}>
      <View style={styles.container}>
        <View style={styles.ratingWrapper}>
          <CustomText style={styles.heading} weight="bold">
            Rating&Reviews
          </CustomText>

          <View style={styles.row}>
            <View style={styles.totalRating}>
              <CustomText style={styles.averageRate} weight="medium">
                {averageRatingCalc(rating)}
              </CustomText>
              <CustomText style={styles.totalCount}>
                {totalRatingCalc(rating)} rating
              </CustomText>
            </View>
            <View style={styles.ratingColumn}>
              <RatingRow
                starCount={5}
                ratingCount={Object.values(rating[4])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={4}
                ratingCount={Object.values(rating[3])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={3}
                ratingCount={Object.values(rating[2])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={2}
                ratingCount={Object.values(rating[1])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={1}
                ratingCount={Object.values(rating[0])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
            </View>
          </View>
        </View>

        <ClientReviewsList productID={productID} />
        <Btn
          btnName="Write a review"
          onPress={() => toggleModal(true)}
          width={128}
          height={36}
          bgColor={COLORS.PRIMARY}
          containerStyle={{ position: "absolute", bottom: 10, right: 16 }}
        />

        {isModalOpen ? <ClientReview productID={productID} /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  ratingWrapper: {
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
