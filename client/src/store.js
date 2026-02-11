import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import Auth from './auth';

import rootReducer from './reducers/index';

const defaultState = {
	tabs: [],
	authorized: Auth.hasToken(),
};

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	defaultState,
	composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);

export default store;
