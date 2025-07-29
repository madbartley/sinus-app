import { Text, View, Image, ScrollView, useColorScheme, } from "react-native";
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


export default function WeatherStats() {
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
    <View style={styles.title}>
      <Text style={{ fontFamily: "AnticDidone_400Regular", fontSize: 22 }}>How's the weather looking?</Text>
      <Text style={{ fontFamily: "AnticDidone_400Regular", fontSize: 16 }}>View pressure data for the time selected</Text>
    </View>
    <View><Text style={{ fontFamily: "Roboto_400Regular", fontSize: 14, color: Colors.secondary,}}>all data given in "inches of mercury"</Text></View>
    <View style = {styles.statsContainer}>
      <Text style = {styles.stats}>Pressure right now</Text>
      <View style = {styles.pressure}>Pressure stats here</View>
      <Text style = {styles.stats}>Daily minimums</Text>
      <View style = {styles.pressure}>Pressure stats here</View>
      <Text style = {styles.stats}>Daily maximums</Text>
      <View style = {styles.pressure}>Pressure stats here</View>
      <Text style = {styles.stats}>Air pressure ranges</Text>
      <View style = {styles.pressure}>Pressure stats here</View>
      <Text style = {styles.stats}>Average hourly changes</Text>
      <View style = {styles.pressure}>Pressure stats here</View>
    </View>
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
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    statsContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      margin: 10,
      width: 400,
    },
    stats: {
      fontFamily: "Roboto_400Regular", 
      fontSize: 14,
      color: Colors.primary,
      width: 160,
      height: 30,
      backgroundColor: 'black',
      borderRadius: 10,
      margin: 2,
      padding: 5,
      textAlign: 'left',
      verticalAlign: 'middle', 
    },
    pressure: {
      backgroundColor: Colors.tertiary,
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

