import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Star } from "./Star";
import { products } from "../DummyData/products";



export const ProductCard = ({
  product,
  isRowView = false,
  isInCatalog = false,
  isInFavs,
}) => {
  product = {
    brandName: product.brandName,
    productType: product.productType,
    price: product.price,
    imageUrl: product.imageUrl,
    rating:product.rating
  };

  const columnStyles = {
    cardWrapper: {
      flexDirection: "column",
      width: 140,
      height: 200,
      borderRadius: 8,
      marginRight: 15,
      backgroundColor: '#1E1F28',
    },
    imgWrapper: {
      width: "100%",
      height: 100,
      borderRadius: 8,
      overflow: "hidden",
    },
    productImg: {
      borderRadius: 8,
      width: "90%",
      height: "90%",
    },
  };

  const {
    brandName,
    productType,
    price,
    size,
    color,
    rating,
    imageUrl,
    count,
  } = product;

  const cardWrapperStyles = [
    isRowView ? styles.cardWrapper : columnStyles.cardWrapper,
    { opacity: count === 0 ? 0.5 : 1 },
  ];

  const ratingRender=(ratingNumber)=>{
    const ratingArray=[]; 
    const rating=ratingNumber;
    let maxRating=5;
    let iterator=1;
    while (iterator<=maxRating){
        if (iterator<=rating) {
            ratingArray.push('filled');
        }else {
            ratingArray.push('empty');
        }
        iterator++;
    }
    return ratingArray
  }
  const ratingContainer=ratingRender(rating);
  return (
    <View style={cardWrapperStyles}>
      <View style={isRowView ? styles.imgWrapper : columnStyles.imgWrapper}>
        <Image
          source={imageUrl}
          style={isRowView ? styles.productImg : columnStyles.productImg}
          resizeMode="stretch"
        />

        {count === 0 && (
          <View style={styles.soldOut}>
            <Text>Sorry, this item is currently sold out</Text>
          </View>
        )}
      </View>

      <View style={styles.description}>
          <View style={styles.ratingWrapper}>
            {
                ratingContainer.map(item=>{
                    if (item==='filled'){
                        return <Star width={13} height={12} filled={true} />
                    }else if (item==='empty'){
                        return <Star width={13} height={12} filled={false}/>
                    }
                })
            }
          </View>

        <Text style={{ color: '#ABB4BD' }}>{brandName}</Text>
        <Text style={{ color: '#F7F7F7' }}>{productType}</Text>

        <View style={styles.row}>
          <Text style={{ color: '#F7F7F7' }}>{price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    height: 110,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: '#1E1F28',
    overflow: "hidden",
  },

  description: {
    width: "100%",
    paddingLeft:0
  },

  imgWrapper: {
    width: "30%",
    height: 110,
    overflow: "hidden",
  },

  productImg: {
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
  },
  ratingWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
  }
});