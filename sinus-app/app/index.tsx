import { StyleSheet, Text, View, useColorScheme, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Colors } from '../constants/Colors'
import AppLoading from 'expo-app-loading';
import line from '../assets/images/line.png'
import {
  useFonts,
  AnticDidone_400Regular,
} from "@expo-google-fonts/antic-didone";

import {
  Roboto_400Regular,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";


const index = () => {
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
        <View style = {styles.title}><Text style={{ fontFamily: "AnticDidone_400Regular", fontSize: 28 }}>Welcome to Low Pressure</Text>
        <Text style={{ fontFamily: "AnticDidone_400Regular", fontSize: 22 }}>the sinus-headache tracking app</Text>
        </View>
        <View style = {styles.buttonContainer}>
        <Link style = {styles.button} href="/Headache">Log a headache</Link>
        <Link style = {styles.button} href="/Weather">View weather</Link>
        </View>
        <View style = {styles.lines}>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 250}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 235}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 220}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 230}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 215}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 218}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 225}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 200}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 178}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 140}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 155}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 145}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 152}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 200}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 235}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 220}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 230}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 215}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 218}}/>
          <Image source={require('../assets/images/line.png')} style={{width: 2, height: 250}}/>

        </View>
      </View>
    )
  }
}


export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

        backgroundColor: '#14836e',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      width: 400,
      margin: 10,
    },
    button: {
      fontFamily: "Roboto_400Regular", 
      fontSize: 14,
      color: '#14836e',
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