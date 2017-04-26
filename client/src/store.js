import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';

import rootReducer from './reducers/index';

const defaultState = {
	tabs: [],
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, defaultState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
