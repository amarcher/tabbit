import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
		this.props.login(this.state);
	}

	onFieldChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	bindEventHandlers() {
		this.onSubmit = this.onSubmit.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	render() {
		if (this.props.authorized) {
			return <Redirect to="/tabs" />;
		}

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

					<Button type="submit">Login</Button>
				</form>

				<Link to="/signup">Sign Up</Link>
			</div>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	authorized: PropTypes.bool.isRequired,
};

export default connect(Login);
