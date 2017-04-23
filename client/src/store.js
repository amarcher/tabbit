import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';


const defaultState = {
}

export default const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);
