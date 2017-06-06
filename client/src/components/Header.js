import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { user as userProp, rabbit as rabbitProp } from '../propTypes';
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

		if (!this.props.rabbits) {
			this.props.getRabbits();
		}
	}

	onLinkVenmo() {
		const { user, userFetchSucceeded } = this.props;

		return authVenmo(user.id).then(userFetchSucceeded);
	}

	renderLinkVenmo() {
		const { user, authorized } = this.props;

		if (authorized) {
			if (!user.vm_authtoken) {
				return (
					<Button onClick={this.onLinkVenmo}>
						Link Venmo
					</Button>
				);
			}

			return (
				<Button onClick={this.props.unlinkVenmo}>
					Unlink Venmo
				</Button>
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
			<Button onClick={logout}>Logout</Button>
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
	unlinkVenmo: PropTypes.func.isRequired,
	user: userProp.isRequired,
	rabbits: PropTypes.arrayOf(rabbitProp).isRequired,
	getRabbits: PropTypes.func.isRequired,
};

export default connect(Header);
