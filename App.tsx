import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Playlists from './src/screens/Playlists';

import {RootStackParamList} from './src/types/app';
import PlaylistItems from './src/screens/PlaylistItems';

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
        <Stack.Screen name="Playlists" component={Playlists} />
        <Stack.Screen
          name="PlaylistItems"
          component={PlaylistItems}
          options={{title: 'Songs'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
