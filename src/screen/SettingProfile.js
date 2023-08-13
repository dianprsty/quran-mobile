import React, { useRef } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SelectKota } from "./SelectKota";

const SettingProfile = () => {
  const drawer = useRef(null);
  const user = useSelector((state) => state.user.value);
  const kota = useSelector((state) => state.user.kota);
  const dispatch = useDispatch();

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={() => SelectKota(drawer, user, dispatch)}
    >
      <View style={styles.container}>
        <Text style={styles.paragraph}>Profile Setting</Text>
        <Text style={styles.paragraph}>Kota saat ini : {kota.nama}</Text>
        <Button
          title="Pilih Kota"
          onPress={() => drawer.current.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SettingProfile;
