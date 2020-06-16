import React, {useState} from "react";
import {AppLoading} from "expo";
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from "./style/colors";

import {loadFonts} from "./style/fonts";
import { RatingReviews } from "./Screens/RatingReviews";



export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        return (
            <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)}/>
        );
    } {/*<Filters/>*/}
    return (

           <View style={styles.container}>
               {/* <IconContainer/> */}
               <RatingReviews/>
               
           </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
