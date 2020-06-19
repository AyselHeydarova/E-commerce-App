import React from'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthForm } from './screens/AuthForm';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import MyTabBar from '../components/TabBar';



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
      <View style={styles.container}>
        <NavigationContainer>
            <Tab.Navigator  initialRouteName={Home} tabBar={props => <MyTabBar {...props}/>} tabBarOptions={{labelPosition:'below-icon', style:{...styles.tabBar}}}>
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Shop" component={Home} />
                <Tab.Screen name="Bag" component={Home} />
                <Tab.Screen name="Favorites" component={Home} />
                <Tab.Screen name="Profile" component={Home} />
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
})

export default MyTabs