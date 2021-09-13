import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Main } from '../screens/Main';
import { Legendaries } from '../screens/Legendaries';
import { About } from '../screens/About';
import { Compare } from '../screens/Compare';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Legendaries') {
            iconName = focused ? 'medal' : 'medal-outline';
          } else if (route.name === 'Compare') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D93E30',
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
