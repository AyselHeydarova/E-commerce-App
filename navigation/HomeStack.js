import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import { SingleProductScreen } from "../Screens/SingleProductScreen";
import { COLORS } from "../style/colors";
import { RatingReviewScreen } from "../Screens/RatingReviewScreen.js";
import { Back } from "../Icons/Back";

const { Navigator, Screen } = createStackNavigator();
export const HomeStack = () => {
  return (
    <Navigator>
      <Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Screen
        name="SingleProduct"
        component={SingleProductScreen}
        options={({ route }) => ({
          title: route.params.product.name.toLowerCase(),
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerTitleStyle: {
            textAlign: "center",
          },
        })}
      />
      <Screen
        name="Rating"
        component={RatingReviewScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
      />
    </Navigator>
  );
};
