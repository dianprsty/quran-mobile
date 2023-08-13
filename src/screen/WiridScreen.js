import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Wirid } from '../data/Wirid'

export const WiridScreen = () => {
  const [surat, setSurat] = useState({})

  const getSurat = async () => {
    try {
      let res = await axios.get(`https://equran.id/api/v2/surat/1`)
      console.log("Detail Surat");
      setSurat(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getSurat()
  },[])
  return (
    <>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.title}>Bacaan Wirid sesudah shalat 5 waktu</Text>
        }
        ListFooterComponent={<View style={{height:20}}></View>}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={Wirid}
        keyExtractor={(item)=> item.id}
        renderItem={({item}) => 
        {
          let notArabic = item.arabic.includes("Membaca")
          return (
          <View style={styles.ayatCard}>
           {item.times > 1 && <Text style={{fontSize: 18}}>{item.times}X</Text>}
            <View style={styles.ayatRow}>
              {
                notArabic 
                  ?
                    <Text style={{...styles.teksArab, fontSize: 20, textAlign: 'center' }}>{item.arabic}</Text>
                  :
                    <Text style={{...styles.teksArab }}>{item.arabic}</Text>
            }
            </View>
            {item.tnc && <View>
              <Text style={styles.ayatTeks} >{item.tnc}</Text>
            </View>}
          </View>
          )
        }}
      />
    </>
   )
}

export default WiridScreen

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
    padding: 20,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
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
