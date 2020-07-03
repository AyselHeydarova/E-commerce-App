import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, ScrollView} from "react-native";
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import {Btn} from "../components/Btn";
import {Filter} from "../Icons/Filter";
import {PriceArrows} from "../Icons/PriceArrows";
import {ListViewChanger} from "../Icons/ListViewChanger";
import {ProductCard} from "../components/ProductCard";
import {CardView} from "../Icons/CardView";
import {Back} from "../Icons/Back";
import {checkMen} from "./CategoriesOf";
import store from "../store";
import {withoutCategories} from "../Utils/DataSelection";
import {BottomModal} from "../components/bottomModal";
import {getAllData, getAllProductData} from "../store/products";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    allProducts: getAllProductData(state),
});
export const Catalog = connect(mapStateToProps, {getAllData})(
    ({getAllData, allProducts, route, navigation}) => {
    const {name, isWomanClicked, categoryName, isOnSale} = route.params;
    const products = allProducts.categories;
    const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState({
        Popular: true,
        Newest: false,
        Customer_review: false,
        lowestToHigh: false,
        highestToLow: false,
    });
        const sortOptions = [
            {
                sortingName: "Popular",
                sortOptionBool: "Popular",
            },
            {
                sortingName: "Newest",
                sortOptionBool: "Newest",
            },
            {
                sortingName: "Customer review",
                sortOptionBool: "Customer_review",
            },
            {
                sortingName: "Price: lowest to high",
                sortOptionBool: "lowestToHigh",
            },
            {
                sortingName: "Price: highest to low",
                sortOptionBool: "highestToLow",
            },

        ];
        const gender = isWomanClicked ?  "women" : "men";
        const productsSortedByGender = products.filter((product)=>product.tags.includes(gender));
        const [isSortingType, setIsSortingType] = useState("Popular");
        const handleSorting = (name, sortOptionBool) => {
        setIsSortingType(name);
        setSortOption({...false, [sortOptionBool]: !sortOption[`${sortOptionBool}`]})
    };




    const newProducts = productsSortedByGender.filter(
        (product) => product.tags.includes("new") || product.tags.includes("isNew")
    );
        console.log(newProducts);
    // const onSale = products.filter(
    //     (product) => product.onSale.isOnSale === true
    // );

     const finalProducts =  categoryName === "New" ? newProducts : productsSortedByGender;


    const [isListView, setIsListView] = useState(true);
    const handleProductCard = (item) => {
        navigation.navigate("SingleProductScreen", {
            product: item,
            products: finalProducts
        })
    };
    return (
        <View style={styles.container}>
            <StatusBar/>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <Back/>
            </TouchableOpacity>
            <CustomText weight={'bold'} style={styles.title}>
                {isOnSale ? "Sale" : name}
            </CustomText>
            <View style={styles.filters}>
                <TouchableOpacity style={styles.filter}
                                  onPress={() => navigation.navigate("Filters", {
                                      finalProducts: finalProducts
                                  })}>
                    <Filter width={20} height={20}/>
                    <CustomText>
                        Filters
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter} onPress={() => setIsBottomModalOpen(!isBottomModalOpen)}>
                    <PriceArrows width={20} height={20}/>
                    <CustomText>
                        {isSortingType}
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter} onPress={() => setIsListView(!isListView)}>
                    {isListView ?
                        <ListViewChanger width={20} height={20}/>
                        :
                        <CardView width={20} height={20}/>
                    }
                </TouchableOpacity>
            </View>
            {isListView ?
                <FlatList
                    data={finalProducts}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={
                                () =>
                                handleProductCard(item)
                            }
                            activeOpacity={0.9}
                            style={styles.card}>
                            <ProductCard product={item} isInCatalog={true}/>

                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.name}
                />
                :
                <View style={styles.cardContainer}>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {finalProducts.map((item) => (
                            <TouchableOpacity
                                onPress={() => handleProductCard(item)}
                                activeOpacity={0.9}
                                style={{marginLeft: 1, marginBottom: 15}}
                                key={`${item.name}-${Date.now()}`}>

                                <ProductCard isInCatalog={true} product={item} isRowView={isListView}/>

                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            }

            {
                isBottomModalOpen ?
                    <BottomModal name={"SortBy"} height={350}>
                        <View style={styles.sortBy}>
                            <FlatList
                                data={sortOptions}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        style={[styles.sortingContainer, {backgroundColor: sortOption[`${item.sortOptionBool}`] ? COLORS.PRIMARY : null}]}
                                        onPress={() => handleSorting(item.sortingName, item.sortOptionBool)}>
                                        <CustomText weight={"medium"} style={styles.sortingName}>
                                            {item.sortingName}
                                        </CustomText>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.sortingName}
                            />
                        </View>


                    </BottomModal>

                    :
                    null
            }
        </View>
    );
});

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,

    },
    title: {
        color: COLORS.TEXT,
        fontSize: 34,
        lineHeight: 34,
        margin: 20,

    },
    btn: {
        margin: 10
    },
    filters: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    filter: {
        flexDirection: "row",
        justifyContent: "space-around"

    },
    btns: {
        height: 70,
        width: "100%",

    },
    card: {
        marginLeft: 30,
        marginBottom: 20
    },
    cardContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
    },
    backIcon: {
        marginTop: 10,
        marginLeft: 20,
    },
    sortBy: {
        width: "100%",
    },
    sortingName: {
        fontSize: 18,
        lineHeight: 18,
    },
    sortingContainer: {
        width: "100%",
        padding: 18,
        alignItems: "flex-start",

    }
});