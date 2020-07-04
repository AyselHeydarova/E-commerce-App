import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { AuthForm } from "../Screens/AuthForm";
import { COLORS } from "../style/colors";
import { Back } from "../Icons/Back";

const { Navigator, Screen } = createStackNavigator();
export const AuthStack = () => {
  return (
    <Navigator>
      <Screen
        name="auth"
        component={AuthForm}
        options={() => ({
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
          headerLeft: () => <Back />,
          title: "",
        })}
      />
    </Navigator>
  );
};
