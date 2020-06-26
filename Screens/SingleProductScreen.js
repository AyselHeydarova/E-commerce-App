import React from "react";
import {SliderBox} from "react-native-image-slider-box";
import {COLORS} from "../style/colors";
import {ScrollView, View, StyleSheet, FlatList, TouchableWithoutFeedback} from "react-native";
import {SizeContainer} from "../components/SizeContainer";
import {Heart} from "../Icons/Heart";
import {CustomText} from "../components/CustomText";
import {ProductCard} from "../components/ProductCard";
import {GLOBAL_STYLES} from "../style/globalStyles";
import {ActionModal} from "../components/ActionModal";


export const SingleProductScreen = ({route, navigation}) => {
    const {products} = route.params;
    const {product} = route.params;
    // product = {
    //   brandName: "Mango",
    //   productType: "T-shirt",
    //   price: "49$",
    //   size: "S",
    //   color: "white",
    //   imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    //   count: 0,
    // };

    const {
        brandName,
        productType,
        price,
        size,
        color,
        rating,
        imagesUrls,
        about,
        count,
        name
    } = product;

    //   "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    //   "https://www.iciw.com/bilder/artiklar/zoom/10162-033_2.jpg",
    //   "https://www.iciw.com/bilder/artiklar/zoom/10162-033_3.jpg",
    //   "https://www.iciw.com/bilder/artiklar/zoom/10162-033_4.jpg",
    // ];

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <ScrollView>
                    <SliderBox
                        images={imagesUrls}
                        sliderBoxHeight={400}
                        circleLoop={true}
                        dotColor={COLORS.PRIMARY}
                    />
                    <View style={styles.main}>
                        <View style={styles.row}>
                            <SizeContainer width={130} name="Size"/>
                            <SizeContainer width={130} name="Color"/>
                            <Heart width={30} height={30}/>
                        </View>

                        <View style={styles.row}>
                            <CustomText style={styles.bigText} weight="bold">
                                {brandName}
                            </CustomText>

                            <CustomText style={styles.bigText} weight="bold">
                                ${price}
                            </CustomText>
                        </View>
                        <CustomText style={styles.clothName}>
                            {name}
                        </CustomText>
                        <CustomText style={styles.typeText}>{productType}</CustomText>
                        <CustomText style={styles.descText}>
                            {about}
                        </CustomText>

                        <CustomText style={styles.suggestionText} weight="bold">
                            You can also like this
                        </CustomText>
                        <FlatList
                            data={products}
                            horizontal={true}
                            renderItem={({item}) =>
                                <TouchableWithoutFeedback
                                    onPress={() => navigation.navigate("SingleProductScreen", {
                                        product: item,
                                        products: products
                                    })}>
                                    <View>
                                        {
                                            about !== item.about ?
                                                <ProductCard isInCatalog={true} product={item} isRowView={false}/>
                                                : null}
                                    </View>
                                </TouchableWithoutFeedback>}
                            keyExtractor={item => item.name}
                        />
                    </View>
                </ScrollView>
                <ActionModal btnName="Add to cart"/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: GLOBAL_STYLES.PADDING,
        marginBottom: 100
    },
    container: {
        backgroundColor: COLORS.BACKGROUND,

    },

    row: {
        flexDirection: "row",
        marginTop: GLOBAL_STYLES.MARGIN_LEFT,
        justifyContent: "space-between",
        alignItems: "center",
    },
    bigText: {
        fontSize: 24,
    },
    typeText: {
        fontSize: 11,
        color: COLORS.GRAY,
    },
    descText: {
        fontSize: 14,
    },

    suggestionText: {
        fontSize: 18,
        marginVertical: 20,
    },
    clothName: {
        fontSize: 10,

    }
});
