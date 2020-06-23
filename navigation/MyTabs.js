import React from'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthForm } from '../Screens/AuthForm';
import Home from '../Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import MyTabBar from '../components/TabBar';
import {MyBag} from "../Screens/MyBag";
import {Favorites} from "../Screens/Favorites";

import {ProfileStack,ShopStack} from "./index";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
      <View style={styles.container}>
          <NavigationContainer>
              <Tab.Navigator  initialRouteName={Home} tabBar={props => <MyTabBar {...props}/>} tabBarOptions={{labelPosition:'below-icon', style:{...styles.tabBar}}}>
                  <Tab.Screen name="Home" component={Home}/>
                  <Tab.Screen name="Shop" component={ShopStack} />
                  <Tab.Screen name="Bag" component={MyBag} />
                  <Tab.Screen name="Favorites" component={Favorites} />
                  <Tab.Screen name="Profile" component={ProfileStack} />
              </Tab.Navigator>
          </NavigationContainer>
      </View>


  );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
    }
});

export default MyTabs