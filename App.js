import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './store';

import MapScreen from './screens/MapScreen';
import AddPinScreen from './screens/AddPinScreen';
import PinsScreen from './screens/PinsScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {

  render() {

  	const MapStack = createStackNavigator({
    	map:  { 
  			screen: MapScreen,
  			navigationOptions: {
  				header: null,
  				title: 'Back',
  			}
  		},
  		add: { screen: AddPinScreen }
    });

    const MainNavigator = createBottomTabNavigator({
      map: { screen: MapStack,
      	navigationOptions : {
					tabBarLabel: 'Map',
    			tabBarIcon: ({ tintColor }) => { return <Icon name='map' size={30} color={tintColor} />}
    		}
  	  },
      pins: { screen: PinsScreen,
      	navigationOptions : {
					tabBarLabel: 'Pins',
					tabBarIcon: ({ tintColor }) => { return <Icon name='location-on' size={30} color={tintColor} />}
				}
      },
      settings: { screen: SettingsScreen,
      	navigationOptions : {
					tabBarLabel: 'Settings',
					tabBarIcon: ({ tintColor }) => { return <Icon name='settings' size={30} color={tintColor} />}
				}
      },
    }, 
    {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      },
      lazy: true
    });

    

    return (
    	<Provider store={store}>
      	<MainNavigator style={styles.container} />
      </Provider>
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
