import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "./CustomText";
import { AcceptIcon } from "../Icons/AcceptIcon";

export const BrandContainer = ({ brandName, onPress }) => {
  const [isIconClicked, setIsIconClicked] = useState(false);
  const handleBrand = () => {
    setIsIconClicked(!isIconClicked);
    onPress();
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => handleBrand()}>
          <CustomText
            style={{
              color: isIconClicked ? COLORS.PRIMARY : COLORS.TEXT,
              fontSize: 16,
              lineHeight: 20,
            }}
          >
            {brandName}
          </CustomText>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            {
              borderWidth: isIconClicked ? 0 : 2,
              backgroundColor: isIconClicked ? COLORS.PRIMARY : null,
            },
          ]}
          onPress={() => handleBrand()}
        >
          {isIconClicked ? (
            <TouchableWithoutFeedback style={styles.acceptIcon}>
              <AcceptIcon width={25} height={23} />
            </TouchableWithoutFeedback>
          ) : null}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    width: 330,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderColor: COLORS.TEXT,
    position: "relative",
  },
  acceptIcon: {
    position: "absolute",
    top: 2,
    left: 1,
  },
});
