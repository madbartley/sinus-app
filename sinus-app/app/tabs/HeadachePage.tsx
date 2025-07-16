import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';



export default function HeadachePage() {
  const navigation = useNavigation();
  
  return(
    <View
      style={{
        alignItems: "center",
        marginTop: 100,
        margin: 25,
        }}
      >
    <View>
      <Text style= {{fontSize: 20, margin: 10}}>Let's track that headache!</Text>
    </View>
    <View>
    <Text>When would you like to log a headache?</Text>
    </View>
    <View
        style={{
        flex: 1,
        alignItems: "center",
      }}
    >
    </View>
    <View style={ styles.buttonView }>
    <Button style={styles.button} onPress={() => navigation.navigate('TodayLog')}>Today</Button>
    <Button style={styles.button} onPress={() => navigation.navigate('DateLog')}>Some other day</Button>
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

