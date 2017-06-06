import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
		this.props.createUser(this.state);
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

					<Button type="submit">SignUp</Button>
				</form>

				<Link to="/">Login</Link>
			</div>
		);
	}
}

SignUp.propTypes = {
	createUser: PropTypes.func.isRequired,
	authorized: PropTypes.bool.isRequired,
};

export default connect(SignUp);
