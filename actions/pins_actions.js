
import {
	PIN_DROPPED,
	PIN_UPDATE
} from './types';


export const pinDropped = (pin, callback) => {
	return (dispatch) => {
		dispatch({ type: PIN_DROPPED, payload: pin });
		callback();
	}
};

export const pinUpdate = ({ prop, value }) => {
	return {
		type: PIN_UPDATE,
		payload: { prop, value }
	}
};