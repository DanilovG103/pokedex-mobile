import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Navs } from './src/components/Navigation';
import { darkTheme, lightTheme } from './src/theme/themes';

const App = () => {
  const scheme = useColorScheme();

  return (
    <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Navs />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
