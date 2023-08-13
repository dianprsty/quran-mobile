import React from 'react'

const SplashScreen = () => {
  return (
    <>
      <View style={{backgroundColor:'#fff', flex:1, alignItems:'center', justifyContent:'center'}}>
        <SafeAreaView >
          <Text>Favorite</Text>
        </SafeAreaView>
      </View>
      <StatusBar style='auto' />
    </>
  )
}

export default SplashScreen
