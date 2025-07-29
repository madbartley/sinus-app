import { StyleSheet, Text, View, useColorScheme, Image} from 'react-native'
import React from 'react'
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

const Headache = () => {
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
  return (
    <View style={styles.container}>
      <View style = {styles.spacer}></View>
      <View style = {styles.title}>
        <Text style={{ fontFamily: "AnticDidone_400Regular", fontSize: 28 }}>Sorry you're not feeling well!</Text>
        <Text style={{ fontFamily: "AnticDidone_400Regular", fontSize: 22 }}>Let's track that headache.</Text>
      </View>
      <View><Text style={{ fontFamily: "Roboto_400Regular", fontSize: 16, color: Colors.secondary,}}>When would you like to log a headache?</Text></View>
      <View style = {styles.buttonContainer}>
        <Link style = {styles.button} href="/TodayLog">today</Link>
        <Link style = {styles.button} href="/DateLog">from the past</Link>
      </View>
      <Lines />
    </View>
  )
}
}

export default Headache

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