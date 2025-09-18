import GreetingImage from "@/components/SVGComponents/StartImage";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";

export default function Greeting() {
  const router = useRouter();
  const buttonPan = useRef(new Animated.ValueXY()).current;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSwiping, setIsSwiping] = useState(false);

  const SWIPE_TRACK_WIDTH = 300;
  const SWIPE_BUTTON_WIDTH = 60;
  const MAX_SWIPE_DISTANCE = SWIPE_TRACK_WIDTH - SWIPE_BUTTON_WIDTH - 10;

  const buttonPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx > 0) {
          const newX = Math.min(gestureState.dx, MAX_SWIPE_DISTANCE);
          buttonPan.setValue({ x: newX, y: 0 });
          setIsSwiping(true);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 100) {
          Animated.timing(buttonPan, {
            toValue: { x: MAX_SWIPE_DISTANCE, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            router.replace("/(root)");
          });
        } else {
          Animated.spring(buttonPan, {
            toValue: { x: 0, y: 0 },
            friction: 7,
            useNativeDriver: false,
          }).start(() => {
            setIsSwiping(false);
          });
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <GreetingImage />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Добро пожаловать!</Text>
        <Text style={styles.subtitle}>
          Проведите кнопку вправо, чтобы начать
        </Text>
      </View>

      <View style={styles.swipeButtonContainer}>
        <View style={styles.swipeTrack}>
          <Animated.View
            style={[
              styles.swipeButton,
              {
                transform: [{ translateX: buttonPan.x }],
              },
            ]}
            {...buttonPanResponder.panHandlers}
          >
            <Feather name="arrow-right" size={24} color="#6A3EA1" />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A3EA1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  swipeButtonContainer: {
    width: 300,
    alignItems: "center",
    marginBottom: 40,
  },
  swipeTrack: {
    width: "100%",
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 5,
    overflow: "hidden",
  },
  swipeButton: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 5,
    top: 5,
  },
});
