import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../config/firebaseconfig";
import { RecomendedData } from "../data/RecomendedData";
import { setFavorite } from "../redux/reducer/favoriteReducer";
import { setKota, setNama } from "../redux/reducer/userSlice";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const nama = useSelector((state) => state.user.nama);
  const kota = useSelector((state) => state.user.kota);
  const [jadwal, setJadwal] = useState({});
  const focused = useIsFocused();

  const getJadwal = async () => {
    let today = new Date();
    let year = today.getFullYear();
    let m = today.getMonth() + 1;
    let month = m > 9 ? m : "0" + m;
    let day = today.getDate();

    try {
      let res = await axios.get(
        `https://api.banghasan.com/sholat/format/json/jadwal/kota/${kota.id}/tanggal/${year}-${month}-${day}`
      );
      setJadwal(res.data.jadwal.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getName = () => {
    firebase
      .firestore()
      .collection("user")
      .doc(user?.email)
      .get()
      .then((res) => {
        dispatch(setNama(res.data().nama));
        dispatch(setKota(res.data().kota));
      })
      .catch((err) => console.log(err));
  };

  const getFavorite = () => {
    firebase
      .firestore()
      .collection("user")
      .doc(user?.email)
      .get()
      .then((res) => dispatch(setFavorite(res.data().favorite)))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getName();
    getJadwal();
    getFavorite();
  }, [focused]);
  return (
    <>
      <View style={{ backgroundColor: colors.darkBlue, flex: 1 }}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.header}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.headerTitle}>Assalamualaikum,</Text>
                  <Text style={styles.headerName}>{nama}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("About Me")}
                >
                  <AntDesign
                    name="questioncircleo"
                    size={24}
                    color={colors.softBlue}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.headerBox}>
                <Text style={styles.headerBoxText}>
                  Jadwal Sholat {kota.nama}
                </Text>
                <Text style={styles.headerBoxTextSmall}>{jadwal.tanggal}</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={styles.jadwalGroup}
                >
                  <View style={styles.jadwalBox}>
                    <View style={styles.jadwalHeader}>
                      <Text style={styles.jadwalText}>Subuh</Text>
                    </View>
                    <Text style={styles.jadwalBodyText}>
                      {jadwal.subuh ? jadwal.subuh : "...."}
                    </Text>
                  </View>
                  <View style={styles.jadwalBox}>
                    <View style={styles.jadwalHeader}>
                      <Text style={styles.jadwalText}>Dzuhur</Text>
                    </View>
                    <Text style={styles.jadwalBodyText}>
                      {jadwal.dzuhur ? jadwal.dzuhur : "...."}
                    </Text>
                  </View>
                  <View style={styles.jadwalBox}>
                    <View style={styles.jadwalHeader}>
                      <Text style={styles.jadwalText}>Ashar</Text>
                    </View>
                    <Text style={styles.jadwalBodyText}>
                      {jadwal.ashar ? jadwal.ashar : "...."}
                    </Text>
                  </View>
                  <View style={styles.jadwalBox}>
                    <View style={styles.jadwalHeader}>
                      <Text style={styles.jadwalText}>Maghrib</Text>
                    </View>
                    <Text style={styles.jadwalBodyText}>
                      {jadwal.maghrib ? jadwal.maghrib : "...."}
                    </Text>
                  </View>
                  <View style={styles.jadwalBox}>
                    <View style={styles.jadwalHeader}>
                      <Text style={styles.jadwalText}>Isya</Text>
                    </View>
                    <Text style={styles.jadwalBodyText}>
                      {jadwal.isya ? jadwal.isya : "...."}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("Daftar Surat")}
                >
                  <Image
                    style={styles.menuIcon}
                    source={require("../../assets/icons/quran.png")}
                  />
                  <Text style={styles.menuText}>Al Quran</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("Juz Amma")}
                >
                  <Image
                    style={styles.menuIcon}
                    source={require("../../assets/icons/quran2.png")}
                  />
                  <Text style={styles.menuText}>Juz Amma</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("Do'a Harian")}
                >
                  <Image
                    style={styles.menuIcon}
                    source={require("../../assets/icons/prayer.png")}
                  />
                  <Text style={styles.menuText}>Do'a Harian</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("Asmaul Husna")}
                >
                  <Image
                    style={styles.menuIcon}
                    source={require("../../assets/icons/allah.png")}
                  />
                  <Text style={styles.menuText}>Asmaul Husna</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("Wirid")}
                >
                  <Image
                    style={styles.menuIcon}
                    source={require("../../assets/icons/tasbih.png")}
                  />
                  <Text style={styles.menuText}>Wirid</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("Tahlil")}
                >
                  <Image
                    style={styles.menuIcon}
                    source={require("../../assets/icons/ramadan.png")}
                  />
                  <Text style={styles.menuText}>Do'a Tahlil</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.terakhirTitle}>Rekomendasi Surat</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 20 }}
                >
                  {RecomendedData.map((item, i) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Detail Surat", {
                          nomor: item.nomor,
                        })
                      }
                      style={styles.terakhirBox}
                      key={i}
                    >
                      <Text style={styles.judulArab}>{item.nama}</Text>
                      <Text style={styles.judulLatin}>{item.namaLatin}</Text>
                      <Text style={styles.artiSurat}>
                        ({item.arti} : {item.jumlahAyat} Ayat)
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <StatusBar style="auto" />
    </>
  );
};

export default HomeScreen;

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
  header: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.softBlue,
  },
  headerName: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.softBlue,
  },
  headerBox: {
    backgroundColor: colors.softBlue,
    width: "100%",
    borderRadius: 15,
    marginTop: 10,
    padding: 16,
  },
  headerBoxText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  headerBoxTextSmall: {
    color: colors.black,
    fontSize: 14,
  },
  jadwalGroup: {
    marginTop: 10,
  },
  jadwalBox: {
    width: 75,
    height: 60,
    borderColor: colors.blue,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    marginRight: 10,
    overflow: "hidden",
    backgroundColor: colors.softBlue,
  },
  jadwalHeader: {
    backgroundColor: colors.darkBlue,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  jadwalText: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.softBlue,
  },
  jadwalBodyText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 4,
    verticalAlign: "middle",
  },
  body: {
    paddingHorizontal: 20,
    backgroundColor: colors.softBlue,
    gap: 20,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingTop: 36,
    paddingBottom: 30,
  },
  menuItem: {
    width: 100,
    borderRadius: 10,
    paddingTop: 12,
    paddingHorizontal: 22,
    alignItems: "center",
  },
  menuIcon: {
    width: 35,
    height: 35,
    marginBottom: 5,
  },
  menuText: {
    fontSize: 14,
    color: colors.black,
    textAlign: "center",
    marginBottom: 5,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 14,
    justifyContent: "space-between",
  },
  terakhirTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  terakhirBox: {
    width: 160,
    height: 100,
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    marginRight: 10,
    paddingVertical: 10,
  },
  judulArab: {
    fontSize: 24,
    justifyContent: "flex-end",
    textAlign: "center",
  },
  judulLatin: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
  },
  artiSurat: {
    color: colors.black,
    textAlign: "center",
  },
});
