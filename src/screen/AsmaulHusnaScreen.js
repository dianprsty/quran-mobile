import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AsmaulHusna } from "../data/AsmaulHusna";

const AsmaulHusnaScreen = () => {
  return (
    <>
      <FlatList
        data={AsmaulHusna}
        numColumns={2}
        contentContainerStyle={styles.containerList}
        keyExtractor={({ index }) => index}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textArab}>{item.arabic}</Text>
            <Text style={styles.textLatin}>{item.latin}</Text>
            <Text style={styles.textArti}>{item.translation_id}</Text>
          </View>
        )}
      />
    </>
  );
};

export default AsmaulHusnaScreen;

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
  containerList: {
    gap: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.lightBlue,
    width: 150,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
  },
  textArab: {
    color: colors.black,
    textAlign: "center",
    fontSize: 32,
  },
  textLatin: {
    color: colors.black,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  textArti: {
    color: colors.black,
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
  },
});
