import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rabbit as rabbitProp } from '../propTypes';

export default class Item extends Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

		this.bindEventHandlers();
	}

	onRemoveRabbitFromTabClick() {
		const { rabbit, tabId } = this.props;

		this.props.removeRabbitFromTab(tabId, rabbit);
	}

	bindEventHandlers() {
		this.onRemoveRabbitFromTabClick = this.onRemoveRabbitFromTabClick.bind(this);
	}

	render() {
		const { name } = this.props.rabbit;

		return (
			<div>
				<span>{name}</span> - <span>0</span>
				<button onClick={this.onRemoveRabbitFromTabClick}>x</button>
			</div>
		);
	}
}

Item.propTypes = {
	rabbit: rabbitProp.isRequired,
	tabId: PropTypes.number.isRequired,
	removeRabbitFromTab: PropTypes.func.isRequired,
};
