import React, {useState} from 'react';
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
import {withoutCategories} from "./Home";

export const Catalog = ({route,navigation}) => {
    const {name} = route.params;
    const {products} = route.params;
    const {isWomanClicked} = route.params;
    const {categoryName} = route.params;
    const {isOnSale} = route.params;
    console.log(isOnSale);
    const newProducts = withoutCategories.filter(
        (product) => product.isNew === true
    );
    const chosenProducts=
        // isOnSale?newProducts:
        isWomanClicked?products.women:products.men;
    console.log('chosenProducts',chosenProducts);
    console.log('products',products);
    const [isListView, setIsListView] = useState(true);
    return (
        <View style={styles.container}>
            <StatusBar/>
            <TouchableOpacity style={styles.backIcon} onPress={()=>navigation.goBack()}>
                <Back/>
            </TouchableOpacity>
            <CustomText weight={'bold'} style={styles.title}>
                {isOnSale?"Sale":name}
            </CustomText>
            <View style={styles.filters}>
                <TouchableOpacity style={styles.filter}>
                    <Filter width={20} height={20}/>
                    <CustomText>
                        Filters
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <PriceArrows width={20} height={20}/>
                    <CustomText>
                        Price: lowest to high
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
                    data={chosenProducts}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={()=>navigation.navigate("SingleProductScreen",{
                                product:item,
                                products:chosenProducts
                            })}
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
                        {chosenProducts.map((item) => (
                            <TouchableOpacity
                                onPress={()=>navigation.navigate("SingleProductScreen",{
                                    product:item,
                                    products:chosenProducts
                                })}
                                activeOpacity={0.9}
                                style={{marginLeft:1,marginBottom: 15}}
                                key={`${item.name}-${Date.now()}`}>
                                {isOnSale?item.onSale.isOnSale?
                                    <ProductCard isInCatalog={true} product={item} isRowView={isListView}/>:null
                                    :
                                    <ProductCard isInCatalog={true} product={item} isRowView={isListView}/>
                                }

                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            }


        </View>
    );
};

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
        display:"flex",
        justifyContent:"space-around",
    },
    backIcon: {
        marginTop: 10,
        marginLeft: 20,
    },
});