import {
	PIN_FORM_UPDATE,
	PIN_FORM_ERROR,
	PIN_ADDED,
	PIN_FORM_CLEAR
} from '../actions/types';

const INITIAL_STATE = {
	updatedPin: {},
	pinName: '',
	error: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PIN_FORM_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case PIN_FORM_ERROR:
			return { ...state, error: 'Invalid Pin Name' };
		case PIN_ADDED:
			return { ...state, ...INITIAL_STATE, updatedPin: action.payload };
		case PIN_FORM_CLEAR:
			return INITIAL_STATE;
		default:
			return state;
	}


}