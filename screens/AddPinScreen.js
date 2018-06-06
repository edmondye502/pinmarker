import React, { Component } from 'react';
import { Text, View, Platform, TextInput } from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { StackActions, NavigationActions } from 'react-navigation';


import * as actions from '../actions'


class AddPinScreen extends Component {

	componentDidMount() {
		this.props.pinFormClear();
	}

	onButtonPress = () => {
		var pin = this.props.pin;
		pin.name = this.props.pinName;

		this.props.pinAdded(pin, () => {
			// reset stack nav
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'map' })]
			});
			this.props.navigation.dispatch(resetAction);

			// navigate to pins
			this.props.navigation.navigate('pins');
		});
	}


	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: 'white' }}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}

	render() {

		const { latitude, longitude } = this.props.pin;
		const initialRegion = {
			longitude,
			latitude,
			longitudeDelta: 0.001,
			latitudeDelta: 0.0025
		}

		return (
			<Card title='Pin Details' style={styles.detailWrapper}>
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

				<View style={styles.containerStyle}>
					<Text style={styles.labelStyle}>Pin Name</Text>
					<TextInput
						autoCorrect={true}
						style={styles.inputStyle}
						placeholder='Enter Pin Name'
						value={this.props.pinName}
						onChangeText={value => this.props.pinFormUpdate({ prop: 'pinName', value })}
					/>
				</View>
					
				{this.renderError()}

				<View>
					<Button 
						raised
						title='Add Pin Marker'
						backgroundColor='#009688'
						icon={{ name: 'add-location' }}
						onPress={this.onButtonPress}
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
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		marginBottom: 10,
		color: 'red'
	},
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 20,
		flex: 2
	},
	labelStyle: {
		fontSize: 20,
		paddingLeft: 20,
		flex: 1
	},
	containerStyle: {
		height: 40,
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		alignItems: 'center'
	},
}

function mapStateToProps(state) {
	const { pin } = state.pinDrop;
	const { pinName, error } = state.pinForm;

	return { pin, pinName, error };
}

export default connect(mapStateToProps, actions)(AddPinScreen);