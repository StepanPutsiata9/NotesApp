import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#6A3EA1", "#8A5DC0", "#6A3EA1"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ActivityIndicator size={50} color={"#fff"} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
