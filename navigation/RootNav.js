import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import MyTabs from "./MyTabs";
import { selectAuthStatus } from "../store/auth";
import { AuthStack } from "./AuthStack";

const mapStateToProps = (state) => ({
  auth: selectAuthStatus(state),
});

export const RootNav = connect(mapStateToProps)(({ auth }) => (
  <NavigationContainer>{auth ? <MyTabs /> : <AuthStack />}</NavigationContainer>
));
