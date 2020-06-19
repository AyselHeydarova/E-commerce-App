import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CustomText } from "../components/CustomText";
import { COLORS } from "../style/colors";
import { AcceptIcon } from "../Icons/AcceptIcon";

export const AddressCard = ({
  fullname = "John Doe",
  address = "3 Newbridge Court",
  city = "Chino Hills",
  state = "California",
  zipCode = "AZ1000",
  country = "Azerbaijan",
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomText weight="medium">{fullname}</CustomText>
        <TouchableOpacity>
          <CustomText style={styles.edit} weight="bold">
            Edit
          </CustomText>
        </TouchableOpacity>
      </View>

      <CustomText>{address}</CustomText>
      <CustomText>
        {city}, {state} {zipCode}, {country}
      </CustomText>
      <TouchableOpacity
        style={styles.checkboxWrapper}
        onPress={() => setClicked(!clicked)}
      >
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: clicked ? COLORS.TEXT : null,
              borderColor: clicked ? null : COLORS.GRAY,
              borderWidth: clicked ? null : 2,
            },
          ]}
        >
          <AcceptIcon width={20} height={20} />
        </View>
        <CustomText>Use as the shipping address</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    backgroundColor: COLORS.DARK,
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
    justifyContent: "space-between",
  },
  checkboxWrapper: {
    flexDirection: "row",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  edit: {
    color: COLORS.PRIMARY,
  },
});
