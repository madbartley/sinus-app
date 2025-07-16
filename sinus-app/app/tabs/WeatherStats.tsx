import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';



export default function WeatherStats() {

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
    <Text>How's the weather looking?</Text>
    </View>
    <View>
    <Text>View different pressure data for the tie selected - all data given in "inches of mercury"</Text>
    </View>

    <View>
    <Text>Pressure right now</Text>
    <View style={styles.today}></View>
    <Text>Daily minimums</Text>
    <View style={styles.minimums}></View>
    <Text>Daily maximums</Text>
    <View style={styles.maximums}></View>
    <Text>Air pressure ranges</Text>
    <View style={styles.ranges}></View>
    <Text>Average hourly changes</Text>
    <View style={styles.changes}></View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  today: {
    backgroundColor: "yellow",
    flex: 1,
    flexDirection: "column",
  },
  minimums: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
  },
  maximums: {
    backgroundColor: "blue",
    flex: 1,
    flexDirection: "column",
  },
  ranges: {
    backgroundColor: "orange",
    flex: 1,
    flexDirection: "column",
  },
  changes: {
    backgroundColor: "green",
    flex: 1,
    flexDirection: "column",
  },

});

