import React, {useState} from 'react';
import {StyleSheet, TextInput, View, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import {COLORS} from "../style/colors";
import {Search} from "../Icons/Search";
import {BrandContainer} from "../components/BrandContainer";
import {Buttons} from "../components/Buttons";

export const BrandsScreen = ({navigation, route}) => {
    const {finalProducts} = route.params;
    // const brands = ["ADIDAS", "GUCCI", "GAP", "H&M", "Mango", "ZARA", "Diesel", "NIKE", "Levi's", "Pull&Bear","HERMES"]
    const [brands, setBrands] = useState([
            {
                brand: "ADIDAS",
                state: false
            },
            {
                brand: "GUCCI",
                state: false
            },
            {
                brand: "GAP",
                state: false
            },
            {
                brand: "H&M",
                state: false
            },
            {
                brand: "Mango",
                state: false
            },
            {
                brand: "ZARA",
                state: false
            },
            {
                brand: "Diesel",
                state: false
            },
            {
                brand: "NIKE",
                state: false
            },
            {
                brand: "Levi's",
                state: false
            },
            {
                brand: "Pull&Bear",
                state: false
            },
            {
                brand: "HERMES",
                state: false
            },
        ]
    );
    const [filteredProductsByBrand, setFilteredProductsByBrand] = useState([]);
    const handleBrand = (brandName) => {
        const filteredProductsByBrand = finalProducts.filter((product) => product.brandName === brandName);
        setFilteredProductsByBrand(filteredProductsByBrand);
        console.log('filteredProductsByBrand', filteredProductsByBrand)
        console.log('brandName', brandName)

    };
    return (
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.searchInputContainer}>
                <View style={styles.searchIcon}><Search height={20} width={20}/></View>
                <TextInput placeholder={"Search"} style={styles.searchInput} placeholderTextColor={COLORS.GRAY}/>
            </View>
            <FlatList
                data={brands}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleBrand(item.brand)}>
                        <BrandContainer brandName={item.brand} onPress={() => handleBrand(item.brand)}/>
                    </TouchableOpacity>

                )}
                keyExtractor={item => item.brand}
            />
            <Buttons
                onPressApply={() => navigation.navigate("Catalog", {
                    filteredProducts: filteredProductsByBrand,
                    isFiltered: true
                })}
                onPressDiscard={() => navigation.navigate("Filters")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",

    },
    searchInputContainer: {
        width: 330,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        borderRadius: 30,
        backgroundColor: COLORS.DARK,
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 20,
    },
    searchInput: {
        width: 330,

    },
    searchIcon: {
        marginTop: 7,
        marginRight: 7,
    },
});