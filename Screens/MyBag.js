import React, {useState,useEffect} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, ScrollView} from "react-native";
import {COLORS} from "../style/colors";
import {CustomText} from "../components/CustomText";
import {Btn} from "../components/Btn";
import {ProductCard} from "../components/ProductCard";
import {CardView} from "../Icons/CardView";
import {selectUserData,getCurrentUserData} from "../store/users";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    usersData: selectUserData(state),
});
export const MyBag = connect(mapStateToProps,{getCurrentUserData})(({getCurrentUserData,usersData, navigation}) => {
     const bagProducts=usersData.userProductsInBag||[];
     console.log(usersData,'usersData')
     console.log(bagProducts,'bagProducts')
     console.log(usersData.userProductsInBag,'usersData.userProductsInBag')
    const totalAmount = () => {
        let total = 0;
        bagProducts.forEach((product) => {
            total = total + product.price
        });
        return total;
    };
    const handleUserData = async () => {
        try {
            await getCurrentUserData();
        } catch (error) {
            console.log("getCurrentUserData", error);
        }
    };
    useEffect(() => {
        handleUserData();

    }, []);
    return (
        <View style={styles.container}>
            <StatusBar/>
            <CustomText weight={'bold'} style={styles.title}>
                My Bag
            </CustomText>

            <FlatList
                data={bagProducts}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <ProductCard product={item} isRowView={true}/>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <View style={styles.amountContainer}>
                <CustomText weight={'bold'} style={styles.amount}>
                    Total amount:
                </CustomText>
                <CustomText weight={'bold'} style={styles.totalCost}>
                    ${totalAmount()}
                </CustomText>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Btn width={345} height={50} bgColor={COLORS.PRIMARY} btnName={"CHECK OUT"}/>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        paddingHorizontal: 15,


    },
    title: {
        color: COLORS.TEXT,
        fontSize: 34,
        lineHeight: 34,
        marginVertical: 30,

    },
    amount: {
        color: COLORS.GRAY,
        fontSize: 16,
        lineHeight: 20,
        marginLeft: 28,

    },
    totalCost: {
        color: COLORS.TEXT,
        fontSize: 18,
        lineHeight: 22,
        marginRight: 28

    },
    btn: {
        marginTop: 30,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        marginBottom: 10
    },
    amountContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    }


});