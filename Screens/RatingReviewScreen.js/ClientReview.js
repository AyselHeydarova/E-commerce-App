import React, { useState } from "react";
import {

  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import StarRating from "react-native-star-rating";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { ActionModal } from "../../components/ActionModal";
import { Btn } from "../../components/Btn";
import { connect } from "react-redux";
import { sendReview, increaseRating } from "../../store/products";
import { selectUserData } from "../../store/users";

const mapStateToProps = (state) => ({
    currentUser: selectUserData(state),
});

export const ClientReview = connect(mapStateToProps, { sendReview })(
    ({ currentUser, productID, sendReview }) => {
        const [rating, setRating] = useState(0);
        const [comment, setComment] = useState("");

        const increaseRatingFields = {
            productID: productID,
            givenRating: rating,
        };

        const fields = {
            username: currentUser.username,
            userPhoto: currentUser.userPhoto,
            review_text: comment,
            givenRating: rating,
            productID: productID,
        };

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                            multiline={true}
                            textAlignVertical="top"
                            placeholder="Your review"
                            onChangeText={(v) => setComment(v)}
                        />
                    </KeyboardAvoidingView>

                    <Btn
                        btnName="SEND REVIEW"
                        bgColor={COLORS.PRIMARY}
                        width="100%"
                        height={48}
                        onPress={() => {
                            sendReview(fields);
                            increaseRating(increaseRatingFields);
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
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
        color: COLORS.TEXT,
        backgroundColor: COLORS.BACKGROUND,
        borderRadius: 4,
        padding: 20,
        marginBottom: 30,
    },
});
