import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";
import {AcceptIcon} from "../Icons/AcceptIcon";

export const BrandContainer = ({brandName}) => {
    const [isIconClicked, setIsIconClicked] = useState(false);
    return (
        <View style={styles.container}>
            <CustomText style={styles.brandName}>{brandName}</CustomText>
            <TouchableOpacity style={[styles.iconContainer, {
                borderWidth: isIconClicked ? 0 : 2,
                backgroundColor: isIconClicked ? COLORS.PRIMARY : null
            }]}
                              onPress={() => setIsIconClicked(!isIconClicked)}>
                {isIconClicked ?
                    <View style={styles.acceptIcon}><AcceptIcon width={25} height={23}/></View>
                    : null}
            </TouchableOpacity>
        </View>
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
    brandName: {
        color: COLORS.TEXT,
        fontSize: 16,
        lineHeight: 20,
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
        left: 1
    }

});
