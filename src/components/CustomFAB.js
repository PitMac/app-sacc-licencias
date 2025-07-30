import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PRIMARY_COLOR } from "../utils/colors";

const CustomFAB = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  if (!isFocused) {
    return null;
  }

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? "close" : "plus"}
        color="white"
        style={{ paddingBottom: insets.bottom + 60 }}
        fabStyle={{ backgroundColor: PRIMARY_COLOR }}
        actions={[
          {
            icon: "clipboard-text",
            label: "Reporte",
            color: PRIMARY_COLOR,
            style: { backgroundColor: "white" },
            onPress: () => navigation.navigate("Report"),
          },
          {
            icon: "file-plus",
            label: "Nuevo",
            color: PRIMARY_COLOR,
            style: { backgroundColor: "white" },
            onPress: () => navigation.navigate(route, {}),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
          }
        }}
      />
    </Portal>
  );
};

export default CustomFAB;
