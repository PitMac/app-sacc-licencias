import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ onPress, title }) {
  return (
    <View style={{ width: "100%", marginTop: 16 }}>
      <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        <Text style={styles.textButton}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#d5a203",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
