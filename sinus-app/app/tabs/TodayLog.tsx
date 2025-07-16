import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';



export default function TodayLog() {

  return(
    <View
      style={{
        alignItems: "center",
        marginTop: 100,
        margin: 25,
        }}
      >
    <View>
      <Text style= {{fontSize: 20, margin: 10}}>Sorry you're not feeling well today!</Text>
    </View>
    <View>
      <Text>Click the button to log a headache for today.</Text>
    </View>
    <View style={ styles.buttonView }>
    <Button style={styles.button} onPress={() => console.log("Logged today!")}>Send it!</Button>

    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 160,
    margin: 10,
  },
  buttonView: {
    //backgroundColor: "red",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    margin: 5,
  },
});

