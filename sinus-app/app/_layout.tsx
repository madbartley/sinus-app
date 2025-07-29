import { StyleSheet, Text, useColorScheme, View, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Colors'

const RootLayout = () => {
  const colorScheme = useColorScheme() // this hook will return 'light' or 'dark' (rarely, null)
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    // wrapping this in a "fragment": <> </>
    <><StatusBar value="auto"/>
    <Stack screenOptions={{     // these are global options on the outer Stack "screenOptions" tag, but you can override these styles by adding them to the individual screens below
        headerStyle: { backgroundColor: theme.navBackground},
        headerTintColor: theme.title,
    }}>
        <Stack.Screen name="index" options={{ title:'Low Pressure', headerShown: true}}/>
        <Stack.Screen name="Headache" options={{ title: 'Log a headache'}}/>
        <Stack.Screen name="DateLog" options={{ title: 'Past headaches'}}/>
        <Stack.Screen name="TodayLog" options={{ title: 'Log a headache today'}}/>
        <Stack.Screen name="Weather" options={{ title: 'Weather'}}/>
        <Stack.Screen name="WeatherStats" options={{ title: 'Weather stats'}}/>
    </Stack>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})