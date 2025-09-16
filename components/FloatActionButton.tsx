import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const bgColorInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#6A3EA1", "#8E5EC9"],
  });

  const button1Style = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
      {
        scale: animation,
      },
    ],
    opacity: animation,
  };

  const button2Style = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -130],
        }),
      },
      {
        scale: animation,
      },
    ],
    opacity: animation,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menuButton, styles.button2, button2Style]}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => router.push("/secret")}
        >
          <AntDesign name="lock" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.menuButton, styles.button1, button1Style]}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => router.push("/createNote")}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.fab,
          {
            backgroundColor: bgColorInterpolate,
          },
        ]}
      >
        <TouchableOpacity
          onPress={toggleMenu}
          style={styles.fabButton}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Feather name="more-horizontal" size={32} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6A3EA1",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabButton: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    width: "auto",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  button1: {
    backgroundColor: "#6A3EA1",
  },
  button2: {
    backgroundColor: "#5A2D8C",
  },
  subButton: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
