import {
	PIN_ADDED,
} from '../actions/types';

export default (state = [], action) => {
	switch (action.type) {
		case PIN_ADDED:
			return [action.payload, ...state];
		default:
			return state;
	}


}