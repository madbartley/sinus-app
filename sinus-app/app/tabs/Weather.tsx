import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';



export default function Weather() {
  const navigation = useNavigation();

  return(
    <View
    style={{
      flex: 1,
      alignItems: "center",
      marginTop: 100,
      margin: 30,
    }}
    >
    <View>
      <Text style= {{fontSize: 20, margin: 10}}>Let's take a look at the weather</Text>
    </View>
    <View>
      <Text>Which weather stats are you interested in?</Text>
    </View>
    <View
    style={{
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      margin: 10,
    }}
    >
    <Button style={styles.button} onPress={() => navigation.navigate('WeatherStats')}>Today</Button>
    <Button style={styles.button} onPress={() => navigation.navigate('WeatherStats')}>Past</Button>
    <Button style={styles.button} onPress={() => navigation.navigate('WeatherStats')}>Future</Button>
    <Button style={styles.button} onPress={() => navigation.navigate('WeatherStats')}>All</Button>

    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 140,
    margin: 10,
  }
});

