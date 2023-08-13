import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config/firebaseconfig";

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [input, setInput] = useState({
    email: "",
    password: "",
    nama: "",
  });
  const [isHidden, setIsHidden] = useState(true);

  const showToast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const handleRegister = () => {
    if (!input.nama) {
      showToast("nama wajib diisi");
      return;
    }

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
      .createUserWithEmailAndPassword(input.email, input.password)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        firebase
          .firestore()
          .collection("user")
          .doc(input.email)
          .set({
            nama: input.nama,
            favorite: [],
            kota: {
              id: "667",
              nama: "KOTA JAKARTA",
            },
          })
          .then()
          .catch();
      })
      .catch((err) => {
        showToast("email sudah terdaftar");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            <Text style={styles.formTitle}>Yuk buat akun!</Text>
            <Text style={styles.inputLabel}>Nama</Text>
            <View style={styles.inputCotainer}>
              <TextInput
                placeholder="Masukan Nama"
                value={input.nama}
                onChangeText={(value) => setInput({ ...input, nama: value })}
                style={styles.inputField}
              />
            </View>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputCotainer}>
              <TextInput
                placeholder="Masukan Email"
                value={input.email}
                onChangeText={(value) => setInput({ ...input, email: value })}
                style={styles.inputField}
              />
            </View>
            <Text style={styles.inputLabel}>Password</Text>
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
              onPress={handleRegister}
              activeOpacity={0.8}
              style={styles.button}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.softBlue} />
              ) : (
                <Text style={styles.buttonTextLight}>Daftar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ ...styles.label, marginBottom: 20 }}>
                Sudah Punya Akun?
                <Text style={{ color: colors.darkBlue }}> Masuk</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </>
  );
};

export default RegisterScreen;

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
    marginTop: 50,
    marginBottom: 20,
    width: 150,
    height: 150,
  },
});
