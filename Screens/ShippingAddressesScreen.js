import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AddressCard } from "./AddressCard";
import { COLORS } from "../style/colors";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { Plus } from "../Icons/Plus";

export const ShippingAddressesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <FlatList data={} renderItem={({ item }) => <AddressCard />} /> */}

      <AddressCard />

      <Plus
        style={{ alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("AddingShippingAddress")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingVertical: 10,
  },
});
