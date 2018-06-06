import { combineReducers } from 'redux';

import pinDrop from './pin_dropped_reducer';
import pinForm from './pin_form_reducer';
import pin from './pin_reducer';

export default combineReducers({
	pinDrop, pinForm, pin
});