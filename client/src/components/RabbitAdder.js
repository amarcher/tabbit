import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RabbitAdder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			phone: '',
			email: '',
		};

		this.bindEventHandlers();
	}

	onFieldChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.createRabbit(this.props.tabId, this.state);
		this.form.reset();
		this.setState({
			name: '',
			phone: '',
			email: '',
		});
	}

	bindEventHandlers() {
		this.onSubmit = this.onSubmit.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	render() {
		return (
			<form
				onSubmit={this.onSubmit}
				ref={(form) => {
					this.form = form;
				}}

			>
				<input name="name" type="text" placeholder="Name" onChange={this.onFieldChange} />
				<input name="phone" type="tel" placeholder="Phone" onChange={this.onFieldChange} />
				<input name="email" type="email" placeholder="Email" onChange={this.onFieldChange} />
				<button type="submit">+</button>
			</form>
		);
	}
}

RabbitAdder.propTypes = {
	tabId: PropTypes.number.isRequired,
	createRabbit: PropTypes.func.isRequired,
};

export default RabbitAdder;
