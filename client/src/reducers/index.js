import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	tabs: tabReducer,
});

export default rootReducer;
