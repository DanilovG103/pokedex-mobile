import React from 'react';
import { Main } from '../screens/Main';
import { Legendaries } from '../screens/Legendaries';
import { Compare } from '../screens/Compare';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from './Header';

const Drawer = createDrawerNavigator();

export const Navs = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: '100%',
          height: 200,
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
