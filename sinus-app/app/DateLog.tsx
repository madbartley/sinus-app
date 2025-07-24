import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router'

export default function DateLog() {

  return(
    <View>
      <Text style= {{fontSize: 20, margin: 10, textAlign: "center",}}>Forget something? No worries, you can still log a headache from the past!</Text>
      <Text>*This is where the calendar UI goes to select a date*</Text>
      <Text>Click the button to log a headache for the selected date</Text>
      <Link href="/">Home</Link>
    </View>
  )
}


const styles = StyleSheet.create({})

