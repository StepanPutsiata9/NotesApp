import FloatingActionButton from "@/components/FloatActionButton";
import Header from "@/components/Header";
import NotesCard from "@/components/NotesCard";
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
        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => (
          <NotesCard
            isSecret={true}
            categoryColor="#FF6B6B"
            categoryName="Личное"
            title="Секретные мысли"
            date="10.01.2024"
            description="Это мои личные мысли, которые никто не должен видеть..."
          />
        )}
        keyExtractor={(el) => el.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyImage />
            <Text style={styles.emptyText}>Пока заметок нет...</Text>
          </View>
        }
        contentContainerStyle={styles.flatlistContainer}
      />
      <FloatingActionButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
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
  flatlistContainer: {
    paddingBottom: 60,
  },
});
