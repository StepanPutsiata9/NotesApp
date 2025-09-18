import SubHeader from "@/components/SubHeader";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteNotes() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  useEffect(() => {
    checkFirstTime();
  }, []);

  const checkFirstTime = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem("secretPassword");
      if (!storedPassword) {
        setIsFirstTime(true);
        setIsSettingPassword(true);
      }
    } catch (error) {
      console.error("Error checking password:", error);
    }
  };

  const handleSetPassword = async () => {
    if (password.length < 6) {
      Alert.alert("Ошибка", "Пароль должен содержать минимум 6 символов");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Ошибка", "Пароли не совпадают");
      return;
    }

    try {
      await AsyncStorage.setItem("secretPassword", password);
      setIsFirstTime(false);
      setIsSettingPassword(false);
      setPassword("");
      setConfirmPassword("");
      Alert.alert("Успех", "Пароль успешно установлен!");
    } catch {
      Alert.alert("Ошибка", "Не удалось сохранить пароль");
    }
  };

  const handleLogin = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem("secretPassword");

      if (password === storedPassword) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        Alert.alert("Ошибка", "Неверный пароль");
        setPassword("");
      }
    } catch {
      Alert.alert("Ошибка", "Не удалось проверить пароль");
    }
  };

  if (isSettingPassword) {
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader title={"Установка пароля"} />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.authContainer}>
            <Text style={styles.title}>Установите пароль</Text>
            <Text style={styles.subtitle}>
              Придумайте надежный пароль для доступа к секретным заметкам
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Новый пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                (!password || !confirmPassword) && styles.loginButtonDisabled,
              ]}
              onPress={handleSetPassword}
              disabled={!password || !confirmPassword}
            >
              <Text style={styles.loginButtonText}>Установить пароль</Text>
            </TouchableOpacity>

            <Text style={styles.passwordHint}>
              Пароль должен содержать минимум 6 символов
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader title={"Секретные заметки"} />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.authContainer}>
            <Text style={styles.title}>Введите пароль</Text>
            <Text style={styles.subtitle}>
              Для доступа к секретным заметкам
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Введите пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                !password && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={!password}
            >
              <Text style={styles.loginButtonText}>Войти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SubHeader title={"Секретные заметки"} />
      <Text>secret</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  eyeButton: {
    padding: 5,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#6A3EA1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    marginTop: 10,
  },
  resetText: {
    color: "#6A3EA1",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  passwordHint: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
});
