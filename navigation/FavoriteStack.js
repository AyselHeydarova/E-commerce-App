import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { SingleProductScreen } from "../Screens/SingleProductScreen";

import { Favorites } from "../Screens/Favorites";
import {COLORS} from "../style/colors";

const { Navigator, Screen } = createStackNavigator();
export const FavoriteStack = () => {
    return (
        <Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.BACKGROUND,
                    elevation: 0,
                },
                headerTintColor: COLORS.TEXT,
                headerTitleStyle: {
                    textAlign: "center",
                },
            }}
        >
            <Screen
                options={{ headerShown: false }}
                name="Favorites"
                component={Favorites}
            />
            <Screen
                options={({ route, navigation }) => ({
                    title: route.params.product.name.toLowerCase(),
                    headerLeft: () => <Back onPress={() => navigation.goBack()} />,
                })}
                name="SingleProductScreen"
                component={SingleProductScreen}
            />
        </Navigator>
    );
};
