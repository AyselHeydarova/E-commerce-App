import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import StarRating from "react-native-star-rating";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { Btn } from "../../components/Btn";

export const ClientReview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.shortLine} />

      <CustomText style={styles.heading} weight="bold">
        What is your rate?
      </CustomText>

      <StarRating
        starStyle={{ margin: 3 }}
        starSize={36}
        containerStyle={{ width: 276, alignSelf: "center" }}
      />

      <CustomText
        style={{ ...styles.heading, paddingHorizontal: 30 }}
        weight="bold"
      >
        Please share your opinion about the product
      </CustomText>

      <View style={styles.commentWrapper}>
        <CustomText>Your review</CustomText>
      </View>

      <Btn
        btnName="Send Review"
        bgColor={COLORS.PRIMARY}
        height={48}
        titleStyle={{ textTransform: "uppercase" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 640,
    width: "100%",
    borderTopStartRadius: 34,
    borderTopEndRadius: 34,
    backgroundColor: COLORS.DARK,
    zIndex: 2,
    padding: GLOBAL_STYLES.PADDING,
  },

  heading: {
    fontSize: 18,
    textAlign: "center",
  },

  commentWrapper: {
    width: "100%",
    height: 150,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 4,
  },
});
