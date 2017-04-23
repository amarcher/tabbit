import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import './index.css';

// Components
import Login from './components/Login';

console.log(Login);

const router = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Login} />
			<Route component={Login} />
		</Route>
	</Router>
);

ReactDOM.render(
	router, document.getElementById('root'),
);
