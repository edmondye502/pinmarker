import {
	PIN_DROPPED
} from '../actions/types';

const INITIAL_STATE = {
	pin: {}
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case PIN_DROPPED:
			return { pin : action.payload };
		default:
			return state;
	}
}