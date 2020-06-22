import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import homeImage from '../assets/homeImage.png';
import {Btn} from '../components/Btn';
import {ScrollView, TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {ProductCard} from '../components/ProductCard';
import product1 from '../assets/newProductImgs/product1.png'
import product2 from '../assets/newProductImgs/product2.png'
import product3 from '../assets/newProductImgs/product3.png'

const fakeProducts = [
    {
        brandName: "Mango",
        productType: "Blouse",
        price: "49$",
        size: "S",
        color: "white",
        imageUrl: product1,
        count: 0,
        rating: 2
    },

    {
        brandName: "Mongo DB",
        productType: "T-shirt",
        price: "39$",
        size: "S",
        color: "white",
        imageUrl: product2,
        count: 0,
        rating: 3

    },

    {
        brandName: "Mango",
        productType: "Shirt",
        price: "59$",
        size: "S",
        color: "white",
        imageUrl: product3,
        count: 0,
        rating: 3

    }
];
const Home = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <ImageBackground imageStyle={{resizeMode: "stretch"}} source={homeImage}
                                 style={{width: '100%', height: '100%'}}>
                </ImageBackground>
                <Text style={styles.title}>Fashion sale</Text>
                <View style={styles.btn}>
                    <Btn btnName="Check" bgColor="#EF3651" height={36} width={160} titleStyle={{color: '#F5F5F5'}}/>
                </View>
            </View>
            <View style={styles.newItemsWrap}>
                <Text style={styles.categoryTitle}>
                    New
                </Text>
                <Text style={styles.description}>
                    You've never seen it before
                </Text>
                    <View>
                        <FlatList
                            horizontal
                            data={fakeProducts}
                            renderItem={({item}) => (
                                <TouchableOpacity >
                                    <ProductCard product={item}/>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.productType}
                        />
                    </View>

            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        width: '100%',
        height: '70%',
    },
    title: {
        fontSize: 48,
        lineHeight: 48,
        position: 'absolute',
        bottom: 88,
        fontWeight: 'bold',
        left: 15,
        width: 190,
        color: '#F7F7F7'
    },
    btn: {
        position: 'absolute',
        left: 15,
        bottom: 34
    },
    newItemsWrap: {
        backgroundColor: '#1E1F28',
        height: '100%',
        width: '100%',
        paddingLeft: 15,
        paddingTop: 20
    },
    categoryTitle: {
        fontSize: 34,
        color: '#F7F7F7',
        lineHeight: 34,
        fontWeight: 'bold'
    },
    description: {
        color: '#ABB4BD',
        fontSize: 11,
        marginBottom: 10
    }
});