import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "./CustomText";


export const SizeContainer = ({width, name}) => {
    const [isClicked, setIsClicked] = useState(false);
    const handleSize = () => {
        setIsClicked(!isClicked);

    }
    return (
        <TouchableOpacity style={[styles.container, {width: width,
            backgroundColor: isClicked ? COLORS.primary : null,
            borderWidth: isClicked ? 0 : 0.4}
        ]}
                          onPress={() => handleSize()}>
            <CustomText
                style={[{...styles.containerText}, {color: isClicked ? COLORS.background : "white"}]}>{name}</CustomText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: '#ABB4BD'
    },
    containerText: {
        fontSize: 16,
        lineHeight: 20,
    }

});
