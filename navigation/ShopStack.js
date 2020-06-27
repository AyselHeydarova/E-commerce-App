import React from 'react';
import {CategoriesOf} from "../Screens/CategoriesOf";

import {createStackNavigator} from "@react-navigation/stack";
import {Categories} from "../Screens/Categories";
import {Catalog} from "../Screens/Catalog";
import {SingleProductScreen} from "../Screens/SingleProductScreen";

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
     <Screen
                options={{headerShown: false}}
                name="Catalog"
                component={Catalog}/>

                <Screen
                options={{headerShown: false}}
                name="SingleProductScreen"
                component={SingleProductScreen}/>

        </Navigator>
    );
};
