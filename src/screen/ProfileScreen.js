import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { firebase } from "../config/firebaseconfig";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const nama = useSelector((state) => state.user.nama);
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const ubahPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        Alert.alert("Link untuk ubah password telah dikirim ke email anda!");
      })
      .catch();
  };

  const showAlert = () => {
    Alert.alert(
      "Ubah Password",
      "Apakah anda yakin ingin mengubah password?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Ubah",
          onPress: ubahPassword,
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
        {console.log(user)}
        <SafeAreaView>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/icons/men.png")}
              style={{ height: 150, width: 150 }}
            />
          </View>
          <Text style={{ ...styles.nameText, fontSize: 20 }}>{nama}</Text>
          <Text style={{ ...styles.nameText, color: colors.darkGrey }}>
            {user?.email}
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.separator}></View>
            <TouchableOpacity
              onPress={showAlert}
              activeOpacity={0.7}
              style={styles.itemList}
            >
              <AntDesign name="lock" size={32} color={colors.black} />
              <Text style={styles.listText}>Ubah Password</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Setting Profile")}
              activeOpacity={0.7}
              style={styles.itemList}
            >
              <AntDesign name="setting" size={32} color={colors.black} />
              <Text style={styles.listText}>Setting Profile</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.7}
              style={styles.itemList}
            >
              <AntDesign name="logout" size={32} color={colors.black} />
              <Text style={styles.listText}>Keluar</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate("About Me")}
              activeOpacity={0.7}
              style={styles.itemList}
            >
              <AntDesign
                name="questioncircleo"
                size={32}
                color={colors.black}
              />
              <Text style={styles.listText}>About Quran Mobile</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default ProfileScreen;

const colors = {
  darkBlue: "#0369A1",
  blue: "#0EA5E9",
  softBlue: "#F8FAFC",
  black: "#1E293B",
  darkGrey: "#64748B",
  grey: "#CBD5E1",
  lightBlue: "#BAE6FD",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBlue,
    paddingHorizontal: 16,
    padding: 10,
  },
  iconContainer: {
    backgroundColor: colors.blue,
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    marginVertical: 20,
    alignSelf: "center",
  },
  nameText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    color: colors.black,
  },
  listContainer: {
    width: "100%",
    marginVertical: 50,
  },
  itemList: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingLeft: 10,
  },
  separator: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.grey,
  },
  listText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.black,
  },
});
