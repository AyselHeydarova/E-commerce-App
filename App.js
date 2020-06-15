import React, {useState} from "react";
import {AppLoading} from "expo";
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from "./style/colors";

import {loadFonts} from "./style/fonts";
import {Heart} from "./Icons/Heart";
import {Bag} from "./Icons/Bag";

export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        return (
            <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)}/>
        );
    }
    return (
            <View style={styles.container}>
                <Heart width={30} height={30}/>
                <Bag width={30} height={30}/>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
