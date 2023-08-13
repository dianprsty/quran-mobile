import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect }  from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { FlatList} from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { setDaftarSurat } from '../redux/reducer/daftarSuratSlice'

export default function DaftarSurat() {
  const daftarSurat = useSelector((state)=> state.daftarSurat.value)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const getDaftarSurat = async () => {
    try {
      let res = await axios.get('https://equran.id/api/v2/surat')
      console.log("jalan");
      dispatch(setDaftarSurat(res.data.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if (daftarSurat.length === 0){
      getDaftarSurat()
    }
  },[])

  return (
    <>
      <View style={{backgroundColor: colors.softBlue, }}>
          <FlatList
            style={styles.container}
            data={daftarSurat}
            keyExtractor={({nomor})=> nomor}
            renderItem={({item})=>(
              <TouchableOpacity 
                style={styles.suratCard}
                onPress={()=> navigation.navigate("Detail Surat", {nomor: item.nomor})}
              >
                <View style={styles.nomerBox}>
                  <Text>{item.nomor}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text style={styles.judulLatin}>{item.namaLatin}</Text>
                  <Text style={styles.artiSurat}>{item.arti}</Text>
                </View>
                <Text style={styles.judulArab}>{item.nama}</Text>
              </TouchableOpacity>
            )}
          />
      </View>
    </>
  )
}

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
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  suratCard:{
    flexDirection:'row',
    alignItems: 'center',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    width:"100%",
    paddingVertical: 16,
  },
  judulArab:{
    fontSize: 24,
    justifyContent: 'flex-end',
  },
  judulLatin:{
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black
  },
  artiSurat:{
    color: colors.black,
  },
  nomerBox: {
    padding: 10,
    marginRight: 8,
  },
})
