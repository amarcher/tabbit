import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ConnectedApp from './components/ConnectedApp';
import './index.css';

// Components
import Login from './components/Login';

import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={ConnectedApp}>
				<IndexRoute component={Login} />
				<Route component={Login} />
			</Route>
		</Router>
	</Provider>
);

ReactDOM.render(
	router, document.getElementById('root'),
);
