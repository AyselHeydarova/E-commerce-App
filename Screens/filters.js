import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, View, FlatList, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import Slider from "../components/Slider";
import {ColorContainer} from "../components/ColorContainer";
import {SizeContainer} from "../components/SizeContainer";
import {Forward} from "../Icons/Forward";
import {Btn} from "../components/Btn";
import {Buttons} from "../components/Buttons";
import {color} from "react-native-reanimated";


export const Filters = ({navigation}) => {

    const [categories, setCategories] = useState([
            {
                size: "All",
                state: false
            },
            {
                size: "Women",
                state: false
            },
            {
                size: "Men",
                state: false
            },
        ]
    );
    const [colors, setColors] = useState([
            {
                color: "black",
                state: false
            },
            {
                color: "white",
                state: false
            },
            {
                color: "silver",
                state: false
            },
            {
                color: "gold",
                state: false
            },
            {
                color: "red",
                state: false
            },
            {
                color: "tan",
                state: false
            },
            {
                color: "pink",
                state: false
            },
            {
                color: "khaki",
                state: false
            },
            {
                color: "grey",
                state: false
            },
            {
                color: "green",
                state: false
            },
            {
                color: "yellow",
                state: false
            },
            {
                color: "blue",
                state: false
            },
            {
                color: "orange",
                state: false
            },

        ]
    );

    const [sizes, setSizes] = useState(
        [
            {
                size: "XS",
                state: false
            },
            {
                size: "S",
                state: false
            },
            {
                size: "M",
                state: false
            },
            {
                size: "L",
                state: false
            },
            {
                size: "XL",
                state: false
            },

        ]
    );
    const handleSize = (size,state,index) => {
        let updatedSizes = [...sizes];
        updatedSizes[index]=  {
            size:size,
            state: !state ,
        };
        setSizes(updatedSizes);
        console.log('color', size)
        console.log('updatedColors', updatedSizes)
        console.log('state', state)
    };
    const handleColor = (color,state,index) => {
        let updatedColors = [...colors];
        updatedColors[index]=  {
            color:color,
            state: !state ,
        };
        setColors(updatedColors);


    };

    return (
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Price Range </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    {/*<Slider/>*/}
                </View>
            </View>

            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Colors </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <FlatList
                        horizontal={true}
                        data={colors}
                        renderItem={({item, index}) => (
                            <ColorContainer
                                onPress={
                                    () => {
                                        handleColor(item.color,item.state,index),
                                            console.log(index)
                                    }}
                                bgColor={item.color}
                                borderColor={item.state ? COLORS.PRIMARY : null}
                            />
                        )}
                        keyExtractor={item => item.color}
                    />

                </View>
            </View>
            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Sizes </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <FlatList
                        horizontal={true}
                        data={sizes}
                        renderItem={({item,index}) => (
                            <SizeContainer
                                onPress={() => handleSize(item.size,item.state,index)
                                }
                                bgColor={item.state ? COLORS.PRIMARY : null}
                                borderWidth={item.state ? 0 : 0.4}
                                name={item.size}
                                width={40}/>
                        )}
                        keyExtractor={item => item.size}
                    />

                </View>
            </View>

            {/*<View style={styles.bodyPart}>*/}
            {/*    <View style={styles.titleContainer}>*/}
            {/*        <CustomText weight={'medium'} style={styles.title}>Categories </CustomText>*/}
            {/*    </View>*/}
            {/*    <View style={styles.sliderContainer}>*/}
            {/*        <FlatList*/}
            {/*            horizontal={true}*/}
            {/*            data={categories}*/}
            {/*            renderItem={({item, index}) => (*/}
            {/*                <SizeContainer*/}
            {/*                    onPress={() => handleSize(item.size,item.state,index)*/}
            {/*                    }*/}
            {/*                    bgColor={item.state ? COLORS.PRIMARY : null}*/}
            {/*                    borderWidth={item.state ? 0 : 0.4}*/}
            {/*                    name={item.size}*/}
            {/*                    width={100}/>*/}
            {/*            )}*/}
            {/*            keyExtractor={item => item}*/}
            {/*        />*/}

            {/*    </View>*/}
            {/*</View>*/}
            <TouchableOpacity activeOpacity={0.9} style={[styles.bodyPart, {height: 80}]}
                              onPress={() => navigation.navigate("BrandsScreen")}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Brand </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <CustomText style={styles.brands}>adidas Originals, Jack & Jones, s.Oliver</CustomText>

                    <TouchableOpacity style={styles.rightIcon} onPress={() => navigation.navigate("BrandsScreen")}>
                        <Forward height={15} width={20}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <Buttons/>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    titleContainer: {
        width: '100%',
        height: 20,
        padding: 20
    },
    bodyPart: {
        width: '100%',
        height: 120,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        alignItems: "center"
    },
    title: {
        color: COLORS.TEXT,
        fontSize: 16,
        lineHeight: 20,

    },
    sliderContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: 'space-around',
        flexWrap: "wrap",


    },
    brands: {
        color: COLORS.GRAY,
        fontSize: 11,
        lineHeight: 11,
        position: 'absolute',
        left: -160,
        top: -10,
    },
    rightIcon: {
        position: 'absolute',
        right: -160,
        top: -26,
    },

});
