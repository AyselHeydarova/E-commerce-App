import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyBag } from "../Screens/MyBag";
import { Checkout } from "../Screens/PaymentScreens/Checkout";
import { Back } from "../Icons/Back";
import { COLORS } from "../style/colors";
import { SuccessScreen } from "../Screens/SuccessScreen";
import { PaymentMethods } from "../Screens/PaymentScreens/PaymentMethods";
import { AddPayCardScreen } from "../Screens/PaymentScreens/AddPayCardScreen";
import { ShippingAddressesScreen } from "../Screens/ShippingAddressesScreen";

const { Navigator, Screen } = createStackNavigator();
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
          marginRight: 50,
        },
      }}
    >
      <Screen options={{ headerShown: false }} name="Bag" component={MyBag} />
      <Screen
        options={{ headerShown: false }}
        name="SuccessScreen"
        component={SuccessScreen}
      />
      <Screen
        options={({ navigation }) => ({
          title: "Checkout",
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="Checkout"
        component={Checkout}
      />

      <Screen
        options={({ navigation }) => ({
          title: "Shipping Addresses",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="ShippingAddressesScreen"
        component={ShippingAddressesScreen}
      />
      <Screen
        options={({ navigation }) => ({
          title: "Payment Methods",
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="PaymentMethods"
        component={PaymentMethods}
      />

      <Screen
        options={({ navigation }) => ({
          title: "Add New Card",
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="AddPayCardScreen"
        component={AddPayCardScreen}
      />
    </Navigator>
  );
};
