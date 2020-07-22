import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { SizeContainer } from "./SizeContainer";

export const BottomModal = ({
  title,
  height,
  data,
  isClicked,
  isColor,
  handlePress,
  closeModal,
}) => {
  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={[styles.container, { height: height || 400, elevation: 5 }]}>
        <View style={styles.headerContainer}>
          <View style={styles.line} />
          <CustomText weight={"bold"} style={styles.title}>
            {title}
          </CustomText>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {data.map((name) => (
              <View>
                <SizeContainer
                  bgColor={
                    isColor
                      ? name
                      : isClicked[`${name}`]
                      ? COLORS.PRIMARY
                      : null
                  }
                  borderWidth={isColor ? 0 : isClicked[`${name}`] ? 0 : 0.4}
                  onPress={() => {
                    handlePress(name);
                    console.log(`${name} clicked`);
                  }}
                  name={name}
                  width={100}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bodyContainer: {
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 15,
  },
  line: {
    width: 70,
    height: 6,
    backgroundColor: COLORS.TEXT,
    marginBottom: 20,
    marginTop: 15,
    borderRadius: 10,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 10,
  },
});
