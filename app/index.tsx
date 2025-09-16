import FloatingActionButton from "@/components/FloatActionButton";
import Header from "@/components/Header";
import Search from "@/components/Search";
import EmptyImage from "@/components/SVGComponents/EmptyImage";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Search />

      <FlatList
        data={[]}
        renderItem={(item) => <Text>1</Text>}
        keyExtractor={(el) => el}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyImage />
            <Text style={styles.emptyText}>Пока заметок нет...</Text>
          </View>
        }
      />
      <FloatingActionButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    color: "#6A3EA1",
  },
});
