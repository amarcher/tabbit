import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from '../connect';

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
	renderLogoutButton() {
		const { authorized, logout } = this.props;

		if (!authorized) {
			return '';
		}

		return (
			<button onClick={logout}>Logout</button>
		);
	}

	render() {
		return (
			<div>
				{this.renderLogoutButton()}
			</div>
		);
	}
}

Header.propTypes = {
	authorized: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
};

export default connect(Header);
