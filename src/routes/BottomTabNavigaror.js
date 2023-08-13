import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import ExploreScreen from '../screen/ExploreScreen'
import FavoriteScreen from '../screen/FavoriteScreen'
import HomeScreen from '../screen/HomeScreen'
import ProfileScreen from '../screen/ProfileScreen'
import { AntDesign } from '@expo/vector-icons';


const BottomTab = createBottomTabNavigator()
const BottomTabNavigaror = () => {
  return (
    <>
      <BottomTab.Navigator initialRouteName='Home Tab'
        screenOptions={({route})=> (
          {
            headerShown: false,
            tabBarShowLabel:false,
            tabBarIcon:({focused, color, size}) =>{
              let iconName = ''
              if (route.name == "Home Tab"){
                iconName = "home"
              }else if (route.name == "Explore"){
                iconName = "search1"
              }else if (route.name == "Favorite"){
                iconName = "staro"
              } else if (route.name == "Profile"){
                iconName = "user"
              }
              return <AntDesign name={iconName} size={size} color={color} />
            }

          }
        )
        }
        
      >
        <BottomTab.Screen name="Home Tab" component={HomeScreen} />
        <BottomTab.Screen name="Explore" component={ExploreScreen} />
        <BottomTab.Screen name="Favorite" component={FavoriteScreen} />
        <BottomTab.Screen name="Profile" component={ProfileScreen} />
      </BottomTab.Navigator>
    </>
  )
}

export default BottomTabNavigaror
