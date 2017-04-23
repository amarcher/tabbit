import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import ConnectedApp from './components/ConnectedApp';
import Login from './components/Login';
import store, { history } from './store';
import './index.css';

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
