import React, {useState, useEffect} from "react";
import {SliderBox} from "react-native-image-slider-box";
import {COLORS} from "../style/colors";
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import {SizeContainer} from "../components/SizeContainer";
import {Heart} from "../Icons/Heart";
import {CustomText} from "../components/CustomText";
import {ProductCard} from "../components/ProductCard";
import {GLOBAL_STYLES} from "../style/globalStyles";
import {ActionModal} from "../components/ActionModal";
import {BottomModal} from "../components/bottomModal";
import StarRating from "react-native-star-rating";
import {averageRatingCalc, totalRatingCalc} from "../Utils/Calculations";
import {
    setAddToBag,
    selectAllProductData,
} from "../store/products";
import {
    addProductToUsersBag
} from "../store/users";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
    allProducts: selectAllProductData(state),
});
export const SingleProductScreen = connect(mapStateToProps, {setAddToBag, addProductToUsersBag})(
    ({
         route,
         setAddToBag, addProductToUsersBag, navigation
     }) => {
        const [isSizeClicked, setIsSizeClicked] = useState(false);
        const [isColorClicked, setIsColorClicked] = useState(false);
        const [isHeartClicked, setIsHeartClicked] = useState(false);
        const {
            id,
            about,
            brandName,
            price,
            imagesUrls,
            name,
            rating,
            reviews,
            sizes,
            colors,
            count
        } = route.params.product;
        const {products} = route.params;
        const {product} = route.params;
        const [addProduct, setAddProduct] = useState({
            selectedCount:1,
            id: id,
            name: name,
            price: price,
            count: count,
            imagesUrls: imagesUrls,
            size: "",
            color: "",
        });
        const handleAddToCart = () => {
            setAddToBag(addProduct);
            addProductToUsersBag(addProduct,false,false,false);
            setIsSizeClicked(false);
            setIsColorClicked(false)
        };
        const handleFavoriteProduct = () => {
            addProductToUsersBag(product,true);
            setIsHeartClicked(!isHeartClicked)
            console.log('product',product)
        };
        const [isClicked, setIsClicked] = useState({
            S: false,
            M: false,
            L: false,
        });
        const handleSize = (size) => {
            setIsClicked({...false, [size]: !isClicked[`${size}`]});
            setAddProduct(prevState => ({
                ...prevState,
                ["size"]: size
            }));
            console.log(size)
            console.log(addProduct)
        };
        const handleColor = (color) => {
            setAddProduct(prevState => ({
                ...prevState,
                ["color"]: color
            }));
            setIsSizeClicked(!isColorClicked);
            console.log(size)
            console.log(addProduct)
        };

        useEffect(() => {
            console.log(addProduct)
        })
        const size = ["S", "M", "L"];
        return (
            <TouchableWithoutFeedback onPress={() => {
                setIsSizeClicked(false),
                    setIsColorClicked(false)

            }}>
                <View style={styles.container}>
                    <ScrollView>
                        <SliderBox
                            images={imagesUrls}
                            sliderBoxHeight={400}
                            circleLoop={true}
                            dotColor={COLORS.PRIMARY}
                        />
                        <View style={styles.main}>
                            <View style={[styles.row,{justifyContent: "space-around"}]}>
                                <SizeContainer
                                    width={130}
                                    name="Size"
                                    onPress={() => setIsSizeClicked(!isSizeClicked)}
                                    isClicked={isSizeClicked}
                                    bgColor={isSizeClicked ? COLORS.PRIMARY : null}
                                    borderWidth={isSizeClicked ? 0 : 0.4}
                                />
                                <SizeContainer
                                    onPress={() => setIsColorClicked(!isColorClicked)}
                                    isClicked={isColorClicked}
                                    width={130}
                                    name="Color"
                                    bgColor={isColorClicked ? COLORS.PRIMARY : null}
                                    borderWidth={isColorClicked ? 0 : 0.4}
                                />
                               <View style={{width:38}}>
                                   <Heart width={25} height={25}
                                          isHeartClicked={isHeartClicked}
                                          onPress={()=>handleFavoriteProduct()}/>
                               </View>
                            </View>

                            <View style={styles.row}>
                                <CustomText style={styles.bigText} weight="bold">
                                    {brandName}
                                </CustomText>
                                <CustomText style={styles.bigText} weight="bold">
                                    {`${price}$`}
                                </CustomText>
                            </View>
                            <CustomText style={styles.clothName}>{name}</CustomText>
                            <TouchableOpacity
                                style={styles.ratingRow}
                                onPress={() =>
                                    navigation.navigate("Rating", {
                                        rating: rating,
                                        reviews: reviews,
                                        productID: id,
                                    })
                                }
                            >
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
                            </TouchableOpacity>
                            <CustomText style={styles.descText}>{about}</CustomText>
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
                                                id !== item.id ?
                                                    <ProductCard isInCatalog={true} product={item} isRowView={false}/>
                                                    : null}
                                        </View>
                                    </TouchableWithoutFeedback>}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </ScrollView>
                    {
                        isSizeClicked ?
                            <BottomModal name={"Select Size"}>
                                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {size.map((name) => (
                                        <View key={`${name}-${Date.now()}`}>
                                            <SizeContainer
                                                bgColor={isClicked[`${name}`] ? COLORS.PRIMARY : null}
                                                borderWidth={isClicked[`${name}`] ? 0 : 0.4}
                                                onPress={() => {
                                                    handleSize(name)
                                                }}
                                                name={name} width={100}/>
                                        </View>
                                    ))}
                                </ScrollView>
                            </BottomModal>
                            :
                            null
                    }
                    {
                        isColorClicked ?

                            <BottomModal name={"Select Color"}>
                                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {colors.map((name) => (
                                        <View key={`${name.color}-${Date.now()}`}>
                                            <SizeContainer
                                                bgColor={name.color}
                                                onPress={() => handleColor(name.color)}
                                                name={name.color} width={100}/>
                                        </View>
                                    ))}
                                </ScrollView>
                            </BottomModal>

                            :
                            null
                    }
                    <ActionModal onPress={() => handleAddToCart()} btnName="Add to cart"/>
                </View>
            </TouchableWithoutFeedback>
        );
    });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    main: {
        paddingHorizontal: GLOBAL_STYLES.PADDING,
    },
    row: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    ratingRow:{
        width:140,
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "baseline",
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
        marginBottom: 15,
    },
    ratingCount: {
        color: COLORS.GRAY,
        marginTop: 10,
        marginLeft: 15
    }
});
