import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { item as itemProp, rabbit as rabbitProp } from '../propTypes';

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

		return rabbitOwners.map((rabbit) => {
			const name = (rabbit.name || 'U').toUpperCase().charAt(0);
			return (
				<span>{name}</span>
			);
		});
	}

	render() {
		const { name, price } = this.props.item;

		return (
			<div>
				<button onClick={this.props.onClick}>
					<span>{name}</span> - <span>{price}</span>
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
