import Filter from "@/components/Filter";
import FloatingActionButton from "@/components/FloatActionButton";
import Header from "@/components/Header";
import NotesCard from "@/components/NotesCard";
import Search from "@/components/Search";
import EmptyImage from "@/components/SVGComponents/EmptyImage";
import { RootState } from "@/store/store";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Index() {
  const { filtredNotes } = useSelector((state: RootState) => state.notes);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Search />
      <Filter />
      <FlatList
        data={filtredNotes}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotesCard item={item} />}
        keyExtractor={(el) => el?.title?.toString() || Math.random().toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyImage />
            <Text style={styles.emptyText}>Пока заметок нет...</Text>
          </View>
        }
        contentContainerStyle={styles.flatlistContentContainer}
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
    alignItems: "center",
  },

  emptyText: {
    fontSize: 24,
    color: "#6A3EA1",
  },
  flatlistContentContainer: {
    paddingBottom: 60,
  },
});
