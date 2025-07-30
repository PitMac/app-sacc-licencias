import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  token: null,
  login: (token) => {
    AsyncStorage.setItem("userToken", token);
    set({ token });
  },
  logout: async () => {
    await AsyncStorage.removeItem("userToken");
    set({ token: null });
  },
  restoreToken: async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) set({ token });
  },
}));

export default useAuthStore;
