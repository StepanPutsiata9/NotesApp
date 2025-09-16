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
      <NotesCard
        isSecret={false}
        categoryColor="#6A3EA1"
        categoryName="Идеи"
        title="Мой проект"
        date="15.01.2024"
        description="Интересная идея для нового приложения..."
      />

      <NotesCard
        isSecret={true}
        categoryColor="#FF6B6B"
        categoryName="Личное"
        title="Секретные мысли"
        date="10.01.2024"
        description="Это мои личные мысли, которые никто не должен видеть..."
      />

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
});
