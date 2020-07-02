import React,{useState} from 'react';
import {StyleSheet, TextInput, View, FlatList, StatusBar} from 'react-native';
import {GLOBAL_STYLES} from "../style/globalStyles";
import {COLORS} from "../style/colors";
import {Search} from "../Icons/Search";
import {BrandContainer} from "../components/BrandContainer";
import {SizeContainer} from "../components/SizeContainer";
import {Buttons} from "../components/Buttons";

export const BrandsScreen = () => {
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
                color: "Pull&Bear",
                state: false
            },
            {
                color: "HERMES",
                state: false
            },
           ]
    );
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
                    <BrandContainer brandName={item.brand} />
                )}
                keyExtractor={item => item.brand}
            />
            <Buttons/>
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