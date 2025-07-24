import { Text, View, Image, ScrollView } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router'


export default function WeatherStats() {

  return(
    <View>
    <Text>How's the weather looking?</Text>
    <Text>View different pressure data for the tie selected - all data given in "inches of mercury"</Text>
    <Text>Pressure right now</Text>
    <Text>Daily minimums</Text>
    <Text>Daily maximums</Text>
    <Text>Air pressure ranges</Text>
    <Text>Average hourly changes</Text>
    <Link href="/">Home</Link>
    </View>
  )
}

const styles = StyleSheet.create({});

