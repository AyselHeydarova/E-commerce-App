import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, View, FlatList, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import Slider from "../components/Slider";
import {ColorContainer} from "../components/ColorContainer";
import {SizeContainer} from "../components/SizeContainer";
import {Forward} from "../Icons/Forward";
import {Buttons} from "../components/Buttons";


export const Filters = ({navigation, route}) => {
    const {finalProducts, startValue, endValue} = route.params;

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
    const [filteredProducts, setFilteredProducts] = useState([]);
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

    const handleSize = (size, state, index) => {
        let updatedSizes = [...sizes];
        updatedSizes[index] = {
            size: size,
            state: !state,
        };
        setSizes(updatedSizes);
        let products = filteredProducts.length===0 ? finalProducts  : filteredProducts;

        console.log('products', products)
        console.log('filteredProducts', filteredProducts===true)
        console.log('finalProducts', finalProducts)
        const filteredProductsBySize = products.filter((product) => {
            const s = product.sizes.filter((item) => {
                console.log('color', item.size)
                return item.size === size

            });

            console.log('col', s)
            console.log(size)
            return product.sizes.includes(s[0]);
        });
        setFilteredProducts(filteredProductsBySize);
        console.log('filteredProductsBySize', filteredProductsBySize)
    };
    const handleColor = (color, state, index) => {
        let updatedColors = [...colors];
        updatedColors[index] = {
            color: color,
            state: !state,
        };
        setColors(updatedColors);

        const filteredProducts = finalProducts.filter((product) => {
            const col = product.colors.filter((item) => {
                console.log('color', item.color)
                return item.color === color

            });

            console.log('col', col)
            console.log(color)
            return product.colors.includes(col[0]);
        });
        setFilteredProducts(filteredProducts);


    };
    console.log('filteredProducts', filteredProducts);
    const handleFilter = () => {
        navigation.navigate("Catalog", {
            filteredProducts: filteredProducts.length===0?finalProducts:filteredProducts,
            isFiltered: true

        })
    };
    useEffect(() => {

    })
    return (
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.bodyPart}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Price Range </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <Slider/>
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
                                        handleColor(item.color, item.state, index)
                                    }}
                                bgColor={item.color}
                                borderColor={item.state ? COLORS.PRIMARY : COLORS.TEXT}
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
                        renderItem={({item, index}) => (
                            <SizeContainer
                                onPress={() => handleSize(item.size, item.state, index)
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
                              onPress={() => navigation.navigate("BrandsScreen",{
                                  finalProducts: filteredProducts.length===0?finalProducts:filteredProducts,
                              })}>
                <View style={styles.titleContainer}>
                    <CustomText weight={'medium'} style={styles.title}>Brand </CustomText>
                </View>
                <View style={styles.sliderContainer}>
                    <CustomText style={styles.brands}>adidas Originals, Jack & Jones, s.Oliver</CustomText>

                    <TouchableOpacity style={styles.rightIcon} onPress={() => navigation.navigate("BrandsScreen", {
                        finalProducts: filteredProducts.length===0?finalProducts:filteredProducts,
                    })}>
                        <Forward height={15} width={20}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <Buttons onPressApply={() => handleFilter()}/>
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
