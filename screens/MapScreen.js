import React, { Component } from 'react';
import { Image, View,  Text, ActivityIndicator, Animated, Dimensions, Platform } from 'react-native';
import { Location, Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import xmarker from '../assets/xmarker.png'
import marker from '../assets/marker.png'
import * as actions from '../actions'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class MapScreen extends Component {

	state = {
		mapLoaded: false,
		errorMessage: '',
		region: {
			latitude: 37.73725,
      longitude: -122.4324,
			longitudeDelta: 0.1,
			latitudeDelta: 0.3
		},
		startMarkerWidth: -25,
		startMarkerHeight: -50,
		allowAnimations: true,
		showMarker: true
	}

	componentDidMount() {
		this.setState({ mapLoaded: true });
		this._getLocationAsync();

		// setup marker animation
		this.position = new Animated.ValueXY({x: SCREEN_WIDTH/2-15.5, y: -50});
		
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
		// disable map scrolling while animation starts
		this.setState({ allowAnimations: false });

		///////// need to disable navigation and other button presses as well

		// start animations 
		Animated.spring(this.position, {
			toValue: { x: SCREEN_WIDTH/2-15.5, y: SCREEN_HEIGHT/2-75}
		}).start(() => this.dropPinCallback());
	}

	dropPinCallback() {
		// initialize new pin with latlng coords
		const pin = {
			latitude: this.state.region.latitude,
			longitude: this.state.region.longitude
		};

		// automatically navigate to pins detail page
		this.props.pinDropped(pin, () => {
			this.props.navigation.navigate('add');
		});

		// temporary hacky solution to reset marker
		Animated.timing(this.position, {toValue: {x: SCREEN_WIDTH/2-15.5, y: -50}, duration: 1}).start();
		// enable map scrolling 
		this.setState({ allowAnimations: true });

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
					showsUserLocation
					scrollEnabled={this.state.allowAnimations}
					cacheEnabled={!this.state.allowAnimations && Platform.OS === 'android'}
					style={styles.mapStyle} 
					region={this.state.region}
					onRegionChangeComplete={this.onRegionChangeComplete}
				/>

				<Animated.Image style={[this.position.getLayout(), styles.markerStyle]} source={marker} />

				<View style={styles.xmarkerContainer} pointerEvents="none">
          <Image style={styles.xmarkerStyle} source={xmarker} />
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
	xmarkerStyle: {
    height: 50,
    width: 50
  },
  xmarkerContainer: {
  	left: '50%',
    top: '50%',
    marginLeft: -25,
    marginTop: -10,
    position: 'absolute',
  },
  markerStyle: {
    height: 50,
    width: 31,
    position: 'absolute',
  }
}

export default connect(null, actions)(MapScreen);