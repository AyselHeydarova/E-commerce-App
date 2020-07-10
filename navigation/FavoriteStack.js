import React from 'react';

import {createStackNavigator} from "@react-navigation/stack";
import {SingleProductScreen} from "../Screens/SingleProductScreen";

import {Favorites} from "../Screens/Favorites";

const {Navigator, Screen} = createStackNavigator();
export const FavoriteStack = () => {
    return (
        <Navigator>
            <Screen
                options={{headerShown: false}}
                name="Favorites"
                component={Favorites}/>
            <Screen
                options={{headerShown: false}}
                name="SingleProductScreen"
                component={SingleProductScreen}/>


        </Navigator>
    );
};
