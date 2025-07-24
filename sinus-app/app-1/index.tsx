import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './tabs/Home';
import Weather from './tabs/Weather';
import WeatherStats from './tabs/WeatherStats';
import HeadachePage from './tabs/HeadachePage';
import TodayLog from './tabs/TodayLog';
import DateLog from './tabs/DateLog';


const Stack = createNativeStackNavigator();

export default function Home () {
  return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Weather" component={Home} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="WeatherStats" component={WeatherStats} />
        <Stack.Screen name="Headache" component={HeadachePage} />
        <Stack.Screen name="TodayLog" component={TodayLog} />
        <Stack.Screen name="DateLog" component={DateLog} />
      </Stack.Navigator>
  );
};