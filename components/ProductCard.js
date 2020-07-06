import React, {useState} from "react";
import {View, StyleSheet, Image} from "react-native";
import {CustomText} from "./CustomText";
import {COLORS} from "../style/colors";
import StarRating from "react-native-star-rating";
import {ProductTag} from "../commons/ProductTag";
import {Heart} from "../Icons/Heart";
import {Counter} from "./Counter";

export const ProductCard = ({
                                product,
                                isRowView = false,
                                isInCatalog = false,
                                isInFavs,
                                isNew,
                                isOnSale,
                                navigation
                            }) => {
    const columnStyles = {
        cardWrapper: {
            flexDirection: "column",
            width: 150,
            height: 280,
            borderRadius: 8,
            backgroundColor: COLORS.DARK,
            marginRight: 20,
            marginBottom: 20,
        },

        imgWrapper: {
            width: "100%",
            height: 174,
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
        },
        productImg: {
            borderRadius: 8,
            width: "100%",
            height: "100%",
        },
    };

    const {
        brandName,
        name,
        price,
        sizes,
        colors,
        rating,
        imagesUrls,
        count,
        onSale,
    } = product;

    const [defaultCount,setDefaultCount]=useState(0);
    const allRatingsArray = isInCatalog ? rating.map((obj) => {
        for (let key in obj) {
            const value = obj[key];
            return value;
        }
    }) : null;
    const totalRatingCount = isInCatalog ? allRatingsArray.reduce(function (a, b) {
        return a + b;
    }) : null;

    let totalStarCount = 0;
    for (let i = 0; i <= 4; i++) {
        totalStarCount += isInCatalog ? allRatingsArray[i] * (i + 1) : 0;
    }

    const averageRating =
        Math.round((totalStarCount / totalRatingCount) * 10) / 10;

    const cardWrapperStyles = [
        isRowView ? styles.cardWrapper : columnStyles.cardWrapper,
        {opacity: count === 0 ? 0.5 : 1},
    ];

    const salePrice = isOnSale ? Math.floor((+price * (100 - +onSale.discount)) / 100) : null;


    return (
        <View style={cardWrapperStyles}>
            <View style={isRowView ? styles.imgWrapper : columnStyles.imgWrapper}>
                {isNew ? <ProductTag style={styles.tag} title="new"/> : null}

                {isOnSale ? (
                    <ProductTag
                        style={{...styles.tag, backgroundColor: COLORS.PRIMARY}}
                        title={`${onSale.discount}%`}
                    />
                ) : null}
                <Image
                    source={{
                        uri:
                            imagesUrls[0] ||
                            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    }}
                    style={isRowView ? styles.productImg : columnStyles.productImg}
                />

                {count === 0 && (
                    <View style={styles.soldOut}>
                        <CustomText>Sorry, this item is currently sold out</CustomText>
                    </View>
                )}
            </View>
            {isInCatalog ?
                <View style={styles.description}>
                    <View style={styles.row}>
                        <StarRating
                            disabled={true}
                            fullStarColor={COLORS.STAR}
                            starSize={14}
                            starStyle={{margin: 3}}
                            containerStyle={{marginTop: 10, width: 80}}
                            maxStars={5}
                            rating={averageRating}
                        />
                        <CustomText style={styles.ratingCount}>
                            {`(${totalRatingCount})`}
                        </CustomText>
                    </View>

                    <CustomText style={{color: COLORS.GRAY}}>{brandName}</CustomText>
                    <CustomText weight="medium">{name.toLowerCase()}</CustomText>


                    <View style={styles.priceRow}>
                        <CustomText
                            weight="bold"
                            style={{
                                color: isOnSale ? COLORS.GRAY : COLORS.TEXT,
                                textDecorationLine: isOnSale ? "line-through" : null,
                            }}
                        >
                            {`${price}$`}
                        </CustomText>
                        {isOnSale ? (
                            <CustomText
                                weight="bold"
                                style={{color: COLORS.SALE, marginLeft: 10}}
                            >{`${salePrice}$`}
                            </CustomText>
                        ) : null}
                    </View>

                </View>
                : (
                    <View style={styles.description}>
                        <CustomText style={{marginTop:8}} weight="medium">{name.toUpperCase()}</CustomText>
                        <View style={styles.rowBag}>
                            <View style={[styles.row, {marginRight: 10}]}>
                                <CustomText style={{color: COLORS.GRAY}}>Color: </CustomText>
                                <CustomText> {colors} </CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText style={{color: COLORS.GRAY}}>Size:</CustomText>
                                <CustomText>{sizes}</CustomText>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Counter
                                count={defaultCount}
                                     handleMinus={()=>setDefaultCount(defaultCount===0?defaultCount:defaultCount-1)}
                                     handlePlus={()=>setDefaultCount(defaultCount+1)}
                            />
                            <View>
                                {isOnSale ? (
                                    <CustomText
                                        weight="bold"
                                        style={{color: COLORS.SALE, marginLeft: 10}}
                                    >{`${salePrice}$`}
                                    </CustomText>
                                ) : <CustomText
                                    weight="bold"
                                    style={{
                                        color: isOnSale ? COLORS.GRAY : COLORS.TEXT, lineHeight: 30, fontSize: 19,
                                        textDecorationLine: isOnSale ? "line-through" : null,
                                    }}
                                >
                                    {`${price}$`}
                                </CustomText>}
                            </View>
                        </View>

                    </View>

                )}
            <Heart width={12} height={12} color={COLORS.GRAY}/>

        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        height: 110,
        width: "100%",
        borderRadius: 8,
        flexDirection: "row",
        backgroundColor: COLORS.DARK,
        marginBottom: 25,
        position: "relative",
    },

    tag: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 3,
    },
    description: {
        padding: 10,
        // width: "70%",
        paddingTop: 0,
        justifyContent: "space-between",
        flex: 1,
    },

    imgWrapper: {
        width: 110,
        height: 110,
        overflow: "hidden",
        position: "relative",
    },

    productImg: {
        width: "100%",
        height: "100%",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowBag: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    soldOut: {
        height: 36,
        opacity: 0.7,
        position: "absolute",
        bottom: 0,
        backgroundColor: COLORS.DARK,
    },

    priceRow: {
        flexDirection: "row",
    },
    ratingCount: {
        color: COLORS.GRAY,
        marginTop: 10,
        marginLeft: 15
    }
});
