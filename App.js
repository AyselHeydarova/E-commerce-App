import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { loadFonts } from "./style/fonts";
import { StyleSheet, Text, View, Image } from "react-native";
import { Provider, connect } from "react-redux";
import store, { persistor } from "./store";
import { RootNav } from "./navigation/RootNav";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNav />
      </PersistGate>
    </Provider>
  );
}
