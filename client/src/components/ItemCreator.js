import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from '../connect';

class ItemCreator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			price: 0,
		};

		this.bindEventHandlers();
	}

	onFieldChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.createItem(this.props.tabId, this.state);
		this.form.reset();
		this.setState({
			name: '',
			price: '',
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
				<input name="price" type="number" step="any" placeholder="Price" onChange={this.onFieldChange} />
				<button type="submit">+</button>
			</form>
		);
	}
}

ItemCreator.propTypes = {
	tabId: PropTypes.number.isRequired,
	createItem: PropTypes.func.isRequired,
};

export default connect(ItemCreator);
