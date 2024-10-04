import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MoviesScreen from '../screens/MoviesScreen';
import TVScreen from '../screens/TVScreen';
import SearchScreen from '../screens/SearchScreen';
import ShowScreen from '../screens/ShowScreen';
import { Ionicons } from '@expo/vector-icons'; 

// Create a Tab Navigator
const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
<Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: 'tomato' }, 
      }}
    >
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="TV Shows" component={TVScreen} />  
    </Tab.Navigator>
  );
}
