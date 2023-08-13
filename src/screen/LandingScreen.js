import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LandingScreen = ({ navigation }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={require("../../assets/landing.png")}
          style={{ width: 360, height: 550 }}
        />
        <Text style={styles.title}>Qur'an Mobile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonTextLight}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.8}
          style={{ ...styles.button, ...styles.buttonLight }}
        >
          <Text style={{ ...styles.buttonTextLight, color: colors.black }}>
            Masuk
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LandingScreen;

const colors = {
  darkBlue: "#0369A1",
  blue: "#0EA5E9",
  softBlue: "#F8FAFC",
  black: "#1E293B",
  darkGrey: "#64748B",
  grey: "#CBD5E1",
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.darkBlue,
    width: "90%",
  },
  button: {
    padding: 16,
    backgroundColor: colors.blue,
    width: "90%",
    borderRadius: 50,
  },
  buttonLight: {
    backgroundColor: colors.softBlue,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colors.blue,
  },
  buttonTextLight: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});
