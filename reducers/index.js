import { combineReducers } from 'redux';

import pin from './pins_reducer';
import pinForm from './pin_form_reducer';

export default combineReducers({
	pin, pinForm
});