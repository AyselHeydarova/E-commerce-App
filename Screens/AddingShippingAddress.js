import React, { useState } from "react";
import { Input } from "../components/Input";
import { View, StyleSheet, ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { ActionModal } from "../components/ActionModal";
import { COLORS } from "../style/colors";
import { Btn } from "../components/Btn";
import { connect } from "react-redux";
import { saveShippingAddress } from "../API";
// import { saveShippingAddress } from "../store/users";

export const AddingShippingAddress = connect(null, { saveShippingAddress })(
  ({ saveShippingAddress, route, navigation }) => {
    const [addressFields, setAddressFields] = useState(
      route.params?.address || {
        fullName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      }
    );

    const handleFieldChange = (name, value) => {
      setAddressFields((fields) => ({
        ...fields,
        [name]: value,
      }));
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <Input
            name="Full name"
            value={addressFields.fullName}
            onChangeText={(v) => handleFieldChange("fullName", v)}
          />
          <Input
            name="Address"
            value={addressFields.address}
            onChangeText={(v) => handleFieldChange("address", v)}
          />
          <Input
            name="City"
            value={addressFields.city}
            onChangeText={(v) => handleFieldChange("city", v)}
          />
          <Input
            name="State/Province/Region"
            value={addressFields.state}
            onChangeText={(v) => handleFieldChange("state", v)}
          />
          <Input
            name="Zip code (Postal code)"
            value={addressFields.zipCode}
            onChangeText={(v) => handleFieldChange("zipCode", v)}
          />
          <Input
            name="Country"
            value={addressFields.country}
            onChangeText={(v) => handleFieldChange("country", v)}
          />

          <Btn
            btnName="SAVE ADDRESS"
            bgColor={COLORS.PRIMARY}
            width="100%"
            height={48}
            onPress={() => {
              saveShippingAddress(addressFields);
              navigation.navigate("ShippingAddressesScreen");
            }}
          />
          {/* <ActionModal btnName="Save Address" /> */}
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: GLOBAL_STYLES.PADDING,
  },
});
