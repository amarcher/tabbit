import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { item as itemProp } from '../propTypes';

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

	render() {
		const { name, price } = this.props.item;

		return (
			<div>
				<span>{name}</span> - <span>{price}</span>
				<button onClick={this.onItemDeleteClick}>x</button>
			</div>
		);
	}
}

Item.propTypes = {
	item: itemProp.isRequired,
	tabId: PropTypes.number.isRequired,
	deleteItem: PropTypes.func.isRequired,
};
