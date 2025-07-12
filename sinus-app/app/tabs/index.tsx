import { Text, View, Image } from "react-native";
import { Button } from '@react-navigation/elements';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

// component imports
import HeadachePage from '/HeadachePage.tsx'
import TodayLog from '/TodayLog.tsx'
import DateLog from '/DateLog.tsx'
import Weather from '/Weather.tsx'

function Home() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text style={styles.welcome}>Welcome</Text>
      <View style={styles.baroView}><Image source={require('../../../assets/images/baro.png')} style={{width: 110, height: 120}}/></View>
      <View><Text style={styles.tagline}>What would you like to do?</Text></View>
      <View style={styles.buttonView}>
      <Button style={styles.button} onPress={() => navigation.navigate('Headache')}>
        Log a headache
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate('Weather')}>
        See weather data
      </Button>
      </View>
    </View>
  );
}

function Headache() {
  return(
    <View>
      <HeadachePage />
    </View>
  )
}


const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Home,
    Headache: Headache,
    Weather: Weather,
    DateLog: DateLog,
    TodayLog: TodayLog,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  welcome: {
    color: 'black',
    fontSize: 75,
    paddingTop: 30,
  },
  tagline: {
    color: 'black',
    fontSize: 15,
    marginTop: 15,
  },
  button: {
    width: 160,
    fontSize: 50,
    margin: 10,
  },
  buttonView: {
    //backgroundColor: "red",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    margin: 5,
  },
  baroView: {
    margin: 30,
    height: 120,
    width: 120,
  },
});