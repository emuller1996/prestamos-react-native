import FontAwesome from "@expo/vector-icons/FontAwesome";
/* import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"; */
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Toast from "react-native-toast-message";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    /*  <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */
    <Provider store={store}>
      <Toast />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="CrearPrestamo"
          options={{ presentation: "card", headerTitle: "Crear Prestamo" }}
        />
        <Stack.Screen
          name="[idPrestamo]/CrearPago/page"
          options={{ presentation: "modal", headerTitle: "Crear Pago" }}
        />
        <Stack.Screen
          name="[idPrestamo]/page"
          options={{
            presentation: "card",
            headerTitle: "Detalle de Prestamo",
          }}
        />
        <Stack.Screen name="NuevoCliente" options={{ presentation: "modal", headerTitle: "Nuevo Cliente" }} />
        <Stack.Screen name="cliente/[idCliente]" options={{ presentation: "card", headerTitle: "Editando Cliente" }} />
      </Stack>
    </Provider>
    /* </ThemeProvider> */
  );
}
