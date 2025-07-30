import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeJWTFechaexp } from "../utils/utils";
import useAuthStore from "../stores/AuthStore";
import { View, Text } from "react-native";
import Loader from "../components/Loader";

export default function RootNavigator() {
  const { token, logout, login } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const fechaExpToken = decodeJWTFechaexp(token);
        if (fechaExpToken.exp < Date.now() / 1000) {
          logout();
        } else {
          login(token);
        }
      } else {
        logout();
      }
      setLoading(false);
    };
    init();
  }, [token]);

  return (
    <>
      <Loader loading={loading} />
      <NavigationContainer>
        {token ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}
