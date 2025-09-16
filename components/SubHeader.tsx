import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
function SubHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={24} color="#6A3EA1" />
      </TouchableOpacity>
      <Text style={styles.headerTitleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#6A3EA1",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleText: {
    fontSize: 24,
    textAlign: "center",
    marginLeft: 15,
    color: "#6A3EA1",
  },
});

export default SubHeader;
