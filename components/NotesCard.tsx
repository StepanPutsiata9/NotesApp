import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function NotesCard({
  isSecret = false,
  categoryColor = "#6A3EA1",
  categoryName = "Рассуждения",
  title = "Qwqwq",
  date = "22.12.2022",
  description = "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
}: NotesCardProps) {
  return (
    <View style={styles.container}>
      {/* Верхняя строка с иконкой секретности и категорией */}
      <View style={styles.header}>
        <View style={styles.secretIcon}>
          <AntDesign
            name={isSecret ? "lock" : "unlock"}
            size={20}
            color={isSecret ? "#FF6B6B" : "#4ECDC4"}
          />
        </View>

        <View style={styles.categoryView}>
          <View
            style={[styles.circleView, { backgroundColor: categoryColor }]}
          />
          <Text style={styles.categoryText}>{categoryName}</Text>
        </View>
      </View>

      {/* Основной контент */}
      <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.line}> | </Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>

      <View
        style={[styles.decorativeLine, { backgroundColor: categoryColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  secretIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDE7F6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EDE7F6",
    maxWidth: "60%",
  },
  circleView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  categoryText: {
    color: "#636E72",
    fontSize: 12,
    fontWeight: "600",
    flexShrink: 1,
  },
  content: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D3436",
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: "#636E72",
    fontWeight: "600",
  },
  line: {
    fontSize: 18,
    color: "#DFE6E9",
    fontWeight: "bold",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  description: {
    color: "#636E72",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
  },
  decorativeLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
