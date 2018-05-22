import React, { Component } from 'react';
import { View,  Text } from 'react-native';
// import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

// import * as actions from '../actions'


class PinsScreen extends Component {

	static navigationOptions = {
		tabBarLabel: 'Pins',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name='location-on' size={30} color={tintColor} />
		}
	}


	render() {
		return (
			<View>
				<Text>Pins Screen</Text>
			</View>
		);	
	}
}


export default PinsScreen;