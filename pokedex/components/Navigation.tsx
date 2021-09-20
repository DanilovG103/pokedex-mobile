import React from 'react';
import { Main } from '../screens/Main';
import { Legendaries } from '../screens/Legendaries';
import { Compare } from '../screens/Compare';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from './Header';
import { Colors } from '../assets/colors';

const Drawer = createDrawerNavigator();

export const Navs = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: Colors.yellow1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          width: '100%',
          height: 300,
        },
        drawerActiveBackgroundColor: 'transparent',
        drawerLabelStyle: {
          fontSize: 24,
          color: Colors.black,
        },
        header: ({ navigation }) => {
          return <Header open={navigation.openDrawer} />;
        },
      }}>
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="Legendaries" component={Legendaries} />
      <Drawer.Screen name="Compare" component={Compare} />
    </Drawer.Navigator>
  );
};
