import {
	PIN_DROPPED
} from '../actions/types';


export default function (state = {}, action) {
	switch (action.type) {
		// case PIN_DROPPED:
		// 	return [action.payload, ...state];
		case PIN_DROPPED:
			return action.payload;
		default:
			return state;
	}
}