import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";
import { CustomText } from "../../components/CustomText";
import { COLORS } from "../../style/colors";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { connect } from "react-redux";
import { selectUserData } from "../../store/users";
import { selectCurrentProduct, getCurrentProduct } from "../../store/products";

const mapStateToProps = (state) => ({
  currentProduct: selectCurrentProduct(state),
});

export const ClientReviewsList = connect(mapStateToProps, {
  getCurrentProduct,
})(({ currentProduct, getCurrentProduct, productID }) => {
  useEffect(() => {
    getCurrentProduct(productID);
  }, []);

  const reviews = currentProduct?.reviews;

  console.log("review", reviews);
  return (
    <View>
      <CustomText style={styles.text} weight="medium">
        {reviews.length} reviews
      </CustomText>
      {reviews && (
        <FlatList
          data={reviews || []}
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
