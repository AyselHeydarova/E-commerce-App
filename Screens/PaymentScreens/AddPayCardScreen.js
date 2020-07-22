import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Picker } from "react-native";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { Btn } from "../../components/Btn";
import { COLORS } from "../../style/colors";
import { ScrollView } from "react-native-gesture-handler";
import { CustomText } from "../../components/CustomText";
import { AcceptIcon } from "../../Icons/AcceptIcon";
import { savePaymentCard } from "../../API/index";
import { Input } from "../../components";

export const AddPayCardScreen = ({ navigation, route }) => {
  const [paymentFields, setPaymentFields] = useState(
    route.params?.address || {
      fullName: "",
      cardNumber: "",
      expireDate: "",
      cvv: "",
      cardType: "Visa",
      isSelected: false,
    }
  );

  const handleFieldChange = (name, value) => {
    setPaymentFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const addCard = () => {
    savePaymentCard(paymentFields);
    navigation.navigate("PaymentMethods");
    console.log(paymentFields);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          name="Name on card"
          value={paymentFields.fullName}
          onChangeText={(v) => handleFieldChange("fullName", v)}
        />
        <Input
          name="Card number"
          value={paymentFields.cardNumber}
          onChangeText={(v) => handleFieldChange("cardNumber", v)}
        />
        <Input
          name="Expire Date"
          value={paymentFields.expireDate}
          onChangeText={(v) => handleFieldChange("expireDate", v)}
        />
        <Input
          name="CVV"
          value={paymentFields.cvv}
          onChangeText={(v) => handleFieldChange("cvv", v)}
        />

        <TouchableOpacity
          style={styles.checkboxWrapper}
          onPress={() => handleFieldChange("isSelected", true)}
        >
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: paymentFields.isSelected ? COLORS.TEXT : null,
                borderColor: paymentFields.isSelected ? null : COLORS.GRAY,
                borderWidth: paymentFields.isSelected ? null : 2,
              },
            ]}
          >
            <View style={styles.acceptIcon}>
              <AcceptIcon width={20} height={20} color={COLORS.DARK} />
            </View>
          </View>
          <CustomText>Use as default payment method</CustomText>
        </TouchableOpacity>

        <View style={styles.checkboxWrapper}>
          <View
            style={{
              backgroundColor: COLORS.PRIMARY,
              height: 30,
              width: 95,
            }}
          >
            <Picker
              placeholder="Select"
              mode="dropdown"
              selectedValue={paymentFields.cardType}
              style={{
                height: 30,
                width: 95,
                color: "white",
                alignItems: "center",
              }}
              onValueChange={(itemValue) =>
                handleFieldChange("cardType", itemValue)
              }
            >
              <Picker.Item label="Visa" value="Visa" />
              <Picker.Item label="Maestro" value="Maestro" />
            </Picker>
          </View>
          <CustomText style={{ fontSize: 14, lineHeight: 30, marginLeft: 20 }}>
            Choose your card type
          </CustomText>
        </View>
        <Btn
          btnName={"ADD CARD"}
          width={"100%"}
          height={48}
          bgColor={COLORS.PRIMARY}
          containerStyle={{ marginTop: 20 }}
          onPress={() => addCard()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: GLOBAL_STYLES.PADDING,
  },
  checkboxWrapper: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    marginLeft: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptIcon: {
    position: "absolute",
    top: 2,
    left: 2,
  },
  pickerContainer: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
  },
});
