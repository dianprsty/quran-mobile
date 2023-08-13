import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config/firebaseconfig";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isHidden, setIsHidden] = useState(true);

  const showToast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const handleLogin = () => {
    if (!input.email) {
      showToast("email wajib diisi");
      return;
    }

    if (!input.password) {
      showToast("password wajib diisi");
      return;
    }

    let emailRegexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegexPattern.test(input.email)) {
      showToast("format email salah");
      return;
    }
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(input.email, input.password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        showToast("Email atau password salah");
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const lupaPassword = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Link untuk ubah password telah dikirim ke email anda!");
      })
      .catch(() => {
        Alert.alert("Email belum terdaftar", "silakan melakukan pendaftaran");
      });
  };

  const showAlert = (email) => {
    if (!email) {
      showToast("email wajib diisi");
      return;
    }

    let emailRegexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegexPattern.test(email)) {
      showToast("format email salah");
      return;
    }
    Alert.alert(
      "Lupa Password",
      `Email untuk reset password akan dikirim ke ${email}`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Ubah",
          onPress: () => lupaPassword(email),
          // style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require("../../assets/icons/logo.png")}
            style={styles.icon}
          />
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Selamat Datang Kembali!</Text>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputCotainer}>
              <TextInput
                placeholder="Masukan Email"
                value={input.email}
                onChangeText={(value) => setInput({ ...input, email: value })}
                style={styles.inputField}
              />
            </View>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...styles.inputLabel, width: 100 }}>Password</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => showAlert(input.email)}
              >
                <Text style={{ textAlign: "right" }}>Lupa Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputCotainer}>
              <TextInput
                placeholder="Masukan Password"
                value={input.password}
                onChangeText={(value) =>
                  setInput({ ...input, password: value })
                }
                style={styles.inputField}
                secureTextEntry={isHidden}
              />
              <TouchableOpacity
                onPress={() => setIsHidden(!isHidden)}
                activeOpacity={0.8}
              >
                {isHidden ? (
                  <Ionicons
                    name="eye-outline"
                    size={24}
                    color={colors.darkGrey}
                  />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    size={24}
                    color={colors.darkGrey}
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              style={styles.button}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.softBlue} />
              ) : (
                <Text style={styles.buttonTextLight}>Masuk</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.label}>
                Belum Punya Akun?
                <Text style={{ color: colors.darkBlue }}> Daftar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </>
  );
};

export default LoginScreen;

const colors = {
  darkBlue: "#0369A1",
  blue: "#0EA5E9",
  softBlue: "#F8FAFC",
  black: "#1E293B",
  darkGrey: "#64748B",
  grey: "#CBD5E1",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  formContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  formTitle: {
    color: colors.black,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    width: "90%",
  },
  inputCotainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.grey,
    width: "90%",
    maxWidth: 500,
    marginBottom: 20,
    marginTop: 4,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    paddingRight: 8,
  },
  inputField: {
    padding: 12,
    fontSize: 14,
    width: "90%",
  },
  button: {
    padding: 16,
    backgroundColor: colors.blue,
    width: "90%",
    borderRadius: 15,
    marginVertical: 20,
  },
  buttonTextLight: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  inputLabel: {
    color: colors.black,
    width: "90%",
    marginHorizontal: "auto",
    fontWeight: "600",
  },
  icon: {
    alignSelf: "center",
    marginVertical: 30,
    marginTop: 50,
    width: 150,
    height: 150,
  },
});
