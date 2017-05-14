import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TabList from './components/TabList';
import TabEditor from './components/TabEditor';
import { history } from './store';
import connect from './connect';
import './App.css';

function App() {
	return (
		<Router history={history}>
			<div>
				<Header />
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<PrivateRoute exact path="/tabs" component={TabList} />
					<PrivateRoute exact path="/tab/:id/edit" component={TabEditor} />
					<Route path="/" component={Login} />
				</Switch>
			</div>
		</Router>
	);
}

export default connect(App);
