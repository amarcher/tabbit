import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login } from '../actions/actionCreators';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.bindEventHandlers();
	}

	onClick() {
		this.props.login(this.state);
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

Login.propTypes = {
	login: PropTypes.func,
};

Login.defaultProps = {
	login,
};
