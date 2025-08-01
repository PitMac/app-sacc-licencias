import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeJWTFechaexp } from "../utils/utils";
import useAuthStore from "../stores/AuthStore";
import { AppState } from "react-native";
import Loader from "../components/Loader";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootNavigator() {
  const { token, logout, login } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const appState = useRef(AppState.currentState);

  const validarToken = async () => {
    const tokenStored = await AsyncStorage.getItem("userToken");
    if (tokenStored) {
      const fechaExpToken = decodeJWTFechaexp(tokenStored);
      if (fechaExpToken.exp < Date.now() / 1000) {
        logout();
      } else {
        login(tokenStored);
      }
    } else {
      logout();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permisos de notificaciones no otorgados");
      }
    })();
  }, []);

  useEffect(() => {
    const init = async () => {
      await validarToken();
      setLoading(false);
    };
    init();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        validarToken();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <NavigationContainer>
        {token ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}
