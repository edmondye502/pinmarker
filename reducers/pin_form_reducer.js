import {
	PIN_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
	pinName: ''
}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case PIN_UPDATE:
			{ ...state, [action.payload.prop]: action.payload.value };
		default:
			return state;
	}


}