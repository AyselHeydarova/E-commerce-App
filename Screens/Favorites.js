import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { Btn } from "../components/Btn";
import { ProductCard } from "../components/ProductCard";
import { getCurrentUserData, selectUserData } from "../store/users";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../style/globalStyles";

const mapStateToProps = (state) => ({
    usersData: selectUserData(state),
});
export const Favorites = connect(mapStateToProps, { getCurrentUserData })(
    ({ getCurrentUserData, usersData, navigation }) => {
        const favorites = usersData.userFavorites || [];
        const clothes = [
            "T-Shirts",
            "Skirts",
            "Shoes",
            "Shorts",
            "Dresses",
            "Trousers",
        ];
        console.log('favorites',favorites)
        const [favoritesData, setFavData] = useState(favorites);

        let favoritesSortedByCategory = [];
        const handleFavs = async () => {
            try {
                await getCurrentUserData();
            } catch (error) {
                console.log("getNewData", error);
            }
        };

        useEffect(() => {
            handleFavs();
        }, []);
        const handleSortByCategory = (category) => {
            favoritesSortedByCategory = favorites.filter((fav) =>
                fav.tags.includes(category)
            );
            setFavData(favoritesSortedByCategory);
        };

        return (
            <View style={styles.container}>
                <StatusBar />

                <CustomText weight={"bold"} style={styles.title}>
                    Favorites
                </CustomText>
                <View style={styles.btns}>
                    <FlatList
                        horizontal={true}
                        data={clothes}
                        renderItem={({ item }) => (
                            <View style={styles.btn}>
                                <Btn
                                    width={100}
                                    height={30}
                                    bgColor={COLORS.TEXT}
                                    btnName={item}
                                    titleStyle={{ color: COLORS.BACKGROUND }}
                                    onPress={() => handleSortByCategory(item)}
                                />
                            </View>
                        )}
                    />
                </View>

                <FlatList
                    data={favoritesData}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            isInFavs={true}
                            isRowView={true}
                            isInCatalog={true}
                            onPress={() =>
                                navigation.navigate("SingleProductScreen", {
                                    product: item,
                                })
                            }
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        paddingHorizontal: GLOBAL_STYLES.PADDING,
    },
    title: {
        color: COLORS.TEXT,
        fontSize: 34,
        lineHeight: 34,
        margin: 20,
    },
    btn: {
        margin: 10,
    },
    filters: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    filter: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    btns: {
        height: 70,
        width: "100%",
    },
    card: {
        marginLeft: 30,
        marginBottom: 20,
    },
    cardContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        paddingLeft: 15,
    },
});
