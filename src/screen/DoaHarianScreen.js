import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { DailyDoa } from '../data/DailyDoa'

export const DoaHarianScreen = ({route}) => {
  return (
      <FlatList
        // ListHeaderComponent={
        //   <View style={styles.headerCard}>
        //     <Text style={styles.headerTextNama}>{''}</Text>
        //     <Text style={styles.headerTextArti}>{''}</Text>
        //     <View style={styles.separator}></View>
        //     <View style={styles.infoAyat}>
        //       <Text style={styles.headerTextAyat}>{''}</Text>
        //       <View style={styles.dot}></View>
        //       <Text style={styles.headerTextAyat}>{''} Ayat</Text>
        //     </View>
        //   </View>
        // }
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={DailyDoa}
        keyExtractor={(item)=> item.title}
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

export default DoaHarianScreen

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
    overflow: 'visible'
  },
  headerCard:{
    backgroundColor: colors.darkBlue,
    padding: 16,
    borderRadius: 15,
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  headerTextNama:{
    color: colors.softBlue,
    textAlign: 'center',
    fontWeight:'bold',
    fontSize: 24
  },
  headerTextArti:{
    color: colors.softBlue,
    textAlign: 'center',
    fontWeight:'bold',
    fontSize: 16
  },
  separator:{
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.grey,
    marginVertical: 10,

  },
  infoAyat:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    gap: 8,
  },
  dot:{
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.softBlue,
    borderRadius: 10,
  },
  headerTextAyat:{
    color: colors.softBlue,
    textAlign: 'center',
    fontSize: 14
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
