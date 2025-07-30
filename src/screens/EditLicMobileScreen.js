import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomAppBar from "../components/CustomAppBar";
import CustomButton from "../components/CustomButton";
import { TextInput } from "react-native-paper";
import instance from "../utils/Instance";

export default function EditLicMobileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  const [formFields, setFormFields] = useState({
    clave: item?.clave ?? "",
    client_id: item?.client_id ?? "",
    client_password: item?.client_password ?? "",
    descripcion: item?.descripcion ?? "",
    id: item?.id ?? "",
    referencia: item?.referencia ?? "",
    ruc: item?.ruc ?? "",
    ruta: item?.ruta ?? "",
  });

  const handleSave = async () => {
    try {
      if (item?.ruc) {
        await instance.put("licencia/update/" + item.id, formFields);
        Alert.alert("Licencia actualizada", "¡Gracias por actualizar!");
      } else {
        await instance.post("licencia/add", formFields);
        Alert.alert("Licencia creada", "¡Gracias por crear!");
      }
    } catch (error) {
      console.log("Error al guardar:", error?.response?.data || error.message);
    } finally {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomAppBar
        center
        onPressBackButton={() => navigation.goBack()}
        title={
          item?.ruc ? (item.descripcion ?? "").toUpperCase() : "Nueva Licencia"
        }
      />
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
          }}
        >
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={formFields.clave}
            onChangeText={(text) =>
              setFormFields({ ...formFields, clave: text })
            }
            label={"Clave"}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={formFields.client_id}
            onChangeText={(text) =>
              setFormFields({ ...formFields, client_id: text })
            }
            label={"Client ID"}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={formFields.client_password}
            onChangeText={(text) =>
              setFormFields({ ...formFields, client_password: text })
            }
            label={"Client Password"}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={formFields.descripcion}
            onChangeText={(text) =>
              setFormFields({ ...formFields, descripcion: text })
            }
            label={"Descripción"}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={formFields.referencia}
            onChangeText={(text) =>
              setFormFields({ ...formFields, referencia: text })
            }
            label={"Referencia"}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={formFields.ruc}
            onChangeText={(text) => setFormFields({ ...formFields, ruc: text })}
            label={"RUC"}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={formFields.ruta}
            onChangeText={(text) =>
              setFormFields({ ...formFields, ruta: text })
            }
            label={"Ruta"}
          />
          <View style={{ height: 20 }} />
          <CustomButton
            onPress={handleSave}
            title={item?.ruc ? "Actualizar" : "Crear"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    backgroundColor: "white",
    marginTop: 15,
  },
});
