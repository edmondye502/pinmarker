import React, { Component } from 'react';
import { View,  Text } from 'react-native';
// import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

// import * as actions from '../actions'


class SettingsScreen extends Component {

	static navigationOptions = {
		tabBarLabel: 'Settings',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name='settings' size={30} color={tintColor} />
		}
	}


	render() {
		return (
			<View>
				<Text>Settings Screen</Text>
			</View>
		);	
	}
}


export default SettingsScreen;