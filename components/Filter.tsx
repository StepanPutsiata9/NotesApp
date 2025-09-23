import { category } from "@/constans";
import { clearFilters, setFilter } from "@/store/slices/notesSlice";
import { useAppDispatch } from "@/store/store";
import { Key, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Filter() {
  const [selectedCategory, setSelectedCategory] = useState<Key | null>(null);
  const memoizedCategories = useMemo(() => category, []);
  const dispatch = useAppDispatch();

  const handleCategoryPress = (index: Key) => {
    const newSelectedCategory = selectedCategory === index ? null : index;
    setSelectedCategory(newSelectedCategory);

    if (newSelectedCategory !== null) {
      const numericIndex = Number(newSelectedCategory);
      dispatch(setFilter(memoizedCategories[numericIndex].title));
    }
    if (newSelectedCategory === null) {
      dispatch(clearFilters());
    }
  };

  const getLighterColor = (color: string, percent: number = 30) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {memoizedCategories.map((c: ICategory, index: Key) => {
        const isSelected = selectedCategory === index;
        const lighterColor = getLighterColor(c.color, 50);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(index)}
            style={[
              styles.categoryCard,
              {
                borderColor: c.color,
                backgroundColor: isSelected ? lighterColor : "transparent",
              },
            ]}
          >
            <View style={[styles.colorDot, { backgroundColor: c.color }]} />
            <Text
              style={[styles.categoryText, isSelected && { color: "#000000" }]}
            >
              {c.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginTop: 4,
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    gap: 6,
    height: 36,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2D3436",
    letterSpacing: 0.2,
    height: 18,
    lineHeight: 18,
  },
});
