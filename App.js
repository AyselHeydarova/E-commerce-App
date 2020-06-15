import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from 'react-native';
import {COLORS} from "./style/colors";

import { loadFonts } from "./style/fonts";
import {Input} from "./components/Input";
import {Btn} from "./components/Btn";
import {Category} from "./components/Category";
import {IconFacebook} from "./components/IconFacebook";
import {SocialBtn} from "./components/SocialBtn";
import {SizeContainer} from "./components/SizeContainer";
import { ProductCard } from "./components/ProductCard";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
        <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }
  return (
    <View style={styles.container}>
     {/* <Input name={'Name'}/>
     <Btn btnName={'Check'} width={140} height={40} bgColor={COLORS.background} borderWidth={2} borderColor={'white'}/>
     <Category categoryName={'New'}/>
     <SocialBtn/>
     <SizeContainer width={100} name={'XL'}/> */}

     <ProductCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
