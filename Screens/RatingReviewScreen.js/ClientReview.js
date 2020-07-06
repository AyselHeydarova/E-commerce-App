import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import StarRating from "react-native-star-rating";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { ActionModal } from "../../components/ActionModal";
import { Btn } from "../../components/Btn";
import { selectAuthUserID } from "../../store/auth";
import { connect } from "react-redux";
import { sendReview } from "../../store/products";

const mapStateToProps = (state) => ({
  currentUserID: selectAuthUserID(state),
});

export const ClientReview = connect(mapStateToProps, { sendReview })(
  ({ currentUserID, productID, sendReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    console.log("client review product ID", productID);

    const fields = {
      authorID: currentUserID,
      review_text: comment,
      givenRating: rating,
      productID: productID,
    };

    return (
      <View style={styles.container}>
        <View style={styles.shortLine} />

        <CustomText style={styles.heading} weight="bold">
          What is your rate?
        </CustomText>

        <StarRating
          starStyle={{ margin: 3 }}
          starSize={36}
          fullStarColor={COLORS.STAR}
          rating={rating}
          selectedStar={(rating) => setRating(rating)}
          containerStyle={{ width: 276, alignSelf: "center" }}
        />

        <CustomText
          style={{ ...styles.heading, paddingHorizontal: 30 }}
          weight="bold"
        >
          Please share your opinion about the product
        </CustomText>

        <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoid}>
          <TextInput
            style={styles.comment}
            placeholder="Your review"
            onChangeText={(v) => setComment(v)}
          />
        </KeyboardAvoidingView>

        <Btn
          btnName="SEND REVIEW"
          bgColor={COLORS.PRIMARY}
          width="100%"
          height={48}
          onPress={() => sendReview(fields)}
        />

        {/* <ActionModal btnName="send review" /> */}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: "85%",
    width: "100%",
    borderTopStartRadius: 34,
    borderTopEndRadius: 34,
    backgroundColor: COLORS.DARK,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    padding: GLOBAL_STYLES.PADDING,
  },

  keyboardAvoid: {
    flex: 1,
  },

  shortLine: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.TEXT,
    alignSelf: "center",
  },

  heading: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 15,
  },

  comment: {
    width: "100%",
    height: 130,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 4,
    padding: 20,
    marginBottom: 30,
  },
});
