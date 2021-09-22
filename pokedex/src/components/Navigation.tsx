import React from 'react';
import { Main } from '../../screens/Main';
import { Legendaries } from '../../screens/Legendaries';
import { Compare } from '../../screens/Compare';
import { Header } from './Header';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const Navs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />,
      }}>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Legendaries" component={Legendaries} />
      <Stack.Screen name="Compare" component={Compare} />
    </Stack.Navigator>
  );
};
