import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Tahlil } from '../data/Tahlil'

export const TahlilScreen = () => {
  return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={Tahlil}
        keyExtractor={(item)=> item.id}
        renderItem={({item}) => (
          <View style={styles.ayatCard}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.ayatRow}>
              <Text style={styles.teksArab}>{item.arabic}</Text>
            </View>
            <View style={{gap: 8,}}>
              <Text style={{...styles.ayatTeks, fontStyle: 'italic'}} >{item.latin}</Text>
              <Text style={styles.ayatTeks} >{item.translation}</Text>
            </View>
          </View>
        )}
      />
   )
}

export default TahlilScreen

const colors = {
  darkBlue: "#0369A1",
  blue: "#0EA5E9",
  softBlue: "#F8FAFC",
  black: "#1E293B",
  darkGrey: "#64748B",
  grey: "#CBD5E1",
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff', 
    flex:1, 
    paddingHorizontal: 20,
  },
  ayatCard:{
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.grey,
    paddingVertical: 10,
    gap: 16,
  },
  ayatRow:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title:{
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
  },
  teksArab : {
    fontSize: 28,
    color: colors.black,
    textAlign: 'right'
  },
  ayatTeks:{
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    textAlign: 'justify'
  }
})
