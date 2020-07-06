import React from "react";
import { Input } from "../components/Input";
import { View, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { ActionModal } from "../components/ActionModal";
import { COLORS } from "../style/colors";
import { ScrollView } from "react-native-gesture-handler";

export const AddingShippingAddress = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Input name="Full name" />
        <Input name="Address" />
        <Input name="City" />
        <Input name="State/Province/Region" />
        <Input name="Zip code (Postal code)" />
        <Input name="Country" />
        <ActionModal btnName="Save Address" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    padding: GLOBAL_STYLES.PADDING,
  },
});
