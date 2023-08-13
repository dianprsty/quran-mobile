import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitializing, setUser } from "../redux/reducer/userSlice";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import BottomTabNavigaror from "./BottomTabNavigaror";
import { firebase } from "../config/firebaseconfig";
import DaftarSurat from "../screen/DaftarSurat";
import DetailSurat from "../screen/DetailSurat";
import JuzAmmaScreen from "../screen/JuzAmmaScreen";
import DoaHarianScreen from "../screen/DoaHarianScreen";
import AsmaulHusnaScreen from "../screen/AsmaulHusnaScreen";
import { WiridScreen } from "../screen/WiridScreen";
import TahlilScreen from "../screen/TahlilScreen";
import SettingProfile from "../screen/SettingProfile";
import LandingScreen from "../screen/LandingScreen";
import AboutMeScreen from "../screen/AboutMeScreen";

const Stack = createStackNavigator();

const colors = {
  darkBlue: "#0369A1",
  blue: "#0EA5E9",
  softBlue: "#F8FAFC",
  black: "#1E293B",
  darkGrey: "#64748B",
  grey: "#CBD5E1",
};

const StackNavigator = () => {
  const user = useSelector((state) => state.user.value);
  const initializing = useSelector((state) => state.user.initializing);
  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    dispatch(setUser(user));
    if (initializing) dispatch(setInitializing(false));
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return (
    <>
      {!user ? (
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={BottomTabNavigaror}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Daftar Surat"
            component={DaftarSurat}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen
            name="Juz Amma"
            component={JuzAmmaScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen
            name="Do'a Harian"
            component={DoaHarianScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen
            name="Asmaul Husna"
            component={AsmaulHusnaScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen
            name="Wirid"
            component={WiridScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen
            name="Tahlil"
            component={TahlilScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen
            name="Setting Profile"
            component={SettingProfile}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen
            name="About Me"
            component={AboutMeScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.darkBlue,
              },
              headerTintColor: colors.softBlue,
            }}
          />
          <Stack.Screen name="Detail Surat" component={DetailSurat} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;
