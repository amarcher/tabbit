import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { item as itemProp, rabbit as rabbitProp } from '../propTypes';
import { formatDollar } from '../utils';

export default class Item extends Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

		this.bindEventHandlers();
	}

	onItemDeleteClick() {
		const { item, tabId } = this.props;

		this.props.deleteItem(tabId, item);
	}

	bindEventHandlers() {
		this.onItemDeleteClick = this.onItemDeleteClick.bind(this);
	}

	renderRabbits() {
		const { rabbitOwners } = this.props;

		return rabbitOwners.map(this.renderRabbit, this);
	}

	renderRabbit(rabbit) {
		const onMakeRabbitActive = () => this.props.onMakeRabbitActive(rabbit.id);
		const active = this.props.activeRabbitId === rabbit.id;
		const name = (rabbit.name || 'U').toUpperCase().charAt(0);

		return (
			<Button onClick={onMakeRabbitActive} active={active}>{name}</Button>
		);
	}

	render() {
		const { name, price } = this.props.item;

		return (
			<div>
				<Button onClick={this.props.onClick}>
					<span>{name}</span> - <span>{formatDollar(price)}</span>
				</Button>
				{this.renderRabbits()}
				<Button onClick={this.onItemDeleteClick}>x</Button>
			</div>
		);
	}
}

Item.propTypes = {
	item: itemProp.isRequired,
	activeRabbitId: PropTypes.number.isRequired,
	rabbitOwners: PropTypes.arrayOf(rabbitProp).isRequired,
	tabId: PropTypes.number.isRequired,
	deleteItem: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onMakeRabbitActive: PropTypes.func.isRequired,
};
