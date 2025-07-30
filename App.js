import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DefaultDarkTheme,
  PaperProvider,
} from "react-native-paper";
import RootNavigator from "./src/navigators/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d5a203",
    secondary: "#947415",
    secondaryContainer: "#e6b31e",
    onSecondaryContainer: "white",
    onBackground: "#d5a200",
    background: "#f0f0f0", // gris claro por defecto
  },
};

export default function App() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
