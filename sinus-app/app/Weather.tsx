import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router'


export default function Weather() {

  return(
    <View>
      <Text>Let's take a look at the weather</Text>
      <Text>Which weather stats are you interested in?</Text>
      <Button>Today</Button>
      <Button>Past</Button>
      <Button>Future</Button>
      <Button>All</Button>
      <Link href="/">Home</Link>
    </View>
  )
}

const styles = StyleSheet.create({})


