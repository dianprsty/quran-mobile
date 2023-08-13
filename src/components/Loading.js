import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading = () => {
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff"}}>
      <ActivityIndicator size='large' color="#0369A1" />
    </View>
  )
}

export default Loading
