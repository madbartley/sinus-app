import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';



export default function HeadachePage() {
  const navigation = useNavigation();
  
  return(
    <View>
    <View>
      <Text>Sorry you're not feeling well! Let's track that headache!</Text>
    </View>
    <View>
      <Text>When would you like to log a headache?</Text>
    </View>
    <View>
    <Button style={styles.button} onPress={() => navigation.navigate('TodayLog')}>Today</Button>
    <Button style={styles.button} onPress={() => navigation.navigate('DateLog')}>Some other day</Button>
    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 175,
  }
});

