import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Search() {
  const [search, setSearch] = useState<string>("");

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#6A3EA1"
        style={styles.searchIcon}
      />
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholder="Поиск..."
        placeholderTextColor="#D0B8E6"
      />
      {search.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#6A3EA1" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6A3EA1",
    paddingHorizontal: 12,
    marginBottom:15,
  },
  searchIcon: {
    marginRight: 8,
  },
  search: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#3A0D67",
  },
  clearButton: {
    padding: 4,
  },
});
