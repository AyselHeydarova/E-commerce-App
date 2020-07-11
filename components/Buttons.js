import React from "react";
import { COLORS } from "../style/colors";
import { View, StyleSheet } from "react-native";
import { Btn } from "./Btn";
import { GLOBAL_STYLES } from "../style/globalStyles";

export const Buttons = ({ onPressDiscard,onPressApply }) => {
    return (
        <View style={styles.btnBox}>
            <Btn
                btnName={"Discard"}
                borderWidth={1}
                borderColor={COLORS.GRAY}
                height={40}
                width={160}
                onPress={onPressDiscard}


            />
            <Btn
                btnName={"Apply"}
                bgColor={COLORS.PRIMARY}
                height={40}
                width={160}
                onPress={onPressApply}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    btnBox: {
        height: 90,
        width: "100%",
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        backgroundColor: COLORS.BACKGROUND,
        alignSelf: "center",
    },
});
