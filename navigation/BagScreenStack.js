import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {MyBag} from "../Screens/MyBag";
import {Checkout} from "../Screens/PaymentScreens/Checkout";
import {Back} from "../Icons/Back";
import {COLORS} from "../style/colors";

const {Navigator, Screen} = createStackNavigator();
export const BagScreenStack = () => {
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
                    marginRight:50
                },
            }}>
            <Screen
                options={{headerShown: false}}
                name="Bag"
                component={MyBag}/>
            <Screen
                options={({navigation}) => ({
                    title: "Checkout",
                    headerLeft: () => <Back onPress={() => navigation.goBack()}/>,
                })}
                name="Checkout"
                component={Checkout}
            />


        </Navigator>
    );
};