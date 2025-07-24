import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Headache = () => {
  return (
    <View style={styles.container}>
      <Text>Sorry you're not feeling well! Let's track that headache.</Text>
      <Link href="/TodayLog">Log a headache today</Link>
      <Link href="/DateLog">Log a headache from the past</Link>
      <Link href="/">Home</Link>
    </View>
  )
}

export default Headache

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})