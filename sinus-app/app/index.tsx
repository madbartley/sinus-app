import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import { createStaticNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Text, View } from "react-native";
import HomeScreen from './HomeScreen.tsx';
import Headache from './Headache.tsx';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Headache" component={Headache} />
      </Stack.Navigator>
  );
}

