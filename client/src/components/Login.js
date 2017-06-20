import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import connect from '../connect';

class Login extends Component {
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

		if (!this.props.errors.LOGIN_FAILED) {
			this.props.login(this.state);
		}
	}

	onFieldChange(event) {
		this.setState({ [event.target.name]: event.target.value }, () => {
			if (this.props.errors.LOGIN_FAILED) {
				this.props.clearErrors();
			}
		});
	}

	bindEventHandlers() {
		this.onSubmit = this.onSubmit.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	renderErrors() {
		const loginErrors = this.props.errors.LOGIN_FAILED;

		if (loginErrors) {
			return loginErrors.map(loginError => (
				<div className="error" key={loginError}>
					{loginError}
				</div>
			));
		}

		return '';
	}

	render() {
		if (this.props.authorized) {
			return <Redirect to="/tabs" />;
		}

		const disabled = this.props.errors.LOGIN_FAILED;

		return (
			<div className="App">
				<div className="App-header">
					<h2>Welcome to Tabbit Rabbit</h2>
				</div>

				<form onSubmit={this.onSubmit}>
					<input
						name="email"
						placeholder="User email"
						type="text"
						defaultValue={this.state.email}
						onChange={this.onFieldChange}
					/>

					<input
						name="password"
						placeholder="Password"
						type="password"
						defaultValue={this.state.password}
						onChange={this.onFieldChange}
					/>

					<button type="submit" disabled={disabled}>Login</button>
				</form>

				{this.renderErrors()}

				<Link to="/signup">Sign Up</Link>
			</div>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	authorized: PropTypes.bool.isRequired,
	errors: PropTypes.shape({
		LOGIN_FAILED: PropTypes.array,
	}).isRequired,
	clearErrors: PropTypes.func.isRequired,
};

export default connect(Login);
