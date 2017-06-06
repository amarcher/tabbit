import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { rabbit as rabbitProp, user as userProp } from '../propTypes';
import { formatDollar } from '../utils';

export default class Item extends Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

		this.bindEventHandlers();
	}

	onRemoveRabbitFromTabClick() {
		const { rabbit, tabId } = this.props;

		this.props.removeRabbitFromTab(tabId, rabbit);
	}

	onChargeRabbit() {
		const { tabId, rabbit, total } = this.props;

		this.props.chargeRabbit(tabId, rabbit.id, total);
	}

	bindEventHandlers() {
		this.onRemoveRabbitFromTabClick = this.onRemoveRabbitFromTabClick.bind(this);
		this.onChargeRabbit = this.onChargeRabbit.bind(this);
	}

	renderChargeRabbit() {
		const { user, total } = this.props;

		if (user.vm_authtoken && total) {
			return (
				<Button onClick={this.onChargeRabbit}>
					Charge
				</Button>
			);
		}

		return '';
	}

	renderTotal() {
		const { total } = this.props;

		if (total) {
			return (
				<span> ({formatDollar(total)})</span>
			);
		}

		return '';
	}

	render() {
		const { name } = this.props.rabbit;
		const { active, subtotal } = this.props;

		return (
			<div>
				<Button active={active} onClick={this.props.onClick}>
					<span>{name}</span> - <span>{formatDollar(subtotal)}</span>
					{this.renderTotal()}
				</Button>
				<Button onClick={this.onRemoveRabbitFromTabClick}>x</Button>
				{this.renderChargeRabbit()}
			</div>
		);
	}
}

Item.propTypes = {
	user: userProp.isRequired,
	rabbit: rabbitProp.isRequired,
	tabId: PropTypes.number.isRequired,
	removeRabbitFromTab: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	subtotal: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	chargeRabbit: PropTypes.func.isRequired,
};
