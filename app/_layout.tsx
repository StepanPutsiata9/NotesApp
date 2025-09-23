import LoadingScreen from "@/components/LoadScreen";
import { checkFirstTimeUser } from "@/store/slices/userSlice";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { RootState, store, useAppDispatch } from "../store/store";
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
  const { isLoading, isFirstTime } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkFirstTimeUser());
  }, [dispatch]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isFirstTime) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    );
  }
  if (!isFirstTime) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
    );
  }
}
