import React from 'react';
import {CategoriesOf} from "../Screens/CategoriesOf";

import {createStackNavigator} from "@react-navigation/stack";
import {Categories} from "../Screens/Categories";
import {ProfileScreen} from "../Screens/ProfileScreens/ProfileScreen";
import {OrderDetails} from "../Screens/ProfileScreens/OrderDetails";
import {PasswordChange} from "../Screens/ProfileScreens/PasswordChange";
import {MyOrders} from "../Screens/ProfileScreens/MyOrders";
import {Settings} from "../Screens/ProfileScreens/Settings";
import {AddingShippingAddress} from "../Screens/AddingShippingAddress";
import {ShippingAddressesScreen} from "../Screens/ShippingAddressesScreen";

const {Navigator, Screen} = createStackNavigator();
export const ProfileStack = () => {
    return (
        <Navigator>
            <Screen
                options={{headerShown: false}}
                name="Profile"
                component={ProfileScreen}/>
            <Screen
                options={{headerShown: false}}
                name="OrderDetails"
                component={OrderDetails}/>
            <Screen
                options={{headerShown: false}}
                name="PasswordChange"
                component={PasswordChange}/>
            <Screen
                options={{headerShown: false}}
                name="Settings"
                component={Settings}/>
            <Screen
                options={{headerShown: false}}
                name="MyOrders"
                component={MyOrders}/>
            <Screen
                options={{headerShown: false}}
                name="AddingShippingAddress"
                component={AddingShippingAddress}/>
            <Screen
                options={{headerShown: false}}
                name="ShippingAddressesScreen"
                component={ShippingAddressesScreen}/>

        </Navigator>
    );
};
