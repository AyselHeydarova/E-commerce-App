import React, {useState} from "react";
import {addProductToUsersBag, selectCount, setCount, setCountSize} from "../store/users";
import {Cross} from "../Icons/Cross";
import {View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {CustomText} from "./CustomText";
import {COLORS} from "../style/colors";
import StarRating from "react-native-star-rating";
import {ProductTag} from "../commons/ProductTag";
import {Heart} from "../Icons/Heart";
import {Counter} from "./Counter";
import {averageRatingCalc, totalRatingCalc} from "../Utils/Calculations";
import {selectAllProductData, setAddToBag} from "../store/products";
import {connect} from "react-redux";
import {columnStyles} from "../style/globalStyles";
import {Bag} from "../Icons/Bag";

const mapStateToProps = (state) => ({
    allProducts: selectAllProductData(state),
    count: selectCount(state),
});
export const ProductCard = connect(mapStateToProps, {
    setAddToBag,
    setCount,
    setCountSize,
    addProductToUsersBag,
})(
    ({
         addProductToUsersBag,
         setCountSize,
         product,
         isRowView = false,
         isInCatalog = false,
         isInFavs,
         isNew,
         isOnSale,
         isInOrders = false,
         onPress
     }) => {


        const {
            id,
            brandName,
            name,
            price,
            size,
            color,
            rating,
            imagesUrls,
            count,
            onSale,
            selectedCount
        } = product;

        const cardWrapperStyles = [
            isRowView ? styles.cardWrapper : columnStyles.cardWrapper,
            {opacity: count === 0 ? 0.5 : 1},
        ];

        const [isHeartClicked, setIsHeartClicked] = useState(false);
        const [defaultCount, setDefaultCount] = useState(selectedCount);

        const handleFavoriteProduct = () => {
            addProductToUsersBag(product, true);
            setIsHeartClicked(!isHeartClicked)
        };

        const salePrice = isOnSale
            ? Math.floor((+price * (100 - +onSale.discount)) / 100)
            : null;

        const handleCount = async () => {
            try {
                await setCountSize({
                    productID: id,
                    selectedCount: defaultCount,
                });
            } catch (error) {
                console.log("getCurrentUserData", error);
            }
        };


        return (
            <TouchableOpacity
                onPress={onPress}
                onLongPress={() => isInFavs ? addProductToUsersBag(product, true, true, false) : {}}>

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
                                    rating={averageRatingCalc(rating)}
                                />
                                <CustomText style={styles.ratingCount}>
                                    ({totalRatingCalc(rating)})
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
                                <CustomText style={{marginTop: 5, marginBottom: 5}}
                                            weight="medium">{name.toUpperCase()}</CustomText>

                                {isInOrders ? null :
                                    <TouchableOpacity
                                        style={styles.cross}
                                        onPress={() => addProductToUsersBag(product, false, false, true)}>
                                        <Cross width={15} height={15}/>
                                    </TouchableOpacity>
                                }
                                <View style={styles.rowBag}>

                                    <View style={[styles.row, {marginRight: 10}]}>
                                        <CustomText style={{color: COLORS.GRAY}}>Color: </CustomText>
                                        <CustomText> {color} </CustomText>
                                    </View>

                                    <View style={styles.row}>
                                        <CustomText style={{color: COLORS.GRAY}}>Size:</CustomText>
                                        <CustomText>{size}</CustomText>
                                    </View>

                                </View>
                                <View style={styles.row}>
                                    {isInOrders ?

                                        <View style={[styles.row, {marginRight: 10}]}>
                                            <CustomText style={{color: COLORS.GRAY}}>Units: </CustomText>
                                            <CustomText> {selectedCount} </CustomText>
                                        </View>
                                        :
                                        <Counter
                                            count={defaultCount}
                                            handleMinus={() => {
                                                setDefaultCount(defaultCount === 1 ? defaultCount : defaultCount - 1),
                                                    handleCount()
                                            }}
                                            handlePlus={() => {
                                                setDefaultCount(defaultCount + 1),
                                                    handleCount()
                                            }}
                                        />
                                    }

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
                                                color: isOnSale ? COLORS.GRAY : COLORS.TEXT,
                                                lineHeight: 45,
                                                fontSize: 19,
                                                textDecorationLine: isOnSale ? "line-through" : null,
                                            }}
                                        >
                                            {`${price * defaultCount}$`}
                                        </CustomText>}
                                    </View>
                                </View>

                            </View>
                        )}
                    {isInFavs? <Bag width={20} height={20}/> : isInOrders ?null:
                        <Heart width={15} height={15}
                               isHeartClicked={isHeartClicked}
                               onPress={() => handleFavoriteProduct()}/>
                    }
                </View>
            </TouchableOpacity>
        );
    });


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
        marginBottom: 5
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
    },
    cross: {
        position: 'absolute',
        top: 7,
        right: 7
    }
});
