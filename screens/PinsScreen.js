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

	onDeleteButtonPress(id) {
		this.props.deletePin(id);
	}

	renderPins() {
		if(!this.props.pins.length) {
			return (
				<Card title='No PinMarkers'>
					<Button
						title='Go to Map to Start Adding Some'
						backgroundColor='#009688'
						onPress={() => this.props.navigation.navigate('map')}
					/>
				</Card>
			);
		}
		else {
			return this.props.pins.map(pin => {
				const { longitude, latitude, name, id } = pin;
				const initialRegion = {
					longitude,
					latitude,
					longitudeDelta: 0.001,
					latitudeDelta: 0.0025
				}

				return (
					<Card title={name} key={id} style={styles.detailWrapper}>
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
								onPress={() => this.onDeleteButtonPress(id)}
							/>
						</View>
					</Card>
				);
			});
		}
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
	return { pins: state.pin };
}

export default connect(mapStateToProps, actions)(PinsScreen);