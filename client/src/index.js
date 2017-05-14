import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

const router = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(
	router,
	document.getElementById('root'),
);
