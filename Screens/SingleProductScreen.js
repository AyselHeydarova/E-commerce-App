import React from "react";

import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../style/colors";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { SizeContainer } from "../components/SizeContainer";
import { Heart } from "../Icons/Heart";
import { CustomText } from "../components/CustomText";
import { ProductCard } from "../components/ProductCard";
import { Btn } from "../components/Btn";
import { GLOBAL_STYLES } from "../style/GlobalStyles";

const products = [
  {
    brandName: "Mango",
    productType: "T-shirt",
    price: "49$",
    size: "S",
    color: "white",
    imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    count: 0,
  },

  {
    brandName: "Mango",
    productType: "T-shirt",
    price: "49$",
    size: "S",
    color: "white",
    imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    count: 0,
  },

  {
    brandName: "Mango",
    productType: "T-shirt",
    price: "49$",
    size: "S",
    color: "white",
    imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    count: 0,
  },

  {
    brandName: "Mango",
    productType: "T-shirt",
    price: "49$",
    size: "S",
    color: "white",
    imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    count: 0,
  },

  {
    brandName: "Mango",
    productType: "T-shirt",
    price: "49$",
    size: "S",
    color: "white",
    imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    count: 0,
  },
];

export const SingleProductScreen = ({ product }) => {
  product = {
    brandName: "Mango",
    productType: "T-shirt",
    price: "49$",
    size: "S",
    color: "white",
    imageUrl: "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    count: 0,
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
  const imagesArr = [
    "https://www.iciw.com/bilder/artiklar/zoom/10162-033_1.jpg",
    "https://www.iciw.com/bilder/artiklar/zoom/10162-033_2.jpg",
    "https://www.iciw.com/bilder/artiklar/zoom/10162-033_3.jpg",
    "https://www.iciw.com/bilder/artiklar/zoom/10162-033_4.jpg",
  ];

  return (
    <>
      <ScrollView>
        <SliderBox
          images={imagesArr}
          sliderBoxHeight={400}
          circleLoop={true}
          dotColor={COLORS.PRIMARY}
        />
        <View style={styles.main}>
          <View style={styles.row}>
            <SizeContainer width={138} name="Size" />
            <SizeContainer width={138} name="Color" />
            <Heart width={30} height={30} />
          </View>

          <View style={styles.row}>
            <CustomText style={styles.bigText} weight="bold">
              {brandName}
            </CustomText>
            <CustomText style={styles.bigText} weight="bold">
              {price}
            </CustomText>
          </View>

          <CustomText style={styles.typeText}>{productType}</CustomText>
          <CustomText style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </CustomText>

          <CustomText style={styles.suggestionText} weight="bold">
            You can also like this
          </CustomText>
          <FlatList
            data={products}
            horizontal={true}
            renderItem={(item) => <ProductCard isRowView={false} />}
          />
        </View>
      </ScrollView>
      <View style={styles.btnBox}>
        <Btn
          btnName="Add to cart"
          bgColor={COLORS.PRIMARY}
          height={48}
          width={343}
          titleStyle={{ textTransform: "uppercase" }}
        />

        <View style={styles.line} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnBox: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },

  line: {
    height: 5,
    width: 135,
    backgroundColor: COLORS.TEXT,
    borderRadius: 100,
    marginVertical: 18,
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
