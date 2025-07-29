import { Text, View, Image, useColorScheme } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router'
import Lines from '../app/components/Lines'
import { Colors } from '../constants/Colors'
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  AnticDidone_400Regular,
} from "@expo-google-fonts/antic-didone";

import {
  Roboto_400Regular,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";


export default function Weather() {
  let [fontsLoaded] = useFonts({
    AnticDidone_400Regular,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
  });
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  
  if (!fontsLoaded) {
    return <AppLoading /> 
  } else {
  return(
    <View style = {styles.container}>
      <View style = {styles.spacer}></View>
      <View style = {styles.title}>
        <Text style={{ fontFamily: "AnticDidone_400Regular", fontSize: 28 }}>Let's take a look at the weather</Text>
      </View>
      <View><Text style={{ fontFamily: "Roboto_400Regular", fontSize: 16, color: Colors.secondary,}}>Which weather stats are you interested in?</Text></View>
      <View style = {styles.buttonContainer}>
        <Link style = {styles.button} href = "/WeatherStats">Today</Link>
        <Link style = {styles.button} href = "/WeatherStats">Past</Link>
        <Link style = {styles.button} href = "/WeatherStats">Forecast</Link>
        <Link style = {styles.button} href = "/WeatherStats" >All</Link>
      </View>
    <Lines />
    </View>
  )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

        backgroundColor: Colors.primary,
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      width: 400,
      margin: 10,
      fontFamily: "AnticDidone_400Regular", 
      fontSize: 28,
    },
    button: {
      fontFamily: "Roboto_400Regular", 
      fontSize: 14,
      color: Colors.primary,
      width: 120,
      height: 25,
      backgroundColor: 'black',
      borderRadius: 10,
      margin: 2,
      textAlign: 'center',
      padding: 3,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      width: 300,
    },
    spacer: {
      height: 150,
      color: 'blue',
    },
    lines: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
      alignItems: 'flex-end',
    }
})


