import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from '../connect';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			phone: '',
			password: '',
		};

		this.bindEventHandlers();
	}

	onSubmit(event) {
		event.preventDefault();

		if (!this.props.errors.USER_CREATE_FAILED) {
			this.props.createUser(this.state);
		}
	}

	onFieldChange(event) {
		this.setState({ [event.target.name]: event.target.value }, () => {
			if (this.props.errors.USER_CREATE_FAILED) {
				this.props.clearErrors();
			}
		});
	}

	bindEventHandlers() {
		this.onSubmit = this.onSubmit.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	renderErrors() {
		const userCreateErrors = this.props.errors.USER_CREATE_FAILED;

		if (userCreateErrors) {
			return userCreateErrors.map(userCreateError => (
				<div className="error" key={userCreateError}>
					{userCreateError}
				</div>
			));
		}

		return '';
	}

	render() {
		if (this.props.authorized) {
			return <Redirect to="/tabs" />;
		}

		const disabled = this.props.errors.USER_CREATE_FAILED;

		return (
			<div className="App">
				<div className="App-header">
					<h2>Create an account</h2>
				</div>

				<form onSubmit={this.onSubmit}>
					<input
						name="name"
						placeholder="Name"
						type="text"
						defaultValue={this.state.email}
						onChange={this.onFieldChange}
					/>

					<input
						name="phone"
						placeholder="Phone Number"
						type="tel"
						defaultValue={this.state.email}
						onChange={this.onFieldChange}
					/>

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

					<button type="submit" disabled={disabled}>SignUp</button>
				</form>

				{this.renderErrors()}

				<Link to="/">Login</Link>
			</div>
		);
	}
}

SignUp.propTypes = {
	createUser: PropTypes.func.isRequired,
	authorized: PropTypes.bool.isRequired,
	errors: PropTypes.shape({
		USER_CREATE_FAILED: PropTypes.array,
	}).isRequired,
	clearErrors: PropTypes.func.isRequired,
};

export default connect(SignUp);
