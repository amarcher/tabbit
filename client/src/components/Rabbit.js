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
		const { active, subtotal } = this.props;
		const style = {
			color: active ? 'blue' : 'initial',
		};

		return (
			<div>
				<button style={style} onClick={this.props.onClick}>
					<span>{name}</span> - <span>{subtotal}</span>
				</button>
				<button onClick={this.onRemoveRabbitFromTabClick}>x</button>
			</div>
		);
	}
}

Item.propTypes = {
	rabbit: rabbitProp.isRequired,
	tabId: PropTypes.number.isRequired,
	removeRabbitFromTab: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	subtotal: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};
