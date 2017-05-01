import React, { Component } from 'react';
import { item } from '../propTypes';

export default class Item extends Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		const { name, price } = this.props.item;

		return (
			<div>
				<span>{name}</span> - <span>{price}</span>
			</div>
		);
	}
}

Item.propTypes = {
	item: item.isRequired,
};
