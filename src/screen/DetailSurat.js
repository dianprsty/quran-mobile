import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../components/Loading";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../config/firebaseconfig";
import {
  addToFavorite,
  removeFromavorite,
} from "../redux/reducer/favoriteReducer";

export const DetailSurat = ({ route }) => {
  const user = useSelector((state) => state.user.value);
  const favorite = useSelector((state) => state.favorite.value);
  const dispatch = useDispatch();
  const { nomor } = route.params;
  const [surat, setSurat] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getSurat = async () => {
    setIsLoading(true);
    try {
      let res = await axios.get(`https://equran.id/api/v2/surat/${nomor}`);
      console.log("Detail Surat");
      setSurat(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (nomorAyat, teksArab, teksIndonesia) => {
    setIsLoading(true);
    const { nomor, namaLatin } = surat;
    let newAyat = {
      nomor,
      namaLatin,
      nomorAyat,
      teksArab,
      teksIndonesia,
    };
    firebase
      .firestore()
      .collection("user")
      .doc(user.email)
      .update({
        favorite: [...favorite, newAyat],
      })
      .then(() => {
        dispatch(addToFavorite(newAyat));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const removeFavorite = (nomorAyat) => {
    setIsLoading(true);
    let newFav = favorite.filter((ayat) => {
      return ayat.nomor !== nomor || ayat.nomorAyat !== nomorAyat;
    });
    dispatch(removeFromavorite({ nomor, nomorAyat }));
    firebase
      .firestore()
      .collection("user")
      .doc(user.email)
      .update({
        favorite: newFav,
      })
      .then()
      .catch()
      .finally(() => setIsLoading(false));
  };

  const handleFavorite = (isInFavorite, nomorAyat, teksArab, teksIndonesia) => {
    if (isInFavorite) {
      removeFavorite(nomorAyat);
    } else {
      addFavorite(nomorAyat, teksArab, teksIndonesia);
    }
  };

  useEffect(() => {
    getSurat();
  }, [nomor]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.headerCard}>
          <Text style={styles.headerTextNama}>{surat.namaLatin}</Text>
          <Text style={styles.headerTextArti}>{surat.arti}</Text>
          <View style={styles.separator}></View>
          <View style={styles.infoAyat}>
            <Text style={styles.headerTextAyat}>{surat.tempatTurun}</Text>
            <View style={styles.dot}></View>
            <Text style={styles.headerTextAyat}>{surat.jumlahAyat} Ayat</Text>
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
      style={styles.container}
      data={surat.ayat}
      keyExtractor={(item) => item.nomorAyat}
      renderItem={({ item }) => {
        const { nomorAyat, teksArab, teksIndonesia } = item;
        let flag = false;
        favorite &&
          favorite.forEach((ayat) => {
            if (ayat.nomor == nomor && ayat.nomorAyat == item.nomorAyat) {
              flag = true;
            }
          });
        return (
          <View style={styles.ayatCard}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.nomor}>{item.nomorAyat}</Text>
              <TouchableOpacity
                onPress={() =>
                  handleFavorite(flag, nomorAyat, teksArab, teksIndonesia)
                }
              >
                <AntDesign
                  name={flag ? "star" : "staro"}
                  size={24}
                  color={colors.darkBlue}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.ayatRow}>
              <Text style={styles.teksArab}>{item.teksArab}</Text>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.ayatTeks}>{item.teksLatin}</Text>
              <Text style={styles.ayatTeks}>{item.teksIndonesia}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default DetailSurat;

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
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
    overflow: "visible",
  },
  headerCard: {
    backgroundColor: colors.darkBlue,
    padding: 16,
    borderRadius: 15,
    justifyContent: "center",
    gap: 4,
    marginBottom: 16,
  },
  headerTextNama: {
    color: colors.softBlue,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerTextArti: {
    color: colors.softBlue,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.grey,
    marginVertical: 10,
  },
  infoAyat: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.softBlue,
    borderRadius: 10,
  },
  headerTextAyat: {
    color: colors.softBlue,
    textAlign: "center",
    fontSize: 14,
  },
  ayatCard: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.grey,
    paddingVertical: 10,
    gap: 16,
  },
  ayatRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nomor: {
    backgroundColor: colors.lightBlue,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  teksArab: {
    fontSize: 24,
    color: colors.black,
    textAlign: "right",
  },
  ayatTeks: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    textAlign: "justify",
  },
});
