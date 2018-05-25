import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

import * as actions from '../actions'
import { InputField } from './common';


class AddPinForm extends Component {

	render() {

		const { latitude, longitude } = this.props.pin;
		const initialRegion = {
			longitude,
			latitude,
			longitudeDelta: 0.001,
			latitudeDelta: 0.0025
		}

		return (
			<Card title='Pin Details'>
				<View style={{ height: 200 }}>
					<MapView
						scrollEnabled={false}
						style={{ flex: 1 }}
						cacheEnabled={Platform.OS === 'android'}
						initialRegion={initialRegion}
					>
						<Marker
							coordinate={{ latitude, longitude }}
						/>
					</MapView>

					<InputField
						label='Pin Name'
						placeholder='Test Pin Name'
						value={this.props.pinName}
						onChangeText={value => this.props.pinNameUpdate({ prop: 'pinName', value })}
					/>

					
				</View>

			</Card>
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
	return { pin: state.pin };
}

export default connect(mapStateToProps, actions)(AddPinForm);