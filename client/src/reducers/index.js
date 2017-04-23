import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';

const rootReducer = combineReducers({
  routing: routerReducer,
});

export default rootReducer;
