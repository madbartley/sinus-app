import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    // these are global options on the outer Stack "screenOptions" tag, but you can override these styles by adding them to the individual screens below
    <Stack screenOptions={{
        headerStyle: { backgroundColor: 'lightblue'},
        headerTintColor: 'hotpink',
    }}>
        <Stack.Screen name="index" options={{ title:'Home', headerShown: false}}/>
        <Stack.Screen name="Headache" options={{ title: 'Log a headache'}}/>
        <Stack.Screen name="DateLog" options={{ title: 'Past headaches'}}/>
        <Stack.Screen name="TodayLog" options={{ title: 'Log a headache today'}}/>
        <Stack.Screen name="Weather" options={{ title: 'Weather'}}/>
        <Stack.Screen name="WeatherStats" options={{ title: 'Weather stats'}}/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})