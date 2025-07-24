import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router'



export default function TodayLog() {

  return(
    <View>
      <Text>Sorry you're not feeling well today!</Text>
      <Text>Click the button to log a headache for today.</Text>
      <Button>Send it!</Button>
      <Link href="/">Home</Link>
    </View>
  )
}

const styles = StyleSheet.create({});

