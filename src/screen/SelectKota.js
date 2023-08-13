import { useRef } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { DaftarKota } from "../data/DaftarKota";
import { firebase } from "../config/firebaseconfig";
import { useDispatch } from "react-redux";
import { setKota } from "../redux/reducer/userSlice";

export const SelectKota = (drawer, user, dispatch) => {
  // const drawer = useRef(null);
  const setKotaSaatIni = (kota) => {
    firebase
      .firestore()
      .collection("user")
      .doc(user.email)
      .update({
        kota: kota,
      })
      .then()
      .catch((err) => console.log(err));
    dispatch(setKota(kota));
    drawer.current.closeDrawer();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 16 }}>
        Pilih Kota
      </Text>
      {/* <Text>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
      <Text>sfhs</Text> */}

      <FlatList
        data={DaftarKota}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setKotaSaatIni(item)}
            style={{ width: "100%", marginBottom: 16 }}
          >
            <Text>{item.nama}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SelectKota;
