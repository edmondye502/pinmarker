import React, { Component } from 'react';
import { View, Image } from 'react-native';

import marker from '../assets/marker.png'


class DropPin extends Component {

	render() {
		return (
			<View style={styles.markerContainer} pointerEvents="none">
        <Image style={styles.markerStyle} source={marker} />
      </View>
		)
	}
}

const styles = {
	markerStyle: {
    height: 50,
    width: 31
  },
  markerContainer: {
  	left: '50%',
    marginLeft: -12,
    marginTop: -50,
    position: 'absolute',
  }
}

export default DropPin;