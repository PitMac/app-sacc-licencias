import { View, Text } from "react-native";
import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import { useNavigation } from "@react-navigation/native";

export default function ReportScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <CustomAppBar
        title={"Reporte"}
        center
        onPressBackButton={() => navigation.goBack()}
      />
    </View>
  );
}
