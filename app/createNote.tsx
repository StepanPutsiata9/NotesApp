import SubHeader from "@/components/SubHeader";
import { category } from "@/constans";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Buy from "@/components/SVGComponents/CategorySvg/Buy";
import Goal from "@/components/SVGComponents/CategorySvg/Goal";
import Guidance from "@/components/SVGComponents/CategorySvg/Guidance";
import Light from "@/components/SVGComponents/CategorySvg/Light";
import Routine from "@/components/SVGComponents/CategorySvg/Routine";
import { useRouter } from "expo-router";
import { useMemo } from "react";

const CategoryIcon = ({ categoryName }: { categoryName: string }) => {
  const IconComponent = useMemo(() => {
    switch (categoryName) {
      case "light":
        return Light;
      case "buy":
        return Buy;
      case "goal":
        return Goal;
      case "guidance":
        return Guidance;
      case "routine":
        return Routine;
      default:
        return Light;
    }
  }, [categoryName]);

  return <IconComponent />;
};

const CategoryItem = ({ c }: { c: ICategory }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/writeNewNoute")}
      style={[styles.categoryItem, { backgroundColor: c.color }]}
    >
      <View style={styles.categoryIcon}>
        <CategoryIcon categoryName={c.image} />
      </View>
      <View>
        <Text style={styles.title}>{c.title}</Text>
        <Text style={styles.subTitle}>{c.subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function CreateNotes() {
  const memoizedCategories = useMemo(() => category, []);

  return (
    <SafeAreaView style={styles.container}>
      <SubHeader title={"Новая заметка"} />
      <Text style={styles.questionText}>
        На какую тему вы хотите создать заметку?
      </Text>

      <ScrollView>
        {memoizedCategories.map((c, index) => (
          <CategoryItem key={index} c={c} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  categoryItem: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#515151ff",
    opacity: 0.7,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  },
  subTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
