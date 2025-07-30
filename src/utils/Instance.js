import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL:
    "https://sacc.sistemascontrol.ec/api_control_identificaciones/public/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer-when-downgrade",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = token;
    }
  } catch (err) {
    console.warn("Error getting token:", err);
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("userToken");
    }
    return Promise.reject(error);
  }
);

export default instance;
