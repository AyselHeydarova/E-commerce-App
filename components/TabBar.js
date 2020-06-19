import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './Icon';



function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
    console.log('state:',state);
    console.log('descriptors:',descriptors);
    console.log('navigation:',navigation);
    

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:15}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const {name}=route;
        console.log('name: ',name)
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const icon=options.tabBarIcon;
        console.log('icon: ',icon);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
            <View style={styles.navBarItem}>
                <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={{ flex: 1, height:50 }}
            >
                <View style={styles.iconAndNameWrap}>
                    <Icon name={name} color={isFocused? '#EF3651':'#ABB4BD'} width={20} height={20}/>
                    <Text style={{ color: isFocused ? '#EF3651' : '#ABB4BD' }}>
                    {label}
                    </Text>
                </View>
            </TouchableOpacity>
            </View>
          
        );
      })}
    </View>
  );
}

export default MyTabBar

const styles=StyleSheet.create({
    navBarItem:{
        height:50
    },
    iconAndNameWrap:{
        alignItems:'center',
        paddingVertical:10
    }
})