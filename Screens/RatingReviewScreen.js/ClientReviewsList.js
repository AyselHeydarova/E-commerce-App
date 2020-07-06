import React from "react";
import { ScrollView, FlatList, View, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";
import { CustomText } from "../../components/CustomText";
import { COLORS } from "../../style/colors";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { connect } from "react-redux";
import { selectUsers } from "../../store/users";
import { selectProductReviews } from "../../store/products";

const mapStateToProps = (state, { productID }) => ({
  users: selectUsers(state),
  // reviews: selectProductReviews(state, productID),
});

export const ClientReviewsList = connect(
  mapStateToProps,
  null
)(({ reviews, users }) => {
  console.log("client users", users);

  const reviewUser = (ID) => users.filter((user) => user.id === ID);

  // console.log("reviewUser", reviewUser("z97Q0fySyDXVhLeQDfxyCgfbNWT2"));

  return (
    <View>
      <CustomText style={styles.text} weight="medium">
        {reviews.length} reviews
      </CustomText>
      {reviews && (
        <FlatList
          data={reviews || []}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <ReviewItem
              username={reviewUser(item.authorID)[0]?.username}
              userImg={item.userImg}
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
