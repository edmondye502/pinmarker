import React, { Component } from 'react';
import { View,  Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Card } from 'react-native-elements';

import * as actions from '../actions'


class PinsScreen extends Component {

	static navigationOptions = {
		tabBarLabel: 'Pins',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name='location-on' size={30} color={tintColor} />
		}
	}

	renderPins() {
		return this.props.pins.map(pin => {

			const { latitude, longitude } = pin;

			return (
				<Card title='card' key={(latitude*longitude)}>
					<View style={styles.detailWrapper}>
						<Text>Latitude: {latitude}</Text>
						<Text>Longitude: {longitude}</Text>
					</View>
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

const styles = {
	detailWrapper: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'column',
		justifyContent: 'space-around'
	}
}

function mapStateToProps(state) {
	return { pins: state.pins };
}


export default connect(mapStateToProps)(PinsScreen);