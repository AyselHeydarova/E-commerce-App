import React, { useEffect } from "react";
import { ScrollView, FlatList, View, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";
import { CustomText } from "../../components/CustomText";
import { COLORS } from "../../style/colors";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { connect } from "react-redux";
import { selectUsers, selectUserData } from "../../store/users";
import {
  selectProductReviews,
  selectCurrentProduct,
  getCurrentProduct,
} from "../../store/products";

const mapStateToProps = (state) => ({
  currentProduct: selectCurrentProduct(state),
  // user: selectUserData(state),
});

export const ClientReviewsList = connect(mapStateToProps, {
  getCurrentProduct,
})(({ currentProduct, getCurrentProduct, productID }) => {
  console.log('productID',productID)
  console.log('currentProduct',currentProduct)

  const handleCurrentProduct = async () => {
    try {
      await getCurrentProduct(productID);
    } catch (error) {
      console.log("handleCurrentProduct error", error);
    }
  };

  useEffect(() => {
    // getCurrentProduct(productID);
    console.log(handleCurrentProduct(),'handleCurrentProduct()')
    handleCurrentProduct();
    console.log('ClientReviewsList useEffect')

    console.log("getCurrentProduct(productID)", getCurrentProduct(productID));
  }, []);

  console.log("currentProduct", currentProduct);
  console.log("productID", productID);

  const reviews = currentProduct?.reviews||[];

  console.log("reviews", reviews);

  return (
      <View>
        <CustomText style={styles.text} weight="medium">
          {reviews.length} reviews
        </CustomText>
        {reviews && (
            <FlatList
                data={reviews}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <ReviewItem
                        username={item.username}
                        userImg={item.userPhoto}
                        rating={item.givenRating}
                        comment={item.review_text}
                        date={item.date}
                    />
                )}
                keyExtractor={(item) => item.review_text}
            />
        )}
      </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingVertical: GLOBAL_STYLES.PADDING,
  },

  text: {
    fontSize: 24,
  },
});