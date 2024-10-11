import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesScreen from '../screens/MoviesScreen';
import TVScreen from '../screens/TVScreen';
import SearchScreen from '../screens/SearchScreen';
import ShowScreen from '../screens/ShowScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function MoviesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
      <Stack.Screen name="ShowScreen" component={ShowScreen} />
    </Stack.Navigator>
  );
}

function TVStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TVScreen" component={TVScreen} />
      <Stack.Screen name="ShowScreen" component={ShowScreen} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
<Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarActiveTintColor: '#00bfff',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: '#00bfff' }, 
      }}
    >
      <Tab.Screen name="Movies" component={MoviesStack}/>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="TV Shows" component={TVStack} />  
    </Tab.Navigator>
  );
}
