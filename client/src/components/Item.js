import React, { Component } from 'react';
import { item } from '../propTypes';

export default class Item extends Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		return (
			<div>
				<span>{this.props.item.name}</span>
			</div>
		);
	}
}

Item.propTypes = {
	item: item.isRequired,
};
