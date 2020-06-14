import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from 'react-native';
import {COLORS} from "./style/colors";

import { loadFonts } from "./style/fonts";
import {Input} from "./Commons/Input";
import {Btn} from "./Commons/Btn";
import {Category} from "./Commons/Category";
import {IconFacebook} from "./Commons/IconFacebook";
import {SocialBtn} from "./Commons/SocialBtn";
import {SizeContainer} from "./Commons/SizeContainer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
        <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }
  return (
    <View style={styles.container}>
     <Input name={'Name'}/>
     <Btn btnName={'Check'} width={140} height={40} bgColor={COLORS.background} borderWidth={2} borderColor={'white'}/>
     <Category categoryName={'New'}/>
     <SocialBtn/>
     <SizeContainer width={100} name={'XL'}/>
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
