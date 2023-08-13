import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AboutMeScreen = () => {
  const openLink = (url) =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Quran Mobile</Text>
          <View style={styles.sumberBox}>
            <Text style={styles.sumberTitle}>Sumber data & API</Text>
            <TouchableOpacity
              onPress={() => openLink("https://equran.id/apidev")}
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Al Aquran : <Text style={styles.teksLink}>equran.id</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLink("https://fathimah.docs.apiary.io/#reference/sholat")
              }
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Jadwal Shalat :
                <Text style={styles.teksLink}> fathimah.docs.apiary.io</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  "https://jagad.id/99-asmaul-husna-latin-arab-dan-terjemahan-indonesia-inggris"
                )
              }
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Asmaul Husna : <Text style={styles.teksLink}>jagad.id</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  "https://www.doaharianislami.com/2017/06/kumpulan-doa-sehari-hari-lengkap-dalam-bahasa-arab-latin-dan-artinya.html"
                )
              }
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Do'a Harian :{" "}
                <Text style={styles.teksLink}>doaharianislami.com</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  "https://islam.nu.or.id/post/read/79315/susunan-bacaan-wirid-sesudah-shalat-lima-waktu"
                )
              }
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Wirid : <Text style={styles.teksLink}>islam.nu.or.id</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  "https://islam.nu.or.id/post/read/107344/susunan-bacaan-tahlil-doa-arwah-lengkap-dan-terjemahannya"
                )
              }
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Tahlil : <Text style={styles.teksLink}>islam.nu.or.id</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLink("https://www.flaticon.com/packs/ramadan-31")
              }
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Icon :{" "}
                <Text style={styles.teksLink}>
                  Ramadhan Icon Pack from Flaticon
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink("https://www.baca-quran.id/")}
              style={styles.linkSumber}
              activeOpacity={0.8}
            >
              <Text style={styles.listSumber}>
                Referensi : <Text style={styles.teksLink}>baca-quran.id</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: "center", marginBottom: 18 }}>
            Dibuat oleh : © 2023{" "}
            <Text style={styles.sumberTitle}>Dian Prasetyo</Text>
          </Text>
          <TouchableOpacity
            onPress={() => openLink("mailto:dprasmail@gmail.com")}
            style={{
              ...styles.linkSumber,
              flexDirection: "row",
              gap: 8,
              marginLeft: 48,
              marginBottom: 4,
            }}
            activeOpacity={0.8}
          >
            <AntDesign name="mail" size={24} color="black" />
            <Text style={styles.listSumber}>
              <Text style={styles.teksLink}>dprasmail@gmail.com</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink("mailto:dprasmail@gmail.com")}
            style={{
              ...styles.linkSumber,
              flexDirection: "row",
              gap: 8,
              marginLeft: 48,
              marginBottom: 4,
            }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="gitlab" size={24} color="black" />
            <Text style={styles.listSumber}>
              <Text style={styles.teksLink}>@dianp</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink("mailto:dprasmail@gmail.com")}
            style={{
              ...styles.linkSumber,
              flexDirection: "row",
              gap: 8,
              marginLeft: 48,
              marginBottom: 4,
            }}
            activeOpacity={0.8}
          >
            <AntDesign name="github" size={24} color="black" />
            <Text style={styles.listSumber}>
              <Text style={styles.teksLink}>@dianprsty</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openLink("https://www.linkedin.com/in/dianprasetyo-2021/")
            }
            style={{
              ...styles.linkSumber,
              flexDirection: "row",
              gap: 8,
              marginLeft: 48,
              marginBottom: 4,
            }}
            activeOpacity={0.8}
          >
            <AntDesign
              name="linkedin-square"
              size={24}
              color={colors.darkBlue}
            />
            <Text style={styles.listSumber}>
              <Text style={styles.teksLink}>Dian Prasetyo</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AboutMeScreen;

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
    backgroundColor: colors.softBlue,
    flex: 1,
    alignItems: "center",
  },
  box: {
    width: "90%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.black,
    marginTop: 30,
  },
  sumberBox: {
    backgroundColor: colors.lightBlue,
    borderRadius: 15,
    marginVertical: 20,
    marginBottom: 50,
    padding: 15,
  },
  sumberTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
  },
  listSumber: {
    fontSize: 16,
    color: colors.black,
    padding: 1,
    marginBottom: 4,
  },
  linkSumber: {
    padding: 0,
  },
  teksLink: {
    color: colors.darkBlue,
  },
});
