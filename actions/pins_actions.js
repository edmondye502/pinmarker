
import {
	PIN_DROPPED,
	PIN_FORM_UPDATE,
	PIN_FORM_ERROR,
	PIN_ADDED,
	PIN_FORM_CLEAR
} from './types';


export const pinDropped = (pin, callback) => {
	return (dispatch) => {
		dispatch({ type: PIN_DROPPED, payload: pin });
		console.log('calldsfdsf');
		callback();
	}
};

export const pinFormUpdate = ({ prop, value }) => {
	return {
		type: PIN_FORM_UPDATE,
		payload: { prop, value }
	}
};

export const pinAdded = (pin, callback) => {
	if(!pin.name) {
		return {
			type: PIN_FORM_ERROR,
		}
	}

	return (dispatch) => {
		dispatch({ type: PIN_ADDED, payload: pin });
		callback();
	}
}

export const pinFormClear = () => {
	return { type: PIN_FORM_CLEAR };
}