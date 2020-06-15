import React from "react";
import {View, StyleSheet, Image} from "react-native";
import {CustomText} from "./CustomText";
import {COLORS} from "../style/colors";

export const ProductCard = ({product, isRowView = false, isInCatalog = false, isInFavs}) => {
    product = {
        brandName: "Mango",
        productType: "T-shirt",
        price: "49$",
        size: "S",
        color: "white",
        imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
        count: 0
    };

    const columnStyles = {
        cardWrapper: {
            flexDirection: "column",
            width: 164,
            height: 280,
            borderRadius: 8,
            backgroundColor: COLORS.DARK,
        },

        imgWrapper: {
            width: "100%",
            height: 184,
            borderRadius: 8,
            overflow: "hidden"
        },
        productImg: {
            borderRadius: 8,
            width: "100%",
            height: "100%",

        }
    }

    
    const {brandName, productType, price, size, color, rating, imageUrl, count} = product;
    
    const cardWrapperStyles = [isRowView ? styles.cardWrapper : columnStyles.cardWrapper,{ opacity: count === 0 ? 0.5 : 1}] 

    return (
        <View style={cardWrapperStyles}>
            <View style={isRowView ? styles.imgWrapper : columnStyles.imgWrapper}>
                <Image source={{uri: imageUrl}}  style={isRowView ? styles.productImg : columnStyles.productImg}/>

            {
                count === 0 && 
                
                (<View style={styles.soldOut}>
                    <CustomText >Sorry, this item is currently sold out</CustomText>
                    </View>)
            }
            </View>
            
            <View style={styles.description}>
                <CustomText style={{color: COLORS.GRAY}}>{brandName}</CustomText>
                <CustomText weight="bold">{productType}</CustomText>

                {isInCatalog ? null :
                    (<View style={styles.row}>
                        <View style={styles.row}>
                            <CustomText style={{color: COLORS.GRAY}}>Color: </CustomText>
                            <CustomText> {color}  </CustomText>
                        </View>

                        <View style={styles.row}>
                            <CustomText style={{color: COLORS.GRAY}}>Size:</CustomText>
                            <CustomText>{size}</CustomText>
                        </View>

                    </View>)
                }

                <View style={styles.row}>
                    <CustomText weight="bold">{price}</CustomText>
                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cardWrapper: {
        height: 110,
        width: "90%",
        borderRadius: 8,
        flexDirection: "row",
        backgroundColor: COLORS.DARK,
        overflow: "hidden",
    },

    description: {
        padding: 15,
        width: "70%"
    },

    imgWrapper: {
        width: "30%",
        height: 110,
        overflow: "hidden"
    },

    productImg:{
        width: "100%",
        height: "100%",

    },
    row: {
        flexDirection: "row",
    },

    soldOut: {
        height: 36,
        opacity: 0.7,
        position: "absolute",
        bottom: 0, 
        backgroundColor: COLORS.DARK
    }
})