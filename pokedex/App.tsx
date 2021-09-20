import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navs } from './components/Navigation';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <NavigationContainer>
      <Navs />
    </NavigationContainer>
  );
};

export default App;
