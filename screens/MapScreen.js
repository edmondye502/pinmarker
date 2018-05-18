import React, { Component } from 'react';
import { Image, View,  Text, ActivityIndicator } from 'react-native';
import { Location, Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';
// import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import marker from '../assets/marker.png'
// import * as actions from '../actions'


class MapScreen extends Component {

	static navigationOptions = {
		tabBarLabel: 'Map',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name='map' size={30} color={tintColor} />
		}
	}

	state = {
		mapLoaded: false,
		errorMessage: '',
		region: {
			latitude: 37.73725,
      longitude: -122.4324,
			longitudeDelta: 0.1,
			latitudeDelta: 0.3
		}
	}

	componentDidMount() {
		this.setState({ mapLoaded: true });
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let { coords: { latitude }, coords: { longitude } } = await Location.getCurrentPositionAsync({});
	    this.setState({
	    	region: {
	    		latitude,
	    		longitude,
	    		longitudeDelta: 0.0122,
					latitudeDelta: 0.0021
	    	}
	    });
    }
  };

	onRegionChangeComplete = (region) => {
		this.setState({ region });
	}

	onButtonPress = () => {
		// this.props.fetchJobs(this.state.region, () => {
		// 	this.props.navigation.navigate('deck');
		// });
		console.log('pressed');
	}

	render() {
		
		if (!this.state.mapLoaded) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
		return (
			<View style={styles.mainContainer}>
				<MapView 
					style={styles.mapStyle} 
					showsUserLocation
					region={this.state.region}
					onRegionChangeComplete={this.onRegionChangeComplete}
				/>
				<View style={styles.markerContainer} pointerEvents="none">
          <Image style={styles.markerStyle} source={marker} />
        </View>
				<View style={styles.buttonContainer}>
					<Button 
						raised
						title='Drop Pin'
						backgroundColor='#009688'
						icon={{ name: 'pin-drop' }}
						onPress={this.onButtonPress}
					/>
				</View>
			</View>
		);	
	}
}

const styles = {
	mainContainer: {
		flex: 1,
	},
	mapStyle: {
		flex: 1,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 25,
		left: 0, 
		right: 0
	},
	markerStyle: {
    height: 50,
    width: 31
  },
  markerContainer: {
  	left: '50%',
    top: '50%',
    marginLeft: -12,
    marginTop: -50,
    position: 'absolute',
  }
}


// export default connect(null, actions)(MapScreen);
export default MapScreen;