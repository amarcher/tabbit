import React, { Component } from 'react';
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

	renderRabbit(rabbit) { // eslint-disable-line class-methods-use-this
		const name = (rabbit.name || 'U').toUpperCase().charAt(0);
		return (
			<span key={rabbit.id}>{name}</span>
		);
	}

	render() {
		const { name, price } = this.props.item;

		return (
			<div>
				<button onClick={this.props.onClick}>
					<span>{name}</span> - <span>{formatDollar(price)}</span>
				</button>
				{this.renderRabbits()}
				<button onClick={this.onItemDeleteClick}>x</button>
			</div>
		);
	}
}

Item.propTypes = {
	item: itemProp.isRequired,
	rabbitOwners: PropTypes.arrayOf(rabbitProp).isRequired,
	tabId: PropTypes.number.isRequired,
	deleteItem: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
};
