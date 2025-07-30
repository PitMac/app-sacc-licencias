import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LicenciasWebScreen from "../screens/LicenciasWebScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LicenciasMobileScreen from "../screens/LicenciasMobileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EditLicWebScreen from "../screens/EditLicWebScreen";
import EditLicMobileScreen from "../screens/EditLicMobileScreen";
import ReportScreen from "../screens/ReportScreen";
import { PRIMARY_COLOR } from "../utils/colors";

const Tab = createBottomTabNavigator();

function LicenciasTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
      }}
    >
      <Tab.Screen
        name="Web"
        component={LicenciasWebScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="web" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mobile"
        component={LicenciasMobileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cellphone"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={LicenciasTab} />
      <Stack.Screen name="EditWeb" component={EditLicWebScreen} />
      <Stack.Screen name="EditMobile" component={EditLicMobileScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}
