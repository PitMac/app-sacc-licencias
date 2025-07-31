import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../components/CustomAppBar";
import instance from "../utils/Instance";
import useAuthStore from "../stores/AuthStore";
import Loader from "../components/Loader";
import { FlashList } from "@shopify/flash-list";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomFAB from "../components/CustomFAB";
import { TextInput } from "react-native-paper";
import { PRIMARY_COLOR } from "../utils/colors";
import { calcularDiasRestantes } from "../utils/utils";
import { RefreshControl } from "react-native-gesture-handler";

export default function LicenciasWebScreen() {
  const navigation = useNavigation();
  const { logout } = useAuthStore();
  const [data, setData] = useState([]);
  const [isLoaging, setIsLoaging] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setIsRefresh((prev) => !prev);
    }, [])
  );

  useEffect(() => {
    async function getInformation() {
      setIsLoaging(true);
      const response = await instance.get("licencia-web/list");
      setData(response.data.data);
      setFilteredData(response.data.data);
      setIsLoaging(false);
    }
    getInformation();
  }, [isRefresh]);

  useEffect(() => {
    if (searchText === "") {
      setFilteredData(data);
    } else {
      const lower = searchText.toLowerCase();
      const filtered = data.filter((item) =>
        (item.client_id ?? "").toLowerCase().includes(lower)
      );
      setFilteredData(filtered);
    }
  }, [searchText, data]);

  const renderRightActions = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditWeb", { item });
        }}
        style={styles.swipeable}
      >
        <MaterialCommunityIcons name="pencil" size={30} color={"white"} />
        <Text style={{ fontWeight: "bold", color: "white" }}>Editar</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    const { dias } = calcularDiasRestantes(item.fecha_pago, item.meses);
    return (
      <Swipeable renderRightActions={() => renderRightActions(item)}>
        <View style={styles.licenciaItem}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {(item.client_id ?? "").toUpperCase()}
          </Text>
          <Text>
            Fecha de Instalacion: {item.fecha_instalacion?.split(" ")[0]}
          </Text>
          <Text>Fecha de Pago: {item.fecha_pago?.split(" ")[0]}</Text>
          <Text>Meses: {item.meses}</Text>
          <Text>Tiempo restante: {dias}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader loading={isLoaging} />
      <CustomFAB navigation={navigation} route={"EditWeb"} />
      <CustomAppBar
        title={"Licencias Web"}
        center
        leftIcon={"logout"}
        onPressLeftIcon={logout}
        rightIcon={showSearch ? "close" : "magnify"}
        onPressRightIcon={() => {
          if (showSearch) {
            setSearchText("");
            setShowSearch(false);
          } else {
            setShowSearch(true);
          }
        }}
      />
      {showSearch && (
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <TextInput
            placeholder="Buscar Licencia..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            mode="outlined"
          />
        </View>
      )}
      <FlashList
        data={filteredData}
        renderItem={renderItem}
        estimatedItemSize={118}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isLoaging}
            onRefresh={() => setIsRefresh(!isRefresh)}
            colors={[PRIMARY_COLOR]}
            tintColor={PRIMARY_COLOR}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  licenciaItem: {
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
  },
  swipeable: {
    backgroundColor: PRIMARY_COLOR,
    marginTop: 15,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    width: 100,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
