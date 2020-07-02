import React, { useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../style/colors";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { SizeContainer } from "../components/SizeContainer";
import { Heart } from "../Icons/Heart";
import { CustomText } from "../components/CustomText";
import { ProductCard } from "../components/ProductCard";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { ActionModal } from "../components/ActionModal";
import { SelectSize } from "../commons/SelectSize";
import { Back } from "../Icons/Back";
import { BottomModal } from "../components/bottomModal";

export const SingleProductScreen = ({ route, navigation }) => {
  const [isSizeClicked, setIsSizeClicked] = useState(false);
  const [isColorClicked, setIsColorClicked] = useState(false);

  const {
    about,
    brandName,
    price,
    imagesUrls,
    name,
    size,
  } = route.params.product;
  const { products } = route.params;
  console.log(route.params.product);
  return (
    <TouchableWithoutFeedback onPress={() => setIsSizeClicked(false)}>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Back />
          </TouchableOpacity>
          <SliderBox
            images={imagesUrls}
            sliderBoxHeight={400}
            circleLoop={true}
            dotColor={COLORS.PRIMARY}
          />
          <View style={styles.main}>
            <View style={styles.row}>
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
            <CustomText style={styles.clothName}>{name}</CustomText>

            {/*<CustomText style={styles.typeText}>{name}</CustomText>*/}
            <CustomText style={styles.descText}>{about}</CustomText>

            <CustomText style={styles.suggestionText} weight="bold">
              You can also like this
            </CustomText>
            <FlatList
              data={products}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("SingleProductScreen", {
                      product: item,
                      products: products,
                    })
                  }
                >
                  <View>
                    {about !== item.about ? (
                      <ProductCard
                        isInCatalog={true}
                        product={item}
                        isRowView={false}
                      />
                    ) : null}
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </ScrollView>
        {isSizeClicked ? <SelectSize sizes={size} /> : null}
        {isColorClicked ? (
          <BottomModal name={"Select Color"}>
            {/*<ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>*/}
            {/*    {sizess.map((name) => (*/}
            {/*        <View style={styles.sizes} key={`${name}-${Date.now()}`}>*/}
            {/*            <SizeContainer*/}
            {/*                bgColor={isClicked[`${name}`] ? COLORS.PRIMARY : null}*/}
            {/*                borderWidth={isClicked[`${name}`] ? 0 : 0.4}*/}
            {/*                onPress={() => handleSize(name)}*/}
            {/*                isClicked={isClicked}*/}
            {/*                name={name} width={100}/>*/}
            {/*        </View>*/}
            {/*    ))}*/}
            {/*</ScrollView>*/}
          </BottomModal>
        ) : null}
        <ActionModal btnName="Add to cart" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
