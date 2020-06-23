import React, {useState,useEffect} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image} from "react-native";
import {CustomText} from "../components/CustomText";
import {Back} from "../Icons/Back";
import {COLORS} from "../style/colors";
import {Btn} from "../components/Btn";
import {data} from "../DummyData/data";


export const CategoriesOf = ({navigation, route}) => {
    const {isWomanClicked} = route.params;
    const categoriesWoman = [
        // "T-Shirts", "Pants", "Skirts", "Dresses", "Shorts",
    ];
    const categoriesMan = [
        // "T-Shirts", "Pants", "Shorts",
    ];
    const allCategories = Object.keys(data.categories);
    console.log(Object.keys(data.categories)[1].men);
    console.log(data.categories["Dresses"]);
    const checkMen = () => {
        for( let category of allCategories){
            // console.log('category.men',category.men)
            // console.log('isWomanClicked.men',isWomanClicked)
        if (category.men !== undefined){
            // console.log('category',data.categories[`${category}`])
            // categoriesMan.push(category);
        }
            console.log('category',data.categories[`${category}`].men)

        }
        // console.log('categoriesMan',categoriesMan)
    };
    useEffect(()=>{
        checkMen();
    });

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
            <Btn
                height={50}
                width={335}
                bgColor={COLORS.PRIMARY}
                btnName={"VIEW ALL ITEMS"}
                titleStyle={{fontSize: 18}}
            />
            <CustomText weight={'bold'} style={styles.choose}>
                Choose Category
            </CustomText>
            <View style={{marginTop: 60}}>
                <FlatList
                    data={isWomanClicked ? allCategories : categoriesMan}
                    // data={allCategories}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.category}>
                            <CustomText style={styles.categoryText}>
                                {item}
                            </CustomText>
                        </TouchableOpacity>

                    )}
                    keyExtractor={item => item}
                />
            </View>


        </View>
    );
};

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
    choose: {
        color: COLORS.GRAY,
        fontSize: 20,
        position: "absolute",
        left: 16,
        top: 150,

    },
    backIcon: {
        marginTop: 10,
    },
    category: {
        width: 355,
        padding: 20,
        marginBottom: 10,
        borderBottomWidth: 0.3,
        borderColor: COLORS.GRAY
    },
    categoryText: {
        fontSize: 16,
        lineHeight: 16,

    },

});