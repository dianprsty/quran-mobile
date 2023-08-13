import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { removeFromavorite } from "../redux/reducer/favoriteReducer";
import { firebase } from "../config/firebaseconfig";

const FavoriteScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const favorite = useSelector((state) => state.favorite.value);
  const dispatch = useDispatch();
  const removeFavorite = (nomor, nomorAyat) => {
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
      .catch();
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>Ayat Favorite</Text>
              {favorite?.length == 0 ||
                (!favorite && (
                  <View>
                    <Text>Belum ada ayat favorite</Text>
                  </View>
                ))}
            </View>
          }
          showsVerticalScrollIndicator={false}
          data={favorite}
          keyExtractor={(item) => item.namaLatin + item.nomorAyat}
          renderItem={({ item }) => (
            <View style={styles.suratCard}>
              <View style={{ flex: 1, gap: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.judulLatin}>
                    {item.namaLatin} : Ayat {item.nomorAyat}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeFavorite(item.nomor, item.nomorAyat)}
                  >
                    <FontAwesome name="trash-o" size={16} color="red" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.teksArab}>{item.teksArab}</Text>
                <Text style={styles.artiSurat}>{item.teksIndonesia}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <StatusBar style="auto" />
    </>
  );
};

export default FavoriteScreen;

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
    flex: 1,
    backgroundColor: colors.softBlue,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  suratCard: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    width: "100%",
    paddingVertical: 16,
  },
  teksArab: {
    fontSize: 28,
    justifyContent: "flex-end",
  },
  judulLatin: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.black,
  },
  artiSurat: {
    color: colors.black,
  },
  nomerBox: {
    padding: 10,
    marginRight: 8,
  },
});
