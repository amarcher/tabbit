import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rabbit as rabbitProp } from '../propTypes';

const defaultState = {
	name: '',
	phone_number: '',
	email: '',
};

class RabbitAdder extends Component {
	constructor(props) {
		super(props);

		this.state = defaultState;

		this.bindEventHandlers();
	}

	onFieldChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.createRabbit(this.props.tabId, this.state);
		this.resetState();
	}

	onRabbitResultClick(rabbit, event) {
		event.preventDefault();
		this.props.addRabbitToTab(this.props.tabId, rabbit);
		this.resetState();
	}

	bindEventHandlers() {
		this.onSubmit = this.onSubmit.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	resetState() {
		this.setState(defaultState);
		this.form.reset();
	}

	renderResult(rabbit) {
		const onRabbitResultClick = this.onRabbitResultClick.bind(this, rabbit);

		return (
			<button type="button" key={rabbit.id} onClick={onRabbitResultClick}>
				<span>{rabbit.name}</span>-<span>{rabbit.phone_number}</span>
			</button>
		);
	}

	renderResults() {
		const { name } = this.state;

		if (!name) {
			return '';
		}

		const { unusedRabbits } = this.props;
		const results = unusedRabbits.filter(rabbit => rabbit.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
		const sortedResults = results.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());
		const displayedResults = sortedResults.slice(0, 10).map(this.renderResult, this);

		return (
			<div className="results">
				{displayedResults}
			</div>
		);
	}

	render() {
		return (
			<form
				onSubmit={this.onSubmit}
				autoComplete="off"
				ref={(form) => {
					this.form = form;
				}}

			>
				<input name="name" autoComplete="off" type="text" placeholder="Name" onChange={this.onFieldChange} />
				<input name="phone_number" type="tel" placeholder="Phone" onChange={this.onFieldChange} />
				<input name="email" type="email" placeholder="Email" onChange={this.onFieldChange} />
				<button type="submit">+</button>
				{this.renderResults()}
			</form>
		);
	}
}

RabbitAdder.propTypes = {
	tabId: PropTypes.number.isRequired,
	unusedRabbits: PropTypes.arrayOf(rabbitProp).isRequired,
	addRabbitToTab: PropTypes.func.isRequired,
	createRabbit: PropTypes.func.isRequired,
};

export default RabbitAdder;
