import { StyleSheet, Text, View } from "react-native";
import Logo from "../components/SVGComponents/Logo";
function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitleText}>Notes</Text>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
  },
  headerTitleText: {
    fontSize: 34,
    color: "#6A3EA1",
  },
});

export default Header;
