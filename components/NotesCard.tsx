import Trash from "@/components/SVGComponents/Trash";
import { deleteNote, setSecretNote } from "@/store/slices/notesSlice";
import { useAppDispatch } from "@/store/store";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface INotesCardProps {
  item: INote;
}

export default function NotesCard({ item }: INotesCardProps) {
  const dispatch = useAppDispatch();
  const deleteNoteCard = (title: string) => {
    dispatch(deleteNote(title));
    console.log("delete");
  };

  const setSecret = (title: string) => {
    dispatch(setSecretNote(title));
    console.log("secret");
  };
  const renderRightActions = () => (
    <RectButton
      style={styles.deleteButton}
      onPress={() => deleteNoteCard(item?.title || "")}
    >
      <View style={styles.deleteContent}>
        <View style={styles.trashContainer}>
          <Trash />
        </View>
        <Text style={styles.deleteText}>Удалить</Text>
      </View>
    </RectButton>
  );

  return (
    <Swipeable
      overshootLeft={false}
      overshootRight={false}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setSecret(item?.title || "")}
            style={styles.secretIcon}
          >
            <AntDesign
              name={item.isSecret ? "lock" : "unlock"}
              size={20}
              color={"#000"}
            />
          </TouchableOpacity>

          <View style={styles.categoryView}>
            <View
              style={[
                styles.circleView,
                { backgroundColor: item.categoryColor },
              ]}
            />
            <Text style={styles.categoryText}>{item.categoryName}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleView}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title?.slice(0, 30)}
              {(item?.title?.length || 0) > 55 ? "..." : ""}
            </Text>
            <Text style={styles.line}> | </Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>

          <Text style={styles.description} numberOfLines={3}>
            {item?.description?.slice(0, 55) || ""}
            {(item?.description?.length || 0) > 55 ? "..." : ""}
          </Text>
        </View>

        <View
          style={[
            styles.decorativeLine,
            { backgroundColor: item.categoryColor },
          ]}
        />
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f2f2ff",
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

  deleteButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderRadius: 16,
    marginVertical: 8,
    marginLeft: -30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  deleteContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  trashContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
