import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../style/colors";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { SizeContainer } from "../components/SizeContainer";
import { Heart } from "../Icons/Heart";
import { CustomText } from "../components/CustomText";
import { ProductCard } from "../components/ProductCard";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { ActionModal } from "../components/ActionModal";

export const SingleProductScreen = ({ route }) => {

  const { about, brandName, price , imagesUrls, name} = route.params.product;

  return (
    <>
      <ScrollView>
        <SliderBox
          images={imagesUrls}
          sliderBoxHeight={400}
          circleLoop={true}
          dotColor={COLORS.PRIMARY}
        />
        <View style={styles.main}>
          <View style={styles.row}>
            <SizeContainer width={130} name="Size" />
            <SizeContainer width={130} name="Color" />
            <Heart width={30} height={30} />
          </View>

          <View style={styles.row}>
            <CustomText style={styles.bigText} weight="bold">
              {brandName}
            </CustomText>
            <CustomText style={styles.bigText} weight="bold">
              {`${price}$`}
            </CustomText>
          </View>

          <CustomText style={styles.typeText}>{name}</CustomText>
          <CustomText style={styles.descText}>{about}</CustomText>

          <CustomText style={styles.suggestionText} weight="bold">
            You can also like this
          </CustomText>
          {/* <FlatList
            data={products}
            horizontal={true}
            renderItem={({ item }) => <ProductCard isRowView={false} />}
          /> */}
        </View>
      </ScrollView>
      {/* <ActionModal btnName="Add to cart" /> */}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    backgroundColor: COLORS.BACKGROUND
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
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
});
