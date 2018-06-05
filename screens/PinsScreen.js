import React, { Component } from 'react';
import { View,  Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Card } from 'react-native-elements';

import * as actions from '../actions'


class PinsScreen extends Component {

	renderPins() {
		console.log(this.props.pins);
		return this.props.pins.map(pin => {
			const { longitude, latitude, name } = pin;

			return (
				<Card title={name} key={longitude*latitude}>
					<Text>{name} {latitude} {longitude}</Text>
				</Card>
			);
		});
	}

	render() {
		return (
			<ScrollView>
				{this.renderPins()}
			</ScrollView>
		);	
	}

}


function mapStateToProps(state) {
	return { pins: state.pinAdd };
}

export default connect(mapStateToProps)(PinsScreen);