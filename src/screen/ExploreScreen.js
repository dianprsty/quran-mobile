import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { RecomendedData } from '../data/RecomendedData';
import { useDispatch, useSelector } from 'react-redux';
import { setDaftarSurat } from '../redux/reducer/daftarSuratSlice';

const ExploreScreen = ({navigation}) => {
  const daftarSurat = useSelector((state)=> state.daftarSurat.value)
  const dispatch = useDispatch()
  const [suratFilter, setSuratFilter] = useState([])
  const [searchInput, setSearchInput] = useState('')

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

  const handleSearch = () =>{
    if (!searchInput){
      setSuratFilter([])
      return
    }
    let newArr = daftarSurat.filter((item) => {
      return item.namaLatin.replace(/\W+/g, "").toLowerCase().includes(searchInput.replace(" ", "").toLowerCase())
    })
    if (newArr.length == 0) {
      ToastAndroid.showWithGravity(`${searchInput} tidak ditemukan`, ToastAndroid.SHORT, ToastAndroid.TOP)
    }
    setSuratFilter(newArr)
  }

  return (
    <>
      
      <View style={styles.container}>
        <SafeAreaView style={{overflow:'scroll'}} >
          <Text style={styles.title}>Cari Surat</Text>
          <View style={styles.searchBar} >
            <TextInput value={searchInput} onChangeText={(value)=> setSearchInput(value)} style={styles.searchInput} />
            <TouchableOpacity 
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <AntDesign name="search1" size={24} color={colors.softBlue} />
            </TouchableOpacity>
          </View>
          {suratFilter.length > 0 &&
          <View style={{
            height: 600,
          }}>
          <View style={{flexDirection:'row', gap:8, alignItems: 'center'}}>
            <Text style={styles.title}>
                 Hasil Pencarian
            </Text>
            <TouchableOpacity onPress={()=>{
              setSearchInput('')
              setSuratFilter([])
            }} >
              <AntDesign name="closecircleo" size={20} color='red' />
            </TouchableOpacity>
          </View>
            <FlatList
              style={{...styles.containerRekomendasi}}
              ListFooterComponent={<View style={{height: 30}}></View>}
              data={suratFilter}
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
          }
          <Text style={{...styles.title, marginTop: 20}}>Rekomendasi Surat</Text>
          <FlatList
            style={{...styles.containerRekomendasi }}
            data={RecomendedData}
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
        </SafeAreaView>
      </View>
    </>
  )
}

export default ExploreScreen

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
    flex: 1,
    backgroundColor: colors.softBlue,
    padding: 10,
  },
  title:{
    fontSize: 20,
    fontWeight:'bold',
    color: colors.black,
  },
  searchBar:{
    flexDirection: 'row',
    width: "100%",
    marginVertical: 10,
    gap: 8,
    alignItems: 'center',
  },
  searchInput:{
    borderColor: colors.grey,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    padding: 8,
    borderRadius: 20,
  },
  searchButton:{
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 25,
  },
  containerRekomendasi:{
    paddingHorizontal: 16,
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