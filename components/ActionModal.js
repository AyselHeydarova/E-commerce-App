import React from "react";
import { COLORS } from "../style/colors";
import { View, StyleSheet } from "react-native";
import { Btn } from "./Btn";
import { GLOBAL_STYLES } from "../style/globalStyles";

export const ActionModal = ({ btnName }) => {
  return (
    <View style={styles.btnBox}>
      <Btn
        btnName={btnName}
        bgColor={COLORS.PRIMARY}
        height={48}
        width={"100%"}
        titleStyle={{ textTransform: "uppercase" }}
      />
      {/*<View style={styles.line} />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  btnBox: {
    height: 90,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.BACKGROUND,
    alignSelf: "center",
  },

  line: {
    height: 5,
    width: 135,
    backgroundColor: COLORS.TEXT,
    borderRadius: 100,
    marginVertical: 18,
  },
});
