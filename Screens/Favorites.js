import React, {useState,useEffect} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import {Btn} from "../components/Btn";
import {Filter} from "../Icons/Filter";
import {PriceArrows} from "../Icons/PriceArrows";
import {ListViewChanger} from "../Icons/ListViewChanger";
import {ProductCard} from "../components/ProductCard";
import {CardView} from "../Icons/CardView";
import {Back} from "../Icons/Back";
import {getCurrentUserData, selectUserData} from "../store/users";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    usersData: selectUserData(state),
});
export const Favorites = connect(mapStateToProps, {getCurrentUserData})(({getCurrentUserData, usersData, navigation}) => {
    const favorites = usersData.userFavorites || [];
    console.log(usersData, 'usersData')
    const clothes = ["T-Shirt", "Shirt", "Skirt", "Shoes", "Short",];
    const [isListView, setIsListView] = useState(true);

    const handleFavs = async () => {
        try {
            await getCurrentUserData();
        } catch (error) {
            console.log("getNewData", error);
        }
    };
    useEffect(()=>{
        handleFavs();
    },[])
    return (
        <View style={styles.container}>
            <StatusBar/>

            <CustomText weight={'bold'} style={styles.title}>
                Favorites
            </CustomText>
            <View style={styles.btns}>
                <FlatList
                    horizontal={true}
                    data={clothes}
                    renderItem={({item}) => (
                        <View style={styles.btn}>
                            <Btn
                                width={100}
                                height={30}
                                bgColor={COLORS.TEXT}
                                btnName={item}
                                titleStyle={{color: COLORS.BACKGROUND}}/>
                        </View>
                    )}
                    keyExtractor={item => item}
                />
            </View>
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
                    data={favorites}
                    renderItem={({item}) => (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("SingleProductScreen", {
                            product: item,
                        })
                        } style={styles.card}>
                            <ProductCard
                                product={item}
                                isInFavs={true}
                                isRowView={isListView}
                                isInCatalog={true}
                            />
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.id}
                />
                :
                <View style={styles.cardContainer}>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {favorites.map((name) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SingleProductScreen", {
                                    product: name,
                                })}
                                style={{marginLeft: 1, marginBottom: 15}}
                                key={`${name}-${Date.now()}`}>
                                <ProductCard
                                    product={name}
                                    isInFavs={true}
                                    isRowView={isListView}
                                    isInCatalog={true}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
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

});