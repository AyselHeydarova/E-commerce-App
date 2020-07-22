import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";
import { CustomText } from "../../components/CustomText";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { connect } from "react-redux";
import { selectCurrentProduct, getCurrentProduct } from "../../store/products";

const mapStateToProps = (state) => ({
  currentProduct: selectCurrentProduct(state),
});

export const ClientReviewsList = connect(mapStateToProps, {
  getCurrentProduct,
})(({ currentProduct, getCurrentProduct, productID }) => {
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

  let reviews;
  if (currentProduct.reviews) {
    reviews = currentProduct.reviews;
  } else {
    reviews = [];
  }

  return (
    <View>
      <CustomText style={styles.text} weight="medium">
        {reviews.length} reviews
      </CustomText>
      {reviews ? (
        <FlatList
          data={reviews.reverse() || []}
          contentContainerStyle={styles.container}
          renderItem={({ item, index }) => (
            <ReviewItem
              username={item.username}
              key={index}
              userImg={item.userPhoto}
              rating={item.givenRating}
              comment={item.review_text}
              date={item.date}
            />
          )}
        />
      ) : (
        <CustomText>There is no reviews for this product</CustomText>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingVertical: GLOBAL_STYLES.PADDING,
    marginBottom: 100,
    paddingBottom: 250,
  },

  text: {
    fontSize: 24,
    marginLeft: 16,
  },
});
