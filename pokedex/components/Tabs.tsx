import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Main } from '../screens/Main';
import { Legendaries } from '../screens/Legendaries';
import { About } from '../screens/About';
import { Compare } from '../screens/Compare';
const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Legendaries" component={Legendaries} />
      <Tab.Screen name="Compare" component={Compare} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};
