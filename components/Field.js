import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

export const Input = ({ name, onChangeHandler, value }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{name}</Text>
      <TextInput
        weight={"medium"}
        style={styles.inputText}
        onChangeText={(value) => onChangeHandler(value)}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 70,
    width: "100%",
    paddingTop: 15,
    paddingLeft: 25,
    backgroundColor: "#2A2C36",
    borderRadius: 4,
    marginBottom: 8,
  },
  inputLabel: {
    color: "#ABB4BD",
    fontSize: 13,
    marginBottom: 4,
  },
  inputText: {
    color: "#F5F5F5",
    fontSize: 14,
    lineHeight: 20,
  },
});
