import React, {useState,useEffect} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image} from "react-native";
import {CustomText} from "../components/CustomText";
import {Back} from "../Icons/Back";
import {COLORS} from "../style/colors";
import {GLOBAL_STYLES} from "../style/globalStyles";
import {SaleSlogan} from "../components/SaleSlogan";
import {Category} from "../components/Category";
import {allProducts} from "../Utils/DataSelection";
import {getAllData, getAllProductData} from "../store/products";
import {connect} from "react-redux";
const mapStateToProps = (state) => ({
    allProducts: getAllProductData(state),
});

export const Categories = connect(mapStateToProps, {getAllData})(
    ({getAllData, allProducts, route, navigation}) => {
    const categoriesWoman = [
        {
            categoryName: "New",
            imageSrc: "https://images.unsplash.com/photo-1525845859779-54d477ff291f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        {
            categoryName: "Clothes",
            imageSrc: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
        },
        {
            categoryName: "Shoes",
            imageSrc: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
            categoryName: "Bags",
            imageSrc: "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },

    ];
    const categoriesMan = [
        {
            categoryName: "New",
            imageSrc: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
            categoryName: "Clothes",
            imageSrc: "https://images.unsplash.com/photo-1535730142260-496e3db19f6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
        },
        {
            categoryName: "Shoes",
            imageSrc: "https://images.unsplash.com/photo-1519417961783-6634b8bb3775?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        {
            categoryName: "Bags",
            imageSrc: "https://images.unsplash.com/photo-1535120927584-0230f40fc1e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
        },

    ];

    const [isWomanClicked, setIsWomanClicked] = useState(true);
    const handleCategory = () => {
        setIsWomanClicked(!isWomanClicked)
    };
    const handleSaleSlogan = () => {
        navigation.navigate('CategoriesOf', {
            isOnSale: true,
            isWomanClicked:isWomanClicked
        });
    };
        console.log(allProducts)
    return (
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Back/>
                </TouchableOpacity>
                <CustomText weight={'bold'} style={styles.title}>
                    Categories
                </CustomText>
            </View>
            <View style={styles.btns}>
                <TouchableOpacity style={[styles.btn, {borderBottomWidth: isWomanClicked ? 4 : 0}]}
                                  onPress={() => handleCategory()}>
                    <CustomText style={{color: isWomanClicked ? COLORS.TEXT : COLORS.GRAY, fontSize: 20,}}>
                        Women
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {borderBottomWidth: !isWomanClicked ? 4 : 0}]}
                                  onPress={() => handleCategory()}>
                    <CustomText style={{color: !isWomanClicked ? COLORS.TEXT : COLORS.GRAY, fontSize: 20,}}>
                        Men
                    </CustomText>
                </TouchableOpacity>

            </View>
            <SaleSlogan discount={50} onPress={() =>handleSaleSlogan() }/>
            <FlatList
                data={isWomanClicked ? categoriesWoman : categoriesMan}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Category categoryName={item.categoryName}
                                  imageSrc={item.imageSrc}
                                  onPress={() => navigation.navigate('CategoriesOf', {
                                      isWomanClicked: isWomanClicked,
                                      categoryName: item.categoryName,


                                  })}
                        />
                    </View>

                )}
                keyExtractor={item => item.categoryName}
            />


        </View>
    );
});

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: 360,
        backgroundColor: COLORS.BACKGROUND,
        paddingTop: 10,
        alignItems: 'center',


    },
    header: {
        flexDirection: "row",
        // justifyContent: "space-between",
        marginBottom: 20,

    },
    title: {
        color: COLORS.TEXT,
        fontSize: 30,
        lineHeight: 28,
        margin: 10,
        marginLeft: 55,
        marginRight: 75,

    },
    backIcon: {
        marginTop: 10,
    },
    card: {
        marginTop: 20,
        marginBottom: 10,
    },
    cards: {
        width: '100%',
        display: "flex",
        alignItems: "center",

    },
    btns: {
        flexDirection: "row",
        marginBottom: GLOBAL_STYLES.MARGIN_LEFT
    },
    btn: {
        width: 180,
        height: 35,
        alignItems: "center",
        borderColor: COLORS.PRIMARY


    }


});