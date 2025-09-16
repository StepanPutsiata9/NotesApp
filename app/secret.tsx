import SubHeader from "@/components/SubHeader";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function FavoriteNotes() {
  return (
    <SafeAreaView style={styles.container}>
      <SubHeader title={"Секретные заметки"} />
      <Text>Secret</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});
