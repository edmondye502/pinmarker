import React, { Component } from 'react';
import { View,  Text, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Card, Header } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

import * as actions from '../actions'


class PinsScreen extends Component {

	onDirectionButtonPress = () => {
		console.log('direction button pressed');
	}

	onDeleteButtonPress = () => {
		console.log('delete button pressed');
	}

	renderPins() {
		return this.props.pins.map(pin => {
			const { longitude, latitude, name } = pin;
			const initialRegion = {
				longitude,
				latitude,
				longitudeDelta: 0.001,
				latitudeDelta: 0.0025
			}

			return (
				<Card title={name} key={longitude*latitude} style={styles.detailWrapper}>
					<MapView
						scrollEnabled={false}
						style={{ height: 100 }}
						cacheEnabled={Platform.OS === 'android'}
						initialRegion={initialRegion}
					>
						<Marker
							coordinate={{ latitude, longitude }}
						/>
					</MapView>

					<View style={styles.buttonStyle}>
						<Button
							title='Directions'
							backgroundColor='#009688'
							icon={{ name: 'directions' }}
							onPress={this.onDirectionButtonPress}
						/>
						<Button
							title='Delete'
							backgroundColor='red'
							icon={{ name: 'delete' }}
							onPress={this.onDeleteButtonPress}
						/>
					</View>

				/>
			</Card>
			);
		});
	}

	render() {
		return (

			<ScrollView>
				<Header 
					centerComponent={{ text: 'My PinMarkers' }}
				/>
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
	},
	buttonStyle: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
}

function mapStateToProps(state) {
	return { pins: state.pinAdd };
}

export default connect(mapStateToProps)(PinsScreen);