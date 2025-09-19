import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../store/store";
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </GestureHandlerRootView>
  );
}
function AppStack() {
  const user = false;
  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    );
  }
  if (user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
    );
  }
}
