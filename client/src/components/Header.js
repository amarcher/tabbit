import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { user as userProp } from '../propTypes';
import connect from '../connect';
import { authVenmo } from '../venmo';

class Header extends Component {
	constructor(props) {
		super(props);

		this.onLinkVenmo = this.onLinkVenmo.bind(this);
	}

	componentWillMount() {
		if (!this.props.user.id) {
			this.props.getUser();
		}
	}

	onLinkVenmo() {
		const { user, userFetchSucceeded } = this.props;

		return authVenmo(user.id).then(userFetchSucceeded);
	}

	renderLinkVenmo() {
		const { user, authorized } = this.props;

		if (authorized && !user.vm_authtoken) {
			return (
				<button type="button" onClick={this.onLinkVenmo}>
					Link Venmo
				</button>
			);
		}

		return '';
	}

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
				{this.renderLinkVenmo()}
				{this.renderLogoutButton()}
			</div>
		);
	}
}

Header.propTypes = {
	authorized: PropTypes.bool.isRequired,
	getUser: PropTypes.func.isRequired,
	userFetchSucceeded: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	user: userProp.isRequired,
};

export default connect(Header);
