import React from "react";
import { CategoriesOf } from "../Screens/CategoriesOf";

import { createStackNavigator } from "@react-navigation/stack";
import { Categories } from "../Screens/Categories";
import { Catalog } from "../Screens/Catalog";
import { SingleProductScreen } from "../Screens/SingleProductScreen";
import { BrandsScreen } from "../Screens/BrandsScreen";
import { Filters } from "../Screens/filters";
import { COLORS } from "../style/colors";
import { Back } from "../Icons/Back";

const { Navigator, Screen } = createStackNavigator();
export const ShopStack = () => {
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
        options={({ navigation }) => ({
          title: "Categories",
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="Shop"
        component={Categories}
      />
      <Screen
        options={({ navigation }) => ({
          title: "Categories",

          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="CategoriesOf"
        component={CategoriesOf}
      />
      <Screen
        options={({ navigation }) => ({
          title: "",

          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="Catalog"
        component={Catalog}
      />

      <Screen
        options={({ route, navigation }) => ({
          title: route.params.product.name.toLowerCase(),
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="SingleProductScreen"
        component={SingleProductScreen}
      />
      <Screen
        options={({ navigation }) => ({
          title: "Brands",
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="BrandsScreen"
        component={BrandsScreen}
      />
      <Screen
        options={({ navigation }) => ({
          title: "Filters",
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="Filters"
        component={Filters}
      />
    </Navigator>
  );
};
