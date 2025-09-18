import { Stack } from "expo-router";

function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="createNote" />
      <Stack.Screen name="secret" />
      <Stack.Screen name="writeNewNote" />
    </Stack>
  );
}
export default AppLayout;
