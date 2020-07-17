import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../Screens/ProfileScreens/ProfileScreen";
import { OrderDetails } from "../Screens/ProfileScreens/OrderDetails";
import { PasswordChange } from "../Screens/ProfileScreens/PasswordChange";
import { MyOrders } from "../Screens/ProfileScreens/MyOrders";
import { PaymentScreen } from "../Screens/PaymentScreen";
import { Settings } from "../Screens/ProfileScreens/Settings";
import { AddingShippingAddress } from "../Screens/AddingShippingAddress";
import { ShippingAddressesScreen } from "../Screens/ShippingAddressesScreen";
import { Back } from "../Icons/Back";
import { COLORS } from "../style/colors";
import { PaymentMethods } from "../Screens/PaymentScreens/PaymentMethods";
import { AddPayCardScreen } from "../Screens/PaymentScreens/AddPayCardScreen";

const { Navigator, Screen } = createStackNavigator();
export const ProfileStack = () => {
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
      <Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
      <Screen
        options={({ navigation }) => ({
          title: "Order Details",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="OrderDetails"
        component={OrderDetails}
      />
      <Screen
        options={{ headerShown: false }}
        name="Payment"
        component={PaymentScreen}
      />
      <Screen
        options={{ headerShown: false }}
        name="PasswordChange"
        component={PasswordChange}
      />
      <Screen
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="Settings"
        component={Settings}
      />
      <Screen
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="MyOrders"
        component={MyOrders}
      />
      <Screen
        options={({ navigation }) => ({
          title: "Adding Shipping Address",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="AddingShippingAddress"
        component={AddingShippingAddress}
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
