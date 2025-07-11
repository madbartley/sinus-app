import { Text, View } from "react-native";
import { Button } from '@react-navigation/elements';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

function Home() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={styles.welcome}>Welcome, Madeline</Text>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Headache')}>
        Go to Details
      </Button>
    </View>
  );
}

function Headache() {
  return(
    <View>
      <Text>Is this a homescreen or something?</Text>
    </View>
  )
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Home,
    Headache: Headache,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  welcome: {
    color: 'black',
    fontSize: 50,
    padding: 30,
  },
});