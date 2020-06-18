import React from 'react';
import {StyleSheet, TextInput, View, FlatList, StatusBar} from 'react-native';
import {GLOBAL_STYLES} from "../style/globalStyles";
import {COLORS} from "../style/colors";
import {Search} from "../Icons/Search";
import {BrandContainer} from "../components/BrandContainer";
import {SizeContainer} from "../components/SizeContainer";

export const BrandsScreen = () => {
    const brands = ["adidas", "adidas Originals", "Blend", "Boutique Moschino", "Mango", "Zara", "Diesel", "Jack & Jones", "s.Oliver", "Pull & Bear",]
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
                    <BrandContainer brandName={item} />
                )}
                keyExtractor={item => item}
            />

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