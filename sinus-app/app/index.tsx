import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Low Pressure, the sinus-headache tracking app</Text>
      <Image source={require('../assets/images/baro.png')} style={{width: 110, height: 120}}/>
      <Link href="/Headache">Log a headache</Link>
      <Link href="/Weather">View weather stats</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})