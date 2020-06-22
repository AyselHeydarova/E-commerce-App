import React from 'react';
import {CategoriesOf} from "../Screens/CategoriesOf";

import {createStackNavigator} from "@react-navigation/stack";
import {Categories} from "../Screens/Categories";

const {Navigator, Screen} = createStackNavigator();
export const ShopStack = () => {
    return (
        <Navigator>
            <Screen
                options={{headerShown: false}}
                name="Shop"
                component={Categories}/>
            <Screen
                options={{headerShown: false}}
                name="CategoriesOf"
                component={CategoriesOf}/>

        </Navigator>
    );
};
