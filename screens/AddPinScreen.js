import React, { Component } from 'react';
import { View,  Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Card } from 'react-native-elements';

import AddPinForm from '../components/AddPinForm';


class AddPinScreen extends Component {

	render() {
		return (
			<AddPinForm />
		);	
	}
}




export default AddPinScreen;