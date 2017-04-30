import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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

	onSubmit(event) {
		event.preventDefault();
		this.props.login(this.state);
	}

	onEmailChange(event) {
		this.setState({ email: event.target.value });
	}

	onPasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	bindEventHandlers() {
		this.onSubmit = this.onSubmit.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Welcome to Tabbit Rabbit</h2>
				</div>

				<form onSubmit={this.onSubmit}>
					<input
						placeholder="User email"
						type="text"
						defaultValue={this.state.email}
						onChange={this.onEmailChange}
					/>

					<input
						placeholder="Password"
						type="password"
						defaultValue={this.state.password}
						onChange={this.onPasswordChange}
					/>

					<button type="submit">Login</button>
				</form>

				<Link to="/signup">Sign Up</Link>
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
