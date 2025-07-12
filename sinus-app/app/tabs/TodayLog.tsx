import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';



export default function TodayLog() {

  return(
    <View>
    <View>
      <Text>Sorry you're not feeling well today!</Text>
    </View>
    <View>
      <Text>Click the button to log a headache for today.</Text>
    </View>
    <View>
    <Button style={styles.button} onPress={() => console.log("Logged today!")}>Send it!</Button>

    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 175,
  }
});

