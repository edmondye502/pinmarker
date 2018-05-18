import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import MapScreen from './screens/MapScreen';
import PinsScreen from './screens/PinsScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {

  render() {
    const MainNavigator = createBottomTabNavigator({
      map: { screen: MapScreen },
      pins: { screen: PinsScreen },
      settings: { screen: SettingsScreen },
    }, 
    {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    });

    return (
      <MainNavigator style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
