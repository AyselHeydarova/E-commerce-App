import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import { StyleSheet, Text, View, Image } from "react-native";
import MyTabBar from "../components/TabBar";
import { MyBag } from "../Screens/MyBag";
import { ProfileStack, ShopStack } from "./index";
import { HomeStack } from "./HomeStack";
import {COLORS} from "../style/colors";
import {FavoriteStack} from "./FavoriteStack";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName={Home}
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{
          labelPosition: "below-icon",
          style: { ...styles.tabBar },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="Bag" component={MyBag} />
        <Tab.Screen name="Favorites" component={FavoriteStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
      backgroundColor:COLORS.BACKGROUND,
  },
});

export default MyTabs;
