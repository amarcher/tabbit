import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ajax from './ajax';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.bindEventHandlers();
	}

	onClick() {
		Ajax.post('/api/v1/sessions', this.state)
			.then(console.log) // eslint-disable-line no-console
			.catch(console.log); // eslint-disable-line no-console
	}

	onEmailChange(event) {
		this.setState({ email: event.target.value });
	}

	onPasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	bindEventHandlers() {
		this.onClick = this.onClick.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to Tabbit Rabbit</h2>
				</div>

				<input
					placeholder="User email"
					type="text"
					defaultValue={this.state.value}
					onChange={this.onEmailChange}
				/>

				<input
					placeholder="Password"
					type="password"
					defaultValue={this.state.value}
					onChange={this.onPasswordChange}
				/>

				<button onClick={this.onClick}>Login </button>
			</div>
		);
	}
}

export default App;
