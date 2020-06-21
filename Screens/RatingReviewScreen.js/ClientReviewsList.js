import React from "react";
import { ScrollView, FlatList, View, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";
import { CustomText } from "../../components/CustomText";
import { reviews } from "../../DummyData/rating";
import { COLORS } from "../../style/colors";
import { GLOBAL_STYLES } from "../../style/globalStyles";

export const ClientReviewsList = () => {
  return (
    <View>
      <CustomText style={styles.text} weight="medium">
        {reviews.length} reviews
      </CustomText>

      <FlatList
        data={reviews}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <ReviewItem
            username={item.username}
            userImg={item.userImg}
            key={item.username}
            rating={item.rating}
            comment={item.comment}
            date={item.date}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingVertical: GLOBAL_STYLES.PADDING,
  },

  text: {
    fontSize: 24,
  },
});
