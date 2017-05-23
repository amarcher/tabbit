import { combineReducers } from 'redux';
import authorizationReducer from './authorizationReducer';
import tabReducer from './tabReducer';
import rabbitReducer from './rabbitReducer';

const rootReducer = combineReducers({
	authorized: authorizationReducer,
	tabs: tabReducer,
	rabbits: rabbitReducer,
});

export default rootReducer;
