import { combineReducers } from 'redux';
import authorizationReducer from './authorizationReducer';
import tabReducer from './tabReducer';
import rabbitReducer from './rabbitReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	user: userReducer,
	authorized: authorizationReducer,
	tabs: tabReducer,
	rabbits: rabbitReducer,
});

export default rootReducer;
