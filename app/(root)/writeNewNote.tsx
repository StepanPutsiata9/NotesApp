import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  clearSelectedNote,
  createNewNote,
  updateNote,
} from "@/store/slices/notesSlice";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";

export default function NoteEditor() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { selectedNote } = useSelector((state: RootState) => state.notes);
  const handleSaveNote = () => {
    const formatDate = (date: Date, separator: string = "-") => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}${separator}${month}${separator}${year}`;
    };
    if (!selectedNote) {
      dispatch(
        createNewNote({
          title: title,
          isSecret: false,
          categoryColor: params.color as string,
          categoryName: params.title as string,
          description: content,
          date: formatDate(new Date()),
          id: Math.random(),
        })
      );
    } else {
      dispatch(
        updateNote({
          title: title || selectedNote.title,
          isSecret: selectedNote.isSecret,
          categoryColor: selectedNote.categoryColor as string,
          categoryName: selectedNote.categoryName as string,
          description: content || selectedNote.description,
          date: formatDate(new Date()),
          id: selectedNote.id,
        })
      );
    }
    dispatch(clearSelectedNote());
    if (selectedNote?.isSecret) {
      router.back();
    } else {
      router.push("/(root)");
    }
  };
  useFocusEffect(() => {
    return () => dispatch(clearSelectedNote());
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="#6A3EA1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedNote ? "Изменение заметки" : "Новая заметка"}
        </Text>
        <TouchableOpacity onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        extraScrollHeight={50}
        keyboardOpeningTime={0}
        enableResetScrollToCoords={false}
      >
        <View style={styles.categoryView}>
          <Text style={styles.categoryTitle}>Категория:</Text>
          <View
            style={[
              styles.categoryColor,
              {
                backgroundColor:
                  (params.color as string) ||
                  (selectedNote?.categoryColor as string),
              },
            ]}
          ></View>
          <Text style={styles.categoryTitle}>
            {params.title || selectedNote?.categoryName}
          </Text>
        </View>
        <View style={styles.titleSection}>
          <TextInput
            style={styles.titleInput}
            placeholder="Введите название..."
            placeholderTextColor="#999"
            value={title || selectedNote?.title}
            onChangeText={setTitle}
            maxLength={100}
            multiline={true}
          />
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.sectionLabel}>Ваша заметка:</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Начните писать здесь..."
            placeholderTextColor="#999"
            value={content || selectedNote?.description}
            onChangeText={setContent}
            multiline={true}
            textAlignVertical="top"
            // numberOfLines={30}
            scrollEnabled={false}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#6A3EA1",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  saveButtonText: {
    fontSize: 16,
    color: "#6A3EA1",
    fontWeight: "600",
  },
  categorySection: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
    marginBottom: 24,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  categoryLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 4,
  },
  categoryTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },

  categoryView: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  categoryColor: {
    width: 15,
    height: 15,
    borderRadius: 25,
    marginHorizontal: 3,
  },
  titleSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 10,
  },
  contentSection: {
    paddingHorizontal: 16,
    flex: 1,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  titleInput: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    minHeight: 60,
    textAlignVertical: "top",
  },
  contentInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 22,
    color: "#333",
    minHeight: 400,
    textAlignVertical: "top",
  },
  spacer: {
    height: 100,
  },
});
