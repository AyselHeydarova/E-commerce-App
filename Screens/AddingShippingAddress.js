import React from "react";
import { Input } from "../components/Input";
import { View, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { ActionModal } from "../components/ActionModal";

export const AddingShippingAddress = () => {
  return (
    <View style={styles.container}>
      <Input name="Full name" />
      <Input name="Address" />
      <Input name="City" />
      <Input name="State/Province/Region" />
      <Input name="Zip code (Postal code)" />
      <Input name="Country" />
      <ActionModal btnName="Save Address" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: GLOBAL_STYLES.PADDING,
  },
});
