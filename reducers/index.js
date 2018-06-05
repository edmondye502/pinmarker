import { combineReducers } from 'redux';

import pinDrop from './pin_dropped_reducer';
import pinForm from './pin_form_reducer';
import pinAdd from './pin_add_reducer';

export default combineReducers({
	pinDrop, pinForm, pinAdd
});