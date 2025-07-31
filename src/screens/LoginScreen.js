import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import instance from "../utils/Instance";
import useAuthStore from "../stores/AuthStore";
import CustomButton from "../components/CustomButton";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "../components/Loader";
import { PRIMARY_COLOR } from "../utils/colors";

export default function LoginScreen() {
  const { login } = useAuthStore();
  const [objLogin, setobjLogin] = useState({
    user: "",
    password: "",
  });
  const [canUseBiometric, setCanUseBiometric] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBiometric = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const credentials = await AsyncStorage.getItem("savedCredentials");
      setIsLoading(true);
      if (hasHardware && isEnrolled && credentials) {
        setCanUseBiometric(true);
        setShowForm(false);
        setStoredCredentials(JSON.parse(credentials));
      }
      setIsLoading(false);
    };
    checkBiometric();
  }, []);

  const handleLogin = async () => {
    console.log(objLogin);
    if (objLogin.user === "" || objLogin.password === "") {
      Alert.alert("Login correcto", "ashhsa");
    }
    const dataSend = {
      usuario: objLogin.user,
      clave: objLogin.password,
    };
    setIsLoading(true);
    try {
      const response = await instance.post("usuario/login", dataSend);
      if (response.data?.data?.token) {
        await AsyncStorage.setItem(
          "savedCredentials",
          JSON.stringify(objLogin)
        );
        setIsLoading(false);
        login(response.data.data.token);
      } else {
        setIsLoading(false);
        Alert.alert("Error", "Credenciales incorrectas");
      }
    } catch (e) {
      setIsLoading(false);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  const handleBiometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autenticación con huella",
      fallbackLabel: "Usar contraseña",
    });

    if (result.success && storedCredentials) {
      setobjLogin(storedCredentials);
      handleLoginWithCredentials(storedCredentials);
    }
  };

  const handleLoginWithCredentials = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await instance.post("usuario/login", {
        usuario: credentials.user,
        clave: credentials.password,
      });

      if (response.data?.data?.token) {
        setIsLoading(false);
        login(response.data.data.token);
      } else {
        setIsLoading(false);
        Alert.alert("Error", "Credenciales guardadas inválidas");
      }
    } catch (e) {
      setIsLoading(false);
      Alert.alert("Error", "No se pudo iniciar sesión");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Loader loading={isLoading} />
          <Image
            source={require("../../assets/images/logo_empresa.png")}
            style={{ width: 400, height: 200 }}
            resizeMode="contain"
          />
          {showForm && (
            <>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "black",
                  }}
                >
                  LICENCIAS SACC
                </Text>
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <TextInput
                  label={"Usuario"}
                  value={objLogin.user}
                  onChangeText={(text) =>
                    setobjLogin({ ...objLogin, user: text })
                  }
                  mode="outlined"
                  style={{ backgroundColor: "white" }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <TextInput
                  label={"Contraseña"}
                  value={objLogin.password}
                  onChangeText={(text) =>
                    setobjLogin({ ...objLogin, password: text })
                  }
                  mode="outlined"
                  secureTextEntry
                  style={{ backgroundColor: "white" }}
                />
              </View>
              <CustomButton onPress={handleLogin} title={"LOGIN"} />
              {canUseBiometric && (
                <TouchableOpacity
                  onPress={() => setShowForm(false)}
                  style={{ marginTop: 20 }}
                >
                  <Text style={{ color: PRIMARY_COLOR, fontWeight: "bold" }}>
                    Iniciar con huella
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          {canUseBiometric && !showForm && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={handleBiometricLogin}
                style={styles.buttonCard}
              >
                <MaterialCommunityIcons
                  name="fingerprint"
                  size={50}
                  color={PRIMARY_COLOR}
                  style={{ marginBottom: 6 }}
                />
                <Text style={{ fontWeight: "bold", color: PRIMARY_COLOR }}>
                  Huella
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowForm(true)}
                style={styles.buttonCard}
              >
                <MaterialCommunityIcons
                  name="form-textbox"
                  size={50}
                  color={PRIMARY_COLOR}
                  style={{ marginBottom: 6 }}
                />
                <Text style={{ fontWeight: "bold", color: PRIMARY_COLOR }}>
                  Formulario
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  buttonCard: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
});
