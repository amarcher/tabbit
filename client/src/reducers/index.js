import { combineReducers } from 'redux';
import authorizationReducer from './authorizationReducer';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
	authorized: authorizationReducer,
	tabs: tabReducer,
});

export default rootReducer;
