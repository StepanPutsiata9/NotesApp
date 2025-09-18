import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import Buy from "@/components/SVGComponents/CategorySvg/Buy";
// import Goal from "@/components/SVGComponents/CategorySvg/Goal";
// import Guidance from "@/components/SVGComponents/CategorySvg/Guidance";
// import Light from "@/components/SVGComponents/CategorySvg/Light";
// import Routine from "@/components/SVGComponents/CategorySvg/Routine";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// const CategoryIcon = ({ categoryName }: { categoryName: string }) => {
//   const icons: { [key: string]: React.ComponentType } = {
//     light: Light,
//     buy: Buy,
//     goal: Goal,
//     guidance: Guidance,
//     routine: Routine,
//   };

//   const IconComponent = icons[categoryName] || Light;
//   return <IconComponent />;
// };

export default function NoteEditor() {
  const router = useRouter();
  //   const params = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSaveNote = () => {
    router.back();
  };

  //   if (!category) {
  //     return (
  //       <SafeAreaView style={styles.container}>
  //         <Text>Ошибка: категория не выбрана</Text>
  //       </SafeAreaView>
  //     );
  //   }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="#6A3EA1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Новая заметка</Text>
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
        {/* <View
            style={[
              styles.categorySection,
              //   { backgroundColor: category.color },
            ]}
          >
            <View style={styles.categoryInfo}>
              <View style={styles.categoryIconWrapper}>
                {/* <CategoryIcon categoryName={category.image} /> 
              </View>
              <View>
                <Text style={styles.categoryLabel}>Тема:</Text>
                 <Text style={styles.categoryTitle}>{category.title}</Text> 
              </View>
            </View>
          </View> 
          */}

        {/* Поле для названия заметки */}
        <View style={styles.titleSection}>
          <TextInput
            style={styles.titleInput}
            placeholder="Введите название..."
            placeholderTextColor="#999"
            value={title}
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
            value={content}
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
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
