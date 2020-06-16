import React from  "react";
import { StyleSheet, View } from "react-native";
import { CustomText } from "../components/CustomText";
import { Star } from "../Icons/Star";
import StarRating from "react-native-star-rating";


export const RatingReviews =()=> {
    return (
        <View>

            <CustomText style={styles.heading} weight="bold">Rating&Reviews</CustomText>
            <Star width={14} height={14}/>
            <StarRating 
            disabled={true}
        maxStars={5}
        rating={5}/>
           
        </View>


    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 34,
        
    }

})