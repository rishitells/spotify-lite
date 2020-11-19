import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Details from './src/screens/Details';

import {RootStackParamList} from './src/types/app';

import {Colors} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Categories'}}
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
