import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';



export default function DateLog() {

  return(
    <View>
    <View>
      <Text>Forget something? No worries, you can still log a headache from the past!</Text>
    </View>
    <Text>*This is where the calendar UI goes to select a date*</Text>
    <View>
      <Text>Click the button to log a headache for the selected date</Text>
    </View>
    <View>
    <Button style={styles.button} onPress={() => console.log("Logged to the past!")}>Send it!</Button>

    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 175,
  }
});

