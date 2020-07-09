import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AddressCard } from "./AddressCard";
import { COLORS } from "../style/colors";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { Plus } from "../Icons/Plus";
import { connect } from "react-redux";
import {
  selectCurrentUserShippingAddresses,
  selectShippingAddress,
} from "../store/users";
import { CustomText } from "../components/CustomText";

const mapStateToProps = (state) => ({
  shippingAddresses: selectCurrentUserShippingAddresses(state),
});

export const ShippingAddressesScreen = connect(
  mapStateToProps,
  null
)(({ navigation, shippingAddresses }) => {
  return (
    <View style={styles.container}>
      {shippingAddresses ? (
        <FlatList
          data={shippingAddresses}
          renderItem={({ item, index }) => (
            <AddressCard
              fullName={item.fullName}
              address={item.address}
              city={item.city}
              state={item.state}
              zipCode={item.zipCode}
              country={item.country}
              isSelected={item.isSelected}
              onPress={() => selectShippingAddress(index)}
              editPressHandler={() =>
                navigation.navigate("AddingShippingAddress", { address: item })
              }
            />
          )}
        />
      ) : (
        <CustomText> You have not added any shipping addresses yet </CustomText>
      )}

      <Plus
        style={{ alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("AddingShippingAddress")}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingVertical: 10,
  },
});
