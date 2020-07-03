import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import homeImage from "../assets/homeImage.png";
import {Btn} from "../components/Btn";
import {ProductCard} from "../components/ProductCard";
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import {getAllData, getAllProductData, getAllProductDataCat} from "../store/products";
import {connect} from "react-redux";

import banner from "../assets/Small_banner.png";
import {newProducts, onSale} from "../Utils/DataSelection";

const mapStateToProps = (state) => ({
    allProducts: getAllProductDataCat(state),
});
const Home = connect(mapStateToProps, {getAllData})(
    ({getAllData, allProducts, navigation}) => {
        const [showSale, setShowSale] = useState(false);
        // const [newwProducts, setNewwProducts] = useState([]);
        const newwProducts = Object.entries(allProducts);

        const handleNewProducts = async () => {
            try {
                const response = await getAllData();
                console.log(response)
                // setNewwProducts(allProducts);
            } catch (error) {
                console.log("getAllData", error);
            }
        }

        useEffect(() => {

            handleNewProducts();

        }, []);

        console.log('newProducts', newwProducts[0]);
        return (
            <ScrollView style={styles.container}>
                {showSale ? (
                    <>
                        <Image source={banner} style={{width: "100%", height: 196}}/>
                        <View style={styles.newItemsWrap}>
                            <CustomText style={styles.categoryTitle} weight="bold">
                                Sale
                            </CustomText>
                            <CustomText style={styles.description}>
                                Super Summer Sale
                            </CustomText>
                            <FlatList
                                horizontal
                                contentContainerStyle={{
                                    paddingTop: 15,
                                }}
                                data={onSale}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("SingleProduct", {product: item})
                                        }
                                    >
                                        <ProductCard
                                            product={item}
                                            isOnSale={true}
                                            isInCatalog={true}
                                            navigation={navigation}
                                        />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.productType}
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.imageWrapper}>
                        <Image source={homeImage} style={{width: "100%", height: 480}}/>
                        <CustomText style={styles.title} weight="bold">
                            Fashion sale
                        </CustomText>
                        <View style={styles.btn}>
                            <Btn
                                btnName="Check"
                                bgColor={COLORS.PRIMARY}
                                height={36}
                                width={160}
                                onPress={() => setShowSale(true)}
                            />
                        </View>
                    </View>
                )}

                <View style={styles.newItemsWrap}>
                    <CustomText style={styles.categoryTitle} weight="bold">
                        New
                    </CustomText>
                    <CustomText style={styles.description}>
                        You've never seen it before
                    </CustomText>
                    {
                        newwProducts.map((item) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("SingleProduct", {product: item[1]})
                                    }
                                >
                                    <ProductCard
                                        product={item[1]}
                                        isNew={true}
                                        isInCatalog={true}
                                        navigation={navigation}
                                    />
                                </TouchableOpacity>

                            )
                        )
                    }
                    {/*<FlatList*/}
                    {/*  horizontal*/}
                    {/*  contentContainerStyle={{*/}
                    {/*    paddingTop: 15,*/}
                    {/*  }}*/}
                    {/*  data={newwProducts}*/}
                    {/*  renderItem={({ item }) => (*/}
                    {/*    <TouchableOpacity*/}
                    {/*      onPress={() =>*/}
                    {/*        navigation.navigate("SingleProduct", { product: item })*/}
                    {/*      }*/}
                    {/*    >*/}
                    {/*      <ProductCard*/}
                    {/*        product={item}*/}
                    {/*        isNew={true}*/}
                    {/*        isInCatalog={true}*/}
                    {/*        navigation={navigation}*/}
                    {/*      />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*  )}*/}
                    {/*  keyExtractor={(item) => item.productType}*/}
                    {/*/>*/}
                </View>
            </ScrollView>
        );
    }
);

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        width: "100%",
    },
    title: {
        fontSize: 48,
        position: "absolute",
        bottom: 88,
        left: 15,
        width: 190,
        color: COLORS.TEXT,
    },
    btn: {
        position: "absolute",
        left: 15,
        bottom: 34,
    },
    newItemsWrap: {
        backgroundColor: COLORS.BACKGROUND,
        paddingLeft: 15,
        paddingTop: 20,
        flex: 1,
    },
    categoryTitle: {
        fontSize: 34,
        color: COLORS.TEXT,
    },
    description: {
        color: COLORS.GRAY,
        fontSize: 11,
        marginBottom: 10,
    },
});
