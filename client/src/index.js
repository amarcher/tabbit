import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

const router = (
	<Provider store={store}>
		<App />
	</Provider>
);

const root = createRoot(document.getElementById('root'));
root.render(router);
