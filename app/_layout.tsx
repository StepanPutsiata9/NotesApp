import LoadingScreen from "@/components/LoadScreen";
import { loadNotesFromStorage } from "@/store/slices/notesSlice";
import { checkFirstTimeUser } from "@/store/slices/userSlice";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { RootState, store, useAppDispatch } from "../store/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </GestureHandlerRootView>
  );
}

function AppStack() {
  const { isLoading: userLoading, isFirstTime } = useSelector(
    (state: RootState) => state.user
  );
  const { isLoading: notesLoading } = useSelector(
    (state: RootState) => state.notes
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkFirstTimeUser());
    dispatch(loadNotesFromStorage());
  }, [dispatch]);

  if (userLoading || notesLoading) {
    return <LoadingScreen />;
  }

  if (isFirstTime) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
    </Stack>
  );
}
